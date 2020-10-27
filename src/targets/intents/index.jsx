import 'cozy-ui/transpiled/react/stylesheet.css'
import 'styles/services/index'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'

import IntentService from 'containers/IntentService'
import cozyClient from 'lib/client'

import createStore from '../../store'

const lang = document.documentElement.getAttribute('lang') || 'en'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('[role=application]')
  const data = root.dataset
  const protocol = window.location.protocol

  const store = createStore()
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
