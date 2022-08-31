import React from 'react'
import { useMatch, useNavigate } from 'react-router-dom'

import CozyTheme from 'cozy-ui/transpiled/react/CozyTheme'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

/* global cozy */
const { BarCenter, BarLeft } = cozy.bar

const barTitleStyle = { height: '3rem', display: 'flex', alignItems: 'center' }
const BarContainer = ({ children }) => {
  return <div style={barTitleStyle}>{children}</div>
}
const PageTitle = ({ children, ...rest }) => {
  const { isMobile } = useBreakpoints()
  const navigate = useNavigate()
  const isRoot = useMatch('/menu')
  const navigateBack = () => navigate('..')

  return isMobile ? (
    <>
      {!isRoot && (
        <BarLeft>
          <IconButton onClick={navigateBack} size="large" title="Previous">
            <Icon color="secondary" icon={PreviousIcon} />
          </IconButton>
        </BarLeft>
      )}

      <BarCenter>
        <CozyTheme variant="normal">
          <BarContainer>
            <Typography variant="h4">{children}</Typography>
          </BarContainer>
        </CozyTheme>
      </BarCenter>
    </>
  ) : (
    <Typography variant="h3" {...rest} gutterBottom>
      {children}
    </Typography>
  )
}

export default PageTitle
