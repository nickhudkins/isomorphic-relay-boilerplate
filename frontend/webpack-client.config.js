const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const development = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    app: ['babel-polyfill', './app'].concat(development ? ['webpack-hot-middleware/client'] : []),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          ['css?modules&importLoaders=1&localIdentName=[local]-[hash:base64]', 'postcss']
        ),
      },
      {
        test: /\.svg$/,
        loader: 'url?limit=4096&mimetype=image/svg+xml',
      },
    ],
  },
  output: {
    filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash].js' : '[name].js',
    path: path.join(__dirname, 'assets'),
    publicPath: '/assets/',
  },
  plugins: [
    new ExtractTextPlugin(
      '[name].[contenthash].css',
      {
        allChunks: true,
        disable: development,
      }
    ),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ].concat(development ? [
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.optimize.UglifyJsPlugin(),
    function writeAssetList() {
      this.plugin('done', stats => {
        fs.writeFileSync(
          path.join(__dirname, 'assets.json'),
          JSON.stringify(stats.toJson().assetsByChunkName, null, '  ')
        );
      });
    },
  ]),
  postcss: () => [
    require('autoprefixer'),
    require('postcss-nested'),
  ],
  resolve: {
    alias: {
      'shared/components': 'components',
      'shared/styles': 'styles',
    },
    modulesDirectories: ['shared', 'node_modules'],
  },
};
