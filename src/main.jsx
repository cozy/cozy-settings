import 'babel-polyfill'

import './styles/main'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { I18n } from './plugins/preact-polyglot'

import SettingsStore from './store/SettingsStore'
import Provider from './store/Provider'

import App from './components/App'
import AccountManagement from './containers/AccountManagement'

const context = window.context
const lang = document.documentElement.getAttribute('lang') || 'en'

// store
const store = new SettingsStore()

document.addEventListener('DOMContentLoaded', () => {
  render((
    <Provider store={store}>
      <I18n context={context} lang={lang}>
        <Router history={hashHistory}>
          <Route component={(props) =>
            <App {...props} />}
          >
            <Redirect from='/' to='account' />
            <Route
              path='account'
              component={(props) =>
                <AccountManagement {...props} />
              }
            />
            <Route
              path='connectedDevices'
              component={(props) =>
                <h2>Connected devices</h2>
              }
            />
            <Route
              path='storage'
              component={(props) =>
                <h2>Storage</h2>
              }
            />
            <Route
              path='emailNotifications'
              component={(props) =>
                <h2>Email Notifications</h2>
              }
            />
          </Route>
        </Router>
      </I18n>
    </Provider>
  ), document.querySelector('[role=application]'))
})
