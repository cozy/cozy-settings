import { useQuery, hasQueryBeenLoaded } from 'cozy-client'
import flag from 'cozy-flags'

import { buildExternalTiesQuery } from 'lib/queries'

const useHasBlockingSubscription = () => {
  const externalTiesQuery = buildExternalTiesQuery()
  const externalTiesResult = useQuery(
    externalTiesQuery.definition,
    externalTiesQuery.options
  )

  const hasBlockingSubscription =
    flag('subscription.hasBlockingSubscription') ||
    externalTiesResult.data?.has_blocking_subscription

  return {
    isLoaded: hasQueryBeenLoaded(externalTiesResult),
    hasBlockingSubscription
  }
}

export { useHasBlockingSubscription }
