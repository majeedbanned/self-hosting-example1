import React, { Component, useState, useEffect, useRef } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import { StyleSheet, TextInput, Alert, Dimensions, Animated, Button } from 'react-native';
import defaultStyles from '../config/styles';
import { Snackbar } from 'react-native-paper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import { WebView } from 'react-native-webview';
import Swiper from 'react-native-swiper';
import * as Permissions from 'expo-permissions';
import { Modal, BackHandler } from 'react-native';
import InputSpinner from 'react-native-input-spinner';
import ImageViewer from 'react-native-image-zoom-viewer';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Recorder1 from '../screen/recorder';
import ProgressCircle from 'react-native-progress-circle';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Input, ButtonGroup, Badge } from 'react-native-elements';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';
//import { Player } from 'react-native-audio-player-recorder-no-linking';
//import { Recorder, Player } from 'react-native-audio-player-recorder-no-linking';

//import Camera from '../components/exam/camera';
import Modalm from 'react-native-modal';

import HTML from 'react-native-render-html';
var Buffer = require('buffer/').Buffer;

import Loading from '../components/loading';

import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Mstyles from '../components/styles';
import { withNavigation } from 'react-navigation';
import CountDown from 'react-native-countdown-component';
import Examitem from '../components/examItem';
import RadioItem from '../components/radioItem';

import { Camera } from 'expo-camera';
import FormButton from '../component/FormButton';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

import { userInfo, toFarsi, encrypt, getHttpAdress, isNet } from '../components/DB';
import {
	FlatList,
	ScrollView,
	Image,
	View,
	Text,
	ActivityIndicator,
	RefreshControl,
	TouchableOpacity
} from 'react-native';
import GLOBAL from './global';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import { I18nManager, AppRegistry } from 'react-native';
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_VARIABLE_CONSTRAINED } from 'expo-av/build/Audio';
import Lightbox from 'react-native-lightbox';
import { Global } from '@jest/types';
import fa from '../translations/fa';
import { red } from 'ansi-colors';
//import { consoleSandbox } from '@sentry/utils';
// I18nManager.allowRTL(true);
// I18nManager.forceRTL(true);

const RECORDING_OPTIONS_PRESET_LOW_QUALITY: RecordingOptions1 = {};

let images = [
	{
		// Simplest usage.
		url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',

		// width: number
		// height: number
		// Optional, if you know the image size, you can set the optimization performance

		// You can pass props to <Image />.
		props: {
			// headers: ...
		}
	},
	{
		url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
		props: {
			// Or you can set source directory.
			url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460'
			//source: require('../background.png')
		}
	}
];

class Exam extends Component {
	constructor(props) {
		super(props);
		this.recording = null;
		this.sound = null;
		this.playStat = 0;
		//this.recordingSettings = JSON.parse(JSON.stringify(Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY));

		(this.page = 1),
			(this.state = {
				loadingTemp: false,
				recDelete: [],
				firstplay: false,
				colsecamera: 'بستن دوربین',
				recIcon: 'microphone',
				recIconColor: '#000',
				recIconDelete: 0,
				counterColor: '#1f9efd',
				tmp: '',
				isplay: true,
				images: [],
				imagesatt: [],
				textInputs: [],
				showcamera: false,
				soundDuration: null,
				isModalVisible: false,
				isModalVisibleatt: false,

				Sindex: 0,
				page: 1,
				value: '',
				elsagh: 0,
				elsaghArr: [],
				userRecording: [],
				soundPosition: null,
				mainProgress: 0,

				isLoading: false,
				data: [],
				fulldata: [],
				answers: [ { id: '125-1', pasokh: '1' }, { id: '125-2', pasokh: '2' } ]
			});
		this.examMode = '';
		this.props.navigation.setParams({ isHeaderShow: true });
		this.examID = '';
		this.uurl = '';
	}

	static navigationOptions1 = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			title: global.examName,
			headerLeft: null,
			headerRight: () => (
				<TouchableOpacity
					style={{ borderRadius: 5, backgroundColor: '#db503d', marginEnd: 10 }}
					onPress={async () => {
						//const { navigation } = this.props;
						//YellowBox.ignoreWarnings([ 'Animated: `useNativeDriver`' ]);
						//this.examID = navigation.getParam('examID');
						this.examMode = navigation.getParam('mode');
						//this.activeStd = navigation.getParam('std');

						//alert(this.examMode);
						// if (this.examMode != 'start') {
						// 	navigation.goBack(null);
						// 	return;
						// }
						if (this.examMode == 'start') {
							Alert.alert(
								' اخطار',
								'آیا مایل به خروج از آزمون هستید؟',
								[
									// {
									// 	text: 'Ask me later',
									// 	onPress: () => console.log('Ask me later pressed')
									// },
									{
										text: 'بله',
										onPress: async () => {
											// alert();
											// try {
											// 	await this.recording.stopAndUnloadAsync();
											// } catch (error) {
											// 	// Do nothing -- we are already unloaded.
											// }

											// try {
											// 	this.sound.stopAsync();
											// } catch (error) {
											// 	// Do nothing -- we are already unloaded.
											// }
											navigation.goBack(null);
										},
										style: 'cancel'
									},
									{
										text: 'خیر',
										onPress: () => console.log('Cancel Pressed'),
										style: 'cancel'
									}
								],
								{ cancelable: false }
							);
						} else {
							// try {
							// 	await this.recording.stopAndUnloadAsync();
							// } catch (error) {
							// 	// Do nothing -- we are already unloaded.
							// }
							// this.sound.stopAsync();
							// try {
							// 	this.sound.stopAsync();
							// } catch (error) {
							// 	// Do nothing -- we are already unloaded.
							// }
							// alert();
							navigation.goBack(null);
						}
					}}
				>
					<Text
						style={{
							color: 'white',

							borderRadius: 3,
							paddingBottom: 3,
							fontSize: 12.2,
							marginEnd: 10,
							marginStart: 10,
							fontFamily: 'iransans'
						}}
					>
						خروج از آزمون
					</Text>
				</TouchableOpacity>
			),
			headerTitleStyle: {
				fontFamily: 'iransans'
			}
		};
	};

	static navigationOptions = ({ navigation, screenProps }) => ({
		headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
		headerTitle: navigation.state.params ? navigation.state.params.headerTitle : null,
		headerLeft: null
	});

	// static navigationOptions = {
	// 	//To set the header image and title for the current Screen
	// 	title: 'پارس آموز',
	// 	//Title
	// 	headerRight: () => null,
	// 	//headerLeft: null,
	// 	//Image in Navigation Bar

	// 	headerTitleStyle: {
	// 		//fontWeight: 'bold'
	// 		fontFamily: 'iransans'
	// 		//color:'red'
	// 	},

	// 	headerTintColor: '#606070'
	// 	//Text Color of Navigation Bar
	// };
	apiPost = async (jsonstr) => {
		/* #region  check internet */
		//alert(isNet());
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.setState({ issnackin: true });
			return;
		}
		// console.log('1');
		// if (!isNet) {
		// 	this.setState({ issnackin: true });
		// 	return;
		// }
		// /* #endregion */
		// console.log('1');

		this.setState({ loading: true, save_loading: true });
		let param = userInfo();
		//global.examID = '26668';
		//global.adress = 'http://192.168.1.12:8080/';
		let uurl =
			global.adress +
			'/pApi.asmx/setExamStd?p=' +
			param +
			'&json=' +
			jsonstr +
			'&formid=' +
			this.examID +
			'&istest=' +
			global.ttype;
		////////console.log(uurl);

		//return;

		try {
			uurl = encrypt(uurl);
			//////console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						save_loading: false
					});
					return;
				}
				//alert(retJson.msg);
				this.setState({
					//fulldata: retJson,
					butcaption: retJson.msg,
					loading: false,
					save_loading: false
				});

				this.setState({ issnack: true, msg: retJson.msg });

				if (retJson.result == 'ok')
					setTimeout(async () => {
						this.props.navigation.goBack(null);
					}, 3000);

				// Alert.alert(
				// 	'ثبت آزمون',
				// 	retJson.msg,
				// 	[
				// 		{
				// 			text: 'تایید',
				// 			onPress: () => this.props.navigation.goBack(null),
				// 			style: 'cancel'
				// 		}
				// 	],
				// 	{ cancelable: false }
				// );
				//alert(retJson[0].id_azmoon);

				// const elementsIndex = this.state.answers.findIndex((element) => element.id == '125-7');
				// let newArray = [ ...this.state.answers ];
				// newArray[elementsIndex] = { ...newArray[elementsIndex], pasokh: '666' };
				// this.setState({
				// 	answers: newArray
				// });

				// console.log(this.state.answers);
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				save_loading: false
			});
			return;
		}
	};

	apiPostTemp = async (jsonstr) => {
		//alert();
		/* #region  check internet */
		//alert(isNet());
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.setState({ issnackin: true });
			return;
		}
		// console.log('1');
		// if (!isNet) {
		//	this.setState({ issnackin: true });
		// 	return;
		// }
		// /* #endregion */
		// console.log('1');

		this.setState({ loadingTemp: true });
		//this.setState({ loading: true, save_loading: true });

		let param = userInfo();
		//return;
		//global.examID = '26668';
		//global.adress = 'http://192.168.1.12:8080/';
		let uurl =
			global.adress +
			'/pApi.asmx/setExamStdTemp?p=' +
			param +
			'&json=' +
			jsonstr +
			'&formid=' +
			this.examID +
			'&istest=' +
			global.ttype;
		////////console.log(uurl);

		//return;

		try {
			//uurl = encrypt(uurl);
			//console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						save_loading: false
					});
					return;
				}
				//alert(retJson.msg);
				this.setState({
					//fulldata: retJson,
					//butcaption: retJson.msg,
					loadingTemp: false
					//save_loading: false
				});

				//this.setState({ issnack: true, msg: retJson.msg });

				// if (retJson.result == 'ok')
				// 	setTimeout(async () => {
				// 		this.props.navigation.goBack(null);
				// 	}, 3000);

				// Alert.alert(
				// 	'ثبت آزمون',
				// 	retJson.msg,
				// 	[
				// 		{
				// 			text: 'تایید',
				// 			onPress: () => this.props.navigation.goBack(null),
				// 			style: 'cancel'
				// 		}
				// 	],
				// 	{ cancelable: false }
				// );
				//alert(retJson[0].id_azmoon);

				// const elementsIndex = this.state.answers.findIndex((element) => element.id == '125-7');
				// let newArray = [ ...this.state.answers ];
				// newArray[elementsIndex] = { ...newArray[elementsIndex], pasokh: '666' };
				// this.setState({
				// 	answers: newArray
				// });

				// console.log(this.state.answers);
			}
		} catch (e) {
			//console.log('err');
			//this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loadingTemp: false
				//save_loading: false
			});
			return;
		}
	};

	apiPostTashih = async (jsonstr) => {
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.setState({ issnackin: true });
			return;
		}
		/* #endregion */

		this.setState({ loading: true, save_loading: true });
		let param = userInfo();
		//global.examID = '26668';
		//global.adress = 'http://192.168.1.12:8080/';
		let uurl =
			global.adress +
			'/pApi.asmx/setExamStdTashih?p=' +
			param +
			'&json=' +
			jsonstr +
			'&formid=' +
			this.examID +
			'&istest=' +
			global.ttype +
			'&std=' +
			this.activeStd;
		////////console.log(uurl);

		//const { navigate } = this.props.navigation;

		// navigate('Exam', {
		// 	examID: 1212,
		// 	examName: 'item.name',
		// 	mode: 'start',
		// 	name: 'item.FirstName ',
		// 	std: 'global.username'
		// });
		//load neweuser
		// this.examID = 1;
		// this.examMode = 'j';
		// this.activeStd = '';
		// this.activeName = 'uihgjh';
		// this.loadAPI(this.page);

		//return;

		try {
			uurl = encrypt(uurl);
			//////console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						save_loading: false
					});

					this.props.navigation.goBack(null);
					return;
				}
				//alert(retJson[0].StudentCode);

				if (retJson[0].StudentCode) {
					//alert();
					this.examID = retJson[0].id_azmoon;
					this.examMode = 'tashih';
					this.activeStd = retJson[0].StudentCode;
					this.activeName = retJson[0].FirstName + retJson[0].LastName;
					this.setState({ Sindex: 0, saveVisible: false, firstplay: false });
					//	console.log('loaf for:' + this.examID + ' & ');
					this.loadAPI(this.page);
				}

				// this.setState({

				// 	butcaption: retJson.msg,
				// 	loading: false,
				// 	save_loading: false
				// });

				//	this.props.navigation.goBack(null);
				// Alert.alert(
				// 	'ثبت آزمون',
				// 	retJson.msg,
				// 	[
				// 		{
				// 			text: 'تایید',
				// 			onPress: () => this.props.navigation.goBack(null),
				// 			style: 'cancel'
				// 		}
				// 	],
				// 	{ cancelable: false }
				// );
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				save_loading: false
			});
			return;
		}
	};
	async componentWillUnmount() {
		try {
			await this.recording.stopAndUnloadAsync();
		} catch (error) {
			// Do nothing -- we are already unloaded.
		}
		try {
			this.state.elsaghArr.filter(async function(item) {
				await FileSystem.deleteAsync(item.moburl);
				//console.log('del del del');
			});
		} catch (error) {
			//alert(); // Do nothing -- we are already unloaded.
		}
		try {
			this.state.recDelete.filter(async function(item) {
				await FileSystem.deleteAsync(item.moburl);
				//console.log('rec del del');
			});
		} catch (error) {
			//alert(); // Do nothing -- we are already unloaded.
		}

		try {
			this.sound.stopAsync();
		} catch (error) {
			// Do nothing -- we are already unloaded.
		}
		//alert();
	}
	async componentDidMount() {
		this.props.navigation.setParams({
			headerTitle: '',
			headerLeft: null,
			headerRight: () => (
				<View style={{ flexDirection: 'row' }}>
					{this.state.loadingTemp == true && <ActivityIndicator size="small" />}
					<TouchableOpacity
						style={{ borderRadius: 5, backgroundColor: '#7ac968', marginEnd: 10 }}
						onPress={async () => {
							this.examMode = navigation.getParam('mode');

							let objJsonB64 = Buffer.from(JSON.stringify(this.state.fulldata)).toString('base64');

							let ret = global.schoolcode + ',' + global.username + ',';
							let newArray = this.state.fulldata.map(function(item) {
								ret += item.id + ',^';
								let sss = item.Soals.map(function(qq) {
									ret +=
										'soal' +
										qq.id_soal +
										'`' +
										qq._pasokh +
										'`' +
										qq._recServer.replace('Uploaded file: ', '') +
										'~';

									return qq;
								});

								return item;
							});

							let attachment = '';
							this.state.elsaghArr.map((item) => {
								attachment += item.serverurl.replace('Uploaded file: ', '') + '`';
							});
							ret += '|' + attachment;

							objJsonB64 = Buffer.from(JSON.stringify(ret)).toString('base64');
							//this.setState({ loadingTemp: true });

							this.apiPostTemp(JSON.stringify(objJsonB64));
							return;
						}}
					>
						<Text
							style={{
								color: 'white',

								borderRadius: 3,
								paddingBottom: 3,
								fontSize: 12.2,
								marginEnd: 10,
								marginStart: 10,
								fontFamily: 'iransans'
							}}
						>
							ذخیره موقت
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{ borderRadius: 5, backgroundColor: '#db503d', marginEnd: 10 }}
						onPress={async () => {
							//alert();
							this.examMode = navigation.getParam('mode');

							if (this.examMode == 'start') {
								Alert.alert(
									' اخطار',
									'آیا مایل به خروج از آزمون هستید؟',
									[
										{
											text: 'بله',
											onPress: async () => {
												navigation.goBack(null);
											},
											style: 'cancel'
										},
										{
											text: 'خیر',
											onPress: () => console.log('Cancel Pressed'),
											style: 'cancel'
										}
									],
									{ cancelable: false }
								);
							} else {
								navigation.goBack(null);
							}
						}}
					>
						<Text
							style={{
								color: 'white',

								borderRadius: 3,
								paddingBottom: 3,
								fontSize: 12.2,
								marginEnd: 10,
								marginStart: 10,
								fontFamily: 'iransans'
							}}
						>
							خروج از آزمون
						</Text>
					</TouchableOpacity>
				</View>
			)
		});

		BackHandler.addEventListener('hardwareBackPress', () => {
			//	alert();
			return true;
		});
		//	BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
		//alert();
		const { navigation } = this.props;
		//LogBox.ignore([ 'Animated: `useNativeDriver`' ]);
		this.examID = navigation.getParam('examID');
		this.examMode = navigation.getParam('mode');
		this.activeStd = navigation.getParam('std');
		this.activeName = navigation.getParam('name');

		//	console.log('loaf for:' + this.examID + ' & ');
		this.loadAPI(this.page);
		await this._askForPermissions();
	}
	loadAPI = async (page) => {
		//alert();
		//if (global.adress == 'undefined') {
		this.setState({ isRecorderVisible: false });
		//}
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.setState({ issnackin: true });
			return;
		}
		/* #endregion */

		this.setState({ loading: true });
		//alert(this.activeStd);
		let param = userInfo(this.activeStd);
		//global.examID = '26668';
		//global.adress = 'http://192.168.1.12:8080/';
		//alert(examID);
		let uurl =
			global.adress + '/pApi.asmx/getExambody?id=' + this.examID + '&p=' + param + '&exammode=' + this.examMode;
		console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false
					});
					//		alert(//)
					return;
				}

				this.setState({
					data: retJson[0].Soals,
					fulldata: retJson,
					elsagh: 0,
					elsaghArr: [],
					imagesatt: [],
					loading: false
				});
				if (this.state.fulldata[0].Soals.length == 0) {
					this.setState(
						{
							//	loading: false
						}
					);
					alert('سوالی برای آزمون تعریف نشده');
				}
				if (this.state.fulldata[0].Soals.length == 1) {
					this.setState({ saveVisible: true });
				}
				//alert(retJson[0].attachments);
				if (this.examMode != 'start')
					for (let i = 0; i < retJson[0].attachments.split('|').length - 1; i++) {
						//alert();
						this.setState((prevState) => ({
							elsagh: this.state.elsagh + 1,

							elsaghArr: [
								...this.state.elsaghArr,
								{
									soalid: 0,
									serverurl: '',
									moburl: getHttpAdress() + 'exams/' + retJson[0].attachments.split('|')[i]
								}
							],

							imagesatt: [
								...this.state.imagesatt,
								{ url: getHttpAdress() + 'exams/' + retJson[0].attachments.split('|')[i], props: {} }
							]
						}));
					}
				//console.log(this.state.elsaghArr);

				this.state.answers.push({ id: '125-7', pasokh: '1' });

				const elementsIndex = this.state.answers.findIndex((element) => element.id == '125-7');
				let newArray = [ ...this.state.answers ];
				newArray[elementsIndex] = { ...newArray[elementsIndex], pasokh: '666' };
				this.setState({
					answers: newArray
				});

				const { soal1, soal2, soal3 } = this.state.fulldata[0];
				//	alert(soal1);
				if (soal1 != '')
					this.setState({
						images: [ ...this.state.images, { url: getHttpAdress() + 'azmoon/' + soal1, props: {} } ]
					});

				if (soal2 != '')
					this.setState({
						images: [ ...this.state.images, { url: getHttpAdress() + 'azmoon/' + soal2, props: {} } ]
					});
				if (soal3 != '')
					this.setState({
						images: [ ...this.state.images, { url: getHttpAdress() + 'azmoon/' + soal3, props: {} } ]
					});

				// if (soal4 != '')
				// 	this.setState({
				// 		images: [ ...this.state.images, { url: getHttpAdress() + 'azmoon/' + soal4, props: {} } ]
				// 	});
				// if (soal5 != '')
				// 	this.setState({
				// 		images: [ ...this.state.images, { url: getHttpAdress() + 'azmoon/' + soal5, props: {} } ]
				// 	});

				//console.log(this.state.images);

				//console.log(this.state.answers);
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

	updateState_img = (id_soal, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.fulldata[0].Soals.findIndex((element) => element.id_soal == id_soal);
		let newArray = [ ...this.state.fulldata ];
		newArray[0].Soals[elementsIndex] = { ...newArray[0].Soals[elementsIndex], _imageuri: value };
		this.setState({
			fulldata: newArray
		});
	};

	updateState_imgBase64 = (id_soal, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.fulldata[0].Soals.findIndex((element) => element.id_soal == id_soal);
		let newArray = [ ...this.state.fulldata ];
		newArray[0].Soals[elementsIndex] = { ...newArray[0].Soals[elementsIndex], _imagebase64: value };
		this.setState({
			fulldata: newArray
		});
	};
	updateState = (id_soal, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.fulldata[0].Soals.findIndex((element) => element.id_soal == id_soal);
		let newArray = [ ...this.state.fulldata ];
		newArray[0].Soals[elementsIndex] = { ...newArray[0].Soals[elementsIndex], _pasokh: value };
		this.setState({
			fulldata: newArray
		});
	};

	updaterecMob = (id_soal, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.fulldata[0].Soals.findIndex((element) => element.id_soal == id_soal);
		let newArray = [ ...this.state.fulldata ];
		newArray[0].Soals[elementsIndex] = { ...newArray[0].Soals[elementsIndex], _recMob: value };
		this.setState({
			fulldata: newArray
		});
	};

	updatereNomre = (id_soal, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.fulldata[0].Soals.findIndex((element) => element.id_soal == id_soal);
		let newArray = [ ...this.state.fulldata ];
		newArray[0].Soals[elementsIndex] = { ...newArray[0].Soals[elementsIndex], nomre: value };
		this.setState({
			fulldata: newArray
		});
	};

	updaterecServer = (id_soal, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.fulldata[0].Soals.findIndex((element) => element.id_soal == id_soal);
		let newArray = [ ...this.state.fulldata ];
		newArray[0].Soals[elementsIndex] = { ...newArray[0].Soals[elementsIndex], _recServer: value };
		this.setState({
			fulldata: newArray
		});
	};
	updaterecDur = (id_soal, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.fulldata[0].Soals.findIndex((element) => element.id_soal == id_soal);
		let newArray = [ ...this.state.fulldata ];
		newArray[0].Soals[elementsIndex] = { ...newArray[0].Soals[elementsIndex], _recDur: value };
		this.setState({
			fulldata: newArray
		});
	};

	updateSoal = (id_soal, _field, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.fulldata[0].Soals.findIndex((element) => element.id_soal == id_soal);
		let newArray = [ ...this.state.fulldata ];
		newArray[0].Soals[elementsIndex] = { ...newArray[0].Soals[elementsIndex], _recMob: value };
		this.setState({
			fulldata: newArray
		});
	};

	dimg(itt) {
		// this.setState({
		// 	show_attach: false
		// });

		let elsaghArr = this.state.elsaghArr.filter(function(item) {
			return item.moburl !== itt.moburl;
		});
		//this.setState({});
		//	this.deleteapi(item.id, index);
	}
	renderHeader = () => {
		return (
			<View style={{ height: 60, backgroundColor: 'white' }}>
				<Text>this is header</Text>
			</View>
		);
	};
	_renderItem = ({ item, index }) => {
		return (
			<View>
				<Text>dfss</Text>
			</View>
		);
	};

	calc_time = (ttimenew, time_pasokh, time_pasokh_sec) => {
		if (ttimenew != '') {
			// time_pasokh = ttimenew.split('.')[0];

			// if (ttimenew.includes('.')) {
			// 	time_pasokh_sec = ttimenew.split('.')[1];
			// }
			return 60 * 0 + 4;
		}
		return 60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec);
		//return 60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec)
	};

	handleUploadTakePhoto = async (url) => {
		//alert(url);
		//console.log(photo.uri);
		let pickerResult = await ImageManipulator.manipulateAsync(url, [ { resize: { width: 768 } } ], {
			compress: 0.5,
			format: 'jpeg',
			base64: true
		});

		// let tmp = await FileSystem.getInfoAsync(url);
		// alert(tmp.exists);
		try {
			//console.log('del:' + url);

			let y = await FileSystem.deleteAsync(url);
		} catch (error) {
			console.log(error);
		}

		// tmp = await FileSystem.getInfoAsync(url);
		// alert(tmp.exists);
		//alert(resizedPhoto.uri);
		//return;
		if (true) {
			//this.ImageUpload1(pickerResult.uri);
			console.log(global.adress.replace('/papi', ':8181/papi') + '' + '' + '/api/upload');
			let url = pickerResult.uri;
			//console.log(url);
			const xhr = new XMLHttpRequest();
			xhr.open('POST', global.adress.replace('/papi', ':8181') + '' + '' + '/api/upload');
			xhr.onload = () => {
				//(xhr.response);

				this.setState((prevState) => ({
					elsagh: this.state.elsagh + 1,
					mainProgress: 0,

					elsaghArr: [
						...this.state.elsaghArr,
						{ soalid: this.state.Sindex, serverurl: xhr.response, moburl: url }
					]
				}));

				//	console.log(this.state.elsaghArr);

				//console.log(this.state.formikDefault.image1);
				// ... do something with the successful response
			};

			xhr.onerror = (e) => {
				console.log(e, 'upload failed');
				this.setState({ mainProgress: 0 });
			};
			// 4. catch for request timeout
			xhr.ontimeout = (e) => {
				this.setState({ mainProgress: 0 });

				console.log(e, 'upload timeout');
			};

			const formData = new FormData();

			formData.append('file', {
				uri: url, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
				type: `image/jpg`, // example: image/jpg
				name: `upload.jpg` // example: upload.jpg
			});
			// 6. upload the request
			xhr.send(formData);
			// this.setState({
			// 	[item.progressvisible]: true
			// });

			this.setState((prevState) => ({
				// formikDefault: {
				// 	...prevState.formikDefault,
				// 	[item.progressvisible]: true
				// }
			}));

			// 7. track upload progress
			if (xhr.upload) {
				// track the upload progress
				xhr.upload.onprogress = ({ total, loaded }) => {
					const uploadProgress = loaded / total;
					// this.setState({
					// 	[item.progress]: uploadProgress
					// });

					this.setState((prevState) => ({
						// formikDefault: {
						// 	...prevState.formikDefault,
						// 	[item.progress]: uploadProgress
						// }
					}));
					this.setState({ mainProgress: uploadProgress });

					//console.log(uploadProgress);
				};
			}
		}
	};

	handleUploadRecord = async (url, id_soal) => {
		if (true) {
			//console.log(global.adress.replace(':8080', '') + '' + ':8181' + '/api/upload');
			//let url = url;
			///console.log('majmaj:' + url);

			const xhr = new XMLHttpRequest();
			//xhr.open('POST', global.adress.replace(':8080', '') + '' + ':8181' + '/api/upload');
			xhr.open('POST', global.adress.replace('/papi', ':8181') + '' + '' + '/api/upload');
			xhr.onload = () => {
				//	console.log(xhr.response);

				this.setState((prevState) => ({
					//elsagh: this.state.elsagh + 1,
					mainProgress: 0
					//updaterecServer()
					// elsaghArr: [
					// 	...this.state.elsaghArr,
					// 	{ soalid: this.state.Sindex, serverurl: xhr.response, moburl: url }
					// ]
				}));
				this.updaterecServer(id_soal, xhr.response);
				//console.log(this.state.elsaghArr);

				//console.log(this.state.formikDefault.image1);
				// ... do something with the successful response
			};

			xhr.onerror = (e) => {
				console.log(e, 'upload failed');
				this.setState({ mainProgress: 0 });
			};
			// 4. catch for request timeout
			xhr.ontimeout = (e) => {
				this.setState({ mainProgress: 0 });

				console.log(e, 'upload timeout');
			};

			const formData = new FormData();

			formData.append('file', {
				uri: url, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
				type: `image/jpg`, // example: image/jpg
				name: `upload.jpg` // example: upload.jpg
			});
			// 6. upload the request
			xhr.send(formData);
			// this.setState({
			// 	[item.progressvisible]: true
			// });

			this.setState((prevState) => ({
				// formikDefault: {
				// 	...prevState.formikDefault,
				// 	[item.progressvisible]: true
				// }
			}));

			// 7. track upload progress
			if (xhr.upload) {
				// track the upload progress
				xhr.upload.onprogress = ({ total, loaded }) => {
					const uploadProgress = loaded / total;
					// this.setState({
					// 	[item.progress]: uploadProgress
					// });

					this.setState((prevState) => ({
						// formikDefault: {
						// 	...prevState.formikDefault,
						// 	[item.progress]: uploadProgress
						// }
					}));
					this.setState({ mainProgress: uploadProgress });

					//console.log(uploadProgress);
				};
			}
		}
	};

	handleUploadGalleryPhoto = async (url) => {
		//alert(url);
		//console.log(photo.uri);
		let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
		//><
		//alert(permissionResult)

		if (permissionResult.granted === false) {
			alert('Permission to access camera roll is required!');
			return;
		}
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,

			allowsMultipleSelection: true
		});
		if (!pickerResult.cancelled) {
			let pickerResultNew = await ImageManipulator.manipulateAsync(
				pickerResult.uri,
				[ { resize: { width: 768 } } ],
				{
					compress: 0.5,
					format: 'jpeg',
					base64: true
				}
			);

			// 	let tmp = await FileSystem.getInfoAsync(pickerResult.uri);
			// alert(tmp.exists);
			try {
				//console.log('del:' + pickerResult.uri);

				await FileSystem.deleteAsync(pickerResult.uri);
				//FileSystem.exi;
				//console.log(y);
			} catch (error) {
				console.log(error);
			}

			// tmp = await FileSystem.getInfoAsync(pickerResult.uri);
			// alert(tmp.exists);

			//this.ImageUpload1(pickerResult.uri);
			//console.log(global.adress.replace('/papi', ':8181/papi') + '' + '' + '/api/upload');
			let url = pickerResultNew.uri;
			//console.log(url);
			const xhr = new XMLHttpRequest();
			//xhr.open('POST', global.adress.replace(':8080', '') + '' + ':8181' + '/api/upload');
			xhr.open('POST', global.adress.replace('/papi', ':8181') + '' + '' + '/api/upload');
			xhr.onload = () => {
				//	console.log(xhr.response);

				this.setState((prevState) => ({
					elsagh: this.state.elsagh + 1,
					mainProgress: 0,
					elsaghArr: [
						...this.state.elsaghArr,
						{ soalid: this.state.Sindex, serverurl: xhr.response, moburl: url }
					]
				}));

				//console.log(this.state.formikDefault.image1);
				// ... do something with the successful response
			};

			xhr.onerror = (e) => {
				this.setState({ mainProgress: 0 });
				console.log(e, 'upload failed');
			};
			// 4. catch for request timeout
			xhr.ontimeout = (e) => {
				this.setState({ mainProgress: 0 });

				console.log(e, 'upload timeout');
			};

			const formData = new FormData();

			formData.append('file', {
				uri: url, // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
				type: `image/jpg`, // example: image/jpg
				name: `upload.jpg` // example: upload.jpg
			});
			// 6. upload the request
			xhr.send(formData);
			// this.setState({
			// 	[item.progressvisible]: true
			// });

			this.setState((prevState) => ({
				// formikDefault: {
				// 	...prevState.formikDefault,
				// 	[item.progressvisible]: true
				// }
			}));

			// 7. track upload progress
			if (xhr.upload) {
				// track the upload progress
				xhr.upload.onprogress = ({ total, loaded }) => {
					const uploadProgress = loaded / total;
					// this.setState({
					// 	[item.progress]: uploadProgress
					// });

					this.setState((prevState) => ({
						// formikDefault: {
						// 	...prevState.formikDefault,
						// 	[item.progress]: uploadProgress
						// }
					}));
					this.setState({ mainProgress: uploadProgress });

					//console.log(uploadProgress);
				};
			}
		}
	};

	// handleTakePhoto = () => {
	// 	if (this.camera) {
	// 		alert('hi');
	// 		//let photo = await this.camera.takePictureAsync(); //{ base64: true };
	// 		// console.log(photo.uri);
	// 	}
	// };
	_askForPermissions = async () => {
		const response = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
		//><
		//alert(response)

		this.setState({
			haveRecordingPermissions: response.status === 'granted'
		});
	};

	myFunction = () => {
		Alert.alert(
			' حذف عکس',
			'آیا مایل به حذف عکس پاسخ آزمون هستید؟',
			[
				{
					text: 'خیر',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},

				{
					text: 'بله',

					onPress: async () => {
						// this.dimg(itt);
						this.setState({ elsagh: 0 });
					}
				}
			],
			{ cancelable: false }
		);
	};
	async startRec() {
		//
		await this._askForPermissions();
		this.setState({
			isLoading: true
		});
		//if (this.sound !== null) {
		if (true) {
			//this.recording.setOnRecordingStatusUpdate(null);
			//this.recording = null;
			try {
				await this.recording.stopAndUnloadAsync();
			} catch (error) {
				// Do nothing -- we are already unloaded.
			}

			try {
				await this.sound.unloadAsync();
			} catch (error) {
				// Do nothing -- we are already unloaded.
			}
			try {
				this.sound.setOnPlaybackStatusUpdate(null);
			} catch (error) {
				// Do nothing -- we are already unloaded.
			}
			try {
				this.sound = null;
			} catch (error) {
				// Do nothing -- we are already unloaded.
			}
			//console.log('kkk');
		}
		//
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: true,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			playThroughEarpieceAndroid: false,
			staysActiveInBackground: true
		});
		//.log('0');
		if (this.recording !== null) {
			//alert(recording);
			this.recording.setOnRecordingStatusUpdate(null);
			this.recording = null;
		}

		const recording = new Audio.Recording();
		///	await recording.prepareToRecordAsync(this.recordingSettings);

		await recording.prepareToRecordAsync({
			android: {
				extension: '.3gp',
				//outputFormat: RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_THREE_GPP,
				//audioEncoder: RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AMR_NB,
				sampleRate: 44100,
				numberOfChannels: 2,
				bitRate: 128000
			},
			ios: {
				extension: '.m4a',
				outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
				audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MEDIUM,
				sampleRate: 44100,
				numberOfChannels: 1,
				bitRate: 96400,
				linearPCMBitDepth: 16,
				linearPCMIsBigEndian: false,
				linearPCMIsFloat: false
			}
		});

		recording.setOnRecordingStatusUpdate(this._updateScreenForRecordingStatus);

		this.recording = recording;
		await this.recording.startAsync(); // Will call this._updateScreenForRecordingStatus to update the screen.
		console.log('start');
		this.setState({
			isLoading: false
		});
	}

	_updateScreenForRecordingStatus = (status) => {
		if (status.canRecord) {
			this.setState({
				recIcon: 'circle',
				recIconColor: 'red',
				recIconDelete: 0,
				isRecording: status.isRecording,
				recordingDuration: status.durationMillis
			});
		} else if (status.isDoneRecording) {
			this.setState({
				recIcon: 'play-circle-o',
				recIconColor: 'black',
				recIconDelete: 1,
				isRecording: false,
				recordingDuration: status.durationMillis
			});
			if (!this.state.isLoading) {
				this._stopRecordingAndEnablePlayback();
			}
		}
	};

	_onRecordPressed = (id_soal) => {
		// if (this.state.recIcon == 'play-circle-o') {
		// 	//alert(this.sound);
		// 	//this.sound.pauseAsync();
		// 	this.sound.setPositionAsync(0);
		// 	this.sound.playAsync();

		// 	return;
		// 	this._onPlayPausePressed();
		// }
		if (this.state.isRecording) {
			this._stopRecordingAndEnablePlayback(id_soal);
		} else {
			this.startRec();
		}
	};
	handleimgclick = (ax) => {
		//console.log(getHttpAdress().replace(':8080', '') + 'azmoon/' + ax);
		this.setState({
			images: [ { url: getHttpAdress() + 'azmoon/' + ax, props: {} } ]
		});

		this.setState({
			//show_pdf: true,
			isModalVisible: true
		});
	};
	_onPlayPausePressed = (url) => {
		console.log(url);
		if (this.state.Sindex == 0 && this.state.firstplay == false) {
			//console.log(this.sound);
			this.changeQuestion(url);
			this.setState({ firstplay: true });
		}
		console.log(this.state.Sindex);
		if (this.playStat == 1) {
			//alert();
			this.changeQuestion(url);
			this.playStat = 0;
			//	this.sound.stopAsync();
		}
		//this.sound.playAsync();
		//return;
		if (this.sound != null) {
			if (this.state.isPlaying) {
				//alert('pauseAsync');
				this.playStat = 0;
				this.sound.pauseAsync();

				// this.setState({
				// 	isPlaying: false
				// });
			} else {
				//alert();
				//this.sound.setPositionAsync(0);
				///	alert('playAsync');
				this.playStat = 0;

				this.sound.playAsync();
				// setInterval(() => {
				// this.playSound('click', this.uurl);
				// }, 200);
				// this.setState({
				// 	isPlaying: true
				// });
			}
		}
	};

	playSound(name, sound) {
		//console.log('Playing ' + name);
		Audio.Sound
			.createAsync(sound, { shouldPlay: true })
			.then((res) => {
				res.sound.setOnPlaybackStatusUpdate((status) => {
					if (!status.didJustFinish) return;
					//	console.log('Unloading ' + name);
					res.sound.unloadAsync().catch(() => {});
				});
			})
			.catch((error) => {});
	}

	async changeQuestionInit(uuri) {
		//alert();
		this.playStat = 1;
		if (this.sound !== null) {
			await this.sound.unloadAsync();
			this.sound.setOnPlaybackStatusUpdate(null);
			this.sound = null;
			this.setState({ isPlaying: false });
		}
		try {
			await this.recording.stopAndUnloadAsync();
		} catch (error) {
			// Do nothing -- we are already unloaded.
		}
	}
	//let soundObject = new Audio.Sound();
	async changeQuestion(uuri) {
		//	alert(uuri);
		//const playbackObject = new Audio.Sound();
		// OR
		//this.sound = null;

		//return;

		//this.sound = null;
		//this.recording = null;
		if (this.sound !== null) {
			await this.sound.unloadAsync();
			this.sound.setOnPlaybackStatusUpdate(null);
			this.sound = null;
		}

		const initialStatus = {
			isLooping: false,
			isMuted: this.state.muted,
			shouldPlay: true,
			volume: this.state.volume,
			rate: this.state.rate,
			shouldCorrectPitch: this.state.shouldCorrectPitch
			// // UNCOMMENT THIS TO TEST THE OLD androidImplementation:
			// androidImplementation: 'MediaPlayer',
		};
		//console.log('seeeeex:' + uuri);
		if (uuri == '') {
			this.sound = null;
		} else {
			if (!uuri.includes('file://')) uuri = getHttpAdress() + 'azmoon/' + uuri;
			//	console.log(uuri);
			//return;
			console.log(uuri);
			const { sound, status } = await Audio.Sound.createAsync(
				{ uri: uuri },
				initialStatus,
				this._updateScreenForSoundStatus
			);
			this.uurl = uuri;
			//	const { sound: playbackObject } = await Audio.Sound.createAsync({ uri: uuri }, { shouldPlay: true });
			this.sound = sound; // playbackObject;
			//	this._updateScreenForSoundStatus;
		}
		//this.sound.playAsync();
		//console.log('changed');
		//	this._getRecordingTimestamp();
		//this.sound.setPositionAsync(0);
		//this.sound.stopAsync();
	}
	async _stopRecordingAndEnablePlayback(id_soal) {
		//	alert(id_soal);
		//	console.log('stop');
		this.setState({
			isLoading: true
		});
		try {
			await this.recording.stopAndUnloadAsync();
		} catch (error) {
			// Do nothing -- we are already unloaded.
		}
		const info = await FileSystem.getInfoAsync(this.recording.getURI());
		const options = { encoding: FileSystem.EncodingType.UTF8 };
		// Read the audio resource from it's local Uri
		// const data = await FileSystem.readAsStringAsync(this.recording.getURI(), {
		// 	encoding: FileSystem.EncodingType.Base64
		// });
		// console.log(data.uri);

		this.setState((prevState) => ({
			recDelete: [ ...this.state.recDelete, { moburl: info.uri } ]
		}));

		this.updaterecMob(id_soal, info.uri);
		this.handleUploadRecord(info.uri, id_soal);
		//this.updateSoal(this.state.Sindex, '_recMob', data.url);
		//this.setState([ ...this.state.userRecording, { idx: this.state.Sindex, _recMob: data.url } ]);
		// let idsx = this.state.Sindex;
		// this.setState({
		// 	userRecording: this.state.userRecording.filter(function(item) {
		// 		return item.idx !== idsx;
		// 	})
		// });

		// this.setState((prevState) => ({
		// 	userRecording: [ ...this.state.userRecording, { idx: this.state.Sindex, _recMob: info.uri } ]
		// }));
		//console.log(this.state.fulldata[0].Soals);
		//console.log(`FILE INFO: ${JSON.stringify(info)}`);
		await Audio.setAudioModeAsync({
			allowsRecordingIOS: false,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
			playsInSilentModeIOS: true,
			playsInSilentLockedModeIOS: true,
			shouldDuckAndroid: true,
			interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
			playThroughEarpieceAndroid: false,
			staysActiveInBackground: true
		});
		const { sound, status } = await this.recording.createNewLoadedSoundAsync(
			{
				isLooping: false,
				isMuted: this.state.muted,
				volume: this.state.volume,
				rate: this.state.rate,
				shouldCorrectPitch: this.state.shouldCorrectPitch
			},
			this._updateScreenForSoundStatus
		);
		this.sound = sound;

		this.updaterecDur(id_soal, this.state.soundDuration);
		//	console.log('dur' + this.state.soundDuration);
		this.setState({
			isLoading: false
		});

		//this.sound.pauseAsync();
		//	this.sound.playAsync();
	}
	_onStopPressed = () => {
		if (this.sound != null) {
			this.sound.stopAsync();
		}
	};

	_updateScreenForSoundStatus = (status) => {
		if (status.isLoaded) {
			this.setState({
				soundDuration: status.durationMillis,
				soundPosition: status.positionMillis,
				shouldPlay: status.shouldPlay,
				isPlaying: status.isPlaying,
				rate: status.rate,
				muted: status.isMuted,
				volume: status.volume,
				shouldCorrectPitch: status.shouldCorrectPitch,
				isPlaybackAllowed: true
			});
			//this.sound.setPositionAsync(0);
		} else {
			this.setState({
				soundDuration: null,
				soundPosition: null,
				isPlaybackAllowed: false
			});
			if (status.error) {
				console.log(`FATAL PLAYER ERROR: ${status.error}`);
			}
		}
	};
	_getMMSSFromMillis(millis) {
		const totalSeconds = millis / 1000;
		const seconds = Math.floor(totalSeconds % 60);
		const minutes = Math.floor(totalSeconds / 60);

		const padWithZero = (number) => {
			const string = number.toString();
			if (number < 10) {
				return '0' + string;
			}
			return string;
		};
		return padWithZero(minutes) + ':' + padWithZero(seconds);
	}

	_getPlaybackTimestamp(miliSec) {
		//console.log(this.state.recordingDuration);
		//console.log(this.state.soundPosition);
		//console.log(this.state.recordingDuration);

		if (this.sound != null && this.state.soundPosition != null && this.state.soundDuration != null) {
			return `${this._getMMSSFromMillis(this.state.soundPosition)} / ${this._getMMSSFromMillis(
				this.state.soundDuration
			)}`;
		}
		return this._getMMSSFromMillis(miliSec);
	}

	_getRecordingTimestamp(rrr) {
		if (this.state.recordingDuration != null) {
			return `${this._getMMSSFromMillis(this.state.recordingDuration)}`;
		}
		return `${this._getMMSSFromMillis(0)}`;
	}

	render() {
		///	const setCameraRef = this.props.setCameraRef;
		GLOBAL.Exam = this;

		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;

		if (this.state.data.length == 0) {
			return <Loading />;
		}
		if (this.state.data.length != 0) {
			const {
				ax,
				ax1,
				ax2,
				ax3,
				ax4,
				noe_soal,
				correct,
				soal,
				g1,
				g2,
				g3,
				g4,
				file1,
				_recMob,
				_recDur,
				nomre,
				barom,
				_pasokh,
				id_soal,
				ttimenew,

				_imageuri
			} = this.state.fulldata[0].Soals[this.state.Sindex];
			if (file1.split('.').pop() == 'mp3') global.activeMp3 = getHttpAdress() + 'azmoon/' + file1;
			if (ax.split('.').pop() == 'mp3') global.activeMp3 = getHttpAdress() + 'azmoon/' + ax;
			const {
				recordvoice,
				them_id,
				imgResponse,
				speed,
				soal1,
				soal2,
				backbutton,
				soal3,
				name,
				direction,
				time_pasokh,
				time_pasokh_sec
			} = this.state.fulldata[0];
			//const [ type, setType ] = useState(Camera.Constants.Type.back);

			return (
				<View style={Mstyles.container}>
					{this.state.showcamera && (
						// <Camera onTakePhoto={this.handleTakePhoto} />

						<Camera
							pictureSize="340"
							style={{
								flex: 1,
								position: 'absolute',
								zIndex: 10,
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								justifyContent: 'center',
								alignItems: 'center'
							}}
							type={Camera.Constants.Type.back}
							ref={(ref) => {
								this.camera = ref;
							}}
							// ref={(ref) => {
							// 	setCameraRef(ref);
							// }}
						>
							<View
								style={{
									flex: 1,
									backgroundColor: 'transparent',
									justifyContent: 'flex-end'
								}}
							>
								<TouchableOpacity
									style={{
										flex: 0.1,
										alignSelf: 'flex-end'
									}}
									onPress={() => {
										this.setState({
											showcamera: false
										});
										// setType(
										// 	type === Camera.Constants.Type.back
										// 		? Camera.Constants.Type.front
										// 		: Camera.Constants.Type.back
										// );
									}}
								>
									<Text style={{ fontSize: 12.2, marginBottom: 10, color: 'white' }}>
										{' '}
										{this.state.colsecamera}{' '}
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={{ alignSelf: 'center' }}
									onPress={async () => {
										if (this.camera) {
											this.setState({ colsecamera: 'لطفا منتظر بمانید' });
											let photo = await this.camera.takePictureAsync(); //{ base64: true };
											this.handleUploadTakePhoto(photo.uri);
											this.setState({ showcamera: false });
											return;
											console.log(photo.uri);
											let resizedPhoto = await ImageManipulator.manipulateAsync(
												photo.uri,
												[ { resize: { width: 768, height: 1024 } } ],
												{ compress: 0, format: 'jpeg', base64: true }
											);

											console.log(resizedPhoto);

											this.updateState_img(id_soal, resizedPhoto.uri);
											this.updateState_imgBase64(id_soal, resizedPhoto.base64);

											this.setState({ showcamera: false });
											// FileSystem.moveAsync({
											// 	from: resizedPhoto.uri,
											// 	to: `${FileSystem.documentDirectory}photos/Photo_${this.state
											// 		.photoId}.jpg`
											// });
											// //this.setState({ photoId: this.state.photoId + 1 });
											// Vibration.vibrate();

											//console.log('photo', photo);
										}
									}}
								>
									<View
										style={{
											borderWidth: 2,
											borderRadius: 45,
											borderColor: 'white',
											height: 50,
											width: 50,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center'
										}}
									>
										<View
											style={{
												borderWidth: 2,
												borderRadius: 45,
												borderColor: 'white',
												height: 40,
												width: 40,
												backgroundColor: 'white'
											}}
										/>
									</View>
								</TouchableOpacity>
							</View>
						</Camera>
					)}

					{true && (
						<View style={Mstyles.container}>
							<View style={styles.header}>
								<View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 2, height: 70 }}>
									<View>
										<Image
											style={[ styles.imageavatar, { margin: 5 } ]}
											source={{ uri: getHttpAdress() + 'child/' + this.activeStd + '.jpg' }}
										/>
									</View>
									<View>
										<Text style={styles.blueText}>
											{'تعداد سئوالات:' + this.state.fulldata[0].Soals.length}
										</Text>
										<Text style={styles.blueText}>{this.activeName}</Text>
									</View>
								</View>
								<View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
									{(this.examMode == 'start' || this.examMode == 'test') &&
									them_id == '1' && (
										<TouchableOpacity
											onPress={async () => {
												Alert.alert(
													'',
													'افزودن عکس',
													[
														{
															text: 'بازکردن دوربین',
															onPress: async () => {
																const {
																	status
																} = await Camera.requestPermissionsAsync();
																//	console.log(status);

																//this.camera.showcamera();
																//return;
																if (status == 'granted')
																	this.setState({
																		showcamera: true
																	});
															},
															style: 'ok'
														},
														{
															text: 'باز کردن گالری',
															onPress: () => {
																this.handleUploadGalleryPhoto();
															},
															style: 'cancel'
														},
														{
															text: 'انصراف',
															onPress: () => {
																//	this.handleUploadGalleryPhoto();
															},
															style: 'cancel'
														}
													],
													{ cancelable: true }
												);
											}}
											style={{
												marginTop: 5,
												marginRight: 5,

												alignItems: 'center'
											}}
										>
											<AntDesign
												color="#aaa"
												name="addfile"
												size={28}
												style={{ alignSelf: 'center' }}
											/>
										</TouchableOpacity>
									)}

									{this.state.elsagh > 0 && (
										<TouchableOpacity
											onPress={() => {
												if (this.examMode == 'start' || this.examMode == 'test')
													this.setState({ show_attach: true });
												else {
													//this.setState((prevState) => ({ images: null }));

													// for (
													// 	let i = 0;
													// 	i < this.state.fulldata[0].attachments.split('|').length - 1;
													// 	i++
													// ) {
													// 	console.log(i);
													// 	this.setState((prevState) => ({
													// 		//elsagh: this.state.elsagh + 1,

													// 		// elsaghArr: [
													// 		// 	//...this.state.elsaghArr,
													// 		// 	{
													// 		// 		soalid: 0,
													// 		// 		serverurl: '',
													// 		// 		moburl:
													// 		// 			getHttpAdress() +
													// 		// 			'exams/' +
													// 		// 			this.state.fulldata[0].attachments.split('|')[i]
													// 		// 	}
													// 		// ],

													// 		images: [
													// 			...this.state.images,
													// 			{
													// 				url:
													// 					getHttpAdress() +
													// 					'exams/' +
													// 					this.state.fulldata[0].attachments.split('|')[
													// 						i
													// 					],
													// 				props: {}
													// 			}
													// 		]
													// 	}));
													//	}
													//console.log(this.state.images);
													setTimeout(async () => {
														this.setState((prevState) => ({
															isModalVisibleatt: true
														}));
													}, 0);
												}
											}}
											style={{
												marginTop: 6,
												alignItems: 'center'
											}}
										>
											<Badge
												value={toFarsi(this.state.elsagh.toString())}
												status="success"
												color="red"
												textStyle={{ fontFamily: 'iransans' }}
												containerStyle={{
													zIndex: 999,
													position: 'absolute',
													top: -4,
													right: -4
												}}
											>
												4
											</Badge>
											{/* <Text style={[ styles.elsaghbadge ]}>{this.state.elsagh}</Text> */}
											<AntDesign
												name="picture"
												size={28}
												color="#aaa"
												style={{ alignSelf: 'center' }}
											/>
										</TouchableOpacity>
									)}
								</View>
								<View style={[ styles.counterPanel, { borderWidth: 0, alignItems: 'center' } ]}>
									{speed != 'speed' &&
									(this.examMode == 'start' || this.examMode == 'test') && (
										// <CountdownCircleTimer
										// 	isPlaying
										// 	size={55}
										// 	strokeWidth={6}
										// 	duration={60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec)}
										// 	colors={[ [ '#004777', 0.4 ], [ '#F7B801', 0.4 ], [ '#A30000', 0.2 ] ]}
										// 	onComplete={() => {
										// 		this.state.Sindex < this.state.data.length - 1 &&
										// 			this.setState({
										// 				counterColor: '#1f9efd',
										// 				Sindex: this.state.Sindex + 1
										// 			});
										// 	}}
										// >
										// 	{({ remainingTime, animatedColor }) => (
										// 		<Animated.Text style={{ fontSize: 11, color: animatedColor }}>
										// 			{Math.floor(remainingTime / 3600) +
										// 				':' +
										// 				Math.floor((remainingTime % 3600) / 60) +
										// 				':' +
										// 				remainingTime % 60}
										// 		</Animated.Text>
										// 	)}
										// </CountdownCircleTimer>
										<CountDown
											until={60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec)}
											size={14}
											onChange={(ss) => {
												ss < 10 &&
													this.setState({
														counterColor: 'red'
													});
											}}
											onFinish={() => {
												// this.state.Sindex < this.state.data.length - 1 &&
												// 	this.setState({
												// 		counterColor: '#1f9efd',
												// 		Sindex: this.state.Sindex + 1
												// 	});
												if (this.examMode == 'start') {
													let objJsonB64 = Buffer.from(
														JSON.stringify(this.state.fulldata)
													).toString('base64');

													let ret = global.schoolcode + ',' + global.username + ',';
													let newArray = this.state.fulldata.map(function(item) {
														ret += item.id + ',^';
														let sss = item.Soals.map(function(qq) {
															ret +=
																'soal' +
																qq.id_soal +
																'`' +
																qq._pasokh +
																'`' +
																qq._recServer.replace('Uploaded file: ', '') +
																'~';

															return qq;
														});

														return item;
													});

													let attachment = '';
													this.state.elsaghArr.map((item) => {
														attachment +=
															item.serverurl.replace('Uploaded file: ', '') + '`';
													});
													ret += '|' + attachment;

													objJsonB64 = Buffer.from(JSON.stringify(ret)).toString('base64');

													this.apiPost(JSON.stringify(objJsonB64));
												}
											}}
											digitStyle={{
												backgroundColor: this.state.counterColor,
												marginTop: 0
											}}
											digitTxtStyle={{ color: 'white' }}
											timeToShow={[ 'S', 'M', 'H' ]}
											timeLabels={{ m: 'دقیقه', s: 'ثانیه', h: 'ساعت' }}
										/>
									)}
									{false &&
									ttimenew == '' &&
									speed == 'speed' && (
										// <CountdownCircleTimer
										// 	isPlaying
										// 	size={55}
										// 	strokeWidth={6}
										// 	duration={60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec)}
										// 	colors={[ [ '#004777', 0.4 ], [ '#F7B801', 0.4 ], [ '#A30000', 0.2 ] ]}
										// 	onComplete={() => {
										// 		this.state.Sindex < this.state.data.length - 1 &&
										// 			this.setState({
										// 				counterColor: '#1f9efd',
										// 				Sindex: this.state.Sindex + 1
										// 			});
										// 	}}
										// >
										// 	{({ remainingTime, animatedColor }) => (
										// 		<Animated.Text style={{ color: animatedColor }}>
										// 			{Math.floor(remainingTime / 3600) +
										// 				':' +
										// 				Math.floor((remainingTime % 3600) / 60) +
										// 				':' +
										// 				remainingTime % 60}
										// 		</Animated.Text>
										// 	)}
										// </CountdownCircleTimer>
										<CountDown
											//id={id_soal.toString()}
											until={60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec)}
											size={14}
											onChange={(ss) => {
												ss < 10 &&
													ss > 1 &&
													this.setState({
														counterColor: 'red'
													});

												//console.log(ss);
											}}
											onFinish={() => {
												//alert();
												this.state.Sindex < this.state.data.length - 1 &&
													this.setState({
														counterColor: '#1f9efd',
														Sindex: this.state.Sindex + 1
													});
											}}
											digitStyle={{
												backgroundColor: this.state.counterColor,
												marginTop: 0
											}}
											digitTxtStyle={{ color: 'white' }}
											timeToShow={[ 'S', 'M', 'H' ]}
											timeLabels={{ m: 'دقیقه', s: 'ثانیه', h: 'ساعت' }}
										/>
									)}
									{speed == 'speed' &&
									(this.examMode == 'start' || this.examMode == 'test') && (
										<CountdownCircleTimer
											isPlaying={this.state.isplay}
											key={id_soal}
											size={55}
											strokeWidth={6}
											//initialRemainingTime={ttimenew}
											duration={
												ttimenew != '' ? (
													60 * ttimenew
												) : (
													60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec)
												)
											}
											style={{ alignSelf: 'center' }}
											colors={[ [ '#32CD32', 0.4 ], [ '#F7B801', 0.4 ], [ '#A30000', 0.2 ] ]}
											onComplete={() => {
												if (this.state.Sindex < this.state.data.length - 1) {
													if (this.state.isRecording) {
														this._stopRecordingAndEnablePlayback(id_soal);
													}

													if (this.state.Sindex < this.state.data.length - 1) {
														this.setState({
															Sindex: this.state.Sindex + 1,
															saveVisible: false
														});
													}

													if (this.state.Sindex == this.state.data.length - 1)
														this.setState({
															saveVisible: true
														});

													//this.changeQuestion(_recMob);
													//this.playStat = 1;
													this.changeQuestionInit();
												} else {
													//this.setState({ isplay: false,id_soal:99999 });
													if (this.examMode == 'start') {
														let objJsonB64 = Buffer.from(
															JSON.stringify(this.state.fulldata)
														).toString('base64');

														let ret = global.schoolcode + ',' + global.username + ',';
														let newArray = this.state.fulldata.map(function(item) {
															ret += item.id + ',^';
															let sss = item.Soals.map(function(qq) {
																ret +=
																	'soal' +
																	qq.id_soal +
																	'`' +
																	qq._pasokh +
																	'`' +
																	qq._recServer.replace('Uploaded file: ', '') +
																	'~';

																return qq;
															});

															return item;
														});

														let attachment = '';
														this.state.elsaghArr.map((item) => {
															attachment +=
																item.serverurl.replace('Uploaded file: ', '') + '`';
														});
														ret += '|' + attachment;

														objJsonB64 = Buffer.from(JSON.stringify(ret)).toString(
															'base64'
														);

														this.apiPost(JSON.stringify(objJsonB64));
													}
													//return;
												}

												// do your stuff here
												return [ true, 1500, 2000 ]; // repeat animation in 1.5 seconds
											}}
										>
											{/* Math.floor(remainingTime / 3600) +
														':' + */}
											{({ remainingTime, animatedColor }) => (
												<Animated.Text
													style={{
														color: animatedColor,
														fontSize: 12.2,
														fontWeight: 'bold',
														fontFamily: 'iransans'
													}}
												>
													{toFarsi(
														Math.floor((remainingTime % 3600) / 60) +
															':' +
															remainingTime % 60
													)}
												</Animated.Text>
											)}
										</CountdownCircleTimer>
										// <CountDown
										// 	key={id_soal}
										// 	until={60 * (id_soal == 170066 ? 0.2 : 1)}
										// 	size={14}
										// 	onChange={(ss) => {
										// 		ss < 10 &&
										// 			ss > 1 &&
										// 			this.setState({
										// 				counterColor: 'red'
										// 			});
										// 	}}
										// 	onFinish={() => {
										// 		this.state.Sindex < this.state.data.length - 1 &&
										// 			this.setState({
										// 				counterColor: '#1f9efd',
										// 				Sindex: this.state.Sindex + 1
										// 			});
										// 	}}
										// 	digitStyle={{ backgroundColor: this.state.counterColor, marginTop: 0 }}
										// 	digitTxtStyle={{ color: 'white' }}
										// 	timeToShow={[ 'S', 'M', 'H' ]}
										// 	timeLabels={{ m: 'دقیقه11', s: 'ثانیه', h: 'ساعت' }}
										// />
									)}
									{(this.examMode == 'start' || this.examMode == 'test') && (
										<Text style={styles.counterText}>
											{speed == 'speed' ? 'زمان پاسخ به این سئوال' : 'زمان پاسخ به کل سئوالات'}
										</Text>
									)}

									{noe_soal == '2' &&
									this.examMode == 'tashih' && (
										<InputSpinner
											//key={id}
											// buttonStyle={{
											// 	//display: this.examMode != 'tashih' ? '' : ''
											// 	//visible: false
											// }}
											max={barom}
											min={0}
											step={0.25}
											style={{ marginTop: 5 }}
											rounded={false}
											containerStyle={{ height: 100 }}
											type="float"
											colorMax={'#f04048'}
											colorMin={'#40c5f4'}
											value={nomre}
											width={120}
											height={32}
											onChange={(num) => {
												this.updatereNomre(id_soal, num);
												//console.log(num);
											}}
										/>
									)}
									{noe_soal == '2' && (
										<Text style={{ fontFamily: 'iransans', textAlign: 'center' }}>
											نمره تشریحی:+{nomre}
										</Text>
									)}
								</View>
							</View>

							<View style={styles.soalbody}>
								<View style={{ flexDirection: 'row' }}>
									<View style={{ flexDirection: 'row', flex: 3 }}>
										<View style={[ styles.soalnumber, { flexDirection: 'row' } ]}>
											<Text style={styles.soalnumtext}>
												{toFarsi('سئوال شماره   ' + (this.state.Sindex + 1))}
											</Text>
										</View>
										<View style={[ styles.soalnumber1, { flexDirection: 'row' } ]}>
											<Text style={[ styles.soalnumtext ]}>{toFarsi('بارم:' + barom)}</Text>
										</View>
									</View>
									<View style={{ flexDirection: 'row', flex: 1 }}>
										{this.state.mainProgress > 0 && (
											<ProgressCircle
												outerCircleStyle={{
													marginLeft: 10,
													marginTop: 5,
													overflow: 'hidden',
													borderTopLeftRadius: 20,
													borderTopRightRadius: 20,
													borderBottomRightRadius: 20,
													borderBottomLeftRadius: 20
												}}
												percent={this.state.mainProgress * 100}
												radius={12}
												borderWidth={3}
												color="#3399FF"
												shadowColor="#999"
												bgColor="#fff"
											/>
										)}
									</View>
									{/* {this.state.elsagh > 0 && (
										<View style={[ styles.soalnumber1, { flexDirection: 'row' } ]}>
											<TouchableOpacity
												onPress={() => {
													this.setState({ show_attach: true });
												}}
											>
												<Text style={[ styles.soalnumtext ]}>
													{toFarsi('‍پیوست:' + this.state.elsagh)}
												</Text>
											</TouchableOpacity>
										</View>
									)} */}
									<View
										style={{
											flexDirection: 'row',
											flex: 2,

											justifyContent: 'flex-end'
										}}
									>
										{_recMob == '' &&
										(this.examMode == 'start' || this.examMode == 'test') &&
										recordvoice == 'True' && (
											<View
												style={{
													flexDirection: 'row'
												}}
											>
												{this.state.isRecording && (
													<Text style={{ marginTop: 10, marginRight: 5 }}>
														{this._getRecordingTimestamp(_recDur)}
													</Text>
												)}

												<TouchableOpacity
													onPress={() => this._onRecordPressed(id_soal)}
													style={{
														marginTop: 6,
														alignItems: 'center'
													}}
												>
													<FontAwesome
														name="microphone"
														size={28}
														color={this.state.recIconColor}
														style={{ alignSelf: 'center', marginRight: 5 }}
													/>
												</TouchableOpacity>
											</View>
										)}

										{_recMob != '' && (
											<View style={{ flexDirection: 'column' }}>
												<View style={{ flexDirection: 'row' }}>
													<TouchableOpacity
														onPress={() => this._onPlayPausePressed(_recMob)}
														//onPress={() => this.playbackRecorderVoice(_recMob)}
														style={{
															marginTop: 6,

															//width: '100%',
															//height: 110,
															alignItems: 'center'
														}}
													>
														<FontAwesome
															name={!this.state.isPlaying ? 'play' : 'pause'}
															size={21}
															color="black"
															style={{
																alignSelf: 'center',
																marginRight: 20,
																marginTop: 0
															}}
														/>
													</TouchableOpacity>

													<TouchableOpacity
														onPress={this._onStopPressed}
														//onPress={() => this.playbackRecorderVoice(_recMob)}
														style={{
															marginTop: 6,

															//width: '100%',
															//height: 110,
															alignItems: 'center'
														}}
													>
														<FontAwesome
															name="stop"
															size={20}
															color="black"
															style={{
																alignSelf: 'center',
																marginRight: 5,
																marginTop: 0
															}}
														/>
													</TouchableOpacity>

													{true && (
														<TouchableOpacity
															onPress={() => {
																if (
																	this.examMode == 'start' ||
																	this.examMode == 'test'
																) {
																	this.changeQuestionInit();
																	this.updaterecMob(id_soal, '');
																	this.setState(
																		{
																			// recIcon: 'microphone',
																			// recIconColor: '#000',
																			// recIconDelete: 0
																		}
																	);
																}
															}}
															style={{
																marginTop: 3,

																//width: '100%',
																//height: 110,
																alignItems: 'center'
															}}
														>
															<FontAwesome
																name="trash-o"
																size={25}
																color="red"
																style={{
																	alignSelf: 'center',
																	marginLeft: 10,
																	marginRight: 5
																}}
															/>
														</TouchableOpacity>
													)}
												</View>
												<Text style={{ marginEnd: 4 }}>
													{this._getPlaybackTimestamp(_recDur)}
												</Text>
											</View>
										)}
									</View>
								</View>

								<ScrollView contentContainerStyle={{ flexGrow: 1 }} styles={{ color: 'white' }}>
									<View
										style={[
											styles.soalttext,
											{
												//	borderWidth: 1,
												alignItems:
													direction == 'rtl' || direction == '' ? 'flex-start' : 'flex-end'
											}
										]}
									>
										{(direction == 'rtl' || direction == '') &&
										speed != 'pdf' && (
											<ScrollView>
												<HTML
													key={id_soal}
													imagesMaxWidth={Dimensions.get('window').width}
													html={
														'<span style="border-width:0;;color:#1f9efd;text-align:left;direction:rtl;font-family:iransans;font-size:14;line-height:35px" >' +
														soal +
														'</span>'
													}
												/>
											</ScrollView>
										)}
										{direction == 'ltr' &&
										speed != 'pdf' && (
											<ScrollView>
												<HTML
													html={
														'<span style="border-width:0;;color:#1f9efd;text-align:left;direction:ltr;font-family:iransans;font-size:15;line-height:35px" >' +
														soal +
														'</span>'
													}
												/>
											</ScrollView>
										)}

										{ax != '' &&
											(ax.split('.').pop() == 'jpg' && (
												<View style={styles.p1}>
													{/* key={Math.floor(Math.random() * 100)} */}
													<TouchableOpacity
														//style={styles.soalimg}
														style={{
															borderRadius: 15,
															width: '100%',
															paddingBottom: 5,
															paddingTop: 5,
															borderWidth: 0,
															alignSelf: 'center'
														}}
														onPress={() => {
															this.handleimgclick(ax);
														}}
													>
														{/* <Lightbox
															useNativeDriver={true}
															underlayColor="#fff"
															style={styles.lightbox1}
															backgroundColor="#001"
														> */}
														<Image
															style={[
																styles.contain,
																{
																	paddingTop: 5,
																	flex: 1,
																	//borderRadius: 15,
																	borderWidth: 0,
																	//borderColor: '#ccc',
																	shadowOffset: {
																		width: 1,
																		height: 2
																	},
																	width: '100%',
																	shadowOpacity: 0.57,
																	shadowRadius: 2.49
																	//	elevation: 3
																}
															]}
															resizeMode="contain"
															source={{ uri: getHttpAdress() + 'azmoon/' + ax + '' }}
														/>
														{/* //</Lightbox> */}
													</TouchableOpacity>
												</View>
											))}
										{/* file1 != '' && */}
										{(file1.split('.').pop() == 'mp3' || ax.split('.').pop() == 'mp3') && (
											// key={Math.floor(Math.random() * 100)}
											<View style={styles.p1}>
												<TouchableOpacity
													onPress={() => {
														GLOBAL.main.setState({
															isAudioVisible: true
														});
													}}
													style={{
														margin: 5,
														width: '100%',
														height: 110,
														alignItems: 'center'
													}}
												>
													<AntDesign name="playcircleo" size={57} style={styles.massage} />
												</TouchableOpacity>
											</View>
										)}
										{imgResponse == 'True' && (
											<View style={styles.p2}>
												<View>
													<FormButton
														onPress={() => {
															{
																this.setState({
																	showcamera: true
																});
															}
														}}
														buttonColor="white"
														borderColor="white"
														fontSizeb={12.2}
														heightb={40}
														borderRadiusb={10}
														style={{ marginTop: 0 }}
														backgroundColor="#1f9efd"
														buttonType="outline"
														loading={this.state.isSubmitting}
														title="ارسال پاسخ تصویری"
													/>
												</View>
												<View>
													{true &&
														(_imageuri != '' && (
															<View
																style={{
																	width: '100%',
																	alignItems: 'center'
																}}
															>
																<TouchableOpacity
																	key={Math.floor(Math.random() * 100)}
																	style={{
																		margin: 5,
																		width: 200,
																		height: 110
																	}}
																	onPress={() => {
																		this.handleimgclick(ax);
																	}}
																>
																	{/* <Lightbox
																		useNativeDriver={true}
																		underlayColor="#fff"
																		style={styles.lightbox1}
																		backgroundColor="#001"
																	> */}
																	<Image
																		borderRadius={15}
																		source={{ uri: _imageuri }}
																		style={{
																			width: '100%',
																			height: '100%'
																		}}
																		resizeMode="contain"
																	/>
																	{/* </Lightbox> */}
																</TouchableOpacity>
															</View>
														))}
												</View>
											</View>
										)}
									</View>
									<View>
										{noe_soal == '2' && (
											<View style={styles.gozine}>
												{/* <TextInput
													multiline={true}
													style={{ height: 100, borderRadius: 15 }}
													underlineColorAndroid="transparent"
													placeholder=""
													placeholderTextColor="#9a73ef"
													autoCapitalize="none"
													onChangeText={(value) => {
														this.updateState(id_soal, value);
													}}
													value={_pasokh}
												/> */}

												<Input
													multiline={true}
													numberOfLines={4}
													autoCorrect={false}
													//keyboardType={item.keyboardType}
													value={_pasokh}
													onChangeText={(value) => {
														this.updateState(id_soal, value);
													}}
													leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
													labelStyle={defaultStyles.labelStyle}
													inputContainerStyle={[
														defaultStyles.inputc,
														defaultStyles.shadow,
														{
															height: 190,
															borderRadius: 15,
															borderWidth: 1,
															backgroundColor: '#f5f5f5'
														}
													]}
													inputStyle={[
														defaultStyles.inputStyle,

														{
															padding: 10,
															textAlign: 'right',
															height: 190,

															direction:
																direction != '' && direction != undefined
																	? direction
																	: 'ltr',
															textAlign: direction == 'rtl' ? 'right' : 'left'
														}
													]}
													//label={item.caption}
													//placeholder={item.placeholder}
													//errorStyle={defaultStyles.err}
													//errorMessage={errors[item.id]}
													containerStyle={{ borderWidth: 0 }}
												/>
											</View>
										)}
										{noe_soal == '1' && (
											<RadioButton.Group
												onValueChange={(value) => {
													this.updateState(id_soal, value);
												}}
												value={_pasokh}
											>
												<RadioItem
													onimgclick={() => this.handleimgclick(ax1)}
													Speed={speed}
													value="1"
													html={g1}
													direction={direction}
													axg={ax1}
													border={
														(this.examMode == 'pasokhname' ||
															this.examMode == 'tashih' ||
															this.examMode == 'test') &&
														correct == '1' ? (
															1
														) : (
															0
														)
													}
													enabled={this.examMode}
												/>
												<RadioItem
													onimgclick={() => this.handleimgclick(ax2)}
													Speed={speed}
													border={
														(this.examMode == 'pasokhname' ||
															this.examMode == 'tashih' ||
															this.examMode == 'test') &&
														correct == '2' ? (
															1
														) : (
															0
														)
													}
													value="2"
													html={g2}
													direction={direction}
													axg={ax2}
													enabled={this.examMode}
												/>
												<RadioItem
													onimgclick={() => this.handleimgclick(ax3)}
													Speed={speed}
													border={
														(this.examMode == 'pasokhname' ||
															this.examMode == 'tashih' ||
															this.examMode == 'test') &&
														correct == '3' ? (
															1
														) : (
															0
														)
													}
													value="3"
													html={g3}
													direction={direction}
													axg={ax3}
													enabled={this.examMode}
												/>
												<RadioItem
													onimgclick={() => this.handleimgclick(ax4)}
													Speed={speed}
													border={
														(this.examMode == 'pasokhname' ||
															this.examMode == 'tashih' ||
															this.examMode == 'test') &&
														correct == '4' ? (
															1
														) : (
															0
														)
													}
													value="4"
													html={g4}
													direction={direction}
													axg={ax4}
													enabled={this.examMode}
												/>
											</RadioButton.Group>
										)}
									</View>
								</ScrollView>
							</View>
							<View style={styles.footer}>
								{/* speed != 'pdf' && */}
								<View style={{ alignItems: 'center', flex: 1, backgroundColor: 'white', height: 50 }}>
									{this.state.saveVisible &&
									this.examMode == 'start' && (
										<FormButton
											icon={<Icon1 name="save" size={15} color="#1f9efd" />}
											iconLeft
											onPress={() => {
												Alert.alert(
													'ذخیره آزمون',
													'آیا مایل به ذخیره آزمون هستید؟',
													[
														{
															text: 'خیر',
															onPress: () => console.log('Cancel Pressed'),
															style: 'cancel'
														},
														{
															text: 'بله',
															onPress: () => {
																let objJsonB64 = Buffer.from(
																	JSON.stringify(this.state.fulldata)
																).toString('base64');

																// let newArray = this.state.fulldata[0].Soals.map(
																// 	function(item) {
																// 		delete item.soal;
																// 		delete item.g1;
																// 		delete item.g2;
																// 		delete item.g3;
																// 		delete item.g4;

																// 		return item;
																// 	}
																// );
																let ret =
																	global.schoolcode + ',' + global.username + ',';
																let newArray = this.state.fulldata.map(function(item) {
																	ret += item.id + ',^';
																	let sss = item.Soals.map(function(qq) {
																		ret +=
																			'soal' +
																			qq.id_soal +
																			'`' +
																			qq._pasokh +
																			'`' +
																			qq._recServer.replace(
																				'Uploaded file: ',
																				''
																			) +
																			'~';
																		// delete qq.soal;
																		// delete qq.g1;
																		// delete qq.g2;
																		// delete qq.g3;
																		// delete qq.g4;
																		// //delete qq.ax;
																		// delete qq.ax1;
																		// delete qq.ax2;
																		// delete qq.ax3;
																		// delete qq.ax4;

																		return qq;
																	});

																	return item;
																});

																let attachment = '';
																this.state.elsaghArr.map((item) => {
																	attachment +=
																		item.serverurl.replace('Uploaded file: ', '') +
																		'`';
																});
																ret += '|' + attachment;

																objJsonB64 = Buffer.from(JSON.stringify(ret)).toString(
																	'base64'
																);

																//console.log(ret);
																//console.log('-----');
																//console.log(objJsonB64);

																this.apiPost(JSON.stringify(objJsonB64));
																return;
																//let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');
																console
																	.log
																	//JSON.parse(JSON.stringify(this.state.fulldata))
																	();
																const xhr = new XMLHttpRequest();
																xhr.open('POST', global.upadress + '/api/upload');
																xhr.onload = () => {
																	console.log(xhr.response);
																};
																xhr.onerror = (e) => {
																	console.log(e, 'upload failed');
																};
																// 4. catch for request timeout
																xhr.ontimeout = (e) => {
																	console.log(e, 'upload timeout');
																};

																const formData = new FormData();
																formData.append(
																	'data',
																	JSON.stringify(this.state.fulldata)
																);
																formData.append('file', {
																	uri: '', // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
																	type: `image/jpg`, // example: image/jpg
																	name: `upload.jpg` // example: upload.jpg
																});
																// 6. upload the request
																xhr.send(formData);
																if (xhr.upload) {
																	// track the upload progress
																	xhr.upload.onprogress = ({ total, loaded }) => {
																		const uploadProgress = loaded / total;
																		// this.setState({
																		// 	[item.progress]: uploadProgress
																		// });

																		// this.setState((prevState) => ({
																		// 	formikDefault: {
																		// 		...prevState.formikDefault,
																		// 		[item.progress]: uploadProgress
																		// 	}
																		// }));
																		console.log(
																			uploadProgress
																			//this.state.formikDefault[item.progress]
																		);
																	};
																}
																//JSON.stringify(this.state.fulldata));
																//	this.deleteapi(item.id, index);
															}
														}
													],
													{ cancelable: false }
												);
											}}
											buttonColor="white"
											borderColor="white"
											fontSizeb={12.2}
											heightb={40}
											borderRadiusb={10}
											widthb={180}
											style={{ marginTop: 4 }}
											backgroundColor="#51e077"
											buttonType="outline"
											loading={this.state.save_loading}
											title=" ذخیره آزمون"
										/>
									)}

									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											flex: 1,
											backgroundColor: 'white',
											height: 50
										}}
									>
										{true &&
										this.examMode == 'tashih' && (
											<FormButton
												//	icon={<Icon1 name="save" size={15} color="#1f9efd" />}
												//	iconLeft
												onPress={() => {
													Alert.alert(
														'ذخیره تصحیح',
														'آیا مایل به ذخیره تصحیح آزمون هستید؟',
														[
															{
																text: 'خیر',
																onPress: () => console.log('Cancel Pressed'),
																style: 'cancel'
															},
															{
																text: 'بله',
																onPress: () => {
																	//	this.deleteapi(item.id, index);

																	let ret =
																		global.schoolcode + ',' + global.username + ',';
																	let newArray = this.state.fulldata.map(function(
																		item
																	) {
																		ret += item.id + ',^';
																		let sss = item.Soals.map(function(qq) {
																			if (qq.noe_soal == '2')
																				ret +=
																					'soal' +
																					qq.id_soal +
																					'`' +
																					qq.nomre +
																					'`' +
																					qq.id_dit +
																					'~';
																			// delete qq.soal;
																			// delete qq.g1;
																			// delete qq.g2;
																			// delete qq.g3;
																			// delete qq.g4;
																			// //delete qq.ax;
																			// delete qq.ax1;
																			// delete qq.ax2;
																			// delete qq.ax3;
																			// delete qq.ax4;
																		});

																		return item;
																	});

																	//	alert(ret);

																	let objJsonB64 = Buffer.from(
																		JSON.stringify(ret)
																	).toString('base64');

																	this.apiPostTashih(JSON.stringify(objJsonB64));
																	//return;
																}
															}
														],
														{ cancelable: false }
													);
												}}
												buttonColor="white"
												borderColor="white"
												fontSizeb={12.2}
												heightb={40}
												borderRadiusb={10}
												//widthb={180}
												style={{ marginTop: 4 }}
												backgroundColor="#51e077"
												buttonType="outline"
												loading={this.state.isSubmitting}
												title=" ذخیره تصحیح"
											/>
										)}

										{!this.state.saveVisible && (
											<FormButton
												icon={<Icon1 name="arrow-right" size={15} color="#1f9efd" />}
												iconLeft
												onPress={() => {
													{
														if (speed == 'speed' && this.examMode == 'start') {
															//if (false) {
															//alert();
															Alert.alert(
																'',
																'آیا سئوال بعد نمایش داده شود',
																[
																	{
																		text: 'خیر',
																		onPress: () => {},
																		style: 'cancel'
																	},
																	{
																		text: 'بله',
																		onPress: () => {
																			if (this.state.isRecording) {
																				this._stopRecordingAndEnablePlayback(
																					id_soal
																				);
																			}

																			if (
																				this.state.Sindex <
																				this.state.data.length - 1
																			) {
																				this.setState({
																					Sindex: this.state.Sindex + 1,
																					saveVisible: false
																				});
																			}

																			if (
																				this.state.Sindex ==
																				this.state.data.length - 1
																			)
																				this.setState({
																					saveVisible: true
																				});

																			//this.changeQuestion(_recMob);
																			//this.playStat = 1;
																			this.changeQuestionInit();
																		}
																	}
																],
																{ cancelable: false }
															);
														} else {
															if (this.state.isRecording) {
																this._stopRecordingAndEnablePlayback(id_soal);
															}

															if (this.state.Sindex < this.state.data.length - 1) {
																this.setState({
																	Sindex: this.state.Sindex + 1,
																	saveVisible: false
																});
															}

															if (this.state.Sindex == this.state.data.length - 2)
																this.setState({
																	saveVisible: true
																});
															//this.changeQuestion(_recMob);

															this.changeQuestionInit();
														}
													}
												}}
												buttonColor="#1f9efd"
												borderColor="white"
												fontSizeb={12.2}
												heightb={40}
												borderRadiusb={10}
												//widthb={180}
												style={{ marginTop: 4 }}
												backgroundColor="#e3f1fc"
												buttonType="outline"
												loading={this.state.isSubmitting}
												title="سئوال بعد"
											/>
										)}
									</View>
									{/* {false &&
									this.examMode == 'start' && (
										<FormButton
											icon={<Icon1 name="save" size={15} color="#1f9efd" />}
											iconLeft
											onPress={() => {
												Alert.alert(
													'ذخیره آزمون',
													'آیا مایل به ذخیره آزمون هستید؟',
													[
														{
															text: 'خیر',
															onPress: () => console.log('Cancel Pressed'),
															style: 'cancel'
														},
														{
															text: 'بله',
															onPress: () => {
																//	this.deleteapi(item.id, index);
															}
														}
													],
													{ cancelable: false }
												);
											}}
											buttonColor="white"
											borderColor="white"
											fontSizeb={14}
											heightb={40}
											borderRadiusb={10}
											widthb={180}
											style={{ marginTop: 0 }}
											backgroundColor="#51e077"
											buttonType="outline"
											loading={this.state.isSubmitting}
											title=" ذخیره   آزمون"
										/>
									)} */}
								</View>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										flex: 1,
										backgroundColor: 'white',
										height: 50
									}}
								>
									{((speed != 'speed' && backbutton == 'True') ||
										(speed == 'speed' && this.examMode == 'test') ||
										this.examMode == 'tashih') && (
										<FormButton
											onPress={() => {
												{
													if (this.state.isRecording) {
														this._stopRecordingAndEnablePlayback(id_soal);
													}

													this.state.Sindex > 0 &&
														this.setState({
															Sindex: this.state.Sindex - 1,
															saveVisible: false
														});
													//this.changeQuestion(_recMob);

													this.changeQuestionInit();
												}
											}}
											icon={<Icon1 name="arrow-left" size={15} color="#1f9efd" />}
											iconRight
											buttonColor="#1f9efd"
											borderColor="white"
											fontSizeb={12.2}
											heightb={40}
											//widthb={180}
											borderRadiusb={10}
											style={{ marginTop: 0 }}
											backgroundColor="#e3f1fc"
											buttonType="outline"
											loading={this.state.isSubmitting}
											title="سئوال قبلی"
										/>
									)}

									{speed == 'pdf' && (
										<FormButton
											onPress={() => {
												//	console.log(getHttpAdress() + 'azmoon/' + soal1);
												this.setState({
													//show_pdf: true,
													isModalVisible: true
												});
											}}
											// icon={<Icon1 name="list-ol" size={15} color="#1f9efd" />}
											iconRight
											buttonColor="#1f9efd"
											borderColor="white"
											backgroundColor="#e3f1fc"
											fontSizeb={12.2}
											heightb={40}
											//widthb={180}
											borderRadiusb={10}
											style={{ marginTop: 0 }}
											buttonType="outline"
											loading={this.state.isSubmitting}
											title="نمایش سئوالات "
										/>
									)}
								</View>
							</View>
						</View>
					)}

					<Modalm
						animationInTiming={0.1}
						animationOutTiming={0.1}
						backdropTransitionInTiming={0.1}
						backdropTransitionOutTiming={0.1}
						useNativeDriver={true}
						animationIn="fadeIn"
						animationOut="swing"
						transparent={true}
						style={{ borderRadius: 25 }}
						hideModalContentWhileAnimating={true}
						deviceWidth={deviceWidth}
						deviceHeight={deviceHeight}
						//	swipeDirection={[ 'left' ]}
						onBackdropPress={() =>
							this.setState({
								show_pdf: false
							})}
						onSwipeComplete={() =>
							this.setState({
								show_pdf: false
							})}
						deviceWidth={deviceWidth}
						deviceHeight={deviceHeight}
						isVisible={this.state.show_pdf}
					>
						<View style={{ flex: 1 }}>
							{soal1.split('.')[1] == 'pdf'.toLowerCase() && (
								<WebView
									source={{ uri: getHttpAdress().replace(':8080', '') + '/azmoon/' + soal1 }}
									style={{ marginTop: 0 }}
								/>
							)}

							{soal1.split('.')[1] == 'jpg'.toLowerCase() && (
								<Swiper
									onIndexChanged={(index) => {
										//console.log(item.imgs.split('|')[index]);
									}}
									paginationStyle={{
										flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse'
									}}
									loop={false}
									style={styles.wrapper}
									showsButtons={false}
								>
									{soal1 != '' && (
										<Image
											//resizeMode="center"
											source={{ uri: getHttpAdress().replace(':8080', '') + 'azmoon/' + soal1 }}
											style={{ marginTop: 10, flex: 1 }}
										/>
									)}

									{soal2 != '' && (
										<Image
											//resizeMode="center"
											source={{ uri: getHttpAdress().replace(':8080', '') + 'azmoon/' + soal2 }}
											style={{ marginTop: 10, flex: 1 }}
										/>
									)}

									{soal3 != '' && (
										<Image
											//resizeMode="center"
											source={{ uri: getHttpAdress().replace(':8080', '') + 'azmoon/' + soal3 }}
											style={{ marginTop: 10, flex: 1 }}
										/>
									)}
								</Swiper>

								// <ScrollView contentContainerStyle={{ flex: 1 }}>
								// 	<View
								// 		style={{
								// 			flexDirection: 'column',
								// 			height: '100%',
								// 			flex: 1
								// 		}}
								// 	>

								// 		<Image
								// 			source={{ uri: getHttpAdress().replace(':8080', '') + 'azmoon/' + soal1 }}
								// 			style={{ marginTop: 10, flex: 1 }}
								// 		/>
								// 		<Image
								// 			source={{ uri: getHttpAdress().replace(':8080', '') + 'azmoon/' + soal1 }}
								// 			style={{ marginTop: 10, flex: 1 }}
								// 		/>
								// 	</View>
								// </ScrollView>
							)}
							<FormButton
								onPress={() => {
									{
										this.setState({
											show_pdf: false
										});
									}
								}}
								widthb={'100%'}
								buttonColor="white"
								borderColor="white"
								fontSizeb={12.2}
								heightb={40}
								borderRadiusb={10}
								style={{ marginTop: 0 }}
								backgroundColor="#1f9efd"
								buttonType="outline"
								//loading={this.state.isSubmitting}
								title="بستن"
							/>

							{/* <WebView
								bounces={false}
								scrollEnabled={false}
								source={{ uri: 'http://www.africau.edu/images/default/sample.pdf' }}
							/> */}
						</View>
					</Modalm>

					<Modalm
						animationInTiming={0.1}
						animationOutTiming={0.1}
						backdropTransitionInTiming={0.1}
						backdropTransitionOutTiming={0.1}
						useNativeDriver={true}
						animationIn="fadeIn"
						animationOut="swing"
						transparent={true}
						style={{ borderRadius: 10, backgroundColor: 'white' }}
						hideModalContentWhileAnimating={true}
						deviceWidth={deviceWidth}
						deviceHeight={deviceHeight}
						//	swipeDirection={[ 'left' ]}
						onBackdropPress={() =>
							this.setState({
								show_attach: false
							})}
						onSwipeComplete={() =>
							this.setState({
								show_attach: false
							})}
						deviceWidth={deviceWidth}
						deviceHeight={deviceHeight}
						isVisible={this.state.show_attach}
					>
						<View style={{ flex: 1 }}>
							<Text style={{ textAlign: 'left', marginTop: 10, marginLeft: 5, fontFamily: 'iransans' }}>
								عکس های الصاقی:
							</Text>
							{/* {soal1.split('.')[1] == 'pdf'.toLowerCase() && (
								<WebView
									source={{ uri: getHttpAdress().replace(':8080', '') + '/azmoon/' + soal1 }}
									style={{ marginTop: 0 }}
								/>
							)} */}

							{true && (
								<Swiper
									onIndexChanged={(index, key) => {
										//console.log(key);
									}}
									paginationStyle={{
										flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse'
									}}
									loop={false}
									style={styles.wrapper}
									showsButtons={false}
								>
									{this.state.elsaghArr.map((itt, index) => {
										return (
											<View key={itt.moburl} style={{ flex: 1 }}>
												<Image
													key={itt.moburl}
													resizeMode="contain"
													source={{
														uri: itt.moburl
													}}
													style={{ marginTop: 10, flex: 1, borderRadius: 10 }}
												/>
												<TouchableOpacity
													key={itt.moburl + '1'}
													// onPress={() => this.myFunction(index)}

													onPress={() => {
														Alert.alert(
															' حذف عکس',
															'آیا مایل به حذف عکس پاسخ آزمون هستید؟',
															[
																{
																	text: 'خیر',
																	onPress: () => console.log('Cancel Pressed'),
																	style: 'cancel'
																},

																{
																	text: 'بله',

																	onPress: async () => {
																		this.setState({
																			elsaghArr: this.state.elsaghArr.filter(
																				function(item) {
																					return item.moburl !== itt.moburl;
																				}
																			)
																			// elsagh: (elsaghArr) =>
																			// 	this.state.elsaghArr.length
																		});
																		//console.log(this.state.elsaghArr);

																		// this.dimg(itt);
																		this.setState({
																			elsagh: this.state.elsaghArr.length
																		});
																		if (this.state.elsaghArr.length == 0)
																			this.setState({
																				show_attach: false
																			});
																	}
																}
															],
															{ cancelable: false }
														);
													}}
												>
													<Icon1
														style={{ marginRight: 10 }}
														name="trash-o"
														size={25}
														color="#1f9efd"
													/>
												</TouchableOpacity>
											</View>
										);
									})}

									{/* <Image
										//resizeMode="center"
										source={{ uri: getHttpAdress().replace(':8080', '') + 'azmoon/' + soal1 }}
										style={{ marginTop: 10, flex: 1 }}
									/> */}
								</Swiper>
							)}
							<View style={{ flexDirection: 'row' }}>
								<View style={{ flex: 1, margin: 5, marginBottom: 15 }}>
									<FormButton
										onPress={() => {
											{
												this.setState({
													show_attach: false
												});
											}
										}}
										widthb={'100%'}
										buttonColor="#1f9efd"
										borderColor="white"
										icon={<Icon1 name="close" size={15} color="#1f9efd" />}
										backgroundColor="#e3f1fc"
										fontSizeb={12.2}
										heightb={40}
										borderRadiusb={10}
										//style={{ marginTop: 0, flex: 1 }}
										//backgroundColor="#1f9efd"
										buttonType="outline"
										//loading={this.state.isSubmitting}
										title="بستن"
									/>
								</View>
								<View style={{ flex: 1, margin: 5 }} />
							</View>
						</View>
					</Modalm>
					<Modalm
						style={{ zIndex: 100 }}
						deviceWidth={deviceWidth}
						deviceHeight={deviceHeight}
						isVisible={this.state.isRecorderVisible}
					>
						<View style={{ flex: 1 }}>
							<Button
								title="Hide modal"
								onPress={() => {
									this.setState({ isRecorderVisible: false });
								}}
							/>
							<Recorder1 message={'hi'} />
						</View>
					</Modalm>

					<Modal visible={this.state.isModalVisible} transparent={true}>
						<ImageViewer
							onSwipeDown={() => {
								this.setState({ isModalVisible: false });
							}}
							enableSwipeDown={true}
							imageUrls={this.state.images}
						/>
					</Modal>

					<Modal visible={this.state.isModalVisibleatt} transparent={true}>
						<ImageViewer
							onSwipeDown={() => {
								this.setState({ isModalVisibleatt: false });
							}}
							enableSwipeDown={true}
							imageUrls={this.state.imagesatt}
						/>
					</Modal>

					<Snackbar
						visible={this.state.issnack}
						onDismiss={() => this.setState({ issnack: false })}
						style={{ backgroundColor: '#4BB543', fontFamily: 'iransans' }}
						wrapperStyle={{ fontFamily: 'iransans' }}
						action={{
							label: 'بستن',
							onPress: async () => {
								//this.setState({ issnack: false });tyt

								this.props.navigation.goBack(null);
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
								this.setState({
									loading: false,
									save_loading: false
								});
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
}

const styles = StyleSheet.create({
	footer: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 0.8,
		backgroundColor: 'white',
		height: 50,
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		shadowOpacity: 0.6,
		shadowRadius: 3
	},
	p2: {
		width: '100%',
		alignItems: 'center',
		flexDirection: 'column'
	},
	lightbox1: {
		flex: 1,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5
	},
	soalimg: {
		margin: 5,
		//	width: 600 / 3 - 17,
		//width: '100%',
		height: 110
		//flex: 1
		//borderWidth: 1
	},
	p1: {
		width: '100%',
		alignItems: 'center'
	},
	soalttext: {
		//borderWidth: 1,
		//backgroundColor: '#e3f1fc',
		borderRadius: 10,
		padding: 5,

		//borderWidth: 3,
		flexDirection: 'column',
		//justifyContent: 'flex-end', // direction == 'rtl' ? 'flex-end' : 'flex-start',
		margin: 10
	},
	soalnumtext: {
		color: 'white',
		fontFamily: 'iransans',
		padding: 3,
		fontSize: 12.2
		//backgroundColor: 'red'
	},
	elsaghbadge: {
		color: 'white',
		borderRadius: 5,
		fontFamily: 'iransans',
		paddingBottom: -5,
		overflow: 'hidden',
		backgroundColor: 'red'
	},
	soalnumber: {
		width: 120,
		height: 25,
		marginStart: 0,
		marginTop: 0,
		paddingBottom: -2,
		//borderWidth: 1,
		alignItems: 'center',
		backgroundColor: '#1f9efd',
		borderRadius: 10,
		borderBottomLeftRadius: 0,
		borderTopRightRadius: 0,

		//borderWidth: 1,
		justifyContent: 'flex-start',
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		shadowOpacity: 0.6,
		shadowRadius: 3
	},
	soalnumber1: {
		width: 60,
		marginStart: 10,
		right: 0,
		height: 25,

		marginTop: 0,
		paddingBottom: -2,
		//borderWidth: 1,
		alignItems: 'flex-end',
		backgroundColor: '#1f9efd',
		borderRadius: 10,
		//borderBottomLeftRadius: 0,
		//borderBottomRightRadius: 0,

		borderTopRightRadius: 0,
		borderTopLeftRadius: 0,

		//borderWidth: 1,
		justifyContent: 'center',
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		shadowOpacity: 0.6,
		shadowRadius: 3
	},
	soalbody: {
		backgroundColor: 'white',
		flex: 7,
		height: 40,
		borderWidth: 0,
		margin: 15,
		borderRadius: 15,
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		elevation: 1.5,

		shadowOpacity: 0.6,
		shadowRadius: 3
	},
	counterText: {
		borderColor: '#ccc',
		borderRadius: 5,
		//padding: 3,
		textAlign: 'right',
		marginRight: 10,
		//paddingTop: 5,
		fontSize: 12.2,
		marginTop: 0,
		fontFamily: 'iransans'
	},
	counterPanel: {
		flexDirection: 'column-reverse',
		flex: 1.5,
		backgroundColor: 'white',
		height: 70
	},
	blueText: {
		borderWidth: 1,
		borderColor: '#1f9efd',
		borderRadius: 5,
		paddingRight: 3,
		paddingLeft: 3,
		paddingTop: 4,
		paddingBottom: -3,
		color: '#1f9efd',
		backgroundColor: '#e3f1fc',
		textAlign: 'left',
		fontSize: 12,
		marginTop: 5,
		fontFamily: 'iransans'
	},
	header: {
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		elevation: 2,
		shadowOpacity: 0.6,
		shadowRadius: 3,
		flexDirection: 'row',
		flex: 1.09,
		backgroundColor: 'white',
		height: 70
	},
	contain: {
		//flex: 1,
		width: 100,
		height: 100,
		//borderWidth: ,
		borderRadius: 15,
		shadowColor: 'red',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.67,
		shadowRadius: 3.49
		//elevation: 1
		//borderColor: 'red'
	},
	gozine: {
		//borderWidth: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		margin: 15
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
		top: 0,
		padding: 5,
		zIndex: 1,
		backgroundColor: '#ddd',
		elevation: 2,
		//height: 200,
		flexDirection: 'column'
	},
	mainpanel: {
		zIndex: 1,
		elevation: 2,
		shadowColor: '#ccc',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.67,
		shadowRadius: 3.49
	},
	aztitle: {
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'center',
		fontSize: 12.2,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'center',
		fontSize: 12.2,
		borderWidth: 1,
		padding: 1,
		borderColor: 'white',
		borderRadius: 5,
		color: 'white'
	},
	actionButtonIcon: {
		fontSize: 12.2,
		height: 22,
		color: 'white'
	},
	image: {
		width: 70,
		height: 70,
		alignSelf: 'center',
		borderRadius: 55,
		borderWidth: 1,
		borderColor: '#ebf0f7',
		backgroundColor: 'white'

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
		color: 'black',
		fontSize: 12.2
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
		width: 45,
		height: 58,
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
		fontSize: 12.2,
		color: '#fff',
		fontWeight: '600',
		paddingBottom: 12,
		fontFamily: 'iransans',
		textAlign: 'center'
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12.2,
		color: '#fff'
	}
});
export default Exam;

//export default withNavigation(Exam);
