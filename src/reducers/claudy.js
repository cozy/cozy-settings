import { combineReducers } from 'redux'

import { FETCH_DEVICES_SUCCESS } from 'actions'

import {
  FETCH_CLAUDY_INFOS,
  FETCH_CLAUDY_INFOS_SUCCESS,
  FETCH_CLAUDY_INFOS_FAILURE
} from 'actions/services'

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

export const accounts = (state = [], action) => {
  switch (action.type) {
    case FETCH_CLAUDY_INFOS_SUCCESS:
      return action.accounts
    default:
      return state
  }
}

export const devices = (state = [], action) => {
  switch (action.type) {
    case FETCH_DEVICES_SUCCESS:
      return action.devices
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
  accounts,
  devices,
  error,
  isFetching
})

export default claudy
