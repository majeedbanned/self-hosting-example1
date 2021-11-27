import React, { Component } from 'react';
import { SearchBar } from 'react-native-elements';
import Mstyles from '../components/styles';
import NetInfo from '@react-native-community/netinfo';

import GLOBAL from './global';
var Buffer = require('buffer/').Buffer;
import * as Font from 'expo-font';
//import { AppLoading } from 'expo';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
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
	FlatList,
	TextInput,
	ActivityIndicator,
	Alert
} from 'react-native';
import { userInfo, toFarsi,encrypt, getHttpAdress } from '../components/DB';

import Icon from 'react-native-vector-icons/Ionicons';

//import Contacts from 'react-native-contacts';
import { List, ListItem } from 'react-native-elements';
import { red } from 'ansi-colors';
//import { DH_CHECK_P_NOT_SAFE_PRIME } from 'constants';

export default class ContactList extends Component {
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
	getIndex(value, arr, prop) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][prop] === value) {
				return i;
			}
		}
		return -1; //to handle the case where the value doesn't exist
	}
	press = (hey) => {
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
		await Font.loadAsync({
			'Inter-Black': require('./../../assets/IRANSansMobile.ttf')
		});
		console.log('your fonts loaded!');
		this.setState({ fontLoaded: true });
	}
	async componentDidMount() {
		await this._loadAssets();
		this.loadAPI(this.page, 'pull');
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

	loadAPI = () => {
		if (global.adress != 'undefined') {
		}

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
			global.adress + '/pApi.asmx/getContactList?currentPage=' + this.page + '&p=' + param + '&q=' + this.arch;

		//////////console.log(uurl);
		//let page = 1;

		fetch(uurl) //+ this.arch
			.then((response) => response.json())
			.then((responseText) => {
				//console.log(responseText);

				this.setState({
					fakeContact: this.page === 1 ? responseText : [ ...this.state.fakeContact, ...responseText ],
					//fakeContact: responseText, //page === 1 ? responseText : [ ...this.state.fakeContact, ...responseText ],
					//data: responseText
					loading: false
				});

				//console.log(this.state.fakeContact);
				//this.arrayholder = this.state.data;
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log('Error fetching the feed: ', err);
			});

		// const url = 'https://jsonplaceholder.typicode.com/users';
		// fetch(url)
		// 	.then((res) => {
		// 		return res.json();
		// 	})
		// 	.then((data) => {
		// 		console.log(data);
		// 		return this.setState({ fakeContact: data });
		// 	})
		// 	.catch((err) => {
		// 		console.log(err);
		// 	});
	};

	apiPost = async (jsonstr) => {
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			return;
		}
		/* #endregion */
		//this.setState({ isSubmitting: true, fin: true, loading: true });

		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/setMessage_forward?p=' +
			param +
			'&json=' +
			jsonstr +
			'&messageID=' +
			global.forwardID;
		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						fin: false
					});
					return;
				}

				if (retJson.result == 'ok') this.setState({});
			} else {
				return false;
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				fin: false
			});
			return;
		}
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
		//    let f= this.findArrayElementByTitle( this.state.SelectedFakeContactList,
		//         '^14')
		//console.log('search:'+ f);
		// console.log(item.check);
		return item.check;
		if (item.RowNumber == 5) {
			item.check = 'true';
			return item.check;
		}
		return item.check;
		item.check = 'true';
		//console.log(item);
		const i = this.state.SelectedFakeContactList.indexOf(item);
		if (1 != -1) {
			return true;
		}
		return false;
	};
	renderHeader = () => {
		return (
			<View>
				<View
					style={{
						borderBottomWidth: 1,
						borderBottomColor: '#ccc',
						backgroundColor: 'white',
						borderTopLeftRadius: 25,
						borderTopRightRadius: 25,

						flexDirection: 'row',
						alignContent: 'center'
					}}
				>
					<TouchableOpacity
						onPress={() => {
							GLOBAL.message.setState({
								isModalpiker_message_Visible: false
							});
						}}
					>
						<Icon
							style={{
								borderRadius: 10,
								marginEnd: 0,
								height: 45,
								backgroundColor: 'white',
								marginBottom: 0,
								marginTop: 10,
								marginStart: 10,
								paddingEnd: 12,
								borderWidth: 1,
								borderColor: '#ccc',

								width: 45
							}}
							name="ios-close"
							size={45}
							color="#bbb"
						/>
					</TouchableOpacity>

					<SearchBar
						containerStyle={{
							flex: 2,

							borderBottomWidth: 0,
							backgroundColor: 'white',
							borderTopRightRadius: 24,
							borderTopLeftRadius: 24
						}}
						placeholder="جستجو"
						lightTheme
						round
						clearIcon
						inputStyle={{ textAlign: 'center', fontFamily: 'iransans' }}
						showLoading={this.state.loading}
						onChangeText={(text) => this.searchFilterFunction(text)}
						autoCorrect={false}
						value={this.state.value}
					/>
				</View>
				<View style={{ backgroundColor: 'white' }}>
					<Text style={{ paddingLeft: 10, paddingTop: 5, textAlign: 'left', fontFamily: 'iransans' }}>
						ارسال به:
					</Text>
				</View>
			</View>
		);
	};

	render() {
		if (!this.state.fontLoaded || this.state.fakeContact.length == 0) {
			//(!this.state.fontLoaded || !this.state.fakeContact) {
			return (
				<View style={styles.container}>
					<View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<ActivityIndicator size="small" color="#000"/>
						<TouchableOpacity
							onPress={() => {
								GLOBAL.examAdd.setState({
									isModalpikerVisible: false
								});
							}}
						>
							<Text
								style={{
									borderWidth: 1,
									marginTop: 10,
									borderRadius: 10,
									padding: 7,
									fontFamily: 'iransans',
									textAlign: 'center'
								}}
							>
								بستن
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			);
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
							extraData={this.state}
							ListHeaderComponent={this.renderHeader}
							renderItem={({ item }) => {
								return (
									<TouchableOpacity
										style={{
											flexDirection: 'row',
											padding: 10,
											borderBottomWidth: 1,
											borderStyle: 'solid',
											borderColor: '#ecf0f1'
											// backgroundColor:'green'
										}}
										onPress={() => {
											this.press(item);
										}}
									>
										<View
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
										</View>
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
														{item.username.indexOf('*') == -1 ? (
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
																name="ios-people"
																size={32}
																style={Mstyles.icon}
																style={{ color: '#18b504' }}
															/>
														)}
													</View>
													<View style={{ paddingStart: 10, alignItems: 'flex-start' }}>
														<Text
															style={{ fontFamily: 'iransans' }}
														>{`${item.FirstName} ${item.LastName}`}</Text>
														<Text
															style={{
																fontSize: 12,
																color: 'green',
																fontFamily: 'iransans'
															}}
														>{`${item.coursename == null ? '' : item.coursename} `}</Text>
													</View>
												</View>
											)}
										</View>
									</TouchableOpacity>
								);
							}}
						/>

						{/* <View >

                        <Text>asdfsadfs</Text>
                    </View> */}
					</View>
					<View style={{ flex: 0.2 }}>
						{this.state.SelectedFakeContactList.length > 0 ? (
							<View style={styles.containerFooter}>
								<View
									style={{
										flex: 1,
										alignItems: 'flex-end',
										justifyContent: 'center'
									}}
								>
									<TouchableOpacity
										style={{
											padding: 10
										}}
										onPress={() => {
											console.log('sdsds');
											if (GLOBAL.examAdd)
												if (GLOBAL.examAdd.state.isModalpikerVisible) {
													// let ret = '';
													// for (
													// 	let index = 0;
													// 	index < this.state.SelectedFakeContactList.length;
													// 	index++
													// ) {
													// 	ret += this.state.SelectedFakeContactList[index].LastName + ',';
													// }
													GLOBAL.examAdd.state.formikDefault.selectedClass = [];
													if (this.state.SelectedFakeContactList.length != 0)
														GLOBAL.examAdd.state.formikDefault.selectedClass = GLOBAL.examAdd.state.formikDefault.selectedClass.concat(
															this.state.SelectedFakeContactList
														);
													console.log(GLOBAL.examAdd.state.formikDefault.selectedClass);
													GLOBAL.examAdd.setState({
														//selectedParticipate: ret,
														isModalpikerVisible: false
													});
												}

											if (GLOBAL.messageAdd)
												if (GLOBAL.messageAdd.state.isModalpikerVisible) {
													// let ret = '';
													// for (
													// 	let index = 0;
													// 	index < this.state.SelectedFakeContactList.length;
													// 	index++
													// ) {
													// 	ret += this.state.SelectedFakeContactList[index].LastName + ',';
													// }
													GLOBAL.messageAdd.state.formikDefault.selectedClass = [];
													if (this.state.SelectedFakeContactList.length != 0)
														GLOBAL.messageAdd.state.formikDefault.selectedClass = GLOBAL.messageAdd.state.formikDefault.selectedClass.concat(
															this.state.SelectedFakeContactList
														);
													console.log(GLOBAL.messageAdd.state.formikDefault.selectedClass);
													GLOBAL.messageAdd.setState({
														//selectedParticipate: ret,
														isModalpikerVisible: false
													});

													//alert(GLOBAL.messageAdd.state.formikDefault.selectedClass);
												}

											if (GLOBAL.message) {
												//apisave
												//alert('hi');

												if (GLOBAL.message.state.isModalpiker_message_Visible) {
													Alert.alert(
														'حذف پیام',
														'آیا مایل به ارسال پیام به مخاطبین هستید؟',
														[
															{
																text: 'خیر',
																onPress: () => {
																	// GLOBAL.message.setState({
																	// 	isModalpiker_message_Visible: false
																	// });
																},
																style: 'cancel'
															},
															{
																text: 'بله',
																onPress: () => {
																	let objJsonB64 = Buffer.from(
																		JSON.stringify(
																			this.state.SelectedFakeContactList
																		)
																	).toString('base64');

																	this.apiPost(JSON.stringify(objJsonB64));

																	GLOBAL.message.setState({
																		isModalpiker_message_Visible: false
																	});
																}
															}
														],
														{ cancelable: false }
													);
												}
											}
											//console.log(this.state.SelectedFakeContactList);
										}}
									>
										<Icon name="ios-paper-plane" size={30} color="white" />
									</TouchableOpacity>
								</View>
								<View
									style={{
										flex: 6,
										alignItems: 'flex-start',
										justifyContent: 'center',
										alignContent: 'center'
										//	borderBottomLeftRadius: 24
									}}
								>
									<Text style={{ fontFamily: 'iransans', color: 'white' }}>
										{`گیرندگان:` + '[' + this.state.SelectedFakeContactList.length + ']'}
									</Text>
									<FlatList
										data={this.state.SelectedFakeContactList}
										// horizontal={true}
										style={{ flex: 1, borderWidth: 0 }}
										numColumns={4}
										extraData={this.state}
										keyExtractor={(item, index) => item.username}
										renderItem={({ item, index }) => {
											return (
												<View
													style={{
														padding: 5
													}}
												>
													<Text
														style={{
															borderWidth: 1,
															color: 'white',
															borderRadius: 5,
															borderColor: 'white',
															//fontWeight: 'bold',
															fontFamily: 'iransans',
															padding: 2
														}}
													>
														{`${item.LastName}`}
													</Text>
												</View>
											);
										}}
									/>
								</View>
							</View>
						) : null}
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
