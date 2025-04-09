import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import OpenwithIcon from 'cozy-ui/transpiled/react/Icons/Openwith'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

interface MenuItemAnchorProps {
  href: string
  icon: () => JSX.Element
  primary: string
  secondary?: string
  target?: string
}

export const MenuItemAnchor = ({
  href,
  icon,
  primary,
  secondary,
  target
}: MenuItemAnchorProps): JSX.Element => (
  <ListItem button component="a" href={href} target={target ?? '_self'}>
    <ListItemIcon>
      <Icon icon={icon} />
    </ListItemIcon>

    <ListItemText ellipsis={false} primary={primary} secondary={secondary} />

    {target === '_blank' && <Icon icon={OpenwithIcon} />}
  </ListItem>
)
