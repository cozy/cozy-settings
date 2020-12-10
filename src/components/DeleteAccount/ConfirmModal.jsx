import React from 'react'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Button'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

export const ConfirmModal = props => {
  const { dismissAction, primaryAction } = props
  const { t } = useI18n()
  return (
    <ConfirmDialog
      open
      closable
      onClose={dismissAction}
      title={t('DeleteAccount.modal.confirm.title')}
      content={
        <ul className="u-mv-0">
          <li>{t('DeleteAccount.modal.confirm.description.line.1')}</li>
          <li>{t('DeleteAccount.modal.confirm.description.line.2')}</li>
          <li>{t('DeleteAccount.modal.confirm.description.line.3')}</li>
        </ul>
      }
      actions={
        <>
          <Button
            label={t('DeleteAccount.modal.confirm.button.submit.label')}
            onClick={primaryAction}
            theme="danger"
          />
          <Button
            label={t('DeleteAccount.modal.confirm.button.cancel.label')}
            onClick={dismissAction}
            theme="secondary"
          />
        </>
      }
    />
  )
}

export default ConfirmModal
