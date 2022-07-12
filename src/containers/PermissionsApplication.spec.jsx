import { render } from '@testing-library/react'
import React from 'react'
import PermissionsApplication from './PermissionsApplication'
import { Q, useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'

jest.mock('cozy-ui/transpiled/react', () => {
  return { useI18n: () => ({ t: x => x }) }
})

jest.mock('react-router-dom', () => {
  return {
    withRouter: Component => {
      const match = { params: { app: 'Drive' } }
      // eslint-disable-next-line react/display-name
      return () => <Component match={match} />
    }
  }
})

jest.mock('cozy-client')

jest.mock('components/Page', () => {
  // eslint-disable-next-line react/display-name
  return ({ narrow, children }) => (
    <div data-testid="page" data-narrow={narrow}>
      {children}
    </div>
  )
})

jest.mock('components/PageTitle', () => {
  // eslint-disable-next-line react/display-name
  return ({ children }) => <div data-testid="pageTitle">{children}</div>
})
jest.mock('cozy-ui/transpiled/react/Spinner', () => {
  // eslint-disable-next-line react/display-name
  return ({ size }) => <div data-testid="Spinner" data-size={size}></div>
})

describe('PermissionsApplication', () => {
  beforeEach(() => {
    isQueryLoading.mockReturnValue(true)
    hasQueryBeenLoaded.mockReturnValue(true)
    Q.mockReturnValue({ getById: () => 'kfrf' })
    useQuery.mockReturnValue({ fetchStatus: 'success' })
  })
  it('should display appName when query has been loaded', () => {
    hasQueryBeenLoaded.mockReturnValue(true)
    const { container } = render(<PermissionsApplication />)
    expect(container).toMatchSnapshot()
  })

  it('should render a spinner when query is loading and has not been load', () => {
    isQueryLoading.mockReturnValue(true)
    hasQueryBeenLoaded.mockReturnValue(false)
    const { queryByTestId } = render(<PermissionsApplication />)
    expect(queryByTestId('Spinner')).toBeTruthy()
  })

  it('should display appName when query is not loading', () => {
    isQueryLoading.mockReturnValue(false)
    const { queryByText } = render(<PermissionsApplication />)
    expect(queryByText('Drive')).toBeTruthy()
  })

  it('should render Permissions.failedRequest when query status is failed', () => {
    useQuery.mockReturnValue({ fetchStatus: 'failed' })
    const { queryByText } = render(<PermissionsApplication />)
    expect(queryByText('Permissions.failedRequest')).toBeTruthy()
  })
})