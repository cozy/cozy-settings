import { combineReducers } from 'redux'

import {
  FETCH_INFOS,
  FETCH_INFOS_SUCCESS,
  FETCH_INFOS_FAILURE,

  UPDATE_INFO_FAILURE,

  FETCH_DEVICES,
  FETCH_DEVICES_SUCCESS,
  FETCH_DEVICES_FAILURE,

  DEVICE_REVOKE,
  DEVICE_REVOKE_SUCCESS,
  DEVICE_REVOKE_FAILURE,

  SET_LANG,

  ALERT_CLOSED
} from '../actions'

const context = (state = window.context || null, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const lang = (state = document.documentElement.getAttribute('lang') || 'en', action) => {
  switch (action.type) {
    case SET_LANG:
      return action.lang
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_INFOS:
    case FETCH_DEVICES:
    case DEVICE_REVOKE:
      return true
    case FETCH_INFOS_SUCCESS:
    case FETCH_INFOS_FAILURE:
    case FETCH_DEVICES_SUCCESS:
    case FETCH_DEVICES_FAILURE:
    case DEVICE_REVOKE_SUCCESS:
    case DEVICE_REVOKE_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case UPDATE_INFO_FAILURE:
      return {
        message: 'error.open_folder',
        cause: action.error,
        critical: true
      }
    default:
      return state
  }
}

const DEFAULT_ALERT_LEVEL = 'info'

const alert = (state = null, action) => {
  if (action.alert) {
    return {
      message: action.alert.message,
      messageData: action.alert.messageData,
      type: action.alert.type || DEFAULT_ALERT_LEVEL
    }
  } else if (action.type === ALERT_CLOSED) return null
  else return state
}

export default combineReducers({
  isFetching,
  context,
  lang,
  error,
  alert
})
