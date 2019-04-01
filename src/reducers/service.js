import { combineReducers } from 'redux'

import {
  CREATE_INTENT_SERVICE,
  CREATE_INTENT_SERVICE_SUCCESS,
  CREATE_INTENT_SERVICE_FAILURE
} from 'actions/services'

export const instance = (state = null, action) => {
  switch (action.type) {
    case CREATE_INTENT_SERVICE_SUCCESS:
      return action.service
    default:
      return state
  }
}

export const isFetching = (state = null, action) => {
  switch (action.type) {
    case CREATE_INTENT_SERVICE:
      return true
    default:
      return state
  }
}

export const error = (state = null, action) => {
  switch (action.type) {
    case CREATE_INTENT_SERVICE_FAILURE:
      return action.error
    default:
      return state
  }
}

const service = combineReducers({
  instance,
  error,
  isFetching
})

export default service
