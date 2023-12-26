import React from 'react'
import { render, screen } from '@testing-library/react'

import { isFlagshipApp } from 'cozy-device-helper'
import flag from 'cozy-flags'

import { SubscriptionLink } from 'components/SubscriptionLink'
import { useInstanceInfo } from 'cozy-client'

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  useInstanceInfo: jest.fn()
}))
jest.mock('cozy-device-helper', () => ({
  ...jest.requireActual('cozy-device-helper'),
  isFlagshipApp: jest.fn()
}))
jest.mock('cozy-flags')

describe('SubscriptionLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const setup = ({
    enablePremiumLinks = false,
    hasUuid = false,
    isFlagshipApp: isFlagshipAppReturnValue = false,
    isIapEnabled = null
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

  it('should return null when flashship and flag flagship.iap.enabled set to false', () => {
    const { container } = setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true,
      isIapEnabled: false
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should be display when flashship and flag flagship.iap.enabled set to true', () => {
    setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true,
      isIapEnabled: true
    })

    expect(screen.getByText('Subscribe')).toBeInTheDocument()
  })
})
