import React from 'react'
import classNames from 'classnames'
import { Route, Navigate, Routes, Outlet } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { Layout, Main } from 'cozy-ui/transpiled/react/Layout'
import { RealTimeQueries } from 'cozy-client'
import CozyDevtools from 'cozy-client/dist/devtools'
import flag from 'cozy-flags'

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
import { Storage } from 'components/Storage/Storage'
import styles from 'styles/index.styl'
import { LockScreen } from 'components/pages/LockScreen'
import { Menu } from 'components/pages/Menu'
import { initFlags } from 'lib/flags'
import { routes } from 'constants/routes'
import { Subscription } from 'components/Subscription/Subscription'

initFlags()

const OutletWrapper = ({ Component }) => (
  <>
    <Component />
    <Outlet />
  </>
)

export const App = () => {
  const { isMobile, isTablet } = useBreakpoints()
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
            path="/permissions/data/:permissionType"
            element={<OutletWrapper Component={DataPermissions} />}
          >
            <Route path="details/:slug" element={<PermissionDetails />} />
          </Route>
          <Route path="/support" element={<Support />} />
          {flag('settings.subscription') && (
            <Route path="/subscription" element={<Subscription />} />
          )}
          <Route
            path="*"
            element={
              <Navigate to={isSmallView ? '/menu' : '/profile'} replace />
            }
          />
        </Routes>
      </Main>
      <Sprite />
      {flag('debug') ? <CozyDevtools /> : null}
    </Layout>
  )
}

// This is to facilitate the extension of App in apps overrides
App.renderExtra = () => null

export default hot(module)(App)
