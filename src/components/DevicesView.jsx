import styles from '../styles/table'
import devicesStyles from '../styles/devices.styl'
import classNames from 'classnames'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

const DevicesView = ({ t, f, isFetching, devices }) => (
  <div className={devicesStyles['devices-view']}>
    { isFetching && <p>Loading...</p> }
    <h2>{t('DevicesView.title')}</h2>
    <div className={classNames(
      styles['set-content-table']
    )}>
      <div className={styles['set-content-row']}>
        <div className={classNames(styles['set-content-header'], styles['set-content-file'])}>{ t('DevicesView.head_name') }</div>
        <div className={classNames(styles['set-content-header'], styles['set-content-date'])}>{ t('DevicesView.head_activity') }</div>
        <div className={classNames(styles['set-content-header'], styles['set-content-size'])}>{ t('DevicesView.head_permissions') }</div>
        <div className={classNames(styles['set-content-header'], styles['set-content-status'])}>{ t('DevicesView.head_actions') }</div>
      </div>
      {devices.map(device => (
      <div className={styles['set-content-row']}>
        <div className={classNames(styles['set-content-cell'], styles['set-content-file'], device.client_kind === 'mobile' ? styles['set-device-phone'] : styles['set-device-laptop'])}>
          {device.client_name}
        </div>
        <div className={classNames(styles['set-content-cell'], styles['set-content-date'])}>

        </div>
        <div className={classNames(styles['set-content-cell'], styles['set-content-size'])}>

        </div>
        <div className={classNames(styles['set-content-cell'])}>
          <button className={classNames(devicesStyles['coz-btn--revoke'])}>
            revoke
          </button>
        </div>
      </div>
      ))}
    </div>
  </div>
)

export default translate()(DevicesView)
