import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useClient } from 'cozy-client'

export const Desactivate2FA = ({ closeModal, onDesactivation }) => {
  const { t } = useI18n()

  const client = useClient()

  const desactivate2FA = async () => {
    await client.stackClient.fetchJSON('PUT', '/settings/instance/auth_mode', {
      auth_mode: 'basic'
    })
    onDesactivation()
    closeModal()
  }

  return (
    <ConfirmDialog
      open
      onClose={closeModal}
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
            onClick={closeModal}
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
