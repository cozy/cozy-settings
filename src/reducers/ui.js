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
  FETCH_SESSIONS,
  FETCH_SESSIONS_SUCCESS,
  FETCH_SESSIONS_FAILURE,
  FETCH_STORAGE,
  FETCH_STORAGE_SUCCESS,
  FETCH_STORAGE_FAILURE,
  SESSIONS_DELETE_OTHERS,
  SESSIONS_DELETE_OTHERS_SUCCESS,
  SESSIONS_DELETE_OTHERS_FAILURE,
  SET_LANG
} from '@/actions'

const context = (state = window.context || null, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const lang = (
  state = document.documentElement.getAttribute('lang') || 'en',
  action
) => {
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
    case FETCH_SESSIONS:
    case FETCH_STORAGE:
    case SESSIONS_DELETE_OTHERS:
      return true
    case FETCH_INFOS_SUCCESS:
    case FETCH_INFOS_FAILURE:
    case FETCH_DEVICES_SUCCESS:
    case FETCH_DEVICES_FAILURE:
    case DEVICE_REVOKE_SUCCESS:
    case DEVICE_REVOKE_FAILURE:
    case FETCH_SESSIONS_SUCCESS:
    case FETCH_SESSIONS_FAILURE:
    case FETCH_STORAGE_SUCCESS:
    case FETCH_STORAGE_FAILURE:
    case SESSIONS_DELETE_OTHERS_SUCCESS:
    case SESSIONS_DELETE_OTHERS_FAILURE:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case UPDATE_INFO_FAILURE:
      return {
        cause: action.error,
        critical: true
      }
    default:
      return state
  }
}

export default combineReducers({
  isFetching,
  context,
  lang,
  error
})
