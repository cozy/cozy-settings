import viewStyles from '../styles/view'
import styles from '../styles/storage'

import React, { Component } from 'react'

import Alerter from 'cozy-ui/react/Alerter'
import classNames from 'classnames'
import Loading from './Loading'

import { translate } from 'cozy-ui/react/I18n'
import { ButtonLink } from 'cozy-ui/react/Button'

class StorageView extends Component {
  componentWillMount () {
    this.props.fetchStorageData()
  }

  render () {
    const { t, isFetching, storageData } = this.props
    const diskQuota = Number.isInteger(storageData.quota)
      ? (storageData.quota / (1000 * 1000 * 1000)).toFixed(2)
      : storageData.quota
    const diskUsage = Number.isInteger(storageData.usage)
      ? (storageData.usage / (1000 * 1000 * 1000)).toFixed(2)
      : storageData.usage
    const percent = diskUsage / diskQuota * 100
    return (
      <div className={classNames(viewStyles['set-view-content'], viewStyles['set-view-content--narrow'])}>
        <h2 className={viewStyles['set-view-title']}>
          {t('StorageView.title')}
        </h2>
        <h3 className={viewStyles['set-view-subtitle']}>
          {t('StorageView.storage_title')}
        </h3>
        {isFetching && <Loading />}
        {!isFetching &&
          storageData && (
            <div>
              <h2
                className={viewStyles['set-view-title']}
              >{t('StorageView.storage_phrase', {
                diskUsage,
                diskQuota
              })}
              </h2>
              <progress
                className={styles['set-storage-bar']}
                value={diskUsage} max={diskQuota} min='0'
              />
              <span
                className={classNames(styles['set-bar-percent'], percent < 5 ? styles['--dark'] : '')}
              >
                {`${percent.toFixed(2)}%`}
              </span>
              {storageData.offersLink &&
                <div>
                  <h3 className={viewStyles['set-view-subtitle']}>
                    {t('StorageView.more_space')}
                  </h3>
                  <ButtonLink
                    theme='regular'
                    className={styles['set-offer-button']}
                    href={storageData.offersLink}
                    target
                  >
                    {t('StorageView.see_offer')}
                  </ButtonLink>
                </div>
              }
            </div>
          )
        }
      </div>
    )
  }
}

export default translate()(StorageView)
