import flag from 'cozy-flags'

export { BlockingSubscriptionModal } from '@/components/BlockingSubscriptionModal/BlockingSubscriptionModal'

/**
 * Checks if there is a blocking subscription.
 * @param {Object} externalTiesResult - The result of the external ties.
 * @returns {boolean} True if there is a blocking subscription, false otherwise.
 */
export const hasBlockingSubscription = externalTiesResult => {
  if (
    flag('settings.specify-blocking-subscription-source-dev') &&
    externalTiesResult.data?.blocking_subscription
  ) {
    return true
  }

  if (
    flag('settings.hasBlockingSubscription') ||
    externalTiesResult.data?.has_blocking_subscription
  ) {
    return true
  }
  return false
}

/**
 * Retrieves the blocking subscription source based on the external ties result.
 * @param {Object} externalTiesResult - The result of the external ties.
 * @returns {'ios' | 'android' | 'both'} The blocking subscription source.
 */
export const getBlockingSubscriptionVendor = externalTiesResult => {
  if (
    flag('settings.specify-blocking-subscription-vendor-dev') &&
    externalTiesResult.data?.blocking_subscription
  ) {
    return externalTiesResult.data?.blocking_subscription?.vendor ?? 'both'
  }
  return 'both'
}
