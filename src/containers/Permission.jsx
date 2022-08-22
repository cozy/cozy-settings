import React, { useState, useEffect } from 'react'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import { useParams } from 'react-router-dom'
import Typography from 'cozy-ui/transpiled/react/Typography'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Page from 'components/Page'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { displayPermissions } from './helpers/permissionsHelper'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import { routes } from 'constants/routes'

const Permission = () => {
  const { t } = useI18n()
  const { app: appName, permission: permissionName } = useParams()
  const THIRTY_SECONDS = 30 * 1000
  const [verbs, setVerbs] = useState([])

  // TODO : instead of sending 2 queries (queryResultApps & queryResultKonnectors) where 1 will be useless, find a way to check if we have an app or a konnector and send only 1 query
  const queryResultApps = useQuery(
    Q(APPS_DOCTYPE).getById('io.cozy.apps/' + appName),
    {
      as: 'io.cozy.apps/' + appName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS),
      singleDocData: true
    }
  )

  const queryResultKonnectors = useQuery(
    Q(KONNECTORS_DOCTYPE).getById('io.cozy.konnectors/' + appName),
    {
      as: 'io.cozy.konnectors/' + appName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS),
      singleDocData: true
    }
  )

  useEffect(() => {
    let result

    if (queryResultApps.data) {
      result = queryResultApps
    } else if (queryResultKonnectors.data) {
      result = queryResultKonnectors
    } else {
      return
    }

    const verbs = result.data?.permissions?.[permissionName]?.verbs
    if (verbs) {
      setVerbs(verbs)
    }
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
        <React.Fragment>
          <IconButton
            className="u-mr-half"
            href={`#${routes.appList}/${appName.toLowerCase()}`}
          >
            <Icon icon={PreviousIcon} size={16} />
          </IconButton>
          <Typography variant="h1">
            Application: {appName.toUpperCase()}
          </Typography>
          <Typography variant="h2">Permission: {permissionName}</Typography>
          <Typography variant="h3">{t(displayPermissions(verbs))}</Typography>
        </React.Fragment>
      )}
    </Page>
  )
}

export default Permission
