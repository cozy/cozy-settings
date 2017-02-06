import 'babel-polyfill'

import './styles/main'

import cozy from 'cozy-bar'

import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import { I18n } from './plugins/preact-polyglot'

import settingsApp from './reducers'
import { fetchInfos } from './actions'

import App from './components/App'
import Account from './containers/Account'

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

const ConnectedI18n = connect(state => ({
  context: state.ui.context,
  lang: state.ui.lang
}))(I18n)

document.addEventListener('DOMContentLoaded', () => {
  render((
    <Provider store={store}>
      <ConnectedI18n>
        <Router history={hashHistory}>
          <Route component={App}>
            <Redirect from='/' to='account' />
            <Route
              path='account'
              component={Account}
              onEnter={() => store.dispatch(fetchInfos())}
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
      </ConnectedI18n>
    </Provider>
  ), document.querySelector('[role=application]'))
})
