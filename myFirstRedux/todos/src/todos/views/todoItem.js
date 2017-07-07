import React, {Component} from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
   let {onToggle, onRemove, completed, text} = this.props;
   const checkedProp = completed ? {checked: true} : {checked: false};
    return(
        <li className="todo-item" style={{textDecoration: completed ? 'line-through' : 'none'}}>
          <input className="toggle" type="checkbox" {...checkedProp}  onClick={onToggle} />
          <label className="text">{text}</label>
          <button className="remove" onClick={onRemove}>×</button>
        </li>
      );
    
  }
}

export default TodoItem;