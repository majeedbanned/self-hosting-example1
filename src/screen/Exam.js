import React, { Component, useState, useEffect, useRef } from 'react';
import * as ImageManipulator from 'expo-image-manipulator';
import { StyleSheet, TextInput, Alert, Dimensions } from 'react-native';
import defaultStyles from '../config/styles';
import { WebView } from 'react-native-webview';
import Swiper from 'react-native-swiper';

import { Input, ButtonGroup } from 'react-native-elements';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

//import Camera from '../components/exam/camera';
import Modalm from 'react-native-modal';

import HTML from 'react-native-render-html';
var Buffer = require('buffer/').Buffer;

import Loading from '../components/loading';

import { AntDesign, Entypo } from '@expo/vector-icons';
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

import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
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

import { I18nManager, AppRegistry } from 'react-native';
import { RECORDING_OPTION_IOS_BIT_RATE_STRATEGY_VARIABLE_CONSTRAINED } from 'expo-av/build/Audio';
import Lightbox from 'react-native-lightbox';
import { Global } from '@jest/types';
import fa from '../translations/fa';
// I18nManager.allowRTL(true);
// I18nManager.forceRTL(true);

class Exam extends Component {
	constructor(props) {
		super(props);
		(this.page = 1),
			(this.state = {
				counterColor: '#1f9efd',
				tmp: '',
				textInputs: [],
				showcamera: false,
				Sindex: 0,
				page: 1,
				value: '',
				isLoading: false,
				data: [],
				fulldata: [],
				answers: [ { id: '125-1', pasokh: '1' }, { id: '125-2', pasokh: '2' } ]
			});
		this.examMode = '';
		this.props.navigation.setParams({ isHeaderShow: true });
		this.examID = '';
	}

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			title: global.examName,
			headerLeft: null,
			headerRight: () => (
				<TouchableOpacity
					onPress={() => {
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
									onPress: () => navigation.goBack(null),
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
					}}
				>
					<Text
						style={{
							color: 'red',
							marginEnd: 10,
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

	// static navigationOptions = {
	// 	//To set the header image and title for the current Screen
	// 	title: 'پارس آموز',
	// 	//Title
	// 	headerRight: null,
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
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			//return;
		}
		/* #endregion */

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
		console.log(uurl);
		try {
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

				Alert.alert(
					'ثبت آزمون',
					retJson.msg,
					[
						{
							text: 'تایید',
							onPress: () => this.props.navigation.goBack(null),
							style: 'cancel'
						}
					],
					{ cancelable: false }
				);
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

	async componentDidMount() {
		const { navigation } = this.props;
		this.examID = navigation.getParam('examID');
		this.examMode = navigation.getParam('mode');
		this.loadAPI(this.page);
	}
	loadAPI = async (page) => {
		if (global.adress == 'undefined') {
			GLOBAL.main.setState({ isModalVisible: true });
		}
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			return;
		}
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		//global.examID = '26668';
		//global.adress = 'http://192.168.1.12:8080/';
		//alert(examID);
		let uurl =
			global.adress + '/pApi.asmx/getExambody?id=' + this.examID + '&p=' + param + '&exammode=' + this.examMode;
		console.log(uurl);
		try {
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
					data: retJson[0].Soals,
					fulldata: retJson,

					loading: false
				});

				this.state.answers.push({ id: '125-7', pasokh: '1' });

				const elementsIndex = this.state.answers.findIndex((element) => element.id == '125-7');
				let newArray = [ ...this.state.answers ];
				newArray[elementsIndex] = { ...newArray[elementsIndex], pasokh: '666' };
				this.setState({
					answers: newArray
				});

				console.log(this.state.answers);
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

	// handleTakePhoto = () => {
	// 	if (this.camera) {
	// 		alert('hi');
	// 		//let photo = await this.camera.takePictureAsync(); //{ base64: true };
	// 		// console.log(photo.uri);
	// 	}
	// };
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
				barom,
				_pasokh,
				id_soal,
				ttimenew,
				_imageuri
			} = this.state.fulldata[0].Soals[this.state.Sindex];

			global.activeMp3 = getHttpAdress() + 'azmoon/' + ax;
			const {
				imgResponse,
				speed,
				soal1,
				soal2,
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
						<View style={{ flex: 1 }}>
							<Camera
								pictureSize="340"
								style={{ flex: 1 }}
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
										<Text style={{ fontSize: 18, marginBottom: 10 }}> Flip </Text>
									</TouchableOpacity>
									<TouchableOpacity
										style={{ alignSelf: 'center' }}
										onPress={async () => {
											if (this.camera) {
												let photo = await this.camera.takePictureAsync(); //{ base64: true };
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
						</View>
					)}

					{!this.state.showcamera && (
						<View style={Mstyles.container}>
							<View style={styles.header}>
								<View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 2, height: 70 }}>
									<View>
										<Image
											style={[ styles.imageavatar, { margin: 10 } ]}
											source={{ uri: getHttpAdress() + 'child/' + global.username + '.jpg' }}
										/>
									</View>
									<View>
										<Text style={styles.blueText}>
											{'تعداد سئوالات:' + this.state.fulldata[0].Soals.length}
										</Text>
										<Text style={styles.blueText}>{global.firstname + ' ' + global.lastname}</Text>
									</View>
								</View>
								<View style={styles.counterPanel}>
									{speed != 'speed' && (
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

									{ttimenew == '' &&
									speed == 'speed' && (
										<CountDown
											id={id_soal}
											until={60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec)}
											size={14}
											onChange={(ss) => {
												ss < 10 &&
													ss > 1 &&
													this.setState({
														counterColor: 'red'
													});

												console.log(ss);
											}}
											onFinish={() => {
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

									{ttimenew != '' &&
									speed == 'speed' && (
										<CountDown
											id={id_soal}
											until={60 * ttimenew}
											size={14}
											onChange={(ss) => {
												ss < 10 &&
													ss > 1 &&
													this.setState({
														counterColor: 'red'
													});
											}}
											onFinish={() => {
												this.state.Sindex < this.state.data.length - 1 &&
													this.setState({
														counterColor: '#1f9efd',
														Sindex: this.state.Sindex + 1
													});
											}}
											digitStyle={{ backgroundColor: this.state.counterColor, marginTop: 0 }}
											digitTxtStyle={{ color: 'white' }}
											timeToShow={[ 'S', 'M', 'H' ]}
											timeLabels={{ m: 'دقیقه', s: 'ثانیه', h: 'ساعت' }}
										/>
									)}
									<Text style={styles.counterText}>
										{speed == 'speed' ? 'زمان پاسخ به این سئوال' : 'زمان پاسخ به کل سئوالات'}
									</Text>
								</View>
							</View>

							<View style={styles.soalbody}>
								<View style={[ styles.soalnumber, { flexDirection: 'row' } ]}>
									<Text style={styles.soalnumtext}>
										{toFarsi('سئوال شماره   ' + (this.state.Sindex + 1))}
									</Text>

									<Text style={([ styles.soalnumtext ], { paddingLeft: 33, fontFamily: 'iransans' })}>
										{toFarsi('بارم:' + barom)}
									</Text>
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
											<HTML
												html={
													'<span style="color:#1f9efd;text-align:left;direction:rtl;font-family:iransansbold;font-size:15;line-height:35px" >' +
													soal +
													'</span>'
												}
											/>
										)}
										{direction == 'ltr' &&
										speed != 'pdf' && (
											<HTML
												html={
													'<span style="color:#1f9efd;text-align:left;direction:ltr;font-family:iransansbold;font-size:15;line-height:35px" >' +
													soal +
													'</span>'
												}
											/>
										)}

										{ax != '' &&
											(ax.split('.').pop() == 'jpg' && (
												<View style={styles.p1}>
													{/* key={Math.floor(Math.random() * 100)} */}
													<TouchableOpacity style={styles.soalimg}>
														<Lightbox
															underlayColor="#fff"
															style={styles.lightbox1}
															backgroundColor="#001"
														>
															<Image
																borderRadius={15}
																source={{ uri: getHttpAdress() + 'azmoon/' + ax + '' }}
																style={{
																	width: '100%',
																	height: '100%'
																}}
																resizeMode="contain"
															/>
														</Lightbox>
													</TouchableOpacity>
												</View>
											))}

										{ax != '' &&
											(ax.split('.').pop() == 'mp3' && (
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
														<AntDesign
															name="playcircleo"
															size={57}
															style={styles.massage}
														/>
													</TouchableOpacity>
												</View>
											))}
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
														fontSizeb={14}
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
																>
																	<Lightbox
																		underlayColor="#fff"
																		style={styles.lightbox1}
																		backgroundColor="#001"
																	>
																		<Image
																			borderRadius={15}
																			source={{ uri: _imageuri }}
																			style={{
																				width: '100%',
																				height: '100%'
																			}}
																			resizeMode="contain"
																		/>
																	</Lightbox>
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

														{ padding: 10, textAlign: 'right', height: 190 }
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
													Speed={speed}
													value="1"
													html={g1}
													direction={direction}
													axg={ax1}
													border={this.examMode == 'pasokhname' && correct == '1' ? 1 : 0}
												/>
												<RadioItem
													Speed={speed}
													border={this.examMode == 'pasokhname' && correct == '2' ? 1 : 0}
													value="2"
													html={g2}
													direction={direction}
													axg={ax2}
												/>
												<RadioItem
													Speed={speed}
													border={this.examMode == 'pasokhname' && correct == '3' ? 1 : 0}
													value="3"
													html={g3}
													direction={direction}
													axg={ax3}
												/>
												<RadioItem
													Speed={speed}
													border={this.examMode == 'pasokhname' && correct == '4' ? 1 : 0}
													value="4"
													html={g4}
													direction={direction}
													axg={ax4}
												/>
											</RadioButton.Group>
										)}
									</View>
								</ScrollView>
							</View>
							<View style={styles.footer}>
								{/* speed != 'pdf' && */}
								<View style={{ alignItems: 'center', flex: 1, backgroundColor: 'white', height: 50 }}>
									{!this.state.saveVisible && (
										<FormButton
											icon={<Icon1 name="arrow-right" size={15} color="#1f9efd" />}
											iconLeft
											onPress={() => {
												{
													if (speed == 'speed') {
														//if (false) {
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
																	}
																}
															],
															{ cancelable: false }
														);
													} else {
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
													}
												}
											}}
											buttonColor="#1f9efd"
											borderColor="white"
											fontSizeb={14}
											heightb={40}
											borderRadiusb={10}
											widthb={180}
											style={{ marginTop: 0 }}
											backgroundColor="#e3f1fc"
											buttonType="outline"
											loading={this.state.isSubmitting}
											title="سئوال بعد"
										/>
									)}

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
											fontSizeb={14}
											heightb={40}
											borderRadiusb={10}
											widthb={180}
											style={{ marginTop: 0 }}
											backgroundColor="#51e077"
											buttonType="outline"
											loading={this.state.save_loading}
											title="۱ ذخیره آزمون"
										/>
									)}
									{this.examMode == 'tashih' && (
										<FormButton
											icon={<Icon1 name="save" size={15} color="#1f9efd" />}
											iconLeft
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
															}
														}
													],
													{ cancelable: false }
												);
											}}
											buttonColor="#1f9efd"
											borderColor="white"
											fontSizeb={14}
											heightb={40}
											borderRadiusb={10}
											widthb={180}
											style={{ marginTop: 0 }}
											backgroundColor="#51e077"
											buttonType="outline"
											loading={this.state.isSubmitting}
											title=" ذخیره تصحیح"
										/>
									)}
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
								<View style={{ alignItems: 'center', flex: 1, backgroundColor: 'white', height: 50 }}>
									{speed == '' && (
										<FormButton
											onPress={() => {
												{
													this.state.Sindex > 0 &&
														this.setState({
															Sindex: this.state.Sindex - 1,
															saveVisible: false
														});
												}
											}}
											icon={<Icon1 name="arrow-left" size={15} color="#1f9efd" />}
											iconRight
											buttonColor="#1f9efd"
											borderColor="white"
											fontSizeb={14}
											heightb={40}
											widthb={180}
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
												console.log(getHttpAdress().replace(':8080', '') + 'azmoon/' + soal1);
												this.setState({
													show_pdf: true
												});
											}}
											icon={<Icon1 name="list-ol" size={15} color="#1f9efd" />}
											iconRight
											buttonColor="#1f9efd"
											borderColor="white"
											fontSizeb={14}
											heightb={40}
											widthb={180}
											borderRadiusb={10}
											style={{ marginTop: 0 }}
											backgroundColor="#e3f1fc"
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
								fontSizeb={14}
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
		width: 600 / 3 - 17,
		height: 110
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
		padding: 4
	},
	soalnumber: {
		width: 120,
		marginStart: 15,
		marginTop: -10,
		//borderWidth: 1,
		alignItems: 'flex-start',
		backgroundColor: '#1f9efd',
		borderRadius: 10,
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
		shadowOpacity: 0.6,
		shadowRadius: 3
	},
	counterText: {
		borderColor: '#ccc',
		borderRadius: 5,
		//padding: 3,
		textAlign: 'left',
		fontSize: 12,
		marginTop: 0,
		fontFamily: 'iransans'
	},
	counterPanel: {
		flexDirection: 'column-reverse',
		flex: 1,
		backgroundColor: 'white',
		height: 70
	},
	blueText: {
		borderWidth: 1,
		borderColor: '#1f9efd',
		borderRadius: 5,
		padding: 3,
		color: '#1f9efd',
		backgroundColor: '#e3f1fc',
		textAlign: 'left',
		fontSize: 12,
		marginTop: 10,
		fontFamily: 'iransans'
	},
	header: {
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		shadowOpacity: 0.6,
		shadowRadius: 3,
		flexDirection: 'row',
		flex: 1,
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
		shadowRadius: 3.49,
		elevation: 1
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
		fontSize: 18,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'center',
		fontSize: 13,
		borderWidth: 1,
		padding: 1,
		borderColor: 'white',
		borderRadius: 5,
		color: 'white'
	},
	actionButtonIcon: {
		fontSize: 20,
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
export default Exam;

//export default withNavigation(Exam);
