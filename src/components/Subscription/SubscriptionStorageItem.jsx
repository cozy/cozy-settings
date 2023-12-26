import React from 'react'
import ListItem from 'cozy-ui/transpiled/react/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import Icon from 'cozy-ui/transpiled/react/Icon'
import FolderIcon from 'cozy-ui/transpiled/react/Icons/Folder'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import { makeDiskInfos } from 'cozy-client/dist/models/instance'
import { useInstanceInfo } from 'cozy-client'

/**
 * Show user storage quota
 */
const SubscriptionStorageItem = () => {
  const { t } = useI18n()

  const { diskUsage } = useInstanceInfo()

  const { humanDiskQuota } = makeDiskInfos(
    diskUsage?.data?.attributes?.used,
    diskUsage?.data?.attributes?.quota
  )

  return (
    <ListItem size="small" ellipsis={false}>
      <ListItemIcon>
        <Icon icon={FolderIcon} />
      </ListItemIcon>
      <ListItemText
        primary={t('Subscription.included.storage', { humanDiskQuota })}
      />
    </ListItem>
  )
}

export { SubscriptionStorageItem }
