import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Switch from 'cozy-ui/transpiled/react/MuiCozyTheme/Switch'

interface MenuItemSwitchProps {
  checked?: boolean
  disabled?: boolean
  icon: () => JSX.Element | JSX.Element
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  primary: string
  secondary?: string
}

export const MenuItemSwitch = ({
  checked,
  disabled,
  icon,
  onClick,
  primary,
  secondary
}: MenuItemSwitchProps): JSX.Element => (
  <ListItem button onClick={onClick} disabled={disabled}>
    <ListItemIcon>
      <Icon icon={icon} />
    </ListItemIcon>

    <ListItemText primary={primary} secondary={secondary} />

    <Switch checked={checked} color="primary" />
  </ListItem>
)
