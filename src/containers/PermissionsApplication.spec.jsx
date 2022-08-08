import { render } from '@testing-library/react'
import React from 'react'
import PermissionsApplication, {
  completePermission
} from './PermissionsApplication'
import { Q, useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'

jest.mock('cozy-ui/transpiled/react/I18n/withLocales', () => {
  return () => Component => {
    const t = text => text
    const match = { params: { app: 'Drive' } }
    // eslint-disable-next-line react/display-name
    return () => <Component match={match} t={t} />
  }
})

jest.mock('cozy-ui/transpiled/react/NavigationList', () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="NavigationList">{children}</div>
    ),
    NavigationListSection: ({ children }) => (
      <div data-testid="NavigationListSection">{children}</div>
    )
  }
})

jest.mock('cozy-ui/transpiled/react', () => ({
  useI18n: () => ({ t: text => text })
}))

jest.mock('react-router-dom', () => {
  return {
    withRouter: Component => Component,
    Link: ({ narrow, children }) => (
      <div data-testid="page" data-narrow={narrow}>
        {children}
      </div>
    )
  }
})

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  hasQueryBeenLoaded: jest.fn(),
  Q: jest.fn(),
  useQuery: jest.fn(),
  isQueryLoading: jest.fn()
}))

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
    const queryResult = {
      fetchStatus: 'loaded',
      data: [
        {
          attributes: {
            permissions: {
              files: {
                type: 'io.cozy.files',
                description: 'Required to access the files'
              },
              allFiles: {
                type: 'io.cozy.files.*',
                description: 'Required to access the files'
              },
              apps: {
                type: 'io.cozy.apps',
                description:
                  'Required by the cozy-bar to display the icons of the apps',
                verbs: ['GET']
              },
              accounts: {
                type: 'io.cozy.accounts',
                description: 'Required to access accounts',
                verbs: ['POST']
              }
            }
          }
        }
      ]
    }
    isQueryLoading.mockReturnValue(true)
    hasQueryBeenLoaded.mockReturnValue(true)
    Q.mockReturnValue({ getById: () => 'kfrf' })
    useQuery.mockReturnValue(queryResult)
  })
  it('should display appName when query has been loaded', () => {
    hasQueryBeenLoaded.mockReturnValue(true)
    const { container } = render(<PermissionsApplication />)
    expect(container).toMatchSnapshot()
  })

  it('should render a spinner when query is loading and has not been loaded', () => {
    isQueryLoading.mockReturnValue(true)
    hasQueryBeenLoaded.mockReturnValue(false)
    const { queryByTestId } = render(<PermissionsApplication />)
    expect(queryByTestId('Spinner')).toBeTruthy()
  })

  it('should display appName when query is not loading', () => {
    isQueryLoading.mockReturnValue(false)
    const { queryByText } = render(<PermissionsApplication />)
    expect(queryByText('DRIVE')).toBeTruthy()
  })

  it('should render Permissions.failedRequest when query status is failed', () => {
    useQuery.mockReturnValue({ fetchStatus: 'failed' })
    const { queryByText } = render(<PermissionsApplication />)
    expect(queryByText('Permissions.failedRequest')).toBeTruthy()
  })

  describe('completePermission', () => {
    it('should add description in permissions', () => {
      const key = 'contactsAccounts'
      const permission = 'Comptes associés aux contacts'
      const value = {
        description: 'blabla',
        verbs: ['GET', 'POST']
      }
      const resultat = completePermission(key, permission, value)
      expect(resultat).toEqual({
        name: 'contactsAccounts',
        title: 'Comptes associés aux contacts',
        description: 'blabla',
        verbs: ['GET', 'POST']
      })
    })
  })
})
