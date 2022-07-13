import React from 'react'

import { APPS_DOCTYPE } from 'doctypes'
import { Q, useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { withRouter } from 'react-router-dom'

const PermissionsApplication = ({ match }) => {
  const { t } = useI18n()
  const appName = match.params.app

  const queryResult = useQuery(
    Q(APPS_DOCTYPE).getById('io.cozy.apps/' + appName),
    {
      as: 'io.cozy.apps/' + appName
    }
  )
  console.log(queryResult)

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
          <PageTitle>{appName.toUpperCase()}</PageTitle>
          {Object.entries(queryResult.data[0].attributes.permissions).map(
            ([key, value]) => (
              <React.Fragment key={key}>
                <Typography variant="h4">
                  {value.type} : {value.verbs ? value.verbs.join(' / ') : 'ALL'}
                </Typography>
              </React.Fragment>
            )
          )}
        </div>
      )}
    </Page>
  )
}

export default withRouter(PermissionsApplication)
