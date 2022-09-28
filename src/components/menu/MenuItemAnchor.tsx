import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import OpenwithIcon from 'cozy-ui/transpiled/react/Icons/Openwith'

interface MenuItemAnchorProps {
  icon: JSX.Element
  primary: string
  href: string
  secondary?: string
  target?: string
}

export const MenuItemAnchor = ({
  icon,
  href,
  target,
  primary,
  secondary
}: MenuItemAnchorProps): JSX.Element => (
  <li>
    <ListItem
      button
      component="a"
      href={href}
      style={{ color: 'var(--primaryTextColor)' }}
      target={target ?? '_self'}
    >
      <ListItemIcon>
        <Icon icon={icon} color="var(--primaryTextColor)" />
      </ListItemIcon>

      <ListItemText primary={primary} />

      {secondary && <ListItemText secondary={secondary} />}

      {target === '_blank' && (
        <ListItemIcon className="u-ml-half u-mr-0 u-w-auto">
          <Icon icon={OpenwithIcon} />
        </ListItemIcon>
      )}
    </ListItem>
  </li>
)
