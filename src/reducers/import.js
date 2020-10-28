import { combineReducers } from 'redux'

import {
  PRECHECK_IMPORT,
  PRECHECK_IMPORT_FAILURE,
  PRECHECK_IMPORT_SUCCESS
} from 'actions/import'

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

const data = (state = {}, action) => {
  switch (action.type) {
    case PRECHECK_IMPORT:
      return {}
    case PRECHECK_IMPORT_SUCCESS:
      return action.data
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case PRECHECK_IMPORT:
    case PRECHECK_IMPORT_SUCCESS:
      return null
    case PRECHECK_IMPORT_FAILURE:
      return action.error
    default:
      return state
  }
}

const exportReducer = combineReducers({
  checking,
  data,
  error
})

export default exportReducer
