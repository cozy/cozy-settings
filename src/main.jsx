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
import Polyglot from 'node-polyglot'
import format from 'date-fns/format'

import en from './locales/en'
import { I18nProvider } from 'cozy-ui/react/helpers/i18n'

import settingsApp from './reducers'
import { fetchInfos } from './actions'

import App from './components/App'
import Account from './containers/Account'
import Devices from './containers/Devices'

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

  //init date format
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
              component={Devices}
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
  ), document.querySelector('[role=application]'))
})
