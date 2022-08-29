import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Switch from 'cozy-ui/transpiled/react/switch'

type MenuItemSwitchProps = {
  icon: JSX.Element
  primary: string
  secondary?: string
}

export const MenuItemSwitch = ({
  icon,
  primary,
  secondary
}: MenuItemSwitchProps): JSX.Element => (
  <ListItem style={{ color: 'var(--primaryTextColor)' }}>
    <ListItemIcon>
      <Icon icon={icon} />
    </ListItemIcon>

    <ListItemText primary={primary} />

    {secondary && <ListItemText secondary={secondary} />}
    <Switch />
  </ListItem>
)
