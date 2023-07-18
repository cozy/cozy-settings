import React from 'react'
import cx from 'classnames'

import Typography from 'cozy-ui/transpiled/react/Typography'
import { makeDiskInfos } from 'cozy-client/dist/models/instance'

import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import { useInstanceInfo } from 'hooks/useInstanceInfo'

import styles from 'styles/storage.styl'

/**
 * Show remaining disk space with a progress bar
 */
const StorageProgress = () => {
  const { t } = useI18n()

  const { diskUsage } = useInstanceInfo()

  const { humanDiskQuota, humanDiskUsage, percentUsage } = makeDiskInfos(
    diskUsage?.data?.attributes?.used,
    diskUsage?.data?.attributes?.quota
  )

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {t('StorageView.storage_phrase', {
          humanDiskUsage,
          humanDiskQuota
        })}
      </Typography>
      <progress
        className={styles['set-storage-bar']}
        value={humanDiskUsage}
        max={humanDiskQuota}
        min="0"
      />
      <span
        className={cx(
          styles['set-bar-percent'],
          +percentUsage < 5 ? styles['--dark'] : ''
        )}
      >
        {`${percentUsage}%`}
      </span>
    </>
  )
}

export { StorageProgress }
