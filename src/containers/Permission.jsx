import React from 'react'

import { APPS_DOCTYPE } from 'doctypes'
import { withRouter } from 'react-router-dom'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { Q, useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react'
import Page from 'components/Page'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import List from 'cozy-ui/transpiled/react/MuiCozyTheme/List'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'

const Permission = ({ match }) => {
  const { t } = useI18n()
  const appName = match.params.app
  const permissionName = match.params.permission

  const queryResult = useQuery(
    Q(APPS_DOCTYPE).getById('io.cozy.apps/' + appName),
    {
      as: 'io.cozy.apps/' + appName
    }
  )

  return (
    <Page narrow>
      {isQueryLoading(queryResult) && !hasQueryBeenLoaded(queryResult) ? (
        <Spinner size="large" className="u-flex u-flex-justify-center u-mt-1" />
      ) : queryResult.fetchStatus === 'failed' ? (
        <Typography variant="body1" className="u-mb-1-half">
          {t('Permissions.failedRequest')}
        </Typography>
      ) : (
        <div>
          <Typography variant="h1">
            Application: {appName.toUpperCase()}
          </Typography>
          <Typography variant="h2">Permission: {permissionName}</Typography>
          <List>
            {queryResult.data[0].attributes.permissions[permissionName]
              .verbs ? (
              queryResult.data[0].attributes.permissions[
                permissionName
              ].verbs.map((el, i) => <ListItemText key={i}>{el}</ListItemText>)
            ) : (
              <ListItemText>ALL</ListItemText>
            )}
          </List>
        </div>
      )}
    </Page>
  )
}

export default withRouter(Permission)
