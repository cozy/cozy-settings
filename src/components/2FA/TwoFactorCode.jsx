import React, { useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import Field from 'cozy-ui/transpiled/react/Field'
import Typography from 'cozy-ui/transpiled/react/Typography'

import ReactMarkdownWrapper from 'components/ReactMarkdownWrapper'
import settingsConfig from 'config'

const TwoFactorCode = ({
  checkTwoFactorCode,
  closeTwoFAActivationModal,
  twoFactor,
  email
}) => {
  const { t } = useI18n()

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
        error={Boolean(twoFactor.checkError)}
      />
      {twoFactor.checkError ? (
        <Typography variant="body1" className="u-error">
          {t(twoFactor.checkError)}
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
    </>
  )
}

export default TwoFactorCode
