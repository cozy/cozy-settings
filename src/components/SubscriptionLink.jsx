import React from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/Buttons'
import {
  buildPremiumLink,
  arePremiumLinksEnabled
} from 'cozy-client/dist/models/instance'
import { isFlagshipApp } from 'cozy-device-helper'
import flag from 'cozy-flags'
import { useInstanceInfo } from 'cozy-client'

/**
 * Button to redirect to the plan page
 */
const SubscriptionLink = ({ label, className, variant, fullWidth }) => {
  const instance = useInstanceInfo()
  const link = buildPremiumLink(instance)

  const isIapEnabled = flag('flagship.iap.enabled')
  if (isFlagshipApp() && !isIapEnabled) return null

  if (arePremiumLinksEnabled(instance) && link) {
    return (
      <Button
        fullWidth={fullWidth}
        component="a"
        className={className}
        label={label}
        href={link}
        variant={variant}
      />
    )
  }

  return null
}

SubscriptionLink.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool
}

SubscriptionLink.defaultProps = {
  fullWidth: true
}

export { SubscriptionLink }
