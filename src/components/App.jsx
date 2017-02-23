import styles from '../styles/app'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/helpers/i18n'
import classNames from 'classnames'

import { alertClosed } from '../actions'

import Sidebar from './Sidebar'
import Alerter from 'cozy-ui/react/Alerter'

class App extends Component {
  render ({ t, alert, children }) {
    return (
      <div className={classNames(styles['set-wrapper'], styles['coz-sticky'])}>
        { alert && <Alerter
          type={alert.type}
          message={t(alert.message, alert.messageData)}
          onClose={this.props.onAlertAutoClose}
          />
        }
        <Sidebar />

        <main className={styles['set-content']}>
          { children }
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  alert: state.ui.alert
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onAlertAutoClose: () => {
    dispatch(alertClosed())
  }
})

export default translate()(connect(
  mapStateToProps,
  mapDispatchToProps
)(App))
