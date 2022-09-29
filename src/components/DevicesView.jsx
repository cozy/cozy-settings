import React, { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'
import Spinner from 'cozy-ui/transpiled/react/Spinner'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

import NoDevicesMessage from 'components/NoDevicesMessage'
import Page from 'components/Page'
import PageTitle from 'components/PageTitle'

import { Q, isQueryLoading, useQuery } from 'cozy-client'

import {
  DISPLAYED_CLIENTS,
  OAUTH_CLIENTS_DOCTYPE
} from 'lib/deviceConfigurationHelper'
import DevicesViewTable from './DevicesView/DevicesViewTable'

const DEVICES_QUERY_LIMIT = 1000
const buildDevicesQuery = () => ({
  definition: () => Q(OAUTH_CLIENTS_DOCTYPE).limitBy(DEVICES_QUERY_LIMIT),
  options: {
    as: `${OAUTH_CLIENTS_DOCTYPE} _id asc`
  }
})

const DevicesView = () => {
  const { t, lang } = useI18n()
  const { deviceId } = useParams()
  const { isMobile } = useBreakpoints()

  const [deviceToConfigure, setDeviceToConfigure] = useState(null)

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
        <DevicesViewTable
          devices={devices}
          deviceToConfigure={deviceToConfigure}
          setDeviceToConfigure={setDeviceToConfigure}
        />
      )}
    </Page>
  )
}

export default DevicesView
