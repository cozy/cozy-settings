import React from 'react'
import { screen, render } from '@testing-library/react'

import AppLike from '@/test/AppLike'
import PasswordSection from '@/components/Profile/PasswordSection'
import { useHasPassword } from '@/hooks/useHasPassword'

jest.mock('@/hooks/useHasPassword', () => ({
  useHasPassword: jest.fn()
}))

describe('PasswordSection', () => {
  const setup = ({ hasPassword }) => {
    useHasPassword.mockReturnValue({ hasPassword })
    render(
      <AppLike>
        <PasswordSection />
      </AppLike>
    )
  }

  it('should render the button by default', () => {
    setup({ hasPassword: true })
    expect(screen.getByText('Update my password')).toBeTruthy()
  })

  it('should hide the button if user doesnt have a password', () => {
    setup({ hasPassword: false })
    expect(screen.queryByText('Update my password')).toBeFalsy()
  })
})
