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

import classnames from 'classnames';
import React from 'react';

import styles from '../styles/Todo.css';
import TodoTextInput from 'shared/components/TodoTextInput';

function TodoView({
  isEditing,
  onCompleteChange,
  onDestroyClick,
  onLabelDoubleClick,
  onTextInputCancel,
  onTextInputDelete,
  onTextInputSave,
  todo,
}) {
  const renderTextInput = () => (
    <TodoTextInput
      className={styles.edit}
      commitOnBlur
      initialValue={todo.text}
      onCancel={onTextInputCancel}
      onDelete={onTextInputDelete}
      onSave={onTextInputSave}
    />
  );
  return (
    <li
      className={classnames({
        [styles.completed]: todo.complete,
        [styles.editing]: isEditing,
        [styles.todo]: true,
      })}
    >
      <div className={styles.view}>
        <input
          checked={todo.complete}
          className={styles.toggle}
          onChange={onCompleteChange}
          type="checkbox"
        />
        <span className={styles.label} onDoubleClick={onLabelDoubleClick}>{todo.text}</span>
        <button className={styles.destroy} onClick={onDestroyClick} />
      </div>
      {isEditing && renderTextInput()}
    </li>
  );
}

TodoView.propTypes = {
  todo: React.PropTypes.shape({
    complete: React.PropTypes.bool.isRequired,
    text: React.PropTypes.string.isRequired,
  }).isRequired,
  isEditing: React.PropTypes.bool.isRequired,
  onCompleteChange: React.PropTypes.func.isRequired,
  onDestroyClick: React.PropTypes.func.isRequired,
  onLabelDoubleClick: React.PropTypes.func.isRequired,
  onTextInputCancel: React.PropTypes.func.isRequired,
  onTextInputDelete: React.PropTypes.func.isRequired,
  onTextInputSave: React.PropTypes.func.isRequired,
};

export default TodoView;
