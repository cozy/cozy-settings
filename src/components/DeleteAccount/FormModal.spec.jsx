'use strict'

/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'
import { FormModal } from './FormModal'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

jest.mock('actions/domUtils', () => ({
  getStackDomain: () => 'http://cozy.tools:8080',
  getStackToken: () => 'fake-token'
}))

jest.mock('actions/email', () => ({
  sendDeleteAccountRequest: jest.fn()
}))

const tMock = (key, options) =>
  `${key} ${options && [].concat.apply([], Object.values(options))}`

describe('FormModal component', () => {
  const mockDomain = 'cozy.tools:8080'
  // set the DOM data filled by cozy-stack
  beforeAll(() => {
    document.body.innerHTML = `<div role="application" data-cozy-domain="${mockDomain}" />`
  })

  afterAll(() => {
    document.body.innerHTML = ''
  })

  it('should read correctly Cozy Domain on send action ', async () => {
    const { sendDeleteAccountRequest } = require('actions/email')

    const formInstance = mount(
      <BreakpointsProvider>
        <FormModal t={tMock} onClose={jest.fn()} />
      </BreakpointsProvider>
    )
      .find(FormModal)
      .instance()
    await formInstance.onSend(new Event('submit'))

    expect(sendDeleteAccountRequest.mock.calls[0][0]).toEqual(
      expect.stringContaining(mockDomain)
    )
    jest.dontMock('actions/email')
  })
})
