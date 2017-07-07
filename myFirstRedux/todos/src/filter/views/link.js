import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setFilter} from '../actions.js';

class Link extends Component {

  render() {
    let {active, children, onClickFun} = this.props;
    if (active) {
      return <b className="filter selected">{children}</b>;
    } else {
      return (
        <a href="javascript:void(0)" className="filter not-selected" onClick={onClickFun}>
          {children}
        </a>
      );
      }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: state.filter === ownProps.filter
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setFilter(ownProps.filter));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Link);