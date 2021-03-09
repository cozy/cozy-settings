import 'cozy-ui/transpiled/react/stylesheet.css'
import 'styles/services/index'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { Sprite as IconSprite } from 'cozy-ui/transpiled/react/Icon'

import IntentService from 'containers/IntentService'
import cozyClient from 'lib/client'

import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import createStore from '../../store'

const lang = document.documentElement.getAttribute('lang') || 'en'

/*
With MUI V4, it is possible to generate deterministic class names.
In the case of multiple react roots, it is necessary to disable this
feature. Since we have the cozy-bar root, we need to disable the
feature.
https://material-ui.com/styles/api/#stylesprovider
*/
const generateClassName = createGenerateClassName({
  disableGlobal: true
})

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
    <StylesProvider generateClassName={generateClassName}>
      <CozyProvider client={cozyClient}>
        <Provider store={store}>
          <I18n lang={lang} dictRequire={lang => require(`locales/${lang}`)}>
            <BreakpointsProvider>
              <MuiCozyTheme>
                <div className="set-services">
                  <IntentService window={window} />
                  <IconSprite />
                </div>
              </MuiCozyTheme>
            </BreakpointsProvider>
          </I18n>
        </Provider>
      </CozyProvider>
    </StylesProvider>,
    document.querySelector('[role=application]')
  )
})
