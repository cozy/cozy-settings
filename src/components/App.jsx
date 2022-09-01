import React, { Component } from 'react'
import { Route, Navigate, Routes } from 'react-router-dom'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import Alerter from 'cozy-ui/transpiled/react/Alerter'
import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { Layout, Main } from 'cozy-ui/transpiled/react/Layout'
import { RealTimeQueries } from 'cozy-client'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import Devices from 'containers/Devices'
import IntentRedirect from 'services/IntentRedirect'
import Passphrase from 'containers/Passphrase'
import Permission from 'containers/Permission'
import PermissionsApplication from 'containers/PermissionsApplication'
import PermissionsTab from 'components/Permissions/PermissionsTab'
import Profile from 'containers/Profile'
import Sessions from 'containers/Sessions'
import Sidebar from 'components/Sidebar'
import Storage from 'containers/Storage'
import { LockScreen } from 'components/pages/LockScreen'
import { Menu } from 'components/pages/Menu'
import { initFlags } from 'lib/flags'
import { routes } from 'constants/routes'

initFlags()

export class App extends Component {
  render() {
    const { isMobile, isTablet } = this.props
    const isSmallView = isMobile || isTablet
    const isBigView = !isSmallView

    return (
      <Layout>
        {App.renderExtra()}
        <FlagSwitcher />
        <Alerter />
        {isBigView && <Sidebar />}
        <RealTimeQueries doctype="io.cozy.oauth.clients" />

        <Main>
          <Routes>
            {isSmallView && <Route path="/menu" element={<Menu />} />}
            <Route path="/redirect" element={<IntentRedirect />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/profile/password" element={<Passphrase />} />
            <Route path="/connectedDevices/*" element={<Devices />} />
            <Route path="/connectedDevices/:deviceId" element={<Devices />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/permissions/:page" element={<PermissionsTab />} />
            <Route path={routes.lockScreen} element={<LockScreen />} />
            <Route
              path="/permissions/slug/:app"
              element={<PermissionsApplication />}
            />
            <Route
              path="/permissions/slug/:app/:permission"
              element={<Permission />}
            />
            <Route path="/exports/:exportId" element={<Profile />} />
            <Route
              path="/permissions"
              element={<Navigate to="/permissions/slug" replace />}
            />
            <Route
              path="*"
              element={
                <Navigate to={isSmallView ? '/menu' : '/profile'} replace />
              }
            />
          </Routes>
        </Main>
        <Sprite />
      </Layout>
    )
  }
}

// This is to facilitate the extension of App in apps overrides
App.renderExtra = () => null

const mapStateToProps = state => ({
  alert: state.ui.alert
})

const AppWithBreakpoints = props => {
  const { isMobile, isTablet } = useBreakpoints()

  return <App {...props} isMobile={isMobile} isTablet={isTablet} />
}

export default hot(module)(
  translate()(connect(mapStateToProps)(AppWithBreakpoints))
)
