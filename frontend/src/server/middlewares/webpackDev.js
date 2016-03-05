import webpackDevMiddleware from 'webpack-dev-middleware';

import webpackCompiler from '../utils/webpackCompiler';
import webpackConfig from '../../../webpack-client.config';

export default webpackDevMiddleware(
  webpackCompiler,
  { noInfo: true, publicPath: webpackConfig.output.publicPath }
);
