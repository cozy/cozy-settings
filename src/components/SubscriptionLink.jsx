import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from 'cozy-ui/transpiled/react/Buttons'
import {
  buildPremiumLink,
  arePremiumLinksEnabled
} from 'cozy-client/dist/models/instance'
import { isFlagshipApp } from 'cozy-device-helper'
import flag from 'cozy-flags'
import { useInstanceInfo } from 'cozy-client'
import { useWebviewIntent } from 'cozy-intent'

/**
 * Button to redirect to the plan page
 */
const SubscriptionLink = ({ label, className, variant, fullWidth }) => {
  const instance = useInstanceInfo()
  const link = buildPremiumLink(instance)
  const webviewIntent = useWebviewIntent()
  const [hasIAP, setIAP] = useState(false)

  useEffect(() => {
    const fetchIapAvailability = async () => {
      const isAvailable =
        (await webviewIntent?.call('isAvailable', 'iap')) ?? false
      const isEnabled = !!flag('flagship.iap.enabled')
      setIAP(isAvailable && isEnabled)
    }

    if (isFlagshipApp()) {
      fetchIapAvailability()
    }
  }, [webviewIntent])

  const canOpenPremiumLink =
    arePremiumLinksEnabled(instance) && (!isFlagshipApp() || hasIAP)

  if (canOpenPremiumLink && link) {
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
