/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only.  Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import React from 'react';
import Relay from 'react-relay';

import AddTodoMutation from './mutations/AddTodoMutation';
import TodoAppView from './views/TodoAppView';
import TodoListFooter from './components/TodoListFooter';

class TodoApp extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    viewer: React.PropTypes.shape({
      totalCount: React.PropTypes.number.isRequired,
    }).isRequired,
  };

  _handleTextInputSave = text => {
    Relay.Store.commitUpdate(
      new AddTodoMutation({ text, viewer: this.props.viewer })
    );
  };

  render() {
    return (
      <TodoAppView onTextInputSave={this._handleTextInputSave} >
        {this.props.children}
        {this.props.viewer.totalCount > 0 && <TodoListFooter viewer={this.props.viewer} />}
      </TodoAppView>
    );
  }
}

export default Relay.createContainer(TodoApp, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        totalCount,
        ${AddTodoMutation.getFragment('viewer')},
        ${TodoListFooter.getFragment('viewer')},
      }
    `,
  },
});
