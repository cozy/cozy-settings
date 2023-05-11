import CozyClient, { Q } from 'cozy-client'
import {
  APPS_DOCTYPE,
  KONNECTORS_DOCTYPE,
  REMOTE_REQUEST_DOCTYPES,
  SETTINGS_DOCTYPE
} from 'doctypes'

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
