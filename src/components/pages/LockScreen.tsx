import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

import Fingerprint from 'cozy-ui/transpiled/react/Icons/Fingerprint'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import flag from 'cozy-flags'
import { getFlagshipMetadata, isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useWebviewIntent, WebviewService } from 'cozy-intent'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import logger from 'lib/logger'
import { MenuItemSwitch } from 'components/menu/MenuItemSwitch'

const handleChange = async (
  setHasBiometry: React.Dispatch<React.SetStateAction<boolean>>,
  webviewIntent?: WebviewService
): Promise<void> => {
  const res = await webviewIntent?.call('openSettingBiometry')

  typeof res === 'boolean'
    ? setHasBiometry(res)
    : (logger as { error: (arg: string) => void }).error(
        `Error while calling openSettingBiometry(), returned value is not a boolean: "${
          res === undefined ? 'undefined' : res === null ? 'null' : res
        }"`
      )
}

export const LockScreen = (): JSX.Element => {
  const { t } = useI18n()
  const webviewIntent = useWebviewIntent()
  const [hasBiometry, setHasBiometry] = useState(
    Boolean(getFlagshipMetadata().hasBiometry)
  )

  return isFlagshipApp() || flag('settings.flagship-mode') ? (
    <Page className="u-m-0" narrow>
      <PageTitle>{t('LockScreenView.title')}</PageTitle>

      <nav>
        <List>
          <MenuItemSwitch
            primary={t('Nav.primary_biometry')}
            icon={Fingerprint}
            onClick={(): void =>
              void handleChange(setHasBiometry, webviewIntent)
            }
            checked={hasBiometry}
          />
        </List>
      </nav>
    </Page>
  ) : (
    <Navigate to=".." />
  )
}
