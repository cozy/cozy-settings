import styles from '../styles/table'
import devicesStyles from '../styles/devices.styl'
import classNames from 'classnames'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

import Loading from './Loading'
import Empty from './Empty'

// for the icon, we show a phone if it's a phone, and a laptop in all other cases
const getDeviceKindClass = kind => kind === 'mobile' ? styles['set-device-phone'] : styles['set-device-laptop']

const DevicesView = ({ t, f, isFetching, devices }) => (
  <div className={devicesStyles['devices-view']}>
    <h2>{t('DevicesView.title')}</h2>
    { isFetching && <Loading /> }
    { !isFetching && devices.length === 0 && <Empty emptyType='devices' />}
    { devices.length > 0 && (
      <div className={classNames(
        styles['set-content-table']
      )}>
        <div className={styles['set-content-row']}>
          <div className={classNames(styles['set-content-header'], styles['set-content-primary'])}>{ t('DevicesView.head_name') }</div>
          <div className={classNames(styles['set-content-header'], styles['set-content-secondary'])}>{ t('DevicesView.head_activity') }</div>
          <div className={classNames(styles['set-content-header'], styles['set-content-secondary'])}>{ t('DevicesView.head_permissions') }</div>
          <div className={classNames(styles['set-content-header'])}>{ t('DevicesView.head_actions') }</div>
        </div>
        {devices.map(device => (
          <div className={styles['set-content-row']}>
            <div className={classNames(styles['set-content-cell'], styles['set-content-primary'], getDeviceKindClass(device.client_kind))}>
              {device.client_name}
            </div>
            <div className={classNames(styles['set-content-cell'], styles['set-content-secondary'])} />
            <div className={classNames(styles['set-content-cell'], styles['set-content-secondary'])} />
            <div className={classNames(styles['set-content-cell'])} />
          </div>
        ))}
      </div>
    )}
  </div>
)

export default translate()(DevicesView)
