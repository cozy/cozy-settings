import React, { useState } from 'react'
import classNames from 'classnames'

import tableStyles from 'styles/table.styl'

import {
  Table,
  TableHead,
  TableRow,
  TableHeader
} from 'cozy-ui/transpiled/react/Table'
import Icon from 'cozy-ui/transpiled/react/Icon'

import DevicesModaleRevokeView from 'components/DevicesModaleRevokeView'
import DevicesModaleConfigureView from 'components/DevicesModaleConfigureView'

import SyncIcon from 'cozy-ui/transpiled/react/Icons/Sync'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import laptopIcon from '../../assets/icons/icon-device-laptop.svg'
import mobileIcon from '../../assets/icons/icon-device-phone.svg'
import browserIcon from '../../assets/icons/icon-device-browser.svg'
import MoreMenu from './DevicesViewMoreMenu'
import List from 'cozy-ui/react/Icons/List'
import ListItem from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItem'
import ListItemIcon from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemIcon'
import ListItemText from 'cozy-ui/transpiled/react/ListItemText'
import ListItemSecondaryAction from 'cozy-ui/transpiled/react/MuiCozyTheme/ListItemSecondaryAction'

import Divider from 'cozy-ui/transpiled/react/MuiCozyTheme/Divider'

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
      <List>
        {devices.map(device => (
          <>
            <ListItem button key={device.client_name}>
              <ListItemIcon>
                <Icon icon={getDeviceIcon(device)} size={32} />
              </ListItemIcon>
              <ListItemText primary={device.client_name} />
              <ListItemText secondary="metadata">
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
              </ListItemText>
              <ListItemSecondaryAction>
                <MoreMenu
                  device={device}
                  onRevoke={() => setDeviceToRevoke(device)}
                  onConfigure={() => setDeviceToConfigure(device)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider component="li" variant="inset" />
          </>
        ))}
      </List>
    </Table>
  )
}

export default DevicesViewTable
