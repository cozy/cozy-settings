import { combineReducers } from 'redux'

import {
  UPDATE_PASSPHRASE,
  UPDATE_PASSPHRASE_SUCCESS,
  UPDATE_PASSPHRASE_FAILURE,
  RESET_PASSPHRASE_FIELD
} from '../actions/passphrase'

const submitting = (state = false, action) => {
  switch (action.type) {
    case UPDATE_PASSPHRASE:
      return true
    case UPDATE_PASSPHRASE_SUCCESS:
    case UPDATE_PASSPHRASE_FAILURE:
      return false
    default:
      return state
  }
}

const saved = (state = false, action) => {
  switch (action.type) {
    case UPDATE_PASSPHRASE_SUCCESS:
      return true
    case RESET_PASSPHRASE_FIELD:
      return false
    default:
      return state
  }
}

const errors = (state = [], action) => {
  switch (action.type) {
    case UPDATE_PASSPHRASE:
    case UPDATE_PASSPHRASE_SUCCESS:
      return []
    case UPDATE_PASSPHRASE_FAILURE:
      return action.errors
    default:
      return state
  }
}

const passphrase = combineReducers({
  submitting,
  saved,
  errors
})

export default passphrase
