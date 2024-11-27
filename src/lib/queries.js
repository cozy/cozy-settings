import CozyClient, { Q } from 'cozy-client'
import {
  APPS_DOCTYPE,
  KONNECTORS_DOCTYPE,
  REMOTE_REQUEST_DOCTYPES,
  SETTINGS_DOCTYPE,
  OAUTH_CLIENTS_DOCTYPE
} from '@/doctypes'

const FIVE_MINUTES = 5 * 60 * 1000

export const buildAppsQueryBySlug = slugName => ({
  definition: Q(APPS_DOCTYPE).getById(`${APPS_DOCTYPE}/${slugName}`),
  options: {
    as: `${APPS_DOCTYPE}/${slugName}`,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES),
    singleDocData: true
  }
})

export const buildKonnectorsQueryBySlug = slugName => ({
  definition: Q(KONNECTORS_DOCTYPE).getById(
    `${KONNECTORS_DOCTYPE}/${slugName}`
  ),
  options: {
    as: `${KONNECTORS_DOCTYPE}/${slugName}`,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES),
    singleDocData: true
  }
})

export const buildRemoteRequestsQuery = () => ({
  definition: Q(REMOTE_REQUEST_DOCTYPES),
  options: {
    as: REMOTE_REQUEST_DOCTYPES,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES)
  }
})

export const buildAppsQuery = () => ({
  definition: Q(APPS_DOCTYPE),
  options: {
    as: APPS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES)
  }
})

export const buildKonnectorsQuery = () => ({
  definition: Q(KONNECTORS_DOCTYPE),
  options: {
    as: KONNECTORS_DOCTYPE,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES)
  }
})

export const buildHomeSettingsQuery = () => ({
  definition: Q('io.cozy.home.settings').limitBy(1),
  options: {
    as: 'io.cozy.home.settings',
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES)
  }
})

export const buildSettingsInstanceQuery = () => ({
  definition: Q(SETTINGS_DOCTYPE).getById('io.cozy.settings.instance'),
  options: {
    as: `${SETTINGS_DOCTYPE}/io.cozy.settings.instance`,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES),
    singleDocData: true
  }
})

export const buildDiskUsageQuery = () => ({
  definition: () => Q(SETTINGS_DOCTYPE).getById('disk-usage'),
  options: {
    as: `${SETTINGS_DOCTYPE}/disk-usage`,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES),
    singleDocData: true
  }
})

export const buildContextQuery = () => ({
  definition: () => Q(SETTINGS_DOCTYPE).getById('context'),
  options: {
    as: `${SETTINGS_DOCTYPE}/context`,
    fetchPolicy: CozyClient.fetchPolicies.olderThan(FIVE_MINUTES),
    singleDocData: true
  }
})

const DEVICES_QUERY_LIMIT = 1000
export const buildDevicesQuery = () => ({
  definition: () => Q(OAUTH_CLIENTS_DOCTYPE).limitBy(DEVICES_QUERY_LIMIT),
  options: {
    as: `${OAUTH_CLIENTS_DOCTYPE} _id asc`
  }
})

// This query don't have realtime updates so we always need to fetch it
// as update can append in background
export const buildExternalTiesQuery = () => ({
  definition: () =>
    Q(SETTINGS_DOCTYPE).getById('io.cozy.settings.external-ties'),
  options: {
    as: `${SETTINGS_DOCTYPE}/io.cozy.settings.external-ties`,
    singleDocData: true
  }
})
