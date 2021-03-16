require('@babel/polyfill')

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

process.env.USE_REACT = true

window.__DEVELOPMENT__ = false

// To avoid the errors while creating theme (since no CSS stylesheet
// defining CSS variables is injected during tests)
// Material-UI: the color provided to augmentColor(color) is invalid.
// The color object needs to have a `main` property or a `500` property.
jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  getCssVariableValue: () => '#fff'
}))

// polyfill for requestAnimationFrame
/* istanbul ignore next */
global.requestAnimationFrame = cb => {
  setTimeout(cb, 0)
}

window.cozy = {
  bar: {
    BarCenter: ({ children }) => children,
    BarLeft: ({ children }) => children,
    BarRight: ({ children }) => children
  }
}
