import React, { Component } from 'react';
import { StyleSheet, Linking, ActivityIndicator, SafeAreaView } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../config/styles';
import i18n from 'i18n-js';

import { Snackbar } from 'react-native-paper';
import Loading from '../components/loading';
import DropdownAlert from 'react-native-dropdownalert';
import { withNavigation } from 'react-navigation';
import { Input, ButtonGroup } from 'react-native-elements';

import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/AntDesign';
import IconAnt from 'react-native-vector-icons/AntDesign';

import Mstyles from '../components/styles';
import FormButton from '../component/FormButton';
import ExamAdd from './examAdd';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SettingUserDelete from './settingUserDelete';
import NetInfo from '@react-native-community/netinfo';
import Modal, {
	ModalTitle,
	ModalContent,
	ModalFooter,
	ModalButton,
	SlideAnimation,
	ScaleAnimation
} from 'react-native-modals';
import { userInfo, toFarsi, encrypt, getHttpAdress, toEng } from '../components/DB';
import { FlatList, ScrollView, Image, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import GLOBAL from './global';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';
import selectUser from './selectUser';

import * as SQLite from 'expo-sqlite';
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

const colorhead = '#37a3ab';
const colorlight = '#37a3ab';
const iconname_ = 'form';

class settings extends Component {
	constructor(props) {
		super(props);
		(this.page = 1),
			(this.state = {
				oldpass: '',
				pass1: '',
				pass: '',
				bottomModalAndTitle: false,
				refreshing: false,
				isModalVisible: false,
				value: '',
				loadingMore: false,
				page: 1,
				isLoading: false,
				modalVisible: false,
				userSelected: [],
				//data: [],
				datas: [],
				test: [],
				selectedItem: '1',
				dataLoading: false
			});

		this.props.navigation.addListener('willFocus', () => {
			//this.loadAPI(1, 'pull');
			//this.loadAPI_grp(1, 'pull');
		});
	}
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerTitle: i18n.t('settingListCaption'),
			headerRight: () => null,
			//headerLeft: () => null,

			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransans',
				color: colorhead
			}
		};
	};
	async componentDidMount() {
		//this.loadAPI_grp(this.page, 'pull');
		//this.loadAPI(this.page, 'pull');
		if (global.lang == 'fa')
			this.setState({
				cat: [
					{
						id: '1',

						name: 'تغییر کلمه عبور'
					},
					{
						id: '2',

						name: 'حذف کاربر'
					}
				]
			});
		else
			this.setState({
				cat: [
					{
						id: '1',

						name: 'Change Password  '
					},
					{
						id: '2',

						name: 'Remove user '
					}
				]
			});
	}

	loadAPI_grp = async (page, type) => {
		if (global.adress == 'undefined') {
			GLOBAL.main.setState({ isModalVisible: true });
		}

		/* #region  check internet */

		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.setState({ issnackin: true });
			return;
		}
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getFormCat?id=' +
			page +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&mode=list';
		//////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false
					});
					return;
				}
				this.setState({
					cat: retJson,

					loading: false
				});
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false
			});
			return;
		}
	};

	loadAPI = async (page, type) => {
		if (global.adress == 'undefined') {
			GLOBAL.main.setState({ isModalVisible: true });
		}
		/* #region  check internet */

		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.setState({ issnackin: true });
			return;
		}
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress + '/pApi.asmx/chpass?cu=' + this.state.oldpass + '&p=' + param + '&pass=' + this.state.pass;
		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						data: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);
				// this.setState({
				// 	data: []
				// });
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					// data: retJson,
					// dataLoading: false,

					// isRefreshing: false,
					loading: false
				});

				//change in db

				if (retJson.result != 'ok') {
					alert(retJson.msg);
					return;
				}

				db.transaction((tx) => {
					tx.executeSql(
						'update  users set password=? where username=? and schoolcode=? ',
						[ toEng(this.state.pass), global.username, global.schoolcode ],
						(tx, rs) => {},
						(tx, err) => {
							console.log(err);
						}
					);
				});
				//alert(adress);
				//global.username = username;
				global.password = toEng(this.state.pass);
				alert(retJson.msg);
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				dataLoading: false,
				isRefreshing: false
			});
			return;
		}
	};
	_renderFooter = () => {
		if (!this.state.isLoading) return null;
		return <ActivityIndicator size="small" color="#000" />;
	};
	_handleLoadMore = () => {
		if (!this.state.isLoading) {
			this.page = this.page + 1;
			this.loadAPI(this.page, 'more');
		}
	};
	clickEventListener = (item) => {
		const { navigate } = this.props.navigation;

		if (item.name == 'ویرایش') {
			this.setState({
				bottomModalAndTitle: false
			});
			navigate('examAdd');
		}
	};
	async onRefresh() {
		this.loadAPI(1, 'pull');
	}

	handleSubmit = async () => {
		if (this.state.pass == '' || this.state.pass1 == '' || this.state.oldpass == '') {
			alert(global.lang == 'fa' ? 'لطفا اطلاعات را کامل وارد کنید ' : 'please fill out form fields');
			return;
		}
		if (this.state.pass != this.state.pass1) {
			alert(global.lang == 'fa' ? 'تکرار کلمه عبور اشتباه است' : 'new password is wrong!');
			return;
		}

		this.loadAPI();
	};
	onPressHandler(id) {
		this.setState({ selectedItem: id, data: [] });
		//this.loadAPI(1, 'pull');
	}
	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white' }}>
				<FlatList
					extraData={this.state.selectedItem}
					data={this.state.cat}
					keyExtractor={(item) => item.id.toString()}
					horizontal
					style={{
						flexDirection: 'column-reverse',
						paddingBottom: 4,
						borderWidth: 0,
						marginTop: 4,
						marginRight: 4,
						marginLeft: 4
					}}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								activeOpacity={0.6}
								onPress={() => {
									//console.log(item.id);
									this.onPressHandler(item.id);
								}}
							>
								<View
									style={
										this.state.selectedItem === item.id ? (
											{
												flexDirection: 'row',
												backgroundColor: colorhead,
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: colorhead,
												borderRadius: 15,
												margin: 3,
												paddingTop: 8,
												paddingRight: 8,
												paddingLeft: 8,
												paddingBottom: 3
											}
										) : (
											{
												flexDirection: 'row',
												backgroundColor: 'white',
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: colorhead,
												borderRadius: 15,
												margin: 3,
												paddingTop: 8,
												paddingRight: 8,
												paddingLeft: 8,
												paddingBottom: 3
											}
										)
									}
								>
									<Text
										style={
											this.state.selectedItem === item.id ? (
												{
													color: 'white',
													fontFamily: 'iransans'
												}
											) : (
												{
													color: colorlight,

													fontFamily: 'iransans'
												}
											)
										}
									>
										{item.name}
									</Text>
									{this.state.selectedItem !== item.id ||
										(this.state.dataLoading && <ActivityIndicator size="small" color="#000" />)}
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		);
	};
	render() {
		let test = [
			{ name: ' شرکت کنندگان', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'افزودن سئوال', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'ویرایش', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'تست آزمون', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: ' غایبین', code: 'white', icon: 'md-people', bkcolor: '#34ace0' },
			{ name: 'حذف', code: 'white', icon: 'ios-trash', bkcolor: '#f79383' }
		];

		//	GLOBAL.vclass = this;

		if (!this.state.cat) {
			return (
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView
						contentContainerStyle={{ flex: 1 }}
						refreshControl={<RefreshControl onRefresh={this.onRefresh.bind(this)} />}
					>
						<Loading />
					</ScrollView>
				</SafeAreaView>
			);
		}

		return (
			<View style={Mstyles.container}>
				<View>
					<FlatList
						extraData={this.state.selectedItem}
						data={this.state.cat}
						keyExtractor={(item) => item.id.toString()}
						horizontal
						style={{
							flexDirection: 'column-reverse',
							paddingBottom: 4,
							borderWidth: 0,
							marginTop: 4,
							marginRight: 4,
							marginLeft: 4
						}}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									activeOpacity={0.6}
									onPress={() => {
										//console.log(item.id);
										this.onPressHandler(item.id);
									}}
								>
									<View
										style={
											this.state.selectedItem === item.id ? (
												{
													flexDirection: 'row',
													backgroundColor: colorhead,
													fontFamily: 'iransans',
													borderWidth: 1,
													borderColor: colorhead,
													borderRadius: 15,
													margin: 3,
													paddingTop: 8,
													paddingRight: 8,
													paddingLeft: 8,
													paddingBottom: 3
												}
											) : (
												{
													flexDirection: 'row',
													backgroundColor: 'white',
													fontFamily: 'iransans',
													borderWidth: 1,
													borderColor: colorhead,
													borderRadius: 15,
													margin: 3,
													paddingTop: 8,
													paddingRight: 8,
													paddingLeft: 8,
													paddingBottom: 3
												}
											)
										}
									>
										<Text
											style={
												this.state.selectedItem === item.id ? (
													{
														color: 'white',
														fontFamily: 'iransans'
													}
												) : (
													{
														color: colorlight,

														fontFamily: 'iransans'
													}
												)
											}
										>
											{item.name}
										</Text>
										{this.state.selectedItem !== item.id ||
											(this.state.dataLoading && <ActivityIndicator size="small" color="#000" />)}
									</View>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
				{this.state.selectedItem == '2' && <SettingUserDelete />}

				{this.state.selectedItem == '1' && (
					<View style={{ marginStart: 15, marginEnd: 15 }}>
						<Input
							//value={values.password}
							//value={this.state.shoro_namayesh}
							//onChangeText={handleChange('password')}
							onChangeText={(value) => this.setState({ oldpass: value })}
							leftIcon={<Icon name="key" size={23} color="black" />}
							leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
							labelStyle={defaultStyles.labelStyle}
							inputContainerStyle={[ defaultStyles.inputc, defaultStyles.shadowx ]}
							inputStyle={defaultStyles.inputStyle}
							//label={i18n.t('password')}
							placeholder={global.lang == 'fa' ? 'کلمه عبور قبلی' : 'Old Password'}
							errorStyle={defaultStyles.err}
							//	errorMessage={errors.password}
							containerStyle={{ marginTop: 10 }}
						/>

						<Input
							//value={values.password}
							//value={this.state.shoro_namayesh}
							//onChangeText={handleChange('password')}
							onChangeText={(value) => this.setState({ pass: value })}
							leftIcon={<Icon name="key" size={23} color="black" />}
							leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
							labelStyle={defaultStyles.labelStyle}
							inputContainerStyle={[ defaultStyles.inputc, defaultStyles.shadowx ]}
							inputStyle={defaultStyles.inputStyle}
							//label={i18n.t('password')}
							placeholder={global.lang == 'fa' ? 'کلمه عبور جدید' : 'New Password'}
							errorStyle={defaultStyles.err}
							//	errorMessage={errors.password}
							containerStyle={{ marginTop: 10 }}
						/>

						<Input
							//value={values.password}
							//value={this.state.shoro_namayesh}
							onChangeText={(value) => this.setState({ pass1: value })}
							leftIcon={<Icon name="key" size={23} color="black" />}
							leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
							labelStyle={defaultStyles.labelStyle}
							inputContainerStyle={[ defaultStyles.inputc, defaultStyles.shadowx ]}
							inputStyle={defaultStyles.inputStyle}
							//label={i18n.t('password')}
							placeholder={global.lang == 'fa' ? 'کلمه عبور جدید' : 'New Password'}
							errorStyle={defaultStyles.err}
							//	errorMessage={errors.password}
							containerStyle={{ marginTop: 10 }}
						/>

						<FormButton
							buttonColor="#1f9efd"
							borderColor="white"
							backgroundColor="#e3f1fc"
							buttonType="outline"
							onPress={this.handleSubmit}
							widthb={'100%'}
							heightb={55}
							borderRadiusb={45}
							style={{ margin: 6 }}
							containerStyle={defaultStyles.shadowx}
							//disabled={!isValid }
							loading={this.state.isSubmitting}
							title={global.lang == 'fa' ? 'تغییر کلمه عبور' : 'Change Password'}
						/>
					</View>
				)}

				<Snackbar
					visible={this.state.issnackin}
					onDismiss={() => this.setState({ issnackin: false })}
					style={{ backgroundColor: 'red', fontFamily: 'iransans' }}
					wrapperStyle={{ fontFamily: 'iransans' }}
					action={{
						label: 'بستن',
						onPress: () => {
							this.setState({ issnackin: false });
							this.setState(
								{
									//  loading: false,
									//  save_loading: false
								}
							);
							//this.props.navigation.goBack(null);
						}
					}}
				>
					{'لطفا دسترسی به اینترنت را چک کنید'}
				</Snackbar>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view4: {
		paddingStart: 10,
		borderWidth: 0,
		justifyContent: 'center',
		flex: 2
	},
	view3: {
		backgroundColor: colorlight,
		borderTopStartRadius: 13,
		borderBottomStartRadius: 13,

		justifyContent: 'center',
		flex: 0.6
	},
	view2: {
		flexDirection: 'row',
		borderWidth: 0,
		marginStart: 0,
		flex: 1
	},
	view1: {
		flexDirection: 'column',
		borderWidth: 0,
		marginStart: 0,
		flex: 3
	},
	buttompanel: {
		shadowColor: '#ccc',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.37,
		shadowRadius: 2.49,
		elevation: 1,
		borderRadius: 13,
		zIndex: 0,
		//elevate: 0,
		marginTop: -10,
		marginLeft: 15,
		marginRight: 15,
		height: 70,
		flexDirection: 'column',
		backgroundColor: 'white'
	},
	gradient: {
		borderRadius: 13,
		left: 0,
		right: 0,
		backgroundColor: '#ffffff',
		top: 0,
		zIndex: 1,
		elevation: 2,
		height: 85,
		flexDirection: 'column'
	},
	mainpanel: {
		zIndex: 1,
		elevation: 2,
		shadowColor: '#ddd',
		shadowOffset: {
			width: 1,
			height: 1
		},
		shadowOpacity: 0.67,
		shadowRadius: 2.49
	},
	aztitle: {
		width: '100%',
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'left',
		borderWidth: 0,
		fontSize: 14,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'flex-start',
		fontFamily: 'iransans',
		textAlign: 'left',
		//width: '100%',
		fontSize: 13,
		borderWidth: 1,
		padding: 1,
		borderColor: 'white',
		borderRadius: 5,
		color: '#878787'
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	},
	image: {
		width: 50,
		paddingTop: 8,
		paddingRight: 6,
		height: 50,
		alignSelf: 'center',
		//borderRadius: 55,
		//borderWidth: 1,
		borderColor: '#ebf0f7'
		//backgroundColor: 'white'

		// position:'absolute'
	},
	textpart: {
		justifyContent: 'center',
		flexDirection: 'row',
		borderWidth: 0,
		marginStart: 0,
		flex: 1
	},
	rtlText: {
		alignSelf: 'center',
		fontFamily: 'iransans',
		color: 'white',
		fontSize: 15
	},
	image2: {
		width: 50,
		height: 60,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#ebf0f7',
		marginTop: 10,

		marginStart: 20,
		position: 'absolute',
		shadowColor: 'red',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.37,
		shadowRadius: 3.49,
		elevation: 16
	},

	image3: {
		width: 40,
		height: 50,
		borderRadius: 15,
		marginTop: 20,
		borderWidth: 1,
		borderColor: '#ebf0f7',
		backgroundColor: 'green',
		marginStart: 40,
		position: 'absolute'
	},
	imageavatar: {
		width: 40,
		height: 50,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	gridView: {
		marginTop: 2,
		flex: 1
	},
	itemContainer: {
		justifyContent: 'flex-end',
		borderRadius: 20,
		paddingTop: 5,
		height: 85
	},
	itemName: {
		fontSize: 12,
		color: '#fff',
		fontWeight: '600',
		paddingBottom: 12,
		fontFamily: 'iransans',
		textAlign: 'center'
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#fff'
	}
});
export default withNavigation(settings);
