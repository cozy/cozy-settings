/* global cozy */

import 'cozy-ui/transpiled/react/stylesheet.css'
import 'cozy-ui/dist/cozy-ui.utils.min.css'
import 'styles/index.styl'

import React from 'react'
import { createRoot } from 'react-dom/client'
import {
  HashRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes
} from 'react-router-dom'
import { Provider, connect } from 'react-redux'
import { CaptureConsole } from '@sentry/integrations'
import * as Sentry from '@sentry/react'

import CozyClient, { CozyProvider } from 'cozy-client'
import flag from 'cozy-flags'
import { RealtimePlugin } from 'cozy-realtime'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { WebviewIntentProvider } from 'cozy-intent'

import App from 'components/App'
import manifest from '../../../manifest.webapp'

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

  Sentry.init({
    dsn: 'https://b97751b58d0d3e5e7e3d80a396b51cd9@errors.cozycloud.cc/72',
    environment: process.env.NODE_ENV,
    release: manifest.version,
    integrations: [
      new CaptureConsole({ levels: ['error'] }), // We also want to capture the `console.error` to, among other things, report the logs present in the `try/catch`
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes
        )
      })
    ],
    tracesSampleRate: 1,
    // React log these warnings(bad Proptypes), in a console.error, it is not relevant to report this type of information to Sentry
    ignoreErrors: [/^Warning: /]
  })

  root.render(
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={cozyClient}>
          <Provider store={store}>
            <EnhancedI18n dictRequire={lang => require(`locales/${lang}.json`)}>
              <BreakpointsProvider>
                <CozyTheme className="u-w-100">
                  <HashRouter>
                    <App />
                  </HashRouter>
                </CozyTheme>
              </BreakpointsProvider>
            </EnhancedI18n>
          </Provider>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
})
