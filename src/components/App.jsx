import React, { Component } from 'react'
import classNames from 'classnames'
import { Route, Navigate, Routes, Outlet } from 'react-router-dom'
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
import PermissionsApplication from 'components/Permissions/AppPermissions/AppPermissions'
import PermissionsTab from 'components/Permissions/PermissionsTab'
import DataPermissions from 'components/Permissions/DataPermissions/DataPermissions'
import Support from 'components/Support/Support'
import PermissionDetails from 'components/Permissions/PermissionDetails/PermissionDetails'
import Profile from 'containers/Profile'
import Sessions from 'containers/Sessions'
import Sidebar from 'components/Sidebar'
import Storage from 'containers/Storage'
import styles from 'styles/index.styl'
import { LockScreen } from 'components/pages/LockScreen'
import { Menu } from 'components/pages/Menu'
import { initFlags } from 'lib/flags'
import { routes } from 'constants/routes'

initFlags()

const OutletWrapper = ({ Component }) => (
  <>
    <Component />
    <Outlet />
  </>
)

export class App extends Component {
  render() {
    const { isMobile, isTablet } = this.props
    const isSmallView = isMobile || isTablet
    const isBigView = !isSmallView

    return (
      <Layout
        className={classNames({ [styles['Layout--small-view']]: isSmallView })}
      >
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
            <Route path={routes.lockScreen} element={<LockScreen />} />
            <Route path="/permissions/:page" element={<PermissionsTab />} />
            <Route
              path="/permissions/slug/:slug"
              element={<OutletWrapper Component={PermissionsApplication} />}
            >
              <Route
                path="details/:permissionType"
                element={<PermissionDetails />}
              />
            </Route>
            <Route path="/exports/:exportId" element={<Profile />} />
            <Route
              path="/permissions"
              element={<Navigate to="/permissions/slug" replace />}
            />
            <Route
              path="/permissions/data/:permission"
              element={<DataPermissions />}
            />
            <Route path="/support" element={<Support />} />
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
