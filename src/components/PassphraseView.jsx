import React, { useState, useEffect } from 'react'

import PassphraseForm from 'components/PassphraseForm'
import Passphrase2FA from 'components/2FA/Passphrase2FA'
import Page from 'components/Page'

const PassphraseView = props => {
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false)
  const [currentPassphrase, setCurrentPassphrase] = useState('')
  const [newPassphrase, setNewPassphrase] = useState('')
  const [hint, setHint] = useState('')

  const handlePassphrase2FAStep1 = async (
    currentPassphrase,
    newPassphrase,
    hint
  ) => {
    setCurrentPassphrase(currentPassphrase)
    setNewPassphrase(newPassphrase)
    setHint(hint)
    setTwoFAModalOpen(true)
    await onPassphrase2FAStep1(currentPassphrase)
  }

  const handlePassphrase2FASubmit = twoFactorCode => {
    const { twoFactorToken } = passphrase
    // eslint-disable-next-line promise/catch-or-return
    onPassphrase2FAStep2(
      currentPassphrase,
      newPassphrase,
      twoFactorCode,
      twoFactorToken,
      hint
    ).then(() => setTwoFAModalOpen(false))
  }

  const onSubmit = isTwoFactorEnabled
    ? handlePassphrase2FAStep1
    : onPassphraseSimpleSubmit

  return (
    <Page narrow>
      <PassphraseForm {...passphrase} onSubmit={onSubmit} />
      {twoFAModalOpen && !passphrase.errors && !passphrase.submitting && (
        <Passphrase2FA
          onPassphrase2FASubmit={handlePassphrase2FASubmit}
          closeTwoFAPassphraseModal={() => setTwoFAModalOpen(false)}
          instance={instance}
          submitting={passphrase.submitting2FAStep2}
        />
      )}
    </Page>
  )
}

export default PassphraseView
