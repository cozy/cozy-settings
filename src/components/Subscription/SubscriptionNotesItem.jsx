import React from 'react'

import Icon from 'cozy-ui/transpiled/react/Icon'
import NotesIcon from 'cozy-ui/transpiled/react/Icons/Notes'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'

const SubscriptionNotesItem = () => {
  const { t } = useI18n()

  return (
    <ListItem size="small" ellipsis={false}>
      <ListItemIcon>
        <Icon icon={NotesIcon} />
      </ListItemIcon>
      <ListItemText primary={t('Subscription.included.notes')} />
    </ListItem>
  )
}

export { SubscriptionNotesItem }
