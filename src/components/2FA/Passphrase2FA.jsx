import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Modal, { ModalContent } from 'cozy-ui/react/Modal'

import viewStyles from '../../styles/view'
import styles from '../../styles/fields'
import { Button } from 'cozy-ui/react/Button'
import ReactMarkdownWrapper from '../ReactMarkdownWrapper'
import Input from '../Input'

export class Passphrase2FA extends Component {
  constructor (props) {
    super(props)
    this.state = {
      twoFactorCode: ''
    }
  }

  onChange (newVal) {
    this.setState((state, props) => ({
      twoFactorCode: newVal
    }))
  }

  render () {
    const {
      t,
      onPassphrase2FASubmit,
      closeTwoFAPassphraseModal,
      instance,
      submitting
    } = this.props
    const { twoFactorCode } = this.state
    const email = instance && instance.data.attributes.email
    return (
      <div className={viewStyles['set-view-content-twofa-modal-wrapper']}>
        <Modal
          dismissAction={closeTwoFAPassphraseModal}
          className={viewStyles['set-view-content-twofa-modal']}
          title={t('ProfileView.twofa.passphrase.title')}
        >
          <ModalContent
            className={viewStyles['set-view-content-twofa-modal-content']}
          >
            <ReactMarkdownWrapper
              source={t('ProfileView.twofa.passphrase.description', {
                email
              })}
            />
            <div className={viewStyles['set-view-content-twofa-modal-confirmation-input']}>
              <Input
                name='two_factor_mail'
                type='text'
                value={twoFactorCode}
                onChange={(name, value) => this.onChange(value)}
              />
              <div className={viewStyles['set-view-content-twofa-modal-nocode']}>
                <p>{t('ProfileView.twofa.modal.nocode')}</p>
                <p>{t('ProfileView.twofa.modal.nocode_claude')}<a href='mailto:claude@cozycloud.cc'>claude@cozycloud.cc</a></p>
              </div>
            </div>
            {
              !email && <p className={styles['coz-form-errors']}>
                {t('ProfileView.twofa.modal.email')}
              </p>
            }
            <div className={viewStyles['set-view-content-twofa-modal-content-right-buttons']}>
              <Button
                onClick={closeTwoFAPassphraseModal}
                theme='secondary'
              >
                {t('ProfileView.twofa.modal.button.cancel')}
              </Button>
              <Button
                onClick={() => onPassphrase2FASubmit(twoFactorCode)}
                aria-busy={submitting}
                disabled={!email}
              >
                <span>
                  {t('ProfileView.twofa.modal.button.validate')}
                </span>
              </Button>
            </div>
          </ModalContent>
        </Modal>
      </div>
    )
  }
}

export default translate()(Passphrase2FA)
