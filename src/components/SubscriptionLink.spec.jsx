import React from 'react'
import { render, screen } from '@testing-library/react'

import { isFlagshipApp } from 'cozy-device-helper'
import flag from 'cozy-flags'
import { useWebviewIntent } from 'cozy-intent'
import { useInstanceInfo } from 'cozy-client'

import { SubscriptionLink } from 'components/SubscriptionLink'

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  useInstanceInfo: jest.fn()
}))
jest.mock('cozy-device-helper', () => ({
  ...jest.requireActual('cozy-device-helper'),
  isFlagshipApp: jest.fn()
}))
jest.mock('cozy-flags')
jest.mock('cozy-intent', () => ({
  ...jest.requireActual('cozy-intent'),
  useWebviewIntent: jest.fn()
}))

describe('SubscriptionLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const setup = ({
    enablePremiumLinks = false,
    hasUuid = false,
    isFlagshipApp: isFlagshipAppReturnValue = false,
    isIapEnabled = null,
    isIapAvailable = null
  } = {}) => {
    useInstanceInfo.mockReturnValue({
      context: {
        data: {
          attributes: {
            enable_premium_links: enablePremiumLinks,
            manager_url: 'http://mycozy.cloud'
          }
        }
      },
      instance: {
        data: {
          attributes: { uuid: hasUuid ? '1223' : null }
        }
      }
    })

    isFlagshipApp.mockReturnValue(isFlagshipAppReturnValue)
    flag.mockReturnValue(isIapEnabled)
    useWebviewIntent.mockReturnValue({
      call: jest.fn().mockResolvedValue(isIapAvailable)
    })

    return render(<SubscriptionLink label="Subscribe" />)
  }

  it('should return null when there no link', () => {
    const { container } = setup()

    expect(container).toBeEmptyDOMElement()
  })

  it('should return null when has link but are not enable', () => {
    const { container } = setup({
      hasUuid: true
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should be display when prenium link are enabled and has a link', () => {
    setup({
      hasUuid: true,
      enablePremiumLinks: true
    })

    expect(screen.getByText('Subscribe')).toBeInTheDocument()
  })

  it('should return null when flashship', () => {
    const { container } = setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should return null when the flagship app has not IAP available and when the flag flagship.iap.enabled is false', () => {
    const { container } = setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true,
      isIapEnabled: false,
      isIapAvailable: false
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should return null when the flagship app has not IAP available and when the flag flagship.iap.enabled is true', () => {
    const { container } = setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true,
      isIapEnabled: true,
      isIapAvailable: false
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should be displayed when the flagship app has IAP available and when the flag flagship.iap.enabled is true', async () => {
    setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true,
      isIapEnabled: true,
      isIapAvailable: true
    })

    const premiumButton = await screen.findByText('Subscribe')
    expect(premiumButton).toBeInTheDocument()
  })
})
