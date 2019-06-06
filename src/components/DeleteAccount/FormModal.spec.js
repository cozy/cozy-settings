'use strict'

/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'

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
    jest.doMock('actions/email', () => ({
      sendDeleteAccountRequest: jest.fn()
    }))
    const { sendDeleteAccountRequest } = require('actions/email')
    const FormModal = require('./FormModal').FormModal
    const formInstance = mount(<FormModal t={tMock} />).instance()
    await formInstance.onSend(new Event('submit'))
    expect(sendDeleteAccountRequest.mock.calls[0][0]).toEqual(
      expect.stringContaining(mockDomain)
    )
    jest.dontMock('actions/email')
  })
})
