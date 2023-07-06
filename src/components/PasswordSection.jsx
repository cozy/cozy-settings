import React from 'react'
import { Link } from 'react-router-dom'

import Button from 'cozy-ui/transpiled/react/deprecated/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { useHasPassword } from 'hooks/useHasPassword'

const PasswordSection = () => {
  const { t } = useI18n()
  const hasPassword = useHasPassword()

  return hasPassword ? (
    <div>
      <Typography variant="h5" gutterBottom>
        {t('ProfileView.password.title')}
      </Typography>
      <Typography variant="body1">{t('ProfileView.password.label')}</Typography>
      <Button
        tag={Link}
        to="/profile/password"
        label={t('ProfileView.password.cta')}
        theme="secondary"
        className="u-mt-half u-mh-0"
      />
    </div>
  ) : null
}

export default PasswordSection
