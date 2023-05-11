import React, { useEffect, useState } from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { hasQueryBeenLoaded, useQuery } from 'cozy-client'

import Input from 'components/Input'
import Activate2FA from 'components/2FA/Activate2FA'
import Desactivate2FA from 'components/2FA/Desactivate2FA'
import { buildSettingsInstanceQuery } from 'lib/queries'

const twoFaModalBanner = require('assets/images/double_authent_prez_banner.svg')
const twoFaModalProtect = require('assets/images/protect_data_point.svg')
const twoFaModalSecu = require('assets/images/niv_secu_point.svg')

const TwoFA = ({ instance }) => {
  const { t } = useI18n()

  const instanceQuery = buildSettingsInstanceQuery()
  const instanceResult = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  const [isTwoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isActivationModalOpen, setActivationModalOpen] = useState(false)
  const [isDesactivationModalOpen, setDesactivationModalOpen] = useState(false)

  useEffect(() => {
    if (hasQueryBeenLoaded(instanceResult)) {
      setTwoFactorEnabled(
        instanceResult.data.attributes.auth_mode === 'two_factor_mail'
      )
    }
  }, [instanceResult, instanceResult.data])

  const openActivationModal = () => {
    setActivationModalOpen(true)
  }

  const closeActivationModal = () => {
    setActivationModalOpen(false)
  }

  const openDesactivationModal = () => {
    setDesactivationModalOpen(true)
  }
  const closeDesactivationModal = () => {
    setDesactivationModalOpen(false)
  }

  const onActivation = () => {
    setTwoFactorEnabled(true)
  }

  const onDesactivation = () => {
    setTwoFactorEnabled(false)
  }

  return (
    <div>
      <Input
        name="two_fa"
        type="checkbox"
        title={t('ProfileView.twofa.title.activate')}
        label={t('ProfileView.twofa.label', {
          link: 'https://support.cozy.io/article/114-doubleauthentification'
        })}
        value={isTwoFactorEnabled}
        onChange={
          isTwoFactorEnabled ? openDesactivationModal : openActivationModal
        }
      />
      {isActivationModalOpen && (
        <Activate2FA
          onActivation={onActivation}
          closeModal={closeActivationModal}
          instance={instance}
          images={{
            twoFaModalBanner: twoFaModalBanner,
            twoFaModalSecu: twoFaModalSecu,
            twoFaModalProtect: twoFaModalProtect
          }}
        />
      )}
      {isDesactivationModalOpen && (
        <Desactivate2FA
          onDesactivation={onDesactivation}
          closeModal={closeDesactivationModal}
        />
      )}
    </div>
  )
}

export default TwoFA
