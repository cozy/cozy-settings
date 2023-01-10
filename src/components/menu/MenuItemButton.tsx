import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

interface MenuItemButtonProps {
  icon: () => JSX.Element
  onClick: () => void
  primary: string
  secondary?: string
}

export const MenuItemButton = ({
  icon,
  primary,
  secondary,
  onClick
}: MenuItemButtonProps): JSX.Element => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>
      <Icon icon={icon} />
    </ListItemIcon>

    <ListItemText ellipsis={false} primary={primary} secondary={secondary} />
  </ListItem>
)
