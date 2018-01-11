// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Select from 'react-select';
// import fetch from 'isomorphic-fetch';

// interface MultiSelectProps {
//     label: string;
//     backspaceRemoves: boolean;
//     multi: boolean;
//     Creatable: boolean,
//     onChange: (value: string) => void;
//     options: string[];
//     toggleBackspaceRemoves: boolean;
//     creatable: boolean;
//     hint: string;
//     value: any;
// }
// class MultiSelectAsync extends React.Component<MultiSelectProps> {
//     constructor(props, context) {
//         super(props, context);
//     }
// 	// getInitialState () {
// 	// 	return {
// 	// 		backspaceRemoves: true,
// 	// 		multi: true,
// 	// 		creatable: false,
// 	// 	};
// 	// },
// 	// onChange (value) {
// 	// 	this.setState({
// 	// 		value: value,
// 	// 	});
// 	// },
// 	// switchToMulti () {
// 	// 	this.setState({
// 	// 		multi: true,
// 	// 		value: [this.state.value],
// 	// 	});
// 	// },
// 	// switchToSingle () {
// 	// 	this.setState({
// 	// 		multi: false,
// 	// 		value: this.state.value ? this.state.value[0] : null
// 	// 	});
// 	// },
// 	// getUsers (input) {
// 	// 	if (!input) {
// 	// 		return Promise.resolve({ options: [] });
// 	// 	}

// 	// 	return fetch(`https://api.github.com/search/users?q=${input}`)
// 	// 	.then((response) => response.json())
// 	// 	.then((json) => {
// 	// 		return { options: json.items };
// 	// 	});
// 	// },
// 	// gotoUser (value, event) {
// 	// 	window.open(value.html_url);
// 	// },
// 	// toggleBackspaceRemoves () {
// 	// 	this.setState({
// 	// 		backspaceRemoves: !this.state.backspaceRemoves
// 	// 	});
// 	// },
// 	// toggleCreatable () {
// 	// 	this.setState({
// 	// 		creatable: !this.state.creatable
// 	// 	});
// 	// },
// 	render () {
//         const {value, label, creatable, multi, onChange, onValueClick} = this.props;
// 		const AsyncComponent = creatable
// 			? Select.AsyncCreatable
// 			: Select.Async;

// 		return (
// 			<div className="section">
// 				<h3 className="section-heading">
//                     {label} 
//                 </h3>
// 				<AsyncComponent multi={multi} 
//                     value={value} onChange={onChange} 
//                     valueKey="id" 
//                     labelKey="login" 
//                     loadOptions={} 
//                     backspaceRemoves={backspaceRemoves} 
//                 />
// 				<div className="hint"></div>
// 			</div>
// 		)
// 	}
// }

// export default MultiSelectAsync