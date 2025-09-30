import React, { useState, useRef } from 'react'

import { useClient } from 'cozy-client'
import flag from 'cozy-flags'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Textarea from 'cozy-ui/transpiled/react/Textarea'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { sendDeleteAccountRequest } from './helpers'

import { getStackDomain } from '@/actions/domUtils'
import {
  sendDeleteAccountReasonEmail,
  sendDeleteAccountByEmailOnlyEmail
} from '@/actions/email'

const DONE = 'done'
const ERRORED = 'errored'
const IDLE = 'idle'
const SENDING = 'sending'

const REASON_MAXLENGTH = 3000

const FormModal = ({ onSuccess, onError, onClose }) => {
  const [status, setStatus] = useState(IDLE)
  const client = useClient()
  const { t } = useI18n()
  const reasonElementRef = useRef()

  const isSending = status === SENDING

  const handleSuccess = onSuccessParams => {
    setStatus(DONE)
    onSuccess && onSuccess(onSuccessParams)
  }

  const handleError = error => {
    setStatus(ERRORED)
    onError && onError(error)
  }

  const handleSend = async event => {
    event.preventDefault()
    const STACK_DOMAIN = getStackDomain()
    const domain = STACK_DOMAIN.replace('//', '')
    const reason = reasonElementRef.current.value
    setStatus(SENDING)

    try {
      if (flag('settings.delete.byEmailOnly')) {
        await sendDeleteAccountByEmailOnlyEmail(
          client,
          t('DeleteAccount.byEmailOnly.mail.subject', { domain }),
          reason.substring(0, REASON_MAXLENGTH)
        )
        return handleSuccess({ byEmailOnly: true })
      } else {
        await sendDeleteAccountReasonEmail(
          client,
          t('DeleteAccount.request.mail.subject', { domain }),
          reason.substring(0, REASON_MAXLENGTH)
        )
        await sendDeleteAccountRequest(client)
        return handleSuccess({ byEmailOnly: false })
      }
    } catch (error) {
      return handleError(error)
    }
  }

  return (
    <ConfirmDialog
      open
      title={t('DeleteAccount.modal.form.title')}
      content={
        <form onSubmit={handleSend}>
          <label>{t('DeleteAccount.modal.form.reason.label')}</label>
          <Textarea
            className="u-mt-1"
            ref={reasonElementRef}
            aria-busy={isSending}
            maxLength={REASON_MAXLENGTH}
            readOnly={isSending}
          />
        </form>
      }
      actions={
        <>
          <Button
            disabled={isSending}
            label={t('DeleteAccount.modal.form.button.cancel.label')}
            variant="secondary"
            onClick={onClose}
          />
          <Button
            busy={isSending}
            disabled={isSending}
            label={t('DeleteAccount.modal.form.button.submit.label')}
            color="error"
            onClick={handleSend}
          />
        </>
      }
      onClose={onClose}
    />
  )
}

export default FormModal
