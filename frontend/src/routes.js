import React from 'react';
import { createRoutes, IndexRoute, Route } from 'react-router';
import Relay from 'react-relay';

import TodoApp from './screens/TodoApp';
import TodoList from './screens/TodoApp/screens/TodoList';

const prepareParams = ({ status }) => ({
  status: ['active', 'completed'].includes(status) ? status : 'any',
});

const queries = {
  viewer: () => Relay.QL`query { viewer }`,
};

export default createRoutes(
  <Route path="/" component={TodoApp} queries={queries}>
    <IndexRoute component={TodoList} prepareParams={prepareParams} queries={queries} />
    <Route path=":status" component={TodoList} prepareParams={prepareParams} queries={queries} />
  </Route>
);
