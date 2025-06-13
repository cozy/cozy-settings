import React from 'react'

import flag from 'cozy-flags'
import Icon from 'cozy-ui/transpiled/react/Icon'
import OnlyOfficeIcon from 'cozy-ui/transpiled/react/Icons/OnlyOffice'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const SubscriptionOnlyOfficeItem = () => {
  const { t } = useI18n()

  const label = flag('drive.office.write')
    ? t('Subscription.included.onlyOffice.write')
    : t('Subscription.included.onlyOffice.default')

  return (
    <ListItem size="small" ellipsis={false}>
      <ListItemIcon>
        <Icon icon={OnlyOfficeIcon} />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
  )
}

export { SubscriptionOnlyOfficeItem }
