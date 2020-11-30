import React from 'react';
import { Text, TouchableHighlight, TouchableOpacity } from 'react-native';

export class ViewSelector extends React.Component {
	constructor(props) {
		super(props);
		this.currentView = 0;
	}
	shouldComponentUpdate(newProps) {
		return this.props.viewType !== newProps.viewType;
	}
	onPressHandler = () => {
		this.currentView = (this.currentView + 1) % 4;
		this.props.viewChange(this.currentView);
	};
	render() {
		return (
			<TouchableOpacity
				activeOpacity={0.7}
				style={{
					height: 40,
					backgroundColor: 'white',
					alignItems: 'center',
					justifyContent: 'space-around'
				}}
				onPress={this.onPressHandler}
			>
				<Text style={{}} style={{ color: 'black', fontFamily: 'iransans' }}>
					تغییر حالت نمایش
					{/* {this.props.viewType} */}
				</Text>
			</TouchableOpacity>
		);
	}
}
