import { useState } from 'react'

import { useClient } from 'cozy-client'
import { CozyUtils } from 'cozy-keys-lib'

/**
 *
 */
const useCheckPassword = () => {
  const client = useClient()
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState(null)

  const checkPassword = async (password, onSuccess) => {
    setError(null)
    setStatus('loading')

    try {
      const {
        data: {
          attributes: { salt, kdf, iterations }
        }
      } = await client.stackClient.fetchJSON('GET', '/settings/passphrase')

      const passwordHash = await CozyUtils.getHashedPassword(
        salt,
        password,
        kdf,
        iterations
      )

      await client.stackClient.fetchJSON('POST', '/settings/passphrase/check', {
        passphrase: passwordHash
      })

      setStatus('success')
      onSuccess(passwordHash)
    } catch (e) {
      setStatus('error')
      setError(
        e.reason?.errors?.[0]?.detail === 'Invalid passphrase'
          ? 'invalid_password'
          : 'server_error'
      )
    }
  }

  return {
    checkPassword,
    status,
    isLoading: status === 'loading',
    error
  }
}

export default useCheckPassword
