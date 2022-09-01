import React, { useCallback, useState } from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Switch from 'cozy-ui/transpiled/react/MuiCozyTheme/Switch'

type MenuItemSwitchProps = {
  icon: JSX.Element
  primary: string
  secondary?: string
}

export const MenuItemSwitch = ({
  icon,
  primary,
  secondary
}: MenuItemSwitchProps): JSX.Element => {
  const [checked, setChecked] = useState(false)
  const handleClick = useCallback(() => setChecked(!checked), [checked])

  return (
    <ListItem
      button
      onClick={handleClick}
      style={{ color: 'var(--primaryTextColor)' }}
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
