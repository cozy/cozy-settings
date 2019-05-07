import CozyClient from 'cozy-client'

let client = null

export function getClient() {
  if (!client && /comp|inter|loaded/.test(document.readyState)) {
    const root = document.querySelector('[role=application]')
    const data = root.dataset
    const protocol = window.location.protocol
    client = new CozyClient({
      uri: `${protocol}//${data.cozyDomain}`,
      schema: {},
      token: data.cozyToken
    })
  }
  return client
}

export function getStackClient() {
  return getClient().getStackClient()
}
