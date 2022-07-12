import { render } from '@testing-library/react'
import React from 'react'
import PermissionsApplication from './PermissionsApplication'
import { withRouter } from 'react-router-dom'
import { Q, useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'

jest.mock('cozy-ui/transpiled/react', () => {
  return { useI18n: () => ({ t: 'toto' }) }
})
jest.mock('react-router-dom', () => {
  return {
    withRouter: Component => {
      const match = { params: { app: 'Drive' } }
      return () => <Component match={match} />
    }
  }
})
jest.mock('cozy-client', () => {
  return {
    Q: () => ({ getById: () => 'kfrf' }),
    useQuery: () => 'queryResult',
    isQueryLoading: () => 'isQueryLoading',
    hasQueryBeenLoaded: () => 'hasQueryBeenLoaded'
  }
})
jest.mock('components/Page', () => {
  return () => <div data-testid="page" />
})

describe('PermissionsApplication', () => {
  it('should render a page', () => {
    const test = render(<PermissionsApplication />)
    expect(test.container).toMatchSnapshot()
  })

})
