import React, { useState, useEffect } from 'react'
import PassphraseForm from 'components/PassphraseForm'
import Passphrase2FA from 'components/2FA/Passphrase2FA'
import classNames from 'classnames'
import viewStyles from 'styles/view'

const PasswordView = props => {
  const {
    onPassphraseSimpleSubmit,
    onPassphrase2FAStep1,
    onPassphrase2FAStep2,
    passphrase,
    isTwoFactorEnabled,
    instance,
    fetchInfos
  } = props

  useEffect(() => {
    fetchInfos()
  }, [])

  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false)
  const [currentPassphrase, setCurrentPassphrase] = useState('')
  const [new2FAPassphrase, setNew2FAPassphrase] = useState('')

  const handlePassphrase2FAStep1 = (current, newVal) => {
    setCurrentPassphrase(current)
    setNew2FAPassphrase(newVal)
    setTwoFAModalOpen(true)
    onPassphrase2FAStep1(current)
  }

  const handlePassphrase2FASubmit = twoFactorCode => {
    const { twoFactorToken } = passphrase
    onPassphrase2FAStep2(
      currentPassphrase,
      new2FAPassphrase,
      twoFactorCode,
      twoFactorToken
    ).then(() => setTwoFAModalOpen(false))
  }

  const onSubmit = isTwoFactorEnabled
    ? handlePassphrase2FAStep1
    : onPassphraseSimpleSubmit

  return (
    <div role="contentinfo">
      <div
        className={classNames(
          viewStyles['set-view-content'],
          viewStyles['set-view-content--narrow']
        )}
      >
        <PassphraseForm {...passphrase} onSubmit={onSubmit} />
        {twoFAModalOpen &&
          !passphrase.errors &&
          !passphrase.submitting && (
            <Passphrase2FA
              onPassphrase2FASubmit={handlePassphrase2FASubmit}
              closeTwoFAPassphraseModal={() => setTwoFAModalOpen(false)}
              instance={instance}
              submitting={passphrase.submitting2FAStep2}
            />
          )}
      </div>
    </div>
  )
}

export default PasswordView
