import React from 'react'
import { NavigationListSection } from 'cozy-ui/transpiled/react/NavigationList'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import ListItemIcon, {
  smallSize,
  mediumSize,
  largeSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import CozyLockIcon from 'cozy-ui/transpiled/react/Icons/CozyLock'
import CozyReleaseIcon from 'cozy-ui/transpiled/react/Icons/CozyRelease'
import {
  displayPermissions,
  getPermissionIconName
} from './helpers/permissionsHelper'
import { routes } from 'constants/routes'
import withAllLocales from '../../lib/withAllLocales'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

const AccessRightsSection = ({
  sortedPermissionsByName,
  slugName,
  t,
  isRemoteDoctypes
}) => {
  const { isMobile, isTablet } = useBreakpoints()
  if (!sortedPermissionsByName || sortedPermissionsByName.length < 1) {
    return
  }
  return (
    <div
      style={
        isMobile || isTablet
          ? { borderTop: '16px solid var(--dividerColor)' }
          : {}
      }
    >
      <NavigationListSection>
        <ListItem>
          <ListItemIcon>
            <Icon
              icon={isRemoteDoctypes ? CozyReleaseIcon : CozyLockIcon}
              size={largeSize}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography type="body2" style={{ fontWeight: 'bold' }}>
                {isRemoteDoctypes
                  ? t('Permissions.exit_rights')
                  : t('Permissions.limited_right_access')}
              </Typography>
            }
            secondary={
              isRemoteDoctypes
                ? t('Permissions.exit_rights_secondary')
                : t('Permissions.limited_right_access_secondary')
            }
          />
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
    </div>
  )
}

export default withAllLocales(AccessRightsSection)
