import React from 'react'
import { HashRouter } from 'react-router-dom'

import CozyClient, { CozyProvider } from 'cozy-client'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { WebviewIntentProvider } from 'cozy-intent'

import en from 'locales/en.json'

const defaultClient = new CozyClient()

const AppLike = ({ children, client }) => {
  return (
    <WebviewIntentProvider>
      <CozyProvider client={client || defaultClient}>
        <HashRouter>
          <BreakpointsProvider>
            <I18n lang="en" dictRequire={() => en}>
              {children}
            </I18n>
          </BreakpointsProvider>
        </HashRouter>
      </CozyProvider>
    </WebviewIntentProvider>
  )
}

export default AppLike
