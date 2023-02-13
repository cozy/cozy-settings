import { useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'
import { UseQueryReturnValue } from 'cozy-client/types/types'

import { buildAppsQuery, buildKonnectorsQuery } from 'lib/queries'

interface useAppsOrKonnectorsReturns {
  isResultLoading: boolean
  hasQueryFailed: boolean
  appsResult: UseQueryReturnValue
  konnectorsResult: UseQueryReturnValue
}

const useAppsOrKonnectors = (): useAppsOrKonnectorsReturns => {
  const appsQuery = buildAppsQuery()
  const appsResult = useQuery(appsQuery.definition, appsQuery.options)

  const konnectorsQuery = buildKonnectorsQuery()
  const konnectorsResult = useQuery(
    konnectorsQuery.definition,
    konnectorsQuery.options
  )

  const isResultLoading =
    (isQueryLoading(appsResult) || isQueryLoading(konnectorsResult)) &&
    (!hasQueryBeenLoaded(appsResult) || !hasQueryBeenLoaded(konnectorsResult))

  const hasQueryFailed =
    appsResult.fetchStatus === 'failed' ||
    konnectorsResult.fetchStatus === 'failed'

  return {
    isResultLoading,
    hasQueryFailed,
    appsResult,
    konnectorsResult
  }
}

export default useAppsOrKonnectors
