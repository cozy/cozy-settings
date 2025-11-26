import { Q } from 'cozy-client'

const NEXTCLOUD_FILES_DOCTYPE = 'io.cozy.remote.nextcloud.files'

export const nextcloudProvider = {
  id: 'nextcloud',
  label: 'Nextcloud',

  _createLimiter(max = 3, isAborted) {
    let active = 0
    const queue = []

    const run = fn =>
      new Promise((resolve, reject) => {
        const task = async () => {
          if (isAborted?.()) {
            resolve()
            return
          }

          active += 1
          try {
            const result = await fn()
            resolve(result)
          } catch (e) {
            reject(e)
          } finally {
            active -= 1
            const next = queue.shift()
            if (next) next()
          }
        }

        if (active < max) {
          task()
        } else {
          queue.push(task)
        }
      })

    return run
  },

  _joinRemotePath(path) {
    if (!path) return '/'
    let p = String(path).trim()
    p = p.replace(/\\/g, '/')
    p = p.replace(/\/+/g, '/')
    if (!p.startsWith('/')) p = '/' + p
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
    return p
  },

  _extractName(path) {
    const clean = this._joinRemotePath(path || '/')
    const parts = clean.split('/').filter(Boolean)
    return parts.pop() || '/'
  },

  _build404Reason(path) {
    const name = this._extractName(path)
    const hasWeirdChars = /[^\u0020-\u007E]/.test(name) || /[*'^()]/.test(name)
    return hasWeirdChars
      ? 'probable unsupported characters on Cozy side'
      : 'not found on remote provider'
  },

  async listAccounts(client) {
    const { data } = await client.query(
      Q('io.cozy.accounts').where({ account_type: 'nextcloud' }).limitBy(100)
    )
    return data || []
  },

  async listRemote(client, accountId, path = '/', { trashed = false } = {}) {
    const clean = this._joinRemotePath(path)
    const collection = client.collection(NEXTCLOUD_FILES_DOCTYPE)

    const { data } = await collection.find({
      'cozyMetadata.sourceAccount': accountId,
      parentPath: clean,
      trashed
    })

    return data || []
  },

  async probePath(client, accountId, path = '/') {
    const clean = this._joinRemotePath(path)

    if (clean === '/') {
      const items = await this.listRemote(client, accountId, '/')
      return {
        kind: 'directory',
        items,
        name: '/'
      }
    }

    const parentPath = clean.split('/').slice(0, -1).join('/') || '/'
    const name = this._extractName(clean)

    let siblings
    try {
      siblings = await this.listRemote(client, accountId, parentPath)
    } catch (e) {
      const err = new Error(e?.message || 'Remote probe failed')
      err.status = e?.status
      err.path = clean
      throw err
    }

    const entry = siblings.find(child => {
      const childName = child?.name || child?.attributes?.name
      return childName === name
    })

    if (!entry) {
      const err = new Error(`${name} - 404, ${this._build404Reason(clean)}`)
      err.status = 404
      err.path = clean
      throw err
    }

    const type = entry?.type || entry?.attributes?.type || 'file'

    if (type === 'directory') {
      const items = await this.listRemote(client, accountId, clean)
      return {
        kind: 'directory',
        items,
        name
      }
    }

    return {
      kind: 'file',
      name,
      file: entry
    }
  },

  async findChildDirByName(client, parentId, name) {
    const { data } = await client.query(
      Q('io.cozy.files')
        .where({ dir_id: parentId, name, type: 'directory' })
        .limitBy(1)
    )
    return data && data[0] ? data[0] : null
  },

  async findChildFileByName(client, parentId, name) {
    const { data } = await client.query(
      Q('io.cozy.files')
        .where({ dir_id: parentId, name, type: 'file' })
        .limitBy(1)
    )
    return data && data[0] ? data[0] : null
  },

  async _getExistingFileNamesForDir(client, parentId, cache) {
    if (cache.has(parentId)) {
      return cache.get(parentId)
    }

    const { data } = await client.query(
      Q('io.cozy.files')
        .where({ dir_id: parentId, type: 'file' })
        .limitBy(10000)
    )

    const names = new Set((data || []).map(doc => doc.name).filter(Boolean))
    cache.set(parentId, names)
    return names
  },

  async createChildDir(client, parentId, name) {
    const qs = new URLSearchParams({ Type: 'directory', Name: name })
    const url = `/files/${encodeURIComponent(parentId)}?${qs.toString()}`
    const res = await client.stackClient.fetch('POST', url, null, {
      headers: { Accept: 'application/vnd.api+json' }
    })

    if (res.status >= 200 && res.status < 300) {
      const json = await res.json().catch(() => ({}))
      return json?.data || json
    }

    if (res.status === 409) {
      const existing = await this.findChildDirByName(client, parentId, name)
      if (existing) return existing
    }

    const txt = await res.text().catch(() => '')
    throw new Error(txt || `Create directory failed: HTTP ${res.status}`)
  },

  async ensureChildDir(client, parentId, name) {
    const existing = await this.findChildDirByName(client, parentId, name)
    if (existing) return existing
    return this.createChildDir(client, parentId, name)
  },

  async ensureImportsDestination(
    client,
    providerLabel = 'Nextcloud',
    login = ''
  ) {
    const safeLogin = String(login || 'unknown').replace(/[/\\]/g, '_')
    const files = client.collection('io.cozy.files')
    const path = `Imports/${providerLabel}/${safeLogin}`
    const dirId = await files.ensureDirectoryExists(path)
    return dirId
  },

  async downstreamFile(client, file, targetDirId, { copy = true } = {}) {
    const collection = client.collection(NEXTCLOUD_FILES_DOCTYPE)
    const to = { _id: targetDirId }
    await collection.moveToCozy(file, to, { copy })
    return true
  },

  async importPathRecursive(
    client,
    accountId,
    remotePath = '/',
    targetDirId = 'io.cozy.files.root-dir',
    opts = {}
  ) {
    const {
      copy = true,
      maxDepth = 50,
      _depth = 0,
      onDiscovered,
      onProcessed,
      isAborted,
      _limiter,
      _existingFilesCache
    } = opts

    const limiter = _limiter || this._createLimiter(3, isAborted)
    const existingFilesCache = _existingFilesCache || new Map()
    const isTopLevel = _depth === 0
    const shouldClearCache = isTopLevel && !_existingFilesCache

    const summary = { filesCopied: 0, foldersCreated: 0, errors: [] }

    if (_depth > maxDepth) {
      const path = this._joinRemotePath(remotePath)
      summary.errors.push({
        path,
        name: this._extractName(path),
        status: null,
        reason: 'Max depth reached'
      })
      if (shouldClearCache) existingFilesCache.clear()
      return summary
    }

    const path = this._joinRemotePath(remotePath)
    let probe

    try {
      probe = await this.probePath(client, accountId, path)
    } catch (e) {
      summary.errors.push({
        path,
        name: this._extractName(path),
        status: e?.status || null,
        reason:
          e?.status === 404
            ? this._build404Reason(path)
            : String(e?.message || e)
      })
      if (shouldClearCache) existingFilesCache.clear()
      return summary
    }

    if (probe.kind === 'file') {
      onDiscovered?.({ files: 1, path })

      const fileDoc = probe.file
      const fileName = fileDoc?.name || this._extractName(path)
      const existingNames = await this._getExistingFileNamesForDir(
        client,
        targetDirId,
        existingFilesCache
      )

      if (existingNames.has(fileName)) {
        onProcessed?.({ path })
        if (shouldClearCache) existingFilesCache.clear()
        return summary
      }

      const task = limiter(async () => {
        try {
          if (!isAborted?.()) {
            await this.downstreamFile(client, fileDoc, targetDirId, { copy })
            summary.filesCopied += 1
            existingNames.add(fileName)
          }
        } catch (e) {
          summary.errors.push({
            path,
            name: this._extractName(path),
            status: e?.status || null,
            reason:
              e?.status === 404
                ? this._build404Reason(path)
                : String(e?.message || e)
          })
        } finally {
          onProcessed?.({ path })
        }
      })

      await task
      if (shouldClearCache) existingFilesCache.clear()
      return summary
    }

    const isRoot = path === '/' && _depth === 0
    let destId = targetDirId

    if (!isRoot) {
      const folderName = probe.name || this._extractName(path)
      const destDir = await this.ensureChildDir(client, targetDirId, folderName)
      destId = destDir._id || destDir.id
      summary.foldersCreated += 1
    }

    const children = probe.items || []

    const filesInThisDir = children.reduce((count, child) => {
      const type = child?.type || child?.attributes?.type
      return type === 'directory' ? count : count + 1
    }, 0)

    if (filesInThisDir > 0) {
      onDiscovered?.({ files: filesInThisDir, path })
    }

    const fileTasks = []

    for (const child of children) {
      if (isAborted?.()) break

      const name = child?.name || child?.attributes?.name
      const type = child?.type || child?.attributes?.type
      const childPath =
        child?.path ||
        child?.attributes?.path ||
        this._joinRemotePath(`${path}/${name}`)

      if (type === 'directory') {
        const sub = await this.importPathRecursive(
          client,
          accountId,
          childPath,
          destId,
          {
            copy,
            maxDepth,
            _depth: _depth + 1,
            onDiscovered,
            onProcessed,
            isAborted,
            _limiter: limiter,
            _existingFilesCache: existingFilesCache
          }
        )
        summary.filesCopied += sub.filesCopied
        summary.foldersCreated += sub.foldersCreated
        if (sub.errors?.length) summary.errors.push(...sub.errors)
      } else {
        const fileName = name || this._extractName(childPath)
        const existingNames = await this._getExistingFileNamesForDir(
          client,
          destId,
          existingFilesCache
        )

        if (existingNames.has(fileName)) {
          onProcessed?.({ path: childPath })
          continue
        }

        const task = limiter(async () => {
          try {
            if (!isAborted?.()) {
              await this.downstreamFile(client, child, destId, { copy })
              summary.filesCopied += 1
              existingNames.add(fileName)
            }
          } catch (e) {
            summary.errors.push({
              path: childPath,
              name: this._extractName(childPath),
              status: e?.status || null,
              reason:
                e?.status === 404
                  ? this._build404Reason(childPath)
                  : String(e?.message || e)
            })
          } finally {
            onProcessed?.({ path: childPath })
          }
        })

        fileTasks.push(task)
      }
    }

    if (fileTasks.length > 0) {
      await Promise.all(fileTasks)
    }

    if (shouldClearCache) existingFilesCache.clear()
    return summary
  }
}
