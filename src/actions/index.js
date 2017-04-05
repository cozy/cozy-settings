/* global fetch */

import emailHelper from '../lib/emailHelper'

export const FETCH_INFOS = 'FETCH_INFOS'
export const FETCH_INFOS_SUCCESS = 'FETCH_INFOS_SUCCESS'
export const FETCH_INFOS_FAILURE = 'FETCH_INFOS_FAILURE'
export const UPDATE_INFO = 'UPDATE_INFO'
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_FAILURE = 'UPDATE_INFO_FAILURE'
export const RESET_INFO_FIELD = 'RESET_INFO_FIELD'

export const SET_LANG = 'SET_LANG'

export const UPDATE_PASSPHRASE = 'UPDATE_PASSPHRASE'
export const UPDATE_PASSPHRASE_SUCCESS = 'UPDATE_PASSPHRASE_SUCCESS'
export const UPDATE_PASSPHRASE_FAILURE = 'UPDATE_PASSPHRASE_FAILURE'
export const RESET_PASSPHRASE_FIELD = 'RESET_PASSPHRASE_FIELD'

export const FETCH_DEVICES = 'FETCH_DEVICES'
export const FETCH_DEVICES_SUCCESS = 'FETCH_DEVICES_SUCCESS'
export const FETCH_DEVICES_FAILURE = 'FETCH_DEVICES_FAILURE'
export const DEVICES_MODALE_REVOKE_OPEN = 'DEVICES_MODALE_REVOKE_OPEN'
export const DEVICES_MODALE_REVOKE_CLOSE = 'DEVICES_MODALE_REVOKE_CLOSE'
export const DEVICE_REVOKE = 'DEVICE_REVOKE'
export const DEVICE_REVOKE_SUCCESS = 'DEVICE_REVOKE_SUCCESS'
export const DEVICE_REVOKE_FAILURE = 'DEVICE_REVOKE_FAILURE'

export const ALERT_CLOSED = 'ALERT_CLOSED'

export const fetchInfos = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_INFOS })
    cozyFetch('GET', '/settings/instance')
      .then(instance => {
        dispatch({ type: FETCH_INFOS_SUCCESS, instance })
      })
      .catch(() => {
        dispatch({ type: FETCH_INFOS_FAILURE, error: 'ProfileView.infos.server_error' })
      })
  }
}

export const updateInfo = (field, value) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_INFO, field, value })
    // Check if the field is empty or not
    if (value === '') {
      dispatch({ type: UPDATE_INFO_FAILURE, field, error: 'ProfileView.infos.empty' })
      return
    }
    if ((field === 'email') && (!emailHelper.isValidEmail(value))) {
      dispatch({ type: UPDATE_INFO_FAILURE, field, error: 'ProfileView.email.error' })
      return
    }
    let newInstance = Object.assign({}, getState().instance)
    newInstance.data.attributes[field] = value
    cozyFetch('PUT', '/settings/instance', newInstance)
      .then(instance => {
        dispatch({ type: UPDATE_INFO_SUCCESS, field, instance })
        setTimeout(() => {
          dispatch({ type: RESET_INFO_FIELD, field })
        }, 3000)
        if (field === 'locale') {
          dispatch({ type: SET_LANG, lang: value })
        }
      })
      .catch(() => {
        dispatch({ type: UPDATE_INFO_FAILURE, error: 'ProfileView.infos.server_error' })
      })
  }
}

export const updatePassphrase = (current, newVal) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_PASSPHRASE })
    return cozyFetch('PUT', '/settings/passphrase', {
      'current_passphrase': current,
      'new_passphrase': newVal
    }).then(instance => {
      dispatch({
        type: UPDATE_PASSPHRASE_SUCCESS,
        alert: {
          message: 'ProfileView.password.reload'
        }
      })
      setTimeout(() => {
        dispatch({ type: RESET_PASSPHRASE_FIELD })
        // the token changes after a password change, so we need to reload the page to get the new one
        window.location.reload()
      }, 4000)// 4s, a bit longer than the alert message
    }).catch(error => {
      const errors = error.errors || []
      if (errors.length && errors[0].detail === 'Invalid passphrase') {
        dispatch({
          type: UPDATE_PASSPHRASE_FAILURE,
          errors: { currentPassword: 'ProfileView.password.wrong_password' }
        })
      } else {
        dispatch({
          type: UPDATE_PASSPHRASE_FAILURE,
          errors: { global: 'ProfileView.password.server_error' }
        })
      }
    })
  }
}

export const fetchDevices = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_DEVICES })

    cozyFetch('GET', '/settings/clients')
    .then(response => {
      // transform th raw data into a more digestable format for the app
      let devices = response.data.map((device) => {
        let deviceData = device.attributes
        deviceData.id = device.id
        return deviceData
      })
      dispatch({ type: FETCH_DEVICES_SUCCESS, devices })
    })
    .catch(() => {
      dispatch({
        type: FETCH_DEVICES_FAILURE,
        alert: {
          message: 'DevicesView.load_error'
        }
      })
    })
  }
}

export const devicePerformRevoke = (deviceId) => {
  return (dispatch, getState) => {
    dispatch({ type: DEVICE_REVOKE })

    cozyFetch('DELETE', '/settings/clients/' + deviceId)
    .then(() => {
      dispatch({ type: DEVICE_REVOKE_SUCCESS, deviceId })
    })
    .catch(() => {
      dispatch({
        type: DEVICE_REVOKE_FAILURE,
        alert: {
          message: 'revokeDevice.error'
        }
      })
    })
  }
}

export const deviceModaleRevokeOpen = (device) => ({
  type: DEVICES_MODALE_REVOKE_OPEN,
  device
})

export const deviceModaleRevokeClose = () => ({
  type: DEVICES_MODALE_REVOKE_CLOSE
})

const STACK_DOMAIN = '//' + document.querySelector('[role=application]').dataset.cozyDomain
const STACK_TOKEN = document.querySelector('[role=application]').dataset.cozyToken

const cozyFetch = (method, path, body) => {
  let params = {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STACK_TOKEN}`
    }
  }
  if (body) {
    params.body = JSON.stringify(body)
  }
  return fetch(`${STACK_DOMAIN}${path}`, params)
    .then(response => {
      let data
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.indexOf('json') >= 0) {
        data = response.json()
      } else {
        data = response.text()
      }

      return (response.status === 200 || response.status === 204)
        ? data
        : data.then(Promise.reject.bind(Promise))
    })
}
