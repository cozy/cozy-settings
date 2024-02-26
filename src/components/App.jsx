import React from 'react'
import classNames from 'classnames'

import { hot } from 'react-hot-loader'

import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import { Layout, Main } from 'cozy-ui/transpiled/react/Layout'
import { RealTimeQueries } from 'cozy-client'
import CozyDevtools from 'cozy-client/dist/devtools'
import flag from 'cozy-flags'
import { BarComponent } from 'cozy-bar'

import Sidebar from 'components/Sidebar'
import styles from 'styles/index.styl'
import { initFlags } from 'lib/flags'
import SettingsRealTimeQueries from 'components/SettingsRealTimeQueries'
import { AppRouter } from './AppRouter'

initFlags()

export const App = () => {
  const { isMobile, isTablet } = useBreakpoints()
  const isSmallView = isMobile || isTablet
  const isBigView = !isSmallView

  return (
    <Layout
      className={classNames({ [styles['Layout--small-view']]: isSmallView })}
    >
      <BarComponent />
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
