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

import ChangeTodoStatusMutation from '../mutations/ChangeTodoStatusMutation';
import RemoveTodoMutation from '../mutations/RemoveTodoMutation';
import RenameTodoMutation from '../mutations/RenameTodoMutation';
import TodoView from '../views/TodoView';

class Todo extends React.Component {
  static propTypes = {
    todo: React.PropTypes.shape({
      complete: React.PropTypes.bool.isRequired,
      id: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
    }).isRequired,
    viewer: React.PropTypes.object.isRequired,
  };
  state = {
    isEditing: false,
  };

  _handleCompleteChange = event => {
    Relay.Store.commitUpdate(
      new ChangeTodoStatusMutation({
        complete: event.target.checked,
        todo: this.props.todo,
        viewer: this.props.viewer,
      })
    );
  };

  _handleDestroyClick = () => {
    this._removeTodo();
  };

  _handleLabelDoubleClick = () => {
    this._setEditMode(true);
  };

  _handleTextInputCancel = () => {
    this._setEditMode(false);
  };

  _handleTextInputDelete = () => {
    this._setEditMode(false);
    this._removeTodo();
  };

  _handleTextInputSave = text => {
    this._setEditMode(false);
    Relay.Store.commitUpdate(
      new RenameTodoMutation({ todo: this.props.todo, text })
    );
  };

  _removeTodo() {
    Relay.Store.commitUpdate(
      new RemoveTodoMutation({ todo: this.props.todo, viewer: this.props.viewer })
    );
  }

  _setEditMode = shouldEdit => {
    this.setState({ isEditing: shouldEdit });
  };

  render() {
    return (
      <TodoView
        todo={this.props.todo}
        isEditing={this.state.isEditing}
        onCompleteChange={this._handleCompleteChange}
        onDestroyClick={this._handleDestroyClick}
        onLabelDoubleClick={this._handleLabelDoubleClick}
        onTextInputCancel={this._handleTextInputCancel}
        onTextInputDelete={this._handleTextInputDelete}
        onTextInputSave={this._handleTextInputSave}
      />
    );
  }
}

export default Relay.createContainer(Todo, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        complete,
        id,
        text,
        ${ChangeTodoStatusMutation.getFragment('todo')},
        ${RemoveTodoMutation.getFragment('todo')},
        ${RenameTodoMutation.getFragment('todo')},
      }
    `,
    viewer: () => Relay.QL`
      fragment on Viewer {
        ${ChangeTodoStatusMutation.getFragment('viewer')},
        ${RemoveTodoMutation.getFragment('viewer')},
      }
    `,
  },
});
