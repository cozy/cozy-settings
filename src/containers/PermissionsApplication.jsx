import React from 'react'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { withRouter, Link } from 'react-router-dom'
import {
  displayPermissions,
  getPermissionIconName
} from './helpers/permissionsHelper'
import Icon from 'cozy-ui/transpiled/react/Icon'
import NavigationList, {
  NavigationListSection
} from 'cozy-ui/transpiled/react/NavigationList'
import ListItemIcon, {
  mediumSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import withAllLocales from '../lib/withAllLocales'

export const completePermission = (
  name,
  permission,
  { description, verbs },
  type
) => {
  const completedPermission = {
    name,
    type,
    title: permission
  }
  if (description) {
    completedPermission.description = description
  }
  if (verbs) {
    completedPermission.verbs = verbs
  }
  return completedPermission
}

const PermissionsApplication = ({ match, t }) => {
  const appName = match.params.app
  const THIRTY_SECONDS = 30 * 1000

  const queryResultApps = useQuery(
    Q(APPS_DOCTYPE).getById('io.cozy.apps/' + appName),
    {
      as: 'io.cozy.apps/' + appName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
    }
  )

  const queryResultKonnectors = useQuery(
    Q(KONNECTORS_DOCTYPE).getById('io.cozy.konnectors/' + appName),
    {
      as: 'io.cozy.konnectors/' + appName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
    }
  )

  let matchingQueryResult = []
  if (queryResultApps?.data?.length > 0) {
    matchingQueryResult = queryResultApps
  }
  if (queryResultKonnectors?.data?.length > 0) {
    matchingQueryResult = queryResultKonnectors
  }
  const sortPermissionsByName = queryResult => {
    return Object.entries(queryResult.data[0].attributes.permissions)
      .map(([name, value]) => {
        const type = value.type
        const perm = t('CozyClient.Permissions.' + type)
        return completePermission(name, perm, value, type)
      })
      .sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
  }

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
        <div>
          <NavigationList>
            <PageTitle>{appName.toUpperCase()}</PageTitle>
            <NavigationListSection>
              {sortPermissionsByName(matchingQueryResult).map(
                ({ name, title, verbs, type }) => {
                  const iconName = getPermissionIconName(type)
                  return (
                    <div key={name}>
                      <Link
                        to={`/permissions/${appName}/${name}`}
                        key={name}
                        style={{ textDecoration: 'none' }}
                      >
                        <ListItem button>
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
                        </ListItem>
                      </Link>
                      <Divider />
                    </div>
                  )
                }
              )}
            </NavigationListSection>
          </NavigationList>
        </div>
      )}
    </Page>
  )
}

export default withRouter(withAllLocales(PermissionsApplication))
