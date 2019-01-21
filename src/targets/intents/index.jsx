/* global cozy, __DEVELOPMENT__ */

import 'styles/services/index'

import React from 'react'
import { render } from 'react-dom'

import { I18n } from 'cozy-ui/react/I18n'
import { Sprite as IconSprite } from 'cozy-ui/react/Icon'
import { Provider } from 'react-redux'
import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import IntentService from 'containers/IntentService'
import settingsApp from 'reducers'

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

  cozy.client.init({
    cozyURL: '//' + data.cozyDomain,
    token: data.cozyToken
  })

  render(
    <Provider store={store}>
      <I18n lang={lang} dictRequire={lang => require(`locales/${lang}`)}>
        <div className="set-services">
          <IntentService window={window} />
          <IconSprite />
        </div>
      </I18n>
    </Provider>,
    document.querySelector('[role=application]')
  )
})
