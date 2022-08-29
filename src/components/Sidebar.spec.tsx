import { render } from '@testing-library/react'
import React, { ReactChild } from 'react'
import Sidebar from './Sidebar'
import flag from 'cozy-flags'

const mockFlag = flag as jest.MockedFunction<typeof flag>

jest.mock('cozy-ui/transpiled/react/I18n', () => ({
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

describe('Sidebar', () => {
  it('should display Permission table when flag is on', () => {
    // given
    mockFlag.mockReturnValueOnce(true)

    // when
    const { queryByText } = render(<Sidebar />)

    // then
    expect(queryByText('Nav.permissions')).toBeTruthy()
  })

  it('should not display Permission table when flag is off', () => {
    // given
    mockFlag.mockReturnValueOnce(false)

    // when
    const { queryByText } = render(<Sidebar />)

    // then
    expect(queryByText('Nav.permissions')).toBeFalsy()
  })
})
