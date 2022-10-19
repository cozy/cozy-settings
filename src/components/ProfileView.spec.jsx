import React from 'react'
import { render } from '@testing-library/react'
import set from 'lodash/set'

import CozyClient from 'cozy-client'

import AppLike from '../../test/AppLike'
import { PasswordSection } from './ProfileView'

describe('PasswordSection', () => {
  const setup = ({ can_auth_with_password }) => {
    const client = new CozyClient({})
    set(client, 'capabilities.can_auth_with_password', can_auth_with_password)
    const root = render(
      <AppLike client={client}>
        <PasswordSection />
      </AppLike>
    )
    return { root }
  }
  it('should render a button if we can auth with password', () => {
    const { root } = setup({ can_auth_with_password: true })
    expect(root.getByText('Update my password')).toBeTruthy()
  })

  it('should render a button if we can auth with password (defaults to true)', () => {
    const { root } = setup({ can_auth_with_password: undefined })
    expect(root.getByText('Update my password')).toBeTruthy()
  })

  it('should render a button if we can auth with password (defaults to true)', () => {
    const { root } = setup({ can_auth_with_password: false })
    expect(root.queryByText('Update my password')).toBeFalsy()
  })
})
