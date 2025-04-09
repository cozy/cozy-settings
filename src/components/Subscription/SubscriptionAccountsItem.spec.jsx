import { render, screen } from '@testing-library/react'
import React from 'react'

import flag from 'cozy-flags'

import { SubscriptionAccountsItem } from '@/components/Subscription/SubscriptionAccountsItem'
import { TestI18n } from '@/test/AppLike'

jest.mock('cozy-flags')

describe('SubscriptionAccountsFlagItem', () => {
  const setup = ({ maxAccounts = null, offers = [] } = {}) => {
    flag.mockImplementation(flagName => {
      switch (flagName) {
        case 'harvest.accounts.max':
          return maxAccounts
        case 'harvest.accounts.offers.list':
          return offers
        default:
          return null
      }
    })

    return render(<SubscriptionAccountsItem />, { wrapper: TestI18n })
  }

  it('should display the label by default', () => {
    setup()

    expect(
      screen.getByText('Automatic document and data retrieval')
    ).toBeInTheDocument()
  })

  it('should display the label with the limit when the flag return a number', () => {
    setup({ maxAccounts: 10 })

    expect(
      screen.getByText(
        'Automatic document and data retrieval: 10 connected services'
      )
    ).toBeInTheDocument()
  })

  it('should display the label with ulimited when the flag return -1', () => {
    setup({ maxAccounts: -1 })

    expect(
      screen.getByText(
        'Automatic document and data retrieval: unlimited number of connected services'
      )
    ).toBeInTheDocument()
  })

  it('should display the label with credits if credits > 0', () => {
    setup({
      maxAccounts: 3,
      offers: [{ slug: '*', credit: 1, startsAt: '2023-10-01' }]
    })

    expect(
      screen.getByText(
        'Automatic document and data retrieval: 4 connected services (3 included in the offer + 1 offered)'
      )
    ).toBeInTheDocument()
  })
})
