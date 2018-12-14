/* global __DEVELOPMENT__ */
/* global cozy */

import 'babel-polyfill'

import 'styles/index.styl'

import React from 'react'
import { render } from 'react-dom'
import { Provider, connect } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import I18n from 'cozy-ui/react/I18n'
import PiwikHashRouter from 'lib/PiwikHashRouter'

import settingsApp from 'reducers'

import App from 'components/App'

const loggerMiddleware = createLogger()

// Enable Redux dev tools
const composeEnhancers =
  (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const middlewares = [thunkMiddleware]

if (__DEVELOPMENT__) middlewares.push(loggerMiddleware)

const store = createStore(
  settingsApp,
  composeEnhancers(applyMiddleware(...middlewares))
)

const EnhancedI18n = connect(state => {
  const { lang } = state.ui
  try {
    cozy.bar.setLocale && cozy.bar.setLocale(lang)
  } catch (e) {
    console.warn(`The dict phrases for "${lang}" can't be loaded`)
  }
  return { lang }
})(I18n)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset

  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  })

  cozy.bar.init({
    appName: data.cozyAppName,
    appEditor: data.cozyAppEditor,
    iconPath: data.cozyIconPath,
    lang: data.cozyLocale
  })

  render(
    <Provider store={store}>
      <EnhancedI18n dictRequire={lang => require(`locales/${lang}`)}>
        <PiwikHashRouter>
          <App domain={data.cozyDomain} />
        </PiwikHashRouter>
      </EnhancedI18n>
    </Provider>,
    root
  )
})
