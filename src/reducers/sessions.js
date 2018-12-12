import { FETCH_SESSIONS_SUCCESS } from '../actions'

const sessions = (state = [], action) => {
  switch (action.type) {
    case FETCH_SESSIONS_SUCCESS:
      return action.sessions
    default:
      return state
  }
}

export default sessions
