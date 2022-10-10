import React from 'react'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { useParams } from 'react-router-dom'
import {
  displayPermissions,
  getPermissionIconName
} from './helpers/permissionsHelper'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import ListItemIcon, {
  smallSize,
  mediumSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import { routes } from 'constants/routes'
import { OpenappButton } from './OpenappButton'
import { AboutButton } from './AboutButton'
import withAllLocales from '../../lib/withAllLocales'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import NavigationList, {
  NavigationListSection
} from 'cozy-ui/transpiled/react/NavigationList'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'

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

const PermissionsApplication = ({ t }) => {
  const { slug: slugName } = useParams()
  const THIRTY_SECONDS = 30 * 1000

  const queryResultApps = useQuery(
    Q(APPS_DOCTYPE).getById('io.cozy.apps/' + slugName),
    {
      as: 'io.cozy.apps/' + slugName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS),
      singleDocData: true
    }
  )

  const queryResultKonnectors = useQuery(
    Q(KONNECTORS_DOCTYPE).getById('io.cozy.konnectors/' + slugName),
    {
      as: 'io.cozy.konnectors/' + slugName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS),
      singleDocData: true
    }
  )

  let matchingQueryResult
  if (queryResultApps.data) {
    matchingQueryResult = queryResultApps
  }
  if (queryResultKonnectors.data) {
    matchingQueryResult = queryResultKonnectors
  }

  const sortPermissionsByName = queryResult => {
    return Object.entries(queryResult.data?.permissions)
      .map(([name, value]) => {
        const type = value.type
        const perm = t('CozyPermissions.Permissions.' + type)
        return completePermission(name, perm, value, type)
      })
      .sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
  }

  const isKonnector = type => type === 'io.cozy.konnectors'

  let sortedPermissionsByName =
    matchingQueryResult?.data && sortPermissionsByName(matchingQueryResult)

  const isNotLastItem = name => {
    return (
      name !== sortedPermissionsByName[sortedPermissionsByName.length - 1].name
    )
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
          <IconButton className="u-mr-half" href="#/permissions">
            <Icon icon={PreviousIcon} size={16} />
          </IconButton>
          <div className="u-flex u-flex-column u-flex-items-center">
            <div style={{ width: '48px' }}>
              <AppIcon app={slugName} />
            </div>
            <PageTitle>{slugName.toUpperCase()}</PageTitle>
            <div>
              <OpenappButton
                type={
                  isKonnector(matchingQueryResult.data.type)
                    ? 'konnector'
                    : 'app'
                }
                matchingQueryResultData={matchingQueryResult.data}
              />
              <AboutButton matchingQueryResultData={matchingQueryResult.data} />
            </div>
          </div>
          <NavigationList>
            <NavigationListSection>
              {sortedPermissionsByName.map(({ name, title, verbs, type }) => {
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
                    {isNotLastItem(name) && <Divider variant="inset" />}
                  </div>
                )
              })}
            </NavigationListSection>
          </NavigationList>
        </div>
      )}
    </Page>
  )
}

export default withAllLocales(PermissionsApplication)
