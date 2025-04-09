import { render, act } from '@testing-library/react'
import React from 'react'

import { useSetLang } from './useSetLang'

const mockWebviewIntent = {
  call: jest.fn().mockResolvedValue(true)
}

jest.mock('cozy-intent', () => ({
  useWebviewIntent: (): { call: () => Promise<boolean> } => mockWebviewIntent
}))

// Create a dummy component to wrap the useSetLang hook
const DummyComponent = ({
  selectedLocale
}: {
  selectedLocale?: string | null
}): null => {
  useSetLang(selectedLocale)
  return null
}

describe('useSetLang', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('calls webviewIntent.call when selectedLocale changes', () => {
    // Initial render with selectedLocale set to 'en'
    const { rerender } = render(<DummyComponent selectedLocale="en" />)

    expect(mockWebviewIntent.call).not.toHaveBeenCalled()

    // Update selectedLocale to 'fr'
    act(() => {
      rerender(<DummyComponent selectedLocale="fr" />)
    })

    expect(mockWebviewIntent.call).toHaveBeenCalledWith('setLang', 'fr')
  })

  it('does not call webviewIntent.call when selectedLocale is null or undefined', () => {
    const { rerender } = render(<DummyComponent selectedLocale={null} />)
    expect(mockWebviewIntent.call).not.toHaveBeenCalled()

    act(() => {
      rerender(<DummyComponent selectedLocale={undefined} />)
    })
    expect(mockWebviewIntent.call).not.toHaveBeenCalled()
  })

  it('does not call webviewIntent.call when selectedLocale does not change', () => {
    const { rerender } = render(<DummyComponent selectedLocale="en" />)
    expect(mockWebviewIntent.call).not.toHaveBeenCalled()

    act(() => {
      rerender(<DummyComponent selectedLocale="en" />)
    })
    expect(mockWebviewIntent.call).not.toHaveBeenCalled()
  })

  it('calls webviewIntent.call with correct arguments when selectedLocale changes multiple times', () => {
    const { rerender } = render(<DummyComponent selectedLocale="en" />)
    expect(mockWebviewIntent.call).not.toHaveBeenCalled()

    act(() => {
      rerender(<DummyComponent selectedLocale="fr" />)
    })
    expect(mockWebviewIntent.call).toHaveBeenCalledWith('setLang', 'fr')

    act(() => {
      rerender(<DummyComponent selectedLocale="es" />)
    })
    expect(mockWebviewIntent.call).toHaveBeenCalledWith('setLang', 'es')
  })

  it('handles failure when calling webviewIntent.call', () => {
    mockWebviewIntent.call.mockRejectedValue(
      new Error('Failed to set language')
    )

    expect(() => {
      render(<DummyComponent selectedLocale="en" />)
    }).not.toThrow()
  })

  it('does not throw error when webviewIntent is undefined', () => {
    jest.mock('cozy-intent', () => ({
      useWebviewIntent: (): undefined => undefined
    }))

    expect(() => {
      render(<DummyComponent selectedLocale="en" />)
    }).not.toThrow()
  })

  it('calls webviewIntent.call when selectedLocale changes from undefined to a string', async () => {
    // Initial render with selectedLocale set to 'undefined'
    const { rerender } = render(<DummyComponent selectedLocale={undefined} />)

    expect(mockWebviewIntent.call).not.toHaveBeenCalled()

    // Update selectedLocale to 'fr'
    act(() => {
      rerender(<DummyComponent selectedLocale="fr" />)
    })

    // Wait for any asynchronous actions to complete
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockWebviewIntent.call).toHaveBeenCalledWith('setLang', 'fr')
  })
})
