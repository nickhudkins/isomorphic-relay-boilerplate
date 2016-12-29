import React from 'react';
import Link from 'react-router/lib/Link';

export default ({ children, ...rest }) => (
  <div>
    DETAIL
    <img src={require('./things/foo.png')} />
  </div>
)
