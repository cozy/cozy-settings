import React, { ReactChild, ReactNode } from 'react'

import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'

interface MenuListProps {
  title: string
  children: ReactChild | ReactChild[] | ReactNode | ReactNode[]
}

export const MenuList = ({ title, children }: MenuListProps): JSX.Element => (
  <li>
    <List>
      <ListSubheader>{title}</ListSubheader>

      <li>
        <List className="u-pv-half">
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
    </List>
  </li>
)
