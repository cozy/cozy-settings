import React from 'react'
import { fireEvent, getByRole, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'

import { createMockClient, useQuery } from 'cozy-client'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import AppLike from '../../test/AppLike'

import {
  toCozyDirectory,
  toCozyOAuthClient,
  updateDirectoriesExclusions
} from 'lib/deviceConfigurationHelper'
import DevicesModaleConfigureView from './DevicesModaleConfigureView'

jest.mock('cozy-client/dist/hooks/useQuery', () => jest.fn())
jest.mock('cozy-ui/transpiled/react/Alerter', () => ({
  error: jest.fn()
}))
jest.mock('lib/deviceConfigurationHelper', () => {
  const original = jest.requireActual('lib/deviceConfigurationHelper') // Step 2.
  return {
    ...original,
    updateDirectoriesExclusions: jest.fn()
  }
})

describe('DevicesModaleConfigureView', () => {
  const mockClient = createMockClient({})
  const mockDevice = {
    _id: 'mock-device-id',
    _type: 'io.cozy.oauth.clients',
    client_kind: 'desktop',
    client_name: 'Mock Device'
  }
  const includedFolders = [
    { id: 'Administrative', name: 'Administrative', not_synchronized_on: [] },
    { id: 'Konnectors', name: 'Konnectors', not_synchronized_on: null },
    { id: 'Accounts', name: 'Accounts', not_synchronized_on: undefined },
    { id: 'Ciphers', name: 'Ciphers' }
  ]
  const excludedFolders = [
    { id: 'Photos', name: 'Photos', not_synchronized_on: [mockDevice] },
    { id: 'Videos', name: 'Videos', not_synchronized_on: [mockDevice] }
  ]
  const mockFolders = includedFolders.concat(excludedFolders).sort(f => f.name)
  const mockCancelAction = jest.fn()
  const mockOnDeviceConfigured = jest.fn()

  const setup = () => {
    const root = render(
      <AppLike client={mockClient}>
        <DevicesModaleConfigureView
          device={mockDevice}
          cancelAction={mockCancelAction}
          onDeviceConfigured={mockOnDeviceConfigured}
        />
      </AppLike>
    )
    return { root }
  }

  afterEach(() => {
    updateDirectoriesExclusions.mockClear()
    mockOnDeviceConfigured.mockClear()
    mockCancelAction.mockClear()
  })

  describe('when the folders query is still loading', () => {
    beforeEach(() => {
      useQuery.mockReturnValue({
        fetchStatus: 'loading'
      })
    })

    it('should render an loading spinner', () => {
      const { root } = setup()
      expect(
        root.queryByText(
          'Select the folders to synchronize with your computer:'
        )
      ).not.toBeInTheDocument()
      expect(root.getByRole('progressbar')).toBeVisible()
    })

    describe('and the dialog is validated', () => {
      const run = () => {
        const { root } = setup()
        fireEvent.click(root.getByRole('button', { name: 'OK' }))
      }

      it('should call updateDirectoriesExclusions without folders', async () => {
        run()

        expect(updateDirectoriesExclusions).toHaveBeenCalledTimes(1)
        expect(updateDirectoriesExclusions).toHaveBeenCalledWith({
          client: mockClient,
          deviceToConfigure: toCozyOAuthClient(mockDevice),
          foldersToInclude: [],
          foldersToExclude: []
        })
        await waitFor(() =>
          expect(mockOnDeviceConfigured).toHaveBeenCalledTimes(1)
        )
      })
    })
  })

  describe('when the folders query failed', () => {
    beforeEach(() => {
      useQuery
        .mockReturnValueOnce({
          fetchStatus: 'loading'
        })
        .mockReturnValue({
          fetchStatus: 'failed',
          data: mockFolders // XXX: just checking that this has no effects on the UI
        })
    })

    it('should render an alert notification', () => {
      setup()
      expect(Alerter.error).toHaveBeenCalledTimes(1)
    })

    describe('and the dialog is validated', () => {
      const run = () => {
        const { root } = setup()
        fireEvent.click(root.getByRole('button', { name: 'OK' }))
      }

      it('should call updateDirectoriesExclusions without folders', async () => {
        run()

        expect(updateDirectoriesExclusions).toHaveBeenCalledTimes(1)
        expect(updateDirectoriesExclusions).toHaveBeenCalledWith({
          client: mockClient,
          deviceToConfigure: toCozyOAuthClient(mockDevice),
          foldersToInclude: [],
          foldersToExclude: []
        })
        await waitFor(() =>
          expect(mockOnDeviceConfigured).toHaveBeenCalledTimes(1)
        )
      })
    })
  })

  describe('when the folders query yields no folders', () => {
    beforeEach(() => {
      useQuery
        .mockReturnValueOnce({
          fetchStatus: 'loading'
        })
        .mockReturnValue({
          fetchStatus: 'loaded',
          data: []
        })
    })

    it('should render an Empty-like warning', () => {
      const { root } = setup()
      expect(
        root.getByText("You don't have any folders in your Cozy.")
      ).toBeVisible()
    })

    it('should render a disabled partial sync selector', () => {
      const { root } = setup()
      expect(
        root.getByLabelText('Synchronize only the selected folders:')
      ).toBeDisabled()
      expect(root.getByLabelText('Synchronize my whole Cozy')).toBeChecked()
    })

    describe('and the dialog is validated', () => {
      const run = () => {
        const { root } = setup()
        fireEvent.click(root.getByRole('button', { name: 'OK' }))
      }

      it('should call updateDirectoriesExclusions without folders', async () => {
        run()

        expect(updateDirectoriesExclusions).toHaveBeenCalledTimes(1)
        expect(updateDirectoriesExclusions).toHaveBeenCalledWith({
          client: mockClient,
          deviceToConfigure: toCozyOAuthClient(mockDevice),
          foldersToInclude: [],
          foldersToExclude: []
        })
        await waitFor(() =>
          expect(mockOnDeviceConfigured).toHaveBeenCalledTimes(1)
        )
      })
    })
  })

  describe('when the folders query yields only included folders', () => {
    beforeEach(() => {
      useQuery
        .mockReturnValueOnce({
          fetchStatus: 'loading'
        })
        .mockReturnValue({
          fetchStatus: 'loaded',
          data: includedFolders
        })
    })

    it('should render a checked whole Cozy sync selector', () => {
      const { root } = setup()
      expect(root.getByLabelText('Synchronize my whole Cozy')).toBeChecked()
      expect(
        root.getByLabelText('Synchronize only the selected folders:')
      ).toBeEnabled()
    })

    it('should render a list of checked and disabled folder toggles', () => {
      const { root } = setup()
      const folderToggles = root.getAllByRole('checkbox')
      for (const folderToggle of folderToggles) {
        expect(folderToggle).toBeChecked()
        expect(folderToggle).toBeDisabled()
      }
    })

    describe('and partial sync is enabled', () => {
      const run = () => {
        const { root } = setup()
        const partialSyncToggle = root.getByLabelText(
          'Synchronize only the selected folders:'
        )

        fireEvent.click(partialSyncToggle)

        return { partialSyncToggle, root }
      }

      it('should render a checked partial sync selector', () => {
        const { partialSyncToggle } = run()

        expect(partialSyncToggle).toBeChecked()
      })

      it('should render a list of checked and enabled folder toggles', () => {
        const { root } = run()

        const folderToggles = root.getAllByRole('checkbox')
        for (const folderToggle of folderToggles) {
          expect(folderToggle).toBeChecked()
          expect(folderToggle).toBeEnabled()
        }
      })
    })

    describe('and the all folders toggle is clicked', () => {
      const run = () => {
        const { root } = setup()
        const allFoldersToggle = getByRole(
          root.getByTestId('toggle-all-inclusion'),
          'checkbox'
        )

        fireEvent.click(allFoldersToggle)

        return { root }
      }

      it('should render a checked partial sync selector', () => {
        const { root } = run()

        expect(
          root.getByLabelText('Synchronize only the selected folders:')
        ).toBeChecked()
      })

      it('should render a list of unchecked and enabled folder toggles', () => {
        const { root } = run()

        const folderToggles = root.getAllByRole('checkbox')
        for (const folderToggle of folderToggles) {
          expect(folderToggle).not.toBeChecked()
          expect(folderToggle).toBeEnabled()
        }
      })
    })

    describe('and a folder is excluded', () => {
      const folderToExclude = includedFolders[0]
      const run = () => {
        const { root } = setup()
        const folderToggle = root.getByRole('button', {
          name: folderToExclude.name
        })

        fireEvent.click(folderToggle)

        return { root }
      }

      it('should render a checked partial sync selector', () => {
        const { root } = run()

        expect(
          root.getByLabelText('Synchronize only the selected folders:')
        ).toBeChecked()
      })

      it('should render a mixed checked and enabled all folders toggle', () => {
        const { root } = run()

        const allFoldersToggle = getByRole(
          root.getByTestId('toggle-all-inclusion'),
          'checkbox'
        )
        expect(allFoldersToggle).toBePartiallyChecked()
        expect(allFoldersToggle).toBeEnabled()
      })

      it('should render a list of enabled folder toggles, checked except the clicked one', () => {
        const { root } = run()

        for (const includedFolder of includedFolders) {
          const folderToggle = getByRole(
            root.getByRole('button', {
              name: includedFolder.name
            }),
            'checkbox'
          )
          expect(folderToggle).toBeEnabled()
          if (includedFolder === folderToExclude) {
            expect(folderToggle).not.toBeChecked()
          } else {
            expect(folderToggle).toBeChecked()
          }
        }
      })
    })

    describe('and the dialog is validated', () => {
      const run = () => {
        const { root } = setup()
        fireEvent.click(root.getByRole('button', { name: 'OK' }))
      }

      it('should call updateDirectoriesExclusions without folders', async () => {
        run()

        expect(updateDirectoriesExclusions).toHaveBeenCalledTimes(1)
        expect(updateDirectoriesExclusions).toHaveBeenCalledWith({
          client: mockClient,
          deviceToConfigure: toCozyOAuthClient(mockDevice),
          foldersToInclude: [],
          foldersToExclude: []
        })
        await waitFor(() =>
          expect(mockOnDeviceConfigured).toHaveBeenCalledTimes(1)
        )
      })
    })
  })

  describe('when the folders query yields only excluded folders', () => {
    beforeEach(() => {
      useQuery
        .mockReturnValueOnce({
          fetchStatus: 'loading'
        })
        .mockReturnValue({
          fetchStatus: 'loaded',
          data: excludedFolders
        })
    })

    it('should render a checked partial sync selector', () => {
      const { root } = setup()
      expect(
        root.getByLabelText('Synchronize only the selected folders:')
      ).toBeChecked()
    })

    it('should render a list of unchecked and enabled folder toggles', () => {
      const { root } = setup()
      const folderToggles = root.getAllByRole('checkbox')
      for (const folderToggle of folderToggles) {
        expect(folderToggle).not.toBeChecked()
        expect(folderToggle).toBeEnabled()
      }
    })

    describe('and partial sync is disabled', () => {
      const run = () => {
        const { root } = setup()
        const partialSyncToggle = root.getByLabelText(
          'Synchronize my whole Cozy'
        )

        fireEvent.click(partialSyncToggle)

        return { partialSyncToggle, root }
      }

      it('should render a checked whole Cozy sync selector', () => {
        const { partialSyncToggle } = run()

        expect(partialSyncToggle).toBeChecked()
      })

      it('should render a list of unchecked and disabled folder toggles', () => {
        const { root } = run()

        const folderToggles = root.getAllByRole('checkbox')
        for (const folderToggle of folderToggles) {
          expect(folderToggle).not.toBeChecked()
          expect(folderToggle).toBeDisabled()
        }
      })
    })

    describe('and the all folders toggle is clicked', () => {
      const run = () => {
        const { root } = setup()
        const allFoldersToggle = getByRole(
          root.getByTestId('toggle-all-inclusion'),
          'checkbox'
        )

        fireEvent.click(allFoldersToggle)

        return { root }
      }

      it('should render a checked whole Cozy sync selector', () => {
        const { root } = run()

        expect(root.getByLabelText('Synchronize my whole Cozy')).toBeChecked()
      })

      it('should render a list of checked and disabled folder toggles', () => {
        const { root } = run()

        const folderToggles = root.getAllByRole('checkbox')
        for (const folderToggle of folderToggles) {
          expect(folderToggle).toBeChecked()
          expect(folderToggle).toBeDisabled()
        }
      })
    })

    describe('and a folder is included', () => {
      const folderToInclude = excludedFolders[0]
      const run = () => {
        const { root } = setup()
        const folderToggle = root.getByRole('button', {
          name: folderToInclude.name
        })

        fireEvent.click(folderToggle)

        return { root }
      }

      it('should render a checked partial sync selector', () => {
        const { root } = run()

        expect(
          root.getByLabelText('Synchronize only the selected folders:')
        ).toBeChecked()
      })

      it('should render a mixed checked and enabled all folders toggle', () => {
        const { root } = run()

        const allFoldersToggle = getByRole(
          root.getByTestId('toggle-all-inclusion'),
          'checkbox'
        )
        expect(allFoldersToggle).toBePartiallyChecked()
        expect(allFoldersToggle).toBeEnabled()
      })

      it('should render a list of enabled folder toggles, unchecked except the clicked one', () => {
        const { root } = run()

        for (const excludedFolder of excludedFolders) {
          const folderToggle = getByRole(
            root.getByRole('button', {
              name: excludedFolder.name
            }),
            'checkbox'
          )
          expect(folderToggle).toBeEnabled()
          if (excludedFolder === folderToInclude) {
            expect(folderToggle).toBeChecked()
          } else {
            expect(folderToggle).not.toBeChecked()
          }
        }
      })
    })

    describe('and the dialog is validated', () => {
      const run = () => {
        const { root } = setup()
        fireEvent.click(root.getByRole('button', { name: 'OK' }))
      }

      it('should call updateDirectoriesExclusions without folders', async () => {
        run()

        expect(updateDirectoriesExclusions).toHaveBeenCalledTimes(1)
        expect(updateDirectoriesExclusions).toHaveBeenCalledWith({
          client: mockClient,
          deviceToConfigure: toCozyOAuthClient(mockDevice),
          foldersToInclude: [],
          foldersToExclude: []
        })
        await waitFor(() =>
          expect(mockOnDeviceConfigured).toHaveBeenCalledTimes(1)
        )
      })
    })
  })

  describe('when the folders query yields both included and excluded folders', () => {
    beforeEach(() => {
      useQuery
        .mockReturnValueOnce({
          fetchStatus: 'loading'
        })
        .mockReturnValue({
          fetchStatus: 'loaded',
          data: mockFolders
        })
    })

    it('should render an enabled and checked partial sync selector', () => {
      const { root } = setup()
      expect(root.getByLabelText('Synchronize my whole Cozy')).toBeEnabled()
      expect(
        root.getByLabelText('Synchronize only the selected folders:')
      ).toBeEnabled()
      expect(
        root.getByLabelText('Synchronize only the selected folders:')
      ).toBeChecked()
    })

    it('should render a mixed checked and enabled all folders toggle', () => {
      const { root } = setup()
      const allFoldersToggle = getByRole(
        root.getByTestId('toggle-all-inclusion'),
        'checkbox'
      )
      expect(allFoldersToggle).toBePartiallyChecked()
      expect(allFoldersToggle).toBeEnabled()
    })

    it('should render a list of enabled folder toggles, checked for included folders', () => {
      const { root } = setup()

      for (const includedFolder of includedFolders) {
        const folderToggle = getByRole(
          root.getByRole('button', {
            name: includedFolder.name
          }),
          'checkbox'
        )
        expect(folderToggle).toBeEnabled()
        expect(folderToggle).toBeChecked()
      }
      for (const excludedFolder of excludedFolders) {
        const folderToggle = getByRole(
          root.getByRole('button', {
            name: excludedFolder.name
          }),
          'checkbox'
        )
        expect(folderToggle).toBeEnabled()
        expect(folderToggle).not.toBeChecked()
      }
    })

    describe('and partial sync is disabled', () => {
      const run = () => {
        const { root } = setup()
        const partialSyncToggle = root.getByLabelText(
          'Synchronize my whole Cozy'
        )

        fireEvent.click(partialSyncToggle)

        return { partialSyncToggle, root }
      }

      it('should render a checked whole Cozy sync selector', () => {
        const { partialSyncToggle } = run()

        expect(partialSyncToggle).toBeChecked()
      })

      it('should render a list of disabled folder toggles, checked for included ones', () => {
        const { root } = run()

        for (const includedFolder of includedFolders) {
          const folderToggle = getByRole(
            root.getByRole('button', {
              name: includedFolder.name
            }),
            'checkbox'
          )
          expect(folderToggle).toBeDisabled()
          expect(folderToggle).toBeChecked()
        }
        for (const excludedFolder of excludedFolders) {
          const folderToggle = getByRole(
            root.getByRole('button', {
              name: excludedFolder.name
            }),
            'checkbox'
          )
          expect(folderToggle).toBeDisabled()
          expect(folderToggle).not.toBeChecked()
        }
      })
    })

    describe('and all folders are excluded', () => {
      const run = () => {
        const { root } = setup()
        for (const folderToExclude of includedFolders) {
          const folderToggle = root.getByRole('button', {
            name: folderToExclude.name
          })

          fireEvent.click(folderToggle)
        }

        return { root }
      }

      it('should render a checked partial sync selector', () => {
        const { root } = run()

        expect(
          root.getByLabelText('Synchronize only the selected folders:')
        ).toBeChecked()
      })

      it('should render a list of unchecked and enabled folder toggles', () => {
        const { root } = run()

        const folderToggles = root.getAllByRole('checkbox')
        for (const folderToggle of folderToggles) {
          expect(folderToggle).not.toBeChecked()
          expect(folderToggle).toBeEnabled()
        }
      })
    })

    describe('and all folders are included', () => {
      const run = () => {
        const { root } = setup()
        for (const folderToInclude of excludedFolders) {
          const folderToggle = root.getByRole('button', {
            name: folderToInclude.name
          })

          fireEvent.click(folderToggle)
        }

        return { root }
      }

      it('should render a checked whole Cozy sync selector', () => {
        const { root } = run()

        expect(root.getByLabelText('Synchronize my whole Cozy')).toBeChecked()
      })

      it('should render a list of checked and disabled folder toggles', () => {
        const { root } = run()

        const folderToggles = root.getAllByRole('checkbox')
        for (const folderToggle of folderToggles) {
          expect(folderToggle).toBeChecked()
          expect(folderToggle).toBeDisabled()
        }
      })
    })

    describe('and the dialog is validated', () => {
      const run = () => {
        const { root } = setup()
        fireEvent.click(root.getByRole('button', { name: 'OK' }))
      }

      it('should call updateDirectoriesExclusions without folders', async () => {
        run()

        expect(updateDirectoriesExclusions).toHaveBeenCalledTimes(1)
        expect(updateDirectoriesExclusions).toHaveBeenCalledWith({
          client: mockClient,
          deviceToConfigure: toCozyOAuthClient(mockDevice),
          foldersToInclude: [],
          foldersToExclude: []
        })
        await waitFor(() =>
          expect(mockOnDeviceConfigured).toHaveBeenCalledTimes(1)
        )
      })
    })

    describe('and some folder inclusions are changed and saved', () => {
      const folderToInclude = excludedFolders[0]
      const folderToExclude = includedFolders[0]

      const run = () => {
        const { root } = setup()

        fireEvent.click(
          root.getByRole('button', {
            name: folderToInclude.name
          })
        )
        fireEvent.click(
          root.getByRole('button', {
            name: folderToExclude.name
          })
        )

        fireEvent.click(root.getByRole('button', { name: 'OK' }))
      }

      it('should call updateDirectoriesExclusions with the changed folders', async () => {
        run()

        expect(updateDirectoriesExclusions).toHaveBeenCalledTimes(1)
        expect(updateDirectoriesExclusions).toHaveBeenCalledWith({
          client: mockClient,
          deviceToConfigure: toCozyOAuthClient(mockDevice),
          foldersToInclude: [toCozyDirectory(folderToInclude)],
          foldersToExclude: [toCozyDirectory(folderToExclude)]
        })
        await waitFor(() =>
          expect(mockOnDeviceConfigured).toHaveBeenCalledTimes(1)
        )
      })
    })

    describe('and some folder inclusions are changed and cancelled', () => {
      const folderToInclude = excludedFolders[0]
      const folderToExclude = includedFolders[0]

      const run = () => {
        const { root } = setup()

        fireEvent.click(
          root.getByRole('button', {
            name: folderToInclude.name
          })
        )
        fireEvent.click(
          root.getByRole('button', {
            name: folderToExclude.name
          })
        )

        fireEvent.click(root.getByRole('button', { name: 'Cancel' }))
      }

      it('should not call updateDirectoriesExclusions', async () => {
        run()

        expect(updateDirectoriesExclusions).toHaveBeenCalledTimes(0)
        await waitFor(() =>
          expect(mockOnDeviceConfigured).toHaveBeenCalledTimes(0)
        )
        expect(mockCancelAction).toHaveBeenCalledTimes(1)
      })
    })
  })
})
