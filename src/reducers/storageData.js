import {
  FETCH_STORAGE_SUCCESS
} from '../actions'

const storageData = (state = [], action) => {
  switch (action.type) {
    case FETCH_STORAGE_SUCCESS:
      return action.storageData
    default:
      return state
  }
}

export default storageData
