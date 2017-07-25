/* global fetch, cozy */

import emailHelper from '../lib/emailHelper'
import CLAUDY_ACTIONS from '../config/claudyActions'

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
export const INSTALL_APP = 'INSTALL_APP'
export const INSTALL_APP_SUCCESS = 'INSTALL_APP_SUCCESS'
export const INSTALL_APP_FAILURE = 'INSTALL_APP_FAILURE'

export const FETCH_CLAUDY_INFOS = 'FETCH_CLAUDY_INFOS'
export const FETCH_CLAUDY_INFOS_SUCCESS = 'FETCH_CLAUDY_INFOS_SUCCESS'
export const FETCH_CLAUDY_INFOS_FAILURE = 'FETCH_CLAUDY_INFOS_FAILURE'

export const CREATE_INTENT_SERVICE = 'CREATE_INTENT_SERVICE'
export const CREATE_INTENT_SERVICE_SUCCESS = 'CREATE_INTENT_SERVICE_SUCCESS'
export const CREATE_INTENT_SERVICE_FAILURE = 'CREATE_INTENT_SERVICE_FAILURE'

export const createIntentService = (intent, window) => {
  return (dispatch, getState) => {
    dispatch({ type: CREATE_INTENT_SERVICE })
    cozy.client.intents.createService(intent, window)
    .then(service => {
      dispatch({ type: CREATE_INTENT_SERVICE_SUCCESS, service })
    })
    .catch(error => {
      dispatch({ type: CREATE_INTENT_SERVICE_FAILURE, error })
    })
  }
}

export const fetchClaudyInfos = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_CLAUDY_INFOS })
    cozyFetch('GET', '/settings/context')
    .then(context => {
      const contextActions = (context.data && context.data.attributes && context.data.attributes['claudy_actions']) || null
      let claudyActions = []
      if (contextActions) {
        // get an arrays of action
        claudyActions = contextActions.map(slug => {
          if (CLAUDY_ACTIONS.hasOwnProperty(slug)) {
            // adding also the action slug
            return Object.assign({}, CLAUDY_ACTIONS[slug], { slug })
          }
        }).filter(action => action)
      }
      dispatch(consolidateClaudyActionsInfos(claudyActions))
    })
    .catch(error => {
      dispatch({ type: FETCH_CLAUDY_INFOS_FAILURE, error })
    })
  }
}

export const consolidateClaudyActionsInfos = (claudyActions) => {
  const ACTIONS_WITH_DEVICES = ['desktop', 'mobile']
  return async (dispatch, getState) => {
    let apps
    // if at least one action requires app links
    if (claudyActions.find(a => a.link && a.link.type === 'apps')) {
      try {
        const appsResponse = await cozyFetch('GET', '/apps/')
        apps = appsResponse.data
      } catch (e) {
        console.warn && console.warn('Cannot fetch client devices infos.')
        apps = [] // keep list empty if apps cannot be fetched
      }
    }
    // if at least one action requires devices infos
    if (claudyActions.find(a => ACTIONS_WITH_DEVICES.includes(a.slug))) {
      await dispatch(fetchDevices())
    }
    dispatch({ type: FETCH_CLAUDY_INFOS_SUCCESS, claudyActions, apps })
  }
}

export const fetchInfos = () => {
  return (dispatch, getState) => {
    dispatch({ type: FETCH_INFOS })
    cozyFetch('GET', '/settings/instance')
      .then(instance => {
        // tracking preference is stored as string, convert it to boolean for the checkbox
        if (instance && instance.data && instance.data.attributes && instance.data.attributes.hasOwnProperty('tracking')) {
          instance.data.attributes.tracking = instance.data.attributes.tracking === 'true'
        }
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
    // tracking field must be stored as string
    if (field === 'tracking') value = value.toString()
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
        dispatch({ type: UPDATE_INFO_FAILURE, field, error: 'ProfileView.infos.server_error' })
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

export const installApp = (slug, repourl, isupdate) => {
  return (dispatch, getState) => {
    dispatch({ type: INSTALL_APP })
    const verb = isupdate ? 'PUT' : 'POST'
    return cozyFetch(verb, `/apps/${slug}?Source=${encodeURIComponent(repourl)}`)
    .then(response => {
      dispatch({
        type: INSTALL_APP_SUCCESS,
        alert: {
          message: `InstallView.${isupdate ? 'update' : 'install'}_success`,
          messageData: {slug},
          level: 'success'
        }
      })
    })
    .catch(() => {
      dispatch({
        type: INSTALL_APP_FAILURE,
        alert: {
          message: `InstallView.${isupdate ? 'update' : 'install'}_error`,
          messageData: {slug},
          level: 'error'
        }
      })
    })
  }
}

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

      return (response.status === 200 || response.status === 202 || response.status === 204)
        ? data
        : data.then(Promise.reject.bind(Promise))
    })
}
