import viewStyles from 'styles/view'
import styles from 'styles/storage'

import React, { Component } from 'react'

import classNames from 'classnames'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import OffersLink from 'components/OffersLink'

import { translate } from 'cozy-ui/transpiled/react/I18n'

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
      <div
        className={classNames(
          viewStyles['set-view-content'],
          viewStyles['set-view-content--narrow']
        )}
      >
        <h2 className={viewStyles['set-view-title']}>
          {t('StorageView.title')}
        </h2>
        <h3 className={viewStyles['set-view-subtitle']}>
          {t('StorageView.storage_title')}
        </h3>
        {isFetching && (
          <Spinner
            className={'u-pos-fixed-s'}
            middle
            size="xxlarge"
            loadingType={t('Loading.loading')}
          />
        )}
        {!isFetching &&
          storageData && (
            <div>
              <h2 className={viewStyles['set-view-title']}>
                {t('StorageView.storage_phrase', {
                  diskUsage,
                  diskQuota
                })}
              </h2>
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
      </div>
    )
  }
}

export default translate()(StorageView)
