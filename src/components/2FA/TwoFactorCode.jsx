import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Buttons'
import TextField from 'cozy-ui/transpiled/react/MuiCozyTheme/TextField'

import Typography from 'cozy-ui/transpiled/react/Typography'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'

const TwoFactorCode = ({ email, onCodeConfirmed }) => {
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
    <div className="u-h-100 u-flex u-flex-column u-flex-items-center u-ta-center">
      <Typography variant="h4" className="u-mt-auto u-mb-half">
        {t('ProfileView.twofa.modal.confirmation_title')}
      </Typography>
      <ReactMarkdownWrapper
        source={t('ProfileView.twofa.modal.confirmation_description', {
          email: email
        })}
      />
      <TextField
        className="u-mt-half u-mb-1"
        id="two_factor_mail"
        variant="outlined"
        inputProps={{ pattern: '[0-9]+', inputMode: 'numeric', maxLength: '6' }}
        label={t('ProfileView.twofa.modal.code')}
        value={twoFactorCode}
        onChange={e => setTwoFactorCode(e.target.value)}
        error={Boolean(error)}
        {...(error && { helperText: t(error) })}
        fullWidth
        required
      />
      <Button
        className="u-mt-auto"
        label={t('ProfileView.twofa.modal.button.confirm')}
        onClick={() => checkCode(twoFactorCode)}
        disabled={!twoFactorCode}
        fullWidth
      />
    </div>
  )
}

export default TwoFactorCode
