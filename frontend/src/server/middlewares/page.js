import IsomorphicRelayRouter from 'isomorphic-relay-router';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Relay from 'react-relay';
import { match } from 'react-router';

import config from '../../../config.json';
import Page from '../components/Page';

import createNetworkLayer from '../utils/createServerNetworkLayer';

const relayEnvironment = new Relay.Environment();
const networkLayer = createNetworkLayer();
relayEnvironment.injectNetworkLayer(networkLayer);

export default (req, res, next) => {
  let cssUri;
  let jsUri;
  const { DISABLE_SSR } = process.env;
  if (!DISABLE_SSR) {
    const routes = require('../../routes').default;
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      function render({ data, props }) {
        if (process.env.NODE_ENV === 'production') {
          const assets = require('../../../assets.json');
          cssUri = `/assets/${assets.app.find(path => path.endsWith('.css'))}`;
          jsUri = `/assets/${assets.app.find(path => path.endsWith('.js'))}`;
        } else {
          cssUri = null;
          jsUri = '/assets/app.js';
        }

        const markup = ReactDOMServer.renderToString(
          IsomorphicRelayRouter.render(props)
        );
        res.send(`<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(
          <Page
            cssUri={cssUri}
            data={data}
            jsUri={jsUri}
            markup={markup}
          />
        )}`);
      }

      if (error) {
        next(error);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        IsomorphicRelayRouter.prepareData(renderProps, networkLayer).then(render, next);
      } else {
        res.status(404).send('Not Found');
      }
    });
  } else {
    const assets = require('../../../assets.json');
    cssUri = `/assets/${assets.app.find(path => path.endsWith('.css'))}`;
    jsUri = `/assets/${assets.app.find(path => path.endsWith('.js'))}`;
    res.send(`<!DOCTYPE html>\n${ReactDOMServer.renderToStaticMarkup(
      <Page
        cssUri={cssUri}
        data={[]}
        jsUri={jsUri}
        markup={''}
      />
    )}`);
  }
};
