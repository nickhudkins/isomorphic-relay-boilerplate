import config from '../../../config.json';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer';

export default (url, options) => {
  return new RelayNetworkLayer([
    urlMiddleware({
      url: () => `${process.env.APP_HOST}${config.graphQLAddress}`,
      batchUrl: () => `${process.env.APP_HOST}${config.graphQLBatchAddress}`,
    }),
  ], {
    disableBatchQuery: true,
  });
};
