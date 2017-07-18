'use strict'

const { production } = require('./webpack.vars')

module.exports = {
  resolve: {
    extensiosn: ['.svg']
  },
  module: {
    loaders: [
      {
        test: /\.svg$/,
        include: /(sprites|icons)/,
        loader: 'svg-sprite?name=[name]_[hash]'
      },
      {
        test: /\.svg$/,
        include: /(services)/,
        loader: 'url-loader'
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/i,
        exclude: /(vendor|sprites|icons|services)/,
        loader: `file?path=img&name=[name]${production ? '.[hash].' : '.'}[ext]`
      }
    ]
  }
}
