import React, { Component } from 'react'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import Field from 'cozy-ui/transpiled/react/Field'
import { ErrorMessage } from 'cozy-ui/transpiled/react/Text'

import viewStyles from 'styles/view'
import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
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
        <Field
          label={t('ProfileView.twofa.modal.code')}
          name="two_factor_mail"
          type="text"
          value={twoFactorCode}
          onChange={e => this.onChange(e.target.value)}
          fullwidth
          id="two_factor_mail"
          error={Boolean(twoFactor.checkError)}
        />
        {twoFactor.checkError ? (
          <ErrorMessage>{t(twoFactor.checkError)}</ErrorMessage>
        ) : null}
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
