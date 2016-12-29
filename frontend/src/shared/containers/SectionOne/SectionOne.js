import React from 'react';
import Link from 'react-router/lib/Link';

export default ({ children, ...rest }) => (
  <div>
    HELLO SECTION ONEeeee!
    <Link to="/section-one/1">Click Me to go deeper</Link>
    { children }
  </div>
)
