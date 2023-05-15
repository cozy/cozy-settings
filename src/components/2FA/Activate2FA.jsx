import React, { useState, useMemo, useCallback } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { ConfirmDialog } from 'cozy-ui/transpiled/react/CozyDialogs'
import Button from 'cozy-ui/transpiled/react/Buttons'
import { useClient } from 'cozy-client'

import ActivationConfirmation from 'components/2FA/ActivationConfirmation'
import TwoFactorCode from 'components/2FA/TwoFactorCode'
import ActivationConfirmed from 'components/2FA/ActivationConfirmed'
import CreatePassword from 'components/2FA/CreatePassword'
import { useShouldCreatePassword } from 'hooks/useShouldCreatePassword'

/**
 * Activation of 2FA requires a 3-step process with an additional step if the user has not configured a password.
 */
export const Activate2FA = ({ onActivation, closeModal, instance, images }) => {
  const { t } = useI18n()
  const client = useClient()
  const shouldCreatePassword = useShouldCreatePassword()

  const [currentStep, setCurrentStep] = useState('validation')
  const [submitting, setSubmitting] = useState(false)
  const [validationError, setValidationError] = useState()

  const activate2FA = useCallback(async () => {
    try {
      await client.stackClient.fetchJSON(
        'PUT',
        '/settings/instance/auth_mode',
        {
          auth_mode: 'two_factor_mail'
        }
      )
      setCurrentStep('confirmation')
    } catch (e) {
      setValidationError('ProfileView.infos.server_error')
    } finally {
      setSubmitting(false)
    }
  }, [client.stackClient])

  const onValidation = () => {
    if (shouldCreatePassword) {
      setCurrentStep('passwordCreation')
    } else {
      activate2FA()
    }
  }

  const onPasswordCreated = useCallback(() => {
    activate2FA()
  }, [activate2FA])

  const onConfirmed = useCallback(() => {
    onActivation()
    closeModal()
  }, [onActivation, closeModal])

  const onCodeConfirmed = () => {
    setCurrentStep('confirmed')
  }

  const content = useMemo(() => {
    switch (currentStep) {
      default:
      case 'validation':
        return (
          <ActivationConfirmation images={images} error={validationError} />
        )
      case 'confirmed':
        return (
          <ActivationConfirmed onConfirmed={onConfirmed} instance={instance} />
        )
      case 'confirmation':
        return (
          <TwoFactorCode
            email={instance && instance.data.attributes.email}
            onCodeConfirmed={onCodeConfirmed}
            closeModal={closeModal}
          />
        )
      case 'passwordCreation':
        return <CreatePassword onSuccess={onPasswordCreated} />
    }
  }, [
    currentStep,
    images,
    instance,
    onConfirmed,
    closeModal,
    validationError,
    onPasswordCreated
  ])

  const title = useMemo(() => {
    if (currentStep === 'validation') {
      return t('ProfileView.twofa.title.activate')
    }
    if (currentStep === 'confirmed') {
      return t('ProfileView.twofa.title.validation')
    }
    return null
  }, [currentStep, t])

  return (
    <ConfirmDialog
      open
      onClose={closeModal}
      title={title}
      size="medium"
      actions={
        currentStep === 'validation' ? (
          <Button
            fullWidth
            onClick={onValidation}
            aria-busy={submitting}
            label={t('ProfileView.twofa.modal.button.activate')}
          />
        ) : null
      }
      content={content}
    />
  )
}

export default Activate2FA
