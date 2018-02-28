import { cozyFetch } from './index'

export const UPDATE_PASSPHRASE = 'UPDATE_PASSPHRASE'
export const UPDATE_PASSPHRASE_SUCCESS = 'UPDATE_PASSPHRASE_SUCCESS'
export const UPDATE_PASSPHRASE_FAILURE = 'UPDATE_PASSPHRASE_FAILURE'
export const RESET_PASSPHRASE_FIELD = 'RESET_PASSPHRASE_FIELD'

export const updatePassphrase = (current, newVal) => {
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_PASSPHRASE })
    return cozyFetch('PUT', '/settings/passphrase', {
      'current_passphrase': current,
      'new_passphrase': newVal
    }).then(instance => {
      dispatch({
        type: UPDATE_PASSPHRASE_SUCCESS,
        alert: {
          message: 'ProfileView.password.reload'
        }
      })
      setTimeout(() => {
        dispatch({ type: RESET_PASSPHRASE_FIELD })
        // the token changes after a password change, so we need to reload the page to get the new one
        window.location.reload()
      }, 4000)// 4s, a bit longer than the alert message
    }).catch(error => {
      const errors = error.errors || []
      if (errors.length && errors[0].detail === 'Invalid passphrase') {
        dispatch({
          type: UPDATE_PASSPHRASE_FAILURE,
          errors: { currentPassword: 'ProfileView.password.wrong_password' }
        })
      } else {
        dispatch({
          type: UPDATE_PASSPHRASE_FAILURE,
          errors: { global: 'ProfileView.password.server_error' }
        })
      }
    })
  }
}
