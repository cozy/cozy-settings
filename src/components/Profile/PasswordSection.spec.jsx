import { screen, render } from '@testing-library/react'
import React from 'react'

import flag from 'cozy-flags'

import PasswordSection from '@/components/Profile/PasswordSection'
import AppLike from '@/test/AppLike'

jest.mock('cozy-flags')

describe('PasswordSection', () => {
  const setup = ({
    signUpUrl = 'https://signup.example.com',
    isPasswordReadonly = false
  }) => {
    flag.mockImplementation(key => {
      if (key === 'signup.url') return signUpUrl
      if (key === 'settings.password.readonly') return isPasswordReadonly
      return undefined
    })

    render(
      <AppLike>
        <PasswordSection />
      </AppLike>
    )
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the button when signUpUrl is available and password is not readonly', () => {
    setup({
      signUpUrl: 'https://signup.example.com',
      isPasswordReadonly: false
    })
    const button = screen.getByRole('link')
    expect(button).toBeTruthy()
    expect(button).not.toHaveAttribute('aria-disabled', 'true')
  })

  it('should disable the button when password is readonly', () => {
    setup({ signUpUrl: 'https://signup.example.com', isPasswordReadonly: true })
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true')
  })

  it('should disable the button when signUpUrl is not available', () => {
    setup({ signUpUrl: null, isPasswordReadonly: false })
    expect(screen.getByRole('link')).toHaveAttribute('aria-disabled', 'true')
  })
})
