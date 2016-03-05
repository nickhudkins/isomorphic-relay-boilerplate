import Relay from 'react-relay';

import TodoApp from './screens/TodoApp';
import TodoList from './screens/TodoApp/screens/TodoList';

const prepareParams = ({ status }) => ({
  status: ['active', 'completed'].includes(status) ? status : 'any',
});

const queries = {
  viewer: () => Relay.QL`query { viewer }`,
};

export default [
  {
    queries,
    path: '/',
    component: TodoApp,
    indexRoute: {
      prepareParams,
      queries,
      component: TodoList,
    },
    childRoutes: [
      {
        prepareParams,
        queries,
        path: ':status',
        component: TodoList,
      },
    ],
  },
];
