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

// hint
export const UPDATE_HINT = 'UPDATE_HINT'
export const UPDATE_HINT_SUCCESS = 'UPDATE_HINT_SUCCESS'
export const UPDATE_HINT_FAILURE = 'UPDATE_HINT_FAILURE'

const getInstanceURL = () => {
  return client.getStackClient().uri
}

const invalidPassphraseErrorAction = {
  type: UPDATE_PASSPHRASE_FAILURE,
  errors: {
    currentPassphrase: 'PassphraseView.current_passphrase.wrong_passphrase'
  }
}

const defaultErrorAction = {
  type: UPDATE_PASSPHRASE_FAILURE,
  errors: { global: 'PassphraseView.server_error' }
}

const getErrorDetails = error => {
  const vaultError = error && error.response && error.response.error
  const stackError =
    error && error.errors && error.errors[0] && error.errors[0].detail

  return vaultError || stackError
}

const isInvalidPassphrase = errorDetails => {
  const potentialErrors = ['invalid password', 'Invalid passphrase']

  return potentialErrors.includes(errorDetails)
}

const updatePassphraseFailure = error => {
  const details = getErrorDetails(error)

  if (isInvalidPassphrase(details)) {
    return invalidPassphraseErrorAction
  }

  return defaultErrorAction
}

export const updatePassphrase = (currentPassphrase, newPassphrase) => {
  const instanceURL = getInstanceURL()
  const vaultClient = new WebVaultClient(instanceURL)

  return async dispatch => {
    dispatch({ type: UPDATE_PASSPHRASE })
    try {
      await vaultClient.login(currentPassphrase)

      const newHashAndKeys = await vaultClient.computeNewHashAndKeys(
        currentPassphrase,
        newPassphrase
      )
      await cozyFetch('PUT', '/settings/passphrase', {
        current_passphrase: newHashAndKeys.currentPasswordHash,
        new_passphrase: newHashAndKeys.newPasswordHash,
        key: newHashAndKeys.newEncryptionKey.encryptedString,
        iterations: newHashAndKeys.kdfIterations
      })
      dispatch({ type: UPDATE_PASSPHRASE_SUCCESS })
      dispatch({ type: RESET_PASSPHRASE_FIELD })
    } catch (error) {
      const action = updatePassphraseFailure(error)

      dispatch(action)
      throw error
    }
  }
}

export const updatePassphrase2FAFirst = currentPassphrase => {
  const instanceURL = getInstanceURL()
  const vaultClient = new WebVaultClient(instanceURL)

  return async dispatch => {
    dispatch({ type: UPDATE_PASSPHRASE_2FA_1 })
    try {
      await vaultClient.login(currentPassphrase)
      const currentPasswordHash = await vaultClient.computeHashedPassword(
        currentPassphrase
      )
      const data = await cozyFetch('PUT', '/settings/passphrase', {
        current_passphrase: currentPasswordHash
      })
      dispatch({
        type: UPDATE_PASSPHRASE_2FA_1_SUCCESS,
        twoFactorToken: data.two_factor_token
      })
    } catch (error) {
      const action = updatePassphraseFailure(error)
      dispatch(action)
      throw error
    }
  }
}

export const updatePassphrase2FASecond = (
  currentPassphrase,
  newPassphrase,
  twoFactorCode,
  twoFactorToken
) => {
  return async dispatch => {
    dispatch({ type: UPDATE_PASSPHRASE_2FA_2 })

    try {
      const instanceURL = getInstanceURL()
      const vaultClient = new WebVaultClient(instanceURL)

      await vaultClient.login(currentPassphrase)
      const newHashAndKeys = await vaultClient.computeNewHashAndKeys(
        currentPassphrase,
        newPassphrase
      )
      await cozyFetch('PUT', '/settings/passphrase', {
        new_passphrase: newHashAndKeys.newPasswordHash,
        key: newHashAndKeys.newEncryptionKey.encryptedString,
        iterations: newHashAndKeys.kdfIterations,
        two_factor_token: twoFactorToken,
        two_factor_passcode: twoFactorCode
      })
      dispatch({ type: UPDATE_PASSPHRASE_2FA_2_SUCCESS })
      dispatch({ type: RESET_PASSPHRASE_FIELD })
    } catch (error) {
      const errors = error.errors || []
      if (
        errors.length &&
        errors[0].detail === 'Invalid two-factor parameters'
      ) {
        dispatch({
          type: UPDATE_PASSPHRASE_2FA_2_FAILURE,
          errors: { wrongTwoFactor: 'PassphraseView.wrong_two_fa_code' }
        })
      } else {
        dispatch({
          type: UPDATE_PASSPHRASE_2FA_2_FAILURE,
          errors: { global: 'PassphraseView.server_error' }
        })
      }
      throw error
    }
  }
}

export const updateHint = hint => {
  return async dispatch => {
    dispatch({ type: UPDATE_HINT })

    try {
      await cozyFetch('PUT', '/settings/hint', { hint })

      dispatch({ type: UPDATE_HINT_SUCCESS })
    } catch (err) {
      dispatch({
        type: UPDATE_HINT_FAILURE,
        errors: { global: 'PassphraseView.server_error' }
      })
      throw err
    }
  }
}
