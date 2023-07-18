import React, { useEffect } from 'react'
import classNames from 'classnames'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { isFlagshipApp } from 'cozy-device-helper'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import styles from 'styles/storage.styl'
import OffersLink from 'components/OffersLink'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { makeDiskInfos } from 'lib/makeDiskInfos'

const StorageView = ({ isFetching, storageData, fetchStorageData }) => {
  const { t } = useI18n()

  useEffect(() => {
    fetchStorageData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { humanDiskQuota, humanDiskUsage, percentUsage } = makeDiskInfos(
    storageData.usage,
    storageData.quota
  )

  return (
    <Page narrow>
      <PageTitle>{t('StorageView.title')}</PageTitle>
      <Typography variant="h5" gutterBottom>
        {t('StorageView.storage_title')}
      </Typography>
      {isFetching && (
        <Spinner
          className="u-pos-fixed-s"
          middle
          size="xxlarge"
          loadingType="loading"
        />
      )}
      {!isFetching && storageData && (
        <div>
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
            className={classNames(
              styles['set-bar-percent'],
              +percentUsage < 5 ? styles['--dark'] : ''
            )}
          >
            {`${percentUsage}%`}
          </span>

          {!isFlagshipApp() && <OffersLink storageData={storageData} />}
        </div>
      )}
    </Page>
  )
}

export default StorageView
