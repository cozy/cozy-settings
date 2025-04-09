import React, { useCallback, useState } from 'react'

import { useQuery, hasQueryBeenLoaded } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import Passphrase2FA from '@/components/2FA/Passphrase2FA'
import Page from '@/components/Page'
import PassphraseForm from '@/components/PassphraseForm'
import { buildSettingsInstanceQuery } from '@/lib/queries'

const PassphraseView = ({
  onPassphraseSimpleSubmit,
  onPassphrase2FAStep1,
  onPassphrase2FAStep2,
  passphrase
}) => {
  const [twoFAModalOpen, setTwoFAModalOpen] = useState(false)
  const [currentPassphrase, setCurrentPassphrase] = useState('')
  const [newPassphrase, setNewPassphrase] = useState('')
  const [hint, setHint] = useState('')

  const handlePassphrase2FAStep1 = useCallback(
    async (currentPassphrase, newPassphrase, hint) => {
      setCurrentPassphrase(currentPassphrase)
      setNewPassphrase(newPassphrase)
      setHint(hint)
      setTwoFAModalOpen(true)
      await onPassphrase2FAStep1(currentPassphrase)
    },
    [onPassphrase2FAStep1]
  )

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

  const instanceQuery = buildSettingsInstanceQuery()
  const instanceResult = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  const onSubmit = useCallback(
    (...params) =>
      instanceResult.data && instanceResult.data.auth_mode === 'two_factor_mail'
        ? handlePassphrase2FAStep1(...params)
        : onPassphraseSimpleSubmit(...params),
    [instanceResult, handlePassphrase2FAStep1, onPassphraseSimpleSubmit]
  )

  return (
    <Page narrow fullHeight>
      {hasQueryBeenLoaded(instanceResult) ? (
        <>
          <PassphraseForm {...passphrase} onSubmit={onSubmit} />
          {twoFAModalOpen && !passphrase.errors && !passphrase.submitting && (
            <Passphrase2FA
              onPassphrase2FASubmit={handlePassphrase2FASubmit}
              closeTwoFAPassphraseModal={() => setTwoFAModalOpen(false)}
              instance={instanceResult.data}
              submitting={passphrase.submitting2FAStep2}
            />
          )}
        </>
      ) : (
        <Spinner
          className="u-pos-fixed-s"
          middle
          size="xxlarge"
          loadingType="loading"
        />
      )}
    </Page>
  )
}

export default PassphraseView
