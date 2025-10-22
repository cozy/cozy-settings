export const nextcloudProvider = {
  id: 'nextcloud',
  label: 'Nextcloud',

  _joinRemotePath(path) {
    if (!path) return '/'
    return path.startsWith('/') ? path : `/${path}`
  },

  async findAccount(client, { login, url } = {}) {
    const res = await client.stackClient.fetchJSON(
      'POST',
      '/data/io.cozy.accounts/_find',
      { selector: { account_type: 'nextcloud' }, limit: 50 }
    )
    const docs = res?.docs || []
    if (!login && !url) return docs[0] || null
    const norm = s => (s || '').replace(/\/+$/, '')
    const match = docs.find(
      a => a?.auth?.login === login && norm(a?.auth?.url) === norm(url)
    )
    return match || docs[0] || null
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

  async importDownstream(
    client,
    accountId,
    path = '/',
    targetDirId = 'io.cozy.files.root-dir'
  ) {
    const clean = this._joinRemotePath(path)
    const url = `/remote/nextcloud/${encodeURIComponent(
      accountId
    )}/downstream${encodeURI(clean)}`
    const body = { dir_id: targetDirId }
    const res = await client.stackClient.fetch(
      'POST',
      url,
      JSON.stringify(body),
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    )
    if (res.status < 200 || res.status >= 300) {
      const txt = await res.text().catch(() => '')
      throw new Error(txt || `Downstream failed: HTTP ${res.status}`)
    }
    const json = await res.json().catch(() => ({}))
    const jobId =
      json?.data?.id ||
      json?.job_id ||
      json?.id ||
      (Array.isArray(json?.data) && json.data[0]?.id) ||
      null
    return { jobId, raw: json }
  },

  async pollJob(client, jobId, { intervalMs = 1500, maxMs = 90_000 } = {}) {
    if (!jobId) return { state: 'unknown' }
    const start = Date.now()
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const res = await client.stackClient.fetchJSON(
        'GET',
        `/jobs/${encodeURIComponent(jobId)}`
      )
      const state = res?.data?.attributes?.state || res?.state || 'unknown'
      if (
        state === 'done' ||
        state === 'errored' ||
        state === 'succeeded' ||
        state === 'failed'
      ) {
        const err = res?.data?.attributes?.error || res?.error || null
        return { state, error: err || null }
      }
      if (Date.now() - start > maxMs) return { state: 'timeout' }
      await new Promise(resolve => setTimeout(resolve, intervalMs))
    }
  }
}
