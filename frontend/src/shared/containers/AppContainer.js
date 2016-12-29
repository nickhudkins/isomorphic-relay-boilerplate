import React from 'react';
import Relay from 'react-relay';
import Link from 'react-router/lib/Link';

class AppContainer extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    const { children } = this.props
    return (
      <div>
        <Link to="/section-one">Click Me</Link>
        { children }
      </div>
    );
  }
}

export default Relay.createContainer(AppContainer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        id
      }
    `,
  },
});
