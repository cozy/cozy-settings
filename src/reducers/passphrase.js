import { combineReducers } from 'redux'

import {
  UPDATE_PASSPHRASE,
  UPDATE_PASSPHRASE_SUCCESS,
  UPDATE_PASSPHRASE_FAILURE,
  RESET_PASSPHRASE_FIELD,
  UPDATE_PASSPHRASE_2FA_1,
  UPDATE_PASSPHRASE_2FA_1_SUCCESS,
  UPDATE_PASSPHRASE_2FA_1_FAILURE,
  UPDATE_PASSPHRASE_2FA_2,
  UPDATE_PASSPHRASE_2FA_2_SUCCESS,
  UPDATE_PASSPHRASE_2FA_2_FAILURE
} from '../actions/passphrase'

const submitting = (state = false, action) => {
  switch (action.type) {
    case UPDATE_PASSPHRASE:
    case UPDATE_PASSPHRASE_2FA_1:
      return true
    case UPDATE_PASSPHRASE_SUCCESS:
    case UPDATE_PASSPHRASE_FAILURE:
    case UPDATE_PASSPHRASE_2FA_1_FAILURE:
    case UPDATE_PASSPHRASE_2FA_1_SUCCESS:
      return false
    default:
      return state
  }
}

const twoFactorToken = (state = null, action) => {
  switch (action.type) {
    case UPDATE_PASSPHRASE_2FA_1:
    case UPDATE_PASSPHRASE_2FA_1_FAILURE:
      return null
    case UPDATE_PASSPHRASE_2FA_1_SUCCESS:
      return action.twoFactorToken
    default:
      return state
  }
}

const submitting2FAStep2 = (state = false, action) => {
  switch (action.type) {
    case UPDATE_PASSPHRASE_2FA_2:
      return true
    case UPDATE_PASSPHRASE_2FA_2_FAILURE:
    case UPDATE_PASSPHRASE_2FA_2_SUCCESS:
      return false
    default:
      return state
  }
}

const saved = (state = false, action) => {
  switch (action.type) {
    case UPDATE_PASSPHRASE_SUCCESS:
    case UPDATE_PASSPHRASE_2FA_2_SUCCESS:
      return true
    case RESET_PASSPHRASE_FIELD:
      return false
    default:
      return state
  }
}

const errors = (state = null, action) => {
  switch (action.type) {
    case UPDATE_PASSPHRASE:
    case UPDATE_PASSPHRASE_2FA_1:
    case UPDATE_PASSPHRASE_SUCCESS:
    case UPDATE_PASSPHRASE_2FA_2_SUCCESS:
      return null
    case UPDATE_PASSPHRASE_2FA_1_FAILURE:
    case UPDATE_PASSPHRASE_2FA_2_FAILURE:
    case UPDATE_PASSPHRASE_FAILURE:
      return action.errors
    default:
      return state
  }
}

const passphrase = combineReducers({
  submitting,
  submitting2FAStep2,
  saved,
  twoFactorToken,
  errors
})

export default passphrase
