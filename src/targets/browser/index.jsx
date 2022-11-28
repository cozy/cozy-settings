/* global cozy */

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'styles/index.styl'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import CozyClient, { CozyProvider } from 'cozy-client'
import flag from 'cozy-flags'
import { RealtimePlugin } from 'cozy-realtime'

import I18n from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import MuiCozyTheme from 'cozy-ui/transpiled/react/MuiCozyTheme'
import { WebviewIntentProvider } from 'cozy-intent'

import App from 'components/App'

import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import createStore from '../../store'

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
  const container = document.querySelector('[role=application]')
  const root = createRoot(container)
  const data = JSON.parse(container.dataset.cozy)
  const protocol = window.location.protocol
  const cozyClient = new CozyClient({
    uri: `${protocol}//${data.domain}`,
    token: data.token,
    store: false
  })

  const store = createStore(cozyClient)
  cozyClient.setStore(store)
  cozyClient.registerPlugin(flag.plugin)
  cozyClient.registerPlugin(RealtimePlugin)

  cozy.bar.init({
    cozyClient,
    appName: data.app.name,
    appEditor: data.app.editor,
    iconPath: data.app.icon,
    lang: data.locale
  })

  root.render(
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={cozyClient}>
          <Provider store={store}>
            <EnhancedI18n dictRequire={lang => require(`locales/${lang}.json`)}>
              <BreakpointsProvider>
                <MuiCozyTheme>
                  <HashRouter>
                    <App />
                  </HashRouter>
                </MuiCozyTheme>
              </BreakpointsProvider>
            </EnhancedI18n>
          </Provider>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
})
