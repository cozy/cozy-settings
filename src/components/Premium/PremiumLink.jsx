import PropTypes from 'prop-types'
import React from 'react'

import Button from 'cozy-ui/transpiled/react/Buttons'

import { usePremium } from '@/components/Premium/PremiumProvider'

/**
 * Button to redirect to the plan page
 */
const PremiumLink = ({ label, className, variant, fullWidth }) => {
  const { canOpenPremiumLink, premiumLink } = usePremium()

  if (canOpenPremiumLink && premiumLink) {
    return (
      <Button
        fullWidth={fullWidth}
        component="a"
        className={className}
        label={label}
        href={premiumLink}
        variant={variant}
      />
    )
  }

  return null
}

PremiumLink.propTypes = {
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  variant: PropTypes.string,
  fullWidth: PropTypes.bool
}

PremiumLink.defaultProps = {
  fullWidth: true
}

export { PremiumLink }
