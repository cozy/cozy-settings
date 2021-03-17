'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { App } from 'components/App'

jest.mock('lib/client', () => {
  const CozyClient = jest.requireActual('cozy-client').default
  return new CozyClient({})
})

describe('App component only', () => {
  it('should be mounted correctly', () => {
    const component = shallow(<App />).getElement()
    expect(component).toMatchSnapshot()
  })
})
