import React from 'react'
import CozyClient, { CozyProvider } from 'cozy-client'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { HashRouter } from 'react-router-dom'
import en from 'locales/en.json'

const defaultClient = new CozyClient()

const AppLike = ({ children, client }) => {
  return (
    <CozyProvider client={client || defaultClient}>
      <HashRouter>
        <BreakpointsProvider>
          <I18n lang="en" dictRequire={() => en}>
            {children}
          </I18n>
        </BreakpointsProvider>
      </HashRouter>
    </CozyProvider>
  )
}

export default AppLike
