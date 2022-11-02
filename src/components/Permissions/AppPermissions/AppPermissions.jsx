import React, { useMemo } from 'react'

import { APPS_DOCTYPE, KONNECTORS_DOCTYPE } from 'doctypes'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { useParams } from 'react-router-dom'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import { OpenappButton } from '../OpenappButton'
import { AboutButton } from '../AboutButton'
import withAllLocales from '../../../lib/withAllLocales'
import NavigationList from 'cozy-ui/transpiled/react/NavigationList'
import CozyClient, {
  Q,
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'
import AccessRightsSection from '../AccessRightsSection'
import LatestDataReleases from '../LatestDataReleases'
import {
  filterPermissions,
  sortPermissionsByName,
  completeAppPermission
} from '../helpers/permissionsHelper'
import useFetchJSON from 'cozy-client/dist/hooks/useFetchJSON'

const AppPermissions = ({ t }) => {
  const { slug: slugName } = useParams()
  const THIRTY_SECONDS = 30 * 1000

  const queryResultApps = useQuery(
    Q(APPS_DOCTYPE).getById('io.cozy.apps/' + slugName),
    {
      as: 'io.cozy.apps/' + slugName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS),
      singleDocData: true
    }
  )
  const queryResultKonnectors = useQuery(
    Q(KONNECTORS_DOCTYPE).getById('io.cozy.konnectors/' + slugName),
    {
      as: 'io.cozy.konnectors/' + slugName,
      fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS),
      singleDocData: true
    }
  )
  const queryResultRemoteRequests = useQuery(Q('io.cozy.remote.requests'), {
    as: 'io.cozy.remote.requests',
    fetchPolicy: CozyClient.fetchPolicies.olderThan(THIRTY_SECONDS)
  })
  const { data: remoteDoctypes, ...queryResultRemoteDoctypes } = useFetchJSON(
    'GET',
    '/remote/_all_doctypes'
  )

  let matchingQueryResult
  if (queryResultApps.data) {
    matchingQueryResult = queryResultApps
  }
  if (queryResultKonnectors.data) {
    matchingQueryResult = queryResultKonnectors
  }

  const filteredPermissions = useMemo(
    () => filterPermissions(remoteDoctypes, matchingQueryResult),
    [remoteDoctypes, matchingQueryResult]
  )

  const limitedRightAccess = filteredPermissions.limitedRightAccess
  const exitRights = filteredPermissions.exitRights

  const sortedLimitedRightAccessPermissionsByName = sortPermissionsByName(
    completeAppPermission,
    limitedRightAccess,
    t
  )
  const sortedExitPermissionsByName = sortPermissionsByName(
    completeAppPermission,
    exitRights,
    t
  )

  const isKonnector = type => type === 'io.cozy.konnectors'

  return (
    <Page narrow>
      {(isQueryLoading(queryResultApps) &&
        !hasQueryBeenLoaded(queryResultApps)) ||
      (isQueryLoading(queryResultKonnectors) &&
        !hasQueryBeenLoaded(queryResultKonnectors)) ||
      (isQueryLoading(queryResultRemoteRequests) &&
        !hasQueryBeenLoaded(queryResultRemoteRequests)) ||
      (isQueryLoading(queryResultRemoteDoctypes) &&
        !hasQueryBeenLoaded(queryResultRemoteDoctypes)) ? (
        <Spinner size="large" className="u-flex u-flex-justify-center u-mt-1" />
      ) : (queryResultApps.fetchStatus === 'failed' &&
          queryResultKonnectors.fetchStatus === 'failed') ||
        queryResultRemoteDoctypes.fetchStatus === 'error' ? (
        <Typography variant="body1" className="u-mb-1-half">
          {t('Permissions.failedRequest')}
        </Typography>
      ) : (
        <div>
          <IconButton className="u-mr-half" href="#/permissions">
            <Icon icon={PreviousIcon} size={16} />
          </IconButton>
          <div className="u-flex u-flex-column u-flex-items-center">
            <div style={{ width: '48px' }}>
              <AppIcon app={slugName} />
            </div>
            <PageTitle>{slugName.toUpperCase()}</PageTitle>
            <div>
              <OpenappButton
                type={
                  isKonnector(matchingQueryResult.data.type)
                    ? 'konnector'
                    : 'app'
                }
                matchingQueryResultData={matchingQueryResult.data}
              />
              <AboutButton matchingQueryResultData={matchingQueryResult.data} />
            </div>
          </div>
          <NavigationList>
            {sortedLimitedRightAccessPermissionsByName.length > 0 && (
              <AccessRightsSection
                sortedPermissionsByName={
                  sortedLimitedRightAccessPermissionsByName
                }
                slugName={slugName}
                t={t}
                isRemoteDoctypes={false}
              />
            )}

            {sortedExitPermissionsByName.length > 0 && (
              <AccessRightsSection
                sortedPermissionsByName={sortedExitPermissionsByName}
                slugName={slugName}
                t={t}
                isRemoteDoctypes={true}
              />
            )}

            {queryResultRemoteRequests.data.length > 0 && (
              <LatestDataReleases
                queryResultRemoteRequests={queryResultRemoteRequests}
                slugName={slugName}
                t={t}
              />
            )}
          </NavigationList>
        </div>
      )}
    </Page>
  )
}

export default withAllLocales(AppPermissions)
