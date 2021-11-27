import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useFonts } from '@use-expo/font';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Loading from '../components/loading';
import { LogBox } from 'react-native';
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import GLOBAL from './global';

//import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { toFarsi } from '../components/DB';
//let items = [];

LogBox.ignoreLogs([
	'VirtualizedLists should never be nested inside plain',
	'Your project is accessing the following APIs from a deprecated global',
	'Warning: componentWillReceiveProps has been renamed, and is not recommended',
	'Warning: componentWillMount has been renamed, and is not recommended',
	'Warning: Failed prop type: Invalid prop `items` of type `array` supplied ',
	'Warning: Failed prop type: Invalid prop `reservations` of type `array`',
	'eprecation in ' // TODO: Remove when fixed
]);
class menu extends Component {
	state = {
		isLoading: false,
		items: []
	};

	async componentDidMount() {
		// await Font.loadAsync({
		// 	iransans: require('./../../assets/IRANSansMobile.ttf'),
		// 	iransans: require('./../../assets/IRANSansMobile_Bold.ttf')
		// });
		// useFonts.loadAsync({
		// 	'iransans': require('./../../assets/IRANSansMobile.ttf'),
		//   });
		// let [fontsLoaded] = useFonts({
		// 	'iransans': require('./../../assets/IRANSansMobile.ttf'),
		//   });
		// this.getSurfaces();
		//this.loadAPI();
	}
	_handleRefresh = () => {
		//this.loadAPI();
	};
	loadAPI = () => {
		this.setState({ isLoading: true });
		//console.log('fsafsfsafsfsdfs');
		fetch('http://192.168.1.15:8080/papi.asmx/mobileMainScreen?test=d')
			.then((response) => response.json())
			.then((responseText) => {
				//	this.setState({ items: responseText });
				this.setState({
					isLoading: false
				});
				//	console.log(this.state.items);
			})
			.catch((err) => {
				console.log('Error fetching the feed: ', err);
			});
	};

	onRefresh() {
		this.loadAPI();

		//this.setState({isFetching: true,},() => {this.getApiData();});
	}

	clickEventListener = (item) => {
		const { navigate } = this.props.navigation;
		//console.log(item);
		if (item.id == 1) {
			navigate('Daftar');
		} else if (item.id == 3) {
			navigate('Forms');
		} else if (item.id == 4) {
			navigate('accounting');
		} else if (item.id == 2) {
			navigate('courseslist');
		} else if (item.id == 7) {
			navigate('barnameh');
		} else if (item.id == 5) {
			navigate('Workbook');
		} else if (item.id == 6) {
			navigate('karnameh');
		} else if (item.id == 12) {
			navigate('teacherStat');
		} else if (item.id == 11) {
			navigate('help');
		} else if (item.id == 9) {
			navigate('reports');
		} else if (item.id == 10) {
			navigate('qbank', { mode1: 'start' });
		} else if (item.id == 13) {
			navigate('stdSearch');
		} else if (item.id == 14) {
			navigate('Settings');
		} else if (item.id == 15) {
			navigate('bankfile');
		} else if (item.id == 17) {
			navigate('formEntry');
		} else if (item.id == 18) {
			navigate('cal');
		}
		//alert(item.id);
		//navigate('test');
		//console.log(item.code);

		//Alert.alert('Message', 'Item clicked. ' + item.username);
	};

	render() {
		GLOBAL.screen1 = this;

		return (
			<React.Fragment>
				{/* <View
					style={{
						margin: 10,
						borderRadius: 40,
						borderWidth: 2,
						shadowColor: '#00000021',
						shadowOffset: {
							width: 2,
							height: 1
						},
						shadowOpacity: 0.6,
						//shadowRadius: 3,
						elevation: 1
					}}
				> */}
				<ScrollView
					persistentScrollbar={false}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					style={{
						//borderRadius: 20,
						marginLeft: 15,
						height: 232,
						flex: 1,
						borderWidth: 0
					}}
				>
					<View>
						{/* this.state.isLoading */}
						{this.state.isLoading && (
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									flex: 1,
									//width: 444,
									borderWidth: 0
								}}
							>
								<ActivityIndicator size="small" color="#000" style={{}} />
							</View>
						)}

						{!this.state.isLoading && (
							<FlatGrid
								horizontal={true}
								// refreshControl={
								//   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
								// }
								onRefresh={() => this.onRefresh()}
								refreshing={this.state.isLoading}
								itemDimension={100}
								items={this.props.items}
								style={styles.gridView}
								// staticDimension={300}
								// fixed
								// spacing={20}
								renderItem={({ item, index }) => (
									<View
										style={[
											styles.itemContainer,
											{
												backgroundColor: '#fff',
												width: global.lang == 'fa' ? 85 : 120
											}
										]}
									>
										{item.badge > 0 && <Text style={styles.badge}> {toFarsi(item.badge)} </Text>}
										<TouchableOpacity
											activeOpacity={0.7}
											onPress={() => {
												this.clickEventListener(item);
											}}
											style={{ flex: 1 }}
										>
											<View
												style={styles.shadow}
												style={{
													borderRadius: 15,
													flex: 1,
													width: '90%',
													padding: 15,
													backgroundColor: item.bkcolor,
													borderWidth: 0,
													borderColor: 'red'
												}}
											>
												<Icon
													size={37}
													color={item.color}
													name={item.icon}
													style={{
														shadowColor: item.bkcolor,
														flex: 1,
														alignSelf: 'center',
														paddingTop: 5,
														shadowColor: item.color,
														shadowOffset: {
															width: 3,
															height: 3
														},
														shadowOpacity: 0.37,
														shadowRadius: 2.49,
														elevation: 3
													}}
												/>
												{/* <Ionicons
												name={item.icon}
												size={47}
												color={item.color}
												style={{
													shadowColor: item.bkcolor,
													flex: 1,
													alignSelf: 'center',
													paddingTop: 5,
													shadowColor: item.color,
													shadowOffset: {
														width: 3,
														height: 3
													},
													shadowOpacity: 0.37,
													shadowRadius: 2.49,
													elevation: 3
												}}
											/> */}
											</View>
										</TouchableOpacity>
										<Text numberOfLines={1} style={styles.itemName}>
											{item.caption}
										</Text>

										{/* <Text style={styles.itemCode}>{item.code}</Text> */}
									</View>
								)}
							/>
						)}
					</View>
				</ScrollView>
				{/* </View> */}
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	gridView: {
		//height:230,
		//marginTop: 5,
		flex: 1
		//backgroundColor: '#fff'
	},
	itemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		padding: 0,
		margin: 0,
		height: 103,
		// width: 85,
		borderWidth: 0,
		borderColor: 'red'
	},
	itemName: {
		paddingTop: 0,
		fontFamily: 'iransans',
		fontSize: 12.2,
		color: '#000',
		fontWeight: '400'
	},
	shadow: {
		borderWidth: 1,
		borderColor: 'red'
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#fff'
	},
	badge: {
		color: '#fff',
		position: 'absolute',
		zIndex: 10,
		top: 13,
		left: 10,
		fontSize: 13,
		//marginTop: 23,
		overflow: 'hidden',
		backgroundColor: '#eb5757',
		borderRadius: 8,
		borderWidth: 0,
		borderColor: '#000',
		fontFamily: 'iransans'
	}
});
export default withNavigation(menu);
