import history from 'shared/utils/history';
import Relay from 'react-relay';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from 'isomorphic-relay-router';
import React from 'react';
import Router from 'react-router/lib/Router';
import match from 'react-router/lib/match';
import ReactDOM from 'react-dom';
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer';

import './styles/app.css';

const environment = new Relay.Environment();
const createNetworkLayer = () => {
  return new RelayNetworkLayer([
    urlMiddleware({

    })
  ])
}
const networkLayer = createNetworkLayer();
environment.injectNetworkLayer(networkLayer);

const data = JSON.parse(document.getElementById('preloadedData').textContent);
if (data.length > 0) {
  IsomorphicRelay.injectPreparedData(environment, data);
}

const rootElement = document.getElementById('root');

function render() {
  const routes = require('./routes').default;
  match({ routes, history }, (err, redirectLocation, renderProps) => {
    IsomorphicRouter.prepareInitialRender(environment, renderProps).then(props => {
      ReactDOM.render(
        <Router {...props} />,
        rootElement
      );
    })
  })

}

render();

if (module.hot) {
  module.hot.accept('./routes', () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(rootElement);
      render();
    });
  });
}
