import React, { useState } from 'react'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Button from 'cozy-ui/transpiled/react/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import ConfirmModal from 'components/DeleteAccount/ConfirmModal'
import FormModal from 'components/DeleteAccount/FormModal'

const CONFIRMING = 'confirming'
const IDLE = 'idle'
const REQUESTING = 'requesting'

const DeleteAccount = () => {
  const { t } = useI18n()
  const [status, setStatus] = useState(IDLE)

  const onError = error => {
    setStatus(IDLE)
    console.error(error.message) // eslint-disable-line no-console
    Alerter.error(t('DeleteAccount.error.message'))
  }

  const onRequested = () => {
    setStatus(IDLE)
    Alerter.success(t('DeleteAccount.success.message'))
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
      <div>
        <Typography variant="h5" gutterBottom>
          {t('DeleteAccount.title')}
        </Typography>
        <Typography variant="body1">{t('DeleteAccount.label')}</Typography>
        <div className="u-mt-1">
          <Button
            busy={status === REQUESTING}
            disabled={status !== IDLE}
            extension="full"
            label={t('DeleteAccount.button.label')}
            onClick={() => setStatus(CONFIRMING)}
            theme="danger-outline"
          />
        </div>
      </div>
    </>
  )
}

export default DeleteAccount
