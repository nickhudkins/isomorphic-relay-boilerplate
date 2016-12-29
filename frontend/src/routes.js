import React from 'react';
import { createRoutes, IndexRoute, Route } from 'react-router';
import Relay from 'react-relay';

import AppContainer from 'shared/containers/AppContainer';
import SectionOneRoutes from 'shared/routes/SectionOne';

const prepareParams = ({ status }) => ({
  status: ['active', 'completed'].includes(status) ? status : 'any',
});

const queries = {
  viewer: () => Relay.QL`query { viewer }`,
};

export default createRoutes(
  <Route path="/"
    component={ AppContainer }
    queries={ queries }
  >
    { SectionOneRoutes }
  </Route>
);
