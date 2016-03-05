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
import { IndexLink, Link } from 'react-router';

import styles from '../styles/TodoListFooter.css';

const TodoListFooterView = ({ completedCount, onRemoveCompletedTodosClick, remainingTodos }) => (
  <footer className={styles.footer}>
    <span className={styles.todoCount}>
      <strong>{remainingTodos}</strong> item{remainingTodos === 1 ? '' : 's'} left
    </span>
    <ul className={styles.filters}>
      <li>
        <IndexLink to="/" activeClassName="selected">All</IndexLink>
      </li>
      <li>
        <Link to="/active" activeClassName="selected">Active</Link>
      </li>
      <li>
        <Link to="/completed" activeClassName="selected">Completed</Link>
      </li>
    </ul>
    {completedCount > 0 &&
    <button className={styles.clearCompleted} onClick={onRemoveCompletedTodosClick}>
      Clear completed
    </button>
    }
  </footer>
);

TodoListFooterView.propTypes = {
  completedCount: React.PropTypes.number.isRequired,
  onRemoveCompletedTodosClick: React.PropTypes.func.isRequired,
  remainingTodos: React.PropTypes.number.isRequired,
};

export default TodoListFooterView;
