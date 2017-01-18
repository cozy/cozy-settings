import styles from '../styles/app'

import React from 'react'
import { translate } from '../plugins/preact-polyglot'
import classNames from 'classnames'

import Sidebar from './Sidebar'
import Alerter from './Alerter'

const App = ({ t, children }) => (
  <div className={classNames(styles['set-wrapper'], styles['coz-sticky'])}>

    <Sidebar />

    <main className={styles['set-content']}>
      { children }
    </main>
    <Alerter />
  </div>
)

export default translate()(App)
