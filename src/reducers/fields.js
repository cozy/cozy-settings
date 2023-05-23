import { combineReducers } from 'redux'

import {
  FETCH_INFOS_SUCCESS,
  UPDATE_INFO,
  UPDATE_INFO_SUCCESS,
  UPDATE_INFO_FAILURE,
  RESET_INFO_FIELD
} from 'actions'

const createField = name => {
  const value = (state = '', action) => {
    switch (action.type) {
      case FETCH_INFOS_SUCCESS:
        return action.instance.data.attributes[name] || ''
      case UPDATE_INFO:
        return name !== action.field ? state : action.value
      default:
        return state
    }
  }

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
  default_redirection: createField('default_redirection'),
  tracking: createField('tracking'),
  auth_mode: createField('auth_mode') // read only
})

export default fields
