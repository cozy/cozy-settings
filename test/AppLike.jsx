import React from 'react'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { HashRouter } from 'react-router-dom'

import en from 'locales/en.json'

const AppLike = ({ children }) => {
  return (
    <HashRouter>
      <BreakpointsProvider>
        <I18n lang="en" dictRequire={() => en}>
          {children}
        </I18n>
      </BreakpointsProvider>
    </HashRouter>
  )
}

export default AppLike
