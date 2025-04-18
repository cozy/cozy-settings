import { makeStyles } from '@material-ui/core/styles'
import MuiTreeItem from '@material-ui/lab/TreeItem'
import MuiTreeView from '@material-ui/lab/TreeView'
import mergeClasses from '@material-ui/styles/mergeClasses'
import React from 'react'

import Collapse from 'cozy-ui/transpiled/react/Collapse'
import BottomIcon from 'cozy-ui/transpiled/react/Icons/Bottom'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'

const useItemClasses = divider =>
  makeStyles(theme => ({
    iconContainer: {
      minWidth: 'auto',
      marginRight: '1rem',
      padding: 0,
      justifyContent: 'center'
    },
    root: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: '1rem',
      minHeight: '3rem'
    },
    label: {
      borderBottom: divider && '.063rem solid var(--dividerColor)',
      '&:hover': {
        backgroundColor: theme.palette.defaultBackgroundColor
      },
      '&:focus': {
        backgroundColor: theme.palette.defaultBackgroundColor
      }
    }
  }))()

export const TreeItem = ({
  nodeId,
  divider = false,
  label,
  classes,
  ...other
}) => {
  return (
    <MuiTreeItem
      nodeId={nodeId}
      label={label}
      classes={mergeClasses({
        baseClasses: useItemClasses(divider),
        newClasses: classes,
        Component: TreeItem
      })}
      TransitionComponent={Collapse}
      {...other}
    />
  )
}

const useViewClasses = makeStyles(() => ({
  root: {
    paddingTop: 0,
    paddingBottom: 0,
    minWidth: 'fit-content'
  }
}))

export const TreeView = ({ classes, children, ...other }) => {
  return (
    <MuiTreeView
      defaultCollapseIcon={<BottomIcon width="1rem" height="1rem" />}
      defaultExpandIcon={<RightIcon width="1rem" height="1rem" />}
      disableSelection={true}
      classes={mergeClasses({
        baseClasses: useViewClasses(),
        newClasses: classes,
        component: TreeView
      })}
      {...other}
    >
      {children}
    </MuiTreeView>
  )
}
