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

import styles from '../styles/TodoList.css';

const TodoListView = ({ children, completedCount, onMarkAllChange, totalCount }) => (
  <section className={styles.main}>
    <input
      checked={totalCount === completedCount}
      className={styles.toggleAll}
      onChange={onMarkAllChange}
      type="checkbox"
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
    <ul className={styles.todoList}>{children}</ul>
  </section>
);

TodoListView.propTypes = {
  children: React.PropTypes.node,
  completedCount: React.PropTypes.number.isRequired,
  onMarkAllChange: React.PropTypes.func.isRequired,
  totalCount: React.PropTypes.number.isRequired,
};

export default TodoListView;
