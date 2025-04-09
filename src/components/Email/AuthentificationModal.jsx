import React from 'react'

import { AuthentificationDialog } from 'cozy-ui/transpiled/react/CozyDialogs'

import useCheckPassword from '@/hooks/useCheckPassword'

const AuthentificationModal = ({ onClose, onSuccess }) => {
  const { checkPassword, error, isLoading } = useCheckPassword()

  const handleAuthentification = async password => {
    checkPassword(password, onSuccess)
  }

  return (
    <AuthentificationDialog
      onSubmit={handleAuthentification}
      isLoading={isLoading}
      error={error}
      onClose={onClose}
      from="settings"
    />
  )
}

export default AuthentificationModal
