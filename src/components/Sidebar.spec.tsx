import React, { ReactChild } from 'react'
import { render, screen } from '@testing-library/react'

import flag from 'cozy-flags'

import Sidebar from 'components/Sidebar'
import AppLike from 'test/AppLike'

const mockFlag = flag as jest.MockedFunction<typeof flag>

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ children }: { children: ReactChild }): JSX.Element => (
    <div data-testid="NavLink">{children}</div>
  )
}))

jest.mock('cozy-flags')

jest.mock('components/Premium/PremiumProvider', () => ({
  usePremium: jest.fn(() => ({ isPremium: false }))
}))

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  __esModule: true,
  useInstanceInfo: jest.fn(() => ({
    isLoaded: true,
    instance: { data: {} },
    diskUsage: { data: { used: 100, quota: 200 } }
  }))
}))

describe('Sidebar', () => {
  const setup = (): void => {
    render(
      <AppLike>
        <Sidebar />
      </AppLike>
    )
  }

  it('should be rendered correctly', () => {
    setup()

    screen.getByText('Connected devices')
    screen.getByText('Storage')
    screen.getByText('Web connections')
  })

  it('should display Permission table when flag is on', () => {
    // given
    mockFlag.mockReturnValue(true)

    // when
    setup()

    // then
    screen.getByText('Permissions')
  })

  it('should not display Permission table when flag is off', () => {
    // given
    mockFlag.mockReturnValue(false)

    // when
    setup()

    // then
    expect(screen.queryByText('Permissions')).toBeNull()
  })
})
