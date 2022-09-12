import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import Fingerprint from 'cozy-ui/transpiled/react/Icons/Fingerprint'
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
  const [biometryEnabled, setBiometry] = useState(
    Boolean(getFlagshipMetadata().settings?.biometryEnabled)
  )
  const [autoLockEnabled, setAutoLock] = useState(
    Boolean(getFlagshipMetadata().settings?.autoLockEnabled)
  )

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
            primary={t('Nav.primary_biometry')}
            icon={Fingerprint}
            onClick={onBiometryLock}
            checked={biometryEnabled}
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
