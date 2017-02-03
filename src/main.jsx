import 'babel-polyfill'

import './styles/main'

import cozy from 'cozy-bar'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { I18n } from './plugins/preact-polyglot'

import settingsApp from './reducers'

import App from './components/App'
import Account from './containers/Account'

const context = window.context
const lang = document.documentElement.getAttribute('lang') || 'en'

const stackDomain = 'http://cozy.local:8080'

cozy.bar.init({
  appName: 'Settings'
})

const loggerMiddleware = createLogger()

const store = createStore(
  settingsApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

document.addEventListener('DOMContentLoaded', () => {
  render((
    <Provider store={store}>
      <I18n context={context} lang={lang}>
        <Router history={hashHistory}>
          <Route component={App}>
            <Redirect from='/' to='account' />
            <Route path='account' component={Account} />
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
