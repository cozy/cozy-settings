export const nextcloudProvider = {
  id: 'nextcloud',
  label: 'Nextcloud',

  _joinRemotePath(path) {
    if (!path) return '/'
    let p = String(path).trim()

    p = p.replace(/\\/g, '/')
    p = p.replace(/\/+/g, '/')

    if (!p.startsWith('/')) p = '/' + p
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)

    return p
  },

  _encodeRemotePath(path) {
    const clean = this._joinRemotePath(path || '/')
    if (clean === '/') return '/'
    const segments = clean
      .split('/')
      .filter(Boolean)
      .map(seg => encodeURIComponent(seg))
    return `/${segments.join('/')}`
  },

  _extractName(path) {
    const clean = this._joinRemotePath(path || '/')
    const parts = clean.split('/').filter(Boolean)
    return parts.pop() || '/'
  },

  _build404Reason(path) {
    const name = this._extractName(path)
    const hasWeirdChars = /[^\u0020-\u007E]/.test(name) || /[*'^()]/.test(name)
    if (hasWeirdChars) {
      return 'probable unsupported characters on Cozy side'
    }
    return 'not found on remote provider'
  },

  async listAccounts(client) {
    const res = await client.stackClient.fetchJSON(
      'POST',
      '/data/io.cozy.accounts/_find',
      { selector: { account_type: 'nextcloud' }, limit: 100 }
    )
    return res?.docs || []
  },

  async probePath(client, accountId, path = '/') {
    const clean = this._joinRemotePath(path)
    const encodedPath = this._encodeRemotePath(clean)
    const url = `/remote/nextcloud/${encodeURIComponent(
      accountId
    )}${encodedPath}`
    const res = await client.stackClient.fetch('GET', url)

    if (res.status === 401) {
      const err = new Error('Unauthorized to Nextcloud')
      err.status = 401
      err.path = clean
      throw err
    }

    if (res.status === 404) {
      const txt = await res.text().catch(() => '')
      const err = new Error(
        txt ||
          `${this._extractName(clean)} - 404, ${this._build404Reason(clean)}`
      )
      err.status = 404
      err.path = clean
      throw err
    }

    if (res.status !== 200) {
      const txt = await res.text().catch(() => '')
      const err = new Error(txt || `Remote probe failed: HTTP ${res.status}`)
      err.status = res.status
      err.path = clean
      throw err
    }

    const json = await res.json()
    const data = json?.data
    if (Array.isArray(data)) {
      return {
        kind: 'directory',
        items: data,
        name: clean.split('/').filter(Boolean).pop() || '/'
      }
    } else {
      const name =
        data?.attributes?.name || data?.name || clean.split('/').pop()
      const type = data?.attributes?.type || data?.type || 'file'
      if (type === 'directory') {
        const listing = await this.listRemote(client, accountId, clean)
        return { kind: 'directory', items: listing, name }
      }
      return { kind: 'file', name }
    }
  },

  async listRemote(client, accountId, path = '/') {
    const clean = this._joinRemotePath(path)
    const encodedPath = this._encodeRemotePath(clean)
    const url = `/remote/nextcloud/${encodeURIComponent(
      accountId
    )}${encodedPath}`
    const res = await client.stackClient.fetch('GET', url)

    if (res.status === 401) {
      const err = new Error('Unauthorized to Nextcloud')
      err.status = 401
      err.path = clean
      throw err
    }

    if (res.status === 404) {
      const txt = await res.text().catch(() => '')
      const err = new Error(
        txt ||
          `${this._extractName(clean)} - 404, ${this._build404Reason(clean)}`
      )
      err.status = 404
      err.path = clean
      throw err
    }

    if (res.status !== 200) {
      const txt = await res.text().catch(() => '')
      const err = new Error(txt || `Remote list failed: HTTP ${res.status}`)
      err.status = res.status
      err.path = clean
      throw err
    }

    const json = await res.json()
    return json?.data || []
  },

  async findChildDirByName(client, parentId, name) {
    const res = await client.stackClient.fetchJSON(
      'POST',
      '/data/io.cozy.files/_find',
      { selector: { dir_id: parentId, name, type: 'directory' }, limit: 1 }
    )
    return res?.docs?.[0] || null
  },

  async createChildDir(client, parentId, name) {
    const qs = new URLSearchParams({ Type: 'directory', Name: name })
    const url = `/files/${encodeURIComponent(parentId)}?${qs.toString()}`
    const res = await client.stackClient.fetch('POST', url, null, {
      headers: {
        Accept: 'application/vnd.api+json'
      }
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
    const ROOT = 'io.cozy.files.root-dir'
    const importsDir = await this.ensureChildDir(client, ROOT, 'Imports')
    const providerDir = await this.ensureChildDir(
      client,
      importsDir._id || importsDir.id,
      providerLabel
    )
    const safeLogin = String(login || 'unknown').replace(/[/\\]/g, '_')
    const finalDir = await this.ensureChildDir(
      client,
      providerDir._id || providerDir.id,
      safeLogin
    )
    return finalDir._id || finalDir.id
  },

  async downstreamFile(
    client,
    accountId,
    filePath,
    targetDirId,
    { copy = true } = {}
  ) {
    const clean = this._joinRemotePath(filePath)
    const encodedPath = this._encodeRemotePath(clean)
    const qs = new URLSearchParams({ To: targetDirId })
    if (copy) qs.set('Copy', 'true')
    const url = `/remote/nextcloud/${encodeURIComponent(
      accountId
    )}/downstream${encodedPath}?${qs.toString()}`
    const res = await client.stackClient.fetch('POST', url)

    if (res.status >= 200 && res.status < 300) {
      return true
    }

    const txt = await res.text().catch(() => '')
    let message = txt || `Downstream failed: HTTP ${res.status}`

    if (res.status === 404) {
      message = `${this._extractName(clean)} - 404, ${this._build404Reason(
        clean
      )}`
    }

    const err = new Error(message)
    err.status = res.status
    err.path = clean
    throw err
  },

  async importPathRecursive(
    client,
    accountId,
    remotePath = '/',
    targetDirId = 'io.cozy.files.root-dir',
    { copy = true, maxDepth = 50, _depth = 0 } = {}
  ) {
    const summary = { filesCopied: 0, foldersCreated: 0, errors: [] }

    if (_depth > maxDepth) {
      const path = this._joinRemotePath(remotePath || '/')
      summary.errors.push({
        path,
        name: this._extractName(path),
        status: null,
        reason: 'Max depth reached'
      })
      return summary
    }

    const path = this._joinRemotePath(remotePath || '/')
    let probe

    try {
      probe = await this.probePath(client, accountId, path)
    } catch (e) {
      if (e && e.status === 404) {
        summary.errors.push({
          path,
          name: this._extractName(path),
          status: 404,
          reason: this._build404Reason(path)
        })
        return summary
      }

      summary.errors.push({
        path,
        name: this._extractName(path),
        status: e?.status || null,
        reason: String(e?.message || e)
      })
      return summary
    }

    if (probe.kind === 'file') {
      try {
        await this.downstreamFile(client, accountId, path, targetDirId, {
          copy
        })
        summary.filesCopied += 1
      } catch (e) {
        if (e && e.status === 404) {
          summary.errors.push({
            path,
            name: this._extractName(path),
            status: 404,
            reason: this._build404Reason(path)
          })
        } else {
          summary.errors.push({
            path,
            name: this._extractName(path),
            status: e?.status || null,
            reason: String(e?.message || e)
          })
        }
      }
      return summary
    }

    const isRoot = path === '/' && _depth === 0
    let destId = targetDirId

    if (!isRoot) {
      const folderName = probe.name || path.split('/').filter(Boolean).pop()
      const destDir = await this.ensureChildDir(client, targetDirId, folderName)
      destId = destDir._id || destDir.id || destDir?.data?.id || targetDirId
      if (destId && destId !== targetDirId) summary.foldersCreated += 1
    }

    const children = probe.items || []
    for (const child of children) {
      const name = child?.attributes?.name || child?.name
      const type = child?.attributes?.type || child?.type

      const childRemotePath =
        child?.attributes?.path ||
        child?.path ||
        this._joinRemotePath(`${path}/${name}`)

      if (type === 'directory') {
        const sub = await this.importPathRecursive(
          client,
          accountId,
          childRemotePath,
          destId,
          { copy, maxDepth, _depth: _depth + 1 }
        )
        summary.filesCopied += sub.filesCopied
        summary.foldersCreated += sub.foldersCreated
        if (sub.errors?.length) summary.errors.push(...sub.errors)
      } else {
        try {
          await this.downstreamFile(
            client,
            accountId,
            childRemotePath,
            destId,
            { copy }
          )
          summary.filesCopied += 1
        } catch (e) {
          if (e && e.status === 404) {
            summary.errors.push({
              path: childRemotePath,
              name: this._extractName(childRemotePath),
              status: 404,
              reason: this._build404Reason(childRemotePath)
            })
          } else {
            summary.errors.push({
              path: childRemotePath,
              name: this._extractName(childRemotePath),
              status: e?.status || null,
              reason: String(e?.message || e)
            })
          }
        }
      }
    }

    return summary
  }
}
