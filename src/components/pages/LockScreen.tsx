import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import FaceId from 'cozy-ui/transpiled/react/Icons/FaceId'
import Fingerprint from 'cozy-ui/transpiled/react/Icons/Fingerprint'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import Password from 'cozy-ui/transpiled/react/Icons/Password'
import Swap from 'cozy-ui/transpiled/react/Icons/Swap'
import flag from 'cozy-flags'
import { getFlagshipMetadata, isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useWebviewIntent, WebviewService } from 'cozy-intent'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import logger from 'lib/logger'
import { MenuItemSwitch } from 'components/menu/MenuItemSwitch'
import { PinCodeDialog } from 'components/dialogs/PinCodeDialog'

const handleChange = async (
  dispatch: React.Dispatch<React.SetStateAction<boolean>>,
  setting: 'biometryLock' | 'autoLock' | 'PINLock',
  webviewIntent?: WebviewService,
  params?: Record<string, unknown>
): Promise<void> => {
  if (!webviewIntent) return

  const res = await webviewIntent.call('toggleSetting', setting, params)

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
  const [pinModalVisible, setPinModalVisible] = useState(false)
  const [biometryEnabled, setBiometry] = useState(
    Boolean(flagshipMetadata.settings_biometryEnabled)
  )
  const [pinCodeEnabled, setPinCode] = useState(
    Boolean(flagshipMetadata.settings_PINEnabled)
  )
  const [autoLockEnabled, setAutoLock] = useState(
    Boolean(flagshipMetadata.settings_autoLockEnabled)
  )
  const biometryAvailable = Boolean(flagshipMetadata.biometry_available)
  const biometryType = flagshipMetadata.biometry_type

  const onBiometryLock = (): void =>
    void handleChange(setBiometry, 'biometryLock', webviewIntent)

  const onPinCodeLock = async (pinCode?: string): Promise<void> => {
    if (!pinCodeEnabled && !pinCode) return setPinModalVisible(true)

    await handleChange(
      setPinCode,
      'PINLock',
      webviewIntent,
      pinCode ? { pinCode } : undefined
    )

    pinCode && setPinModalVisible(false)
  }

  const onAutoLock = (): void =>
    void handleChange(setAutoLock, 'autoLock', webviewIntent)

  return isFlagshipApp() || flag('settings.flagship-mode') ? (
    <Page className="u-m-0" withoutMarginTop>
      <PageTitle>{t('LockScreenView.title')}</PageTitle>

      <nav>
        <List>
          <MenuItemSwitch
            primary={
              biometryType === 'Biometrics'
                ? t('Nav.primary_biometry_android')
                : biometryType === 'TouchID'
                ? t('Nav.primary_biometry_touchid')
                : biometryType === 'FaceID'
                ? t('Nav.primary_biometry_faceid')
                : t('Nav.primary_biometry')
            }
            icon={biometryType === 'FaceID' ? FaceId : Fingerprint}
            onClick={onBiometryLock}
            checked={biometryEnabled}
            disabled={!biometryAvailable}
          />

          <MenuItemSwitch
            checked={pinCodeEnabled}
            icon={Password}
            onClick={(): void => void onPinCodeLock()}
            primary={t('Nav.primary_pin_switch')}
          />

          <MenuItemSwitch
            checked={autoLockEnabled}
            icon={Swap}
            onClick={onAutoLock}
            primary={t('Nav.primary_lock_switch')}
          />
        </List>
      </nav>

      {pinModalVisible && (
        <PinCodeDialog
          setPinCode={(pinCode): void => void onPinCodeLock(pinCode)}
          setModalVisible={setPinModalVisible}
        />
      )}
    </Page>
  ) : (
    <Navigate to=".." />
  )
}
