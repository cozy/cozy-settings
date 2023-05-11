import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Buttons'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Field from 'cozy-ui/transpiled/react/Field'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import settingsConfig from 'config'

const TwoFactorCode = ({ email, onCodeConfirmed, closeModal }) => {
  const { t } = useI18n()
  const client = useClient()

  const [error, setError] = useState()

  const checkCode = async code => {
    setError()
    try {
      await client.stackClient.fetchJSON(
        'PUT',
        '/settings/instance/auth_mode',
        {
          two_factor_activation_code: code,
          auth_mode: 'two_factor_mail'
        }
      )
      onCodeConfirmed()
    } catch (e) {
      setError('ProfileView.infos.server_error')
    }
  }

  const [twoFactorCode, setTwoFactorCode] = useState('')

  return (
    <>
      <div>
        <Typography variant="h5">
          {t('ProfileView.twofa.modal.confirmation_title')}
        </Typography>
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
        onChange={e => setTwoFactorCode(e.target.value)}
        fullwidth
        id="two_factor_mail"
        error={Boolean(error)}
      />
      {error ? (
        <Typography variant="body1" className="u-error">
          {t(error)}
        </Typography>
      ) : null}
      <Typography variant="body1" gutterBottom>
        <span>{t('ProfileView.twofa.modal.nocode')}</span>
        <br />
        {t('ProfileView.twofa.modal.nocode_claude')}
        <a href={`mailto:${settingsConfig.contactEmail}`}>
          {settingsConfig.contactEmail}
        </a>
      </Typography>
      <div className="u-ta-right">
        <Button
          onClick={closeModal}
          theme="secondary"
          label={t('ProfileView.twofa.modal.button.cancel')}
        />
        <Button
          onClick={() => checkCode(twoFactorCode)}
          disabled={!twoFactorCode}
          label={t('ProfileView.twofa.modal.button.validate')}
        />
      </div>
    </>
  )
}

export default TwoFactorCode
