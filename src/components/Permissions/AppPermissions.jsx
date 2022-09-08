import React from 'react'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { Link, useParams } from 'react-router-dom'
import {
  displayPermissions,
  getPermissionIconName
} from '../../containers/helpers/permissionsHelper'
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
import withAllLocales from '../../lib/withAllLocales'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import NavigationList from 'cozy-ui/transpiled/react/NavigationList'
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
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
    }
  )

  const queryResultKonnectors = useQuery(
    Q(KONNECTORS_DOCTYPE).getById('io.cozy.konnectors/' + slugName),
    {
      as: 'io.cozy.konnectors/' + slugName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
    }
  )

  let matchingQueryResult
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
        const perm = t('CozyPermissions.Permissions.' + type)
        return completePermission(name, perm, value, type)
      })
      .sort((a, b) => {
        return a.title.localeCompare(b.title)
      })
  }

  const isKonnector = type => type === 'io.cozy.konnectors'

  let sortedPermissionsByName =
    matchingQueryResult && sortPermissionsByName(matchingQueryResult)

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
          <NavigationList>
            <PageTitle>{slugName.toUpperCase()}</PageTitle>
            <OpenappButton
              type={
                isKonnector(matchingQueryResult.data[0].type)
                  ? 'konnector'
                  : 'app'
              }
              matchingQueryResultData={matchingQueryResult.data[0]}
            />

            {sortedPermissionsByName.map(({ name, title, verbs, type }) => {
              const iconName = getPermissionIconName(type)
              return (
                <Link
                  to={`${routes.appList}/${slugName}/${name}`}
                  key={name}
                  style={{ textDecoration: 'none', color: 'black' }}
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
                    <ListItemSecondaryAction style={{ color: 'grey' }}>
                      <Icon
                        icon={RightIcon}
                        size={smallSize}
                        className="u-mr-1"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  {isNotLastItem(name) && <Divider variant="inset" />}
                </Link>
              )
            })}
          </NavigationList>
        </div>
      )}
    </Page>
  )
}

export default withAllLocales(PermissionsApplication)
