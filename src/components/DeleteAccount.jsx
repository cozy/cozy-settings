import React, { useState } from 'react'

import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ConfirmModal from 'components/DeleteAccount/ConfirmModal'
import FormModal from 'components/DeleteAccount/FormModal'
import EmailConfirmationModal from 'components/DeleteAccount/EmailConfirmationModal'
import { useHasPassword } from 'hooks/useHasPassword'

const CONFIRMING = 'confirming'
const IDLE = 'idle'
const REQUESTING = 'requesting'
const EMAIL_CONFIRMATION = 'email_confirmation'

const DeleteAccount = () => {
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

  const hasPassword = useHasPassword()
  const onClick = () => {
    if (hasPassword) {
      setStatus(CONFIRMING)
    } else {
      setStatus(REQUESTING)
    }
  }

  return (
    <div className="u-mt-2">
      {status === CONFIRMING && (
        <ConfirmModal
          onClose={() => setStatus(IDLE)}
          onSuccess={() => setStatus(REQUESTING)}
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
        <EmailConfirmationModal onClose={() => setStatus(IDLE)} />
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
    </div>
  )
}

export default DeleteAccount
