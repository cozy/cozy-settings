import { combineReducers } from 'redux'

import {
  ACTIVATE_2FA,
  DESACTIVATE_2FA,
  CHECK_TWO_FACTOR_CODE,
  ACTIVATE_2FA_FAILURE,
  DESACTIVATE_2FA_FAILURE,
  CHECK_TWO_FACTOR_CODE_FAILURE,
  ACTIVATE_2FA_SUCCESS,
  DESACTIVATE_2FA_SUCCESS,
  CHECK_TWO_FACTOR_CODE_SUCCESS,
  CANCEL_2FA_ACTIVATION
} from '@/actions/twoFactor'

const submitting = (state = false, action) => {
  switch (action.type) {
    case ACTIVATE_2FA:
    case DESACTIVATE_2FA:
      return true
    case ACTIVATE_2FA_FAILURE:
    case DESACTIVATE_2FA_FAILURE:
    case ACTIVATE_2FA_SUCCESS:
    case DESACTIVATE_2FA_SUCCESS:
      return false
    default:
      return state
  }
}

const pending = (state = false, action) => {
  switch (action.type) {
    case ACTIVATE_2FA_SUCCESS:
      return true
    case ACTIVATE_2FA:
    case ACTIVATE_2FA_FAILURE:
    case CANCEL_2FA_ACTIVATION:
      return false
    default:
      return state
  }
}

const error = (state = null, action) => {
  switch (action.type) {
    case ACTIVATE_2FA:
    case DESACTIVATE_2FA:
    case ACTIVATE_2FA_SUCCESS:
    case DESACTIVATE_2FA_SUCCESS:
      return null
    case ACTIVATE_2FA_FAILURE:
    case DESACTIVATE_2FA_FAILURE:
      return action.error
    default:
      return state
  }
}

const codeChecking = (state = false, action) => {
  switch (action.type) {
    case CHECK_TWO_FACTOR_CODE:
      return true
    case CHECK_TWO_FACTOR_CODE_FAILURE:
    case CHECK_TWO_FACTOR_CODE_SUCCESS:
      return false
    default:
      return state
  }
}

const checkError = (state = null, action) => {
  switch (action.type) {
    case CHECK_TWO_FACTOR_CODE:
    case CHECK_TWO_FACTOR_CODE_SUCCESS:
      return null
    case CHECK_TWO_FACTOR_CODE_FAILURE:
      return action.error
    default:
      return state
  }
}

const twoFactor = combineReducers({
  submitting,
  pending,
  codeChecking,
  error,
  checkError
})

export default twoFactor
