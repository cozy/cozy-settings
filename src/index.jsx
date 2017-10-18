/* global __DEVELOPMENT__ */
/* global cozy */

import 'babel-polyfill'

import './styles/main'

import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { Router, Route, Redirect, hashHistory } from 'react-router'
import Polyglot from 'node-polyglot'
import format from 'date-fns/format'

import en from './locales/en'
import { I18nProvider } from 'cozy-ui/react/helpers/i18n'
import { shouldEnableTracking, getTracker } from 'cozy-ui/react/helpers/tracker'

import settingsApp from './reducers'
import { fetchDevices, fetchInfos, fetchSessions } from './actions'

import App from './components/App'
import Sessions from './containers/Sessions'
import Profile from './containers/Profile'
import Devices from './containers/Devices'
import Installer from './containers/Installer'

const loggerMiddleware = createLogger()

if (__DEVELOPMENT__) {
  // Enables React dev tools for Preact
  // Cannot use import as we are in a condition
  require('preact/devtools')

  // Export React to window for the devtools
  window.React = React
}

// Enable Redux dev tools
const composeEnhancers = (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(
  settingsApp,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ))
)
const polyglot = new Polyglot({
  phrases: en,
  locale: 'en'
})

const ConnectedI18nProvider = connect(state => {
  const { context, lang } = state.ui
  const { locale } = state.fields
  const hasLocaleChange = lang === locale.value && lang !== polyglot.currentLocale
  // Load global locales
  if (hasLocaleChange) {
    try {
      const dict = require(`./locales/${lang}`)
      polyglot.extend(dict)
      polyglot.locale(lang)
      cozy.bar.setLocale && cozy.bar.setLocale(lang)
    } catch (e) {
      console.warn(`The dict phrases for "${lang}" can't be loaded`)
    }
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

  // init date format
  const locales = {
    en: require('date-fns/locale/en')
  }
  if (lang && lang !== 'en') {
    try {
      locales[lang] = require(`date-fns/locale/${lang}`)
    } catch (e) {
      console.warn(`The "${lang}" locale isn't supported by date-fns`)
    }
  }

  let i18nDate = (date, formatStr) => format(date, formatStr, { locale: locales[lang] })

  return {
    i18n: polyglot,
    i18nDate: i18nDate,
    locale: lang
  }
})(I18nProvider)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  cozy.bar.init({
    appName: data.cozyAppName,
    appEditor: data.cozyAppEditor,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale
  })

  let history = hashHistory
  if (shouldEnableTracking() && getTracker()) {
    let trackerInstance = getTracker()
    history = trackerInstance.connectToHistory(hashHistory)
    trackerInstance.track(hashHistory.getCurrentLocation()) // when using a hash history, the initial visit is not tracked by piwik react router
  }

  render((
    <Provider store={store}>
      <ConnectedI18nProvider>
        <Router history={history}>
          <Route component={App}>
            <Redirect from='/' to='profile' />
            <Route
              path='profile'
              component={Profile}
              onEnter={() => store.dispatch(fetchInfos())}
            />
            <Route
              path='connectedDevices'
              component={Devices}
              onEnter={() => store.dispatch(fetchDevices())}
            />
            <Route
              path='sessions'
              component={Sessions}
              onEnter={() => store.dispatch(fetchSessions())}
            />
            <Route
              path='install'
              component={Installer}
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
