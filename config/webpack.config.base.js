'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pkg = require(path.resolve(__dirname, '../package.json'))
const { extractor } = require('./webpack.vars')

module.exports = {
  entry: ['whatwg-fetch', path.resolve(__dirname, '../src/main')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.json']
  },
  devtool: '#source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: extractor.extract('style', [
          'css-loader?importLoaders=1',
          'postcss-loader'
        ])
      }
    ]
  },
  plugins: [
    extractor,
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: pkg.name,
      inject: false,
      minify: {
        collapseWhitespace: true
      }
    })
  ]
}
