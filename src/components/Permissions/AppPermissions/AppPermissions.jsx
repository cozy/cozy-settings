import React, { useMemo } from 'react'
import classNames from 'classnames'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { useParams } from 'react-router-dom'
import AppIcon from 'cozy-ui/transpiled/react/AppIcon'
import Icon from 'cozy-ui/transpiled/react/Icon'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import PreviousIcon from 'cozy-ui/transpiled/react/Icons/Previous'
import { OpenappButton } from 'components/Permissions/OpenappButton'
import { AboutButton } from 'components/Permissions/AboutButton'
import withAllLocales from 'lib/withAllLocales'
import NavigationList from 'cozy-ui/transpiled/react/NavigationList'
import { isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import AccessRightsSection from 'components/Permissions/AccessRightsSection'
import LatestOutgoingDataHistory from 'components/Permissions/LatestOutgoingDataHistory'
import {
  filterPermissions,
  sortPermissionsByName,
  completeAppPermission,
  filterRemoteRequests
} from 'components/Permissions/helpers/permissionsHelper'
import useFetchJSON from 'cozy-client/dist/hooks/useFetchJSON'
import {
  buildAppsQueryBySlug,
  buildKonnectorsQueryBySlug,
  buildRemoteRequestsQuery
} from 'lib/queries'
import { useQuery } from 'cozy-client'
import { UninstallButton } from '../UninstallButton'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

const styles = {
  actionButtons: {
    gap: '2em'
  }
}

const AppPermissions = ({ t }) => {
  const { slug: slugName } = useParams()
  const { isMobile, isTablet } = useBreakpoints()
  const appsQuery = buildAppsQueryBySlug(slugName)
  const queryResultApps = useQuery(appsQuery.definition, appsQuery.options)
  const konnectorsQuery = buildKonnectorsQueryBySlug(slugName)
  const queryResultKonnectors = useQuery(
    konnectorsQuery.definition,
    konnectorsQuery.options
  )
  const remoteQuery = buildRemoteRequestsQuery()
  const queryResultRemoteRequests = useQuery(
    remoteQuery.definition,
    remoteQuery.options
  )
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

  const filteredRemoteRequests = filterRemoteRequests(
    queryResultRemoteRequests,
    slugName
  )

  return (
    <Page
      className={isMobile || isTablet ? '' : 'u-maw-7 u-mh-2'}
      withoutMarginTop={isMobile || isTablet}
    >
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
          <div
            className={
              isMobile || isTablet
                ? 'u-flex u-flex-column u-flex-items-center u-mt-1-half'
                : 'u-flex u-flex-justify-between'
            }
          >
            <div
              className={
                isMobile || isTablet ? '' : 'u-flex u-flex-items-center'
              }
            >
              {!isMobile && !isTablet && (
                <IconButton className="u-mr-half" href="#/permissions">
                  <Icon icon={PreviousIcon} size={16} />
                </IconButton>
              )}
              <div style={{ width: '48px' }}>
                <AppIcon app={slugName} />
              </div>
              <PageTitle className={isMobile || isTablet ? '' : 'u-mh-1'}>
                {slugName.toUpperCase()}
              </PageTitle>
            </div>
            <div
              className={classNames('u-flex u-flex-row u-flex-items-center', {
                'u-mt-1': isMobile || isTablet
              })}
              style={styles.actionButtons}
            >
              <OpenappButton
                type={
                  isKonnector(matchingQueryResult.data.type)
                    ? 'konnector'
                    : 'app'
                }
                appData={matchingQueryResult.data}
              />
              <AboutButton appData={matchingQueryResult.data} />
              <UninstallButton appData={matchingQueryResult.data} />
            </div>
          </div>
          <NavigationList
            className={isMobile || isTablet ? 'u-mt-1' : 'u-mv-1'}
          >
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

            {filteredRemoteRequests?.length > 0 && (
              <LatestOutgoingDataHistory
                queryResultRemoteRequests={filteredRemoteRequests}
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
