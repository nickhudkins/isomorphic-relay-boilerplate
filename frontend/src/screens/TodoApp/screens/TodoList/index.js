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

import MarkAllTodosMutation from './mutations/MarkAllTodosMutation';
import Todo from './components/Todo';
import TodoListView from './views/TodoListView';

class TodoList extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.shape({
      completedCount: React.PropTypes.number.isRequired,
      todos: React.PropTypes.shape({
        edges: React.PropTypes.arrayOf(
          React.PropTypes.shape({
            node: React.PropTypes.shape({
              id: React.PropTypes.string.isRequired,
            }).isRequired,
          }).isRequired
        ).isRequired,
      }).isRequired,
      totalCount: React.PropTypes.number.isRequired,
    }),
  };

  _handleMarkAllChange = event => {
    Relay.Store.commitUpdate(
      new MarkAllTodosMutation({
        complete: event.target.checked,
        todos: this.props.viewer.todos,
        viewer: this.props.viewer,
      })
    );
  };

  render() {
    const { viewer } = this.props;
    return (
      <TodoListView
        completedCount={viewer.completedCount}
        onMarkAllChange={this._handleMarkAllChange}
        totalCount={viewer.totalCount}
      >
        {viewer.todos.edges.map(edge => edge.node).map(todo =>
          <Todo key={todo.id} todo={todo} viewer={viewer} />
        )}
      </TodoListView>
    );
  }
}

export default Relay.createContainer(TodoList, {
  initialVariables: {
    status: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        completedCount,
        todos(status: $status, first: 2147483647) {
          edges {
            node {
              id,
              ${Todo.getFragment('todo')},
            },
          },
          ${MarkAllTodosMutation.getFragment('todos')},
        },
        totalCount,
        ${MarkAllTodosMutation.getFragment('viewer')},
        ${Todo.getFragment('viewer')},
      }
    `,
  },
});
