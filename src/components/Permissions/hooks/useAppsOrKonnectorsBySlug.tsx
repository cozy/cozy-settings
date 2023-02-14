import { useEffect, useMemo, useState } from 'react'

import {
  useQuery,
  isQueryLoading,
  hasQueryBeenLoaded,
  useClient,
  Registry
} from 'cozy-client'
import { UseQueryReturnValue } from 'cozy-client/types/types'
import { RegistryApp } from 'cozy-client/types/registry'

import { buildAppsQueryBySlug, buildKonnectorsQueryBySlug } from 'lib/queries'

interface useAppsOrKonnectorsBySlugReturns {
  isResultLoading: boolean
  hasQueryFailed: boolean
  result: UseQueryReturnValue | undefined
}

const useAppsOrKonnectorsBySlug = (
  slugName: string
): useAppsOrKonnectorsBySlugReturns => {
  const [hasFetchRegistry, setHasFetchRegistry] = useState(false)
  const [type, setType] = useState<string | undefined>(undefined)
  const [hasRegistryFailed, setRegistryFailed] = useState(false)

  const client = useClient()
  const registry = useMemo(() => {
    return new Registry({
      client
    })
  }, [client])

  useEffect(() => {
    const fetchRegistry = async (): Promise<void> => {
      setHasFetchRegistry(true)
      try {
        const registryResult: RegistryApp = await registry.fetchApp(slugName)
        setType(registryResult.type)
      } catch (_) {
        setRegistryFailed(true)
      }
    }
    if (!hasFetchRegistry) {
      void fetchRegistry()
    }
  }, [client, hasFetchRegistry, registry, slugName])

  const appsQuery = buildAppsQueryBySlug(slugName)
  const konnectorsQuery = buildKonnectorsQueryBySlug(slugName)

  const queryResultApps = useQuery(appsQuery.definition, {
    ...appsQuery.options,
    enabled: type === 'webapp'
  })

  const queryResultKonnectors = useQuery(konnectorsQuery.definition, {
    ...appsQuery.options,
    enabled: type === 'konnector'
  })

  const isResultLoading =
    (isQueryLoading(queryResultApps) && !hasQueryBeenLoaded(queryResultApps)) ||
    (isQueryLoading(queryResultKonnectors) &&
      !hasQueryBeenLoaded(queryResultKonnectors))

  const hasQueryFailed =
    hasRegistryFailed ||
    queryResultApps.fetchStatus === 'failed' ||
    queryResultKonnectors.fetchStatus === 'failed'

  return {
    isResultLoading,
    hasQueryFailed,
    result: type === 'webapp' ? queryResultApps : queryResultKonnectors
  }
}

export default useAppsOrKonnectorsBySlug
