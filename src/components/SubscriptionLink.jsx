import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'
import { buildPremiumLink } from 'cozy-client/dist/models/instance'

import { useInstanceInfo } from 'hooks/useInstanceInfo'

/**
 * Button to redirect to the plan page
 */
const SubscriptionLink = ({ label, className }) => {
  const instance = useInstanceInfo()
  const link = buildPremiumLink(instance)

  if (link) {
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
