import React from 'react'
import PropTypes from 'prop-types'

import flag from 'cozy-flags'
import CozyCircle from 'cozy-ui/transpiled/react/Icons/CozyCircle'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { MenuItemAnchor } from 'components/menu/MenuItemAnchor'
import { MenuItemNavLink } from 'components/menu/MenuItemNavLink'
import { routes } from 'constants/routes'

/**
 * Sidebar menu link for plan
 */
const SubscriptionMenuItem = ({ offersLink }) => {
  const { t } = useI18n()

  if (flag('settings.subscription')) {
    return (
      <MenuItemNavLink
        to={routes.subscription}
        primary={t('Nav.primary_plan')}
        icon={CozyCircle}
      />
    )
  }

  return (
    <MenuItemAnchor
      primary={t('Nav.primary_plan')}
      href={offersLink}
      target="_blank"
      icon={CozyCircle}
    />
  )
}

SubscriptionMenuItem.propTypes = {
  /** Link to our plans page */
  offersLink: PropTypes.func.isRequired
}

export { SubscriptionMenuItem }
