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

import RemoveCompletedTodosMutation from '../mutations/RemoveCompletedTodosMutation';
import TodoListFooterView from '../views/TodoListFooterView';

class TodoListFooter extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.shape({
      completedCount: React.PropTypes.number.isRequired,
      totalCount: React.PropTypes.number.isRequired,
    }).isRequired,
  };

  _handleRemoveCompletedTodosClick = () => {
    Relay.Store.commitUpdate(new RemoveCompletedTodosMutation({ viewer: this.props.viewer }));
  };

  render() {
    const { completedCount, totalCount } = this.props.viewer;
    return (
      <TodoListFooterView
        completedCount={completedCount}
        onRemoveCompletedTodosClick={this._handleRemoveCompletedTodosClick}
        remainingTodos={totalCount - completedCount}
      />
    );
  }
}

export default Relay.createContainer(TodoListFooter, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        completedCount,
        totalCount,
        ${RemoveCompletedTodosMutation.getFragment('viewer')},
      }
    `,
  },
});
