import React from 'react'
import { NavigationListSection } from 'cozy-ui/transpiled/react/NavigationList'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import ListItemIcon, {
  smallSize,
  mediumSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import {
  displayPermissions,
  getPermissionIconName
} from './helpers/permissionsHelper'
import { routes } from 'constants/routes'
import withAllLocales from '../../lib/withAllLocales'

const AccessRightsSection = ({
  sortedPermissionsByName,
  slugName,
  t,
  isRemoteDoctypes
}) => {
  if (!sortedPermissionsByName || sortedPermissionsByName.length < 1) {
    return
  }
  return (
    <NavigationListSection>
      <ListItem>
        <Typography variant="h5">
          {!isRemoteDoctypes
            ? t('Permissions.limited_right_access')
            : t('Permissions.exit_rights')}
        </Typography>
      </ListItem>
      <Divider />
      {sortedPermissionsByName.map(({ name, title, verbs, type }, index) => {
        const iconName = getPermissionIconName(type)
        return (
          <div key={name}>
            <ListItem
              button
              component="a"
              href={`/#${routes.appList}/${slugName}/${name}`}
            >
              <ListItemIcon>
                <Icon
                  icon={
                    require(`cozy-ui/transpiled/react/Icons/${iconName}`)
                      .default
                  }
                  size={mediumSize}
                />
              </ListItemIcon>
              <ListItemText
                primary={title}
                secondary={t(displayPermissions(verbs))}
              />
              <ListItemSecondaryAction>
                <Icon
                  icon={RightIcon}
                  size={smallSize}
                  className="u-mr-1"
                  style={{ color: 'var(--secondaryTextColor)' }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            {index !== sortedPermissionsByName.length - 1 && (
              <Divider variant="inset" />
            )}
          </div>
        )
      })}
    </NavigationListSection>
  )
}

export default withAllLocales(AccessRightsSection)
