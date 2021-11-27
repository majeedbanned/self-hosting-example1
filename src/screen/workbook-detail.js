import React, { Component } from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	SafeAreaView,
	Image,
	FlatList,
	TouchableOpacity,
	Text,
	RefreshControl
} from 'react-native';
import { userInfo, toFarsi, encrypt, getHttpAdress } from '../components/DB';
export const Colors = {
	PRIMARY: '#1abc9c',

	WHITE: '#ffffff',
	LIGHTGREEN: '#BABABA',
	GREEN: '#0da935',

	GRAY: '#f7f7f7',
	LIGHTGRAY: '#C7C7C7',
	DARKGRAY: '#5E5E5E',
	CGRAY: '#ececec',
	OFFLINE_GRAY: '#535353'
};
// YellowBox.ignoreWarnings([
// 	'VirtualizedLists should never be nested inside plain' // TODO: Remove when fixed
// ]);
class workbookdt extends Component {
	state = {};

	componentDidMount() {
		this.setState({
			data: [
				{
					key:
						'فرزندم در کلاس فعال بفرزندم در کلاس فعال بوفرزندم در کلاس فعال بوفر فعال بوفرزندم در کلاس فعا فعال بوفرزندم در کلاس فعازندم در کلاس فعال بوود',
					title: 'کار در کلاس',
					disc: 'افزودن یک نمره',
					date: '1399/04/01',
					time: 'زنگ اول',

					value: false
				},
				{
					key:
						'فرزندم در کلاس فعال بفرزندم در کلاس فعال بوفرزندم در کلاس فعال بوفر فعال بوفرزندم در کلاس فعا فعال بوفرزندم در کلاس فعازندم در کلاس فعال بوود',
					title: 'کار در کلاس',
					disc: 'افزودن یک نمره',
					date: '1399/04/01',
					time: 'زنگ اول',

					value: false
				},
				{
					key:
						'فرزندم در کلاس فعال بفرزندم در کلاس فعال بوفرزندم در کلاس فعال بوفر فعال بوفرزندم در کلاس فعا فعال بوفرزندم در کلاس فعازندم در کلاس فعال بوود',
					title: 'کار در کلاس',
					disc: 'افزودن یک نمره',
					date: '1399/04/01',
					time: 'زنگ اول',

					value: false
				},
				{
					key:
						'فرزندم در کلاس فعال بفرزندم در کلاس فعال بوفرزندم در کلاس فعال بوفر فعال بوفرزندم در کلاس فعا فعال بوفرزندم در کلاس فعازندم در کلاس فعال بوود',
					title: 'کار در کلاس',
					disc: 'افزودن یک نمره',
					date: '1399/04/01',
					time: 'زنگ اول',

					value: false
				},
				{
					key:
						'فرزندم در کلاس فعال بفرزندم در کلاس فعال بوفرزندم در کلاس فعال بوفر فعال بوفرزندم در کلاس فعا فعال بوفرزندم در کلاس فعازندم در کلاس فعال بوود',
					title: 'کار در کلاس',
					disc: 'افزودن یک نمره',
					date: '1399/04/01',
					time: 'زنگ اول',

					value: false
				},
				{
					key:
						'فرزندم در کلاس فعال بفرزندم در کلاس فعال بوفرزندم در کلاس فعال بوفر فعال بوفرزندم در کلاس فعا فعال بوفرزندم در کلاس فعازندم در کلاس فعال بوود',
					title: 'کار در کلاس',
					disc: 'افزودن یک نمره',
					date: '1399/04/01',
					time: 'زنگ اول',

					value: false
				},
				{ key: 'Mutton Biryani', value: false },
				{ key: 'Prawns Biryani', value: false }
			]
		});
	}
	render() {
		//	YellowBox.ignoreWarnings([ 'VirtualizedLists should never be nested' ]);
		return (
			<View>
				<ScrollView style={{ borderWidth: 0, borderRadius: 20 }}>
					<FlatList
						keyExtractor={(item, index) => String(index)}
						data={this.state.data}
						numColumns={1}
						scrollEnabled={false}
						renderItem={({ item, index }) => (
							<View key={index}>
								<View
									style={[
										styles.childRow,
										styles.button,
										item.value ? styles.btnActive : styles.btnInActive
									]}
									onPress={() => this.onClick(index)}
								>
									<View style={{ borderWidth: 0, flex: 0.8, alignItems: 'center' }}>
										<Text style={[ styles.font, styles.itemInActive ]}>{toFarsi(item.date)}</Text>
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
								</View>
								<View style={styles.childHr} />
							</View>
						)}
					/>
				</ScrollView>
			</View>
		);
	}
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
		fontFamily: 'iransans',
		fontSize: 14,
		fontWeight: 'bold',
		color: Colors.DARKGRAY
	},
	title1: {
		alignSelf: 'flex-start',
		textAlign: 'left',
		fontFamily: 'iransans',
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
export default workbookdt;
