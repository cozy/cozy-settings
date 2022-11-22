const configs = [
  require('cozy-scripts/config/webpack.bundle.default'),
  require('cozy-scripts/config/webpack.config.css-modules'),
  {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /node_modules\/react-dom/,
          use: ['react-hot-loader/webpack']
        }
      ]
    }
  }
]

module.exports = configs
