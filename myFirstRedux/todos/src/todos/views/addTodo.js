import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {addTodo} from '../actions.js';

class AddTodo extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.refInput = this.refInput.bind(this);
  }

  onSubmit(ev) {
    ev.preventDefault();

    const input = this.input;
    if (!input.value.trim()) {
      return;
    }
    debugger
    this.props.onAdd(input.value);
    input.value = '';
  }

  refInput(node) {
    this.input = node;
  }

  render() {
    return (
      <div className="add-todo">
        <form onSubmit={this.onSubmit}>
          <input className="new-todo" ref={this.refInput} />
          <button className="add-btn" type="submit">
            添加
          </button>
        </form>
      </div>
    )
  }
}

AddTodo.propTypes = {
  onAdd: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (text) => {
      dispatch(addTodo(text));
    }
  }
};
// http://taobaofed.org/blog/2016/08/18/react-redux-connect/
// connect 的第二个参数是 mapDispatchToProps，它的功能是，将 action 作为 props 绑定到 MyComp 上。

export default connect(null, mapDispatchToProps)(AddTodo);