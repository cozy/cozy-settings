/* global __DEVELOPMENT__ */
/* global cozy */

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'styles/index.styl'

import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { CozyProvider } from 'cozy-client'

import I18n from 'cozy-ui/transpiled/react/I18n'
import PiwikHashRouter from 'lib/PiwikHashRouter'

import appReducer from 'reducers'

import App from 'components/App'
import cozyClient from 'lib/client'

const loggerMiddleware = createLogger()

// Enable Redux dev tools
const composeEnhancers =
  (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const middlewares = [thunkMiddleware]

if (__DEVELOPMENT__) middlewares.push(loggerMiddleware)

const store = createStore(
  appReducer,
  composeEnhancers(applyMiddleware(...middlewares))
)

const EnhancedI18n = connect(state => {
  const { lang } = state.ui
  try {
    cozy.bar.setLocale && cozy.bar.setLocale(lang)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`The dict phrases for "${lang}" can't be loaded`)
  }
  return { lang }
})(I18n)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  const protocol = window.location.protocol
  cozyClient.login({
    uri: `${protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })

  cozyClient.setStore(store)

  cozy.bar.init({
    cozyClient,
    appName: data.cozyAppName,
    appEditor: data.cozyAppEditor,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale
  })

  render(
    <CozyProvider client={cozyClient}>
      <Provider store={store}>
        <EnhancedI18n dictRequire={lang => require(`locales/${lang}`)}>
          <PiwikHashRouter>
            <App />
          </PiwikHashRouter>
        </EnhancedI18n>
      </Provider>
    </CozyProvider>,
    root
  )
})
