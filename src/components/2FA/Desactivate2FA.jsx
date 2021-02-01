import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Typography from 'cozy-ui/transpiled/react/Typography'

export const Desactivate2FA = ({
  desactivate2FA,
  closeTwoFADesactivationModal
}) => {
  const { t } = useI18n()
  return (
    <ConfirmDialog
      open
      onClose={closeTwoFADesactivationModal}
      title={t('ProfileView.twofa.title.desactivate')}
      content={
        <>
          <Typography variant="body1">
            <b>{t('ProfileView.twofa.modal.desactivate_title')}</b>
          </Typography>
          <Typography variant="body1">
            {t('ProfileView.twofa.modal.desactivate_description')}
          </Typography>
        </>
      }
      actions={
        <>
          <Button
            onClick={closeTwoFADesactivationModal}
            theme="secondary"
            label={t('ProfileView.twofa.modal.button.cancel')}
          />
          <Button
            onClick={desactivate2FA}
            theme="danger"
            label={t('ProfileView.twofa.modal.button.desactivate')}
          />
        </>
      }
    />
  )
}

export default Desactivate2FA
