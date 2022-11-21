import React, { useMemo, forwardRef } from 'react'
import { NavLink } from 'react-router-dom'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

interface MenuItemNavLinkProps {
  beforeEnd?: React.ReactNode
  icon: () => JSX.Element
  primary: string
  secondary?: string
  to: string
}

export const MenuItemNavLink = (props: MenuItemNavLinkProps): JSX.Element => {
  const { isMobile, isTablet } = useBreakpoints()
  const { beforeEnd, icon, primary, secondary, to } = props

  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      forwardRef((itemProps, ref) => (
        <NavLink
          {...itemProps}
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          style={({ isActive }): React.CSSProperties => ({
            ...(isActive
              ? { backgroundColor: 'var(--defaultBackgroundColor)' }
              : {})
          })}
        />
      )),
    [to]
  )

  return (
    <ListItem button component={renderLink}>
      <ListItemIcon>
        <Icon icon={icon} />
      </ListItemIcon>

      <ListItemText primary={primary} secondary={secondary} />

      {beforeEnd}

      {(isMobile || isTablet) && <Icon icon={RightIcon} />}
    </ListItem>
  )
}
