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

import styles from '../styles/TodoApp.css';
import TodoTextInput from 'shared/components/TodoTextInput';

const TodoAppView = ({ children, onTextInputSave }) => (
  <div>
    <section className={styles.todoapp}>
      <header>
        <h1>todos</h1>
        <TodoTextInput
          autoFocus
          className={styles.newTodo}
          onSave={onTextInputSave}
          placeholder="What needs to be done?"
        />
      </header>
      {children}
    </section>
    <footer className={styles.info}>
      <p>Double-click to edit a todo</p>
      <p>Created by the <a href="https://github.com/denvned">denvned</a></p>
      <p>The ToDo example app is based on{' '}
        <a href="https://github.com/tastejs/todomvc-app-css">todomvc-app-css</a>, and{' '}
        <a href="https://github.com/tastejs/todomvc-app-template">todomvc-app-template</a>,{' '}
        both licensed under a <a href="http://creativecommons.org/licenses/by/4.0/">
          Creative Commons Attribution 4.0 International License
        </a></p>
    </footer>
  </div>
);

TodoAppView.propTypes = {
  children: React.PropTypes.node,
  onTextInputSave: React.PropTypes.func.isRequired,
};

export default TodoAppView;
