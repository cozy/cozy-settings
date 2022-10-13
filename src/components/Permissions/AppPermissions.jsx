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
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import RiseIcon from 'cozy-ui/transpiled/react/Icons/Rise'
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
  const { f } = useI18n()

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

  const queryResultRemote = useQuery(Q('io.cozy.remote.requests'), {
    as: 'io.cozy.remote.requests',
    fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
  })

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

  const sortDataByDate = queryResult => {
    return queryResult.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
  }

  const isKonnector = type => type === 'io.cozy.konnectors'

  let sortedPermissionsByName =
    matchingQueryResult?.data && sortPermissionsByName(matchingQueryResult)

  const isNotLastItem = (itemId, list) => {
    if (list[0].name) {
      return itemId !== list[list.length - 1].name
    } else {
      return itemId !== list[list.length - 1].id
    }
  }

  const formatDate = ({ f, date }) => {
    return f(date, 'DD MMMM YYYY')
  }

  return (
    <Page narrow>
      {(isQueryLoading(queryResultApps) &&
        !hasQueryBeenLoaded(queryResultApps)) ||
      (isQueryLoading(queryResultKonnectors) &&
        !hasQueryBeenLoaded(queryResultKonnectors)) ||
      (isQueryLoading(queryResultRemote) &&
        !hasQueryBeenLoaded(queryResultRemote)) ? (
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
              <ListItem>
                <Typography variant="h5">
                  {t('Permissions.limited_right_access')}
                </Typography>
              </ListItem>
              <Divider />
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
                    {isNotLastItem(name, sortedPermissionsByName) && (
                      <Divider variant="inset" />
                    )}
                  </div>
                )
              })}
            </NavigationListSection>
            {queryResultRemote.data.length > 0 && (
              <NavigationListSection>
                <ListItem>
                  <Typography variant="h5">
                    {t('Permissions.latest_data_releases')}
                  </Typography>
                </ListItem>
                <Divider />
                {sortDataByDate(queryResultRemote).map(({ id, created_at }) => {
                  return (
                    <div key={id}>
                      <ListItem>
                        <ListItemIcon>
                          <Icon
                            icon={RiseIcon}
                            size={mediumSize}
                            color="var(--warningColor)"
                            rotate={90}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={t('Permissions.monthly_statistics')}
                          secondary={formatDate({
                            f,
                            date: new Date(created_at)
                          })}
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
                      {isNotLastItem(id, sortDataByDate(queryResultRemote)) && (
                        <Divider variant="inset" />
                      )}
                    </div>
                  )
                })}
              </NavigationListSection>
            )}
          </NavigationList>
        </div>
      )}
    </Page>
  )
}

export default withAllLocales(PermissionsApplication)
