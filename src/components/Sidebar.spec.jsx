import { render } from '@testing-library/react'
import React from 'react'
import Sidebar from './Sidebar'
import flag from 'cozy-flags'

jest.mock('cozy-ui/transpiled/react/I18n', () => ({
  useI18n: () => ({ t: name => name })
}))
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  NavLink: ({ children }) => <div data-testid="NavLink">{children}</div>
}))
jest.mock('cozy-flags')

describe('Sidebar', () => {
  it('should display Permission table when flag is on', () => {
    // given
    flag.mockReturnValue(true)

    // when
    const { queryByText } = render(<Sidebar></Sidebar>)

    // then
    expect(queryByText('Nav.permissions')).toBeTruthy()
  })

  it('should not display Permission table when flag is off', () => {
    // given
    flag.mockReturnValue(false)

    // when
    const { queryByText } = render(<Sidebar></Sidebar>)

    // then
    expect(queryByText('Nav.permissions')).toBeFalsy()
  })
})
