import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

type MenuItemButtonProps = {
  icon: JSX.Element
  primary: string
  secondary?: string
  onClick: () => void
}

export const MenuItemButton = ({
  icon,
  primary,
  secondary,
  onClick
}: MenuItemButtonProps): JSX.Element => (
  <ListItem
    button
    component="li"
    onClick={onClick}
    style={{ color: 'var(--primaryTextColor)' }}
  >
    <ListItemIcon>
      <Icon icon={icon} />
    </ListItemIcon>

    <ListItemText primary={primary} />

    {secondary && <ListItemText secondary={secondary} />}
  </ListItem>
)
