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

import { APPS_DOCTYPE } from 'doctypes'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'

const Permissions = () => {
  const { t } = useI18n()
  const queryResult = useQuery(Q(APPS_DOCTYPE), {
    as: APPS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(30 * 1000)
  })

  return (
    <Page narrow>
      <PageTitle>{t('Permissions.title')}</PageTitle>
      {isQueryLoading(queryResult) && !hasQueryBeenLoaded(queryResult) ? (
        <Spinner size="large" className="u-flex u-flex-justify-center u-mt-1" />
      ) : queryResult.fetchStatus === 'failed' ? (
        <Typography variant="body1" className="u-mb-1-half">
          {t('Permissions.failedRequest')}
        </Typography>
      ) : (
        <List>
          {queryResult.data.map(app => (
            <div key={app.name}>
              <Link to={'/permissions/'}>
                <ListItem button>
                  <ListItemIcon>
                    <AppIcon app={app} />
                  </ListItemIcon>
                  <ListItemText primary={app.name} />
                </ListItem>
              </Link>
              <Divider />
            </div>
          ))}
        </List>
      )}
    </Page>
  )
}

export default Permissions
