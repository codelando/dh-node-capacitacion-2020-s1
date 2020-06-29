import React, { Component } from 'react';

import Button from './Button';

class Counter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: this.props.initialValue,
			names: this.props.names,
		}
	}

	handleIncrement = () => {
		this.setState({
			count: this.state.count + 1
		})
	}
	
	handleDecrement = () => {
		this.setState({
			count: this.state.count - 1
		})
	}

	render() {
		const { count, names } = this.state;
		return (
			<React.Fragment>
				<h1>El conteo incia en: {count}</h1>
				<Button text='Decrementar' handleFn={ this.handleDecrement } />
				<Button text='Incrementar' handleFn={ this.handleIncrement } />
				<ul>
					{ names.map((name, i) => <li key={i}>{name}</li>) }
				</ul>
			</React.Fragment>
		)
	}
}

export default Counter;