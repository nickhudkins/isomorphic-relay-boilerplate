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
import ReactDOM from 'react-dom';

const ENTER_KEY_CODE = 13;
const ESC_KEY_CODE = 27;

export default class TodoTextInput extends React.Component {
  static defaultProps = {
    commitOnBlur: false,
    onCancel: () => {},
    onDelete: () => {},
  };
  static propTypes = {
    className: React.PropTypes.string,
    commitOnBlur: React.PropTypes.bool.isRequired,
    initialValue: React.PropTypes.string,
    onCancel: React.PropTypes.func,
    onDelete: React.PropTypes.func,
    onSave: React.PropTypes.func.isRequired,
    placeholder: React.PropTypes.string,
  };
  state = {
    isEditing: false,
    text: this.props.initialValue || '',
  };

  componentDidMount() {
    ReactDOM.findDOMNode(this).focus();
  }

  _commitChanges = () => {
    const newText = this.state.text.trim();
    if (newText === '') {
      this.props.onDelete();
    } else if (newText === this.props.initialValue) {
      this.props.onCancel();
    } else if (newText !== '') {
      this.props.onSave(newText);
      this.setState({ text: '' });
    }
  };

  _handleBlur = () => {
    if (this.props.commitOnBlur) {
      this._commitChanges();
    }
  };

  _handleChange = event => {
    this.setState({ text: event.target.value });
  };

  _handleKeyDown = event => {
    if (event.keyCode === ESC_KEY_CODE) {
      this.props.onCancel();
    } else if (event.keyCode === ENTER_KEY_CODE) {
      this._commitChanges();
    }
  };

  render() {
    return (
      <input
        className={this.props.className}
        onBlur={this._handleBlur}
        onChange={this._handleChange}
        onKeyDown={this._handleKeyDown}
        placeholder={this.props.placeholder}
        value={this.state.text}
      />
    );
  }
}
