import React, { Component, useRef } from 'react';
import { Input, ButtonGroup } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import TimePicker from 'react-native-24h-timepicker';
import { Ionicons } from '@expo/vector-icons';
//import Eform from './eforms';

import * as ImageManipulator from 'expo-image-manipulator';

import { WebView } from 'react-native-webview';
import { FlatGrid } from 'react-native-super-grid';

import ProgressCircle from 'react-native-progress-circle';
import { FontAwesome } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';
import MultiSelect from 'react-native-multiple-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { userInfo, getHttpAdress, encrypt } from '../../../components/DB';
import RadioItem from '../../../components/radioItem';
import Loading from '../../../components/loading';
import moment from 'moment-jalaali';

var Buffer = require('buffer/').Buffer;
import { withNavigation } from 'react-navigation';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import Modal from 'react-native-modalbox';
import update from 'immutability-helper';

import * as ImagePicker from 'expo-image-picker';
import { Chip } from 'react-native-paper';
import GLOBAL from '../../global';
import Modalm from 'react-native-modal';
import defaultStyles from '../../../config/styles';
import { actions, getContentCSS, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import {

	TextInput,
	Text,
	Button,
	Alert,
	View,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	Keyboard,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Switch,
	Linking
} from 'react-native';
import { LocaleConfig, Calendar } from 'react-native-calendars-persian';
import * as yup from 'yup';
import { compose } from 'recompose';
import { Dimensions, Image, ActivityIndicator } from 'react-native';
//import SelectContact from '../../selectContact';
import Uploadimg from '../../../components/uploadimg';
import { Snackbar } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { handleTextInput, withPickerValues, Formik } from 'formik';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import NetInfo from '@react-native-community/netinfo';
import * as Network from 'expo-network';
import FormButton from '../../../component/FormButton';

import DropdownAlert from 'react-native-dropdownalert';
import { TextField, FilledTextField, OutlinedTextField } from '@softmedialab/react-native-material-textfield';
import * as Application from 'expo-application';
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
//import useResult from '../hooks/useResult';
//import { getUniqueId, getManufacturer } from 'react-native-device-info';
import Database from '../../../components/database';
import ErrorMessage from '../../../component/ErrorMessage';
import i18n from 'i18n-js';

import reactNativeExtraDimensionsAndroid from 'react-native-extra-dimensions-android';
import { HelloChandu, _getcount, getQuery, _query, _fetch, _connected, toFarsi } from '../../../components/DB';
import { ScrollView } from 'react-native-gesture-handler';
import { CallModal, CallModalUtil, connectCallModal } from '@fugood/react-native-call-modal';
import { Global } from '@jest/types';

i18n.locale = 'fa';
i18n.fallbacks = true;
let connected = false;
let ip = '';
let macaAress = '';
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
		marginTop: 8,
		fontSize: 14,
		fontFamily: 'iransans',
		//textAlign: 'center',
		color: 'black'
	},
	placeholderColor: 'white',
	underline: { borderTopWidth: 0 },

	iconContainer: {
		top: 5,
		textAlign: 'right',
		marginRight: Platform.OS === 'ios' ? 10 : -30,
		borderWidth: 0,
		paddingTop: 10,
		paddingBottom: 10
	}
	//icon: {
	// position: 'absolute',
	// backgroundColor: 'transparent',
	// borderTopWidth: 5,
	// borderTopColor: '#00000099',
	// borderRightWidth: 5,
	// borderRightColor: 'transparent',
	// borderLeftWidth: 5,
	// borderLeftColor: 'transparent',
	// width: 0,
	// height: 0,
	// top: 20,
	// right: 15
	//}
};

const { buildYup } = require('json-schema-to-yup');

const newPlaceholder = {
	label: 'انتخاب کنید',
	value: ''
};

class eforms2 extends Component {
	richText = React.createRef();
	/* #region constructor */
	constructor(props) {
		super(props);
		this.Extra = props.Extra;
		this.xeformsID = props.eformId;
		this.goBack = props.goBack;
		this.instanseID = props.instanseID;
		this.stdID = props.stdID;
		this.isAdminForms = props.isAdminForms;
		this.referer = props.referer;

		//this.xform = props.eformId;

		//this.isAdminForms = '';
		this.richHTML = '';
		this.state = {
			showMenu: true,
			activeStudentList: '',
			dateSelected_shoro_namayesh: false,
			uploadDir: global.adress.replace(':8080', '') + '' + ':8181' + '/api/upload',

			butcaption: 'ثبت',
			formstruct1: [
				{
					name: 'افزودن گالری(استوری)',
					direction: 'rtl',
					fields: [
						{
							id: 'title',
							placeholder: 'عنوان را کوتاه انتخاب کنید',
							caption: 'عنوان گالری(استوری)',
							type: 'textbox',
							keyboardType: 'numberic'
						},
						{
							mobileurl: 'image1',
							multipart: 'image1multipart',
							progress: 'image1pg',
							progressvisible: 'image1pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس را انتخاب کنید',
							type: 'image'
						},
						{
							mobileurl: 'image2',
							multipart: 'image2multipart',
							progress: 'image2pg',
							progressvisible: 'image2pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس را انتخاب کنید',
							type: 'image'
						},
						{
							mobileurl: 'image3',
							multipart: 'image3multipart',
							progress: 'image3pg',
							progressvisible: 'image3pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس را انتخاب کنید',
							type: 'image'
						},
						{
							mobileurl: 'image4',
							multipart: 'image4multipart',
							progress: 'image4pg',
							progressvisible: 'image4pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس را انتخاب کنید',
							type: 'image'
						},
						{
							mobileurl: 'image5',
							multipart: 'image5multipart',
							progress: 'image5pg',
							progressvisible: 'image5pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس را انتخاب کنید',
							type: 'image'
						},
						{
							mobileurl: 'image6',
							multipart: 'image6multipart',
							progress: 'image6pg',
							progressvisible: 'image6pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس را انتخاب کنید',
							type: 'image'
						},
						{
							id: 'aya',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'فعال',
							type: 'checkbox'
						}
					]
				},
				{
					$schema: 'http://json-schema.org/draft-07/schema#',
					$id: 'http://example.com/person.schema.json',
					title: 'Person',
					description: 'A person',
					type: 'object',
					properties: {
						title: {
							description: 'Name of the person',
							type: 'string'
						},
						image1: {
							description: 'Name of the person',
							type: 'string'
						}
					},
					required: [ 'title', 'image1' ]
				},
				{
					// for error messages...
					errMessages: {
						title: {
							required: 'عنوان گالری را وارد کنید'
						},
						image1: {
							required: 'عکس را انتخاب کنید'
						}
					}
				}
			],
			//formikDefault: {},
			formikDefault1: {
				title: ''
				// image1: '',
				// image1multipart: '',
				// image1pgvisible: false,
				// image1pg: 0
			},
			selectedParticipate: 'انتخاب گیرندگان',
			isDatePickerVisible: false,
			isSubmitting: false,
			retUser: [],
			messagegrp: [],
			isModalpikerVisible: false
		};
	}
	static navigationOptions11 = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerTitle: ' ',
			headerRight: () => null,

			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransans'
				//color: colorhead
			}
		};
	};

	fileUpload1(url) {
		console.log(this.state.uploadDir);
		console.log(url);

		const xhr = new XMLHttpRequest();
		xhr.open('POST', this.state.uploadDir);
		xhr.onload = () => {
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					file1: url,
					file1base64: xhr.response
				},
				file1pgVisible: false
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
			file1pgVisible: true
		});

		// 7. track upload progress
		if (xhr.upload) {
			// track the upload progress
			xhr.upload.onprogress = ({ total, loaded }) => {
				const uploadProgress = loaded / total;
				console.log(uploadProgress);
				this.setState({
					file1pg: uploadProgress
				});
			};
		}
	}

	onDateChange(day) {
		//console.log(this.state.shoro_namayesh);

		let mydate = new Date(day.dateString);
		var dataJalali = moment(mydate).format('jYYYY/jMM/jDD');
		if (true) {
			this.setState((prevState) => ({
				ddd: toFarsi(dataJalali),
				formikDefault: {
					...prevState.formikDefault,
					[this.state.activedate]: toFarsi(dataJalali)
				}
				//shoro_namayesh: toFarsi(dataJalali)
			}));
		}

		// if (this.state.modalcap == 'تاریخ پایان آزمون:') {
		// 	this.setState((prevState) => ({
		// 		formikDefault: {
		// 			...prevState.formikDefault,
		// 			payan_namayesh: toFarsi(dataJalali)
		// 		}
		// 	}));
		// }

		//Formik.name = 'sd';
	}

	// static navigationOptions = ({ navigation, screenProps }) => ({
	// 	headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
	// 	headerTitle: navigation.state.params ? navigation.state.params.headerTitle : null
	// });
	componentDidMount() {
		// this.props.navigation.setParams({
		// 	headerTitle: '',
		// 	headerRight: false && (
		// 		<View style={{ flexDirection: 'row' }}>
		// 			<TouchableOpacity
		// 				onPress={() => {
		// 					this.setState({ formedit: true });
		// 				}}
		// 			>
		// 				<FontAwesome name="plus" size={25} color="#000" style={{ marginRight: 10 }} />
		// 			</TouchableOpacity>
		// 			<FontAwesome name="file-excel-o" size={25} color="#000" style={{ marginRight: 10 }} />

		// 			<TouchableOpacity />
		// 		</View>
		// 	)
		// });
		//alert(this.xeformsID);
		const { navigation } = this.props;
		if (this.xeformsID) {
			///	alert();
			this.eformsID = this.xeformsID;
			//this.Extra = this.Extra;
		} else {
			this.eformsID = navigation.getParam('eformsID');

			this.instanseID = navigation.getParam('instanseID');

			this.stdID = navigation.getParam('stdID');

			this.mode = navigation.getParam('mode');
			this.isAdminForms = navigation.getParam('isAdminForms');
			this.parentid = navigation.getParam('parentid');
		}
		//alert(this.parentid);
		//this.eformsID = 0;
		//		alert()

		if (this.isAdminForms == undefined) this.isAdminForms = '';

		//alert(isAdminForms);
		this.setState({
			//	formikDefault: this.props.formikDefault,
			formid: this.eformsID,
			fileSize: 5000000
		});
		//alert(this.eformsID);

		//if (global.messageEditID != '') {
		if (true) {
			this.setState({
				isEditing: true
			});
			console.log('sdsdsdsdsdsds');

			this.loadAPI(this.eformsID);
			//if (isAdminForms == '') {
			this.loadAPI_content(this.eformsID);
			//}
		}
	}

	loadAPI_content = async (eformsID) => {
		//alert();
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

		//this.setState({ loading: true });

		const { navigation } = this.props;
		//const eformsID = navigation.getParam('eformsID');
		const instanseID = navigation.getParam('instanseID');
		const stdID = navigation.getParam('stdID');
		this.isAdminForms = navigation.getParam('isAdminForms');

		if (this.isAdminForms == undefined) this.isAdminForms = '';

		let insID = '';
		let sID = '';

		if (this.instanseID) {
			insID = this.instanseID;
			sID = this.stdID;
			this.setState(
				{
					//**--saveenable: true
				}
			);
		}

		let param = userInfo();
		//alert(this.isAdminForms);
		let uurl =
			global.adress +
			'/pApi.asmx/getFormId?fId=' +
			eformsID +
			'&p=' +
			param +
			'&dmn=' +
			global.adress +
			'&stdid=' +
			sID +
			'&instanceid=' +
			insID +
			'&isadminform=' +
			//this.isAdminForms +
			'true' +
			'&mode=' +
			this.mode +
			'&extra=' +
			this.Extra;
		////////console.log(uurl);
		//alert();
		try {
			uurl = encrypt(uurl);
			//////console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				//alert(retJson[0].selectedClass[0].username);
				if (Object.keys(retJson).length == 0) {
					//alert();
					this.setState({
						formikDefault: []

						//isEditing: false
						//isEditing: false
					});
					return;
				}
				// this.setState({
				// 	formikDefault: retJson,

				// 	isEditing: false
				// });
				//alert(retJson[0]);
				this.setState((prevState) => ({
					formikDefault: retJson[0],

					isEditing: false
				}));

				this.setState((prevState) => ({
					formikDefault: {
						...prevState.formikDefault,
						parentid: this.parentid
					}
				}));

				//console.log(this.state.formikDefault);

				//.log('ddd' + retJson[0]);
				//alert('dddd');
				//alert(retJson[0]);

				// if (this.state.formikDefault.img1 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			img1: getHttpAdress() + 'media/' + this.state.formikDefault.img1
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.img1 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			img1: getHttpAdress() + 'media/' + this.state.formikDefault.img2
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.img3 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			img3: getHttpAdress() + 'media/' + this.state.formikDefault.img3
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.img4 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			img4: getHttpAdress() + 'media/' + this.state.formikDefault.img4
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.file1 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			file1: getHttpAdress() + 'media/' + this.state.formikDefault.file1
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.file2 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			file2: getHttpAdress() + 'media/' + this.state.formikDefault.file2
				// 		}
				// 	}));
				// }

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
	loadAPISTD = async (txt) => {
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
		let uurl = global.adress + '/pApi.asmx/getStdName?p=' + param + '&txt=' + txt;
		////////console.log(uurl);
		//console.log('sdsdsdsdsdsds');

		try {
			uurl = encrypt(uurl);
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

				const elementsIndex = this.state.formstruct[0].fields.findIndex(
					(element) => element.id == this.state.activeStudentList
				);
				//	alert(elementsIndex);
				let newArray = [ ...this.state.formstruct ];
				//console.log(newArray[0].fields);

				newArray[0].fields[elementsIndex] = {
					...newArray[0].fields[elementsIndex],
					options: retJson
				};

				this.setState({
					formstruct: newArray
				});
				//	console.log(newArray);
				//	console.log(retJson);
				// this.setState((prevState) => ({
				// 	formstruct: retJson,

				// 	isEditing: false
				// }));
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState(
				{
					//loading: false
				}
			);
			return;
		}
	};
	loadAPI = async (eformsID) => {
		console.log('sdsdsdsdsdsds');
		const { navigation } = this.props;
		const instanseID = navigation.getParam('instanseID');

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

		//this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getForm?fId=' +
			this.eformsID +
			'&p=' +
			param +
			'&isAdminForms=' +
			this.isAdminForms +
			'&instanceid=' +
			this.instanseID +
			'&mode=' +
			this.mode +
			'&extra=' +
			this.Extra;
		////////console.log(uurl);
		//	console.log('sdsdsdsdsdsds');

		try {
			uurl = encrypt(uurl);
			//console.log(uurl);
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
					formstruct: retJson,

					isEditing: false
				}));

				//alert(retJson[0]);

				// if (this.state.formikDefault.img1 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			img1: getHttpAdress() + 'media/' + this.state.formikDefault.img1
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.img1 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			img1: getHttpAdress() + 'media/' + this.state.formikDefault.img2
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.img3 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			img3: getHttpAdress() + 'media/' + this.state.formikDefault.img3
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.img4 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			img4: getHttpAdress() + 'media/' + this.state.formikDefault.img4
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.file1 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			file1: getHttpAdress() + 'media/' + this.state.formikDefault.file1
				// 		}
				// 	}));
				// }

				// if (this.state.formikDefault.file2 != '');
				// {
				// 	this.setState((prevState) => ({
				// 		formikDefault: {
				// 			...prevState.formikDefault,
				// 			file2: getHttpAdress() + 'media/' + this.state.formikDefault.file2
				// 		}
				// 	}));
				// }

				//alert(this.state.formikDefault.selectedClass);

				//	console.log('seeeexy:' + this.state.formikDefault[0].name);
			}
		} catch (e) {
			console.log(e.message);
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false
			});
			return;
		}
	};
	handleChange(html) {
		this.richHTML = html;
		this.setState({ a: Math.random });
	}
	loadAPIFill = async (fill, id) => {
		//console.log('sdsdsdsdsdsds');
		const { navigation } = this.props;
		const instanseID = navigation.getParam('instanseID');
		const eformsID = navigation.getParam('eformsID');
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

		//this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getFormFill?fId=' +
			this.eformsID +
			'&p=' +
			param +
			'&isAdminForms=' +
			this.isAdminForms +
			'&instanceid=' +
			this.instanseID +
			'&fill=' +
			fill +
			'&id=' +
			id +
			'&extra=' +
			this.Extra;
		////////console.log(uurl);
		//console.log('sdsdsdsdsdsds');

		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				//alert(retJson[0].selectedClass[0].username);
				// if (Object.keys(retJson).length == 0) {
				// 	alert();
				// 	this.setState(
				// 		{
				// 			//isEditing: false
				// 		}
				// 	);
				// 	return;
				// }
				var elem = fill.split('^');

				const elementsIndex = this.state.formstruct[0].fields.findIndex((element) => element.id == elem[5]);
				//	alert(elementsIndex);
				let newArray = [ ...this.state.formstruct ];
				//console.log(newArray[0].fields);

				newArray[0].fields[elementsIndex] = {
					...newArray[0].fields[elementsIndex],
					options: retJson
				};

				this.setState({
					formstruct: newArray
				});
				// console.log(newArray);
				// this.setState((prevState) => ({
				// 	formstruct: retJson,

				// 	isEditing: false
				// }));
			}
		} catch (e) {
			//	console.log('err999999');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false
			});
			return;
		}
	};

	onConfirm(hour, minute) {
		this.setState((prevState) => ({
			sh_hour: hour,
			sh_min: minute,
			formikDefault: {
				...prevState.formikDefault,
				[this.state.activeTime]: toFarsi(`${hour}:${minute}`)
			}
		}));
		this.TimePicker.close();
	}
	apiPost = async (jsonstr) => {
		/* #region  check internet */
		//alert();
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.setState({ issnackin: true });
			return;
		}

		/* #endregion */

		this.setState({ loading: true, savepress: true, saveenable: true });
		let param = userInfo();
		//global.examID = '26668';
		//global.adress = 'http://192.168.1.12:8080/';

		let newArray = this.state.formstruct.map((item1) => {
			if (item1.fields)
				item1.fields.map((qq) => {
					if (qq.type == 'editor') {
						let now = qq.id;
						//	console.log(qq.id);

						this['sectionItem' + now].injectJavaScript(
							'window.ReactNativeWebView.postMessage(JSON.stringify({type: "save", message : aaa(),id:"' +
								now +
								'"}));'
							//'window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : aaa()}));'
						);
					}
				});
		});

		let uurl =
			global.adress +
			'/pApi.asmx/setForm?p=' +
			param +
			'&json=' +
			jsonstr +
			'&formid=' +
			this.state.formid +
			'&isAdminForms=true' +
			this.isAdminForms;
		////////console.log(uurl);
		//try {
		uurl = encrypt(uurl);
		//console.log(uurl);
		const response = await fetch(uurl);
		if (response.ok) {
			let retJson = await response.json();
			if (Object.keys(retJson).length == 0) {
				this.setState({
					loading: false,
					savepress: false,
					saveenable: false
				});
				return;
			}
			//alert(retJson.msg);
			this.setState({
				//fulldata: retJson,
				//** */	butcaption: retJson.msg,
				loading: false,
				savepress: false,
				saveenable: true
			});
			if (this.referer == 'mounth') {
				//alert();
				this.setState({
					butcaption: retJson.msg
				});

				GLOBAL.monthgrade.setState({
					maindata: update(GLOBAL.monthgrade.state.maindata, {
						[global.fix_col]: {
							days: {
								[global.fix_row]: { $set: { grade: retJson.id, day: '' } }
							}
						}
					})
				});
				//GLOBAL.closeModal2();
				GLOBAL.monthgrade.refs.modal1.close();
			}

			// GLOBAL.fixedtable.setState({
			// 	maindata: update(GLOBAL.fixedtable.state.maindata, {
			// 		[global.fix_col]: { days: { [global.fix_row]: { disc: { $splice: [ [ 0, 1 ] ] } } } }
			// 	})
			// });

			if (this.referer == 'sheet') {
				GLOBAL.fixedtable.setState({
					maindata: update(GLOBAL.fixedtable.state.maindata, {
						[global.fix_col]: {
							days: {
								[global.fix_row]: { disc: { $set: retJson } }
							}
						}
					})
				});
				//GLOBAL.closeModal2();
				GLOBAL.fixedtable.refs.modal2.close();
			}

			if (this.goBack) {
				if (this.goBack == 'true')
					setTimeout(async () => {
						const { navigation } = this.props;
						navigation.goBack(null);
					}, 1000);
			} else {
				setTimeout(async () => {
					const { navigation } = this.props;
					navigation.goBack(null);
				}, 1000);
			}
			//alert(retJson[0].id_azmoon);

			// const elementsIndex = this.state.answers.findIndex((element) => element.id == '125-7');
			// let newArray = [ ...this.state.answers ];
			// newArray[elementsIndex] = { ...newArray[elementsIndex], pasokh: '666' };
			// this.setState({
			// 	answers: newArray
			// });

			// console.log(this.state.answers);
		}
		// } catch (e) {
		// 	console.log('err9999999');
		// 	//this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
		// 	this.setState({
		// 		loading: false,
		// 		savepress: false,
		// 		saveenable: false
		// 	});
		// 	return;
		// }
	};

	handleimgpress = () => {};
	handleDownload = (data) => {
		//alert(data);
		Linking.openURL(data);
		return;
		if (data.split('.')[data.split('.').length - 1].toLowerCase() == 'jpg') {
			//const { navigate } = this.props.navigation;
			//navigate('Login');
		}
		if (data.split('.')[data.split('.').length - 1].toLowerCase() == 'pdf') {
			Linking.openURL(data);
			//getHttpAdress() + 'media/' +
		}
	};
	handeleUploadfile = async ([ item ]) => {
		if (this.state.formikDefault[item.mobileurl] != '' && this.state.formikDefault[item.mobileurl] != undefined) {
			if (this.state.formikDefault[item.mobileurl].toString().startsWith('http')) {
				//alert('ss');
				this.handleDownload(this.state.formikDefault[item.mobileurl]);
				return;
			}
		}
		//try {
		let url = '';
		const picked = await DocumentPicker.getDocumentAsync({
			type: '*/*',
			copyToCacheDirectory: false
		});
		if (picked.type === 'cancel') {
			return;
		} else if (picked.type === 'success') {
			//console.log('pp:' + picked.size);
			const { name } = picked;
			const { size } = picked;
			if (size > this.state.formikDefault[item.maxSize]) {
				//	console.log('filesize err:');

				// this.setState({
				// 	fileSizeErr:
				// 		'حجم فایل بیشتر از میزان مجاز است'
				// });

				this.setState((prevState) => ({
					formikDefault: {
						...prevState.formikDefault,
						[item.fileSizeErr]: 'حجم فایل بیشتر از میزان مجاز است'
					},
					img1pgVisible: false
				}));

				return;
			}
			//	console.log('fileUri');
			const fileUri = `${FileSystem.documentDirectory}${name}`;
			//	console.log('salam:' + fileUri);

			if (Platform.OS === 'ios') {
				console.log(picked.uri);
				console.log(fileUri);
				url = picked.uri;
				//	const pickerResult = await FileSystem.downloadAsync(picked.uri, fileUri);
				//	console.log(pickerResult);
				//**this.fileUpload1(picked.uri, document);
			} else {
				const pickerResult = {
					name: picked.name,
					uri: picked.uri
				};
				url = picked.uri;

				//console.log(pickerResult);
				//console.log(document);

				//this.fileUpload1(pickerResult.uri);
			}
			url = uri;
			//console.log('start!' + url);
			//this.fileUpload1(pickerResult, document);

			const xhr = new XMLHttpRequest();
			// xhr.open('POST', global.adress.replace(':8080', '') + '' + ':8181' + '/api/upload');
			//	xhr.open('POST', global.adress.replace(':8080', '') + '' + ':8181' + '/api/upload');
			// xhr.open(
			// 	'POST',
			// 	global.adress.replace('/papi', ':8181') +
			// 		'' +
			// 		'' +
			// 		'/api/upload'
			// );
			//xhr.open('POST', global.adress.replace('/papi', ':8181') + '' + '' + '/api/upload');

			xhr.open('POST', global.adress.replace('/papi', ':8181') + '' + '' + '/api/upload');
			//console.log('startmajid!');
			xhr.onload = () => {
				//	console.log('end!');

				console.log(xhr.response);

				this.setState((prevState) => ({
					formikDefault: {
						...prevState.formikDefault,
						[item.mobileurl]: url,
						[item.multipart]: xhr.response,
						[item.progressvisible]: false
					}
					//file1pgVisible: false
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
			console.log('start send!');

			xhr.send(formData);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					[item.progressvisible]: true
				}
			}));

			// this.setState({a
			// 	file1pgVisible: true
			// });

			// 7. track upload progress
			if (xhr.upload) {
				// track the upload progress
				xhr.upload.onprogress = ({ total, loaded }) => {
					const uploadProgress = loaded / total;
					//console.log(uploadProgress);
					// this.setState({
					// 	file1pg: uploadProgress
					// });

					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							[item.progress]: uploadProgress
						}
					}));
				};
			}
		} else {
			return;
		}
		// } catch (error) {
		// 	this.setState({
		// 		success: false,
		// 		successModVisible: true,
		// 		successLineText: `We can't support this file.!`
		// 	});
		// }
	};

	handeleDeleteM = ([ item ]) => {
		console.log(item);
		if (true) {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					[item.mobileurl]: undefined,
					[item.multipart]: undefined
					//[multi]: ''
				}
				//img1pgVisible: false
			}));
		}
	};

	showDatePicker = () => {
		this.setState({ isDatePickerVisible: true });
	};

	hideDatePicker = () => {
		this.setState({ isDatePickerVisible: false });
	};

	handleConfirm = (date) => {
		console.warn('A date has been picked: ', date);
		this.hideDatePicker();
	};
	// editorInitializedCallback() {
	// 	this.richText.registerToolbar(function(items) {
	// 		// console.log('Toolbar click, selected items (insert end callback):', items);
	// 	});
	// }

	_onMessage = (event) => {
		//console.log('_onMessage', JSON.parse(event.nativeEvent.data));
		const res = JSON.parse(event.nativeEvent.data);
		if (res.type === 'im.ready') {
			//alert(res.ref);
			let rrr = res.ref;
			this['sectionItem' + rrr].injectJavaScript(
				'window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : bbb("' +
					(this.state.formikDefault[rrr] != undefined ? this.state.formikDefault[rrr] : '') +
					'")}));'
			);
			//	alert('button clicked');
		}
		if (res.type === 'save') {
			if (res.message != '<p><br data-mce-bogus="1"></p>')
				this.setState((prevState) => ({
					formikDefault: {
						...prevState.formikDefault,
						[res.id]: res.message
					}
				}));
		}
	};
	render() {
		let test = [
			{ name: 'حاضر', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'غایب', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'تاخیر', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'ثبت ارزشیابی', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: 'ثبت نمره', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: 'ثبت عکس', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' }
		];
		//const { otherParam } = route.params;
		// if (this.props.formstruct.length == undefined || !this.state.formikDefault)
		// 	return (
		// 		<View>
		// 			<Text>Loading</Text>
		// 		</View>
		// 	);

		if (!this.state.formstruct || !this.state.formikDefault) return <Loading />;
		//alert('sexy');
		const yupSchema = buildYup(this.state.formstruct[1], this.state.formstruct[2]);
		//	alert(yupSchema);
		//	return;
		GLOBAL.dynamic = this;
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;

		let openImage1PickerAsync = async (tt) => {
			//console.log(tt);
			let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
			if (permissionResult.granted === false) {
				alert('Permission to access camera roll is required!');
				return;
			}
			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,

				allowsMultipleSelection: true
			});
		};

		const { navigate } = this.props.navigation;

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
		//console.log(Object.keys(this.state.formikDefault).length);
		//console.log(this.props.formstruct[1]);
		//alert(this.state.formikDefault.title);
		if (this.state.formikDefault.title == undefined)
			return (
				<View style={styles.container}>
					<View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
						<ActivityIndicator size="small" color="#000" />
					</View>
				</View>
			);
		//** */	const { bindSubmitForm } = this.props;

		return (
			<View style={{ backgroundColor: '#f6fbff' }}>
				<ScrollView>
					<Formik
						// innerRef={formRef}
						style={{ backgroundColor: 'red' }}
						initialValues={this.state.formikDefault}
						enableReinitialize={true}
						validateOnBlur={false}
						//isInitialValid={() => yupSchema.isValidSync(this.state.formikDefault)}
						validateOnChange={false}
						onSubmit={(values) => {
							//**let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');
							//**this.apiPost(JSON.stringify(objJsonB64));
							//alert(JSON.stringify(values));
							setTimeout(() => {
								//console.log(JSON.stringify(values));
								//	return;
								let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');

								this.apiPost(JSON.stringify(objJsonB64));
							}, 1);

							//}, 1000);//
							//return;
						}}
						validationSchema={yupSchema}
					>
						{({
							formikProps,
							values,
							handleChange,
							isSubmitting,
							errors,
							setFieldTouched,
							touched,
							validateForm,
							isValid,
							handleSubmit,
							resetForm,
							submitForm
						}) => {
							//**bindSubmitForm(submitForm);
							return (
								<View style={[ styles.formContainer, { paddingRight: 10, paddingLeft: 10 } ]}>
									<Text style={[ defaultStyles.lblformcaption ]}>
										{this.state.formstruct[0].name}
									</Text>
									{this.state.formstruct[0].fields.map((item) => {
										if (item.type == 'editor')
											return (
												<React.Fragment key={item.id}>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingEnd: 20,
																paddingStart: 20,

																paddingBottom: 0,
																fontSize: 13,
																color: 'black'
															}
														]}
													>
														{item.caption}
													</Text>

													{/* <Button
														title={item.id}
														onPress={() => {
															let newArray = this.state.formstruct.map((item1) => {
																if (item1.fields)
																	item1.fields.map((qq) => {
																		if (qq.type == 'editor') {
																			let now = qq.id;
																			//	console.log(qq.id);

																			this['sectionItem' + now].injectJavaScript(
																				'window.ReactNativeWebView.postMessage(JSON.stringify({type: "save", message : aaa(),id:"' +
																					now +
																					'"}));'
																				//'window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : aaa()}));'
																			);
																		}
																	});
															});

															//alert(values[item.id]);
															// this[`sectionItem${item.id}`].injectJavaScript(
															// 	'window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : bbb("' +
															// 		values[item.id] +
															// 		'")}));'
															// );
															// this.webview.injectJavaScript(
															// 	'window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : aaa()}));'
															// );
															// this.setState({
															// 	jsCode:
															// 		"window.ReactNativeWebView.postMessage(JSON.stringify({type: 'click', message : 'ok'}));"
															// });
														}}
													/> */}
													<WebView
														// ref={(ref) => {
														// 	this.webview = ref;
														// }}
														bounces={false}
														ref={(view) => (this[`sectionItem${item.id}`] = view)}
														javaScriptEnabled={true}
														source={{
															//	uri: 'http://192.168.1.15/editor.aspx?ref=' + item.id
															uri:
																global.adress.replace('papi', '') +
																'editor.aspx?ref=' +
																item.id
														}}
														style={{
															flex: 1,
															height: 300
														}}
														originWhitelist={[ '*' ]}
														javaScriptEnabledAndroid={true}
														//injectedJavaScript={jsCode}
														originWhitelist={[ '*' ]}
														javaScriptEnabledAndroid={true}
														//injectedJavaScript={this.state.jsCode}
														onMessage={this._onMessage}
													/>
													<ErrorMessage
														style={{ borderWidth: 1 }}
														errorValue={errors[item.id]}
													/>
												</React.Fragment>
											);
										if (item.type == 'textbox')
											return (
												<React.Fragment key={item.id}>
													<View style={{ flexDirection: 'row' }}>
														{/* <Icon
															style={{ marginStart: 15 }}
															name="pencil"
															size={20}
															color={defaultStyles.colors.medium}
														/> */}
														<Text
															style={[
																defaultStyles.lbl16,
																,
																styles.capstyle,
																{
																	textAlign: 'left',
																	paddingEnd: 20,
																	paddingStart: 20,

																	paddingBottom: 0,
																	fontSize: 13,
																	color: 'black'
																}
															]}
														>
															{item.caption}
														</Text>
													</View>

													{/* <RichToolbar
														actions={[
															actions.setBold,
															actions.setItalic,
															actions.insertBulletsList,
															actions.insertOrderedList,
															actions.insertImage,
															'customAction'
														]}
														style={[ styles.richBar, styles.richBarDark ]}
														flatContainerStyle={styles.flatStyle}
														editor={this.richText}
														disabled={false}
														selectedIconTint={'#2095F2'}
														disabledIconTint={'#bfbfbf'}

														//	onPressAddImage={that.onPressAddImage}
														//	onInsertLink={that.onInsertLink}
													/> */}
													{/* <RichEditor
														initialFocus={true}
														//disabled={false}
														//editorStyle={contentStyle} // default light style
														ref={this.richText}
														editorInitializedCallback={this.editorInitializedCallback}
														style={styles.rich}
														placeholder={'please input content'}
														initialContentHTML={'initHTML'}
														//	editorInitializedCallback={that.editorInitializedCallback}
														//onChange={this.handleChange}
														// onHeightChange={that.handleHeightChange}
														// onPaste={that.handlePaste}
														// onKeyUp={that.handleKeyUp}
														// onKeyDown={that.handleKeyDown}
														//onMessage={this.handleMessage}
														// onFocus={that.handleFocus}
														// onBlur={that.handleBlur}
														// pasteAsPlainText={true}
													/> */}
													{/* <RichToolbar
														editor={that.richText}
														actions={[
															actions.setBold,
															actions.setItalic,
															actions.insertBulletsList,
															actions.insertOrderedList,
															actions.insertImage,
															'customAction'
														]}
														iconMap={{
															customAction: customIcon
														}}
														customAction={this.handleCustomAction}
													/> */}
													<Input
														key={item.id}
														multiline={item.multiline ? true : false}
														numberOfLines={item.multiline ? 1 : 4}
														autoCorrect={false}
														keyboardType={item.keyboardType}
														value={values[item.id]}
														onChangeText={handleChange(item.id)}
														onEndEditing={(e) => {
															let ddd = e.nativeEvent.text;

															// var someProperty = { ...this.state.formstruct[3] };
															// someProperty[item.id] = ddd;
															// this.setState({ someProperty });
															// console.log(this.state.formstruct[3]);

															this.setState((prevState) => ({
																formikDefault: {
																	...prevState.formikDefault,
																	[item.id]: ddd
																}
															}));
														}}
														leftIcon={
															item.multiline ? null : (
																<Icon
																	name="pencil"
																	size={24}
																	color={defaultStyles.colors.medium}
																/>
															)
														}
														leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
														labelStyle={defaultStyles.labelStyle}
														inputContainerStyle={[
															defaultStyles.inputc,
															defaultStyles.shadow,
															item.multiline ? { height: 150, borderRadius: 15 } : {}
														]}
														inputStyle={[
															defaultStyles.inputStyle1,
															{
																fontFamily: 'iransans',
																paddingStart: 5,
																direction:
																	item.direction != '' && item.direction != undefined
																		? item.direction
																		: 'rtl',
																textAlign:
																	item.textAlign != '' && item.textAlign != undefined
																		? item.textAlign
																		: 'right'
															},
															item.multiline
																? {
																		padding: 10,

																		height: 150
																	}
																: null
														]}
														//label={item.caption}
														placeholder={item.placeholder}
														errorStyle={defaultStyles.err}
														errorMessage={errors[item.id]}
														containerStyle={{ borderWidth: 0 }}
													/>
												</React.Fragment>
											);
										else if (item.type == 'time')
											return (
												<View>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingEnd: 20,
																paddingStart: 20,

																paddingBottom: 0,
																fontSize: 13,
																color: 'black'
															}
														]}
													>
														{item.caption}
													</Text>
													{/* <DateTimePickerModal
														isVisible={this.state.isDatePickerVisible}
														mode="time"
														date={new Date(0, 0, 0, 17, 49, 60, 0)}
														locale="fa_IR"
														onConfirm={this.handleConfirm}
														onCancel={this.hideDatePicker}
													/> */}

													<Input
														onFocus={() => {
															this.TimePicker.open();
															this.setState({ activeTime: item.id });
															Keyboard.dismiss();
														}}
														onChangeText={handleChange(item.id)}
														value={values[item.id]}
														errorMessage={errors[item.id]}
														keyboardType="numeric"
														placeholder={item.placeholder}
														// leftIcon={
														// 	<Entypo name="clock" size={23} style={styles.forward} />
														// }
														leftIcon={
															item.multiline ? null : (
																<Icon
																	name="clock-o"
																	size={34}
																	color={defaultStyles.colors.medium}
																/>
															)
														}
														leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
														labelStyle={defaultStyles.labelStyle}
														inputContainerStyle={[
															defaultStyles.inputc,
															defaultStyles.shadow,
															item.multiline ? { height: 190, borderRadius: 15 } : {}
														]}
														inputStyle={[
															defaultStyles.inputStyle,
															item.multiline
																? { padding: 10, textAlign: 'right', height: 190 }
																: null
														]}
														//label={item.caption}
														placeholder={item.placeholder}
														errorStyle={defaultStyles.err}
														errorMessage={errors[item.id]}
														containerStyle={{ borderWidth: 0 }}
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
												</View>
											);
										else if (item.type == 'date')
											return (
												<View>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingEnd: 20,
																paddingStart: 20,

																paddingBottom: 0,
																fontSize: 13,
																color: 'black'
															}
														]}
													>
														{item.caption}
													</Text>
													<Input
														onFocus={() => {
															Keyboard.dismiss();
															this.setState({
																modalcap: item.caption,
																bottomModalAndTitle: true,
																activedate: item.id
															});

															//	console.log('ddddd:' + item.id);
														}}
														keyboardType="numeric"
														//value={this.state.shoro_namayesh}
														onChangeText={handleChange(item.id)}
														// leftIcon={
														// 	// <Entypo
														// 	// 	name="calendar"
														// 	// 	size={23}
														// 	// 	style={styles.forward}
														// 	// />
														// }

														value={values[item.id]}
														leftIcon={
															item.multiline ? null : (
																<Icon
																	name="calendar-o"
																	size={24}
																	color={defaultStyles.colors.medium}
																/>
															)
														}
														leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
														labelStyle={defaultStyles.labelStyle}
														inputContainerStyle={[
															defaultStyles.inputc,
															defaultStyles.shadow,
															item.multiline ? { height: 190, borderRadius: 15 } : {}
														]}
														inputStyle={[
															defaultStyles.inputStyle,
															item.multiline
																? { padding: 10, textAlign: 'right', height: 190 }
																: null
														]}
														//label={item.caption}
														placeholder={item.placeholder}
														errorStyle={defaultStyles.err}
														errorMessage={errors[item.id]}
														containerStyle={{ borderWidth: 0 }}
													/>
													{/* <Button
															title="Show Date Picker"
															onPress={this.showDatePicker}
														/> */}
													{/* <DateTimePickerModal
															isVisible={this.state.isDatePickerVisible}
															mode="time"
															date={new Date(0, 0, 0, 17, 49, 60, 0)}
															locale="fa_IR"
															onConfirm={this.handleConfirm}
															onCancel={this.hideDatePicker}
														/> */}
													{/* <DatePicker
															isGregorian={false}
															options={{
																// defaultFont: 'Shabnam-Light',
																// headerFont: 'Shabnam-Medium'
															}}
															selected={getFormatedDate(new Date(), 'jYYYY/jMM/jDD')}
														/> */}
												</View>
											);
										else if (item.type == 'combobox1')
											return (
												<View style={{ flex: 1 }}>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingEnd: 20,
																paddingStart: 20,
																marginTop: 10,
																paddingBottom: Platform.OS === 'ios' ? 0 : 5,
																fontSize: 13,
																color: 'black'
															}
														]}
													>
														{item.caption}
													</Text>
													<MultiSelect
														//hideTags

														onAddItem={(e) => {
															//	console.log('onAddItem - newItemsList: ', e);
															this.setState((prevState) => ({
																formikDefault: {
																	...prevState.formikDefault,
																	[item.id]: e
																}
															}));
														}}
														items={item.options}
														canAddItems={true}
														uniqueKey="id"
														ref={(component) => {
															this.multiSelect = component;
														}}
														//onSelectedItemsChange={this.onSelectedItemsChange}
														onSelectedItemsChange={(e) => {
															this.setState((prevState) => ({
																formikDefault: {
																	...prevState.formikDefault,
																	[item.id]: e
																}
															}));

															// this.setState((prevState) => ({
															// 	formstruct: {
															// 		...prevState.formstruct,
															// 		[item.selected]: e
															// 	}
															// }));
														}}
														selectedItems={values[item.id]}
														selectText="انتخاب کنید"
														searchInputPlaceholderText="جستجو"
														onChangeInput={(text) => console.log(text)}
														altFontFamily="iransans"
														tagRemoveIconColor="red"
														tagBorderColor="#CCC"
														tagTextColor="#aaa"
														selectedItemTextColor="green"
														selectedItemIconColor="green"
														itemTextColor="#000"
														displayKey="name"
														searchInputStyle={{ color: '#aaa' }}
														submitButtonColor="#aaa"
														submitButtonText="تایید"
														onChangeInput={(e) => {
															this.setState({ activeStudentList: item.id });
															if (e.length > 2 && item.type2 == 'studentlist') {
																this.loadAPISTD(e);
															}
														}}
														fontFamily="iransans"
														itemFontFamily="iransans"
														selectedItemFontFamily="iransans"
														styleMainWrapper={{
															marginRight: 15,
															marginLeft: 15,
															borderWidth: 1,
															borderRadius: 15,
															borderColor: '#ccc'
															//backgroundColor: 'red'
														}}
														styleSelectorContainer={{ borderRadius: 15 }}
														searchInputStyle={{
															textAlign: 'center',
															height: 30,
															fontFamily: 'iransans'
														}}
														styleInputGroup={{
															//backgroundColor: 'red',
															borderTopLeftRadius: 15,
															borderTopRightRadius: 15
														}}
														styleDropdownMenuSubsection={{
															//backgroundColor: 'red',
															fontFamily: 'iransans',
															borderTopLeftRadius: 15,
															borderTopRightRadius: 15,
															borderBottomRightRadius: 15,
															borderBottomLeftRadius: 15,

															borderWidth: 1
														}}
														tagContainerStyle={{ backgroundColor: 'red' }}
													/>
													<View>
														{this.multiselect ? (
															this.multiselect.getSelectedItemsExt()
														) : null}
													</View>

													{/* <MultiSelect
														items={[ 'jk', 'j' ]}
														uniqueKey="id"
														ref={(component) => {
															this.multiSelect1 = component;
														}}
														hideSubmitButton={true}
														//	selectText={this.state.selectText}
														searchInputPlaceholderText="Type or select a Role"
														filterMethod="full"
														canAddItems={true}
														onAddItem={this.onAddItem}
														//onSelectedItemsChange={this.onSelectedItemsChange}
													/> */}
												</View>
											);
										else if (item.type == 'combobox')
											return (
												<View key={item.id}>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingLeft: 15,
																marginTop: 0,
																fontSize: 14,
																color: '#000'
															}
														]}
													>
														{item.caption}
													</Text>

													<View style={[ defaultStyles.shadow, defaultStyles.viewBtn ]}>
														<RNPickerSelect
															key={item.id}
															Icon={() => {
																return (
																	<View
																		style={{
																			backgroundColor: 'transparent',
																			borderTopWidth: 10,
																			borderTopColor: 'gray',
																			borderRightWidth: 10,
																			borderRightColor: 'transparent',
																			borderLeftWidth: 10,
																			borderLeftColor: 'transparent',
																			width: 0,
																			height: 0,
																			marginRight: 0
																		}}
																	/>
																);
															}}
															useNativeAndroidPickerStyle={false}
															style={pickerStyle}
															itemKey={values[item.id]}
															value={this.state.formikDefault[item.id]}
															placeholder={newPlaceholder}
															onValueChange={(e) => {
																this.setState((prevState) => ({
																	comboselected: e,
																	formikDefault: {
																		...prevState.formikDefault,
																		[item.id]: e
																	}
																}));

																//alert(e);
															}}
															onDonePress={(e) => {
																if (item.fill) {
																	this.loadAPIFill(
																		item.fill,
																		this.state.comboselected
																	);
																}
															}}
															items={item.options}
														/>
													</View>

													<ErrorMessage
														style={{ borderWidth: 1 }}
														errorValue={errors[item.id]}
													/>
												</View>
											);
										else if (item.type == 'radio')
											return (
												<View key={item.id}>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingLeft: 15,
																marginTop: -15,
																fontSize: 14,
																color: defaultStyles.colors.medium
															}
														]}
													>
														{item.caption}
													</Text>
													<ButtonGroup
														activeOpacity={0.6}
														key={item.id}
														//vertical={true}
														//selectedIndex={'1'}
														onPress={(selectedIndex) => {
															this.setState((prevState) => ({
																formikDefault: {
																	...prevState.formikDefault,
																	[item.id]: selectedIndex
																}
															}));
														}}
														//selectMultiple={true}
														selectedIndex={values[item.id]}
														buttonStyle={[ defaultStyles.shadow, { borderRadius: 45 } ]}
														textStyle={{ fontFamily: 'iransans' }}
														buttons={item.options}
														innerBorderStyle={{ borderWidth: 4, color: 'white' }}
														containerStyle={{ height: 50, borderRadius: 45 }}
													/>

													<ErrorMessage
														style={{ borderWidth: 1 }}
														errorValue={errors[item.id]}
													/>
												</View>
											);
										else if (item.type == 'checkbox')
											return (
												<View key={item.id} style={{ flexDirection: 'row' }}>
													<Switch
														key={item.id}
														style={{
															marginStart: 15,
															marginTop: 5,
															marginBottom: 20,
															transform: [ { scaleX: 1 }, { scaleY: 1 } ]
														}}
														trackColor={{
															false: '#767577',
															true: defaultStyles.colors.lightblue
														}}
														thumbColor={
															values[item.id] ? defaultStyles.colors.primary : '#f4f3f4'
														}
														ios_backgroundColor="#ccc"
														onValueChange={(selectedIndex) => {
															this.setState((prevState) => ({
																formikDefault: {
																	...prevState.formikDefault,
																	[item.id]: selectedIndex == '1' ? 'True' : 'False'
																}
															}));
														}}
														value={values[item.id] == 'True' ? true : false}
													/>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingLeft: 5,
																marginTop: 10,
																fontSize: 14,
																color: defaultStyles.colors.medium
															}
														]}
													>
														{item.caption}
													</Text>
												</View>
											);
										else if (item.type == 'image')
											return (
												<View
													style={{
														flexDirection: 'column',
														alignItems: 'center',
														borderWidth: 1,
														margin: 15,
														borderRadius: 15,
														borderColor: '#ccc',
														justifyContent: 'space-evenly'
													}}
												>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingLeft: 15,
																marginTop: 15,
																fontSize: 14,
																color: defaultStyles.colors.medium
															}
														]}
													>
														{item.caption}
													</Text>

													<Uploadimg
														key={item.id}
														//key={1}
														progressnum={this.state.formikDefault[item.progress]}
														onDelete={() => {
															this.setState((prevState) => ({
																formikDefault: {
																	...prevState.formikDefault,
																	[item.mobileurl]: 'x',
																	[item.multipart]: ''
																},
																img1pgVisible: false
															}));
														}}
														onimgPress={async () => {
															if (
																this.state.formikDefault[item.mobileurl] != '' &&
																this.state.formikDefault[item.mobileurl] != undefined
															) {
																if (
																	this.state.formikDefault[item.mobileurl]
																		.toString()
																		.startsWith('http')
																) {
																	//alert('ss');
																	this.handleDownload(
																		this.state.formikDefault[item.mobileurl]
																	);
																	return;
																}
															}

															//console.log(this.state.formikDefault[item.mobileurl]);
															let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
															if (permissionResult.granted === false) {
																alert('Permission to access camera roll is required!');
																return;
															}
															let pickerResult = await ImagePicker.launchImageLibraryAsync(
																{
																	allowsEditing: true,

																	allowsMultipleSelection: true
																}
															);
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
																try {
																	let y = await FileSystem.deleteAsync(
																		pickerResult.uri
																	);
																} catch (error) {
																	console.log(error);
																}

																//this.ImageUpload1(pickerResult.uri);
																console.log(
																	global.adress.replace(':8080', '') +
																		'' +
																		':8181' +
																		'/api/upload'
																);
																let url = pickerResultNew.uri;
																console.log(url);
																const xhr = new XMLHttpRequest();
																xhr.open(
																	'POST',
																	global.adress.replace('/papi', ':8181') +
																		'' +
																		'' +
																		'/api/upload'
																);
																xhr.onload = () => {
																	console.log(xhr.response);

																	this.setState((prevState) => ({
																		formikDefault: {
																			...prevState.formikDefault,
																			[item.mobileurl]: url,
																			[item.multipart]: xhr.response,
																			[item.progressvisible]: false
																		}
																	}));

																	//console.log(this.state.formikDefault.image1);
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
																// this.setState({
																// 	[item.progressvisible]: true
																// });

																this.setState((prevState) => ({
																	formikDefault: {
																		...prevState.formikDefault,
																		[item.progressvisible]: true
																	}
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
																			formikDefault: {
																				...prevState.formikDefault,
																				[item.progress]: uploadProgress
																			}
																		}));
																		console.log(
																			this.state.formikDefault[item.progress]
																		);
																	};
																}
															}
														}}
														imageSourse={this.state.formikDefault[item.mobileurl]}
														pgvisible={this.state.formikDefault[item.progressvisible]}
													/>

													<ErrorMessage
														style={{ borderWidth: 1 }}
														errorValue={errors[item.mobileurl]}
													/>
												</View>
											);
										else if (item.type == 'radiolist')
											return (
												<View>
													<Text
														style={[
															defaultStyles.lbl16,
															,
															styles.capstyle,
															{
																textAlign: 'left',
																paddingLeft: 15,
																marginTop: 15,
																fontSize: 14,
																color: defaultStyles.colors.medium
															}
														]}
													>
														{item.caption}
													</Text>
													<RadioButton.Group
														key={item.id}
														onValueChange={(value) => {
															this.setState((prevState) => ({
																formikDefault: {
																	...prevState.formikDefault,
																	[item.id]: value
																}
															}));

															console.log(this.state.formikDefault.radio);
														}}
														value={values[item.id]}
													>
														{item.options.map((item1) => {
															return (
																<RadioItem
																	value={item1.value}
																	html={item1.label}
																	direction={'rtl'}
																	axg={''}
																/>
															);
														})}
													</RadioButton.Group>

													<ErrorMessage
														style={{ borderWidth: 1 }}
														errorValue={errors[item.id]}
													/>
												</View>
											);
										else if (item.type == 'file')
											return (
												<View
													key={item.id}
													style={{
														flexDirection: 'column',
														alignItems: 'center',
														borderWidth: 1,
														margin: 15,
														borderRadius: 15,
														borderColor: '#ccc',
														justifyContent: 'space-evenly'
													}}
												>
													<Text
														style={[
															defaultStyles.lbl16,
															{
																textAlign: 'left',
																marginTop: 10,
																paddingLeft: 10,
																color: defaultStyles.colors.medium
															}
														]}
													>
														{[ item.caption ]}
													</Text>
													<View
														style={{
															flexDirection: 'row',
															alignItems: 'center',
															justifyContent: 'space-evenly'
														}}
													>
														<View style={{ alignItems: 'center' }}>
															<TouchableOpacity
																key={item.id}
																onPress={() => {
																	//alert();
																	console.log(
																		this.state.formikDefault[item.mobileurl]
																	);
																	this.handeleUploadfile([ item ]);
																}}
															>
																<Image
																	//source={{ uri: this.state.formikDefault.soal1 }}
																	resizeMode="contain"
																	style={styles.imgplaceholder}
																/>
																<View style={styles.imgpp}>
																	{this.state.formikDefault[item.progressvisible] && (
																		<ProgressCircle
																			outerCircleStyle={{
																				overflow: 'hidden',
																				borderTopLeftRadius: 20,
																				borderTopRightRadius: 20,
																				borderBottomRightRadius: 20,
																				borderBottomLeftRadius: 20
																			}}
																			percent={
																				this.state.formikDefault[
																					item.progress
																				] * 100
																			}
																			radius={20}
																			borderWidth={4}
																			color="#3399FF"
																			shadowColor="#999"
																			bgColor="#fff"
																		>
																			<Text style={{ fontSize: 12 }}>
																				{Number(
																					(this.state.formikDefault[
																						item.progress
																					] * 100).toFixed(0)
																				)}
																			</Text>
																		</ProgressCircle>
																	)}

																	{!this.state.formikDefault[item.progressvisible] &&
																	(this.state.formikDefault[item.mobileurl] == '' ||
																		this.state.formikDefault[item.mobileurl] ==
																			undefined) && (
																		<View>
																			<Text>
																				{
																					this.state.formikDefault[
																						item.mobileurl
																					]
																				}
																			</Text>
																			<Icon
																				name="folder-open"
																				size={34}
																				color="#bbb"
																			/>
																		</View>
																	)}
																	{/*  */}
																	{!this.state.formikDefault[item.progressvisible] &&
																	this.state.formikDefault[item.mobileurl] !=
																		undefined && (
																		<View>
																			{'docdocx'.includes(
																				this.state.formikDefault[item.mobileurl]
																					.split('.')
																					.pop()
																					.toLowerCase()
																			) &&
																			this.state.formikDefault[item.mobileurl] !=
																				'' && (
																				<Icon
																					name="file-word-o"
																					size={34}
																					color="blue"
																				/>
																			)}
																			{'jpgjpegpng'.includes(
																				this.state.formikDefault[item.mobileurl]
																					.split('.')
																					.pop()
																					.toLowerCase()
																			) &&
																			this.state.formikDefault[item.mobileurl] !=
																				'' && (
																				<Icon
																					name="file-picture-o"
																					size={34}
																					color="orange"
																				/>
																			)}

																			{'pdf'.includes(
																				this.state.formikDefault[item.mobileurl]
																					.split('.')
																					.pop()
																					.toLowerCase()
																			) &&
																			this.state.formikDefault[item.mobileurl] !=
																				'' && (
																				<Icon
																					name="file-pdf-o"
																					size={34}
																					color="red"
																				/>
																			)}
																			{'xlsxlsx'.includes(
																				this.state.formikDefault[item.mobileurl]
																					.split('.')
																					.pop()
																					.toLowerCase()
																			) &&
																			this.state.formikDefault[item.mobileurl] !=
																				'' && (
																				<Icon
																					name="file-excel-o"
																					size={34}
																					color="green"
																				/>
																			)}
																		</View>
																	)}
																</View>
															</TouchableOpacity>
															{this.state.formikDefault[item.mobileurl] != undefined && (
																<TouchableOpacity
																	style={{ alignItems: 'center' }}
																	onPress={() => this.handeleDeleteM([ item ])}
																>
																	<Icon name="trash" size={24} color="#bbb" />
																</TouchableOpacity>
															)}
														</View>
													</View>
													{this.state.formikDefault[item.maxSizeError] != '' && (
														<View>
															<Text
																style={{
																	fontFamily: 'iransans',
																	color: 'red',
																	textAlign: 'center'
																}}
															>
																{this.state.formikDefault[item.maxSizeError]}
															</Text>
														</View>
													)}

													<ErrorMessage
														style={{ borderWidth: 1 }}
														errorValue={errors[item.mobileurl]}
													/>
												</View>
											);
									})}

									<FormButton
										buttonColor="#1f9efd"
										borderColor="white"
										backgroundColor="#e3f1fc"
										buttonType="outline"
										onPress={() => {
											//validateForm().then(() => {
											//	alert();
											this.setState({ loading: true, savepress: true, saveenable: true });
											//});
											let newArray = this.state.formstruct.map((item1) => {
												if (item1.fields)
													item1.fields.map((qq) => {
														if (qq.type == 'editor') {
															let now = qq.id;
															//	console.log(qq.id);

															this['sectionItem' + now].injectJavaScript(
																'window.ReactNativeWebView.postMessage(JSON.stringify({type: "save", message : aaa(),id:"' +
																	now +
																	'"}));'
																//'window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : aaa()}));'
															);
														}
													});
											});
											// if (this.isInitialValid) alert('good');
											// else alert('fuck');

											validateForm().then((errors) => {
												if (Object.keys(errors).length > 0) {
													this.setState({
														loading: false,
														savepress: false,
														saveenable: false
													});
												}
											});

											setTimeout(() => {
												handleSubmit();
											}, 100);
										}}
										// onPress={() => {
										// 	console.log(JSON.stringify(this.state.formikDefault));
										// }}
										widthb={'100%'}
										heightb={55}
										borderRadiusb={45}
										style={{ margin: 16 }}
										containerStyle={[ defaultStyles.shadowx, { marginTop: 0 } ]}
										disabled={this.state.saveenable}
										//disabled={isValid}
										loading={this.state.savepress}
										title={this.state.butcaption}
									/>
									<View style={{ height: 120 }} />
								</View>
							);
						}}
					</Formik>
				</ScrollView>

				<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />

				<Modalm
					style={{}}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					isVisible={this.state.bottomModalAndTitle}
				>
					<View style={{ flex: 1 }}>
						{/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
						<Calendar
							jalali={true}
							markedDates={this.state.dateSelected}
							// Initially visible month. Default = Date()

							// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined

							// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
							onDayPress={(day) => {
								this.onDateChange(day);
								//	console.log('d:' + dataJalali);
								this.setState({ bottomModalAndTitle: false });

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
								//	console.log('selected day', day);
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
					style={{ borderRadius: 10 }}
					hideModalContentWhileAnimating={true}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					//	swipeDirection={[ 'left' ]}
					onBackdropPress={() =>
						this.setState({
							barom_Visible: false
						})}
					onSwipeComplete={() =>
						this.setState({
							barom_Visible: false
						})}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					isVisible={this.state.barom_Visible}
				>
					<View
						style={{
							borderRadius: 30,
							height: 320,
							padding: 10,
							marginLeft: 20,
							marginRight: 20,
							backgroundColor: 'white'
						}}
					>
						<FlatGrid
							itemDimension={80}
							items={test}
							style={styles.gridView}
							// staticDimension={300}
							// fixed
							spacing={10}
							renderItem={({ item }) => (
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={() => {
										alert();
										this.setState({ formedit: true });
										//	this.clickEventListener(item);
									}}
									style={{ flex: 1 }}
								>
									<View style={[ styles.itemContainer, { backgroundColor: item.bkcolor } ]}>
										{item.badge > 0 && <Text style={styles.badge}> 2 </Text>}

										<Icon
											name={item.icon}
											size={37}
											color={item.code}
											style={{
												shadowColor: item.bkcolor,
												flex: 1,
												alignSelf: 'center',
												paddingTop: 5,
												shadowColor: item.code,
												shadowOffset: {
													width: 1,
													height: 1
												},
												shadowOpacity: 0.37,
												shadowRadius: 2.49,
												elevation: 3
											}}
										/>

										<Text style={styles.itemName}>{item.name}</Text>
									</View>
								</TouchableOpacity>
							)}
						/>
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
					style={{ borderRadius: 10 }}
					hideModalContentWhileAnimating={true}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					//	swipeDirection={[ 'left' ]}
					onBackdropPress={() =>
						this.setState({
							formedit: false
						})}
					onSwipeComplete={() =>
						this.setState({
							formedit: false
						})}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					isVisible={this.state.formedit}
				>
					<View style={{ borderWidth: 0, width: '90%' }}>
						{/* <Eform eformId={6} instanseID={0} stdID={0} isAdminForms="true" /> */}
					</View>
				</Modalm>
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
		//fontFamily: 'iransans',
		textAlign: 'center'
	},
	gridView: {
		marginTop: 2,
		flex: 1
	},
	imgplaceholder: {
		marginTop: 5,
		//borderStyle: 'dashed',
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 15,
		height: 100,
		width: 80
	},
	formContainer: {
		flex: 1,
		marginTop: 1,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 5,
		//height: '100%',
		alignContent: 'center',
		backgroundColor: '#f6fbff'
	},
	input: {
		//borderColor:'red',

		marginTop: 0,
		textAlign: 'center',
		fontSize: 20
	}
});

//console.disableYellowBox = true;
export default withNavigation(eforms2);
