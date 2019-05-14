import { combineReducers } from 'redux'

import {
  FETCH_INFOS_SUCCESS,
  UPDATE_INFO,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAILURE,
  RESET_INFO_FIELD
} from 'actions'

import {
  CHECK_TWO_FACTOR_CODE_SUCCESS,
  DESACTIVATE_2FA_SUCCESS,
  AUTH_MODE
} from 'actions/twoFactor'

const composeReducers = (...fns) => {
  return (state, action) => {
    for (let i = 0; i < fns.length; i++) {
      const reducer = fns[fns.length - i - 1]
      state = reducer(state, action)
    }
    return state
  }
}

/** Special reducer for the auth_mode value */
const authModeValue = (state = AUTH_MODE.BASIC, action) => {
  switch (action.type) {
    case CHECK_TWO_FACTOR_CODE_SUCCESS:
      return AUTH_MODE.TWO_FA_MAIL
    case DESACTIVATE_2FA_SUCCESS:
      return AUTH_MODE.BASIC
    default:
      return state
  }
}

const createField = name => {
  const normalValue = (state = '', action) => {
    switch (action.type) {
      case FETCH_INFOS_SUCCESS:
        return action.instance.data.attributes[name] || ''
      case UPDATE_INFO:
        return name !== action.field ? state : action.value
      default:
        return state
    }
  }

  const value =
    name == 'auth_mode'
      ? composeReducers(authModeValue, normalValue)
      : normalValue

  const submitting = (state = false, action) => {
    if (name !== action.field) return state
    switch (action.type) {
      case UPDATE_INFO:
        return true
      case UPDATE_INFO_SUCCESS:
      case UPDATE_INFO_FAILURE:
        return false
      default:
        return state
    }
  }

  const saved = (state = false, action) => {
    if (name !== action.field) return state
    switch (action.type) {
      case UPDATE_INFO_SUCCESS:
        return true
      case RESET_INFO_FIELD:
        return false
      default:
        return state
    }
  }

  const errors = (state = [], action) => {
    if (name !== action.field) return state
    switch (action.type) {
      case UPDATE_INFO:
      case UPDATE_INFO_SUCCESS:
        return []
      case UPDATE_INFO_FAILURE:
        return [action.error]
      default:
        return state
    }
  }

  return combineReducers({
    value,
    submitting,
    saved,
    errors
  })
}

const fields = combineReducers({
  email: createField('email'),
  locale: createField('locale'),
  public_name: createField('public_name'),
  tracking: createField('tracking'),
  auth_mode: createField('auth_mode') // read only
})

export default fields
