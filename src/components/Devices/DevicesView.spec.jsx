import React from 'react'
import { render, screen } from '@testing-library/react'

import { createMockClient } from 'cozy-client'

import { DevicesView } from './DevicesView'
import AppLike from 'test/AppLike'
import { OAUTH_CLIENTS_DOCTYPE } from 'doctypes'

const pendingDevice = {
  id: 'mock-device-pending',
  _id: 'mock-device-pending',
  _type: 'io.cozy.oauth.clients',
  pending: true,
  client_kind: 'desktop',
  client_name: 'Mock Device Pending'
}

const connectedDevice = {
  id: 'mock-device-connected',
  _id: 'mock-device-connected',
  _type: 'io.cozy.oauth.clients',
  client_kind: 'desktop',
  client_name: 'Mock Device Connected'
}

const sharingDevice = {
  id: 'mock-device-sharing',
  _id: 'mock-device-sharing',
  _type: 'io.cozy.oauth.clients',
  client_kind: 'sharing',
  client_name: 'Mock Sharing xyz'
}

jest.mock('components/Premium/PremiumLink', () => ({
  PremiumLink: () => <div>PremiumLink</div>
}))

describe('DevicesView', () => {
  const setup = ({ devices = [] }) => {
    const mockClient = createMockClient({
      queries: {
        'io.cozy.oauth.clients _id asc': {
          doctype: OAUTH_CLIENTS_DOCTYPE,
          data: devices
        }
      }
    })
    return render(
      <AppLike client={mockClient}>
        <DevicesView />
      </AppLike>
    )
  }

  it('displays fully connected user devices only', () => {
    setup({ devices: [pendingDevice, connectedDevice, sharingDevice] })

    expect(screen.queryByText('Mock Device Connected')).toBeInTheDocument()
    expect(screen.queryByText('Mock Device Pending')).not.toBeInTheDocument()
    expect(screen.queryByText('Mock Sharing xzy')).not.toBeInTheDocument()
  })
})
