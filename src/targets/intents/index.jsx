import 'cozy-ui/transpiled/react/stylesheet.css'
import 'styles/services/index'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { CozyProvider } from 'cozy-client'
import flag from 'cozy-flags'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import Sprite from 'cozy-ui/transpiled/react/Icon/Sprite'

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
  let container = document.querySelector('[role=application]')
  const { render } = createRoot(container)
  const data = container.dataset
  const protocol = window.location.protocol

  const store = createStore()
  cozyClient.login({
    uri: `${protocol}//${data.cozyDomain}`,
    token: data.cozyToken
  })
  cozyClient.registerPlugin(flag.plugin)

  render(
    <StylesProvider generateClassName={generateClassName}>
      <CozyProvider client={cozyClient}>
        <Provider store={store}>
          <I18n lang={lang} dictRequire={lang => require(`locales/${lang}`)}>
            <BreakpointsProvider>
              <MuiCozyTheme>
                <div className="set-services">
                  <IntentService window={window} />
                  <Sprite />
                </div>
              </MuiCozyTheme>
            </BreakpointsProvider>
          </I18n>
        </Provider>
      </CozyProvider>
    </StylesProvider>
  )
})
