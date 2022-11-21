import React, { ReactChild, ReactNode } from 'react'

import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'

interface MenuListProps {
  children: ReactChild | ReactChild[] | ReactNode | ReactNode[]
  title: string
}

export const MenuList = ({ title, children }: MenuListProps): JSX.Element => (
  <List subheader={<ListSubheader>{title}</ListSubheader>}>
    {Array.isArray(children)
      ? children
          .filter(value => value)
          .map((child, index, array) => (
            <React.Fragment key={index}>
              {child}

              {index !== array.length - 1 && (
                <Divider component="li" variant="inset" />
              )}
            </React.Fragment>
          ))
      : children}
  </List>
)
