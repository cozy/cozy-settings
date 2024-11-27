import React from 'react'

import flag from 'cozy-flags'
import CozyCircle from 'cozy-ui/transpiled/react/Icons/CozyCircle'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import { MenuItemAnchor } from '@/components/menu/MenuItemAnchor'
import { MenuItemNavLink } from '@/components/menu/MenuItemNavLink'
import { routes } from '@/constants/routes'
import { usePremium } from '@/components/Premium/PremiumProvider'

/**
 * Sidebar menu link for plan
 */
const SubscriptionMenuItem = () => {
  const { t } = useI18n()
  const { canOpenPremiumLink, premiumLink } = usePremium()

  if (flag('settings.subscription')) {
    return (
      <MenuItemNavLink
        to={routes.subscription}
        primary={t('Nav.primary_plan')}
        icon={CozyCircle}
      />
    )
  }

  if (canOpenPremiumLink) {
    return (
      <MenuItemAnchor
        primary={t('Nav.primary_plan')}
        href={premiumLink}
        target="_blank"
        icon={CozyCircle}
      />
    )
  }

  return null
}

export { SubscriptionMenuItem }
