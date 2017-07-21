/* global cozy, __DEVELOPMENT__ */

import 'babel-polyfill'

import './styles/services'

import React from 'react'
import { render } from 'react-dom'

import { I18n } from 'cozy-ui/react/I18n'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import IntentService from './containers/IntentService'
import settingsApp from './reducers'

const lang = document.documentElement.getAttribute('lang') || 'en'

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

// store
const store = createStore(
  settingsApp,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  ))
)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  })

  render((
    <Provider store={store}>
      <I18n lang={lang} dictRequire={(lang) => require(`./locales/${lang}`)}>
        <IntentService window={window} />
      </I18n>
    </Provider>
  ), document.querySelector('[role=application]'))
})
