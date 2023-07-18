/* eslint-disable promise/always-return */
// eslint-disable-next-line no-redeclare

import emailHelper from 'lib/emailHelper'
import { getStackDomain, getStackToken } from './domUtils'

export let STACK_DOMAIN = getStackDomain()
export let STACK_TOKEN = getStackToken()

if (!(STACK_TOKEN || STACK_DOMAIN)) {
  // eslint-disable-next-line no-console
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

export const fetchInfos = client => {
  return dispatch => {
    dispatch({ type: FETCH_INFOS })
    cozyFetch(client, 'GET', '/settings/instance')
      .then(instance => {
        // tracking preference is stored as string, convert it to boolean for the checkbox
        if (
          instance &&
          instance.data &&
          instance.data.attributes &&
          // eslint-disable-next-line no-prototype-builtins
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

const tryUpdate = async (client, instance, { retries = 0 }) => {
  try {
    return await cozyFetch(client, 'PUT', '/settings/instance', instance)
  } catch (error) {
    const isConflictError = error.status === 409
    if (isConflictError && retries) {
      const remoteInstance = await cozyFetch(
        client,
        'GET',
        '/settings/instance'
      )
      remoteInstance.data.attributes = instance.data.attributes
      return tryUpdate(client, remoteInstance, { retries: retries - 1 })
    } else {
      throw error
    }
  }
}

export const updateInfo = (client, field, value) => {
  return async (dispatch, getState) => {
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
    // eslint-disable-next-line no-param-reassign
    if (field === 'tracking') value = value.toString()
    const instance = { ...getState().instance }
    // We are actually mutating also getState().instance.data.attributes here.
    // TODO: Avoid mutation of getState().instance.data.attributes, and check
    // if the whole form keeps working.
    // The whole form could be refactored with latests improvements from
    // CozyCllient and use react-final-form.
    instance.data.attributes[field] = value

    let updatedInstance

    try {
      updatedInstance = await tryUpdate(client, instance, { retries: 3 })
    } catch (error) {
      dispatch({
        type: UPDATE_INFO_FAILURE,
        field,
        error: 'ProfileView.infos.server_error'
      })

      return instance
    }

    dispatch({ type: UPDATE_INFO_SUCCESS, field, instance })

    setTimeout(() => {
      dispatch({ type: RESET_INFO_FIELD, field })
    }, 3000)

    if (field === 'locale') {
      dispatch({ type: SET_LANG, lang: value })
    }

    return updatedInstance
  }
}

const DISPLAYED_CLIENTS = ['mobile', 'desktop', 'browser']
export const fetchDevices = client => {
  return async dispatch => {
    dispatch({ type: FETCH_DEVICES })

    cozyFetch(client, 'GET', '/settings/clients')
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

export const fetchSessions = client => {
  return async dispatch => {
    dispatch({ type: FETCH_SESSIONS })

    const sessions = []
    let responseSessions
    let responseCurrentsSessionsIds

    try {
      // GET all the sessions
      responseSessions = await cozyFetch(
        client,
        'GET',
        '/data/io.cozy.sessions.logins/_all_docs?include_docs=true'
      )
      // Sort allSessions in an array
      responseSessions.rows.map(row => sessions.push(row.doc))
      // GET currents sessions id
      responseCurrentsSessionsIds = await cozyFetch(
        client,
        'GET',
        '/settings/sessions'
      )
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

export const deleteOtherSessions = client => {
  return async dispatch => {
    dispatch({ type: SESSIONS_DELETE_OTHERS })
    cozyFetch(client, 'DELETE', '/auth/login/others')
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

export const cozyFetch = (client, method, path, body) => {
  return client.stackClient.fetchJSON(method, path, body)
}
