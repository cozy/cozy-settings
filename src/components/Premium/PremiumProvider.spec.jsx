import { render, screen } from '@testing-library/react'
import React from 'react'

import { useInstanceInfo } from 'cozy-client'
import { isFlagshipApp } from 'cozy-device-helper'
import flag from 'cozy-flags'
import { useWebviewIntent } from 'cozy-intent'

import {
  PremiumProvider,
  usePremium
} from '@/components/Premium/PremiumProvider'

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

describe('PremiumProvider', () => {
  const setup = ({
    enablePremiumLinks = false,
    hasUuid = false,
    isFlagshipApp: isFlagshipAppReturnValue = false,
    isIapEnabled = null,
    isIapAvailable = null
  } = {}) => {
    useInstanceInfo.mockReturnValue({
      isLoaded: true,
      context: {
        data: {
          enable_premium_links: enablePremiumLinks,
          manager_url: 'http://mycozy.cloud'
        }
      },
      instance: {
        data: {
          uuid: hasUuid ? '1223' : null
        }
      }
    })

    isFlagshipApp.mockReturnValue(isFlagshipAppReturnValue)
    flag.mockReturnValue(isIapEnabled)
    useWebviewIntent.mockReturnValue({
      call: jest.fn().mockResolvedValue(isIapAvailable)
    })

    const ChildComponent = () => {
      const premiumData = usePremium()

      return (
        <div>
          <span>Is loaded: {premiumData.isLoaded.toString()}</span>
          <span>Has IAP: {premiumData.hasIAP.toString()}</span>
          <span>
            Can open premium link: {premiumData.canOpenPremiumLink.toString()}
          </span>
          <span>Premium link: {premiumData.premiumLink}</span>
        </div>
      )
    }

    render(
      <PremiumProvider>
        <ChildComponent />
      </PremiumProvider>
    )
  }

  it('should be true when prenium link are enabled and has a link', async () => {
    setup({
      hasUuid: true,
      enablePremiumLinks: true
    })

    await screen.findByText('Is loaded: true')
    expect(screen.getByText('Has IAP: false')).toBeInTheDocument()
    expect(screen.getByText('Can open premium link: true')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Premium link: http://mycozy.cloud/cozy/instances/1223/premium?lang=en'
      )
    ).toBeInTheDocument()
  })

  it('should be false when on flashship', async () => {
    setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true
    })

    await screen.findByText('Is loaded: true')
    expect(screen.getByText('Has IAP: false')).toBeInTheDocument()
    expect(screen.getByText('Can open premium link: false')).toBeInTheDocument()
  })

  it('should return null when the flagship app has not IAP available and when the flag flagship.iap.enabled is false', async () => {
    setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true,
      isIapEnabled: false,
      isIapAvailable: false
    })

    await screen.findByText('Is loaded: true')
    expect(screen.getByText('Has IAP: false')).toBeInTheDocument()
    expect(screen.getByText('Can open premium link: false')).toBeInTheDocument()
  })

  it('should return null when the flagship app has not IAP available and when the flag flagship.iap.enabled is true', async () => {
    setup({
      hasUuid: true,
      enablePremiumLinks: true,
      isFlagshipApp: true,
      isIapEnabled: true,
      isIapAvailable: false
    })

    await screen.findByText('Is loaded: true')
    expect(screen.getByText('Has IAP: false')).toBeInTheDocument()
    expect(screen.getByText('Can open premium link: false')).toBeInTheDocument()
  })
})
