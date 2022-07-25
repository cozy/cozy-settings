import { render } from '@testing-library/react'
import React from 'react'
import Permissions from './Permissions'
import { Q, useQuery, isQueryLoading, hasQueryBeenLoaded } from 'cozy-client'

jest.mock('cozy-ui/transpiled/react', () => {
  return { useI18n: () => ({ t: x => x }) }
})

jest.mock('react-router-dom', () => {
  return {
    Link: ({ narrow, children }) => (
      <div data-testid="page" data-narrow={narrow}>
        {children}
      </div>
    )
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
  return ({ children }) => <div data-testid="page-title">{children}</div>
})

jest.mock('cozy-ui/transpiled/react/Spinner', () => {
  // eslint-disable-next-line react/display-name
  return ({ size }) => <div data-testid="Spinner" data-size={size}></div>
})

jest.mock('cozy-ui/transpiled/react/AppIcon', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="AppIcon"></div>
})

describe('Permissions', () => {
  beforeEach(() => {
    const queryResultApps = {
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
              }
            }
          },
          slug: 'contacts',
          name: 'Contacts'
        }
      ]
    }
    const queryResultKonnectors = {
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
              konnectors: {
                description: 'Required to get the list of konnectors',
                type: 'io.cozy.konnectors',
                verbs: ['GET']
              }
            }
          },
          slug: 'alan',
          name: 'Alan'
        }
      ]
    }
    isQueryLoading.mockReturnValue(true)
    hasQueryBeenLoaded.mockReturnValue(true)
    Q.mockReturnValue({ getById: () => 'kfrf' })
    useQuery.mockReturnValueOnce(queryResultApps)
    useQuery.mockReturnValueOnce(queryResultKonnectors)
  })
  it('should display appName when query has been loaded', () => {
    hasQueryBeenLoaded.mockReturnValue(true)
    const { container } = render(<Permissions />)
    expect(container).toMatchSnapshot()
  })

  it('should render a spinner when query is loading and has not been loaded', () => {
    isQueryLoading.mockReturnValue(true)
    hasQueryBeenLoaded.mockReturnValue(false)
    const { queryByTestId } = render(<Permissions />)
    expect(queryByTestId('Spinner')).toBeTruthy()
  })

  it('should display appName and konnectorName when query is not loading', () => {
    isQueryLoading.mockReturnValue(false)
    const { queryByText } = render(<Permissions />)
    expect(queryByText('Contacts')).toBeTruthy()
    expect(queryByText('Alan')).toBeTruthy()
  })

  it('should render Permissions.failedRequest when query status is failed', () => {
    useQuery.mockReset()
    useQuery.mockReturnValue({ fetchStatus: 'failed' })
    const { queryByText } = render(<Permissions />)
    expect(queryByText('Permissions.failedRequest')).toBeTruthy()
  })
})
