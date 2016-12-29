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
      { test: /\.eot$/, loader: 'url?limit=8192&mimetype=application/vnd.ms-fontobject&emitFile=false' },
      { test: /\.jpg$/, loader: 'url?limit=8192&mimetype=image/jpeg&emitFile=false' },
      { test: /\.png$/, loader: 'url?limit=8192&mimetype=image/png&emitFile=false' },
      { test: /\.svg$/, loader: 'url?limit=8192&mimetype=image/svg+xml&emitFile=false' },
      { test: /\.ttf$/, loader: 'url?limit=8192&mimetype=application/font-sfnt&emitFile=false' },
      { test: /\.woff$/, loader: 'url?limit=8192&mimetype=application/font-woff&emitFile=false' },
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
      'shared/containers': 'containers',
      'shared/routes': 'routes',
      'shared/styles': 'styles',
      'shared/utils': 'utils',
    },
    modulesDirectories: ['shared', 'node_modules'],
  },
  target: 'node',
};
