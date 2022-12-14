import React, { Component } from 'react'
import classNames from 'classnames'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import Typography from 'cozy-ui/transpiled/react/Typography'
import { isFlagshipApp } from 'cozy-device-helper'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import styles from 'styles/storage.styl'
import OffersLink from 'components/OffersLink'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'
import { makeDiskInfos } from 'lib/makeDiskInfos'

class StorageView extends Component {
  UNSAFE_componentWillMount() {
    this.props.fetchStorageData()
  }

  render() {
    const { t, isFetching, storageData } = this.props
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
}

export default translate()(StorageView)
