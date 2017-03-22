import {
  DEVICES_MODALE_REVOKE_OPEN,
  DEVICES_MODALE_REVOKE_CLOSE
} from '../actions'

const deviceToRevoke = (state = null, action) => {
  switch (action.type) {
    case DEVICES_MODALE_REVOKE_OPEN:
      return action.device
    default:
      return state
  }
}

export default deviceToRevoke
