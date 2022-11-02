import React from 'react'
import withAllLocales from '../../../lib/withAllLocales'
import { getPermissionsVerbsByType } from '../helpers/permissionsHelper'
import { useParams } from 'react-router-dom'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import { completePermission } from '../helpers/permissionsHelper'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Page from 'components/Page'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import NavigationList, {
  NavigationListSection
} from 'cozy-ui/transpiled/react/NavigationList'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import PageTitle from 'components/PageTitle'
import {
  displayPermissions,
  getPermissionIconName
} from '../helpers/permissionsHelper'
import ListItemIcon, {
  smallSize,
  mediumSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

const DataPermissions = ({ t }) => {
  const { permission } = useParams()

  const THIRTY_SECONDS = 30 * 1000
  const queryResultApps = useQuery(Q(APPS_DOCTYPE), {
    as: APPS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
  })
  const queryResultKonnectors = useQuery(Q(KONNECTORS_DOCTYPE), {
    as: KONNECTORS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
  })

  const appsAndKonnectorsSlugs = completePermission(
    queryResultApps,
    queryResultKonnectors
  )[permission]

  const appsAndKonnectors = []

  if (appsAndKonnectorsSlugs?.length > 0) {
    for (let i = 0; i < appsAndKonnectorsSlugs.length; i++) {
      const appToAdd = queryResultApps.data.find(
        app => app.slug === appsAndKonnectorsSlugs[i]
      )
      if (appToAdd) {
        appsAndKonnectors.push(appToAdd)
      }

      const konnectorToAdd = queryResultKonnectors.data.find(
        konnector => konnector.slug === appsAndKonnectorsSlugs[i]
      )
      if (konnectorToAdd) {
        appsAndKonnectors.push(konnectorToAdd)
      }
    }
  }

  const isNotLastItem = slug => {
    return slug !== appsAndKonnectorsSlugs[appsAndKonnectorsSlugs.length - 1]
  }

  const iconName = getPermissionIconName(permission)

  return (
    <Page narrow>
      {(isQueryLoading(queryResultApps) &&
        !hasQueryBeenLoaded(queryResultApps)) ||
      (isQueryLoading(queryResultKonnectors) &&
        !hasQueryBeenLoaded(queryResultKonnectors)) ? (
        <Spinner size="large" className="u-flex u-flex-justify-center u-mt-1" />
      ) : queryResultApps.fetchStatus === 'failed' &&
        queryResultKonnectors.fetchStatus === 'failed' ? (
        <Typography variant="body1" className="u-mb-1-half">
          {t('Permissions.failedRequest')}
        </Typography>
      ) : (
        <>
          <IconButton className="u-mr-half" href="#/permissions/data">
            <Icon icon={PreviousIcon} size={16} />
          </IconButton>
          <div style={{ textAlign: 'center' }}>
            <Icon
              icon={
                require(`cozy-ui/transpiled/react/Icons/${iconName}`).default
              }
              size={mediumSize}
            />
            <PageTitle>
              {t('CozyPermissions.' + permission).toUpperCase()}
            </PageTitle>
            <Typography variant="body1" className="u-mb-1-half">
              {t('Permissions.access') +
                ' ' +
                t('CozyPermissions.' + permission).toLowerCase()}
            </Typography>
          </div>
          <NavigationList>
            <NavigationListSection>
              {appsAndKonnectors.map(appOrKonnector => {
                return (
                  <div key={appOrKonnector.name}>
                    <ListItem button>
                      <ListItemIcon>
                        <AppIcon app={appOrKonnector} />
                      </ListItemIcon>
                      <ListItemText
                        primary={appOrKonnector.name}
                        secondary={t(
                          displayPermissions(
                            getPermissionsVerbsByType(
                              appOrKonnector.permissions,
                              permission
                            )
                          )
                        )}
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
                    {isNotLastItem(appOrKonnector.slug) && (
                      <Divider variant="inset" />
                    )}
                  </div>
                )
              })}
            </NavigationListSection>
          </NavigationList>
        </>
      )}
    </Page>
  )
}

export default withAllLocales(DataPermissions)
