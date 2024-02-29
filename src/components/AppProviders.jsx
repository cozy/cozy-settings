import React from 'react'
import { HashRouter } from 'react-router-dom'
import { Provider, connect } from 'react-redux'

import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import { WebviewIntentProvider } from 'cozy-intent'
import { CozyProvider } from 'cozy-client'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'
import { BarProvider } from 'cozy-bar'

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
  return { lang }
})(I18n)

const AppProviders = ({ client, store, children }) => {
  return (
    <WebviewIntentProvider>
      <StylesProvider generateClassName={generateClassName}>
        <CozyProvider client={client}>
          <Provider store={store}>
            <EnhancedI18n dictRequire={lang => require(`locales/${lang}.json`)}>
              <BreakpointsProvider>
                <CozyTheme className="u-w-100">
                  <BarProvider>
                    <HashRouter>{children}</HashRouter>
                  </BarProvider>
                </CozyTheme>
              </BreakpointsProvider>
            </EnhancedI18n>
          </Provider>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}

export { AppProviders }
