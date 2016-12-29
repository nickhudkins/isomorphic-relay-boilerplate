import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';

import config from '../config.json';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import graphql from './middlewares/graphql';
import { graphqlBatchHTTPWrapper } from 'react-relay-network-layer';

const app = express();

app.use('/', graphql);
app.use('/batch',
  bodyParser.json(),
  graphqlBatchHTTPWrapper(graphql)
);
app.use(errorHandler);

const server = app.listen(config.port, err => {
  if (err) {
    logger.error(err);
  } else {
    const { address, port } = server.address();
    logger.info(`Backend is listening at http://${address}:${port}`);

    if (process.send) {
      process.send('ready');
    }
  }
});
