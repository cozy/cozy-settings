import classNames from 'classnames'
import React from 'react'
import { hot } from 'react-hot-loader'

import { BarComponent } from 'cozy-bar'
import { RealTimeQueries } from 'cozy-client'
import CozyDevtools from 'cozy-devtools'
import flag from 'cozy-flags'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { Layout, Main } from 'cozy-ui/transpiled/react/Layout'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'

import { AppRouter } from './AppRouter'

import styles from '@/styles/index.styl'

import SettingsRealTimeQueries from '@/components/SettingsRealTimeQueries'
import Sidebar from '@/components/Sidebar'
import { initFlags } from '@/lib/flags'

initFlags()

export const App = () => {
  const { isMobile, isTablet } = useBreakpoints()
  const isSmallView = isMobile || isTablet
  const isBigView = !isSmallView

  return (
    <Layout
      className={classNames({ [styles['Layout--small-view']]: isSmallView })}
    >
      <BarComponent appNamePrefix={null} />
      {App.renderExtra()}
      <Alerter />
      {isBigView && <Sidebar />}
      <RealTimeQueries doctype="io.cozy.oauth.clients" />
      <SettingsRealTimeQueries />
      <Main>
        <AppRouter />
      </Main>
      <Sprite />
      {flag('debug') ? <CozyDevtools /> : null}
    </Layout>
  )
}

// This is to facilitate the extension of App in apps overrides
App.renderExtra = () => null

export default hot(module)(App)
