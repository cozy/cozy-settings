import flag from 'cozy-flags'

export const initFlags = () => {
  if (flag('debug')) {
    flag('settings.permissions-dashboard')
    flag('settings.flagship-mode')
    flag('settings.subscription')
    flag('settings.hasBlockingSubscription')
    flag('settings.skip-email-confirmation')
    flag('settings.oidc-auth')
    flag('settings.moving-cozy')
  }
}
