import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'

import styles from 'styles/deleteAccountFormModal'

import { sendDeleteAccountRequest } from 'actions/email'

import Button from 'cozy-ui/react/Button'
import Modal, {
  ModalContent,
  ModalFooter,
  ModalHeader
} from 'cozy-ui/react/Modal'

const DONE = 'done'
const ERRORED = 'errored'
const IDLE = 'idle'
const SENDING = 'sending'

const REASON_MAXLENGTH = 500

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
    const { domain, t } = this.props
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
      <Modal
        closable
        dismissAction={dismissAction}
        mobileFullScreen
        size="small"
      >
        <ModalHeader>{t('DeleteAccount.modal.form.title')}</ModalHeader>
        <form onSubmit={this.onSend}>
          <ModalContent>
            <label>{t('DeleteAccount.modal.form.reason.label')}</label>
            <div className={styles['coz-textarea-wrapper']}>
              <textarea
                aria-busy={isSending}
                maxength={REASON_MAXLENGTH}
                readOnly={isSending}
                ref={element => {
                  this.reasonElement = element
                }}
              />
            </div>
          </ModalContent>
          <ModalFooter className={styles['set-delete-account-form-controls']}>
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
              type="submit"
            />
          </ModalFooter>
        </form>
      </Modal>
    )
  }
}

export default translate()(FormModal)
