import React, { useCallback, useMemo, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import tableStyles from 'styles/table.styl'

import flag from 'cozy-flags'
import semver from 'semver'

import ActionMenu, {
  ActionMenuHeader,
  ActionMenuItem
} from 'cozy-ui/transpiled/react/ActionMenu'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import IconButton from 'cozy-ui/transpiled/react/IconButton'
import DotsIcon from 'cozy-ui/transpiled/react/Icons/Dots'
import GearIcon from 'cozy-ui/transpiled/react/Icons/Gear'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
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
import TrashIcon from 'cozy-ui/transpiled/react/Icons/Trash'
import Typography from 'cozy-ui/transpiled/react/Typography'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import NoDevicesMessage from 'components/NoDevicesMessage'
import DevicesModaleRevokeView from 'components/DevicesModaleRevokeView'
import DevicesModaleConfigureView from 'components/DevicesModaleConfigureView'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'

import mobileIcon from 'assets/icons/icon-device-phone.svg'
import browserIcon from 'assets/icons/icon-device-browser.svg'
import laptopIcon from 'assets/icons/icon-device-laptop.svg'
import SyncIcon from 'cozy-ui/transpiled/react/Icons/Sync'

import { Q, isQueryLoading, useQuery } from 'cozy-client'

import {
  COZY_DESKTOP_SOFTWARE_ID,
  DISPLAYED_CLIENTS,
  OAUTH_CLIENTS_DOCTYPE
} from 'lib/deviceConfigurationHelper'

const DEVICES_QUERY_LIMIT = 1000
const buildDevicesQuery = () => ({
  definition: () => Q(OAUTH_CLIENTS_DOCTYPE).limitBy(DEVICES_QUERY_LIMIT),
  options: {
    as: `${OAUTH_CLIENTS_DOCTYPE} _id asc`
  }
})

const deviceKindToIcon = {
  mobile: mobileIcon,
  browser: browserIcon
}

const getDeviceIcon = device => {
  return deviceKindToIcon[device.client_kind] || laptopIcon
}

const isCozyDesktopApp = device =>
  device.software_id === COZY_DESKTOP_SOFTWARE_ID
const canConfigureDevice = device =>
  isCozyDesktopApp(device) &&
  semver.gte(device.software_version, '3.32.0-beta.3') &&
  flag('settings.partial-desktop-sync.show-synced-folders-selection')

const MoreButton = ({ onClick }) => {
  const { t } = useI18n()
  return (
    <IconButton
      theme="secondary"
      extension="narrow"
      size="small"
      label={t('Toolbar.more')}
      onClick={onClick}
    >
      <Icon icon={DotsIcon} />
    </IconButton>
  )
}
const MoreMenuItem = ({ onClick, icon, color, text, className }) => (
  <ActionMenuItem
    className={className}
    onClick={onClick}
    left={<Icon icon={icon} color={`var(--${color}Color)`} />}
  >
    <Typography
      variant="body1"
      color={color}
      style={{
        textTransform: 'capitalize'
      }}
      className="u-ml-half"
    >
      {text}
    </Typography>
  </ActionMenuItem>
)
const MoreMenu = ({ device, onRevoke, onConfigure, isMobile }) => {
  const { f, t } = useI18n()

  const [menuIsVisible, setMenuVisible] = useState(false)

  const openMenu = useCallback(() => setMenuVisible(true), [setMenuVisible])
  const closeMenu = useCallback(() => setMenuVisible(false), [setMenuVisible])
  const toggleMenu = useCallback(() => {
    if (menuIsVisible) return closeMenu()
    openMenu()
  }, [closeMenu, openMenu, menuIsVisible])
  return (
    <>
      <MoreButton onClick={toggleMenu} />
      {isMobile && menuIsVisible ? (
        <ActionMenu onClose={closeMenu} autoclose>
          <ActionMenuHeader className={tableStyles['action-menu-header']}>
            <Media>
              <Img>
                <Icon icon={getDeviceIcon(device)} size={32} />
              </Img>
              <Bd className="u-ml-1">
                <Typography variant="h6">{device.client_name}</Typography>
                <Typography variant="caption" color="textSecondary">
                  <Icon
                    icon={SyncIcon}
                    size={8}
                    color="var(--secondaryTextColor)"
                  />
                  {/* eslint-disable-next-line no-irregular-whitespace */}
                  <span className={tableStyles['more-menu-infos']}>
                    {device.synchronized_at
                      ? f(
                          device.synchronized_at,
                          t('DevicesView.sync_date_format')
                        )
                      : '-'}
                  </span>
                </Typography>
              </Bd>
            </Media>
          </ActionMenuHeader>
          {canConfigureDevice(device) ? (
            <MoreMenuItem
              className={tableStyles['action-menu-item']}
              onClick={onConfigure}
              icon={GearIcon}
              text={t('DevicesView.configure')}
            />
          ) : null}
          <MoreMenuItem
            className={tableStyles['action-menu-item']}
            onClick={onRevoke}
            icon={TrashIcon}
            color="error"
            text={t('DevicesView.revoke')}
          />
        </ActionMenu>
      ) : null}
    </>
  )
}

const DevicesView = () => {
  const { t, f, lang } = useI18n()
  const navigate = useNavigate()
  const { deviceId } = useParams()
  const location = useLocation()
  const { isMobile } = useBreakpoints()

  const [deviceToConfigure, setDeviceToConfigure] = useState(null)
  const [deviceToRevoke, setDeviceToRevoke] = useState(null)

  const devicesQuery = buildDevicesQuery()
  const { data, hasMore, fetchMore, fetchStatus } = useQuery(
    devicesQuery.definition,
    devicesQuery.options
  )
  const devices = useMemo(
    () =>
      Array.isArray(data)
        ? data
            .filter(device => DISPLAYED_CLIENTS.includes(device.client_kind))
            .sort((a, b) => {
              return a.client_name.localeCompare(b.client_name, lang, {
                sensitivity: 'base',
                numeric: true
              })
            })
        : [],
    [data, lang]
  )
  const isFetching = useMemo(
    () => isQueryLoading({ fetchStatus }) || hasMore,
    [fetchStatus, hasMore]
  )

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

  useMemo(() => {
    if (fetchStatus === 'failed') {
      Alerter.error(t('DevicesView.load_error'))
    } else if (hasMore) {
      fetchMore()
    } else if (deviceId && !isFetching) {
      const device = devices.find(d => d.id === deviceId)
      if (device != null && deviceToConfigure == null) {
        setDeviceToConfigure(device)
      } else if (device == null) {
        Alerter.error(t('DevicesView.device_load_error'))
      }
    }
  }, [
    fetchStatus,
    hasMore,
    deviceId,
    isFetching,
    t,
    fetchMore,
    devices,
    deviceToConfigure
  ])

  return (
    <Page
      narrow={!isFetching && devices.length === 0}
      withoutMarginTop={isMobile}
    >
      <PageTitle>{t('DevicesView.title')}</PageTitle>
      {isFetching ? (
        <Spinner
          className="u-pos-fixed-s"
          middle
          size="xxlarge"
          loadingType="loading"
        />
      ) : devices.length === 0 ? (
        <NoDevicesMessage />
      ) : (
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
              <TableRow
                key={device.id}
                className={tableStyles['set-table-row']}
              >
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
                    ? f(
                        device.synchronized_at,
                        t('DevicesView.sync_date_format')
                      )
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
      )}
    </Page>
  )
}

export default DevicesView
