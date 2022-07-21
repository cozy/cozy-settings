import React from 'react'

import { APPS_DOCTYPE } from 'doctypes'
import {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded,
  models
} from 'cozy-client'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { useI18n } from 'cozy-ui/transpiled/react'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { withRouter } from 'react-router-dom'

const {
  locales: { getBoundT }
} = models.document

const PermissionsApplication = ({ match }) => {
  const { t, lang } = useI18n()
  const permissionsT = getBoundT(lang)
  const appName = match.params.app
  const queryResult = useQuery(
    Q(APPS_DOCTYPE).getById('io.cozy.apps/' + appName),
    {
      as: 'io.cozy.apps/' + appName
    }
  )

  let permissions = []
  if (!queryResult.data || queryResult?.data.length < 1) {
    permissions = []
  } else {
    const types = Object.entries(queryResult.data[0].attributes.permissions)
      .map(([, value]) => {
        return permissionsT('Permissions.' + value.type)
      })
      .sort((a, b) => {
        return a.localeCompare(b)
      })
    permissions = types
  }

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
          {permissions.map(value => {
            return (
              <React.Fragment key={value}>
                <Typography variant="h4">{value}</Typography>
              </React.Fragment>
            )
          })}
        </div>
      )}
    </Page>
  )
}

export default withRouter(PermissionsApplication)
