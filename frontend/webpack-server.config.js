const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './routes',
  externals: [
    (context, request, callback) => {
      callback(null, !/^((|.|..|shared)\/|!|-!)/.test(request));
    },
  ],
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
        loaders:
          ['css/locals?modules&importLoaders=1&localIdentName=[local]-[hash:base64]', 'postcss'],
      },
    ],
  },
  output: {
    filename: 'routes.js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'lib'),
    publicPath: '/assets/',
  },
  postcss: () => [
    require('postcss-nested'),
  ],
  resolve: {
    alias: {
      'shared/components': 'components',
      'shared/styles': 'styles',
      'shared/utils': 'utils',
    },
    modulesDirectories: ['shared', 'node_modules'],
  },
  target: 'node',
};
