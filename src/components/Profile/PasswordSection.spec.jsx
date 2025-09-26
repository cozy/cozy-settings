import { screen, render } from '@testing-library/react'
import React from 'react'

import PasswordSection from '@/components/Profile/PasswordSection'
import { useHasPassword } from '@/hooks/useHasPassword'
import AppLike from '@/test/AppLike'

jest.mock('@/hooks/useHasPassword', () => ({
  useHasPassword: jest.fn()
}))

jest.mock('cozy-flags', () => jest.fn())

const flag = require('cozy-flags')

describe('PasswordSection', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    flag.mockImplementation(() => null)
  })

  const setup = ({
    hasPassword,
    signUpUrl = null,
    isPasswordReadonly = false
  }) => {
    useHasPassword.mockReturnValue({ hasPassword })
    flag.mockImplementation(flagName => {
      if (flagName === 'signup.url') return signUpUrl
      if (flagName === 'settings.password.readonly') return isPasswordReadonly
      return null
    })
    render(
      <AppLike>
        <PasswordSection />
      </AppLike>
    )
  }

  describe('when signUpUrl flag is set', () => {
    it('should render external link button', () => {
      setup({ hasPassword: true, signUpUrl: 'https://example.com' })
      const button = screen.getByText('Update my password')
      expect(button).toBeTruthy()
      expect(button.closest('a')).toHaveAttribute(
        'href',
        'https://example.com/change-password'
      )
      expect(button.closest('a')).toHaveAttribute('target', '_blank')
    })

    it('should disable button when password is readonly', () => {
      setup({
        hasPassword: true,
        signUpUrl: 'https://example.com',
        isPasswordReadonly: true
      })
      const button = screen.getByText('Update my password').closest('a')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('when signUpUrl flag is not set', () => {
    it('should render internal link button when user has password', () => {
      setup({ hasPassword: true })
      const button = screen.getByText('Update my password')
      expect(button).toBeTruthy()
      expect(button.closest('a')).toHaveAttribute('href', '#/profile/password')
    })

    it('should disable internal button when password is readonly', () => {
      setup({ hasPassword: true, isPasswordReadonly: true })
      expect(screen.getByRole('button')).toHaveAttribute(
        'aria-disabled',
        'true'
      )
    })

    it('should not render anything when user has no password', () => {
      setup({ hasPassword: false })
      expect(screen.queryByText('Update my password')).toBeFalsy()
      expect(screen.queryByText('Password')).toBeFalsy()
    })
  })
})
