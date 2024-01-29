import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import flag from 'cozy-flags'

import { useHasPassword } from 'hooks/useHasPassword'
import EmailModal from 'components/Email/EmailModal'
import AuthentificationModal from 'components/Email/AuthentificationModal'

const ChangeEmail = () => {
  const navigate = useNavigate()
  const { hasPassword } = useHasPassword()

  const [passwordHash, setPasswordHash] = useState('')

  const goToProfile = () => {
    navigate('/profile')
  }

  const onAuthentification = currentPasswordHash => {
    setPasswordHash(currentPasswordHash)
  }

  if (hasPassword === undefined) return null

  const skipEmailConfirmation =
    !hasPassword && !!flag('settings.skip-email-confirmation')

  if (passwordHash || skipEmailConfirmation) {
    return (
      <EmailModal
        onClose={goToProfile}
        passwordHash={passwordHash}
        onSuccess={goToProfile}
        skipConfirmation={skipEmailConfirmation}
      />
    )
  } else {
    return (
      <AuthentificationModal
        onClose={goToProfile}
        onSuccess={onAuthentification}
      />
    )
  }
}

export default ChangeEmail
