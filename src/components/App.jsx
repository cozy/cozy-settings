import styles from '../styles/app'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from 'cozy-ui/react/helpers/i18n'
import classNames from 'classnames'

import Sidebar from './Sidebar'
import { Alerter } from 'cozy-ui/react/Alerter'

class App extends Component {
  render ({ children }) {
    return (
      <div className={classNames(styles['set-wrapper'], styles['coz-sticky'])}>
        <Alerter />
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

export default translate()(connect(
  mapStateToProps
)(App))
