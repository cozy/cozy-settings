import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Switch from 'cozy-ui/transpiled/react/MuiCozyTheme/Switch'

type MenuItemSwitchProps = {
  icon: JSX.Element
  primary: string
  secondary?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export const MenuItemSwitch = ({
  checked,
  icon,
  onClick,
  primary,
  secondary
}: MenuItemSwitchProps): JSX.Element => {
  return (
    <ListItem
      button
      style={{ color: 'var(--primaryTextColor)' }}
      onClick={onClick}
    >
      <ListItemIcon>
        <Icon icon={icon} />
      </ListItemIcon>

      <ListItemText
        primaryTypographyProps={{ ellipsis: false }}
        primary={primary}
      />

      {secondary && <ListItemText secondary={secondary} />}
      <Switch checked={checked} color="primary" />
    </ListItem>
  )
}
