import config from '../../../config.json';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer';

export default (url, options) => {
  return new RelayNetworkLayer([
    urlMiddleware({
      url: () => config.graphQLAddress,
      batchUrl: () => graphQLBatchAddress,
    })
  ], {
    disableBatchQuery: true,
  })
}
