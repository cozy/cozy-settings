import { combineReducers } from 'redux'

import {
  UPDATE_PASSPHRASE,
  UPDATE_PASSPHRASE_SUCCESS,
  UPDATE_PASSPHRASE_FAILURE,
  RESET_PASSPHRASE_FIELD,

  PASSPHRASE_NEW_REQUEST,
  PASSPHRASE_NEW_REQUEST_SUCCESS,
  PASSPHRASE_NEW_REQUEST_FAILURE,

  MODAL_CLOSE
} from '../actions'

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

const passphraseNewRequesting = (state = false, action) => {
  switch (action.type) {
    case PASSPHRASE_NEW_REQUEST:
      return true
    case PASSPHRASE_NEW_REQUEST_SUCCESS:
    case PASSPHRASE_NEW_REQUEST_FAILURE:
    default:
      return false
  }
}

const passphraseNewSuccess = (state = false, action) => {
  switch (action.type) {
    case PASSPHRASE_NEW_REQUEST_SUCCESS:
      return true
    case PASSPHRASE_NEW_REQUEST:
    case PASSPHRASE_NEW_REQUEST_FAILURE:
    case MODAL_CLOSE:
    default:
      return false
  }
}

const passphraseNewError = (state = false, action) => {
  switch (action.type) {
    case PASSPHRASE_NEW_REQUEST_FAILURE:
      return true
    case PASSPHRASE_NEW_REQUEST:
    case PASSPHRASE_NEW_REQUEST_SUCCESS:
    case MODAL_CLOSE:
    default:
      return false
  }
}

const passphrase = combineReducers({
  submitting,
  saved,
  errors,

  passphraseNewRequesting,
  passphraseNewSuccess,
  passphraseNewError
})

export default passphrase
