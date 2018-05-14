import { combineReducers } from 'redux'

import {
  REQUEST_EXPORT,
  REQUEST_EXPORT_FAILURE,
  REQUEST_EXPORT_SUCCESS
} from '../actions/export'

const submitting = (state = false, action) => {
  switch (action.type) {
    case REQUEST_EXPORT:
      return true
    case REQUEST_EXPORT_FAILURE:
    case REQUEST_EXPORT_SUCCESS:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case REQUEST_EXPORT:
    case REQUEST_EXPORT_SUCCESS:
      return null
    case REQUEST_EXPORT_FAILURE:
      return action.error
    default:
      return state
  }
}

const exportReducer = combineReducers({
  submitting,
  error
})

export default exportReducer
