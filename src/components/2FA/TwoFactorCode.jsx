import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'
import { Button } from 'cozy-ui/react/Button'

import viewStyles from 'styles/view'
import styles from 'styles/fields'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import Input from 'components/Input'
import settingsConfig from 'config'

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
            <p>
              <span>{t('ProfileView.twofa.modal.nocode')}</span>
              <br />
              {t('ProfileView.twofa.modal.nocode_claude')}
              <a href={`mailto{settingsConfig.contactEmail}`}>
                {settingsConfig.contactEmail}
              </a>
            </p>
          </div>
        </div>
        <div
          className={
            viewStyles['set-view-content-twofa-modal-content-right-buttons']
          }
        >
          <Button
            onClick={closeTwoFAActivationModal}
            theme="secondary"
            label={t('ProfileView.twofa.modal.button.cancel')}
          />
          <Button
            onClick={() => checkTwoFactorCode(twoFactorCode)}
            disabled={!twoFactorCode}
            label={t('ProfileView.twofa.modal.button.validate')}
          />
        </div>
      </div>
    )
  }
}

export default translate()(TwoFactorCode)
