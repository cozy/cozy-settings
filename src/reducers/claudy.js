import { combineReducers } from 'redux'

import {
  FETCH_CLAUDY_INFOS,
  FETCH_CLAUDY_INFOS_SUCCESS,
  FETCH_CLAUDY_INFOS_FAILURE
} from '../actions'

export const actions = (state = [], action) => {
  switch (action.type) {
    case FETCH_CLAUDY_INFOS_SUCCESS:
      return action.claudyActions
    default:
      return state
  }
}

export const apps = (state = [], action) => {
  switch (action.type) {
    case FETCH_CLAUDY_INFOS_SUCCESS:
      return action.apps
    default:
      return state
  }
}

export const error = (state = null, action) => {
  switch (action.type) {
    case FETCH_CLAUDY_INFOS_FAILURE:
      return action.error
    default:
      return state
  }
}

export const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_CLAUDY_INFOS:
      return true
    default:
      return state
  }
}

const claudy = combineReducers({
  actions,
  apps,
  error,
  isFetching
})

export default claudy
