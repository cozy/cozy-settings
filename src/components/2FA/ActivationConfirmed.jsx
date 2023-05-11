import React from 'react'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const ActivationConfirmed = ({ instance, onConfirmed }) => {
  const { t } = useI18n()
  const client = useClient()

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
        <li>{instance && instance.data.attributes.email}</li>
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
