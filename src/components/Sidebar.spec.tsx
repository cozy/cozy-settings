import React, { ReactChild } from 'react'
import { render } from '@testing-library/react'

import flag from 'cozy-flags'

import Sidebar from 'components/Sidebar'

const mockFlag = flag as jest.MockedFunction<typeof flag>

jest.mock('cozy-ui/transpiled/react/providers/I18n', () => ({
  useI18n: (): {
    t: (name: string) => string
  } => ({ t: name => name })
}))

jest.mock('react-router-dom', () => ({
  NavLink: ({ children }: { children: ReactChild }): JSX.Element => (
    <div data-testid="NavLink">{children}</div>
  )
}))

jest.mock('cozy-flags')

jest.mock('cozy-ui/transpiled/react/providers/Breakpoints', () => ({
  __esModule: true,
  default: (): {
    isMobile: boolean
    isTablet: boolean
  } => ({ isMobile: false, isTablet: false })
}))

describe('Sidebar', () => {
  it('should display Permission table when flag is on', () => {
    // given
    mockFlag.mockReturnValue(true)

    // when
    const { queryByText } = render(<Sidebar />)

    // then
    expect(queryByText('Nav.permissions')).toBeTruthy()
  })

  it('should not display Permission table when flag is off', () => {
    // given
    mockFlag.mockReturnValue(false)

    // when
    const { queryByText } = render(<Sidebar />)

    // then
    expect(queryByText('Nav.permissions')).toBeFalsy()
  })
})
