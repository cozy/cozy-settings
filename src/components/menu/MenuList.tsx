import React, { ReactChild, ReactNode, isValidElement } from 'react'

import Divider from 'cozy-ui/transpiled/react/Divider'
import List from 'cozy-ui/transpiled/react/List'
import ListSubheader from 'cozy-ui/transpiled/react/ListSubheader'

interface MenuListProps {
  children: ReactChild | ReactChild[] | ReactNode | ReactNode[]
  title: string
}

export const MenuList = ({ title, children }: MenuListProps): JSX.Element => (
  <List subheader={<ListSubheader>{title}</ListSubheader>}>
    {Array.isArray(children)
      ? children
          .filter(
            child => isValidElement(child) && child.type(child.props) !== null
          )
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
