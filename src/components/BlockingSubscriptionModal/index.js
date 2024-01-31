import flag from 'cozy-flags'

export { BlockingSubscriptionModal } from 'components/BlockingSubscriptionModal/BlockingSubscriptionModal'

export const hasBlockingSubscription = externalTiesResult =>
  flag('settings.hasBlockingSubscription') ||
  externalTiesResult.data?.has_blocking_subscription
