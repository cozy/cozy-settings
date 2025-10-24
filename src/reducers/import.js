import { combineReducers } from 'redux'

export const SET_IMPORTS_ENABLED = 'settings/import/SET_ENABLED'
export const setImportsEnabled = enabled => ({
  type: SET_IMPORTS_ENABLED,
  enabled: !!enabled
})

import {
  PRECHECK_IMPORT,
  PRECHECK_IMPORT_FAILURE,
  PRECHECK_IMPORT_SUCCESS,
  IMPORT_IMPORT,
  IMPORT_IMPORT_FAILURE,
  IMPORT_IMPORT_SUCCESS
} from '@/actions/import'

const enabled = (state = false, action) => {
  switch (action.type) {
    case SET_IMPORTS_ENABLED:
      return !!action.enabled
    default:
      return state
  }
}

const checking = (state = false, action) => {
  switch (action.type) {
    case PRECHECK_IMPORT:
      return true
    case PRECHECK_IMPORT_FAILURE:
    case PRECHECK_IMPORT_SUCCESS:
      return false
    default:
      return state
  }
}

const submitting = (state = false, action) => {
  switch (action.type) {
    case IMPORT_IMPORT:
      return true
    case IMPORT_IMPORT_FAILURE:
    case IMPORT_IMPORT_SUCCESS:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case PRECHECK_IMPORT:
    case PRECHECK_IMPORT_SUCCESS:
    case IMPORT_IMPORT:
    case IMPORT_IMPORT_SUCCESS:
      return null
    case PRECHECK_IMPORT_FAILURE:
    case IMPORT_IMPORT_FAILURE:
      return action.error
    default:
      return state
  }
}

const exportReducer = combineReducers({
  enabled,
  checking,
  submitting,
  error
})

export default exportReducer
