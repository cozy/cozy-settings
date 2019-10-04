import { cozyFetch } from 'actions'
import { WebVaultClient } from 'cozy-keys-lib'
import client from 'lib/client'

export const UPDATE_PASSPHRASE = 'UPDATE_PASSPHRASE'
export const UPDATE_PASSPHRASE_SUCCESS = 'UPDATE_PASSPHRASE_SUCCESS'
export const UPDATE_PASSPHRASE_FAILURE = 'UPDATE_PASSPHRASE_FAILURE'
export const RESET_PASSPHRASE_FIELD = 'RESET_PASSPHRASE_FIELD'

// two factor steps
export const UPDATE_PASSPHRASE_2FA_1 = 'UPDATE_PASSPHRASE_2FA_1'
export const UPDATE_PASSPHRASE_2FA_1_SUCCESS = 'UPDATE_PASSPHRASE_2FA_1_SUCCESS'
export const UPDATE_PASSPHRASE_2FA_1_FAILURE = 'UPDATE_PASSPHRASE_2FA_1_FAILURE'

export const UPDATE_PASSPHRASE_2FA_2 = 'UPDATE_PASSPHRASE_2FA_2'
export const UPDATE_PASSPHRASE_2FA_2_SUCCESS = 'UPDATE_PASSPHRASE_2FA_2_SUCCESS'
export const UPDATE_PASSPHRASE_2FA_2_FAILURE = 'UPDATE_PASSPHRASE_2FA_2_FAILURE'

const getInstanceURL = () => {
  return client.getStackClient().uri
}

export const updatePassphrase = (current, newVal) => {
  const instanceURL = getInstanceURL()
  const vaultClient = new WebVaultClient(instanceURL)

  return dispatch => {
    dispatch({ type: UPDATE_PASSPHRASE })
    return vaultClient
      .login(current)
      .then(() => {
        return vaultClient.computeNewHashAndKeys(current, newVal)
      })
      .then(newHashAndKeys => {
        return cozyFetch('PUT', '/settings/passphrase', {
          current_passphrase: newHashAndKeys.currentPasswordHash,
          new_passphrase: newHashAndKeys.newPasswordHash,
          key: newHashAndKeys.newEncryptionKey.encryptedString,
          iterations: newHashAndKeys.kdfIterations
        })
      })
      .then(() => {
        dispatch({ type: UPDATE_PASSPHRASE_SUCCESS })
        setTimeout(() => {
          dispatch({ type: RESET_PASSPHRASE_FIELD })
          // the token changes after a password change, so we need to reload the page to get the new one
          window.location.reload()
        }, 4000) // 4s, a bit longer than the alert message
      })
      .catch(error => {
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
        throw error
      })
  }
}

export const updatePassphrase2FAFirst = current => {
  const instanceURL = getInstanceURL()
  const vaultClient = new WebVaultClient(instanceURL)

  return dispatch => {
    dispatch({ type: UPDATE_PASSPHRASE_2FA_1 })
    return vaultClient
      .login(current)
      .then(() => {
        return vaultClient.computeHashedPassword(current)
      })
      .then(currentPasswordHash =>
        cozyFetch('PUT', '/settings/passphrase', {
          current_passphrase: currentPasswordHash
        })
      )
      .then(data => {
        dispatch({
          type: UPDATE_PASSPHRASE_2FA_1_SUCCESS,
          twoFactorToken: data.two_factor_token
        })
      })
      .catch(error => {
        const errors = error.errors || []
        if (errors.length && errors[0].detail === 'Invalid passphrase') {
          dispatch({
            type: UPDATE_PASSPHRASE_2FA_1_FAILURE,
            errors: { currentPassword: 'ProfileView.password.wrong_password' }
          })
        } else {
          dispatch({
            type: UPDATE_PASSPHRASE_2FA_1_FAILURE,
            errors: { global: 'ProfileView.password.server_error' }
          })
        }
        throw error
      })
  }
}

export const updatePassphrase2FASecond = (
  current,
  newVal,
  twoFactorCode,
  twoFactorToken
) => {
  return async dispatch => {
    dispatch({ type: UPDATE_PASSPHRASE_2FA_2 })

    const instanceURL = getInstanceURL()
    const vaultClient = new WebVaultClient(instanceURL)

    return vaultClient
      .login(current)
      .then(() => {
        return vaultClient.computeNewHashAndKeys(current, newVal)
      })
      .then(newHashAndKeys => {
        return cozyFetch('PUT', '/settings/passphrase', {
          new_passphrase: newHashAndKeys.newPasswordHash,
          key: newHashAndKeys.newEncryptionKey.encryptedString,
          iterations: newHashAndKeys.kdfIterations,
          two_factor_token: twoFactorToken,
          two_factor_passcode: twoFactorCode
        })
      })
      .then(() => {
        dispatch({ type: UPDATE_PASSPHRASE_2FA_2_SUCCESS })
        setTimeout(() => {
          dispatch({ type: RESET_PASSPHRASE_FIELD })
          // the token changes after a password change, so we need to reload the page to get the new one
          window.location.reload()
        }, 4000) // 4s, a bit longer than the alert message
      })
      .catch(error => {
        const errors = error.errors || []
        if (
          errors.length &&
          errors[0].detail === 'Invalid two-factor parameters'
        ) {
          dispatch({
            type: UPDATE_PASSPHRASE_2FA_2_FAILURE,
            errors: { wrongTwoFactor: 'ProfileView.password.wrong_two_fa_code' }
          })
        } else {
          dispatch({
            type: UPDATE_PASSPHRASE_2FA_2_FAILURE,
            errors: { global: 'ProfileView.password.server_error' }
          })
        }
        throw error
      })
  }
}
