import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import FlagSwitcher from 'cozy-flags/dist/FlagSwitcher'
import { initFlags } from 'lib/flags'
import { RealTimeQueries } from 'cozy-client'

import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Layout, Main } from 'cozy-ui/transpiled/react/Layout'
import { Route, Navigate, Routes } from 'react-router-dom'

import Sidebar from 'components/Sidebar'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Profile from 'containers/Profile'
import Devices from 'containers/Devices'
import Sessions from 'containers/Sessions'
import Storage from 'containers/Storage'
import Passphrase from 'containers/Passphrase'
import PermissionsTab from 'components/Permissions/PermissionsTab'
import IntentRedirect from 'services/IntentRedirect'
import PermissionsApplication from 'containers/PermissionsApplication'
import Permission from 'containers/Permission'

initFlags()

export class App extends Component {
  render() {
    return (
      <Layout>
        {App.renderExtra()}
        <FlagSwitcher />
        <Alerter />
        <Sidebar />
        <RealTimeQueries doctype="io.cozy.oauth.clients" />

        <Main>
          <Routes>
            <Route path="/redirect" element={<IntentRedirect />} />
            <Route path="/profile/*" element={<Profile />} />
            <Route path="/profile/password" element={<Passphrase />} />
            <Route path="/connectedDevices/*" element={<Devices />} />
            <Route path="/connectedDevices/:deviceId" element={<Devices />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/storage" element={<Storage />} />
            <Route path="/permissions/:page" element={<PermissionsTab />} />
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
            <Route path="*" element={<Navigate to="/profile" replace />} />
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

export default hot(module)(translate()(connect(mapStateToProps)(App)))
