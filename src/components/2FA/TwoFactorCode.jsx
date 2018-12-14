import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'

import viewStyles from '../../styles/view'
import styles from '../../styles/fields'
import ReactMarkdownWrapper from '../ReactMarkdownWrapper'
import Input from '../Input'

export class TwoFactorCode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      twoFactorCode: ''
    }
  }

  onChange(newVal) {
    this.setState(() => ({
      twoFactorCode: newVal
    }))
  }

  render() {
    const {
      t,
      checkTwoFactorCode,
      closeTwoFAActivationModal,
      twoFactor,
      email
    } = this.props
    const { twoFactorCode } = this.state
    return (
      <div>
        <div>
          <h3>{t('ProfileView.twofa.modal.confirmation_title')}</h3>
          <ReactMarkdownWrapper
            source={t('ProfileView.twofa.modal.confirmation_description', {
              email: email
            })}
          />
        </div>
        <label className={styles['coz-form-label']}>
          {t('ProfileView.twofa.modal.code')}
        </label>
        <div
          className={
            viewStyles['set-view-content-twofa-modal-confirmation-input']
          }
        >
          <Input
            name="two_factor_mail"
            type="text"
            value={twoFactorCode}
            errors={twoFactor.checkError && [twoFactor.checkError]}
            onChange={(name, value) => this.onChange(value)}
            submitting={twoFactor.codeChecking}
          />
          <div className={viewStyles['set-view-content-twofa-modal-nocode']}>
            <p>{t('ProfileView.twofa.modal.nocode')}</p>
            <p>
              {t('ProfileView.twofa.modal.nocode_claude')}
              <a href="mailto:claude@cozycloud.cc">claude@cozycloud.cc</a>
            </p>
          </div>
        </div>
        <div
          className={
            viewStyles['set-view-content-twofa-modal-content-right-buttons']
          }
        >
          <Button onClick={closeTwoFAActivationModal} theme="secondary">
            {t('ProfileView.twofa.modal.button.cancel')}
          </Button>
          <Button
            onClick={() => checkTwoFactorCode(twoFactorCode)}
            disabled={!twoFactorCode}
          >
            {t('ProfileView.twofa.modal.button.validate')}
          </Button>
        </div>
      </div>
    )
  }
}

export default translate()(TwoFactorCode)
