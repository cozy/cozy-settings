import { FETCH_INFOS_SUCCESS, UPDATE_INFO_SUCCESS } from '@/actions'

const instance = (state = null, action) => {
  switch (action.type) {
    case FETCH_INFOS_SUCCESS:
    case UPDATE_INFO_SUCCESS:
      return action.instance
    default:
      return state
  }
}

export default instance
