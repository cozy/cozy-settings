import React, { ReactChild, ReactNode } from 'react'

import ListSubheader from 'cozy-ui/transpiled/react/MuiCozyTheme/ListSubheader'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

type MenuListProps = {
  title: string
  children: ReactChild | ReactChild[] | ReactNode | ReactNode[]
}

export const MenuList = ({ title, children }: MenuListProps): JSX.Element => (
  <>
    <ListSubheader>{title}</ListSubheader>

    {Array.isArray(children)
      ? children.map((child, index, array) => (
          <React.Fragment key={index}>
            {child}
            {!(index === array.length - 1) && (
              <Divider component="li" variant="inset" />
            )}
          </React.Fragment>
        ))
      : children}
  </>
)
