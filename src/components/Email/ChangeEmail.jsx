import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import EmailModal from './EmailModal'
import AuthentificationModal from './AuthentificationModal'

const ChangeEmail = () => {
  const navigate = useNavigate()
  const [passwordHash, setPasswordHash] = useState()

  const goToProfile = () => {
    navigate('/profile')
  }

  const onAuthentification = currentPasswordHash => {
    setPasswordHash(currentPasswordHash)
  }

  if (passwordHash) {
    return (
      <EmailModal
        onClose={goToProfile}
        passwordHash={passwordHash}
        onSuccess={goToProfile}
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
