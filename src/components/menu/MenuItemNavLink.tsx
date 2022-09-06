import React from 'react'
import { NavLink } from 'react-router-dom'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'

export const MenuItemNavLink = (props: {
  icon: JSX.Element
  primary: string
  to: string
  secondary?: string
}): JSX.Element => {
  const { icon, primary, secondary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef(function Link(itemProps, ref) {
        return (
          <NavLink
            {...itemProps}
            ref={ref as React.Ref<HTMLAnchorElement>}
            to={to}
            style={({ isActive }): React.CSSProperties => ({
              ...(isActive
                ? { backgroundColor: 'var(--defaultBackgroundColor)' }
                : {}),
              color: 'var(--primaryTextColor)'
            })}
          />
        )
      }),
    [to]
  )

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? (
          <ListItemIcon>
            <Icon icon={icon} />
          </ListItemIcon>
        ) : null}

        <ListItemText primary={primary} />

        {secondary && <ListItemText secondary={secondary} align="right" />}

        <ListItemIcon>
          <Icon
            className="u-ml-1"
            icon={RightIcon}
            color="var(--secondaryTextColor)"
          />
        </ListItemIcon>
      </ListItem>
    </li>
  )
}
