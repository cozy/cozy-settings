import semver from 'semver'

import flag from 'cozy-flags'

import { COZY_DESKTOP_SOFTWARE_ID } from 'lib/deviceConfigurationHelper'
import mobileIcon from 'assets/icons/icon-device-phone.svg'
import browserIcon from 'assets/icons/icon-device-browser.svg'
import laptopIcon from 'assets/icons/icon-device-laptop.svg'

const deviceKindToIcon = {
  mobile: mobileIcon,
  browser: browserIcon
}

export const getDeviceIcon = device => {
  return deviceKindToIcon[device.client_kind] || laptopIcon
}

const isCozyDesktopApp = device =>
  device.software_id === COZY_DESKTOP_SOFTWARE_ID

export const canConfigureDevice = device =>
  isCozyDesktopApp(device) &&
  semver.gte(device.software_version, '3.32.0-beta.3')

/**
 * Get subtitle translation key with interpolation value
 * @param {number} deviceCount Number of connected devices
 * @returns array with the translation key and an object of interpolation value
 */
export const getSubtitle = deviceCount => {
  const flagValue = flag('cozy.oauthclients.max')

  if (flagValue !== null && flagValue >= 0) {
    return [
      'DevicesView.header.subtitle',
      { smart_count: deviceCount, limit: flagValue }
    ]
  }

  return [
    'DevicesView.header.subtitle_without_flag',
    { smart_count: deviceCount }
  ]
}
