import React from 'react'
import { Link } from 'react-router-dom'

import flag from 'cozy-flags'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { useHasPassword } from '@/hooks/useHasPassword'

const PasswordSection = () => {
  const { t } = useI18n()
  const { hasPassword } = useHasPassword()

  return hasPassword ? (
    <div>
      <Typography variant="h5" gutterBottom>
        {t('ProfileView.password.title')}
      </Typography>
      <Typography variant="body1">{t('ProfileView.password.label')}</Typography>
      <Buttons
        component={Link}
        to="/profile/password"
        label={t('ProfileView.password.cta')}
        variant="secondary"
        className="u-mt-half u-mh-0"
        disabled={flag('settings.password.readonly')}
      />
    </div>
  ) : null
}

export default PasswordSection
