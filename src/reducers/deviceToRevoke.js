import {
  DEVICES_MODALE_REVOKE_OPEN
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
