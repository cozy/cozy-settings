import {
  FETCH_DEVICES_SUCCESS,
  DEVICE_REVOKE_SUCCESS
} from '../actions'

const devices = (state = [], action) => {
  switch (action.type) {
    case FETCH_DEVICES_SUCCESS:
      return action.devices
    case DEVICE_REVOKE_SUCCESS:
      return state.filter((device) => {
        return device.id !== action.deviceId
      })
    default:
      return state
  }
}

export default devices
