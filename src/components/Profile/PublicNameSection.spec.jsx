import { act, render } from '@testing-library/react'
import React from 'react'

import { useMutation, useQuery } from 'cozy-client'

import Input from '@/components/Input'
import { PublicNameSection } from '@/components/Profile/PublicNameSection'

jest.mock('cozy-client', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn()
}))

jest.mock('twake-i18n', () => ({
  useI18n: () => ({ t: key => key })
}))

jest.mock('@/lib/queries', () => ({
  buildSettingsInstanceQuery: () => ({ definition: {}, options: {} })
}))

jest.mock('@/components/Input', () => jest.fn(() => null))

describe('PublicNameSection', () => {
  const mutate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    useQuery.mockReturnValue({
      data: { meta: { rev: '1-abc' }, attributes: {}, public_name: 'alice' }
    })
    useMutation.mockReturnValue({ mutate, mutationStatus: 'pending' })
  })

  it('should show the empty error and not save a whitespace-only value', () => {
    render(<PublicNameSection />)
    const { onChange, onBlur } = Input.mock.calls.at(-1)[0]

    act(() => onChange(null, '   '))
    act(() => onBlur(null, '   '))

    const { errors } = Input.mock.calls.at(-1)[0]
    expect(errors).toEqual(['ProfileView.infos.empty'])
    expect(mutate).not.toHaveBeenCalled()
  })
})
