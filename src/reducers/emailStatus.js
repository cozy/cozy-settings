import { combineReducers } from 'redux'

import {
  SEND_EMAIL,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE
} from '../actions/email'

export const isSent = (state = false, action) => {
  switch (action.type) {
    case SEND_EMAIL_SUCCESS:
      return true
    default:
      return state
  }
}

export const isSending = (state = false, action) => {
  switch (action.type) {
    case SEND_EMAIL:
      return true
    default:
      return false
  }
}

export const error = (state = null, action) => {
  switch (action.type) {
    case SEND_EMAIL_FAILURE:
      return action.error
    default:
      return state
  }
}

const emailStatus = combineReducers({
  isSent,
  error,
  isSending
})

export default emailStatus
