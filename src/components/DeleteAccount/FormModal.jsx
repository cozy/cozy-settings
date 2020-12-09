import React, { Component } from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import { sendDeleteAccountRequest } from 'actions/email'
import { STACK_DOMAIN } from 'actions'

import styles from 'styles/deleteAccountFormModal'

const DONE = 'done'
const ERRORED = 'errored'
const IDLE = 'idle'
const SENDING = 'sending'

const REASON_MAXLENGTH = 3000

export class FormModal extends Component {
  state = {
    status: IDLE
  }

  setStatus = status => this.setState({ status })

  onSuccess = () => {
    const { onSuccess } = this.props
    this.setStatus(DONE)
    onSuccess && onSuccess()
  }

  onError = error => {
    const { onError } = this.props
    this.setStatus(ERRORED)
    onError && onError(error)
  }

  onSend = async event => {
    event.preventDefault()
    const { t } = this.props
    const domain = STACK_DOMAIN.replace('//', '')
    const reason = this.reasonElement.value
    this.setStatus(SENDING)
    try {
      await sendDeleteAccountRequest(
        t('DeleteAccount.request.mail.subject', { domain }),
        reason.substring(0, REASON_MAXLENGTH)
      )
      return this.onSuccess()
    } catch (error) {
      return this.onError(error)
    }
  }

  render = () => {
    const { dismissAction, t } = this.props
    const { status } = this.state
    const isSending = status === SENDING
    return (
      <ConfirmDialog
        open
        onClose={dismissAction}
        mobileFullScreen
        title={t('DeleteAccount.modal.form.title')}
        content={
          <>
            <form onSubmit={this.onSend}>
              <label>{t('DeleteAccount.modal.form.reason.label')}</label>
              <div className={styles['coz-textarea-wrapper']}>
                <textarea
                  aria-busy={isSending}
                  maxLength={REASON_MAXLENGTH}
                  readOnly={isSending}
                  ref={element => {
                    this.reasonElement = element
                  }}
                />
              </div>
            </form>
          </>
        }
        actions={
          <>
            <Button
              disabled={isSending}
              label={t('DeleteAccount.modal.form.button.cancel.label')}
              onClick={dismissAction}
              theme="secondary"
              type="button"
            />
            <Button
              busy={isSending}
              disabled={isSending}
              label={t('DeleteAccount.modal.form.button.submit.label')}
              theme="danger"
              onClick={this.onSend}
            />
          </>
        }
      />
    )
  }
}

export default translate()(FormModal)
