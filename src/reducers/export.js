import { combineReducers } from 'redux'

import {
  REQUEST_EXPORT,
  REQUEST_EXPORT_FAILURE,
  REQUEST_EXPORT_SUCCESS,
  FETCH_EXPORT_DATA,
  FETCH_EXPORT_DATA_FAILURE,
  FETCH_EXPORT_DATA_SUCCESS
} from '@/actions/export'

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

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_EXPORT_DATA:
      return true
    case FETCH_EXPORT_DATA_FAILURE:
    case FETCH_EXPORT_DATA_SUCCESS:
      return false
    default:
      return state
  }
}

const data = (state = {}, action) => {
  switch (action.type) {
    case FETCH_EXPORT_DATA:
      return {}
    case FETCH_EXPORT_DATA_SUCCESS:
      return action.data
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case REQUEST_EXPORT:
    case FETCH_EXPORT_DATA:
    case REQUEST_EXPORT_SUCCESS:
    case FETCH_EXPORT_DATA_SUCCESS:
      return null
    case REQUEST_EXPORT_FAILURE:
    case FETCH_EXPORT_DATA_FAILURE:
      return action.error
    default:
      return state
  }
}

const exportReducer = combineReducers({
  submitting,
  isFetching,
  data,
  error
})

export default exportReducer
