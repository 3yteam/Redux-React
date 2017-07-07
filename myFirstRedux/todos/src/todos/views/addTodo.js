import React, {Component} from 'react';
import {connect} from 'react-redux';

import {addTodo} from '../actions.js';

class AddTodo extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    // this.refInput = this.refInput.bind(this);

    this.onInputChange = this.onInputChange.bind(this);


    this.state = { value: '' };

  }

  onInputChange(event) {
    
      this.setState({
        value:event.target.value
      });
  }

  onSubmit(ev) {
    ev.preventDefault();

    const inputValue = this.state.value;
    if (!inputValue.trim()) {
      return;
    }
    
    this.props.onAdd(inputValue);
    this.setState({
        value:''
      });
  }


  render() {
  
    return (
      <div className="add-todo">
        <form onSubmit={this.onSubmit}>
        
      <input className="new-todo" onChange={this.onInputChange} value={this.state.value}/>
          
          <button className="add-btn" type="submit">
            添加
          </button>
        </form>
      </div>
    )
  }
}

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