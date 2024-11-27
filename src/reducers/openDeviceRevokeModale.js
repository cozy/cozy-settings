import {
  DEVICES_MODALE_REVOKE_OPEN,
  DEVICES_MODALE_REVOKE_CLOSE,
  DEVICE_REVOKE_SUCCESS
} from '@/actions'

const openDeviceRevokeModale = (state = false, action) => {
  switch (action.type) {
    case DEVICES_MODALE_REVOKE_OPEN:
      return true
    case DEVICES_MODALE_REVOKE_CLOSE:
    case DEVICE_REVOKE_SUCCESS:
      return false
    default:
      return state
  }
}

export default openDeviceRevokeModale
