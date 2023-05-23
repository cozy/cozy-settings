import React from 'react'
import { Link } from 'react-router-dom'
import get from 'lodash/get'

import { useClient } from 'cozy-client'
import Button from 'cozy-ui/transpiled/react/Button'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Typography from 'cozy-ui/transpiled/react/Typography'

const PasswordSection = () => {
  const { t } = useI18n()
  const client = useClient()

  // If we have no capabilities, consider that we can login to the cozy with password
  const canAuthWithPassword = get(
    client,
    'capabilities.can_auth_with_password',
    true
  )

  return canAuthWithPassword ? (
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
