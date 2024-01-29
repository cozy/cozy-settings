import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'

import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import ConfirmModal from 'components/DeleteAccount/ConfirmModal'
import FormModal from 'components/DeleteAccount/FormModal'
import EmailConfirmationModal from 'components/DeleteAccount/EmailConfirmationModal'
import { useHasPassword } from 'hooks/useHasPassword'
import { LoaderModal } from 'components/DeleteAccount/LoaderModal'

const CONFIRMING = 'confirming'
const IDLE = 'idle'
const REQUESTING = 'requesting'
const EMAIL_CONFIRMATION = 'email_confirmation'

const DeleteAccount = () => {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { hasPassword, isComputing } = useHasPassword()

  const [status, setStatus] = useState(IDLE)

  useEffect(() => {
    setStatus(hasPassword ? CONFIRMING : REQUESTING)
  }, [hasPassword])

  const onError = error => {
    setStatus(IDLE)
    console.error(error.message) // eslint-disable-line no-console
    Alerter.error(t('DeleteAccount.error.message'))
  }

  const onRequested = () => {
    setStatus(EMAIL_CONFIRMATION)
  }

  const handleClose = () => {
    navigate('..')
  }

  if (isComputing) {
    return <LoaderModal />
  }

  if (status === CONFIRMING) {
    return (
      <ConfirmModal
        onClose={handleClose}
        onSuccess={() => setStatus(REQUESTING)}
      />
    )
  }

  if (status === REQUESTING) {
    return (
      <FormModal
        onClose={handleClose}
        onError={onError}
        onSuccess={onRequested}
      />
    )
  }

  if (status === EMAIL_CONFIRMATION) {
    return <EmailConfirmationModal onClose={handleClose} />
  }

  return null
}

export { DeleteAccount }
