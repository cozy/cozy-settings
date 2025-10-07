import semver from 'semver'

import { canConfigureDevice } from './helpers'

import { COZY_DESKTOP_SOFTWARE_ID } from '@/lib/deviceConfigurationHelper'

jest.mock('semver', () => ({
  gte: jest.fn()
}))

describe('canConfigureDevice', () => {
  const desktopDevice = {
    software_id: COZY_DESKTOP_SOFTWARE_ID,
    software_version: '3.32.0-beta.3'
  }

  const nonDesktopDevice = {
    software_id: 'other-software-id',
    software_version: '3.32.0-beta.3'
  }

  const oldVersionDevice = {
    software_id: COZY_DESKTOP_SOFTWARE_ID,
    software_version: '3.31.0'
  }

  const missingVersionDevice = {
    software_id: COZY_DESKTOP_SOFTWARE_ID
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return true for desktop device with sufficient version', () => {
    semver.gte.mockReturnValue(true)
    expect(canConfigureDevice(desktopDevice)).toBe(true)
    expect(semver.gte).toHaveBeenCalledWith('3.32.0-beta.3', '3.32.0-beta.3')
  })

  it('should return false for non-desktop device', () => {
    semver.gte.mockReturnValue(true)
    expect(canConfigureDevice(nonDesktopDevice)).toBe(false)
    expect(semver.gte).not.toHaveBeenCalled()
  })

  it('should return false for desktop device with insufficient version', () => {
    semver.gte.mockReturnValue(false)
    expect(canConfigureDevice(oldVersionDevice)).toBe(false)
    expect(semver.gte).toHaveBeenCalledWith('3.31.0', '3.32.0-beta.3')
  })

  it('should return false for desktop device with missing version', () => {
    expect(canConfigureDevice(missingVersionDevice)).toBe(false)
    expect(semver.gte).not.toHaveBeenCalled()
  })
})
