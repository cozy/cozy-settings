import PropTypes from 'prop-types'
import React from 'react'

import flag from 'cozy-flags'
import Icon from 'cozy-ui/transpiled/react/Icon'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  isFlagDisabled,
  computeFlagLabel
} from '@/components/Subscription/helper'

/**
 * ListItem to display how the feature flag included in the user plan
 */
const SubscriptionFlagItem = ({ icon, name, hideWithoutFlag = false }) => {
  const { t, lang } = useI18n()

  const disabled = isFlagDisabled(name)
  const label = computeFlagLabel(name, t, lang)

  if (flag(name) === null && hideWithoutFlag) return null

  return (
    <ListItem size="small" disabled={disabled} ellipsis={false}>
      <ListItemIcon>
        <Icon icon={icon} />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
}

SubscriptionFlagItem.propTypes = {
  /** Icon to describe the feature flag */
  icon: PropTypes.func.isRequired,
  /** Key of the feature flag */
  name: PropTypes.string.isRequired
}

export { SubscriptionFlagItem }
