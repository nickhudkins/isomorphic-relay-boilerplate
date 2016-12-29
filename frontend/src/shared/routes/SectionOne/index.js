import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRoute from 'react-router/lib/IndexRoute';

import SectionOne from 'shared/containers/SectionOne/SectionOne';
import SectionOneDetail from 'shared/containers/SectionOne/SectionOneDetail';

export default (
  <Route path="section-one">
    <IndexRoute component={ SectionOne } />
    <Route path=":id" component={ SectionOneDetail } />
  </Route>
);
