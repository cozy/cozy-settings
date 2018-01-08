import styles from '../styles/app'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/I18n'
import classNames from 'classnames'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import { Alerter } from 'cozy-ui/react/Alerter'
import Profile from '../containers/Profile'
import Devices from '../containers/Devices'
import Sessions from '../containers/Sessions'

class App extends Component {
  render ({ children }) {
    return (
      <div className={classNames(styles['app-wrapper'], styles['o-layout--2panes'])}>
        <Alerter />
        <Sidebar />

        <main className={styles['app-content']}>
          <Switch>
            <Route path='/profile' component={Profile} />
            <Route path='/connectedDevices' component={Devices} />
            <Route path='/sessions' component={Sessions} />
            <Redirect exact from='/' to='/profile' />
            <Redirect from='*' to='/profile' />
          </Switch>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  alert: state.ui.alert
})

/*
withRouter is necessary here to deal with redux
https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
*/
export default translate()(withRouter(connect(
  mapStateToProps
)(App)))
