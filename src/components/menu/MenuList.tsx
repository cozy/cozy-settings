import React, { ReactChild, ReactNode } from 'react'

import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'

type MenuListProps = {
  title: string
  children: ReactChild | ReactChild[] | ReactNode | ReactNode[]
}

export const MenuList = ({ title, children }: MenuListProps): JSX.Element => (
  <li>
    <List className="u-pb-1">
      <ListSubheader className="u-mb-1">{title}</ListSubheader>

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
  </li>
)
