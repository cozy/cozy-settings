import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import ExchangeIcon from 'cozy-ui/transpiled/react/Icons/Exchange'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

import {
  isFlagDisabled,
  computeAccountsLabel
} from '@/components/Subscription/helper'

/**
 * Display the number of konnector accounts authorised for the user
 */
const SubscriptionAccountsItem = () => {
  const { t, lang } = useI18n()

  const disabled = isFlagDisabled('harvest.accounts.max')
  const label = computeAccountsLabel(t, lang)

  return (
    <ListItem size="small" disabled={disabled} ellipsis={false}>
      <ListItemIcon>
        <Icon icon={ExchangeIcon} />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
}

export { SubscriptionAccountsItem }
