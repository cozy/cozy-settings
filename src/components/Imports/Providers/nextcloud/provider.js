export const nextcloudProvider = {
  id: 'nextcloud',
  label: 'Nextcloud',

  _joinRemotePath(path) {
    if (!path) return '/'
    return path.startsWith('/') ? path : `/${path}`
  },

  async listAccounts(client) {
    const res = await client.stackClient.fetchJSON(
      'POST',
      '/data/io.cozy.accounts/_find',
      { selector: { account_type: 'nextcloud' }, limit: 100 }
    )
    return res?.docs || []
  },

  // Probe a path: file or directory. If directory, include its items.
  async probePath(client, accountId, path = '/') {
    const clean = this._joinRemotePath(path)
    const url = `/remote/nextcloud/${encodeURIComponent(accountId)}${encodeURI(
      clean
    )}`
    const res = await client.stackClient.fetch('GET', url)
    if (res.status === 401) throw new Error('Unauthorized to Nextcloud')
    if (res.status !== 200)
      throw new Error(`Remote probe failed: HTTP ${res.status}`)
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
    const url = `/remote/nextcloud/${encodeURIComponent(accountId)}${encodeURI(
      clean
    )}`
    const res = await client.stackClient.fetch('GET', url)
    if (res.status === 401) throw new Error('Unauthorized to Nextcloud')
    if (res.status !== 200)
      throw new Error(`Remote list failed: HTTP ${res.status}`)
    const json = await res.json()
    return json?.data || []
  },

  // Create directory under parent
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

  // Downstream single FILE
  async downstreamFile(
    client,
    accountId,
    filePath,
    targetDirId,
    { copy = true } = {}
  ) {
    const clean = this._joinRemotePath(filePath)
    const qs = new URLSearchParams({ To: targetDirId })
    if (copy) qs.set('Copy', 'true')
    const url = `/remote/nextcloud/${encodeURIComponent(
      accountId
    )}/downstream${encodeURI(clean)}?${qs.toString()}`
    const res = await client.stackClient.fetch('POST', url)
    if (res.status >= 200 && res.status < 300) return true
    const txt = await res.text().catch(() => '')
    throw new Error(txt || `Downstream failed: HTTP ${res.status}`)
  },

  // Recursive import for file/folder
  async importPathRecursive(
    client,
    accountId,
    remotePath = '/',
    targetDirId = 'io.cozy.files.root-dir',
    { copy = true, maxDepth = 50, _depth = 0 } = {}
  ) {
    if (_depth > maxDepth) {
      return {
        filesCopied: 0,
        foldersCreated: 0,
        errors: [new Error('Max depth reached')]
      }
    }

    const summary = { filesCopied: 0, foldersCreated: 0, errors: [] }
    const probe = await this.probePath(client, accountId, remotePath)

    if (probe.kind === 'file') {
      try {
        await this.downstreamFile(client, accountId, remotePath, targetDirId, {
          copy
        })
        summary.filesCopied += 1
      } catch (e) {
        summary.errors.push({
          path: remotePath,
          error: String(e?.message || e)
        })
      }
      return summary
    }

    const folderName = probe.name || remotePath.split('/').filter(Boolean).pop()
    const destDir = await this.ensureChildDir(client, targetDirId, folderName)
    const destId = destDir._id || destDir.id || destDir?.data?.id || targetDirId
    if (destId && destId !== targetDirId) summary.foldersCreated += 1

    const children = probe.items || []
    for (const child of children) {
      const name = child?.attributes?.name || child?.name
      const type = child?.attributes?.type || child?.type
      const childPath = this._joinRemotePath(`${remotePath}/${name}`)

      if (type === 'directory') {
        const sub = await this.importPathRecursive(
          client,
          accountId,
          childPath,
          destId,
          { copy, maxDepth, _depth: _depth + 1 }
        )
        summary.filesCopied += sub.filesCopied
        summary.foldersCreated += sub.foldersCreated
        if (sub.errors?.length) summary.errors.push(...sub.errors)
      } else {
        try {
          await this.downstreamFile(client, accountId, childPath, destId, {
            copy
          })
          summary.filesCopied += 1
        } catch (e) {
          summary.errors.push({
            path: childPath,
            error: String(e?.message || e)
          })
        }
      }
    }

    return summary
  }
}
