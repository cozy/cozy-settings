import React, { useState } from 'react'
import classNames from 'classnames'

import tableStyles from 'styles/table.styl'

import MuiButton from 'cozy-ui/transpiled/react/MuiCozyTheme/Buttons'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/transpiled/react/Table'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/Media'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import DevicesModaleRevokeView from 'components/DevicesModaleRevokeView'
import DevicesModaleConfigureView from 'components/DevicesModaleConfigureView'

import SyncIcon from 'cozy-ui/transpiled/react/Icons/Sync'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import laptopIcon from '../../assets/icons/icon-device-laptop.svg'
import mobileIcon from '../../assets/icons/icon-device-phone.svg'
import browserIcon from '../../assets/icons/icon-device-browser.svg'
import { canConfigureDevice } from './helpers'
import MoreMenu from './DevicesViewMoreMenu'

const deviceKindToIcon = {
  mobile: mobileIcon,
  browser: browserIcon
}

const getDeviceIcon = device => {
  return deviceKindToIcon[device.client_kind] || laptopIcon
}

const DevicesViewTable = ({
  deviceToConfigure,
  setDeviceToConfigure,
  devices
}) => {
  const { t, f } = useI18n()
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const location = useLocation()
  const { isMobile } = useBreakpoints()

  const [deviceToRevoke, setDeviceToRevoke] = useState(null)

  const onDeviceConfigurationCanceled = () => {
    if (deviceId) {
      navigate(location.pathname.replace(`/${deviceId}`, ''))
    }
    setDeviceToConfigure(null)
  }
  const onDeviceConfigured = () => {
    if (deviceId) {
      navigate(location.pathname.replace(`/${deviceId}`, ''))
    }
    setDeviceToConfigure(null)
  }

  return (
    <Table className={tableStyles['coz-table']}>
      {deviceToRevoke != null ? (
        <DevicesModaleRevokeView
          cancelAction={() => {
            setDeviceToRevoke(null)
          }}
          onDeviceRevoked={() => {
            setDeviceToRevoke(null)
          }}
          device={deviceToRevoke}
        />
      ) : null}
      {deviceToConfigure != null ? (
        <DevicesModaleConfigureView
          cancelAction={onDeviceConfigurationCanceled}
          onDeviceConfigured={onDeviceConfigured}
          device={deviceToConfigure}
        />
      ) : null}
      <TableHead>
        <TableRow>
          <TableHeader className={tableStyles['set-table-name']}>
            {t('DevicesView.head_name')}
          </TableHeader>
          <TableHeader
            className={classNames(
              tableStyles['coz-table-header'],
              tableStyles['set-table-date']
            )}
          >
            {t('DevicesView.head_sync')}
          </TableHeader>
          <TableHeader
            className={classNames(
              tableStyles['coz-table-header'],
              tableStyles['set-table-actions']
            )}
          >
            {t('DevicesView.head_actions')}
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody className={tableStyles['set-table-devices']}>
        {devices.map(device => (
          <TableRow key={device.id} className={tableStyles['set-table-row']}>
            <TableCell
              className={classNames(
                tableStyles['set-table-name'],
                tableStyles['coz-table-primary']
              )}
            >
              <Media>
                <Img>
                  <Icon icon={getDeviceIcon(device)} size={32} />
                </Img>
                <Bd className="u-ml-1">
                  <span className={tableStyles['set-table-info-name']}>
                    {device.client_name}
                  </span>
                  {isMobile && (
                    <span className={tableStyles['set-table-info-date']}>
                      <Icon
                        icon={SyncIcon}
                        size={8}
                        color="var(--secondaryTextColor)"
                      />
                      {device.synchronized_at
                        ? f(
                            device.synchronized_at,
                            t('DevicesView.sync_date_format')
                          )
                        : '-'}
                    </span>
                  )}
                </Bd>
                {isMobile && (
                  <MoreMenu
                    device={device}
                    onRevoke={() => {
                      setDeviceToRevoke(device)
                    }}
                    onConfigure={() => {
                      setDeviceToConfigure(device)
                    }}
                    isMobile
                  />
                )}
              </Media>
            </TableCell>
            <TableCell className={tableStyles['set-table-date']}>
              {device.synchronized_at
                ? f(device.synchronized_at, t('DevicesView.sync_date_format'))
                : '-'}
            </TableCell>
            <TableCell className={tableStyles['set-table-actions']}>
              <>
                <MuiButton
                  color="primary"
                  onClick={() => {
                    setDeviceToRevoke(device)
                  }}
                >
                  {t('DevicesView.revoke')}
                </MuiButton>
                {canConfigureDevice(device) ? (
                  <MuiButton
                    color="primary"
                    onClick={() => {
                      setDeviceToConfigure(device)
                    }}
                  >
                    {t('DevicesView.configure')}
                  </MuiButton>
                ) : null}
              </>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default DevicesViewTable
