import React, { useState } from 'react'

import { useClient } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Field from 'cozy-ui/transpiled/react/Field'

import { submitPassword } from './helpers'

const ConfirmModal = ({ dismissAction, primaryAction }) => {
  const { t } = useI18n()
  const client = useClient()
  const [currentPassphrase, setCurrentPassphrase] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [isRequired, setIsRequired] = useState(false)
  const [error, setError] = useState('')

  const handleChange = ev => {
    const value = ev.target.value
    if (value) {
      setIsRequired(false)
    }
    setCurrentPassphrase(value)
  }

  const handleSubmit = () =>
    submitPassword({
      client,
      t,
      currentPassphrase,
      primaryAction,
      setError,
      setIsRequired,
      setIsBusy
    })

  return (
    <ConfirmDialog
      open
      title={t('DeleteAccount.modal.confirm.title')}
      content={
        <>
          <ul className="u-mt-0">
            <li>{t('DeleteAccount.modal.confirm.description.line.1')}</li>
            <li>{t('DeleteAccount.modal.confirm.description.line.2')}</li>
            <li>{t('DeleteAccount.modal.confirm.description.line.3')}</li>
          </ul>
          <Typography variant="body1">
            {t('DeleteAccount.modal.confirm.description.line.4')}
          </Typography>
          <Field
            className="u-mt-1 u-mb-0"
            value={currentPassphrase}
            type="password"
            error={isRequired}
            secondaryLabels={{
              hideLabel: t('DeleteAccount.modal.confirm.password.hide'),
              showLabel: t('DeleteAccount.modal.confirm.password.show')
            }}
            onChange={handleChange}
          />
          <Typography
            className={!isRequired && 'u-o-0'}
            variant="body1"
            color="error"
          >
            {t('DeleteAccount.modal.confirm.password.required')}
          </Typography>
          {error && (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          )}
        </>
      }
      actions={
        <>
          <Button
            label={t('DeleteAccount.modal.confirm.button.submit.label')}
            color="error"
            busy={isBusy}
            onClick={handleSubmit}
          />
          <Button
            label={t('DeleteAccount.modal.confirm.button.cancel.label')}
            variant="secondary"
            onClick={dismissAction}
          />
        </>
      }
      onClose={dismissAction}
    />
  )
}

export default ConfirmModal
