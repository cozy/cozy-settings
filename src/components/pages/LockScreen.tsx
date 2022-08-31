import React from 'react'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Fingerprint from 'cozy-ui/transpiled/react/Icons/Fingerprint'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { MenuItemSwitch } from 'components/menu/MenuItemSwitch'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import { isFlagshipApp } from 'cozy-device-helper'
import { Navigate } from 'react-router-dom'
import flag from 'cozy-flags'

export const LockScreen = (): JSX.Element => {
  const { t } = useI18n()

  return isFlagshipApp() || flag('settings.flagship-mode') ? (
    <Page className="u-m-0" narrow>
      <PageTitle>{t('LockScreenView.title')}</PageTitle>

      <nav>
        <List>
          <MenuItemSwitch
            primary={t('Nav.primary_biometry')}
            icon={Fingerprint}
          />
        </List>
      </nav>
    </Page>
  ) : (
    <Navigate to=".." />
  )
}
