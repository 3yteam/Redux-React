import React, { Component } from 'react'
// import PropTypes from 'prop-types'


class Counter extends Component {
	constructor(props) {
		super(props);
		this.incrementIfOdd = this.incrementIfOdd.bind(this);
		this.incrementAsync = this.incrementAsync.bind(this);
	}

	incrementIfOdd() {
			let state = this.props.value;
			if(state%2!==0) {
					this.props.onIncrement();
			}
		}

	incrementAsync() {
			setTimeout(this.props.onDecrement, 2000)
		}

	render(){
		 const { value, onIncrement, onDecrement } = this.props
		return (
			
			<div className="main">
				Clicked {'\u2728'}: <span id="value">{value}</span> times
		        <button onClick={onIncrement}>+</button>
		        <button onClick={onDecrement} >-</button>
		        <button onClick={this.incrementIfOdd}>Increment if odd</button>
		        <button onClick={this.incrementAsync}>Increment async</button>
			</div>
			)
	}
}

export default Counter;