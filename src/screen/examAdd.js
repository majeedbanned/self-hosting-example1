import React, { Component } from 'react';
import { Input, ButtonGroup } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import * as ImagePicker from 'expo-image-picker';
import NetInfo from '@react-native-community/netinfo';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';

import { userInfo, getHttpAdress } from '../components/DB';
import { Chip } from 'react-native-paper';
var Buffer = require('buffer/').Buffer;
import GLOBAL from './global';

import Modalm from 'react-native-modal';
import { Dimensions, Image, ActivityIndicator } from 'react-native';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import TimePicker from 'react-native-24h-timepicker';
//import TimePicker from 'react-native-24h-timepicker';
import {
	
	TextInput,
	Text,
	Button,
	Alert,
	View,
	Keyboard,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Switch
} from 'react-native';
import colors from '../config/colors';
import defaultStyles from '../config/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal, {
	ModalTitle,
	ModalContent,
	ModalFooter,
	ModalButton,
	SlideAnimation,
	ScaleAnimation
} from 'react-native-modals';
import moment from 'moment-jalaali';
import ErrorMessage from '../component/ErrorMessage';
import SelectContact from '../screen/selectContact';

import Icon1 from 'react-native-vector-icons/FontAwesome';
import FormButton from '../component/FormButton';
import FormInput from '../component/FormInput';
import DismissKeyboardView from '../components/dismiskeyboard';
import CheckBox from 'react-native-check-box';
import AppTextInput from '../components/AppTextInput';

import i18n from 'i18n-js';
import { TextField, FilledTextField, OutlinedTextField } from '@softmedialab/react-native-material-textfield';
import { ScrollView } from 'react-native-gesture-handler';
import { handleTextInput, withPickerValues, Formik } from 'formik';
import * as yup from 'yup';
import DropdownAlert from 'react-native-dropdownalert';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import { LocaleConfig, Calendar } from 'react-native-calendars-persian';
import { Colors } from 'react-native-paper';
import { toFarsi } from '../components/DB';
import PersianDatePicker from 'rn-persian-date-picker';
import { Row } from 'native-base';
//import { timingSafeEqual } from 'crypto';
const noeazmoon = [
	{
		label: ' زمان کلی و امکان بازگشت به سئوال قبل',
		value: 'empty'
	},
	{
		label: ' اختصاص زمان به هر سئوال و بدون امکان بازگشت به سئوال قبل',
		value: 'speed'
	},
	{
		label: 'آزمون با فایل تصویر سئوالات',
		value: 'pdf'
	}
];
const pickerStyle = {
	inputIOS: {
		color: defaultStyles.colors.primary,
		fontSize: 14,
		fontFamily: 'iransans',
		paddingTop: 13,
		paddingHorizontal: 10,
		paddingBottom: 12,
		textAlign: 'center'
	},
	inputAndroid: {
		fontSize: 14,
		fontFamily: 'iransans',
		textAlign: 'center',
		color: 'red'
	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15
	}
};
const newPlaceholder = {
	label: 'نوع آزمون',
	value: ''
};

const selectedClass = [
	{
		//FirstName: '',
		LastName: 'کلاس هشتم 1',
		//RowNumber: 1,
		//check: 'true',
		///coursename: 'هشتم 1',
		username: '*1484782'
	},
	{
		//	FirstName: '',
		LastName: 'کلاس هفتم 1',
		//RowNumber: 2,
		//check: 'true',
		//coursename: 'هفتم 1',
		username: '*1484792'
	}
];
class examAdd extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formikDefault: {
				serverId: '',
				name: '',
				tozihat: '',
				shoro_namayesh: '',
				payan_namayesh: '',
				t_shoro_namayesh: '',
				t_payan_namayesh: '',
				speed: 'empty',
				time_pasokh: '',
				time_pasokh_sec: '',
				direction: 0,
				tartib_namayesh: 0,
				soal_random: '',

				show_nomre: 0,
				namayesh_pasokh: '',
				G_random: '',

				selectedClass: [],
				//{ Firstname: '', LastnName: '', RowNumber: '', check: false, username: '', coursename: '' }
				soal1: '',
				soal2: '',
				soal3: '',
				soal1base64: '',
				soal2base64: '',
				soal3base64: ''
			},

			selectedParticipate: 'شرکت کنندگان',
			isModalpikerVisible: false,
			modalcap: '',
			selectedStartDate: null,
			shoro_namayesh: 'تاریخ شروع',
			payan_namayesh: '',
			bottomModalAndTitle: false,
			selectedDate: '',
			dateSelected: '',
			dateSelected_shoro_namayesh: '',
			dateSelected_payan_namayesh: '',
			sh_hour: '',
			sh_min: '',
			pa_hour: '',
			pa_min: '',
			ddd: '',
			ispdf: false,
			isEditing: false,
			img1pg: '',
			imgpgVisible: false,
			img2pg: '',
			img2pgVisible: false,
			img3pg: '',
			img3pgVisible: false,
			butcaption: 'ثبت'
		};

		this.onDateChange = this.onDateChange.bind(this);
	}

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			title: global.examEditID != '' ? 'ویرایش آزمون' : 'تعریف آزمون',
			headerRight: () => null,
			headerTitleStyle: {
				fontFamily: 'iransans'
			}
		};
	};

	onDateChange(day) {
		//console.log(this.state.shoro_namayesh);

		let mydate = new Date(day.dateString);
		var dataJalali = moment(mydate).format('jYYYY/jMM/jDD');
		if (this.state.modalcap == 'تاریخ شروع آزمون:') {
			this.setState((prevState) => ({
				ddd: toFarsi(dataJalali),
				formikDefault: {
					...prevState.formikDefault,
					shoro_namayesh: toFarsi(dataJalali)
				}
				//shoro_namayesh: toFarsi(dataJalali)
			}));
		}

		if (this.state.modalcap == 'تاریخ پایان آزمون:') {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					payan_namayesh: toFarsi(dataJalali)
				}
			}));
		}

		//Formik.name = 'sd';
	}
	async componentDidMount() {
		if (global.examEditID != '') {
			this.setState({
				isEditing: true
			});
			this.loadAPI();
		}
		//this.loadAPI(this.page, 'pull');
	}

	loadAPI = async () => {
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

		//this.setState({ loading: true });
		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/getExam?id=' + global.examEditID + '&p=' + param;
		////////console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				//alert(retJson[0].selectedClass[0].username);
				if (Object.keys(retJson).length == 0) {
					this.setState(
						{
							//isEditing: false
						}
					);
					return;
				}
				// this.setState({
				// 	formikDefault: retJson,

				// 	isEditing: false
				// });

				this.setState((prevState) => ({
					formikDefault: retJson[0],

					isEditing: false
				}));

				//*****global.examEditID = '';
				//alert(this.state.formikDefault.speed);
				if (this.state.formikDefault.speed == 'pdf') this.setState({ ispdf: true });
				//else
				//this.setState({ ispdf: false });

				//console.log(getHttpAdress() + '/azmoon/' + this.state.soal1);
				if (this.state.formikDefault.soal1 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							soal1: getHttpAdress() + 'azmoon/' + this.state.formikDefault.soal1
						}
					}));
				}

				if (this.state.formikDefault.soal2 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							soal2: getHttpAdress() + 'azmoon/' + this.state.formikDefault.soal2
						}
					}));
				}

				if (this.state.formikDefault.soal3 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							soal3: getHttpAdress() + 'azmoon/' + this.state.formikDefault.soal3
						}
					}));
				}
				//alert(this.state.formikDefault.selectedClass);

				//	console.log('seeeexy:' + this.state.formikDefault[0].name);
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
	apiPost = async (jsonstr) => {
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
		let uurl = global.adress + '/pApi.asmx/setExam?p=' + param + '&json=' + jsonstr;
		////////console.log(uurl);
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
					//fulldata: retJson,
					butcaption: retJson[0].message,
					loading: false
				});
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
				loading: false
			});
			return;
		}
	};

	onCancel() {
		this.TimePicker.close();
	}
	onCancel1() {
		this.TimePicker1.close();
	}
	onConfirm1(hour, minute) {
		this.setState((prevState) => ({
			pa_hour: hour,
			pa_min: minute,
			formikDefault: {
				...prevState.formikDefault,
				t_payan_namayesh: toFarsi(`${hour}:${minute}`)
			}
		}));
		this.TimePicker1.close();
	}
	onConfirm(hour, minute) {
		this.setState((prevState) => ({
			sh_hour: hour,
			sh_min: minute,
			formikDefault: {
				...prevState.formikDefault,
				t_shoro_namayesh: toFarsi(`${hour}:${minute}`)
			}
		}));
		this.TimePicker.close();
	}

	ImageUpload2(url) {
		console.log('start');
		const xhr = new XMLHttpRequest();
		xhr.open('POST', global.upadress + '/api/upload');
		xhr.onload = () => {
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					soal2: url,
					soal2base64: xhr.response
				},
				img2pgVisible: false
			}));
			// ... do something with the successful response
		};

		xhr.onerror = (e) => {
			console.log(e, 'upload failed');
		};
		// 4. catch for request timeout
		xhr.ontimeout = (e) => {
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
		this.setState({
			img2pgVisible: true
		});

		// 7. track upload progress
		if (xhr.upload) {
			// track the upload progress
			xhr.upload.onprogress = ({ total, loaded }) => {
				const uploadProgress = loaded / total;
				console.log(uploadProgress);
				this.setState({
					img2pg: uploadProgress
				});
			};
		}
	}
	ImageUpload3(url) {
		console.log('start');
		const xhr = new XMLHttpRequest();
		xhr.open('POST', global.upadress + '/api/upload');
		xhr.onload = () => {
			//const response = JSON.parse(xhr.response);
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					soal3: url,
					soal3base64: xhr.response
				},
				img3pgVisible: false
			}));
			// ... do something with the successful response
		};

		xhr.onerror = (e) => {
			console.log(e, 'upload failed');
		};
		// 4. catch for request timeout
		xhr.ontimeout = (e) => {
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
		this.setState({
			img3pgVisible: true
		});

		// 7. track upload progress
		if (xhr.upload) {
			// track the upload progress
			xhr.upload.onprogress = ({ total, loaded }) => {
				const uploadProgress = loaded / total;
				console.log(uploadProgress);
				this.setState({
					img3pg: uploadProgress
				});
			};
		}
	}

	ImageUpload(url) {
		console.log('start');
		const xhr = new XMLHttpRequest();
		xhr.open('POST', global.upadress + '/api/upload');
		xhr.onload = () => {
			//const response = JSON.parse(xhr.response);
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					soal1: url,
					soal1base64: xhr.response
				},
				imgpgVisible: false
			}));
			// ... do something with the successful response
		};

		xhr.onerror = (e) => {
			console.log(e, 'upload failed');
		};
		// 4. catch for request timeout
		xhr.ontimeout = (e) => {
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
		this.setState({
			imgpgVisible: true
		});

		// 7. track upload progress
		if (xhr.upload) {
			// track the upload progress
			xhr.upload.onprogress = ({ total, loaded }) => {
				const uploadProgress = loaded / total;
				console.log(uploadProgress);
				this.setState({
					img1pg: uploadProgress
				});
			};
		}
	}
	render() {
		let openImagePickerAsync = async () => {
			let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

			if (permissionResult.granted === false) {
				alert('Permission to access camera roll is required!');
				return;
			}

			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				//base64: true,
				allowsEditing: true,
				allowsMultipleSelection: true
			});
			this.ImageUpload(pickerResult.uri);

			//	console.log(pickerResult.uri);
		};

		let openImagePickerAsync2 = async () => {
			let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
			if (permissionResult.granted === false) {
				alert('Permission to access camera roll is required!');
				return;
			}
			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				base64: true,
				allowsEditing: true,
				allowsMultipleSelection: true
			});
			this.ImageUpload2(pickerResult.uri);
		};

		let openImagePickerAsync3 = async () => {
			let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

			if (permissionResult.granted === false) {
				alert('Permission to access camera roll is required!');
				return;
			}

			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				base64: true,
				allowsEditing: true,
				allowsMultipleSelection: true
			});
			this.ImageUpload3(pickerResult.uri);
			// this.setState((prevState) => ({
			// 	formikDefault: {
			// 		...prevState.formikDefault,
			// 		soal3: pickerResult.uri,
			// 		soal3base64: pickerResult.base64
			// 	}
			// }));
			//	console.log(pickerResult.uri);
		};

		//const { navigate } = this.props.navigation;
		GLOBAL.examAdd = this;
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
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;

		if (this.state.isEditing)
			return (
				<View style={styles.container}>
					<View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<ActivityIndicator style={{ color: '#000' }} />
					</View>
				</View>
			);

		return (
			<View style={{ flex: 1, backgroundColor: '#f6fbff' }}>
				<ScrollView>
					<Formik
						style={{ backgroundColor: 'red' }}
						enableReinitialize={true}
						initialValues={this.state.formikDefault}
						validateOnBlur={false}
						validateOnChange={false}
						// 	onSubmit={async (values, { resetForm }) => {
						// 		//await onSubmit(values)
						//   console.log('sdf');
						//   resetForm({username:''})
						// 	  }}

						onSubmit={(values) => {
							let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');
							this.apiPost(JSON.stringify(objJsonB64));
							//Alert.alert(JSON.stringify(values));
							//}, 1000);
						}}
						validationSchema={yup.object().shape({
							name: yup.string().required('لطفا نام آزمون را وارد کنید'),
							shoro_namayesh: yup.string().required('لطفا تاریخ شروع آزمون را وارد کنید'),
							payan_namayesh: yup.string().required('لطفا تاریخ پایان آزمون را وارد کنید'),
							t_shoro_namayesh: yup.string().required('لطفا زمان شروع را وارد کنید'),
							t_payan_namayesh: yup.string().required('لطفا زمان پایان را وارد کنید'),
							speed: yup.string().required('لطفا نوع آزمون را وارد کنید'),
							time_pasokh: yup.number().required('لطفا زمان پاسخگویی را وارد کنید'),
							time_pasokh_sec: yup.number().required('لطفا زمان پاسخگویی(ثانیه) را وارد کنید')
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
								<Input
									autoCorrect={false}
									value={values.name}
									onChangeText={handleChange('name')}
									// onBlur={(txt) =>
									// 	this.setState((prevState) => ({
									// 		formikDefault: {
									// 			...prevState.formikDefault,
									// 			name: 'dddd'
									// 		}
									// 	}))}
									onEndEditing={(e) => {
										let ddd = e.nativeEvent.text;
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												name: ddd
											}
										}));
									}}
									leftIcon={<Entypo name="pencil" size={27} style={styles.forward} />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label="نام آزمون"
									placeholder=""
									value={values.name}
									errorStyle={styles.err}
									errorMessage={errors.name}
									containerStyle={{ borderWidth: 0 }}
								/>

								<Input
									onEndEditing={(e) => {
										let val = e.nativeEvent.text;
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												tozihat: val
											}
										}));
									}}
									value={values.tozihat}
									onChangeText={handleChange('tozihat')}
									leftIcon={<Entypo name="text" size={27} style={styles.forward} />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label="توضیحات آزمون "
									placeholder=""
									value={values.tozihat}
									errorStyle={styles.err}
									errorMessage={errors.tozihat}
									containerStyle={{ borderWidth: 0 }}
								/>
								<TouchableOpacity
									onPress={() => {
										this.setState({
											isModalpikerVisible: true
										});
									}}
									onFocus={() => {
										this.picker.showPicker();
										//this.setState({ bottomModalAndTitle: true });
										//Keyboard.dismiss();
									}}
								>
									<View style={[ defaultStyles.shadow, defaultStyles.viewBtn ]}>
										<Text style={[ defaultStyles.lbl16, { margin: 10 } ]}>
											{this.state.selectedParticipate}
										</Text>
									</View>
								</TouchableOpacity>
								<View
									style={{
										flexDirection: 'row',
										flexWrap: 'wrap',
										padding: 12
									}}
								>
									{this.state.formikDefault.selectedClass.map((items) => {
										return (
											<Chip
												textStyle={{ fontFamily: 'iransans', fontSize: 12 }}
												style={{ margin: 4 }}
												//mode="outlined"
												// icon="information"
												onPress={() => console.log('Pressed')}
											>
												{items.LastName}
											</Chip>
										);
									})}
								</View>

								<Input
									onFocus={() => {
										Keyboard.dismiss();
										this.setState({
											modalcap: 'تاریخ شروع آزمون:',
											bottomModalAndTitle: true,
											dateSelected: this.state.dateSelected_shoro_namayesh
										});

										console.log('ddddd:' + this.state.dateSelected_shoro_namayesh);
									}}
									keyboardType="numeric"
									//value={this.state.shoro_namayesh}
									onChangeText={handleChange('shoro_namayesh')}
									leftIcon={<Entypo name="calendar" size={23} style={styles.forward} />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label=" تاریخ شروع "
									placeholder=""
									value={values.shoro_namayesh}
									errorStyle={styles.err}
									//errorMessage={errors.shoro_namayesh}
									containerStyle={{ marginTop: 4 }}
								/>
								<Input
									onFocus={() => {
										Keyboard.dismiss();
										this.setState({
											modalcap: 'تاریخ پایان آزمون:',
											bottomModalAndTitle: true,
											dateSelected: this.state.dateSelected_payan_namayesh
										});
									}}
									keyboardType="numeric"
									value={this.state.payan_namayesh}
									onChangeText={handleChange('payan_namayesh')}
									leftIcon={<Entypo name="calendar" size={23} style={styles.forward} />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label=" تاریخ پایان "
									placeholder=""
									value={values.payan_namayesh}
									errorStyle={styles.err}
									errorMessage={errors.payan_namayesh}
									containerStyle={{ marginTop: 4 }}
								/>

								<Input
									onFocus={() => {
										this.TimePicker.open();

										Keyboard.dismiss();
									}}
									value={this.state.t_shoro_namayesh}
									onChangeText={handleChange('t_shoro_namayesh')}
									value={values.t_shoro_namayesh}
									errorMessage={errors.t_shoro_namayesh}
									keyboardType="numeric"
									leftIcon={<Entypo name="clock" size={23} style={styles.forward} />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label=" ساعت نمایش دکمه شروع آزمون "
									placeholder=""
									errorStyle={styles.err}
									containerStyle={{ marginTop: 4 }}
								/>

								<TimePicker
									ref={(ref) => {
										this.TimePicker = ref;
									}}
									textCancel="انصراف"
									textConfirm="تایید"
									selectedHour={this.state.sh_hour}
									selectedMinute={this.state.sh_min}
									onCancel={() => this.onCancel()}
									onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
								/>

								<Input
									onFocus={() => {
										this.TimePicker1.open();

										Keyboard.dismiss();
									}}
									value={this.state.t_payan_namayesh}
									onChangeText={handleChange('t_payan_namayesh')}
									value={values.t_payan_namayesh}
									errorMessage={errors.t_payan_namayesh}
									keyboardType="numeric"
									leftIcon={<Icon name="user" size={24} color="black" />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label=" ساعت پایان نمایش دکمه شروع آزمون "
									placeholder=""
									errorStyle={styles.err}
									containerStyle={{ marginTop: 4 }}
								/>

								<TimePicker
									ref={(ref) => {
										this.TimePicker1 = ref;
									}}
									textCancel="انصراف"
									textConfirm="تایید"
									selectedHour={this.state.pa_hour}
									selectedMinute={this.state.pa_min}
									onCancel={() => this.onCancel1()}
									onConfirm={(hour, minute) => this.onConfirm1(hour, minute)}
								/>

								<Input
									onEndEditing={(e) => {
										let val = e.nativeEvent.text;
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												time_pasokh: val
											}
										}));
									}}
									keyboardType="numeric"
									value={values.time_pasokh}
									onChangeText={handleChange('time_pasokh')}
									value={values.time_pasokh}
									errorMessage={errors.time_pasokh}
									keyboardType="numeric"
									leftIcon={<Icon name="user" size={24} color="black" />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label=" مهلت پاسخگویی(دقیقه)"
									placeholder="دقیقه"
									errorStyle={styles.err}
									containerStyle={{ marginTop: 4 }}
								/>
								{/* <View> */}
								<Text style={[ defaultStyles.lbl16, , styles.capstyle ]}>نوع آزمون</Text>
								<View style={[ defaultStyles.shadow, defaultStyles.viewBtn ]}>
									<RNPickerSelect
										style={pickerStyle}
										itemKey={values.speed}
										value={this.state.formikDefault.speed}
										//onChangeText={handleChange('sport')}
										placeholder={newPlaceholder}
										//	onValueChange={handleChange('speed')}
										onValueChange={(e) => {
											//  let val = e.nativeEvent.text;
											console.log('hh:' + e);
											e == 'pdf'
												? this.setState({
														ispdf: true
													})
												: this.setState({
														ispdf: false
													});

											this.setState((prevState) => ({
												formikDefault: {
													...prevState.formikDefault,
													speed: e
												}
											}));
										}}
										items={noeazmoon}
									/>
								</View>
								<ErrorMessage style={{ borderWidth: 1 }} errorValue={errors.speed} />
								{/* </View> */}

								{this.state.ispdf && (
									<View>
										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-evenly'
											}}
										>
											<FormButton
												onPress={openImagePickerAsync}
												buttonColor="white"
												borderColor="white"
												fontSizeb={14}
												widthb={100}
												heightb={40}
												borderRadiusb={10}
												style={{ marginTop: 0 }}
												backgroundColor="#1f9efd"
												buttonType="outline"
												loading={this.state.isSubmitting}
												title="عکس اول"
											/>
											<FormButton
												onPress={openImagePickerAsync2}
												buttonColor="white"
												borderColor="white"
												widthb={100}
												fontSizeb={14}
												heightb={40}
												borderRadiusb={10}
												style={{ marginTop: 0 }}
												backgroundColor="#1f9efd"
												buttonType="outline"
												loading={this.state.isSubmitting}
												title="عکس دوم"
											/>
											<FormButton
												onPress={openImagePickerAsync3}
												buttonColor="white"
												borderColor="white"
												widthb={100}
												fontSizeb={14}
												heightb={40}
												borderRadiusb={10}
												style={{ marginTop: 0 }}
												backgroundColor="#1f9efd"
												buttonType="outline"
												loading={this.state.isSubmitting}
												title="عکس سوم"
											/>
										</View>

										<View
											style={{
												flexDirection: 'row',
												alignItems: 'center',
												justifyContent: 'space-evenly'
											}}
										>
											<View>
												<Image
													source={{ uri: this.state.formikDefault.soal1 }}
													resizeMode="contain"
													style={{
														marginTop: 5,
														borderColor: '#ccc',
														borderWidth: 1,
														borderRadius: 15,
														height: 130,
														width: 100
													}}
												/>
												<View style={styles.imgpp}>
													{this.state.imgpgVisible && (
														<AnimatedProgressWheel
															size={35}
															width={4}
															color={'blue'}
															progress={this.state.img1pg * 100}
															backgroundColor={'#ccc'}
														/>
													)}
												</View>
											</View>
											<View>
												<Image
													resizeMode="contain"
													source={{ uri: this.state.formikDefault.soal2 }}
													style={{
														marginTop: 5,

														borderColor: '#ccc',
														borderWidth: 1,
														borderRadius: 15,
														height: 130,
														width: 100
													}}
												/>
												<View style={styles.imgpp}>
													{this.state.img2pgVisible && (
														<AnimatedProgressWheel
															size={35}
															width={4}
															color={'blue'}
															progress={this.state.img2pg * 100}
															backgroundColor={'#ccc'}
														/>
													)}
												</View>
											</View>
											<View>
												<Image
													resizeMode="contain"
													source={{ uri: this.state.formikDefault.soal3 }}
													style={{
														marginTop: 5,

														borderColor: '#ccc',
														borderWidth: 1,
														borderRadius: 15,
														height: 130,
														width: 100
													}}
												/>
												<View style={styles.imgpp}>
													{this.state.img3pgVisible && (
														<AnimatedProgressWheel
															size={35}
															width={4}
															color={'blue'}
															progress={this.state.img3pg * 100}
															backgroundColor={'#ccc'}
														/>
													)}
												</View>
											</View>
										</View>
									</View>
								)}

								<Input
									onEndEditing={(e) => {
										let val = e.nativeEvent.text;
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												time_pasokh_sec: val
											}
										}));
									}}
									keyboardType="numeric"
									value={values.time_pasokh_sec}
									onChangeText={handleChange('time_pasokh_sec')}
									errorMessage={errors.time_pasokh_sec}
									leftIcon={<Icon name="user" size={24} color="black" />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label=" مهلت پاسخگویی(ثانیه)"
									placeholder="ثانیه"
									errorStyle={styles.err}
									containerStyle={{ marginTop: 4 }}
								/>
								<Text style={[ defaultStyles.lbl16, , styles.capstyle ]}>جهت نمایش سئوالات</Text>
								<ButtonGroup
									onPress={(selectedIndex) => {
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												direction: selectedIndex
											}
										}));
									}}
									selectedIndex={parseInt(values.direction)}
									buttonStyle={[ defaultStyles.shadow, { borderRadius: 45 } ]}
									textStyle={{ fontFamily: 'iransans' }}
									buttons={[ 'راست به چپ', 'چپ به راست' ]}
									innerBorderStyle={{ borderWidth: 4, color: 'white' }}
									containerStyle={{ height: 50, borderRadius: 45 }}
								/>

								<Text style={[ defaultStyles.lbl16, , styles.capstyle ]}>ترتیب نمایش سئوالات</Text>
								<ButtonGroup
									onPress={(selectedIndex) => {
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												tartib_namayesh: selectedIndex
											}
										}));
									}}
									selectedIndex={parseInt(values.tartib_namayesh)}
									buttonStyle={[ defaultStyles.shadow, { borderRadius: 45 } ]}
									textStyle={{ fontFamily: 'iransans' }}
									buttons={[ 'درهم', 'اول تشریحی', 'اول تستی' ]}
									innerBorderStyle={{ borderWidth: 4, color: 'white' }}
									containerStyle={{ height: 50, borderRadius: 45 }}
								/>
								<Input
									onEndEditing={(e) => {
										let val = e.nativeEvent.text;
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												soal_random: val
											}
										}));
									}}
									keyboardType="numeric"
									value={this.state.soal_random}
									onChangeText={handleChange('soal_random')}
									value={values.soal_random}
									errorMessage={errors.soal_random}
									keyboardType="numeric"
									leftIcon={<Icon name="user" size={24} color="black" />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label="تعداد نمایش سئوالات به صورت رندم"
									placeholder="اختیاری"
									errorStyle={styles.err}
									containerStyle={{ marginTop: 4 }}
								/>

								<Input
									onEndEditing={(e) => {
										let val = e.nativeEvent.text;
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												payam: val
											}
										}));
									}}
									value={values.payam}
									onChangeText={handleChange('payam')}
									leftIcon={<Icon name="user" size={24} color={colors.medium} />}
									leftIconContainerStyle={styles.leftIconContainerStyle}
									labelStyle={styles.labelStyle}
									inputContainerStyle={[ styles.inputc, defaultStyles.shadow ]}
									inputStyle={styles.inputStyle}
									label=" پیام نهایی "
									placeholder=""
									value={values.payam}
									errorStyle={styles.err}
									errorMessage={errors.payam}
									containerStyle={{ borderWidth: 0 }}
								/>

								{/* <CheckBox
									style={{ flex: 1, padding: 10 }}
									onClick={() => {
										this.setState({
											isChecked: !this.state.isChecked
										});
									}}
									isChecked={this.state.isChecked}
									leftText={'CheckBox'}
								/> */}
								<Text style={[ defaultStyles.lbl16, , styles.capstyle ]}>
									نمایش نمره(بلافاصله بعد از پایان آزمون نمایش داده شود)
								</Text>
								<Switch
									style={{ marginStart: 15, transform: [ { scaleX: 1 }, { scaleY: 1 } ] }}
									trackColor={{ false: '#767577', true: defaultStyles.colors.lightblue }}
									thumbColor={values.show_nomre ? defaultStyles.colors.primary : '#f4f3f4'}
									ios_backgroundColor="#ccc"
									onValueChange={(selectedIndex) => {
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												show_nomre: selectedIndex
											}
										}));
									}}
									value={values.show_nomre == 1 ? true : false}
								/>

								<Text style={[ defaultStyles.lbl16, styles.capstyle, { marginTop: 20 } ]}>
									نمایش پاسخنامه(این گزینه را بعد از پایان آزمون فعال نمایید)
								</Text>
								<Switch
									style={{ marginStart: 15, transform: [ { scaleX: 1 }, { scaleY: 1 } ] }}
									trackColor={{ false: '#767577', true: defaultStyles.colors.lightblue }}
									thumbColor={values.namayesh_pasokh ? defaultStyles.colors.primary : '#f4f3f4'}
									ios_backgroundColor="#ccc"
									onValueChange={(selectedIndex) => {
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												namayesh_pasokh: selectedIndex
											}
										}));
									}}
									value={values.namayesh_pasokh == 1 ? true : false}
								/>

								<Text style={[ defaultStyles.lbl16, , styles.capstyle, { marginTop: 20 } ]}>
									ترتیب نمایش گزینه های سئوالات تستی به صورت رندوم
								</Text>
								<Switch
									style={{ marginStart: 15, transform: [ { scaleX: 1 }, { scaleY: 1 } ] }}
									trackColor={{ false: '#767577', true: defaultStyles.colors.lightblue }}
									thumbColor={values.G_random ? defaultStyles.colors.primary : '#f4f3f4'}
									ios_backgroundColor="#ccc"
									onValueChange={(selectedIndex) => {
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												G_random: selectedIndex
											}
										}));
									}}
									value={values.G_random == 'True' ? true : false}
								/>

								<FormButton
									fontSizeb={14}
									heightb={50}
									borderRadiusb={10}
									widthb={'100%'}
									buttonColor="#1f9efd"
									borderColor="white"
									backgroundColor="#e3f1fc"
									buttonType="outline"
									onPress={handleSubmit}
									style={{ marginTop: 40 }}
									//disabled={!isValid }
									loading={this.state.loading}
									title={this.state.butcaption}
								/>
								<View style={{ marginTop: 40, backgroundColor: '#f6fbff' }}>
									<TouchableOpacity
										style={{ backgroundColor: '#f6fbff' }}
										onPress={() => navigate('qrscanner')}
										style={styles.burgerButton}
									/>
								</View>
							</View>
						)}
					</Formik>
				</ScrollView>

				<Modal.BottomModal
					visible={this.state.bottomModalAndTitle}
					onTouchOutside={() => this.setState({ bottomModalAndTitle: false })}
					height={0.6}
					width={1}
					onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
					modalTitle={
						<ModalTitle
							style={{ fontFamily: 'iransans' }}
							title={
								this.state.modalcap +
								' ' +
								(this.state.modalcap == 'تاریخ شروع آزمون:'
									? this.state.formikDefault.shoro_namayesh
									: this.state.formikDefault.payan_namayesh)
							}
							hasTitleBar
						/>
					}
				>
					<ModalContent
						style={{
							flex: 1,
							backgroundColor: 'fff',
							borderWidth: 0
						}}
					>
						{/* <PersianCalendarPicker allowRangeSelection={true} onDateChange={this.onDateChange} /> */}

						<Calendar
							jalali={true}
							markedDates={this.state.dateSelected}
							// Initially visible month. Default = Date()

							// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined

							// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
							onDayPress={(day) => {
								this.onDateChange(day);
								//	console.log('d:' + dataJalali);
								if (this.state.modalcap == 'تاریخ شروع آزمون:') {
									this.setState({
										dateSelected: {
											[day.dateString]: { selected: true, selectedColor: '#466A8F' }
										},
										dateSelected_shoro_namayesh: {
											[day.dateString]: { selected: true, selectedColor: '#466A8F' }
										},
										bottomModalAndTitle: false
									});
								} else if (this.state.modalcap == 'تاریخ پایان آزمون:') {
									this.setState({
										dateSelected: {
											[day.dateString]: { selected: true, selectedColor: '#466A8F' }
										},
										dateSelected_payan_namayesh: {
											[day.dateString]: { selected: true, selectedColor: '#466A8F' }
										},
										bottomModalAndTitle: false
									});
								}
							}}
							// Handler which gets executed on day press. Default = undefined

							// Handler which gets executed on day long press. Default = undefined
							onDayLongPress={(day) => {
								console.log('selected day', day);
							}}
							// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
							monthFormat={'yyyy MM'}
							// Handler which gets executed when visible month changes in calendar. Default = undefined
							onMonthChange={(month) => {
								//console.log('month changed', month);
							}}
							// Hide month navigation arrows. Default = false
							hideArrows={false}
							// Replace default arrows with custom ones (direction can be 'left' or 'right')
							//renderArrow={(direction) => <Arrow />}
							// Do not show days of other months in month page. Default = false
							hideExtraDays={true}
							// If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
							// day from another month that is visible in calendar page. Default = false
							disableMonthChange={false}
							// If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
							firstDay={6}
							// Hide day names. Default = false
							hideDayNames={false}
							// Show week numbers to the left. Default = false
							showWeekNumbers={true}
							// Handler which gets executed when press arrow icon left. It receive a callback can go back month
							onPressArrowLeft={(substractMonth) => substractMonth()}
							// Handler which gets executed when press arrow icon left. It receive a callback can go next month
							onPressArrowRight={(addMonth) => addMonth()}
							theme={{
								backgroundColor: '#ffffff',
								calendarBackground: '#ffffff',
								textSectionTitleColor: '#b6c1cd',
								selectedDayBackgroundColor: '#00adf5',
								selectedDayTextColor: '#ffffff',
								todayTextColor: '#00adf5',
								dayTextColor: '#2d4150',
								textDisabledColor: '#d9e1e8',
								dotColor: '#00adf5',
								selectedDotColor: '#ffffff',
								arrowColor: 'orange',
								monthTextColor: 'blue',
								textDayFontFamily: 'iransans',
								textMonthFontFamily: 'iransans',
								textDayHeaderFontFamily: 'iransans',
								textMonthFontWeight: 'bold',
								textDayFontSize: 16,
								textMonthFontSize: 16,
								textDayHeaderFontSize: 16
							}}
						/>
					</ModalContent>
				</Modal.BottomModal>

				<Modalm
					style={{}}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					isVisible={this.state.isModalpikerVisible}
				>
					<View style={{ flex: 1 }}>
						{/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
						<SelectContact style={{}} selecteditm={this.state.formikDefault.selectedClass} />
					</View>
				</Modalm>

				<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
			</View>
		);
	}
}

export default examAdd;
const styles = StyleSheet.create({
	imgpp: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		borderWidth: 0,
		left: 0,
		top: 0,
		height: '100%',
		width: '100%',
		position: 'absolute'
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 0,
		paddingBottom: 0,
		borderRadius: 25
	},
	capstyle: { paddingStart: 25, textAlign: 'left', fontSize: 13, color: colors.medium },
	inputIOS: {
		fontSize: 38,
		paddingVertical: 12,
		paddingHorizontal: 10,
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 4,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 8,
		borderWidth: 0.5,
		borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	err: {
		color: 'red',
		fontFamily: 'iransans',
		textAlign: 'right'
	},
	inputStyle: {
		height: 45,
		textAlign: 'center',
		fontFamily: 'iransans',
		color: colors.primary
	},
	inputc: {
		height: 52,
		borderBottomWidth: 0,
		backgroundColor: 'white',

		borderRadius: 45
	},
	labelStyle: {
		textAlign: 'left',
		color: colors.medium,
		fontSize: 14,
		marginStart: 10,

		fontFamily: 'iransans'
	},
	leftIconContainerStyle: {
		borderWidth: 1,
		borderRadius: 45,
		width: 40,
		height: 40,
		marginLeft: 6
		//color: colors.medium
	},
	formContainer: {
		flex: 1,
		marginTop: 10,
		padding: 25,
		backgroundColor: '#f6fbff'
	},
	input: {
		//borderColor: 'red',
		borderRadius: 14,
		marginTop: 0,
		textAlign: 'center',
		fontSize: 20
	}
});
