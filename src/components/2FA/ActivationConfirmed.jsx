import React from 'react'

import { useClient, useQuery } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/deprecated/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'

import { buildSettingsInstanceQuery } from 'lib/queries'

export const ActivationConfirmed = ({ onConfirmed }) => {
  const { t } = useI18n()
  const client = useClient()

  const instanceQuery = buildSettingsInstanceQuery()
  const { data: instance } = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {t('ProfileView.twofa.modal.validation_title')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('ProfileView.twofa.modal.validation_description')}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {t('ProfileView.twofa.modal.validation_logs')}
      </Typography>
      <ul>
        <li>{instance.email}</li>
        <li>{client.stackClient.uri}</li>
      </ul>
      <div className="u-ta-right">
        <Button
          onClick={onConfirmed}
          label={t('ProfileView.twofa.modal.button.terminate')}
        />
      </div>
    </>
  )
}

export default ActivationConfirmed
