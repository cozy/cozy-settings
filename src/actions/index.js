/* global fetch */

import emailHelper from '../lib/emailHelper'

export let STACK_DOMAIN = null
export let STACK_TOKEN = null

if (document.querySelector('[role=application]')) {
  STACK_DOMAIN =
    '//' + document.querySelector('[role=application]').dataset.cozyDomain
  STACK_TOKEN = document.querySelector('[role=application]').dataset.cozyToken
}

if (!(STACK_TOKEN || STACK_DOMAIN)) {
  console.error(
    'Settings need the Cozy URL and the token to work correctly. Elements not found.'
  )
}

export const FETCH_INFOS = 'FETCH_INFOS'
export const FETCH_INFOS_SUCCESS = 'FETCH_INFOS_SUCCESS'
export const FETCH_INFOS_FAILURE = 'FETCH_INFOS_FAILURE'
export const UPDATE_INFO = 'UPDATE_INFO'
export const UPDATE_INFO_SUCCESS = 'UPDATE_INFO_SUCCESS'
export const UPDATE_INFO_FAILURE = 'UPDATE_INFO_FAILURE'
export const RESET_INFO_FIELD = 'RESET_INFO_FIELD'

export const CHECK_MAIL_CONFIRMATION_CODE = 'CHECK_MAIL_CONFIRMATION_CODE'
export const CHECK_MAIL_CONFIRMATION_CODE_FAILURE =
  'CHECK_MAIL_CONFIRMATION_CODE_FAILURE'

export const SET_LANG = 'SET_LANG'

export const FETCH_DEVICES = 'FETCH_DEVICES'
export const FETCH_DEVICES_SUCCESS = 'FETCH_DEVICES_SUCCESS'
export const FETCH_DEVICES_FAILURE = 'FETCH_DEVICES_FAILURE'
export const DEVICES_MODALE_REVOKE_OPEN = 'DEVICES_MODALE_REVOKE_OPEN'
export const DEVICES_MODALE_REVOKE_CLOSE = 'DEVICES_MODALE_REVOKE_CLOSE'
export const DEVICE_REVOKE = 'DEVICE_REVOKE'
export const DEVICE_REVOKE_SUCCESS = 'DEVICE_REVOKE_SUCCESS'
export const DEVICE_REVOKE_FAILURE = 'DEVICE_REVOKE_FAILURE'

export const FETCH_SESSIONS = 'FETCH_SESSIONS'
export const FETCH_SESSIONS_SUCCESS = 'FETCH_SESSIONS_SUCCESS'
export const FETCH_SESSIONS_FAILURE = 'FETCH_SESSIONS_FAILURE'
export const SESSIONS_DELETE_OTHERS = 'SESSIONS_DELETE_OTHERS'
export const SESSIONS_DELETE_OTHERS_SUCCESS = 'SESSIONS_DELETE_OTHERS_SUCCESS'
export const SESSIONS_DELETE_OTHERS_FAILURE = 'SESSIONS_DELETE_OTHERS_FAILURE'

export const FETCH_STORAGE = 'FETCH_STORAGE'
export const FETCH_STORAGE_SUCCESS = 'FETCH_STORAGE_SUCCESS'
export const FETCH_STORAGE_FAILURE = 'FETCH_STORAGE_FAILURE'

export const fetchInfos = () => {
  return dispatch => {
    dispatch({ type: FETCH_INFOS })
    cozyFetch('GET', '/settings/instance')
      .then(instance => {
        // tracking preference is stored as string, convert it to boolean for the checkbox
        if (
          instance &&
          instance.data &&
          instance.data.attributes &&
          instance.data.attributes.hasOwnProperty('tracking')
        ) {
          instance.data.attributes.tracking =
            instance.data.attributes.tracking === 'true'
        }
        dispatch({ type: FETCH_INFOS_SUCCESS, instance })
      })
      .catch(() => {
        dispatch({
          type: FETCH_INFOS_FAILURE,
          error: 'ProfileView.infos.server_error'
        })
      })
  }
}

export const fetchStorageData = () => {
  return async dispatch => {
    dispatch({ type: FETCH_STORAGE })
    let offersLink = null
    try {
      // should be not blocking
      const ctx = await cozyFetch('GET', '/settings/context')
      const instance = await cozyFetch('GET', '/settings/instance')
      const managerUrl =
        ctx &&
        ctx.data &&
        ctx.data.attributes &&
        ctx.data.attributes.manager_url
      const uuid =
        instance &&
        instance.data &&
        instance.data.attributes &&
        instance.data.attributes.uuid
      if (managerUrl && uuid) {
        offersLink = `${managerUrl}/cozy/instances/${uuid}/premium`
      }
    } catch (e) {
      if (e.error && e.error !== 'Not Found') {
        console.warn(e)
      } else if (!e.error) {
        console.warn(e)
      }
    }
    cozyFetch('GET', '/settings/disk-usage')
      .then(json => {
        dispatch({
          type: FETCH_STORAGE_SUCCESS,
          storageData: {
            usage: parseInt(json.data.attributes.used, 10),
            // TODO Better handling when no quota provided
            quota: parseInt(json.data.attributes.quota, 10) || 100000000000,
            isLimited: json.data.attributes.is_limited,
            offersLink
          }
        })
      })
      .catch(error => {
        dispatch({ type: FETCH_STORAGE_FAILURE })
        throw error
      })
  }
}

export const updateInfo = (field, value) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_INFO, field, value })
    // Check if the field is empty or not
    if (value === '') {
      dispatch({
        type: UPDATE_INFO_FAILURE,
        field,
        error: 'ProfileView.infos.empty'
      })
      return
    }
    if (field === 'email' && !emailHelper.isValidEmail(value)) {
      dispatch({
        type: UPDATE_INFO_FAILURE,
        field,
        error: 'ProfileView.email.error'
      })
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
        dispatch({
          type: UPDATE_INFO_FAILURE,
          field,
          error: 'ProfileView.infos.server_error'
        })
      })
  }
}

const DISPLAYED_CLIENTS = ['mobile', 'desktop']
export const fetchDevices = () => {
  return async dispatch => {
    dispatch({ type: FETCH_DEVICES })

    cozyFetch('GET', '/settings/clients')
      .then(response => {
        // transform th raw data into a more digestable format for the app
        let devices = response.data
          .map(device => {
            let deviceData = device.attributes
            deviceData.id = device.id
            return deviceData
          })
          .filter(device => DISPLAYED_CLIENTS.includes(device.client_kind))
        dispatch({ type: FETCH_DEVICES_SUCCESS, devices })
      })
      .catch(error => {
        dispatch({ type: FETCH_DEVICES_FAILURE })
        throw error
      })
  }
}

export const devicePerformRevoke = deviceId => {
  return async dispatch => {
    dispatch({ type: DEVICE_REVOKE })

    cozyFetch('DELETE', '/settings/clients/' + deviceId)
      .then(() => {
        dispatch({ type: DEVICE_REVOKE_SUCCESS, deviceId })
      })
      .catch(error => {
        dispatch({ type: DEVICE_REVOKE_FAILURE })
        throw error
      })
  }
}

export const deviceModaleRevokeOpen = device => ({
  type: DEVICES_MODALE_REVOKE_OPEN,
  device
})

export const deviceModaleRevokeClose = () => ({
  type: DEVICES_MODALE_REVOKE_CLOSE
})

export const fetchSessions = () => {
  return async dispatch => {
    dispatch({ type: FETCH_SESSIONS })

    const sessions = []
    let responseSessions
    let responseCurrentsSessionsIds

    try {
      // GET all the sessions
      responseSessions = await cozyFetch(
        'GET',
        '/data/io.cozy.sessions.logins/_all_docs?include_docs=true'
      )
      // Sort allSessions in an array
      responseSessions.rows.map(row => sessions.push(row.doc))
      // GET currents sessions id
      responseCurrentsSessionsIds = await cozyFetch('GET', '/settings/sessions')
    } catch (error) {
      dispatch({ type: FETCH_SESSIONS_FAILURE })
      throw error
    }

    // Merge ID and Sessions to inject only currents sessions in the store
    const currentsSessions = []

    responseCurrentsSessionsIds.data.map(currentSessionId => {
      for (let session of sessions) {
        currentSessionId.id === session.session_id &&
          currentsSessions.push(session)
      }
    })

    dispatch({ type: FETCH_SESSIONS_SUCCESS, sessions: currentsSessions })
  }
}

export const deleteOtherSessions = () => {
  return async dispatch => {
    dispatch({ type: SESSIONS_DELETE_OTHERS })
    cozyFetch('DELETE', '/auth/login/others')
      .then(() => {
        dispatch({ type: SESSIONS_DELETE_OTHERS_SUCCESS })
      })
      .then(() => {
        dispatch(fetchSessions())
      })
      .catch(error => {
        dispatch({ type: SESSIONS_DELETE_OTHERS_FAILURE })
        throw error
      })
  }
}

export const cozyFetch = (method, path, body) => {
  let params = {
    method: method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STACK_TOKEN}`
    }
  }
  if (body) {
    params.body = JSON.stringify(body)
  }
  return fetch(`${STACK_DOMAIN}${path}`, params).then(response => {
    let data
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.indexOf('json') >= 0) {
      data = response.json()
    } else {
      data = response.text()
    }

    return response.status >= 200 && response.status <= 204
      ? data
      : data.then(Promise.reject.bind(Promise))
  })
}
