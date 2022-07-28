import React, { useState, useEffect } from 'react'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import { withRouter } from 'react-router-dom'
import Typography from 'cozy-ui/transpiled/react/Typography'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react'
import Page from 'components/Page'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { displayPermissions } from './helpers/permissionsHelper'

const Permission = ({ match }) => {
  const { t } = useI18n()
  const appName = match.params.app
  const permissionName = match.params.permission
  const THIRTY_SECONDS = 30 * 1000

  const [verbs, setVerbs] = useState([])

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

  useEffect(() => {
    let result
    if (queryResultApps.data.length > 0) {
      result = queryResultApps
    } else if (queryResultKonnectors.data.length > 0) {
      result = queryResultKonnectors
    } else {
      return
    }
    setVerbs(result.data[0].attributes.permissions[permissionName].verbs)
  }, [queryResultApps, queryResultKonnectors, permissionName])

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
          <Typography variant="h1">
            Application: {appName.toUpperCase()}
          </Typography>
          <Typography variant="h2">Permission: {permissionName}</Typography>
          <Typography variant="h3">{displayPermissions(verbs)}</Typography>
        </div>
      )}
    </Page>
  )
}

export default withRouter(Permission)
