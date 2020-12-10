import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { Button } from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/Modal'

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
          <p>
            <b>{t('ProfileView.twofa.modal.desactivate_title')}</b>
          </p>
          <p>{t('ProfileView.twofa.modal.desactivate_description')}</p>
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
