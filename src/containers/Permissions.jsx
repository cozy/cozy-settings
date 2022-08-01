import React from 'react'
import { Link } from 'react-router-dom'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Spinner from 'cozy-ui/transpiled/react/Spinner'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'

const Permissions = () => {
  const { t } = useI18n()
  const THIRTY_SECONDS = 30 * 1000
  const queryResultApps = useQuery(Q(APPS_DOCTYPE), {
    as: APPS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
  })
  const queryResultKonnectors = useQuery(Q(KONNECTORS_DOCTYPE), {
    as: KONNECTORS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
  })

  return (
    <Page narrow>
      <PageTitle>{t('Permissions.title')}</PageTitle>
      {(isQueryLoading(queryResultApps) ||
        isQueryLoading(queryResultKonnectors)) &&
      (!hasQueryBeenLoaded(queryResultApps) ||
        !hasQueryBeenLoaded(queryResultKonnectors)) ? (
        <Spinner size="large" className="u-flex u-flex-justify-center u-mt-1" />
      ) : queryResultApps.fetchStatus === 'failed' ||
        queryResultKonnectors.fetchStatus === 'failed' ? (
        <Typography variant="body1" className="u-mb-1-half">
          {t('Permissions.failedRequest')}
        </Typography>
      ) : (
        <List>
          {queryResultApps.data
            .concat(queryResultKonnectors.data)
            .sort((a, b) => a.slug.localeCompare(b.slug))
            .map(appOrKonnector => {
              return (
                <div key={appOrKonnector.name}>
                  <Link to={'/permissions/' + appOrKonnector.slug}>
                    <ListItem button>
                      <ListItemIcon>
                        <AppIcon app={appOrKonnector} />
                      </ListItemIcon>
                      <ListItemText
                        primary={appOrKonnector.name}
                        secondary={t('Permissions.numberOfPermissions', {
                          smart_count: Object.entries(
                            appOrKonnector.permissions
                          ).length
                        })}
                      />
                    </ListItem>
                  </Link>
                  <Divider />
                </div>
              )
            })}
        </List>
      )}
    </Page>
  )
}

export default Permissions
