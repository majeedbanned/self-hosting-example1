import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import React, { Component, useState, useEffect, useRef } from 'react';
import { createAppContainer } from 'react-navigation';
import { Input, ButtonGroup } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import defaultStyles from '../config/styles';
import Icon from 'react-native-vector-icons/AntDesign';
import {
	Picker,
	TextInput,
	Text,
	Button,
	Alert,
	View,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import * as yup from 'yup';
import { compose } from 'recompose';
//import * as SQLite from 'expo-sqlite';
import { HeaderBackButton } from 'react-navigation-stack';
import { handleTextInput, withPickerValues, Formik } from 'formik';
import FormInput from '../component/FormInput';
import Lotte from '../components/lotte';
import NetInfo from '@react-native-community/netinfo';
import * as Network from 'expo-network';
import FormButton from '../component/FormButton';

import DropdownAlert from 'react-native-dropdownalert';
import { TextField, FilledTextField, OutlinedTextField } from 'react-native-material-textfield';
import * as Application from 'expo-application';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
import useResult from '../hooks/useResult';
//import { getUniqueId, getManufacturer } from 'react-native-device-info';
import Database from '../components/database';
import ErrorMessage from '../component/ErrorMessage';
import i18n from 'i18n-js';
import en from '../translations/en';
import fa from '../translations/fa';
import reactNativeExtraDimensionsAndroid from 'react-native-extra-dimensions-android';
import { HelloChandu, _getcount, getQuery, _query, _fetch, _connected } from '../components/DB';
import { region } from 'expo-localization';
import { red } from 'colorette';
import { ScrollView } from 'react-native-gesture-handler';
import { CallModal, CallModalUtil, connectCallModal } from '@fugood/react-native-call-modal';
import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

//const db = SQLite.openDatabase({ name: 'testDB.sqlite3', createFromLocation: 1, location: 'Library' });

i18n.locale = 'fa';
i18n.fallbacks = true;
let connected = false;
let ip = '';
let macaAress = '';
//import { useNavigation } from '@react-navigation/native';
// NetInfo.fetch().then(async (state) => {
// 	try {
// 		connected = state.isConnected;
// 		ip = await Network.getIpAddressAsync();
// 		macaAress = await Application.getIosIdForVendorAsync();
// 		//macaAress = await Network.getMacAddressAsync();
// 	} catch (error) {}
// });
class Appaa extends Component {
	/* #region constructor */
	constructor(props) {
		super(props);
		this.state = { isSubmitting: false, retUser: [], noti: '' };
	}

	async componentDidMount() {
		let er = await registerForPushNotificationsAsync();
		this.setState({ noti: er });
		// const responseListener = useRef();
		// registerForPushNotificationsAsync().then((token) => alert(token));
		// notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
		// 	setNotification(notification);
		// });
		// // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		// responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
		// 	console.log(response);
		// });
	}

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;
		//const { navigation } = this.props;
		const mode = navigation.getParam('mode');

		return {
			// headerLeft: (
			// 	<Icon
			// 		name={'arrow-left'}
			// 		onPress={() => {
			// 			navigation.goBack();
			// 		}}
			// 	/>
			// ),

			headerStyle: { height: 60 },
			headerTitle: 'ورود کاربران',
			headerTitleStyle: { fontSize: 10, alignSelf: 'center', textAlign: 'center' },
			headerRight: () => null,
			headerLeft: () => (mode ? <HeaderBackButton title={'f'} onPress={() => navigation.goBack(null)} /> : null),
			headerTruncatedBackTitle: 'بازگشت',
			headerBackTitleStyle: {
				color: 'pink'
			},
			navigationOptions: {
				headerTruncatedBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransansbold',
				color: 'black',
				fontSize: 14
			}
		};
	};
	/* #endregion */
	alertthis = async (tmp) => {
		alert();
	};

	getProfileHeightStandardfromDB() {
		return new Promise((resolve, reject) => {
			//

			db.transaction(
				(tx) => {
					tx.executeSql('select * from users', [], (_, { rows }) => {
						//console.log(rows);
						//console.log('rows');

						//console.log(parseFloat(rows._array[0].metricheight));
						//profileheight = parseFloat(rows._array[0].metricheight);
						///profilestandard = rows._array[0].standard;
						//console.log('Profileheight ===>'+profileheight);
						//console.log('Profilestandard ===>'+profilestandard);

						// what you resolve here is what will be the result of
						// await getProfileHeightStandardfromDB();
						resolve({ rows });
					});
				},
				null,
				null
			);
		});
	}

	loadAPI = async (username, password, schoolcode, adress, json) => {
		//await CallModalUtil.confirm('Sure to logout?');
		//alert('fs');
		/* #region user exist  */

		//	const db = SQLite.openDatabase('testDB', '1');
		//	if (true) {
		//	console.log(db);
		var temp = [];
		//const db = SQLite.openDatabase('db');
		//const result = await this.getProfileHeightStandardfromDB();
		// db.transaction((tx) => {
		// 	tx.executeSql(
		// 		'select * from users where username=? and schoolcode=?',
		// 		[ username, schoolcode ],
		// 		(tx, results) => {
		// 			var temp = [];
		// 			alertthis(temp);
		// 			for (let i = 0; i < results.rows.length; ++i) {
		// 				temp.push(results.rows.item(i));
		// 			}
		// 		}
		// 	);
		// });
		//alert(global.seax);
		//tx.executeSql('SELECT name FROM sqlite_master WHERE type=? AND name=?', [ 'table', 'users' ], function(
		//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'این کاربر قبلا وارد شده است');

		db.transaction((tx) => {
			// tx.executeSql(
			// 	`CREATE TABLE IF NOT EXISTS  users (
			// 	id INTEGER PRIMARY KEY AUTOINCREMENT,
			// 	username TEXT NOT NULL,
			// 	password TEXT NOT NULL,
			// 	schoolcode TEXT NOT NULL ,
			// 	adress TEXT NOT NULL ,
			// 	ttype TEXT NOT NULL ,
			// 	firstname TEXT  NULL ,
			// 	lastname TEXT  NULL ,
			// 	localip TEXT  NULL ,
			// 	schoolname TEXT  NULL

			//   );`,
			// 	[],
			// 	function(tx, res) {
			// 		//alert(res);
			// 		// if (res.rows.length != 0) {
			// 		// 	alert('1');
			// 		// } else {
			// 		// 	alert('nothing');
			// 		// }
			// 	}
			// );
			tx.executeSql(
				'select * from users where username=? and schoolcode=?',
				[ username, schoolcode ],
				function(tx1, res) {
					if (res.rows.length == 0) {
						{
							//alert(res.rows.length);
							//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'این کاربر قبلا وارد شده است');
							temp = res;
							return;
						}
					} else {
						//alert('nothing0');
					}
				},
				function(a, b) {
					//alert(b);
				}
			);
		});
		//alert(temp);
		let results = await Database.executeSql('select * from users where username=? and schoolcode=?', [
			username,
			schoolcode
		]);
		let y = results;
		//alert(results);
		//return;
		if (results.rows.length > 0) {
			this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'این کاربر قبلا وارد شده است');
			//console.log(results.rows);
			return;
		}

		/* #endregion */

		/* #region  check internet */
		let state = await NetInfo.fetch();
		//connected = state.isConnected;
		if (!state.isConnected) {
			// alertWithType parameters: type, title, message, payload, interval.
			// There are 4 pre-defined types: info, warn, success, error.
			// payload object with source property overrides image source prop. (optional)
			// interval overrides closeInterval prop. (optional)
			this.setState({ isSubmitting: false });
			this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			return;
		}
		/* #endregion */

		this.setState({ isSubmitting: true });

		let uurl =
			'http://' +
			adress +
			'/pApi.asmx/ath?p=' +
			username +
			'`' +
			password +
			'`' +
			schoolcode +
			'`357611123qwe!@$`' +
			this.state.noti +
			'`' +
			Platform.OS;
		//console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.dropDownAlertRef.alertWithType('error', 'پیام', 'نام کاربری یا کلمه عبور اشتباه است');
					this.setState({
						isSubmitting: false
					});
					return;
				}
				////////// sccess
				this.setState({
					retUser: retJson,
					isSubmitting: false
				});
				this.dropDownAlertRef.alertWithType(
					'success',
					'پیام',
					this.state.retUser[0]['firstname'] + ' ' + this.state.retUser[0]['lastname'] + ' با موفقیت وارد شد '
				);
				//alert();
			}
		} catch (e) {
			//alert('err')
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				isSubmitting: false
			});
			return;
		}

		//console.log(this.state.retUser);
		//db = SQLite.openDatabase('db');
		db.transaction((tx) => {
			tx.executeSql(
				'insert into users (username,password,schoolcode,adress,firstname,lastname,schoolname,ttype) values (?,?,?,?,?,?,?,?)',
				[
					username,
					password,
					schoolcode,
					'http://' + adress + '',
					this.state.retUser[0]['firstname'],
					this.state.retUser[0]['lastname'],
					this.state.retUser[0]['schoolname'],
					this.state.retUser[0]['utype']
				],
				(tx, rs) => {},
				(tx, err) => {
					//	console.log(err);
				}
			);
		});
		//alert(adress);
		global.username = username;
		global.password = password;
		global.schoolcode = schoolcode;
		global.adress = 'http://' + adress + '';
		global.firstname = this.state.retUser[0]['firstname'];
		global.lastname = this.state.retUser[0]['lastname'];
		global.schoolname = this.state.retUser[0]['schoolname'];
		global.ttype = this.state.retUser[0]['utype'];

		setTimeout(async () => {
			const { navigation } = this.props;
			navigation.goBack(null);
		}, 2000);
	};

	render() {
		//console.log('ss');
		//const navigation = useNavigation();
		const { navigate } = this.props.navigation;
		//StackNavigator.navigate()
		const inputStyle = {
			borderWidth: 1,
			borderColor: '#bbb',
			padding: 12,
			direction: 'rtl',
			fontSize: 18,
			textAlign: 'center',
			borderRadius: 10,
			marginTop: 10
		};

		return (
			<View style={{ flex: 1, backgroundColor: '#a3d7e5' }}>
				<ScrollView>
					<Formik
						style={{ backgroundColor: 'red' }}
						initialValues={{
							username: '1451912412',
							password: '1',
							schoolcode: '95100040',
							adress: '192.168.1.15:8080'
						}}
						validateOnBlur={false}
						validateOnChange={false}
						// 	onSubmit={async (values, { resetForm }) => {
						// 		//await onSubmit(values)
						//   console.log('sdf');
						//   resetForm({username:''})
						// 	  }}

						onSubmit={(values) => {
							this.loadAPI(
								values['username'],
								values['password'],
								values['schoolcode'],
								values['adress'],
								JSON.stringify(values)
							);
							//resetForm();

							//Alert.alert(JSON.stringify(values));
							//}, 1000);
						}}
						validationSchema={yup.object().shape({
							username: yup.string().required('لطفا نام کاربری را وارد کنید'),
							password: yup.string().required('لطفا کلمه عبور  را وارد کنید'),
							schoolcode: yup.string().required('لطفا کد آموزشگاه را وارد کنید'),
							adress: yup.string().required('لطفا آدرس اینترنتی را وارد کنید')
						})}
					>
						{({
							formikProps,
							values,
							handleChange,
							isSubmitting,
							errors,
							setFieldTouched,
							touched,
							isValid,
							handleSubmit,
							resetForm
						}) => (
							<View style={styles.formContainer}>
								<Text
									style={[
										defaultStyles.lbl16,
										,
										styles.capstyle,
										{
											paddingEnd: 20,
											paddingBottom: 0,
											fontSize: 13,
											color: 'black'
										}
									]}
								>
									نام کاربری
								</Text>
								<Input
									//keyboardType="numeric"
									value={values.username}
									//value={this.state.shoro_namayesh}
									onChangeText={handleChange('username')}
									leftIcon={<Icon name="user" size={24} color="black" />}
									leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
									labelStyle={defaultStyles.labelStyle}
									inputContainerStyle={[ defaultStyles.inputc, defaultStyles.shadowx ]}
									inputStyle={defaultStyles.inputStyle}
									//label={i18n.t('username')}
									placeholder="نام کاربری یا کد ملی"
									errorStyle={defaultStyles.err}
									errorMessage={errors.username}
									containerStyle={{ marginTop: 0 }}
								/>
								<Text
									style={[
										defaultStyles.lbl16,
										,
										styles.capstyle,
										{
											paddingEnd: 20,
											marginTop: -20,
											marginBottom: 10,
											fontSize: 13,
											color: 'black'
										}
									]}
								>
									کلمه عبور
								</Text>

								<Input
									value={values.password}
									//value={this.state.shoro_namayesh}
									onChangeText={handleChange('password')}
									leftIcon={<Icon name="lock" size={23} color="black" />}
									leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
									labelStyle={defaultStyles.labelStyle}
									inputContainerStyle={[ defaultStyles.inputc, defaultStyles.shadowx ]}
									inputStyle={defaultStyles.inputStyle}
									//label={i18n.t('password')}
									placeholder=""
									errorStyle={defaultStyles.err}
									errorMessage={errors.password}
									containerStyle={{ marginTop: -10 }}
								/>
								<Text
									style={[
										defaultStyles.lbl16,
										,
										styles.capstyle,
										{
											paddingEnd: 20,
											marginTop: -20,
											marginBottom: 10,
											fontSize: 13,
											color: 'black'
										}
									]}
								>
									کد آموزشگاه
								</Text>
								<Input
									//keyboardType="numeric"
									value={values.schoolcode}
									//value={this.state.shoro_namayesh}
									onChangeText={handleChange('schoolcode')}
									leftIcon={<Icon name="setting" size={24} color="black" />}
									leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
									labelStyle={defaultStyles.labelStyle}
									inputContainerStyle={[ defaultStyles.inputc, defaultStyles.shadowx ]}
									inputStyle={defaultStyles.inputStyle}
									//label={i18n.t('schoolcode')}
									placeholder=""
									errorStyle={defaultStyles.err}
									errorMessage={errors.schoolcode}
									containerStyle={{ marginTop: -10 }}
								/>
								<Text
									style={[
										defaultStyles.lbl16,
										,
										styles.capstyle,
										{
											paddingEnd: 20,
											marginTop: -20,
											marginBottom: 10,
											fontSize: 13,
											color: 'black'
										}
									]}
								>
									آدرس اینترنتی
								</Text>
								<Input
									value={values.adress}
									//value={this.state.shoro_namayesh}
									onChangeText={handleChange('adress')}
									leftIcon={<Icon name="earth" size={24} color="black" />}
									leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
									labelStyle={defaultStyles.labelStyle}
									inputContainerStyle={[ defaultStyles.inputc, defaultStyles.shadowx ]}
									inputStyle={defaultStyles.inputStyle}
									//label={i18n.t('adress')}
									placeholder=""
									errorStyle={defaultStyles.err}
									errorMessage={errors.adress}
									containerStyle={{ marginTop: -10 }}
								/>

								{/* <OutlinedTextField
									baseColor="#7fc2f8"
									textColor="#0087f3"
									value={values.username}
									label={i18n.t('username')}
									keyboardType="numeric"
									formatText={this.formatText}
									onChangeText={handleChange('username')}
									//onSubmitEditing={this.onSubmit}
									style={styles.input}
									ref={this.fieldRef}
								/>
								<ErrorMessage errorValue={errors.username} /> */}

								{/* <OutlinedTextField
									baseColor="#7fc2f8"
									textColor="#0087f3"
									//value={values.password}
									label={i18n.t('password')}
									keyboardType="default"
									formatText={this.formatText}
									onChangeText={handleChange('password')}
									//onSubmitEditing={this.onSubmit}
									style={styles.input}
									ref={this.fieldRef}
								/>
								<ErrorMessage errorValue={errors.password} /> */}

								{/* <OutlinedTextField
									baseColor="#7fc2f8"
									textColor="#0087f3"
									value={values.schoolcode}
									label={i18n.t('schoolcode')}
									keyboardType="numeric"
									formatText={this.formatText}
									onChangeText={handleChange('schoolcode')}
									//onSubmitEditing={this.onSubmit}
									style={styles.input}
									ref={this.fieldRef}
								/>
								<ErrorMessage errorValue={errors.schoolcode} />

								<OutlinedTextField
									baseColor="#7fc2f8"
									textColor="#0087f3"
									backgroundColor="red"
									value={values.adress}
									label={i18n.t('adress')}
									keyboardType="default"
									formatText={this.formatText}
									onChangeText={handleChange('adress')}
									//onSubmitEditing={this.onSubmit}
									style={styles.input}
									ref={this.fieldRef}
								/>

								<ErrorMessage errorValue={errors.adress} /> */}

								{/* <Button
							color="#3740FE"
							title="Submit"
							disabled={!isValid || isSubmitting}
							onPress={handleSubmit}
						/> */}

								<FormButton
									buttonColor="#1f9efd"
									borderColor="white"
									backgroundColor="#e3f1fc"
									buttonType="outline"
									onPress={handleSubmit}
									widthb={'100%'}
									heightb={50}
									borderRadiusb={45}
									style={{ margin: 6 }}
									containerStyle={defaultStyles.shadowx}
									//disabled={!isValid }
									loading={this.state.isSubmitting}
									title={i18n.t('loginbtn')}
								/>
								<View style={{ marginTop: 40, backgroundColor: '#f6fbff' }}>
									<TouchableOpacity
										style={{ backgroundColor: '#f6fbff' }}
										onPress={() => {
											navigate('qrscanner');
										}}
										style={styles.burgerButton}
									>
										<Text
											style={{
												textAlign: 'center',
												backgroundColor: '#a3d7e5',
												fontFamily: 'iransansbold'
											}}
										>
											ورود با اسکن بارکد
										</Text>
										<Lotte />
									</TouchableOpacity>
								</View>
							</View>
						)}
					</Formik>
				</ScrollView>
				<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		marginTop: 1,
		paddingLeft: 40,
		paddingRight: 40,
		paddingTop: 20,
		height: '100%',

		backgroundColor: '#a3d7e5'
	},
	input: {
		//borderColor:'red',

		marginTop: 0,
		textAlign: 'center',
		fontSize: 20
	}
});
async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		//console.log(token);
	} else {
		//alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [ 0, 250, 250, 250 ],
			lightColor: '#FF231F7C'
		});
	}

	return token;
}

console.disableYellowBox = true;
export default withNavigation(Appaa);
