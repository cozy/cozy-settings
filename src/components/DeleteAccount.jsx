import React, { useState } from 'react'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ConfirmModal from 'components/DeleteAccount/ConfirmModal'
import FormModal from 'components/DeleteAccount/FormModal'
import { useCanAuthWith } from 'hooks/useCanAuthWith'
import EmailConfirmationModal from 'components/DeleteAccount/EmailConfirmationModal'

const CONFIRMING = 'confirming'
const IDLE = 'idle'
const REQUESTING = 'requesting'
const EMAIL_CONFIRMATION = 'email_confirmation'

/**
 * @param {string} email - User email display into confirmation process
 */
const DeleteAccount = ({ email }) => {
  const { t } = useI18n()
  const [status, setStatus] = useState(IDLE)

  const onError = error => {
    setStatus(IDLE)
    console.error(error.message) // eslint-disable-line no-console
    Alerter.error(t('DeleteAccount.error.message'))
  }

  const onRequested = () => {
    setStatus(EMAIL_CONFIRMATION)
  }

  const { canAuthWithOIDC } = useCanAuthWith()

  const onClick = () => {
    if (canAuthWithOIDC) {
      setStatus(REQUESTING)
    } else {
      setStatus(CONFIRMING)
    }
  }

  return (
    <>
      {status === CONFIRMING && (
        <ConfirmModal
          dismissAction={() => setStatus(IDLE)}
          primaryAction={() => setStatus(REQUESTING)}
        />
      )}
      {status === REQUESTING && (
        <FormModal
          onClose={() => setStatus(IDLE)}
          onError={onError}
          onSuccess={onRequested}
        />
      )}
      {status === EMAIL_CONFIRMATION && (
        <EmailConfirmationModal email={email} onClose={() => setStatus(IDLE)} />
      )}
      <Typography variant="h5" gutterBottom>
        {t('DeleteAccount.title')}
      </Typography>
      <Typography variant="body1">{t('DeleteAccount.label')}</Typography>
      <Button
        className="u-mt-1"
        variant="secondary"
        color="error"
        label={t('DeleteAccount.button.label')}
        busy={status === REQUESTING}
        fullWidth
        onClick={onClick}
      />
    </>
  )
}

export default DeleteAccount
