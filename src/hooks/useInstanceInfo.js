import { useQuery, hasQueryBeenLoaded } from 'cozy-client'

import {
  buildSettingsInstanceQuery,
  buildDiskUsageQuery,
  buildContextQuery
} from 'lib/queries'

const useInstanceInfo = () => {
  const instanceQuery = buildSettingsInstanceQuery()
  const instanceResult = useQuery(
    instanceQuery.definition,
    instanceQuery.options
  )

  const contextQuery = buildContextQuery()
  const contextResult = useQuery(contextQuery.definition, contextQuery.options)

  const diskUsageQuery = buildDiskUsageQuery()
  const diskUsageResult = useQuery(
    diskUsageQuery.definition,
    diskUsageQuery.options
  )

  return {
    isLoaded:
      hasQueryBeenLoaded(instanceResult) !== null &&
      hasQueryBeenLoaded(contextResult) !== null &&
      hasQueryBeenLoaded(diskUsageResult) !== null,
    instance: {
      data: instanceResult.data
    },
    context: {
      data: contextResult.data
    },
    diskUsage: {
      data: diskUsageResult.data
    }
  }
}

export { useInstanceInfo }
