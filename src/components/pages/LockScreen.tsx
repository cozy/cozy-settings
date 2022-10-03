import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import Fingerprint from 'cozy-ui/transpiled/react/Icons/Fingerprint'
import FaceId from 'cozy-ui/transpiled/react/Icons/FaceId'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import Swap from 'cozy-ui/transpiled/react/Icons/Swap'
import flag from 'cozy-flags'
import { getFlagshipMetadata, isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useWebviewIntent, WebviewService } from 'cozy-intent'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import logger from 'lib/logger'
import { MenuItemSwitch } from 'components/menu/MenuItemSwitch'

const handleChange = async (
  dispatch: React.Dispatch<React.SetStateAction<boolean>>,
  setting: 'biometryLock' | 'autoLock',
  webviewIntent?: WebviewService
): Promise<void> => {
  if (!webviewIntent) return

  const res = await webviewIntent.call('toggleSetting', setting)

  typeof res === 'boolean'
    ? dispatch(res)
    : logger.error(
        `Error while calling toggleSetting('${setting}'), returned value is null or undefined."`
      )
}

export const LockScreen = (): JSX.Element => {
  const { t } = useI18n()
  const webviewIntent = useWebviewIntent()
  const flagshipMetadata = getFlagshipMetadata()
  const [biometryEnabled, setBiometry] = useState(
    Boolean(flagshipMetadata.settings_biometryEnabled)
  )
  const [autoLockEnabled, setAutoLock] = useState(
    Boolean(flagshipMetadata.settings_autoLockEnabled)
  )
  const biometryAvailable = Boolean(flagshipMetadata.biometry_available)
  const biometryType = flagshipMetadata.biometry_type

  const onBiometryLock = (): void =>
    void handleChange(setBiometry, 'biometryLock', webviewIntent)

  const onAutoLock = (): void =>
    void handleChange(setAutoLock, 'autoLock', webviewIntent)

  return isFlagshipApp() || flag('settings.flagship-mode') ? (
    <Page className="u-m-0" narrow>
      <PageTitle>{t('LockScreenView.title')}</PageTitle>

      <nav>
        <List>
          <MenuItemSwitch
            primary={
              biometryType === 'Biometrics'
                ? t('Nav.primary_biometry_android')
                : biometryType === 'TouchID'
                ? t('Nav.primary_biometry_TouchId')
                : biometryType === 'FaceID'
                ? t('Nav.primary_biometry_FaceId')
                : t('Nav.primary_biometry')
            }
            icon={biometryType === 'FaceID' ? FaceId : Fingerprint}
            onClick={onBiometryLock}
            checked={biometryEnabled}
            disabled={!biometryAvailable}
          />

          <MenuItemSwitch
            primary={t('Nav.primary_lock_switch')}
            icon={Swap}
            onClick={onAutoLock}
            checked={autoLockEnabled}
          />
        </List>
      </nav>
    </Page>
  ) : (
    <Navigate to=".." />
  )
}
