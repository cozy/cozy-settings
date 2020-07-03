import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hot } from 'react-hot-loader'

import 'cozy-ui/transpiled/react/stylesheet.css'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'
import { translate } from 'cozy-ui/transpiled/react/I18n'
import { Layout, Main } from 'cozy-ui/transpiled/react/Layout'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Sidebar from 'components/Sidebar'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import Profile from 'containers/Profile'
import Devices from 'containers/Devices'
import Sessions from 'containers/Sessions'
import Storage from 'containers/Storage'
import Passphrase from 'containers/Passphrase'
import IntentRedirect from 'services/IntentRedirect'

export class App extends Component {
  render() {
    return (
      <Layout>
        {App.renderExtra()}
        <Alerter />
        <Sidebar />

        <Main>
          <Switch>
            <Route path="/redirect" component={IntentRedirect} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/profile/password" component={Passphrase} />
            <Route path="/connectedDevices" component={Devices} />
            <Route path="/sessions" component={Sessions} />
            <Route path="/storage" component={Storage} />
            <Route path="/exports/:exportId" component={Profile} />
            <Redirect exact from="/" to="/profile" />
            <Redirect from="*" to="/profile" />
          </Switch>
        </Main>
        <IconSprite />
      </Layout>
    )
  }
}

// This is to facilitate the extension of App in apps overrides
App.renderExtra = () => null

const mapStateToProps = state => ({
  alert: state.ui.alert
})

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default hot(module)(
  translate()(withRouter(connect(mapStateToProps)(App)))
)
