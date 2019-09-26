module.exports = {
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'json', 'styl'],
  setupFiles: ['<rootDir>/test/jestLib/setup.js'],
  moduleDirectories: ['src', 'node_modules'],
  moduleNameMapper: {
    '\\.(png|gif|jpe?g|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
    // identity-obj-proxy module is installed by cozy-scripts
    '^styles': 'identity-obj-proxy',
    '\\.css$': 'identity-obj-proxy',
    '^cozy-ui/react(.*)$': '<rootDir>/node_modules/cozy-ui/transpiled/react$1'
  },
  transformIgnorePatterns: ['node_modules/(?!cozy-ui|cozy-keys-lib)'],
  globals: {
    __ALLOW_HTTP__: false,
    __TARGET__: 'browser',
    cozy: {}
  }
}
