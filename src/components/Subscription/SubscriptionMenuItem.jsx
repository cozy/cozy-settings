import React from 'react'

import flag from 'cozy-flags'
import CozyCircle from 'cozy-ui/transpiled/react/Icons/CozyCircle'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { isFlagshipApp } from 'cozy-device-helper'

import { MenuItemAnchor } from 'components/menu/MenuItemAnchor'
import { MenuItemNavLink } from 'components/menu/MenuItemNavLink'
import { routes } from 'constants/routes'
import { useOffersLink } from 'hooks/useOffersLink'

/**
 * Sidebar menu link for plan
 */
const SubscriptionMenuItem = () => {
  const { t } = useI18n()
  const offersLink = useOffersLink()

  if (flag('settings.subscription')) {
    return (
      <MenuItemNavLink
        to={routes.subscription}
        primary={t('Nav.primary_plan')}
        icon={CozyCircle}
      />
    )
  }

  if (offersLink && !isFlagshipApp()) {
    return (
      <MenuItemAnchor
        primary={t('Nav.primary_plan')}
        href={offersLink}
        target="_blank"
        icon={CozyCircle}
      />
    )
  }

  return null
}

export { SubscriptionMenuItem }
