import { WebVaultClient } from 'cozy-keys-lib'

const fetchPasswordValidation = async ({ client, t, currentPassphrase }) => {
  const instanceURL = client.getStackClient().uri
  const vaultClient = new WebVaultClient(instanceURL)

  try {
    await vaultClient.login(currentPassphrase)

    const currentPasswordHash = await vaultClient.computeHashedPassword(
      currentPassphrase
    )

    await client
      .getStackClient()
      .fetchJSON('POST', '/settings/passphrase/check', {
        data: {
          passphrase: JSON.stringify(currentPasswordHash)
        }
      })

    return { error: false }
  } catch (error) {
    const errorStatus = error.statusCode || error.status // statusCode for vaultClient, status for stack fetchJSON
    const errorKey = errorStatus === 403 ? '403' : 'others'

    return {
      error: t(`DeleteAccount.modal.confirm.password.errors.${errorKey}`)
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
