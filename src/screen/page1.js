import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, RefreshControl, Alert, StyleSheet } from 'react-native';
import ActionBarImage from '../components/ActionBarImage';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import { LinearGradient } from 'expo-linear-gradient';
import { withNavigation } from 'react-navigation';
import * as SQLite from 'expo-sqlite';
import Swiper from 'react-native-swiper';

import Loading from '../components/loading';
import DropdownAlert from 'react-native-dropdownalert';

import Database from '../components/database';

import Menu from '../screen/menu';
import GLOBAL from './global';
import Birthday from '../screen/birthday';
import Stories from '../screen/modules/story/stories';
import NetInfo from '@react-native-community/netinfo';

const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

class page1 extends Component {
	constructor(props) {
		super(props);

		this.state = {
			refreshing: false,
			//data: [],
			datamain: [],

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

		this.props.navigation.addListener('willFocus', () => {
			this.loadAPI(1);
			this.loadAPIBadge();
		});
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
				fontFamily: 'iransansbold'
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
		this.setState({ page: 1 });
		this.loadAPI(1);
		this.loadAPIBadge();
	}

	async componentDidMount() {
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
			this.loadAPI(1);
			this.loadAPIBadge();
		}, 1000);
	}

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
		console.log(uurl);
		try {
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

	loadAPI = async (page) => {
		if (global.adress == 'undefined') {
			//this.setState({ refreshing: false });
		}

		/* #region  check internet */
		//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');

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
		console.log(uurl);

		if (global.lang == 'en') {
			this.setState({
				refreshing: false,
				data: [
					[
						{
							id: '1',
							name: '1',
							caption: ' Grades',
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
						{
							id: '9',
							name: '4',
							caption: 'Reports',
							icon: 'dotchart',
							color: '#9b59b6',
							active: '1',
							access: 'teacher,administrator,student',
							idd: '9',
							badge: '0'
						},
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
					[ { name: 'Test', image: 'e7a2eaef-fb1e-45f4-8b46-c2e5e4acccbb.jpg', id: '1' } ],
					[ { ac: '1', msg: 'hi', cancelable: '10' } ]
				]
			});
			return;
		}

		try {
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
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					data: retJson,

					refreshing: false
				});
				//if (false)
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
				console.log('page1 load');
			}
		} catch (e) {
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				isSubmitting: false
			});
			return;
		}
	};
	render() {
		GLOBAL.page1 = this;
		//alert();
		//return <View />;
		if (!this.state.data)
			return (
				<React.Fragment>
					<Loading />
					<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
				</React.Fragment>
			);
		//alert(this.state.data[0].length);
		//console.log(this.state.datamain[0].items);
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
				<Stories ccolor={'#f76d6d'} Items={this.state.data[2]} Navigation={this.props.navigation} />
				{/* )} */}
				<View>{this.state.data[0].length > 0 && <Menu items={this.state.data[0]} />}</View>
				<View>
					<Swiper
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
						<LinearGradient
							colors={[ '#6e80fe', '#a976fb', '#f36af9' ]}
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
						</LinearGradient>
						<LinearGradient
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
						</LinearGradient>
						<LinearGradient
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
						</LinearGradient>
					</Swiper>
				</View>

				{this.state.data[1].length > 0 && <Birthday Items={this.state.data[1]} />}

				<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
			</ScrollView>
		);
	}
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
