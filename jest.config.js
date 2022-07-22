module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  setupFiles: ['<rootDir>/test/jestLib/setup.js'],
  moduleDirectories: ['<rootDir>/src', 'node_modules'],
  moduleNameMapper: {
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    '^styles': 'identity-obj-proxy',
    '\\.styl$': 'identity-obj-proxy',
    '\\.css$': 'identity-obj-proxy',
    '^cozy-ui/react(.*)$': '<rootDir>/node_modules/cozy-ui/transpiled/react$1',
    '^cozy-client$': 'cozy-client/dist/index.js'
  },
  transformIgnorePatterns: ['node_modules/(?!cozy-ui)/'],
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    cozy: {}
  },
  resolver: "<rootDir>/test/jestLib/resolver.js"
}
