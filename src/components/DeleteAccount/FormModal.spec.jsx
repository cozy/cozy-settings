'use strict'

/* eslint-env jest */

import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import FormModal from './FormModal'
import { BreakpointsProvider } from 'cozy-ui/transpiled/react/hooks/useBreakpoints'
import { I18n } from 'cozy-ui/transpiled/react/I18n'
import langEn from 'locales/en.json'

jest.mock('actions/domUtils', () => ({
  getStackDomain: () => 'http://cozy.tools:8080',
  getStackToken: () => 'fake-token'
}))

jest.mock('actions/email', () => ({
  sendDeleteAccountRequest: jest.fn()
}))

const TestI18n = ({ children }) => {
  return (
    <I18n lang={'en'} dictRequire={() => langEn}>
      {children}
    </I18n>
  )
}

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

    const root = render(
      <BreakpointsProvider>
        <TestI18n>
          <FormModal onClose={jest.fn()} />
        </TestI18n>
      </BreakpointsProvider>
    )

    fireEvent.click(root.getByText('Send'))

    expect(sendDeleteAccountRequest.mock.calls[0][1]).toEqual(
      expect.stringContaining(mockDomain)
    )
    jest.dontMock('actions/email')
  })
})
