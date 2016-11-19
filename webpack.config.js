const {resolve} = require('path');
const BabiliPlugin = require("babili-webpack-plugin");
const {DefinePlugin} = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    bundle: './src/index.browser.js'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve(__dirname, 'src')
        ],
        query: {
          presets: [
            ['env', {
              targets: {
                node: 'current',
                browsers: '> 5% in US'
              },
              loose: true
            }],
            'react',
            'stage-2',
          ],
          plugins: [
            'transform-runtime'
          ]
        }
      }
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),
    ...(NODE_ENV === 'production' ? [
      new BabiliPlugin({
        comments: false
      })
    ] : [])
  ]
};
