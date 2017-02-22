import {
  FETCH_DEVICES_SUCCESS
} from '../actions'

const devices = (state = [], action) => {
  switch (action.type) {
    case FETCH_DEVICES_SUCCESS:
      return action.devices
    default:
      return state
  }
}

export default devices
