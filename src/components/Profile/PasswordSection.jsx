import React from 'react'

import flag from 'cozy-flags'
import Buttons from 'cozy-ui/transpiled/react/Buttons'
import Stack from 'cozy-ui/transpiled/react/Stack'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { useHasPassword } from '@/hooks/useHasPassword'

const PasswordSection = () => {
  const { t } = useI18n()
  const { hasPassword } = useHasPassword()

  const signUpUrl = flag('signup.url')
  const isPasswordReadonly = flag('settings.password.readonly') || !signUpUrl

  return hasPassword ? (
    <Stack spacing="m">
      <Typography variant="h5" gutterBottom>
        {t('ProfileView.password.title')}
      </Typography>
      <Typography variant="body1">{t('ProfileView.password.label')}</Typography>
      <Buttons
        variant="secondary"
        size="medium"
        label={t('ProfileView.password.cta')}
        href={`${signUpUrl}/change-password`}
        target="_blank"
        disabled={isPasswordReadonly}
      />
    </Stack>
  ) : null
}

export default PasswordSection
