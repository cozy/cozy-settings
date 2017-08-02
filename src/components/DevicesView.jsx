import tableStyles from '../styles/table'
import viewStyles from '../styles/view'
import devicesStyles from '../styles/devices'

import classNames from 'classnames'

import React from 'react'
import { translate } from 'cozy-ui/react/helpers/i18n'

import Loading from './Loading'
import Empty from './Empty'

import DevicesModaleRevokeView from './DevicesModaleRevokeView'

// for the icon, we show a phone if it's a phone, and a laptop in all other cases
const getDeviceKindClass = kind => kind === 'mobile' ? tableStyles['set-device-phone'] : tableStyles['set-device-laptop']

const DevicesView = ({ t, f, isFetching, devices, openDeviceRevokeModale, deviceToRevoke, onDeviceModaleRevoke, onDeviceModaleRevokeClose, devicePerformRevoke }) => (
  <div role='contentinfo' className={devicesStyles['devices-view']}>
    <h2 className={viewStyles['set-view-title']}>{t('DevicesView.title')}</h2>
    { isFetching && <Loading /> }
    { !isFetching && devices.length === 0 && <Empty emptyType='devices' />}
    { !isFetching && devices.length > 0 && (
      <div className={classNames(
        tableStyles['coz-table']
      )}>
        {openDeviceRevokeModale &&
          <DevicesModaleRevokeView
            cancelAction={onDeviceModaleRevokeClose}
            revokeDevice={devicePerformRevoke}
            device={deviceToRevoke}
          />
        }

        <div className={classNames(tableStyles['coz-table-head'], tableStyles['coz-table-row'])}>
          <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-name'])}>{ t('DevicesView.head_name') }</div>
          <div className={classNames(tableStyles['coz-table-header'], tableStyles['set-table-actions'])}>{ t('DevicesView.head_actions') }</div>
        </div>
        <div className={classNames(tableStyles['coz-table-body'], tableStyles['set-table-devices'])}>
          <div>
            {devices
            .map(device => (
              <div className={tableStyles['coz-table-row']}>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-name'], tableStyles['coz-table-primary'], getDeviceKindClass(device.client_kind))}>
                  {device.client_name}
                </div>
                <div className={classNames(tableStyles['coz-table-cell'], tableStyles['set-table-actions'])}>
                  <button
                    className={classNames('coz-btn', devicesStyles['coz-btn--revoke'])}
                    onClick={() => {
                      onDeviceModaleRevoke(device)
                    }}
                  >
                    {t('DevicesView.revoke')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
)

export default translate()(DevicesView)
