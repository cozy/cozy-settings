import { combineReducers } from 'redux'

import {
  FETCH_INFOS,
  FETCH_INFOS_SUCCESS,
  FETCH_INFOS_FAILURE,
  UPDATE_INFO_FAILURE,
  SET_LANG
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
      return true
    case FETCH_INFOS_SUCCESS:
    case FETCH_INFOS_FAILURE:
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

export default combineReducers({
  isFetching,
  context,
  lang,
  error
})
