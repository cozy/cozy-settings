import { render } from '@testing-library/react'
import React from 'react'
import PermissionsApplication, { completePermission } from './AppPermissions'
import {
  Q,
  useQuery,
  useClient,
  isQueryLoading,
  hasQueryBeenLoaded
} from 'cozy-client'

jest.mock('cozy-ui/transpiled/react/I18n/withLocales', () => {
  return () => Component => {
    const t = text => text
    const match = { params: { slug: 'Drive' } }
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

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ slug: 'Drive' }),
    Link: ({ narrow, children }) => (
      <div data-testid="page" data-narrow={narrow}>
        {children}
      </div>
    )
  }
})

jest.mock('cozy-ui/transpiled/react/CozyDialogs', () => {
  return {
    Dialog: () => (
      <div
        data-testid="Dialog"
        data-open="open"
        data-onClose="onClose"
        data-title="title"
        data-content="content"
      />
    )
  }
})

jest.mock('cozy-client', () => ({
  ...jest.requireActual('cozy-client'),
  hasQueryBeenLoaded: jest.fn(),
  Q: jest.fn(),
  useQuery: jest.fn(),
  isQueryLoading: jest.fn(),
  useClient: jest.fn()
}))

jest.mock('components/Page', () => {
  return ({ narrow, children }) => (
    <div data-testid="page" data-narrow={narrow}>
      {children}
    </div>
  )
})

jest.mock('components/PageTitle', () => {
  return ({ children }) => <div data-testid="pageTitle">{children}</div>
})
jest.mock('cozy-ui/transpiled/react/Spinner', () => {
  return ({ size }) => <div data-testid="Spinner" data-size={size}></div>
})
jest.mock('cozy-ui/transpiled/react/CircleButton', () => {
  return () => <div data-testid="CircleButton"></div>
})
jest.mock('cozy-ui/transpiled/react/I18n', () => {
  return { useI18n: () => ({ t: x => x }) }
})

describe('PermissionsApplication', () => {
  beforeEach(() => {
    const queryResult = {
      fetchStatus: 'loaded',
      data: {
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
    isQueryLoading.mockReturnValue(true)
    hasQueryBeenLoaded.mockReturnValue(true)
    Q.mockReturnValue({ getById: () => 'kfrf' })
    useQuery.mockReturnValue(queryResult)
    useClient.mockReturnValue({
      getStackClient: () => {
        return { uri: 'http://cozy.localhost:8080' }
      },
      getInstanceOptions: () => {
        return {
          subdomain: 'flat'
        }
      }
    })
  })
  it('should display slugName when query has been loaded', () => {
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

  it('should display slugName when query is not loading', () => {
    isQueryLoading.mockReturnValue(false)
    const { queryByText } = render(<PermissionsApplication />)
    expect(queryByText('DRIVE')).toBeInTheDocument()
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
