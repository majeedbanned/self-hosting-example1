import React, { Component } from 'react';
import {
	View,
	ScrollView,
	TouchableOpacity,
	Text,
	RefreshControl,
	Alert,
	Platform,
	Linking,
	StyleSheet,
	FlatList
} from 'react-native';
//import * as Updates from 'expo-updates';

import * as Notifications from 'expo-notifications';
//import { Restart } from 'fiction-expo-restart';
import * as Permissions from 'expo-permissions';

import * as Updates from 'expo-updates';
import ActionBarImage from '../components/ActionBarImage';
import { userInfo, toFarsi, encrypt, getHttpAdress } from '../components/DB';
import { Snackbar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { withNavigation } from 'react-navigation';
import * as SQLite from 'expo-sqlite';
import Swiper from 'react-native-swiper';
//import DeviceInfo from 'react-native-device-info';
import Constants from 'expo-constants';
import Loading from '../components/loading';
import DropdownAlert from 'react-native-dropdownalert';

import Menu from '../screen/menu';
import GLOBAL from './global';
import Birthday from '../screen/birthday';
import Stories from '../screen/modules/story/stories';
import NetInfo from '@react-native-community/netinfo';
import Database from '../components/database';
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

const onPlaceChosen = (params) => {
	// here is your callback function
	alert();
};

class page1 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			refreshing: false,
			//data: [],
			datamain: [],
			noti1: '',
			data1: [
				[
					{
						id: '1',
						name: '1',
						caption: 'ارزشیابی کلاسی',
						icon: 'profile',
						color: '#f2c514',
						active: '1',
						bkcolor: '',
						access: 'student',
						idd: '1',
						badge: '0'
					},
					{
						id: '3',
						name: '3',
						caption: 'فرم ها',
						icon: 'form',
						color: '#2acb6e',
						active: '1',
						bkcolor: '',
						access: 'student,teacher,administrator',
						idd: '3',
						badge: '21'
					},
					{
						id: '4',
						name: '4',
						caption: 'حسابداری',
						icon: 'creditcard',
						color: '#2e95d8',
						active: '1',
						bkcolor: '',
						access: 'student',
						idd: '4',
						badge: '4'
					},
					{
						id: '5',
						name: '5',
						caption: 'نمرات ماهیانه',
						icon: 'barchart',
						color: '#2e95d8',
						active: '1',
						bkcolor: '',
						access: 'student',
						idd: '5',
						badge: '0'
					},
					{
						id: '6',
						name: '1',
						caption: 'کارنامه',
						icon: 'filetext1',
						color: '#16a085',
						active: '1',
						access: 'student',
						idd: '6',
						badge: '0'
					},
					{
						id: '7',
						name: '2',
						caption: 'برنامه هفتگی ',
						icon: 'calendar',
						color: '#2ecc71',
						active: '1',
						access: 'student,teacher,administrator',
						idd: '7',
						badge: '0'
					},
					{
						id: '9',
						name: '4',
						caption: 'گزارشات',
						icon: 'dotchart',
						color: '#9b59b6',
						active: '1',
						access: 'teacher,administrator,student',
						idd: '9',
						badge: '0'
					},
					{
						id: '11',
						name: '5',
						caption: 'راهنما',
						icon: 'iconfontdesktop',
						color: '#f1c40f',
						active: '1',
						access: 'student,teacher,administrator',
						idd: '11',
						badge: '0'
					},
					{
						id: '14',
						caption: 'تنظیمات',
						icon: 'setting',
						color: '#37a3ab',
						access: 'student,teacher,administrator',
						idd: '15',
						badge: '0'
					}
				],
				[
					{
						id: '1',
						caption: 'تفرات برتر ماه مهر',
						list: [
							{
								id: '1',
								studentcode: '214237683',
								name: 'حسن محمدی',
								caption: 'teacher'
							},
							{
								id: '2',
								studentcode: '1080687149',
								name: 'پدرام روستا',
								caption: 'student'
							},
							{
								id: '3',
								studentcode: '1274593263',
								name: 'علیرضا سپهر',
								caption: 'student'
							},
							{
								id: '4',
								studentcode: '229',
								name: 'مجید صداقت',
								caption: 'student'
							},
							{
								id: '5',
								studentcode: '6650056707',
								name: 'محسن شادباش',
								caption: 'student'
							}
						]
					},
					{
						id: '2',
						caption: 'برگزیدگان مسابقه کتاب',
						list: [
							{
								id: '6',
								studentcode: '6650056707',
								name: 'محسن شادباش'
							},
							{
								id: '7',
								studentcode: '5480136410'
							},
							{
								id: '8',
								studentcode: '5150220973'
							},
							{
								id: '9',
								studentcode: '6790073671'
							},
							{
								id: '10',
								studentcode: '6880032338'
							}
						]
					},
					{
						id: '3',
						caption: 'معلمین برتر'
					}
				],
				[
					{
						name: 'سفر',
						image: 'e16bd554-c4a7-421d-a5d8-9f73fffde492.jpg',
						id: '48'
					},
					{
						name: 'تفریح',
						image: 'aabe85f3-fa91-4e5f-9496-0c275f2fe73d.jpg',
						id: '47'
					}
				]
			]
		};
		this.shouldUpdate = 0;
		this.checkUpdate = 0;
		this.props.navigation.addListener('willFocus', () => {
			this.loadAPI(1);
			if (global.lang == 'fa') this.loadAPIBadge();
		});
	}

	refresh() {
		alert();
	}

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;
		return {
			//headerTitle: this.reportName,
			headerRight: () => null,
			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransans'
				//color: this.state.colorhead
			}
		};
	};

	handletouch = () => {
		GLOBAL.ActionBarImage.setState({
			avatarSrc: 'http://192.168.1.15:8080/upload/95100040/child/1080687149.jpg'
		});
	};
	onRefresh() {
		//console.log('refresh');
		if (global.lang == 'fa') {
			this.setState({ page: 1 });
			this.loadAPI(1);
			this.loadAPIBadge();
		}
	}

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
			//alert();

			const canUpdate = await Updates.checkForUpdateAsync();
			//alert(canUpdate.isAvailable);
			//	this.setState({ updateResult: canUpdate });
			if (canUpdate.isAvailable) {
				//this.setState({ updateResult: 'downloading' });
				//alert('downloading');
				let result = await Updates.fetchUpdateAsync();
				if (result.isNew) {
					//alert('reload');

					this.setState({ updateResult: 'reload' });

					Alert.alert(
						'',
						'پارس آموز شما بروز رسانی شد. راه اندازی دوباره نرم افزار...',
						[
							{
								text: 'تایید',
								onPress: async () => {
									Updates.reloadAsync();
								}
							}
						],
						{ cancelable: false }
					);

					this.setState({ updateResult: 'updated' });
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

	async componentDidMount() {
		// try {

		//alert(er);
		//console.log('d');

		//this.checkUpdates();
		//	console.log('r');

		// const update = await Updates.checkForUpdateAsync();
		// alert(update);
		// if (update.isAvailable) {
		// 	await Updates.fetchUpdateAsync();
		// 	this.setState({ issnack: true, msg: 'بروزرسانی در دسترس است.' });

		// 	Updates.reloadFromCache();
		// }
		// continues back to AppEntry.js since at this point the latest version has been downloaded
		//this.props.onFinish();
		// } catch (e) {
		// 	console(e.msg);
		// 	// handle or log error
		// }

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

		//	alert(Constants.manifest.version);
		this.setState(
			{
				// dummystory: [
				// 	{
				// 		name: '',
				// 		image: '',
				// 		id: '48'
				// 	},
				// 	{
				// 		name: '',
				// 		image: '',
				// 		id: '47'
				// 	},
				// 	{
				// 		name: '',
				// 		image: '',
				// 		id: '1'
				// 	},
				// 	{
				// 		name: '',
				// 		image: '',
				// 		id: '2'
				// 	},
				// 	{
				// 		name: '',
				// 		image: '',
				// 		id: '3'
				// 	}
				// ]
			}
		);

		let results = await Database.executeSql('select * from users ', []);

		if (results.rows.length == 0) {
			const { navigate } = this.props.navigation;
			navigate('Login', { mode: false });
		} else {
			db.transaction((tx) => {
				tx.executeSql('SELECT * FROM users limit 1', [], (tx, results) => {
					var temp = [];
					for (let i = 0; i < results.rows.length; ++i) {
						temp.push(results.rows.item(i));
					}
					global.username = temp[0]['username'];
					global.password = temp[0]['password'];
					global.schoolcode = temp[0]['schoolcode'];
					global.adress = temp[0]['adress'] + '/papi';
					global.firstname = temp[0]['firstname'];
					global.lastname = temp[0]['lastname'];
					global.schoolname = temp[0]['schoolname'];
					global.ttype = temp[0]['ttype'];
				});
			});

			// setTimeout(async () => {
			// 	this.updateToken(er, global.username, global.schoolcode, Platform.OS, global.ttype);
			// }, 3000);
		}

		this.setState(
			{
				// stories: [
				// 	{
				// 		id: 1,
				// 		image: '12.jpg',
				// 		name: 'آزمایشگاه',
				// 		caption: 'آزمایشگاه'
				// 	},
				// 	{
				// 		id: 2,
				// 		image: '13.jpg',
				// 		name: 'آب بازی',
				// 		caption: 'آب بازی'
				// 	},
				// 	{
				// 		id: 3,
				// 		image: '14.jpg',
				// 		name: 'انتخابات دانش آموزی',
				// 		caption: ''
				// 	},
				// 	{
				// 		id: 4,
				// 		image: '15.jpg',
				// 		name: 'امتحانات',
				// 		caption: 'امتحانات'
				// 	},
				// 	{
				// 		id: 5,
				// 		image: '16.jpg',
				// 		name: 'کلاس آنلاین',
				// 		caption: 'کلاس آنلاین'
				// 	},
				// 	{
				// 		id: 6,
				// 		image: '17.jpg',
				// 		name: 'معلمین',
				// 		caption: ''
				// 	},
				// 	{
				// 		id: 7,
				// 		image: '18.jpg',
				// 		name: 'زمین بازی',
				// 		caption: ''
				// 	},
				// 	{
				// 		id: 8,
				// 		image: '19.jpg',
				// 		name: '',
				// 		caption: ''
				// 	}
				// ]
			}
		);
		this.setState(
			{
				// datamain: [
				// 	{
				// 		caption: 'دانش آموزان برتر',
				// 		items: [
				// 			{
				// 				studentcode: '1080687149',
				// 				name: 'علی بهتاش',
				// 				caption: ''
				// 			},
				// 			{
				// 				studentcode: '1274593263',
				// 				name: 'حامد ارشیان سالار پور',
				// 				caption: ''
				// 			},
				// 			{
				// 				studentcode: '214237683',
				// 				name: 'هوشنگ ابتهاج',
				// 				caption: ''
				// 			},
				// 			{
				// 				studentcode: '45',
				// 				name: 'محمود احمدی',
				// 				caption: ''
				// 			},
				// 			{
				// 				studentcode: '39',
				// 				name: 'صمد بهرامی',
				// 				caption: ''
				// 			},
				// 			{
				// 				studentcode: '229',
				// 				name: 'جمال شوریجه',
				// 				caption: ''
				// 			}
				// 		]
				// 	}
				// ]
			}
		);

		setTimeout(async () => {
			//if (global.lang == 'fa') {
			this.loadAPI(1);
			if (global.lang == 'fa') this.loadAPIBadge();
			//}

			//this.setState({ issnack: true });
			//const canUpdate = await Updates.checkForUpdateAsync();

			///alert('hi');
		}, 1000);

		let er = await registerForPushNotificationsAsync();
		this.setState({ noti1: er });
	}

	onwonrefresh = () => {
		setTimeout(async () => {
			this.loadAPI(1);
			this.loadAPIBadge();
		}, 1000);
	};

	updateToken = async (er, username, schoolcode, OS, ttype) => {
		//return;

		//this.setState({ refreshing: true });

		let uurl =
			global.adress +
			'/pApi.asmx/updateToken?id=' +
			er +
			'$' +
			username +
			'$' +
			schoolcode +
			'$' +
			OS +
			'$' +
			ttype;

		//let uurl = 'http://192.168.1.12:8080/papi. asmx/mobileMainScreen?test=d';
		//	console.log(uurl);
		try {
			uurl = encrypt(uurl);
			console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
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

	loadAPIBadge = async (page) => {
		//return;
		if (global.adress == 'undefined') {
			//this.setState({ refreshing: false });
		}

		this.setState({ refreshing: true });

		let param = userInfo();
		if (global.adress == undefined) return;
		//alert(param);
		if (global.adress == undefined) return;
		let uurl = global.adress + '/pApi.asmx/getMainMenuBadge?id=' + '1' + '&p=' + param;

		//let uurl = 'http://192.168.1.12:8080/papi. asmx/mobileMainScreen?test=d';
		////console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				//console.log(retJson);
				if (Object.keys(retJson).length == 0) {
					this.setState({
						isSubmitting: false
					});
					return;
				}
				////////// sccess
				//	GLOBAL.screen1.setState({ items: retJson[0] });
				//console.log('nowww');
				GLOBAL.main.setState({
					routes: retJson
				});
				this.setState({
					refreshing: false
				});
				//console.log('data');
			}
		} catch (e) {
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			//alert();
			this.setState({
				isSubmitting: false
			});
			return;
		}
	};

	onPlaceChosen = (params) => {
		this.loadAPI(1);
	};

	loadAPI = async (page) => {
		if (global.adress == 'undefined') {
			//this.setState({ refreshing: false });
		}

		/* #region  check internet */
		//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
		//	alert(global.lang);
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');

			return;
		}
		/* #endregion */

		this.setState({ refreshing: true });

		let param = userInfo();
		if (global.adress == undefined) return;
		let uurl = global.adress + '/pApi.asmx/getMainMenu?id=' + page + '&p=' + param;

		//let uurl = 'http://192.168.1.12:8080/papi.asmx/mobileMainScreen?test=d';

		if (global.lang == 'en') {
			//	alert('en');
			this.setState({
				refreshing: false,
				data: [
					[
						// {
						// 	id: '1',
						// 	name: '1',
						// 	caption: ' Grades',
						// 	icon: 'profile',
						// 	color: '#f2c514',
						// 	active: '1',
						// 	bkcolor: '',
						// 	access: 'student',
						// 	idd: '1',
						// 	badge: '0'
						// },
						{
							id: '3',
							name: '3',
							caption: 'Forms ',
							icon: 'form',
							color: '#2acb6e',
							active: '1',
							bkcolor: '',
							access: 'student,teacher,administrator',
							idd: '3',
							badge: '0'
						},
						{
							id: '5',
							name: '5',
							caption: 'Mounthly Grades ',
							icon: 'barchart',
							color: '#2e95d8',
							active: '1',
							bkcolor: '',
							access: 'student',
							idd: '5',
							badge: '0'
						},
						{
							id: '7',
							name: '2',
							caption: ' Schedule ',
							icon: 'calendar',
							color: '#2ecc71',
							active: '1',
							access: 'student,teacher,administrator',
							idd: '7',
							badge: '0'
						},
						{
							id: '15',
							name: '1',
							caption: 'Files ',
							icon: 'profile',
							color: '#f2c214',
							active: '1',
							bkcolor: '',
							access: 'student,teacher,administrator',
							idd: '16',
							badge: '0'
						},
						// {
						// 	id: '9',
						// 	name: '4',
						// 	caption: 'Reports',
						// 	icon: 'dotchart',
						// 	color: '#9b59b6',
						// 	active: '1',
						// 	access: 'teacher,administrator,student',
						// 	idd: '9',
						// 	badge: '0'
						// },
						{
							id: '14',
							caption: 'Setting',
							icon: 'setting',
							color: '#37a3ab',
							access: 'student,teacher,administrator',
							idd: '15',
							badge: '0'
						}
					],
					[],
					[
						{
							name: 'Library',
							image: '1.jpg',
							id: '1'
						},
						{
							name: 'Dinning hall',
							image: '2.jpg',
							id: '2'
						},
						{
							name: 'Exams',
							image: '3.jpg',
							id: '3'
						},
						{
							name: 'Cermonies',
							image: '4.jpg',
							id: '4'
						},
						{
							name: 'Laboratory',
							image: '5.jpg',
							id: '5'
						}
					],
					[ { ac: '1', msg: 'hi', cancelable: '10' } ],
					[
						{
							name: 'Azusa Unified Elementary School Joins ‘No Excuses’ University Network',
							id: '3'
						},
						{
							name: 'Azusa Unified Partners with University of La Verne for Admission',
							id: '2'
						},
						{
							name: 'Azusa Unified Begins Next Phase in Measure K Facilities Construction',
							id: '1'
						}
					],
					[],
					[
						{
							name: 'Final speaking Exam',
							coursename: '-زبان خارجي1,-زبان خارجي3,-زبان خارجي3,-زبان خارجي3',
							usertype: '',
							teachername: 'اشکان مبرائیان ',
							id: '55433',
							teachercode: '20',
							date_: 'December'
						},
						{
							name: 'Online Learning FAQs width Experts',
							coursename: 'Online Learning FAQs with Experts ',
							usertype: '',
							teachername: 'اشکان مبرائیان ',
							id: '55429',
							teachercode: '20',
							date_: 'December'
						},
						{
							name: 'National day ceremony',
							coursename: '-زبان خارجي1,-زبان خارجي1,-زبان خارجي1',
							usertype: '',
							teachername: 'اشکان مبرائیان ',
							id: '55432',
							teachercode: '20',
							date_: 'December'
						}
					]
				]
			});
			return;
		}

		// try {

		//alert();
		uurl = encrypt(uurl);
		console.log(uurl);

		const response = await fetch(uurl);
		if (response.ok) {
			let retJson = await response.json();
			//console.log(retJson);
			if (Object.keys(retJson).length == 0) {
				this.setState({
					isSubmitting: false,
					refreshing: false
				});
				return;
			}
			//	alert();
			////////// sccess
			//	GLOBAL.screen1.setState({ items: retJson[0] });
			//console.log('nowww');
			this.setState({
				//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
				data: retJson,

				refreshing: false
			});
			//if (false)

			//ver
			//	return;
			//alert();
			if (retJson[3][0].ac == 0) {
				if (true) {
					Alert.alert(
						'',
						retJson[3][0].msg,
						[
							{
								text: 'تایید',
								onPress: async () => {
									const { navigate } = this.props.navigation;
									navigate('Settings');
								}
							}
						],
						{ cancelable: true }
					);
				} else {
					//Alert.alert('Hello world!');
					// Alert.alert(
					// 	'.',
					// 	retJson[3][0].msg,
					// 	[
					// 		{
					// 			text: 'تایید',
					// 			onPress: async () => {
					// 				const { navigate } = this.props.navigation;
					// 				navigate('Settings');
					// 			}
					// 		}
					// 	],
					// 	{ cancelable: true }
					// );
				}
			}
			//return;
			if (global.ttype == 'student' && retJson[5][0].sv != Constants.manifest.version && global.isupdateshowS) {
				if (retJson[5][0].sf == 0) {
					global.isupdateshowS = false;
				} else if (retJson[5][0].sf == 1) {
					//	alert();
					const { navigate } = this.props.navigation;

					navigate('update', {
						lnk: Platform.OS === 'ios' ? retJson[5][0].ilnk : retJson[5][0].alnk
					});

					return;
				}

				Alert.alert(
					'',
					'لطفا اپلیکیشن خود را بروز آوری نمایید',
					[
						{
							text: 'بروزآوری',
							onPress: () => {
								Platform.OS === 'ios'
									? Linking.openURL(retJson[5][0].ilnk)
									: Linking.openURL(retJson[5][0].alnk);
							},
							style: 'cancel'
						},
						{
							text: 'انصراف',
							onPress: () => {
								//this.deleteapi(item.id, index);
							}
						}
					],
					{ cancelable: false }
				);
			}
			//alert(global.isupdateshow);
			if (global.ttype == 'teacher' && retJson[5][0].tv != Constants.manifest.version && global.isupdateshowT) {
				//	alert();
				if (retJson[5][0].tf == 0) {
					global.isupdateshowT = false;
				} else if (retJson[5][0].tf == 1) {
					//	alert();
					const { navigate } = this.props.navigation;

					navigate('update', {
						lnk: Platform.OS === 'ios' ? retJson[5][0].ilnk : retJson[5][0].alnk
					});

					return;
				}

				Alert.alert(
					'',
					'لطفا اپلیکیشن خود را بروز آوری نمایید',
					[
						{
							text: 'بروزآوری',
							onPress: () => {
								Platform.OS === 'ios'
									? Linking.openURL(retJson[5][0].ilnk)
									: Linking.openURL(retJson[5][0].alnk);
							},
							style: 'cancel'
						},
						{
							text: 'انصراف',
							onPress: () => {
								//this.deleteapi(item.id, index);
							}
						}
					],
					{ cancelable: false }
				);
			}

			if (
				global.ttype == 'administrator' &&
				retJson[5][0].av != Constants.manifest.version &&
				global.isupdateshowA
			) {
				//alert();
				if (retJson[5][0].af == 0) {
					global.isupdateshowA = false;
				} else if (retJson[5][0].af == 1) {
					//	alert();
					const { navigate } = this.props.navigation;

					navigate('update', {
						lnk: Platform.OS === 'ios' ? retJson[5][0].ilnk : retJson[5][0].alnk
					});

					return;
				}

				Alert.alert(
					'',
					'لطفا اپلیکیشن خود را بروز آوری نمایید',
					[
						{
							text: 'بروزآوری',
							onPress: () => {
								Platform.OS === 'ios'
									? Linking.openURL(retJson[5][0].ilnk)
									: Linking.openURL(retJson[5][0].alnk);
							},
							style: 'cancel'
						},
						{
							text: 'انصراف',
							onPress: () => {
								//this.deleteapi(item.id, index);
							}
						}
					],
					{ cancelable: false }
				);
			}
			try {
				this.shouldUpdate = retJson[5][0].shouldupdate;
			} catch (e) {}
			//alert(this.shouldUpdate);
			// if (this.shouldUpdate == 1 && this.checkUpdate == 0) {
			// 	this.checkUpdates();
			// }

			//console.log('page1 load');
		}
		// } catch (e) {
		// 	this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی1 به اطلاعات');
		// 	this.setState({
		// 		isSubmitting: false,
		// 		refreshing: false
		// 	});
		// 	return;
		// }
	};
	render() {
		//	return <View />;
		GLOBAL.page1 = this;
		//alert();
		//return <View />;
		if (!this.state.data)
			return (
				// <React.Fragment>
				<Loading onclick={() => this.onwonrefresh()} />
				// <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
				// </React.Fragment>
			);
		//alert(this.state.data[0].length);
		//console.log(this.state.datamain[0].items);
		//return null;
		return (
			<ScrollView
				showsHorizontalScrollIndicator={false}
				persistentScrollbar={false}
				keyboardShouldPersistTaps="handled"
				style={{
					backgroundColor: '#f8f8f8'
				}}
				refreshControl={
					<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} title="" />
				}
			>
				{/* <Menu items={this.state.data1[0]} /> */}
				{/* <Menu items={this.state.data[0]} /> */}
				{/* <Menu items={this.state.data1[0]} /> */}
				{/* this.state.data[2] */}
				{/* {this.state.data[2].length == 0 && (
					<Stories ccolor={'#ddd'} Items={this.state.dummystory} Navigation={this.props.navigation} />
				)} */}

				{/* this.state.data[2] */}
				{/* {this.state.data[2].length > 0|| true && ( */}
				<Stories
					ccolor={'#f76d6d'}
					Items={
						this.state.data[2].length > 0 ? (
							this.state.data[2]
						) : (
							[
								{
									name: '',
									image: '',
									id: '3'
								},
								{
									name: '',
									image: '',
									id: '2'
								},
								{
									name: '',
									image: '',
									id: '1'
								}
							]
						)
					}
					Navigation={this.props.navigation}
				/>
				{/* )} */}
				<View>{this.state.data[0].length > 0 && <Menu items={this.state.data[0]} />}</View>
				<View>
					{this.state.data[4].length <= 0 && (
						<TouchableOpacity
							onPress={() => {
								const { navigate } = this.props.navigation;
								if (global.ttype == 'administrator')
									navigate('eforms', {
										eformsID: 35,
										instanseID: '',
										stdID: 0,
										mode: 'view',
										isAdminForms: 'true',
										extra: this.extra
									});
							}}
							style={{
								alignItems: 'center',
								borderColor: '#ccc',
								borderRadius: 15,
								borderWidth: 1,
								height: 70,
								borderStyle: 'dashed',
								marginLeft: 15,
								marginRight: 15
							}}
						>
							<Text
								style={{
									marginTop: 25,
									color: 'gray',
									fontFamily: 'iransans'
								}}
							>
								{global.lang == 'fa' ? 'تابلو اعلانات' : 'News'}
							</Text>
						</TouchableOpacity>
					)}

					{this.state.data[4].length > 0 &&
					true && (
						<Swiper
							onIndexChanged={(index) => {
								//alert(index);
							}}
							paginationStyle={{
								flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse'
							}}
							dotColor={'#eee'}
							loop={true}
							autoplay={true}
							autoplayTimeout={4.5}
							style={styles.wrapper}
							showsButtons={false}
						>
							{this.state.data[4].map((data, index) => {
								return (
									<LinearGradient
										key={data.id}
										colors={
											index == 0 ? (
												[ '#6e80fe', '#a976fb', '#f36af9' ]
											) : index == 1 ? (
												[ '#ff5f9a', '#ff8184', '#ffab68' ]
											) : (
												[ '#009FFF', '#85b1ff' ]
											)
										}
										start={{ x: 0, y: 1 }}
										end={{ x: 1, y: 0 }}
										style={{ margin: 15, borderRadius: 15 }}
									>
										<View style={{ height: 100 }}>
											<Text
												style={{
													color: 'white',
													fontFamily: 'iransans',
													textAlign: global.lang == 'fa' ? 'left' : 'right',
													padding: 15
												}}
											>
												{data.name}
											</Text>
										</View>
									</LinearGradient>
								);
							})}

							{/* <LinearGradient
							colors={[ '#ff5f9a', '#ff8184', '#ffab68' ]}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 0 }}
							style={{ margin: 15, borderRadius: 15 }}
						>
							<View style={{ height: 100 }}>
								<Text
									style={{ color: 'white', fontFamily: 'iransans', textAlign: 'left', padding: 15 }}
								>
									روابط خود را هم‌زمان با دو جبهه شرق و غرب گسترش دهد و به یاد داشته باشد که چین در
									حال آزمودن اولین تجربه
								</Text>
							</View>
						</LinearGradient> */}
							{/* <LinearGradient
							colors={[ '#009FFF', '#85b1ff' ]}
							start={{ x: 0, y: 1 }}
							end={{ x: 1, y: 0 }}
							style={{ margin: 15, borderRadius: 15 }}
						>
							<View style={{ height: 100 }}>
								<Text
									style={{ color: 'white', fontFamily: 'iransans', textAlign: 'left', padding: 15 }}
								>
									روابط خود را هم‌زمان با دو جبهه شرق و غرب گسترش دهد و به یاد داشته باشد که چین در
									حال آزمودن اولین تجربه
								</Text>
							</View>
						</LinearGradient> */}
						</Swiper>
					)}
				</View>

				{this.state.data[6].length <= 0 && (
					<TouchableOpacity
						onPress={() => {
							const { navigate } = this.props.navigation;
							if (global.ttype == 'administrator' || global.ttype == 'teacher')
								navigate('eforms', {
									eformsID: 16,
									instanseID: '',
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true'
								});
						}}
						style={{
							marginTop: 10,
							alignItems: 'center',
							borderColor: '#ccc',
							borderRadius: 15,
							borderWidth: 1,
							height: 70,
							borderStyle: 'dashed',
							marginLeft: 15,
							marginRight: 15
						}}
					>
						<Text
							style={{
								marginTop: 25,
								color: 'gray',
								fontFamily: 'iransans'
							}}
						>
							{global.lang == 'fa' ? 'رویدادها' : 'Events'}
						</Text>
					</TouchableOpacity>
				)}

				{this.state.data[6].length > 0 && (
					<View>
						<Text
							style={{
								color: '#1693A5',
								textAlign: global.lang == 'fa' ? 'left' : 'center',
								marginLeft: 16,
								fontFamily: 'iransans'
							}}
						>
							{global.lang == 'fa' ? 'رویدادها' : 'Events'}
						</Text>
						<FlatList
							style={{ height: this.state.data[6].length < 6 ? this.state.data[6].length * 30 : 150 }}
							contentContainerStyle={{
								//flexGrow: 0
							}}
							//extraData={this.state.selectedItem}
							//showsHorizontalScrollIndicator={false}

							renderItem={({ item, index }) => {
								return (
									<View key={index} style={{ marginLeft: 15, marginRight: 15 }}>
										<View style={{ flexDirection: 'row', margin: 3 }}>
											<Text
												style={{
													backgroundColor: 'orange',
													paddingTop: 3,
													paddingLeft: 4,
													paddingRight: 4,
													overflow: 'hidden',
													color: 'white',
													fontFamily: 'iransans',
													borderRadius: 4,
													fontSize: 12
												}}
											>
												{toFarsi(item.date_)}
											</Text>
											<Text
												numberOfLines={1}
												style={{
													backgroundColor: 'white',
													flex: 1,
													//paddingTop: 3,
													paddingLeft: 4,
													paddingRight: 4,
													textAlign: global.lang == 'fa' ? 'left' : 'right',
													paddingTop: 1,
													fontFamily: 'iransans',
													//marginRight: 10,
													marginLeft: 10
												}}
											>
												{item.name}
											</Text>
										</View>
									</View>
								);
							}}
							data={this.state.data[6]}
						/>
						<TouchableOpacity
							onPress={() => {
								const { navigate } = this.props.navigation;

								navigate('cal');
							}}
						>
							{global.lang == 'fa' && (
								<Text
									style={{
										textAlign: 'center',
										color: '#1693A5',
										marginTop: 10,
										marginLeft: 16,
										fontFamily: 'iransans'
									}}
								>
									لیست کامل رویدادها
								</Text>
							)}
						</TouchableOpacity>
					</View>
				)}

				{this.state.data[1].length <= 0 && (
					<TouchableOpacity
						onPress={() => {
							const { navigate } = this.props.navigation;

							//const { navigate } = this.props.navigation;
							//console.log(this.repid + '-' + this.extra);
							if (global.ttype == 'administrator')
								navigate('eforms', {
									eformsID: 15,
									instanseID: '',
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true',
									extra: this.extra
								});

							//navigate('cal');
						}}
						style={{
							marginTop: 10,
							alignItems: 'center',
							borderColor: '#ccc',
							borderRadius: 15,
							borderWidth: 1,
							height: 70,
							borderStyle: 'dashed',
							marginLeft: 15,
							marginRight: 15
						}}
					>
						<Text
							style={{
								marginTop: 25,
								color: 'gray',
								fontFamily: 'iransans'
							}}
						>
							{global.lang == 'fa' ? 'معرفی دانش آموزان و معلمین' : 'Announcement'}
						</Text>
					</TouchableOpacity>
				)}

				{this.state.data[1].length > 0 && <Birthday Items={this.state.data[1]} />}

				<DropdownAlert onTap={() => alert()} ref={(ref) => (this.dropDownAlertRefup = ref)} />
				<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />

				<Snackbar
					visible={this.state.issnack}
					onDismiss={() => this.setState({ issnack: false })}
					style={{ fontFamily: 'iransans' }}
					wrapperStyle={{ fontFamily: 'iransans' }}
					action={{
						label: 'بستن',
						onPress: () => {
							this.setState({ issnack: false });
						}
					}}
				>
					{this.state.msg}
				</Snackbar>

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
			</ScrollView>
		);
	}
}

async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		//	alert('isd');
		const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
		let finalStatus = existingStatus;
		//alert(existingStatus);
		if (existingStatus !== 'granted') {
			//	alert('granted');
			const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			finalStatus = status;
			//alert(status);
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		//alert('before token');

		try {
			//token = await Notifications.getExpoPushTokenAsync();
			token = (await Notifications.getExpoPushTokenAsync()).data;
			//this.expoToken = token;
		} catch (e) {
			//alert(e);
		}
		//console.log(token);
		//	alert(token);
		//this.expoToken=token;
		//this.setState({ expoPushToken: token });
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

const styles = StyleSheet.create({
	wrapper: {
		borderRadius: 0,
		//flex: 1,
		//borderWidth: 1,
		marginTop: 0,
		flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse',
		height: 130,
		paddingBottom: 0
	}
});
export default withNavigation(page1);
