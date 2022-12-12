//import Bugsnag from '@bugsnag/expo';
//aBugsnag.start('68460742c6002498ca2e488eaee9df93');
//"permissions": [ "NOTIFICATIONS" ],

//"updates.url": "https://expo.farsamooz.ir",
import Constants from 'expo-constants';
import { Snackbar } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
//import AwesomeAlert from 'react-native-awesome-alerts';
import FormButton from './src/component/FormButton';
import * as Updates from 'expo-updates';
import Icon1 from 'react-native-vector-icons/FontAwesome';

import { FancyAlert } from 'react-native-expo-fancy-alerts';
import * as Permissions from 'expo-permissions';
//const ErrorBoundary = Bugsnag.getPlugin('react');
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { createBottomTabNavigator } from 'react-navigation-tabs';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
//import { Observable } from 'rxjs/Observable';
import LottieView from 'lottie-react-native';
import ListScreen from './src/screens/listScreen';
import ActionBarImage from './src/components/ActionBarImage';
import componentScreen from './src/screens/componentScreen';
//import { enableScreens } from 'react-native-screens';
import TextScreen from './src/screens/textScreen';
import Craigslist from './src/screens/Craigslist';
import FlatListGrid from './src/screens/FlatListGrid';
import Mainmenu from './src/screens/mainmenu';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

import React from 'react';
import SearchScreen from './src/screens/SearchScreen';
import ResultShowScreen from './src/screens/ResultShowScreen';
//import scrollabletab from './src/screens/scrollabletab';
import FacebookExample from './src/screens/FacebookExample';
import paparButtomNavigator from './src/screens/paparButtomNavigator';

import qrscanner from './src/screens/qrscanner';
import galio from './src/screens/galio';
import stickytable from './src/screens/stickytable';
import persiancalendarpicker from './src/screens/calpicker';
import timeline from './src/screens/timeline';
import fixedtable from './src/screens/fixedtable';
import flatgrid from './src/screens/flatgrid';
import Lightbox from './src/screens/lightbox';
import Takeimage from './src/screens/takeimage';
import addgallery from './src/screen/modules/story/addgallery';
import Lotte from './src/components/lotte';
import Intro from './src/components/intro';

import storyList from './src/screen/modules/story/storyList';

import eforms from './src/screen/modules/forms/eforms';
import eforms2 from './src/screen/modules/forms/eforms2';

import cwebview from './src/screen/modules/forms/Cwebview';

import studentlist from './src/screen/modules/forms/studentlist';
import notnot from './src/screen/notnot';

import speech from './src/screen/speech';

import studentlistforms from './src/screen/modules/forms/studentlistforms';

import qbank from './src/screen/modules/questionBank/qbank';
//import qtesti from './src/screen/modules/questionBank/qtesti';

import { userInfo, toFarsi, encrypt, getHttpAdress } from './src/components/DB';

//import qtash from './src/screen/modules/questionBank/qtash';
import participateList from './src/screen/modules/questionBank/participateList';
import webinarparticipateList from './src/screen/webinarparticipateList';

import stdSearch from './src/screen/modules/profile/stdSearch';
import stdprofile from './src/screen/modules/profile/stdprofile';
import courseslist from './src/screen/modules/teachersheet/courseslist';

import { Image, View, Text, Alert } from 'react-native';

import flatgridSection from './src/screens/flatgridSection';
//import lottie from './src/screens/lottie';
//recyclerViewList1;

import swipper from './src/screens/swipper';
import notification from './src/screen/notification';

import recyclerViewList1 from './src/screen/recyclerViewList1';
//import formik from './src/screens/formik';

import reactnativesnapcarousel from './src/screens/react-native-snap-carousel';

import modal from './src/screens/modal';
import timetable from './src/screen/timetable';
import Upload from './src/screens/upload';
import * as SplashScreen from 'expo-splash-screen';
import tcombform from './src/screens/tcombform';
import segmentedTab from './src/screens/segmentedTab';
import sheet from './src/screens/sheet';
import Audio from './src/screen/audio';
import barnameh from './src/screen/barnameh';

import Recorder from './src/screen/recorder';

import hookform from './src/screens/hookform';
//import btab2 from './src/screens/btab2';
import * as Font from 'expo-font';
import Login from './src/screen/Login';
import update from './src/screen/update';

import Forms from './src/screen/forms';
import help from './src/screen/help';
import comment from './src/screen/comment';

//import * as Sentry from 'sentry-expo';
import tahlil from './src/screen/tahlil';
import reportView from './src/screen/reportView';
import monthgrade from './src/screen/monthgrade';

import accounting from './src/screen/accounting';

import RecordList from './src/screen/recordList';
import absentList from './src/screen/absentList';

import Daftar from './src/screen/student/daftar';
import Workbook from './src/screen/workbook';
import bankfile from './src/screen/student/bankfile';

messageAdd;
import messageAdd from './src/screen/messageAdd';

import Main from './src/screen/main';
import Test from './src/screen/test';
import Splash from './src/screen/splash';
import reports from './src/screen/student/reports';
import formEntry from './src/screen/student/formEntry';
import menuList from './src/screen/student/menuList';

import registerForPushNotificationsAsync from './src/screen/registerForPushNotificationsAsync';

reports;
import cal from './src/screen/event';
import Classheet from './src/screen/Classheet';
import adstory from './src/screen/addStory';

import Exam from './src/screen/Exam';
import eventen from './src/screen/eventen';

import Workbookdt from './src/screen/workbook-detail';
import karnameh from './src/screen/karnameh';
import teacherStat from './src/screen/teacherStat';

import examAdd from './src/screen/examAdd';
import Speech from './src/screen/speech/speech';

import Logo from './src/screen/logo';
import dynamic from './src/screen/dynamic';
import dynamictest from './src/screen/dynamictest';

import settingUserDelete from './src/screen/settingUserDelete';

import selectuser from './src/screen/selectUser';
import { CallModal, CallModalUtil, connectCallModal } from '@fugood/react-native-call-modal';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import * as SQLite from 'expo-sqlite';
//const db = SQLite.openDatabase('testDB1.sqlite3');

//const db = SQLite.openDatabase('testDB', '1');
// SQLite.openDatabase('db.sqlite');

//import { SQLite } from 'expo-sqlite';
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);
//enableScreens();
import { I18nManager, AppRegistry } from 'react-native';
import GLOBAL from './src/screen/global';
import SelectContact from './src/screen/selectContact';
import Settings from './src/screen/settings';

import { MenuProvider } from 'react-native-popup-menu';
// Sentry.init({
// 	dsn: 'http://3edfa492e3aa46ccbd686c032a770b96@185.110.191.82:9000/2',
// 	enableInExpoDevelopment: true,
// 	debug: true
// });

//
//Bugsnag.start();
//const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const addDataToDb = () => {
	//console.log('f1');
	db.transaction((tx) => {
		//tx.executeSql('DROP TABLE users');
		//tx.executeSql('delete  from   users');
		//	alert('d');
		if (true)
			tx.executeSql(
				`CREATE TABLE IF NOT EXISTS  users (
		    id INTEGER PRIMARY KEY AUTOINCREMENT,
		    username TEXT NOT NULL,
		    password TEXT NOT NULL,
		    schoolcode TEXT NOT NULL ,
			adress TEXT NOT NULL ,
			ttype TEXT NOT NULL ,
		    firstname TEXT  NULL ,
			lastname TEXT  NULL ,
			localip TEXT  NULL ,
		    schoolname TEXT  NULL

		  );`,
				[],
				function(tx, res) {
					//alert(res);
					// if (res.rows.length != 0) {
					// 	alert('1');
					// } else {
					// 	alert('nothing');
					// }
				},
				function(e, er) {
					//alert(e);
					//console.log(er);
				}
			);
		//tx.executeSql('DROP TABLE users');

		// tx.executeSql(
		// 	`CREATE TABLE settings (
		//     id INTEGER PRIMARY KEY AUTOINCREMENT,
		//     notification TEXT NOT NULL,

		//   );`,
		// 	[]
		// );

		// tx.executeSql('SELECT * from settings', [], function(tx, res) {
		// 	//alert('item:');
		// 	if (res.rows.length != 0) {
		// 		alert('111');
		// 	} else {
		// 		alert('nothingee');
		// 	}
		// });

		//alert('o');

		//alert();

		// tx.executeSql('insert into users (username, password, schoolcode,adress) values (?, ?, ? ,?)', [
		// 	'majid',
		// 	'pass',a
		// 	'123',
		// 	'adress'
		// ]);
		//console.log('error fetching');
		// tx.executeSql(
		// 	'select * from users',
		// 	[],
		// 	(_, { rows: { _array } }) => console.log(_array),
		// 	() => console.log('error fetching')
		// );
	});
};
global.backgroundColor = '#f6fbff';
//***addDataToDb();
// db.transaction((tx) => {
// 	tx.executeSql('select * from users', [], (_, { rows: { _array } }) => {
// 		console.log(_array),
// 			() => {
// 				console.log('error fetching');
// 			};
// 	});
// });
// its a sample change

db.transaction(function(txn) {
	//alert();

	txn.executeSql(
		'select * from users',
		[],
		function(tx, res) {
			console.log('item:', res.rows.length);
			if (res.rows.length != 0) {
				//alert('1');
			} else {
				//alert('nothingerrrr');
			}
		},
		function(a, b) {
			//alert(b);
		}
	);
});
//const navigator = createNativeStackNavigator(
const navigator = createStackNavigator(
	{
		Home: HomeScreen,
		Login: Login,
		//	Exam: Exam,
		Upload: Upload,
		//SelectContact: SelectContact,
		selectuser: selectuser,
		Daftar: Daftar,
		//modal: modal,
		Main: Main,
		Recorder: Recorder,
		Splash: Splash,
		//qtesti: qtesti,
		//qtash: qtash,
		//Test: Test,
		Classheet: Classheet,
		// formik:formik,
		//segmentedTab: segmentedTab,
		cal: cal,
		Audio: Audio,
		//Speech: Speech,
		//hookform: hookform,
		RecordList: RecordList,
		studentlistforms: studentlistforms,
		//Logo: Logo,
		//sheet: sheet,
		Workbook: Workbook,
		//tcombform: tcombform,
		settingUserDelete: settingUserDelete,
		Settings: {
			name: 'Settings',
			screen: Settings,
			navigationOptions: {
				gesturesEnabled: false
			}
		},
		tahlil: tahlil,
		timetable: timetable,
		Workbookdt: Workbookdt,
		//reactnativesnapcarousel: reactnativesnapcarousel,
		//recyclerViewList1: recyclerViewList1,
		//// lottie:lottie,
		//swipper: swipper,
		Takeimage: Takeimage,
		//examAdd: examAdd,
		//messageAdd: messageAdd,
		flatgrid: flatgrid,
		//help: help,
		Forms: Forms,
		accounting: accounting,
		//flatgridSection: flatgridSection,
		timeline: timeline,
		fixedtable: fixedtable,
		persiancalendarpicker: persiancalendarpicker,
		//galio: galio,
		//speech: speech,
		//update: update,
		reportView: reportView,
		monthgrade: monthgrade,
		//stickytable: stickytable,
		//paparButtomNavigator: paparButtomNavigator,
		//scrollabletab: scrollabletab,
		//FacebookExample: FacebookExample,
		Mainmenu: Mainmenu,
		Lightbox: Lightbox,
		//cwebview: cwebview,
		//FlatListGrid: FlatListGrid,
		qrscanner: qrscanner,
		//Craigslist: Craigslist,
		comment: comment,
		component: componentScreen,
		List: ListScreen,
		barnameh: barnameh,
		bankfile: bankfile,

		notification: notification,
		absentList: absentList,
		webinarparticipateList: webinarparticipateList,
		SearchScreen: SearchScreen,
		dynamic: dynamic,
		eventen: eventen,
		ResultShow: ResultShowScreen,
		adstory: adstory,
		recyclerViewList1: recyclerViewList1,
		//dynamictest: dynamictest,
		addgallery: addgallery,
		//	karnameh: karnameh,
		formEntry: formEntry,
		teacherStat: teacherStat,
		menuList: menuList,
		//reports: reports,

		reports: {
			screen: reports,
			navigationOptions: {
				headerBackTitle: 'Home'
			}
		},
		Exam: {
			name: 'Exam',
			screen: Exam,
			navigationOptions: {
				gesturesEnabled: false
			}
		},
		update: {
			name: 'update',
			screen: update,
			navigationOptions: {
				gesturesEnabled: false
			}
		},
		eforms: eforms,
		eforms2: eforms2,
		notnot: notnot,

		studentlist: studentlist,
		qbank: qbank,

		participateList: participateList,
		stdSearch: stdSearch,
		stdprofile: stdprofile,
		courseslist: courseslist,
		storyList: storyList

		//	Textscr: TextScreen
		///Users/majidghasemi/Projects/reactnative/lab/rn-starter/package.json
	},
	{
		initialRouteName: 'Main',
		defaultNavigationOptions: {
			headerTitle: () => (
				<View style={{ flexDirection: 'column' }}>
					{global.lang == 'fa' ? (
						// <Image source={require('./assets/images/logo.png')} />
						<Text style={{ fontSize: 16, fontFamily: 'iransans' }}>پــــــارس آموز</Text>
					) : (
						<Text>Parsamooz</Text>
					)}
					{global.lang == 'fa' ? (
						<Text style={{ marginTop: -3, fontFamily: 'iransans', fontSize: 9 }}>{'نگارش ۱۲.۱۱'}</Text>
					) : (
						<Text style={{ marginTop: -3, fontFamily: 'iransans', fontSize: 8 }}>{'version 11 '}</Text>
					)}
				</View>
			),
			headerRight: () => <ActionBarImage />,
			//backTitle: 'Backee',
			//
			// headerLeft: () => <Text style={{ fontSize: 8, fontFamily: 'iransans' }}>{state.headerMsg}</Text>,
			headerBackTitle: 'بازگشت',
			headerTitleAlign: 'center',

			headerBackTitleStyle: { color: 'black', fontSize: 15, fontFamily: 'iransans' },
			headerTitleStyle: {
				fontSize: 14,
				color: 'red'
				//fontWeight: 'bold'
				//fontFamily: 'iransans'
				//color:'red'
			},

			//headerTintColor: 'red',
			//header: null,
			//headerBackTitle: 'some label',
			navigationOptions: {
				title: 'انتخاب کاربر',
				//Title
				//	headerRight: <ActionBarImage />,
				//Image in Navigation Bar

				headerStyle: {
					backgroundColor: '#e3e3e3'
					//Background Color of Navigation Bar
				},
				headerBackTitle: 'Home',
				headerTintColor: '#606070'
			}
		}
	}
);
if (true) {
	I18nManager.allowRTL(true);
	I18nManager.forceRTL(true);
}
// SplashScreen.preventAutoHideAsync()
// 	.then((result) => console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`))
// 	.catch(console.warn); // it's good to explicitly catch and inspect any error

// const App1 = createBottomTabNavigator(
// 	{
// 		Home: { screen: HomeStack },
// 		Settings: { screen: SettingsStack }
// 	},
// 	{
// 		defaultNavigationOptions: ({ navigation }) => ({
// 			tabBarIcon: ({ focused, horizontal, tintColor }) => {
// 				const { routeName } = navigation.state;
// 				let IconComponent = Ionicons;
// 				let iconName;
// 				if (routeName === 'Home') {
// 					iconName = `ios-information-circle${focused ? '' : '-outline'}`;
// 				} else if (routeName === 'Settings') {
// 					iconName = `ios-checkmark-circle${focused ? '' : '-outline'}`;
// 				}
// 				return <IconComponent name={iconName} size={25} color={tintColor} />;
// 			}
// 		}),
// 		tabBarOptions: {
// 			activeTintColor: '#42f44b',
// 			inactiveTintColor: 'gray'
// 		}
// 	}
// );

class ErrorView extends React.Component {
	render() {
		return (
			<View>
				<Text>خطایی روی داده است</Text>
			</View>
		);

		// This component will be displayed when an error boundary catches an error
	}
}

const AppContainer = createAppContainer(navigator);
export default class App extends React.Component {
	constructor(props) {
		I18nManager.allowRTL(true);
		I18nManager.forceRTL(true);
		super(props);
		this.checkUpdate = 0;
		this.state = {
			headerMsg: '',
			fontLoaded: false,
			visible: false,
			visiblefin: false
		};
	}

	registerForPushNotificationsAsync = async () => {
		//alert();
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				//if (true) {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				//alert(status);
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			const token = await Notifications.getExpoPushTokenAsync();
			//alert(token.data);

			this.setState({ expoPushToken: token });
		} else {
			//alert('Must use physical device for Push Notifications');
		}

		if (Platform.OS === 'android') {
			// Notifications.createChannelAndroidAsync('default', {
			// 	name: 'default',
			// 	sound: true,
			// 	priority: 'max',
			// 	vibrate: [ 0, 250, 250, 250 ]
			// });
		}
	};

	async checkUpdates() {
		this.checkUpdate = 1;
		//this.setState({ issnack: true, msg: 'بروزرسانی در دسترس است.' });
		//alert('update');
		// Updates.checkForUpdateAsync().then((update) => {
		// 	alert('yes');

		// 	if (update.isAvailable) {
		// 		alert('yes');
		// 		this.setState({ issnack: true, msg: 'بروزرسانی در دسترس است.' });

		// 		doUpdate = () => {
		// 			Updates.reload();
		// 		};
		// 	} else {
		// 		//alert('no');
		// 	}
		// });
		// return;
		try {
			this.setState({ updateResult: 'checkforupdate' });
			//alert('1');
			//Updates.check;
			const canUpdate = await Updates.checkForUpdateAsync();
			//Updates.che;
			//alert('2');
			//alert(canUpdate.isAvailable);
			//	this.setState({ updateResult: canUpdate });
			if (canUpdate.isAvailable) {
				//this.setState({ updateResult: 'downloading' });
				//alert('downloading');
				this.setState({ visible: true });

				let result = await Updates.fetchUpdateAsync();
				if (result.isNew) {
					//alert('reload');

					this.setState({ updateResult: 'reload' });

					// Alert.alert(
					// 	'',
					// 	'پارس آموز شما بروز رسانی شد. راه اندازی دوباره نرم افزار...',
					// 	[
					// 		{
					// 			text: 'تایید',
					// 			onPress: async () => {
					// 				Updates.reloadAsync();
					// 			}
					// 		}
					// 	],
					// 	{ cancelable: false }
					// );

					this.setState({ visiblefin: true, updateResult: 'updated' });
				} else {
					//	alert('your app is new!');
					this.setState({ updateResult: 'your app is new!' });
				}
			}
		} catch (e) {
			//alert(e);
			this.setState({ errors: e });
		}
	}

	loadAPIBadge = async (page) => {
		//return;
		// if (global.adress == 'undefined') {
		// 	//this.setState({ refreshing: false });
		// }

		//this.setState({ refreshing: true });

		//let param = userInfo();
		//if (global.adress == undefined) return;
		//alert(param);
		//if (global.adress == undefined) return;
		let uurl = 'http://demo.farsamooz.ir/papi/papi.asmx/shouldupdate?currentPage=1&p=d&q=1&formid=4';

		//let uurl = 'http://192.168.1.12:8080/papi. asmx/mobileMainScreen?test=d';
		//console.log(uurl);
		try {
			//	uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				//console.log(retJson);
				if (Object.keys(retJson).length == 0) {
					// this.setState({
					// 	isSubmitting: false
					// });
					return;
				}
				//alert(retJson.path);
				//	this.setState({ visible: true });
				try {
					if (retJson.path == 'True' && this.checkUpdate == 0) {
						//alert('passage1');
						this.checkUpdates();
					}
				} catch (e) {}

				//alert(retJson.path);
				////////// sccess
				//	GLOBAL.screen1.setState({ items: retJson[0] });
				//console.log('nowww');
				// GLOBAL.main.setState({
				// 	routes: retJson
				// });
				// this.setState({
				// 	refreshing: false
				// });
				//console.log('data');
			}
		} catch (e) {
			//this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			//alert();
			// this.setState({
			// 	isSubmitting: false
			// });
			return;
		}
	};

	async componentDidMount() {
		this.loadAPIBadge();
		if (Platform.OS === 'android') {
			global.lang = 'fa';
		} else {
			global.lang = 'en';
			db.transaction((tx) => {
				tx.executeSql('SELECT * FROM users limit 1', [], (tx, results) => {
					var temp = [];
					for (let i = 0; i < results.rows.length; ++i) {
						temp.push(results.rows.item(i));
					}
					if (temp[0]['username'] == '2235516') global.lang = 'en';
					else global.lang = 'fa';
				});
			});
		}
		//alert();
		//Bugsnag.notify(new Error('Test error'));
		//console.log('Test error');
		//global.lang = 'fa';
		global.isupdateshowS = true;

		global.isupdateshowT = true;
		global.isupdateshowA = true;

		I18nManager.allowRTL(true);
		I18nManager.forceRTL(true);
		if (global.lang == 'fa') addDataToDb();
		await Font.loadAsync({
			iransans: require('./assets/IRANSansMobile.ttf')
			//iransans1: require('./assets/IRANSansMobile_Bold.ttf')
		});

		this.setState({ fontLoaded: true });
		if (global.lang == 'fa')
			setTimeout(async () => {
				//	await SplashScreen.hideAsync();
				//	console.log('now');
				this.setState({ splash: true });
			}, 4000);
		else
			setTimeout(async () => {
				//	await SplashScreen.hideAsync();
				//console.log('now');
				this.setState({ splash: true });
			}, 100);

		//this.registerForPushNotificationsAsync();

		//let er = await registerForPushNotificationsAsync();

		//Notifications.addNotificationReceivedListener(this._handleNotification);

		//Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
	}

	_handleNotification = (notification) => {
		this.setState({ notification: notification });
	};

	_handleNotificationResponse = (response) => {
		console.log(response);
	};

	render() {
		const { fontLoaded } = this.state;
		// global.username = '1080687149';
		// global.password = '1';
		// global.d = '95100040';
		// global.adressp = 'http://192.168.1.15';

		// global.adress = 'http://192.168.1.15:8080';
		// global.upadress = 'http://192.168.1.15:8181';

		// global.firstname = 'مجید';
		// global.lastname = 'قاسمی';
		// global.schoolname = 'taban';
		// global.ttype = 'student';

		if (!this.state.splash)
			return (
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: '#ffff0f'
						//borderWidth: 3,
						//borderColor: 'green'
					}}
				>
					{/* <View
						style={{
							backgroundColor: '#ffffff',
							alignItems: 'center',
							justifyContent: 'center',
							//flex: 1,
							height: '100%'
						}}
					> */}
					{/* <Text>dfvdsvds</Text>
					<LottieView
						// onAnimationFinish={() => {
						// 	this.setState({ splash: true });
						// }}
						ref={(animation) => {
							this.animation = animation;
						}}
						loop={false}
						autoPlay={false}
						style={{
							//flex: 1,
							width: 370,
							height: 370,
							borderWidth: 2,
							borderColor: 'red',
							marginTop: 0,
							//borderRadius: 13,
							backgroundColor: 'red'
						}}
						source={require('./src/screen/intro.json')}
						// OR find more Lottie files @ https://lottiefiles.com/featured
						// Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
					/> */}
					{/* </View> */}
					<Intro />
					{/* <Text>SplashScreen Demo! 👋</Text> */}
				</View>
			);

		// return (
		// 	<View style={{ flex: 1 }}>
		// 		<Text>init</Text>
		// 	</View>
		// );
		if (!fontLoaded)
			return (
				<View style={{ flex: 1 }}>
					<Text>init</Text>
				</View>
			);
		else
			return (
				<MenuProvider>
					<FancyAlert
						visible={this.state.visiblefin}
						icon={
							<View
								style={{
									flex: 1,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: '#5aa27c',
									borderRadius: 50,
									width: '100%'
								}}
							>
								<Text />
							</View>
						}
						style={{ backgroundColor: 'white' }}
					>
						<Text
							style={{
								textAlign: 'center',
								fontFamily: 'iransans',
								marginTop: -16,
								marginBottom: 32
							}}
						>
							نگارش جدید پارس آموز آماده اجرا میباشد...
						</Text>
						<Text
							style={{
								fontSize: 10,
								textAlign: 'center',
								fontFamily: 'iransans',
								marginTop: -16,
								marginBottom: 32
							}}
						>
							بروزرسانی و راه اندازی مجدد پارس آموز
						</Text>

						<FormButton
							onPress={async () => {
								{
									Updates.reloadAsync();
								}
							}}
							//icon={<Icon1 name="arrow-left" marginBottom={20} size={15} color="#1f9efd" />}
							iconRight
							buttonColor="#1f9efd"
							borderColor="white"
							fontSizeb={12.2}
							heightb={40}
							widthb={180}
							borderRadiusb={10}
							style={{ marginTop: 0, marginBottom: 20 }}
							backgroundColor="#e3f1fc"
							buttonType="outline"
							//loading={this.state.isSubmitting}
							title=" راه انداری مجدد"
						/>
						<FormButton
							onPress={() => {
								{
									this.setState({ visiblefin: false });
								}
							}}
							//icon={<Icon1 name="arrow-left" marginBottom={20} size={15} color="#1f9efd" />}
							iconRight
							buttonColor="#1f9efd"
							borderColor="white"
							fontSizeb={12.2}
							heightb={40}
							widthb={180}
							borderRadiusb={10}
							style={{ marginTop: 0, marginBottom: 20 }}
							backgroundColor="#e3f1fc"
							buttonType="outline"
							//loading={this.state.isSubmitting}
							title=" انصراف"
						/>
					</FancyAlert>

					<FancyAlert
						visible={this.state.visible}
						icon={
							<View
								style={{
									flex: 1,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									backgroundColor: '#eed202',
									borderRadius: 50,
									width: '100%'
								}}
							>
								<Text />
							</View>
						}
						style={{ backgroundColor: 'white' }}
					>
						<Text
							style={{
								textAlign: 'center',
								fontFamily: 'iransans',
								marginTop: -16,
								marginBottom: 32
							}}
						>
							نگارش جدید پارس آموز در دسترس و در حال دانلود میباشد...
						</Text>

						<FormButton
							onPress={() => {
								{
									this.setState({ visible: false });
								}
							}}
							//icon={<Icon1 name="arrow-left" marginBottom={20} size={15} color="#1f9efd" />}
							iconRight
							buttonColor="#1f9efd"
							borderColor="white"
							fontSizeb={12.2}
							heightb={40}
							widthb={180}
							borderRadiusb={10}
							style={{ marginTop: 0, marginBottom: 20 }}
							backgroundColor="#e3f1fc"
							buttonType="outline"
							//loading={this.state.isSubmitting}
							title=" تایید"
						/>
					</FancyAlert>
					<AppContainer />
				</MenuProvider>
			);
	}
}

//@connectCallModal
//class App extends React.Component {}
AppRegistry.registerComponent('App', () => <App />);
//export default createAppContainer(navigator);
