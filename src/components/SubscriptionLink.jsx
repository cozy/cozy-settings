import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import {
  buildPremiumLink,
  arePremiumLinksEnabled
} from 'cozy-client/dist/models/instance'
import { isFlagshipApp } from 'cozy-device-helper'
import flag from 'cozy-flags'

import { useInstanceInfo } from 'hooks/useInstanceInfo'

/**
 * Button to redirect to the plan page
 */
const SubscriptionLink = ({ label, className }) => {
  const instance = useInstanceInfo()
  const link = buildPremiumLink(instance)

  const isIapEnabled = flag('flagship.iap.enabled')
  if (isFlagshipApp() && !isIapEnabled) return null

  if (arePremiumLinksEnabled(instance) && link) {
    return (
      <Button
        fullWidth
        component="a"
        className={className}
        label={label}
        href={link}
      />
    )
  }

  return null
}

export { SubscriptionLink }
