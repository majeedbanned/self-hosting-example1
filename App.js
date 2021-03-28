import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import LottieView from 'lottie-react-native';
import ListScreen from './src/screens/listScreen';
import ActionBarImage from './src/components/ActionBarImage';
import componentScreen from './src/screens/componentScreen';
import { enableScreens } from 'react-native-screens';
import TextScreen from './src/screens/textScreen';
import Craigslist from './src/screens/Craigslist';
import FlatListGrid from './src/screens/FlatListGrid';
import Mainmenu from './src/screens/mainmenu';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

import React from 'react';
import SearchScreen from './src/screens/SearchScreen';
import ResultShowScreen from './src/screens/ResultShowScreen';
import scrollabletab from './src/screens/scrollabletab';
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
import speech from './src/screen/speech';

import studentlistforms from './src/screen/modules/forms/studentlistforms';

import qbank from './src/screen/modules/questionBank/qbank';
import qtesti from './src/screen/modules/questionBank/qtesti';

import { userInfo, toFarsi, getHttpAdress } from './src/components/DB';

import qtash from './src/screen/modules/questionBank/qtash';
import participateList from './src/screen/modules/questionBank/participateList';
import webinarparticipateList from './src/screen/webinarparticipateList';

import stdSearch from './src/screen/modules/profile/stdSearch';
import stdprofile from './src/screen/modules/profile/stdprofile';
import courseslist from './src/screen/modules/teachersheet/courseslist';

import { Image, View, Text } from 'react-native';

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
import Forms from './src/screen/forms';
import help from './src/screen/help';
import comment from './src/screen/comment';

import * as Sentry from 'sentry-expo';
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

import { I18nManager, AppRegistry } from 'react-native';
import GLOBAL from './src/screen/global';
import SelectContact from './src/screen/selectContact';
import Settings from './src/screen/settings';

import { MenuProvider } from 'react-native-popup-menu';
// Sentry.init({
// 	dsn: 'https://e31a1624db404b3b9e3f29be7497128b@o433732.ingest.sentry.io/5389516',
// 	enableInExpoDevelopment: true,
// 	debug: true
// });

// Sentry.captureException(new Error('Oops!'));

//
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
					alert(e);
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
		SelectContact: SelectContact,
		selectuser: selectuser,
		Daftar: Daftar,
		modal: modal,
		Main: Main,
		Recorder: Recorder,
		Splash: Splash,
		Test: Test,
		Classheet: Classheet,
		// formik:formik,
		segmentedTab: segmentedTab,
		cal: cal,
		Audio: Audio,
		Speech: Speech,
		hookform: hookform,
		RecordList: RecordList,
		studentlistforms: studentlistforms,
		Logo: Logo,
		sheet: sheet,
		Workbook: Workbook,
		tcombform: tcombform,
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
		reactnativesnapcarousel: reactnativesnapcarousel,
		recyclerViewList1: recyclerViewList1,
		//// lottie:lottie,
		swipper: swipper,
		Takeimage: Takeimage,
		examAdd: examAdd,
		messageAdd: messageAdd,
		flatgrid: flatgrid,
		help: help,
		Forms: Forms,
		accounting: accounting,
		flatgridSection: flatgridSection,
		timeline: timeline,
		fixedtable: fixedtable,
		persiancalendarpicker: persiancalendarpicker,
		galio: galio,
		speech: speech,
		reportView: reportView,
		monthgrade: monthgrade,
		stickytable: stickytable,
		paparButtomNavigator: paparButtomNavigator,
		scrollabletab: scrollabletab,
		FacebookExample: FacebookExample,
		Mainmenu: Mainmenu,
		Lightbox: Lightbox,
		cwebview: cwebview,
		FlatListGrid: FlatListGrid,
		qrscanner: qrscanner,
		Craigslist: Craigslist,
		comment: comment,
		component: componentScreen,
		List: ListScreen,
		barnameh: barnameh,
		bankfile: bankfile,
		Textscr: TextScreen,
		notification: notification,
		absentList: absentList,
		webinarparticipateList: webinarparticipateList,
		SearchScreen: SearchScreen,
		dynamic: dynamic,
		ResultShow: ResultShowScreen,
		adstory: adstory,
		dynamictest: dynamictest,
		addgallery: addgallery,
		karnameh: karnameh,
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
		eforms: eforms,
		eforms2: eforms2,

		studentlist: studentlist,
		qbank: qbank,
		qtesti: qtesti,
		qtash: qtash,
		participateList: participateList,
		stdSearch: stdSearch,
		stdprofile: stdprofile,
		courseslist: courseslist,
		storyList: storyList
	},
	{
		initialRouteName: 'Main',
		defaultNavigationOptions: {
			headerTitle: () => (
				<View style={{ flexDirection: 'column' }}>
					{global.lang == 'fa' ? (
						<Image source={require('./assets/images/logo.png')} />
					) : (
						<Text>Parsamooz</Text>
					)}
					{global.lang == 'fa' ? (
						<Text style={{ marginTop: -3, fontFamily: 'iransans', fontSize: 8 }}>{'نگارش ۱۱'}</Text>
					) : (
						<Text style={{ marginTop: -3, fontFamily: 'iransans', fontSize: 8 }}>{'version 11 '}</Text>
					)}
				</View>
			),
			headerRight: () => <ActionBarImage />,
			//backTitle: 'Backee',
			//
			//headerLeft: () => <Icon name="settings-sharp" />,
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
const AppContainer = createAppContainer(navigator);
export default class App extends React.Component {
	constructor(props) {
		I18nManager.allowRTL(true);
		I18nManager.forceRTL(true);
		super(props);
		this.state = {
			fontLoaded: false
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
	async componentDidMount() {
		global.lang = 'fa';
		I18nManager.allowRTL(true);
		I18nManager.forceRTL(true);

		addDataToDb();
		await Font.loadAsync({
			iransans: require('./assets/IRANSansMobile.ttf'),
			iransansbold: require('./assets/IRANSansMobile_Bold.ttf')
		});

		this.setState({ fontLoaded: true });
		if (global.lang == 'fa')
			setTimeout(async () => {
				//	await SplashScreen.hideAsync();
				console.log('now');
				this.setState({ splash: true });
			}, 4000);
		else
			setTimeout(async () => {
				//	await SplashScreen.hideAsync();
				console.log('now');
				this.setState({ splash: true });
			}, 100);

		this.registerForPushNotificationsAsync();
		Notifications.addNotificationReceivedListener(this._handleNotification);

		Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
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
						backgroundColor: '#ffffff'
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
					<AppContainer />
				</MenuProvider>
			);
	}
}

//@connectCallModal
//class App extends React.Component {}
AppRegistry.registerComponent('App', () => App);
//export default createAppContainer(navigator);
