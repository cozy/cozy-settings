import React from 'react'
import { Provider, connect } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { BarProvider } from 'cozy-bar'
import { CozyProvider } from 'cozy-client'
import { DataProxyProvider } from 'cozy-dataproxy-lib'
import { WebviewIntentProvider } from 'cozy-intent'
import AlertProvider from 'cozy-ui/transpiled/react/providers/Alert'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/providers/Breakpoints'
import CozyTheme from 'cozy-ui/transpiled/react/providers/CozyTheme'
import I18n from 'cozy-ui/transpiled/react/providers/I18n'
import {
  StylesProvider,
  createGenerateClassName
} from 'cozy-ui/transpiled/react/styles'

import { PremiumProvider } from '@/components/Premium/PremiumProvider'
import { AvatarProvider } from '@/components/Profile/AvatarSection/AvatarContext'
import { FILES_DOCTYPE, CONTACTS_DOCTYPE, APPS_DOCTYPE } from '@/doctypes'

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
            <EnhancedI18n
              dictRequire={lang => require(`@/locales/${lang}.json`)}
            >
              <BreakpointsProvider>
                <AlertProvider>
                  <CozyTheme className="u-w-100">
                    <DataProxyProvider
                      options={{
                        doctypes: [
                          FILES_DOCTYPE,
                          CONTACTS_DOCTYPE,
                          APPS_DOCTYPE
                        ]
                      }}
                    >
                      <BarProvider>
                        <PremiumProvider>
                          <AvatarProvider>
                            <HashRouter>{children}</HashRouter>
                          </AvatarProvider>
                        </PremiumProvider>
                      </BarProvider>
                    </DataProxyProvider>
                  </CozyTheme>
                </AlertProvider>
              </BreakpointsProvider>
            </EnhancedI18n>
          </Provider>
        </CozyProvider>
      </StylesProvider>
    </WebviewIntentProvider>
  )
}

export { AppProviders }
