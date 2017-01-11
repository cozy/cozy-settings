/* global fetch */

export default class SettingsStore {
  constructor (stackDomain) {
    this.stackDomain = stackDomain
  }

  updatePassphrase (currentPassphrase, newPassphrase) {
    return this.fetchURLEncoded(
      'PUT',
      `${this.stackDomain}/auth/passphrase`,
      {
        'current-passphrase': currentPassphrase,
        'new-passphrase': newPassphrase
      }
    ).then(response => {
      return response.status === 200
        ? response
        : response.json().then(Promise.reject.bind(Promise))
    })
  }

  fetch (method, url, body) {
    let params = {
      method: method,
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    if (body) {
      params.body = JSON.stringify(body)
    }
    return fetch(url, params)
  }

  fetchURLEncoded (method, url, body) {
    let params = {
      method: method,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    if (body && typeof body === 'object') {
      // convert Object to urlEncoded
      params.body = Object.keys(body).map(function (k) {
        return encodeURIComponent(k) + '=' + encodeURIComponent(body[k])
      }).join('&')
    }
    return fetch(url, params)
  }
}
