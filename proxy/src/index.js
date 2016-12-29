import 'babel-polyfill';
import compression from 'compression';
import express from 'express';

import config from '../config.json';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import proxy from './middlewares/proxy';

const app = express();

app.use(compression({ level: 2 }));
app.use(config.graphQLPath, proxy(config.backendAddress));
app.use(config.graphQLPathBatch, proxy(config.backendAddress));
app.use(proxy(config.frontendAddress));
app.use(errorHandler);

const server = app.listen(process.env.PORT || config.port, err => {
  if (err) {
    logger.error(err);
  } else {
    const { address, port } = server.address();
    logger.info(`Proxy is listening at http://${address}:${port}`);

    if (process.send) {
      process.send('ready');
    }
  }
});
