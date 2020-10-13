/* global __DEVELOPMENT__ */

import 'styles/services/index'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { compose, createStore, applyMiddleware } from 'redux'

import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'

import IntentService from 'containers/IntentService'
import settingsApp from 'reducers'
import cozyClient from 'lib/client'

const lang = document.documentElement.getAttribute('lang') || 'en'

const loggerMiddleware = createLogger()

// Enable Redux dev tools
const composeEnhancers =
  (__DEVELOPMENT__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const middlewares = [thunkMiddleware]

if (__DEVELOPMENT__) middlewares.push(loggerMiddleware)

// store
const store = createStore(
  settingsApp,
  composeEnhancers(applyMiddleware(...middlewares))
)

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const protocol = window.location.protocol
  cozyClient.login({
    uri: `${protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })

  render(
    <CozyProvider client={cozyClient}>
      <Provider store={store}>
        <I18n lang={lang} dictRequire={lang => require(`locales/${lang}`)}>
          <div className="set-services">
            <IntentService window={window} />
            <IconSprite />
          </div>
        </I18n>
      </Provider>
    </CozyProvider>,
    document.querySelector('[role=application]')
  )
})
