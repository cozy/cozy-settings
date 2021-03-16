import React, { Component } from 'react'
import classNames from 'classnames'

import Typography from 'cozy-ui/transpiled/react/Typography'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { translate } from 'cozy-ui/transpiled/react/I18n'

import styles from 'styles/storage.styl'
import OffersLink from 'components/OffersLink'

import Page from 'components/Page'
import PageTitle from 'components/PageTitle'

class StorageView extends Component {
  componentWillMount() {
    this.props.fetchStorageData()
  }

  render() {
    const { t, isFetching, storageData } = this.props
    const diskQuota = Number.isInteger(storageData.quota)
      ? (storageData.quota / (1000 * 1000 * 1000)).toFixed(2)
      : storageData.quota
    const diskUsage = Number.isInteger(storageData.usage)
      ? (storageData.usage / (1000 * 1000 * 1000)).toFixed(2)
      : storageData.usage
    const percent = (diskUsage / diskQuota) * 100
    return (
      <Page narrow>
        <PageTitle>{t('StorageView.title')}</PageTitle>
        <Typography variant="h5" gutterBottom>
          {t('StorageView.storage_title')}
        </Typography>
        {isFetching && (
          <Spinner
            className={'u-pos-fixed-s'}
            middle
            size="xxlarge"
            loadingType="loading"
          />
        )}
        {!isFetching && storageData && (
          <div>
            <Typography variant="h4" gutterBottom>
              {t('StorageView.storage_phrase', {
                diskUsage,
                diskQuota
              })}
            </Typography>
            <progress
              className={styles['set-storage-bar']}
              value={diskUsage}
              max={diskQuota}
              min="0"
            />
            <span
              className={classNames(
                styles['set-bar-percent'],
                percent < 5 ? styles['--dark'] : ''
              )}
            >
              {`${percent.toFixed(2)}%`}
            </span>
            <OffersLink storageData={storageData} />
          </div>
        )}
      </Page>
    )
  }
}

export default translate()(StorageView)
