import React from 'react';
import Route from 'react-router/lib/Route';

const getNotFound = (nextState, cb) => {
  cb(null, require('containers/NotFound/NotFound').default);
};

export default (
  <Route path='*' getComponent={ getNotFound } status={404} />
);
