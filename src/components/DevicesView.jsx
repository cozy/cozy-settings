import tableStyles from 'styles/table'
import viewStyles from 'styles/view'
import devicesStyles from 'styles/devices'

import classNames from 'classnames'

import React, { Component } from 'react'
import { translate } from 'cozy-ui/react/I18n'

import Loading from 'components/Loading'
import Empty from 'cozy-ui/react/Empty'
import { ButtonLink } from 'cozy-ui/react/Button'
import EmptyIcon from 'assets/icons/icon-devices.svg'

import DevicesModaleRevokeView from 'components/DevicesModaleRevokeView'

// for the icon, we show a phone if it's a phone, and a laptop in all other cases
const getDeviceKindClass = kind =>
  kind === 'mobile'
    ? tableStyles['set-device-phone']
    : tableStyles['set-device-laptop']

class DevicesView extends Component {
  componentWillMount() {
    this.props.fetchDevices()
  }

  render() {
    const {
      t,
      f,
      isFetching,
      devices,
      openDeviceRevokeModale,
      deviceToRevoke,
      onDeviceModaleRevoke,
      onDeviceModaleRevokeClose,
      devicePerformRevoke
    } = this.props
    return (
      <div role="contentinfo" className={devicesStyles['devices-view']}>
        <h2 className={viewStyles['set-view-title']}>
          {t('DevicesView.title')}
        </h2>
        {isFetching && <Loading />}
        {!isFetching &&
          devices.length === 0 && (
            <Empty
              icon={EmptyIcon}
              title={t('Empty.devices.title')}
              text={t('Empty.devices.text')}
            >
              <ButtonLink href={t('Empty.devices.link.href')} target>
                {t('Empty.devices.link.text')}
              </ButtonLink>
            </Empty>
          )}
        {!isFetching &&
          devices.length > 0 && (
            <div className={classNames(tableStyles['coz-table'])}>
              {openDeviceRevokeModale && (
                <DevicesModaleRevokeView
                  cancelAction={onDeviceModaleRevokeClose}
                  revokeDevice={devicePerformRevoke}
                  device={deviceToRevoke}
                />
              )}

              <div
                className={classNames(
                  tableStyles['coz-table-head'],
                  tableStyles['coz-table-row']
                )}
              >
                <div
                  className={classNames(
                    tableStyles['coz-table-header'],
                    tableStyles['set-table-name']
                  )}
                >
                  {t('DevicesView.head_name')}
                </div>
                <div
                  className={classNames(
                    tableStyles['coz-table-header'],
                    tableStyles['set-table-date']
                  )}
                >
                  {t('DevicesView.head_sync')}
                </div>
                <div
                  className={classNames(
                    tableStyles['coz-table-header'],
                    tableStyles['set-table-actions']
                  )}
                >
                  {t('DevicesView.head_actions')}
                </div>
              </div>
              <div
                className={classNames(
                  tableStyles['coz-table-body'],
                  tableStyles['set-table-devices']
                )}
              >
                <div>
                  {devices.map(device => (
                    <div
                      className={tableStyles['coz-table-row']}
                      key={device.id}
                    >
                      <div
                        className={classNames(
                          tableStyles['coz-table-cell'],
                          tableStyles['set-table-name'],
                          tableStyles['coz-table-primary'],
                          getDeviceKindClass(device.client_kind)
                        )}
                      >
                        {device.client_name}
                      </div>
                      <div
                        className={classNames(
                          tableStyles['coz-table-cell'],
                          tableStyles['set-table-date']
                        )}
                      >
                        {device.synchronized_at
                          ? f(
                              device.synchronized_at,
                              t('DevicesView.sync_date_format')
                            )
                          : '-'}
                      </div>
                      <div
                        className={classNames(
                          tableStyles['coz-table-cell'],
                          tableStyles['set-table-actions']
                        )}
                      >
                        <button
                          className={devicesStyles['coz-btn--revoke']}
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
  }
}

export default translate()(DevicesView)
