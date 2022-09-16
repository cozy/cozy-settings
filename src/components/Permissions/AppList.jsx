import React from 'react'
import { Link } from 'react-router-dom'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import Icon from 'cozy-ui/transpiled/react/Icon'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemIcon, {
  smallSize
} from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { routes } from 'constants/routes'
import RightIcon from 'cozy-ui/transpiled/react/Icons/Right'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'
import NavigationList, {
  NavigationListSection
} from 'cozy-ui/transpiled/react/NavigationList'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'

const AppList = () => {
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
  const toNotDisplay = ['home', 'store', 'settings']

  return (
    <Page narrow>
      <PageTitle>{t('Permissions.applications')}</PageTitle>
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
        <NavigationList>
          <NavigationListSection>
            {queryResultApps.data
              .concat(queryResultKonnectors.data)
              .sort((a, b) => a.slug.localeCompare(b.slug))
              .filter(a => !toNotDisplay.includes(a.slug))
              .map(appOrKonnector => {
                return (
                  <div key={appOrKonnector.name}>
                    <Link
                      to={`${routes.appList}/${appOrKonnector.slug}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
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
                        <ListItemSecondaryAction style={{ color: 'grey' }}>
                          <Icon
                            icon={RightIcon}
                            size={smallSize}
                            className="u-mr-1"
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Link>
                    <Divider variant="inset" />
                  </div>
                )
              })}
          </NavigationListSection>
        </NavigationList>
      )}
    </Page>
  )
}

export default AppList
