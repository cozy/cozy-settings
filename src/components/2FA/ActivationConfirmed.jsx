import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const ActivationConfirmed = ({
  closeTwoFAActivationModal,
  instance,
  cozyDomain
}) => {
  const { t } = useI18n()
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
        <li>{cozyDomain}</li>
      </ul>
      <div className="u-ta-right">
        <Button
          onClick={closeTwoFAActivationModal}
          label={t('ProfileView.twofa.modal.button.terminate')}
        />
      </div>
    </>
  )
}

export default ActivationConfirmed
