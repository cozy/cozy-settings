import 'babel-polyfill'

import './styles/main'

import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import Polyglot from 'node-polyglot'

import en from './locales/en'
import { I18nProvider } from 'cozy-ui/react/helpers/i18n'

import settingsApp from './reducers'
import { fetchInfos } from './actions'

import App from './components/App'
import Account from './containers/Account'

const loggerMiddleware = createLogger()

const store = createStore(
  settingsApp,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

const polyglot = new Polyglot({
  phrases: en,
  locale: 'en'
})

const ConnectedI18nProvider = connect(state => {
  const { context, lang } = state.ui
  // Load global locales
  try {
    const dict = require(`./locales/${lang}`)
    polyglot.extend(dict)
    polyglot.locale(lang)
  } catch (e) {
    console.warn(`The dict phrases for "${lang}" can't be loaded`)
  }

  // Load context locales
  if (context) {
    try {
      const dict = require(`./contexts/${context}/locales/${lang}`)
      polyglot.extend(dict)
    } catch (e) {
      console.warn(`The context phrases for "${lang}" can't be loaded`)
    }
  }

  return {
    i18n: polyglot,
    locale: lang
  }
})(I18nProvider)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  cozy.bar.init({
    appName: data.cozyAppName,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale
  })

  render((
    <Provider store={store}>
      <ConnectedI18nProvider>
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
      </ConnectedI18nProvider>
    </Provider>
  ), root)
})
