import { render } from '@testing-library/react'
import React from 'react'
import DataPermissions from './DataPermissions'
import { useQuery } from 'cozy-client'

jest.mock('cozy-ui/transpiled/react/I18n/withLocales', () => {
  return () => Component => {
    const t = text => text
    const match = { params: { permission: 'io.cozy.apps' } }
    return () => <Component match={match} t={t} />
  }
})

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    Link: ({ narrow, children }) => (
      <div data-testid="page" data-narrow={narrow}>
        {children}
      </div>
    )
  }
})

jest.mock('cozy-client')

jest.mock('components/Page', () => {
  return ({ narrow, children }) => (
    <div data-testid="page" data-narrow={narrow}>
      {children}
    </div>
  )
})

jest.mock('components/PageTitle', () => ({ children }) => (
  <div data-testid="page-title">{children}</div>
))

jest.mock('cozy-ui/transpiled/react/NavigationList', () => {
  return {
    __esModule: true,
    default: ({ children }) => (
      <div data-testid="NavigationList">{children}</div>
    )
  }
})

jest.mock('cozy-ui/transpiled/react/Icon', () => {
  return () => <div data-testid="Icon"></div>
})

jest.mock('cozy-ui/transpiled/react/ListItemText', () => {
  return ({ primary }) => (
    <div data-testid="ListItemText" data-primary={primary}></div>
  )
})

jest.mock('cozy-ui/transpiled/react/AppIcon', () => {
  // eslint-disable-next-line react/display-name
  return () => <div data-testid="AppIcon"></div>
})

describe('DataPermissions', () => {
  beforeEach(() => {
    const queryResultApps = {
      fetchStatus: 'loaded',
      data: [
        {
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
          },
          slug: 'contacts',
          name: 'Contacts'
        },
        {
          permissions: {
            files: {
              type: 'io.cozy.files',
              description: 'Required to access the files'
            },
            apps: {
              type: 'io.cozy.apps',
              description:
                'Required by the cozy-bar to display the icons of the apps',
              verbs: ['GET']
            }
          },
          slug: 'home',
          name: 'Home'
        },
        {
          permissions: {
            files: {
              type: 'io.cozy.files',
              description: 'Required to access the files'
            }
          },
          slug: 'settings',
          name: 'Settings'
        },
        {
          permissions: {},
          slug: 'store',
          name: 'Store'
        }
      ]
    }
    const queryResultKonnectors = {
      fetchStatus: 'loaded',
      data: [
        {
          permissions: {},
          slug: 'alan',
          name: 'Alan'
        }
      ]
    }
    useQuery.mockReturnValueOnce(queryResultApps)
    useQuery.mockReturnValueOnce(queryResultKonnectors)
  })

  it('should display DataPermissions', () => {
    const { container } = render(<DataPermissions />)
    expect(container).toMatchSnapshot()
  })
})
