const configs = [
  require('cozy-scripts/config/webpack.bundle.default'),
  require('cozy-scripts/config/webpack.config.css-modules'),
  require('./config/webpack.config.piwik'),
  require('./config/webpack.config.cozy-ui')
]

module.exports = configs
