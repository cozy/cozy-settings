import { useCanAuthWith } from './useCanAuthWith'
import { renderHook } from '@testing-library/react'
import { useClient } from 'cozy-client'
import flag from 'cozy-flags'

jest.mock('cozy-client', () => ({
  useClient: jest.fn(() => ({
    capabilities: {}
  }))
}))
jest.mock('cozy-flags')

describe('useCanAuthWith', () => {
  it('should return false by default', () => {
    const { result } = renderHook(() => useCanAuthWith())
    expect(result.current).toEqual({
      canAuthWithOIDC: false,
      canAuthWithPassword: false
    })
  })

  it('should return client capabilities', () => {
    useClient.mockReturnValue({
      capabilities: {
        can_auth_with_oidc: true,
        can_auth_with_password: true
      }
    })
    const { result } = renderHook(() => useCanAuthWith())
    expect(result.current).toEqual({
      canAuthWithOIDC: true,
      canAuthWithPassword: true
    })
  })

  it('should settings.oidc-auth flag overide client capability can_auth_with_oidc', () => {
    flag.mockReturnValue(true)
    useClient.mockReturnValue({
      capabilities: {
        can_auth_with_oidc: false,
        can_auth_with_password: true
      }
    })

    const { result } = renderHook(() => useCanAuthWith())
    expect(result.current).toEqual({
      canAuthWithOIDC: true,
      canAuthWithPassword: true
    })
  })
})
