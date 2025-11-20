export async function createNextcloudAccount(client, { login, password, url }) {
  if (!login || !password || !url) {
    throw new Error('Missing credentials for Nextcloud account creation')
  }

  const accountData = {
    _type: 'io.cozy.accounts',
    account_type: 'nextcloud',
    auth: {
      login,
      password,
      url
    },
    identifier: 'login',
    name: login,
    state: null
  }

  const res = await client.save(accountData)
  // cozy-client usually returns the saved doc directly, but keep a safe fallback
  return res && res.data ? res.data : res
}

export async function listNextcloudAccounts(client) {
  const res = await client.stackClient.fetchJSON(
    'POST',
    '/data/io.cozy.accounts/_find',
    { selector: { account_type: 'nextcloud' }, limit: 100 }
  )
  return res?.docs || []
}
