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

import Relay from 'react-relay';

export default class RemoveCompletedTodosMutation extends Relay.Mutation {
  static fragments = {
    // TODO: Make completedCount, edges, and totalCount optional
    viewer: () => Relay.QL`
      fragment on Viewer {
        completedCount,
        id,
        todos(status: "completed", first: 2147483647) {
          edges {
            node {
              complete,
              id,
            },
          },
        },
        totalCount,
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{removeCompletedTodos}`;
  }

  getFatQuery() {
    return Relay.QL`
      fragment on RemoveCompletedTodosPayload @relay(pattern: true) {
        deletedTodoIds,
        viewer {
          completedCount,
          totalCount,
        },
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'todos',
      deletedIDFieldName: 'deletedTodoIds',
    }];
  }

  getVariables() {
    return {};
  }

  getOptimisticResponse() {
    const { todos } = this.props.viewer;
    let deletedTodoIds;
    if (todos && todos.edges) {
      deletedTodoIds = todos.edges.filter(edge => edge.node.complete).map(edge => edge.node.id);
    }

    const { completedCount, totalCount } = this.props.viewer;
    let newTotalCount;
    if (completedCount !== null && totalCount !== null) {
      newTotalCount = totalCount - completedCount;
    }

    return {
      deletedTodoIds,
      viewer: {
        completedCount: 0,
        id: this.props.viewer.id,
        totalCount: newTotalCount,
      },
    };
  }
}
