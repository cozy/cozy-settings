import React from 'react'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { withRouter, Link } from 'react-router-dom'

const PermissionsApplication = ({ match }) => {
  const { t } = useI18n()
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
          <PageTitle>{appName.toUpperCase()}</PageTitle>
          {Object.entries(
            queryResultApps.data.length > 0
              ? queryResultApps.data[0].attributes.permissions
              : queryResultKonnectors.data[0].attributes.permissions
          ).map(([key, value]) => (
            <Link to={`/permissions/${appName}/${key}`} key={key}>
              <Typography variant="h4">
                {value.type} : {value.verbs ? value.verbs.join(' / ') : 'ALL'}
              </Typography>
            </Link>
          ))}
        </div>
      )}
    </Page>
  )
}

export default withRouter(PermissionsApplication)
