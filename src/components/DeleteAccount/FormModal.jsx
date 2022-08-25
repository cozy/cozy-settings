import React, { useState, useRef } from 'react'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { sendDeleteAccountRequest } from 'actions/email'
import { getStackDomain } from 'actions/domUtils'
import styles from 'styles/deleteAccountFormModal.styl'

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

  const handleSuccess = () => {
    setStatus(DONE)
    onSuccess && onSuccess()
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
      await sendDeleteAccountRequest(
        client,
        t('DeleteAccount.request.mail.subject', { domain }),
        reason.substring(0, REASON_MAXLENGTH)
      )
      return handleSuccess()
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
          <div className={styles['coz-textarea-wrapper']}>
            <textarea
              aria-busy={isSending}
              maxLength={REASON_MAXLENGTH}
              readOnly={isSending}
              ref={reasonElementRef}
            />
          </div>
        </form>
      }
      actions={
        <>
          <Button
            disabled={isSending}
            label={t('DeleteAccount.modal.form.button.cancel.label')}
            onClick={onClose}
            theme="secondary"
            type="button"
          />
          <Button
            busy={isSending}
            disabled={isSending}
            label={t('DeleteAccount.modal.form.button.submit.label')}
            theme="danger"
            onClick={handleSend}
          />
        </>
      }
      onClose={onClose}
    />
  )
}

export default FormModal
