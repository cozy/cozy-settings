const path = require('path')
const cozyUIPlugin = require('cozy-ui/stylus')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rspack = require('@rspack/core');
const polyfillPlugin = require("@rspack/plugin-node-polyfill");


module.exports = {
  entry: {
    main: './src/targets/browser/index.jsx'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      styles: path.resolve(__dirname, 'src/styles/'),
      components: path.resolve(__dirname, 'src/components'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      lib: path.resolve(__dirname, 'src/lib'),
      actions: path.resolve(__dirname, 'src/actions'),
      constants: path.resolve(__dirname, 'src/constants'),
      containers: path.resolve(__dirname, 'src/containers'),
      services: path.resolve(__dirname, 'src/services'),
      assets: path.resolve(__dirname, 'src/assets'),
      doctypes: path.resolve(__dirname, 'src/doctypes'),
      config: path.resolve(__dirname, 'src/config'),
      locales: path.resolve(__dirname, 'src/locales'),
      path: require.resolve('path-browserify')
    }
  },
  module: {
    rules: [
      { test: /\.webapp$/i, type: "asset/source" },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/inline'
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: require.resolve('stylus-loader'),
            options: {
              stylusOptions: {
                paths: [path.resolve(__dirname, "node_modules", 'cozy-ui/stylus')]
              }
            }
          }
        ],
      },
      {
        test: /\.ejs$/i,
        use: ['template-ejs-loader']
      },
      {
        test: /\.jsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'typescript',
                tsx: true,
              },
            },
          },
        },
        type: 'javascript/auto',
      }
    ]
  },
  builtins: {
    html: [
      {
        template: path.resolve(__dirname, 'src/targets/browser/index.html'),
        filename: 'index.html'
      }
    ],
    define: {
      "process.env.NODE_ENV": "'production'",
      __DEVELOPMENT__: true
    }
  },
  plugins: [
    new polyfillPlugin(),
    new rspack.CopyRspackPlugin({
      patterns: [
        {
          from: 'manifest.webapp',
        },
        {
          from: 'README.md'
        },
        {
          from: 'LICENSE'
        }
      ],
    }),
  ],
  target: 'web',
  mode: 'development'
}
