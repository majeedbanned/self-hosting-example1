import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { useFonts } from '@use-expo/font';
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
import GLOBAL from '../../global';

//import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//let items = [];
class stdprofile extends Component {
	state = {
		isLoading: true,

		items: [
			{ name: 'پیام های ارسالی', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'پیام های دریافتی', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'لیست پرداخت ها', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'صورتحساب', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },

			{ name: 'کارنامه پایانی', code: 'white', icon: 'ios-trash', bkcolor: '#f79383' },
			{ name: 'کارنامه ماهیانه', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'لیست فرم ها', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'لیست آزمون ها', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'غیبت ها', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },

			{ name: 'تاخیر ها', code: 'white', icon: 'ios-trash', bkcolor: '#f79383' },
			{ name: 'تغییر مشخصات', code: 'white', icon: 'ios-trash', bkcolor: '#f79383' }
		]
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
		this.loadAPI();
	}
	_handleRefresh = () => {
		//this.loadAPI();
	};
	loadAPI = () => {
		this.setState({ isLoading: true });
		//console.log('fsafsfsafsfsdfs');
		fetch(global.adress + '/papi.asmx/mobileMainScreen?test=d')
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
		console.log(item);
		if (item.id == 1) {
			navigate('Daftar');
		} else if (item.id == 3) {
			navigate('Forms');
		} else if (item.id == 7) {
			navigate('barnameh');
		} else if (item.id == 5) {
			navigate('Workbook');
		} else if (item.id == 6) {
			navigate('karnameh');
		} else if (item.id == 12) {
			navigate('teacherStat');
		} else if (item.id == 9) {
			navigate('reports');
		} else if (item.id == 10) {
			navigate('qbank');
		} else if (item.id == 13) {
			navigate('stdSearch');
		}

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
					persistentScrollbar={true}
					horizontal={true}
					style={{
						//borderRadius: 20,
						//	marginLeft: 15,
						//height: 242,
						flex: 0,
						borderWidth: 0
					}}
				>
					{this.state.isLoading && (
						<ActivityIndicator
							color={'red'}
							style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
						/>
					)}
					{!this.state.isLoading && (
						<FlatGrid
							//horizontal={true}
							// refreshControl={
							//   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
							// }
							onRefresh={() => this.onRefresh()}
							refreshing={this.state.isLoading}
							itemDimension={90}
							items={this.state.items}
							style={styles.gridView}
							// staticDimension={300}
							// fixed
							// spacing={20}
							renderItem={({ item, index }) => (
								<View
									style={[
										styles.itemContainer,
										{
											backgroundColor: '#fff'
										}
									]}
								>
									{item.badge > 0 && <Text style={styles.badge}> {item.badge} </Text>}
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
												//width: '90%',
												padding: 15,
												//backgroundColor: item.bkcolor,
												borderWidth: 0,
												borderColor: 'red'
											}}
										>
											<Ionicons
												name={item.icon}
												size={47}
												//color={item.code}
												color="#ccc"
												style={{
													shadowColor: item.bkcolor,
													flex: 1,
													alignSelf: 'center',
													paddingTop: 5,
													shadowColor: item.code,
													shadowOffset: {
														width: 3,
														height: 3
													},
													shadowOpacity: 0.37,
													shadowRadius: 2.49,
													elevation: 3
												}}
											/>
										</View>
									</TouchableOpacity>
									<Text numberOfLines={1} style={styles.itemName}>
										{item.name}
									</Text>

									{/* <Text style={styles.itemCode}>{item.code}</Text> */}
								</View>
							)}
						/>
					)}
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
		width: 85,
		borderWidth: 0,
		borderColor: 'red'
	},
	itemName: {
		paddingTop: 0,
		fontFamily: 'iransans',
		fontSize: 12,
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
		padding: 1,
		overflow: 'hidden',
		backgroundColor: '#eb5757',
		borderRadius: 9,
		borderWidth: 0,
		borderColor: '#000'
	}
});
export default withNavigation(stdprofile);
