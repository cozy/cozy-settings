import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Support } from './Support'
import AppLike from '../../test/AppLike'

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useMatch: jest.fn(),
  useNavigate: jest.fn()
}))

jest.mock('cozy-ui/transpiled/react/hooks/useBreakpoints', () =>
  jest.fn(() => ({
    isMobile: false,
    isTablet: false
  }))
)

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  useClient: jest.fn(() => ({}))
}))

describe('Support component', () => {
  const sendMessageToSupport = jest.fn()

  let emailStatus

  beforeEach(() => {
    emailStatus = { isSent: false, isSending: false }
  })

  it('should send a message', async () => {
    const { rerender } = render(
      <Support
        emailStatus={emailStatus}
        sendMessageToSupport={sendMessageToSupport}
      />,
      { wrapper: AppLike }
    )

    expect(screen.getByRole('button')).toBeDisabled()

    const titleInput = screen.getByLabelText('Your request')
    await userEvent.type(titleInput, 'message')

    fireEvent.click(screen.getByRole('button'))
    expect(sendMessageToSupport).toHaveBeenCalledTimes(1)

    rerender(
      <Support
        emailStatus={{ isSent: false, isSending: true }}
        sendMessageToSupport={sendMessageToSupport}
      />
    )

    expect(screen.getByText('Sending...')).toBeDefined()

    rerender(
      <Support
        emailStatus={{ isSent: true, isSending: false }}
        sendMessageToSupport={sendMessageToSupport}
      />
    )

    expect(
      screen.findByText('👏 Your message has been sent. Thank you!')
    ).toBeDefined()
  })

  it('should display error message', () => {
    render(
      <Support
        emailStatus={{
          ...emailStatus,
          error: {
            message: 'Error message'
          }
        }}
        sendMessageToSupport={sendMessageToSupport}
      />,
      { wrapper: AppLike }
    )

    expect(
      screen.getByText(
        'An error occured while sending your message : Error message'
      )
    ).toBeDefined()
  })

  it('should clean after the message sent', async () => {
    const { rerender } = render(
      <Support
        emailStatus={emailStatus}
        sendMessageToSupport={sendMessageToSupport}
      />,
      { wrapper: AppLike }
    )

    const titleInput = screen.getByLabelText('Your request')
    await userEvent.type(titleInput, 'message')

    rerender(
      <Support
        emailStatus={{
          isSent: false,
          isSending: true
        }}
        sendMessageToSupport={sendMessageToSupport}
      />,
      { wrapper: AppLike }
    )

    rerender(
      <Support
        emailStatus={{
          isSent: true,
          isSending: false
        }}
        sendMessageToSupport={sendMessageToSupport}
      />,
      { wrapper: AppLike }
    )

    expect(screen.getByLabelText('Your request').value).toBe('')
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
