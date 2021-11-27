import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import Mstyles from '../../../components/styles';
import GLOBAL from '../../global';
import * as Font from 'expo-font';
import Loading from '../../../components/loading';
import { withNavigation } from 'react-navigation';

//import { AppLoading } from 'expo';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import defaultStyles from '../../../config/styles';
import i18n from 'i18n-js';

import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Dimensions,
	Button,
	TouchableWithoutFeedback,
	Linking,
	FlatList,
	TextInput,
	ActivityIndicator,
	Alert,
	I18nManager
} from 'react-native';
import { userInfo, toFarsi, encrypt, getHttpAdress } from '../../../components/DB';

import Icon from 'react-native-vector-icons/Ionicons';

//import Contacts from 'react-native-contacts';
import { List, ListItem } from 'react-native-elements';
import { red, green } from 'ansi-colors';
let formid = 0;

//I18nManager.allowRTL(false);
//I18nManager.forceRTL(false);
export default class studentList extends Component {
	constructor(props) {
		super(props);
		(this.arch = ''), (this.page = 1);
		this.state = {
			fontLoaded: false,
			loading: false, // user list loading
			isRefreshing: false, //for pull to refresh
			fakeContact: [],
			SelectedFakeContactList: []
		};
		if (this.props.selecteditm != null)
			if (this.props.selecteditm.length != 0)
				this.state.SelectedFakeContactList = this.state.SelectedFakeContactList.concat(this.props.selecteditm);
	}

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerTitle: i18n.t('frmPtcCaption'),
			headerRight: () => null,

			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransans'
				//color: colorhead
			}
		};
	};

	getIndex(value, arr, prop) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][prop] === value) {
				return i;
			}
		}
		return -1; //to handle the case where the value doesn't exist
	}
	press = (item) => {
		const { navigate } = this.props.navigation;
		navigate('studentlistforms', {
			eformsID: item.formId,
			userID: item.username,
			mode: 'view'
		});
	};

	press1 = (hey) => {
		console.log('hey');
		this.state.fakeContact.map((item) => {
			if (item.username === hey.username) {
				item.check = !item.check;
				if (item.check === true) {
					this.state.SelectedFakeContactList.push(item);
					console.log('selected:' + item.LastName);
				} else if (item.check === false) {
					let i = 0; // this.state.SelectedFakeContactList.indexOf(item);

					i = this.getIndex(item.username, this.state.SelectedFakeContactList, 'username');

					if (1 != -1) {
						console.log(i);
						this.state.SelectedFakeContactList.splice(i, 1);
						console.log('unselect:' + item.LastName);
						return this.state.SelectedFakeContactList;
					}
				}
			}
		});
		console.log(this.state.SelectedFakeContactList);
		this.setState({ fakeContact: this.state.fakeContact });
	};

	_showSelectedContact() {
		return this.state.SelectedFakeContactList.length;
	}
	async _loadAssets() {
		// await Font.loadAsync({
		// 	'Inter-Black': require('./../../assets/IRANSansMobile.ttf')
		// });
		console.log('your fonts loaded!');
		this.setState({ fontLoaded: true });
	}
	async componentDidMount() {
		const { navigation } = this.props;

		await this._loadAssets();
		const formID = navigation.getParam('eformsID');
		this.loadAPI(this.page, formID);
		//this._showContactList();
	}
	_handleLoadMore = () => {
		if (false)
			if (this.arch == '')
				if (!this.state.isLoading) {
					this.page = this.page + 1; // increase page by 1
					//this.fetchUser(this.page); // method for API call
					this.loadAPI(this.page, 'more');
				}
	};

	loadAPIxls = (page, formID) => {
		//alert();
		if (global.adress != 'undefined') {
		}
		const { navigation } = this.props;

		const formID1 = navigation.getParam('eformsID');
		/* #region  check internet */

		// let state = await NetInfo.fetch();
		// if (!state.isConnected) {
		// 	this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');

		// 	return;
		// }
		/* #endregion */
		this.setState({ loading: true });
		let param = userInfo();

		let uurl =
			global.adress +
			'/pApi.asmx/getFilledFormXls?currentPage=' +
			this.page +
			'&p=' +
			param +
			'&q=' +
			this.arch +
			'&formid=' +
			formID1;

		////////console.log(uurl);
		//let page = 1;
		//alert();
		fetch(uurl) //+ this.arch
			.then((response) => response.json())
			.then((responseText) => {
				//alert(responseText.length);
				this.setState({ loading: false });

				if (responseText.path) {
					Alert.alert(
						'خروجی اکسل',
						'آیا مایل به مشاهده هستید؟',
						[
							{
								text: 'خیر',
								//onPress: () => console.log('Cancel Pressed'),
								style: 'cancel'
							},
							{
								text: 'بله',
								onPress: () => {
									//alert(global.adress + '/upload/xls/' + responseText.path);
									Linking.openURL(
										global.adress.replace('/papi', '') + '/upload/xls/' + responseText.path
									);
								}
							}
						],
						{ cancelable: false }
					);
					// this.setState({
					// 	fakeContact: this.page === 1 ? responseText : [ ...this.state.fakeContact, ...responseText ],

					// 	loading: false
					// });
				} else {
					this.setState({
						fakeContact: [],
						loading: false
					});
				}
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log('1Error fetching the feed: ', err);
			});
	};

	loadAPI = (page, formID) => {
		if (global.adress != 'undefined') {
		}
		const { navigation } = this.props;

		const formID1 = navigation.getParam('eformsID');
		/* #region  check internet */

		// let state = await NetInfo.fetch();
		// if (!state.isConnected) {
		// 	this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');

		// 	return;
		// }
		/* #endregion */
		this.setState({ loading: true });
		let param = userInfo();

		let uurl =
			global.adress +
			'/pApi.asmx/getFilledFormStd?currentPage=' +
			this.page +
			'&p=' +
			param +
			'&q=' +
			this.arch +
			'&formid=' +
			formID1;

		//////console.log(uurl);
		//let page = 1;

		fetch(uurl) //+ this.arch
			.then((response) => response.json())
			.then((responseText) => {
				//alert(responseText.length);
				this.setState({ loading: false });
				this.setState({
					fakeContact: []
				});
				if (responseText.length > 0) {
					this.setState({
						fakeContact: this.page === 1 ? responseText : [ ...this.state.fakeContact, ...responseText ],

						loading: false
					});
				} else {
					this.setState({
						fakeContact: [],
						loading: false
					});
				}
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log('1Error fetching the feed: ', err);
			});
	};
	searchFilterFunction = (text) => {
		this.setState({
			value: text,
			page: 1
		});
		this.arch = text;
		//console.log('this.state.value');
		this.loadAPI(1);
	};
	findArrayElementByTitle(array, title) {
		return array.find((element) => {
			if (element.username === title) return true;
		});
	}
	handleCheck = (item) => {
		//return;
		this.state.SelectedFakeContactList.find((element) => {
			if (element.username == item.username) {
				// console.log(element.username )
				item.check = 'true';
				return item.check;
			}
		});

		return item.check;
	};
	renderHeader = () => {
		return (
			<View>
				<View
					style={{
						borderBottomWidth: 1,
						borderBottomColor: 'white',
						backgroundColor: 'white',
						borderTopLeftRadius: 0,
						borderTopRightRadius: 0,

						flexDirection: 'row',
						alignContent: 'center'
					}}
				>
					<TouchableOpacity activeOpacity={0.5}>
						<AntDesign
							name="exclefile1"
							size={36}
							onPress={() => {
								this.loadAPIxls();
							}}
							style={{ color: '#bbb', marginTop: 13, marginStart: 8 }}
						/>
					</TouchableOpacity>
					<SearchBar
						inputContainerStyle={{ backgroundColor: '#eee', height: 15 }}
						inputStyle={{ fontSize: 5, height: 15 }}
						containerStyle={{
							flex: 1,
							// color: 'green',
							borderBottomWidth: 0,
							backgroundColor: 'white'

							// borderTopRightRadius: 24,
							// borderTopLeftRadius: 24
						}}
						placeholder={i18n.t('frmsrchCaption')}
						fontSize={9}
						fontWeight="normal"
						lightTheme
						//round
						clearIcon
						inputStyle={{ textAlign: 'right', fontFamily: 'iransans' }}
						showLoading={this.state.loading}
						onChangeText={(text) => this.searchFilterFunction(text)}
						autoCorrect={false}
						value={this.state.value}
					/>
				</View>
				<View style={{ backgroundColor: 'white' }} />
			</View>
		);
	};

	render() {
		//if (!this.state.fontLoaded || this.state.fakeContact.length == 0)
		if (false) {
			//(!this.state.fontLoaded || !this.state.fakeContact) {

			return <Loading />;
		} else
			return (
				<View style={styles.container}>
					<View style={{ flex: 1 }}>
						<FlatList
							stickyHeaderIndices={[ 0 ]}
							onEndReachedThreshold={0.4}
							onEndReached={this._handleLoadMore.bind(this)}
							style={{ flex: 0.9 }}
							data={this.state.fakeContact}
							keyExtractor={(item) => item.username + '-' + item.coursename}
							//keyExtractor={(item) => item.id.toString()}
							extraData={this.state}
							ListEmptyComponent={() => (
								<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
									<Text style={defaultStyles.lbl14}> اطلاعاتی وجود ندارد </Text>
								</View>
							)}
							ListHeaderComponent={this.renderHeader}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity
										key={item.username}
										activeOpacity={0.5}
										style={{
											flexDirection: 'row',
											padding: 8,
											borderBottomWidth: 1,
											borderStyle: 'solid',
											borderColor: '#ecf0f1'
											// backgroundColor:'green'
										}}
										onPress={() => {
											this.press(item);
										}}
									>
										{/* <View
											style={{
												flex: 1,
												//alignItems: 'flex-center',
												justifyContent: 'center'
											}}
										>
											{this.handleCheck(item) ? (
												<Icon name="ios-checkbox" size={30} color={primaryColor} />
											) : (
												<Icon name="ios-square-outline" size={30} color={darkGrey} />
											)}
										</View> */}
										<View
											style={{
												flex: 11,
												alignItems: 'flex-start',
												justifyContent: 'center'
											}}
										>
											{false ? (
												<Text
													style={{
														fontFamily: 'iransans',
														fontWeight: 'bold'
													}}
												>{`${item.FirstName} ${item.LastName}`}</Text>
											) : (
												<View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
													<View>
														{true ? (
															<Image
																style={Mstyles.imageavatar}
																source={{
																	uri:
																		getHttpAdress() +
																		'child/' +
																		item.username.replace('^', '') +
																		'.jpg'
																}}
															/>
														) : (
															<Ionicons
																name="ios-person"
																size={32}
																style={Mstyles.icon}
																style={{ color: '#18b504' }}
															/>
														)}
													</View>
													<View
														style={{
															paddingStart: 10,
															paddingTop: 8,
															flexDirection: 'row',
															alignItems: 'stretch'
														}}
													>
														<Text
															style={{ fontFamily: 'iransans' }}
														>{`${item.FirstName} ${item.LastName}  `}</Text>
														<Text style={{ fontFamily: 'iransans' }}>
															{toFarsi(`    ${item.username}  `)}
														</Text>
														<Text style={{ fontFamily: 'iransans' }}>
															{'تعداد ثبت:' + toFarsi(`${item.ccc}  `)}
														</Text>
													</View>
												</View>
											)}
										</View>
									</TouchableOpacity>
								);
							}}
						/>
					</View>
				</View>
			);
	}
}

const primaryColor = '#1abc9c';
const lightGrey = '#ecf0f1';
const darkGrey = '#bdc3c7';

const Header = (props) => (
	<SearchBar
		styles={{ fontFamily: 'iransans' }}
		placeholder="جستجو"
		lightTheme
		onChangeText={(text) => {
			this.page = 1;
			this.searchFilterFunction(text);
		}}
		autoCorrect={false}
		value={this.state.value}
	/>
	// <View style={styles.searchContainer}>
	// 	<TextInput
	// 		style={{
	// 			height: 40,
	// 			paddingEnd: 5,
	// 			fontFamily: 'iransans',
	// 			marginRight: 15,
	// 			borderRadius: 10,
	// 			marginLeft: 15,
	// 			borderWidth: 1,
	// 			flex: 1
	// 		}}
	// 		placeholder="Search..."
	// 		onChangeText={(text) => console.log('searching for ', text)}
	// 	/>
	// </View>
);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 0,
		paddingBottom: 0,
		borderRadius: 25
	},
	containerFooter: {
		height: 50,
		borderBottomLeftRadius: 24,
		borderBottomRightRadius: 24,

		backgroundColor: '#1abc9c',
		padding: 5,
		flexDirection: 'row',
		flex: 1
	},
	searchContainer: {
		flex: 1,
		//padding: 5,

		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});
