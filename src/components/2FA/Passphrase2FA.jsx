import React, { Component } from 'react'
import { translate } from 'cozy-ui/transpiled/react/providers/I18n'
import { Dialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Input from 'cozy-ui/transpiled/react/Input'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Button } from 'cozy-ui/transpiled/react/deprecated/Button'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import settingsConfig from 'config'

export class Passphrase2FA extends Component {
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
      onPassphrase2FASubmit,
      closeTwoFAPassphraseModal,
      instance,
      submitting
    } = this.props
    const { twoFactorCode } = this.state
    const email = instance && instance.data.attributes.email
    return (
      <Dialog
        open
        onClose={closeTwoFAPassphraseModal}
        title={t('ProfileView.twofa.passphrase.title')}
        size="small"
        actions={
          <>
            <Button
              onClick={closeTwoFAPassphraseModal}
              theme="secondary"
              label={t('ProfileView.twofa.modal.button.cancel')}
            />
            <Button
              onClick={() => onPassphrase2FASubmit(twoFactorCode)}
              aria-busy={submitting}
              disabled={!email}
              label={t('ProfileView.twofa.modal.button.validate')}
            />
          </>
        }
        content={
          <>
            <ReactMarkdownWrapper
              source={t('ProfileView.twofa.passphrase.description', {
                email
              })}
            />
            <div>
              <Input
                name="two_factor_mail"
                type="text"
                value={twoFactorCode}
                onChange={e => this.onChange(e.target.value)}
              />
              <div>
                <Typography variant="body1">
                  {t('ProfileView.twofa.modal.nocode')}
                </Typography>
                <Typography variant="body1">
                  {t('ProfileView.twofa.modal.nocode_claude')}
                  <a href="mailto{settingsConfig.contactEmail}">
                    {settingsConfig.contactEmail}
                  </a>
                </Typography>
              </div>
            </div>
            {!email && (
              <Typography variant="body1" className="u-error">
                {t('ProfileView.twofa.modal.email')}
              </Typography>
            )}
          </>
        }
      />
    )
  }
}

export default translate()(Passphrase2FA)
