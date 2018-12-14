'use strict'

/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { tMock } from '../jestLib/I18n'
import { Sidebar } from 'components/Sidebar'

describe('Sidebar component', () => {
  it('should be rendered correctly', () => {
    const component = shallow(<Sidebar t={tMock} />).getElement()
    expect(component).toMatchSnapshot()
  })
})
