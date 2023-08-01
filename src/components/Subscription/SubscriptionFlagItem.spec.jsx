import React from 'react'
import { render, screen } from '@testing-library/react'

import { I18n } from 'cozy-ui/transpiled/react/I18n'
import PaperIcon from 'cozy-ui/transpiled/react/Icons/Paper'

import { SubscriptionFlagItem } from 'components/Subscription/SubscriptionFlagItem'
import en from 'locales/en.json'
import flag from 'cozy-flags'

jest.mock('cozy-flags')

describe('SubscriptionFlagItem', () => {
  const setup = ({ name = 'drive.office.write', returnValue = null } = {}) => {
    flag.mockReturnValue(returnValue)

    render(
      <I18n lang="en" dictRequire={() => en}>
        <SubscriptionFlagItem name={name} icon={PaperIcon} />
      </I18n>
    )
  }

  it('should display the label by default', () => {
    setup({ returnValue: true })

    expect(
      screen.getByText(
        'Online Office document editing (spreadsheet, word processing)'
      )
    ).toBeInTheDocument()
  })

  it('should display the label with the limit when the flag return a number', () => {
    setup({ name: 'mespapiers.papers.max', returnValue: 10 })

    expect(
      screen.getByText('Number of papers added manually: up to 10')
    ).toBeInTheDocument()
  })

  it('should display the label with ulimited when the flag return -1', () => {
    setup({ name: 'mespapiers.papers.max', returnValue: -1 })

    expect(
      screen.getByText('Number of papers added manually: unlimited')
    ).toBeInTheDocument()
  })

  it('should display the label with the limit when the flag related to account return a number', () => {
    setup({ name: 'harvest.accounts.max', returnValue: 10 })

    expect(
      screen.getByText(
        'Automatic document and data retrieval: up to 10 connected accounts'
      )
    ).toBeInTheDocument()
  })

  it('should display the label with ulimited when the flag related to account return -1', () => {
    setup({ name: 'harvest.accounts.max', returnValue: -1 })

    expect(
      screen.getByText(
        'Automatic document and data retrieval: unlimited connected account'
      )
    ).toBeInTheDocument()
  })
})