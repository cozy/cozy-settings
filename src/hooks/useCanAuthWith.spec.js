import { renderHook } from '@testing-library/react'

import { useClient } from 'cozy-client'
import flag from 'cozy-flags'

import { useCanAuthWith } from '@/hooks/useCanAuthWith'

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
      canAuthWithPassword: false,
      canAuthWithMagicLinks: false
    })
  })

  it('should return client capabilities', () => {
    useClient.mockReturnValue({
      capabilities: {
        can_auth_with_oidc: true,
        can_auth_with_password: true,
        can_auth_with_magic_links: true
      }
    })
    const { result } = renderHook(() => useCanAuthWith())
    expect(result.current).toEqual({
      canAuthWithOIDC: true,
      canAuthWithPassword: true,
      canAuthWithMagicLinks: true
    })
  })

  it('should settings.oidc-auth flag overide client capability can_auth_with_oidc', () => {
    flag.mockReturnValue(true)
    useClient.mockReturnValue({
      capabilities: {
        can_auth_with_oidc: false
      }
    })

    const { result } = renderHook(() => useCanAuthWith())
    expect(result.current).toEqual(
      expect.objectContaining({ canAuthWithOIDC: true })
    )
  })
})
