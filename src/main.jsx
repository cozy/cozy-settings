import 'babel-polyfill'

import './styles/main'

import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { I18n } from './plugins/preact-polyglot'

import App from './components/App'

const context = window.context
const lang = document.documentElement.getAttribute('lang') || 'en'

document.addEventListener('DOMContentLoaded', () => {
  render((
    <I18n context={context} lang={lang}>
      <Router history={hashHistory}>
        <Route component={(props) =>
          <App {...props} />}
        >
          <Redirect from='/' to='account' />
          <Route
            path='account'
            component={(props) =>
              <p>Account</p>
            }
          />
          <Route
            path='connectedDevices'
            component={(props) =>
              <p>Connected devices</p>
            }
          />
          <Route
            path='storage'
            component={(props) =>
              <p>Storage</p>
            }
          />
          <Route
            path='emailNotifications'
            component={(props) =>
              <p>Email Notifications</p>
            }
          />
        </Route>
      </Router>
    </I18n>
  ), document.querySelector('[role=application]'))
})
