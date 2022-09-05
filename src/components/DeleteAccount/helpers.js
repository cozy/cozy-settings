import { WebVaultClient } from 'cozy-keys-lib'
import { getErrorDetails, isInvalidPassphrase } from 'actions/passphrase'

const fetchPasswordValidation = async ({ client, t, currentPassphrase }) => {
  const instanceURL = client.getStackClient().uri
  const vaultClient = new WebVaultClient(instanceURL)

  try {
    await vaultClient.login(currentPassphrase)
    return { error: false }
  } catch (error) {
    const details = getErrorDetails(error)
    const errorType = isInvalidPassphrase(details) ? 'passphrase' : 'others'

    return {
      error: t(`DeleteAccount.modal.confirm.password.errors.${errorType}`)
    }
  }
}

export const containerForTesting = {
  fetchPasswordValidation
}

export const submitPassword = async ({
  client,
  t,
  currentPassphrase,
  primaryAction,
  setError,
  setIsRequired,
  setIsBusy
}) => {
  setError('')
  if (currentPassphrase === '') {
    return setIsRequired(true)
  }
  setIsBusy(true)
  const { error } = await containerForTesting.fetchPasswordValidation({
    client,
    t,
    currentPassphrase
  })
  setIsBusy(false)
  if (error) {
    return setError(error)
  }
  primaryAction()
}

export const sendDeleteAccountRequest = async client => {
  return await client
    .getStackClient()
    .fetchJSON('POST', '/settings/instance/deletion')
}
