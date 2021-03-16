import React from 'react'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import Typography from 'cozy-ui/transpiled/react/Typography'
import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'

/* global cozy */
const { BarCenter } = cozy.bar

const barTitleStyle = { height: '3rem', display: 'flex', alignItems: 'center' }
const BarContainer = ({ children }) => {
  return <div style={barTitleStyle}>{children}</div>
}
const PageTitle = ({ children, ...rest }) => {
  const { isMobile } = useBreakpoints()
  return isMobile ? (
    <BarCenter>
      <CozyTheme variant="normal">
        <BarContainer>
          <Typography variant="h4">{children}</Typography>
        </BarContainer>
      </CozyTheme>
    </BarCenter>
  ) : (
    <Typography variant="h3" {...rest} gutterBottom>
      {children}
    </Typography>
  )
}

export default PageTitle
