import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackCompiler from '../utils/webpackCompiler';

export default webpackHotMiddleware(webpackCompiler);
