require('@babel/polyfill')

import '@testing-library/jest-dom'

process.env.USE_REACT = true

window.__DEVELOPMENT__ = false

// To avoid the errors while creating theme (since no CSS stylesheet
// defining CSS variables is injected during tests)
// Material-UI: the color provided to augmentColor(color) is invalid.
// The color object needs to have a `main` property or a `500` property.
jest.mock('cozy-ui/transpiled/react/utils/color', () => ({
  getCssVariableValue: () => '#fff',
  getInvertedCssVariableValue: () => '#fff'
}))

jest.mock('cozy-intent', () => ({
  WebviewIntentProvider: ({ children }) => children,
  useWebviewIntent: () => ({ call: () => {} })
}))

jest.mock('../../src/actions/domUtils.js', () => ({
  getStackDomain: () => 'http://test.mycozy.cloud',
  getStackToken: () => 'http://test.mycozy.cloud'
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
