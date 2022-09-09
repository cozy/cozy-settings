import React from 'react'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import { Link, useParams } from 'react-router-dom'
import withAllLocales from 'lib/withAllLocales'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import NavigationList from 'cozy-ui/transpiled/react/NavigationList'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import { routes } from 'constants/routes'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import { retrieveSlugsOfPermission } from './helpers/DataPermissionsHelpers'

import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'

const DataPermissions = ({ t }) => {
  const { permission: permissionType } = useParams()
  const THIRTY_SECONDS = 30 * 1000

  const queryResultApps = useQuery(Q(APPS_DOCTYPE), {
    as: APPS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
  })
  const queryResultKonnectors = useQuery(Q(KONNECTORS_DOCTYPE), {
    as: KONNECTORS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
  })

  const slugs = retrieveSlugsOfPermission(
    queryResultApps,
    queryResultKonnectors,
    permissionType
  )

  return (
    <Page narrow>
      <IconButton className="u-mr-half" href={`#${routes.dataList}`}>
        <Icon icon={PreviousIcon} size={16} />
      </IconButton>
      <PageTitle>
        {t('CozyPermissions.Permissions.' + permissionType)}
      </PageTitle>
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
        <NavigationList>
          {slugs.map(slug => {
            return (
              <React.Fragment key={slug.slug}>
                <Link to="" style={{ textDecoration: 'none' }}>
                  <ListItem button>
                    <ListItemIcon>
                      <AppIcon app={slug} />
                    </ListItemIcon>
                    <ListItemText primary={slug.slug} />
                  </ListItem>
                </Link>
                <Divider />
              </React.Fragment>
            )
          })}
        </NavigationList>
      )}
    </Page>
  )
}

export default withAllLocales(DataPermissions)
