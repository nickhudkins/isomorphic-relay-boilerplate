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
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          ['css?modules&importLoaders=1&localIdentName=[local]-[hash:base64]', 'postcss']
        ),
      },
      { test: /\.eot$/, loader: 'url?limit=8192&mimetype=application/vnd.ms-fontobject' },
      { test: /\.jpg$/, loader: 'url?limit=8192&mimetype=image/jpeg' },
      { test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png' },
      { test: /\.svg$/, loader: 'url?limit=8192&mimetype=image/svg+xml' },
      { test: /\.ttf$/, loader: 'url?limit=8192&mimetype=application/font-sfnt' },
      { test: /\.woff$/, loader: 'url?limit=8192&mimetype=application/font-woff' },
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        APP_HOST: JSON.stringify(process.env.APP_HOST),
      },
    }),
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
      'shared/containers': 'containers',
      'shared/routes': 'routes',
      'shared/styles': 'styles',
      'shared/utils': 'utils',
    },
    modulesDirectories: ['shared', 'node_modules'],
  },
};
