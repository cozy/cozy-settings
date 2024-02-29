import React, { useMemo, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import classNames from 'classnames'

import { isQueryLoading, useQuery } from 'cozy-client'
import Alerter from 'cozy-ui/transpiled/react/deprecated/Alerter'
import { useI18n } from 'cozy-ui/transpiled/react/providers/I18n'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import MuiButton from 'cozy-ui/transpiled/react/Button'
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell
} from 'cozy-ui/transpiled/react/Table'
import Icon from 'cozy-ui/transpiled/react/Icon'
import { Media, Img, Bd } from 'cozy-ui/transpiled/react/deprecated/Media'
import useBreakpoints from 'cozy-ui/transpiled/react/providers/Breakpoints'
import SyncIcon from 'cozy-ui/transpiled/react/Icons/Sync'
import flag from 'cozy-flags'

import { DevicesEmpty } from 'components/Devices/DevicesEmpty'
import { DevicesModaleRevokeView } from 'components/Devices/DevicesModaleRevokeView'
import DevicesModaleConfigureView from 'components/Devices/DevicesModaleConfigureView'
import Page from 'components/Page'
import { PageHeader } from 'components/PageHeader'
import {
  getDeviceIcon,
  canConfigureDevice,
  getSubtitle
} from 'components/Devices/helpers'
import { DevicesMoreMenu } from 'components/Devices/DevicesMoreMenu'
import { DISPLAYED_CLIENTS } from 'lib/deviceConfigurationHelper'
import { buildDevicesQuery } from 'lib/queries'
import tableStyles from 'styles/table.styl'
import { PremiumLink } from 'components/Premium/PremiumLink'

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
            .filter(
              device =>
                DISPLAYED_CLIENTS.includes(device.client_kind) &&
                !device.pending
            )
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

  const hasUnlimitedDevices = flag('cozy.oauthclients.max') === -1

  return (
    <Page
      withoutVerticalMargin={isMobile}
      fullHeight
      className="u-flex u-flex-column u-pb-3 u-mt-1-half-s"
    >
      <PageHeader
        title={t('DevicesView.header.title')}
        subtitle={!isFetching ? t(...getSubtitle(devices.length)) : null}
        actions={
          !hasUnlimitedDevices ? (
            <PremiumLink
              variant="secondary"
              label={t('DevicesView.header.subscribe')}
              fullWidth={false}
            />
          ) : null
        }
      />
      {isFetching ? (
        <Spinner
          className="u-pos-fixed-s"
          middle
          size="xxlarge"
          loadingType="loading"
        />
      ) : devices.length === 0 ? (
        <DevicesEmpty />
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
                      <DevicesMoreMenu
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

export { DevicesView }
