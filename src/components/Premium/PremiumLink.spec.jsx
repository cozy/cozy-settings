import { render, screen } from '@testing-library/react'
import React from 'react'

import { PremiumLink } from '@/components/Premium/PremiumLink'
import { usePremium } from '@/components/Premium/PremiumProvider'

jest.mock('@/components/Premium/PremiumProvider', () => ({
  usePremium: jest.fn()
}))

describe('PremiumLink', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const setup = ({ canOpenPremiumLink = false, premiumLink = null } = {}) => {
    usePremium.mockReturnValue({
      canOpenPremiumLink,
      premiumLink
    })

    return render(<PremiumLink label="Subscribe" />)
  }

  it("should return null when user don't have a premium link", () => {
    const { container } = setup()

    expect(container).toBeEmptyDOMElement()
  })

  it("should return null when user can't open a premium link", () => {
    const { container } = setup({
      premiumLink: 'link'
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should return null when there no link', () => {
    setup({
      canOpenPremiumLink: true,
      premiumLink: 'link'
    })

    screen.getByText('Subscribe')
  })
})
