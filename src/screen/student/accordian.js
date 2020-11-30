import React, { Component } from 'react';
import { View, TouchableOpacity, Text, FlatList, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { Colors } from './colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { toFarsi } from '../../components/DB';
//import { userInfo, toFarsi, getHttpAdress } from '../../components/DB';

export default class Accordian extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: props.data,
			expanded: false
		};

		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}

	render() {
		return (
			<View>
				<TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
					<Text style={[ styles.title ]}>{this.props.title + '  [ ' + this.props.count + ' ]'} </Text>
					<Icon
						name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
						size={30}
						color={Colors.DARKGRAY}
					/>
				</TouchableOpacity>
				<View style={styles.parentHr} />
				{this.state.expanded && (
					<View style={{}}>
						<FlatList
							data={this.state.data}
							numColumns={1}
							scrollEnabled={false}
							renderItem={({ item, index }) => (
								<View>
									<View
										style={[
											styles.childRow,
											styles.button,
											item.value ? styles.btnActive : styles.btnInActive
										]}
										onPress={() => this.onClick(index)}
									>
										<View style={{ borderWidth: 0, flex: 0.8, alignItems: 'center' }}>
											<Text style={[ styles.font, styles.itemInActive ]}>
												{toFarsi(item.date)}
											</Text>
											<Text style={[ styles.font, styles.itemInActive ]}>{item.time}</Text>
										</View>
										<View style={{ flex: 3, padding: 5 }}>
											<Text style={[ styles.font, styles.itemInActive, styles.title1 ]}>
												{item.title}
											</Text>
											<Text style={[ styles.font, styles.itemInActive ]}>{item.key}</Text>
										</View>
										<View style={{ flex: 1 }}>
											<Text style={[ styles.font, styles.itemInActive ]}>{item.disc}</Text>
										</View>
										{/* <Icon
											name={'check-circle'}
											size={24}
											color={item.value ? Colors.GREEN : Colors.LIGHTGRAY}
										/> */}
									</View>
									<View style={styles.childHr} />
								</View>
							)}
						/>
					</View>
				)}
			</View>
		);
	}

	onClick = (index) => {
		const temp = this.state.data.slice();
		temp[index].value = !temp[index].value;
		this.setState({ data: temp });
	};

	toggleExpand = () => {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		this.setState({ expanded: !this.state.expanded });
	};
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	button: {
		width: '100%',
		//height: 54,
		alignItems: 'center',
		paddingLeft: 5,
		paddingRight: 5,
		fontSize: 12
	},
	title: {
		fontFamily: 'iransansbold',
		fontSize: 14,
		fontWeight: 'bold',
		color: Colors.DARKGRAY
	},
	title1: {
		alignSelf: 'flex-start',
		textAlign: 'left',
		fontFamily: 'iransansbold',
		//backgroundColor: Colors.GREEN,
		borderRadius: 8,
		marginBottom: 3,
		padding: 3,
		paddingBottom: 1,
		borderWidth: 1,
		borderColor: Colors.GREEN,
		color: 'red',
		fontWeight: 'bold',
		color: Colors.GREEN
	},
	itemActive: {
		fontSize: 12,
		color: Colors.GREEN
	},
	itemInActive: {
		fontFamily: 'iransans',
		textAlign: 'left',
		fontSize: 12,
		color: Colors.DARKGRAY
	},
	btnActive: {
		borderColor: Colors.GREEN
	},
	btnInActive: {
		borderColor: Colors.DARKGRAY
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 56,
		paddingLeft: 25,
		paddingRight: 18,
		alignItems: 'center',
		backgroundColor: Colors.CGRAY
	},
	childRow: {
		//height: 156,
		flexDirection: 'row',
		justifyContent: 'space-between',
		backgroundColor: Colors.GRAY
	},
	parentHr: {
		height: 1,
		color: Colors.WHITE,
		width: '100%'
	},
	childHr: {
		height: 1,
		backgroundColor: Colors.LIGHTGRAY,
		width: '100%'
	},
	colorActive: {
		borderColor: Colors.GREEN
	},
	colorInActive: {
		borderColor: Colors.DARKGRAY
	}
});
