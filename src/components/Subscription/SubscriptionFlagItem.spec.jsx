import React from 'react'
import { render, screen } from '@testing-library/react'

import flag from 'cozy-flags'
import PaperIcon from 'cozy-ui/transpiled/react/Icons/Paper'

import { TestI18n } from '@/test/AppLike'
import { SubscriptionFlagItem } from '@/components/Subscription/SubscriptionFlagItem'

jest.mock('cozy-flags')

describe('SubscriptionFlagItem', () => {
  const setup = ({
    name = 'drive.office.write',
    returnValue = null,
    hideWithoutFlag = false
  } = {}) => {
    flag.mockReturnValue(returnValue)

    return render(
      <SubscriptionFlagItem
        name={name}
        icon={PaperIcon}
        hideWithoutFlag={hideWithoutFlag}
      />,
      { wrapper: TestI18n }
    )
  }

  it('should display the label by default', () => {
    setup({ returnValue: true })

    expect(
      screen.getByText(
        'Online Office documents editor (word processing, spreadsheet, and presentation)'
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

  it('should hide the label when the flag unset and hideWithoutFlag is true', () => {
    const { container } = setup({
      name: 'mespapiers.papers.max',
      returnValue: null,
      hideWithoutFlag: true
    })

    expect(container).toBeEmptyDOMElement()
  })

  it('should display the label when the flag has a value and hideWithoutFlag is true', () => {
    setup({
      name: 'mespapiers.papers.max',
      returnValue: 3,
      hideWithoutFlag: true
    })

    expect(
      screen.getByText('Number of papers added manually: up to 3')
    ).toBeInTheDocument()
  })
})
