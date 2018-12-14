import { cozyFetch, updateInfo } from './index'

export const ACTIVATE_2FA = 'ACTIVATE_2FA'
export const ACTIVATE_2FA_FAILURE = 'ACTIVATE_2FA_FAILURE'
export const ACTIVATE_2FA_SUCCESS = 'ACTIVATE_2FA_SUCCESS'

export const DESACTIVATE_2FA = 'DESACTIVATE_2FA'
export const DESACTIVATE_2FA_FAILURE = 'DESACTIVATE_2FA_FAILURE'
export const DESACTIVATE_2FA_SUCCESS = 'DESACTIVATE_2FA_SUCCESS'

export const CHECK_TWO_FACTOR_CODE = 'CHECK_TWO_FACTOR_CODE'
export const CHECK_TWO_FACTOR_CODE_FAILURE = 'CHECK_TWO_FACTOR_CODE_FAILURE'
export const CHECK_TWO_FACTOR_CODE_SUCCESS = 'CHECK_TWO_FACTOR_CODE_SUCCESS'

export const CANCEL_2FA_ACTIVATION = 'CANCEL_2FA_ACTIVATION'

export const AUTH_MODE = {
  TWO_FA_MAIL: 'two_factor_mail',
  BASIC: 'basic'
}

export const activate2FA = (mode = AUTH_MODE.TWO_FA_MAIL) => {
  return dispatch => {
    dispatch({ type: ACTIVATE_2FA })
    cozyFetch('PUT', '/settings/instance/auth_mode', { auth_mode: mode })
      .then(() => {
        dispatch({ type: ACTIVATE_2FA_SUCCESS })
      })
      .catch(() => {
        dispatch({
          type: ACTIVATE_2FA_FAILURE,
          error: 'ProfileView.infos.server_error'
        })
      })
  }
}

export const desactivate2FA = () => {
  return dispatch => {
    dispatch({ type: DESACTIVATE_2FA })
    cozyFetch('PUT', '/settings/instance/auth_mode', {
      auth_mode: AUTH_MODE.BASIC
    })
      .then(() => {
        dispatch({ type: DESACTIVATE_2FA_SUCCESS })
      })
      .catch(() => {
        dispatch({
          type: DESACTIVATE_2FA_FAILURE,
          error: 'ProfileView.infos.server_error'
        })
      })
  }
}

export const cancel2FAActivation = () => {
  return dispatch => {
    dispatch({ type: CANCEL_2FA_ACTIVATION })
  }
}

export const checkTwoFactorCode = (code, mode = AUTH_MODE.TWO_FA_MAIL) => {
  return dispatch => {
    dispatch({ type: CHECK_TWO_FACTOR_CODE, code })
    // Check if the field is empty or not
    if (code === '') {
      dispatch({
        type: CHECK_TWO_FACTOR_CODE_FAILURE,
        error: 'ProfileView.infos.empty'
      })
      return
    }
    cozyFetch('PUT', '/settings/instance/auth_mode', {
      two_factor_activation_code: code,
      auth_mode: mode
    })
      .then(() => {
        dispatch({ type: CHECK_TWO_FACTOR_CODE_SUCCESS })
        dispatch(updateInfo('two_fa', true))
      })
      .catch(() => {
        dispatch({
          type: CHECK_TWO_FACTOR_CODE_FAILURE,
          error: 'ProfileView.infos.server_error'
        })
      })
  }
}
