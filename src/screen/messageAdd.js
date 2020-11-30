import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';
import { Input, ButtonGroup } from 'react-native-elements';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import Loading from '../components/loading';

import RNPickerSelect from 'react-native-picker-select';

var Buffer = require('buffer/').Buffer;
import { withNavigation } from 'react-navigation';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import { AntDesign, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Chip } from 'react-native-paper';
import GLOBAL from './global';
import Modalm from 'react-native-modal';
import defaultStyles from '../config/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

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
import { Dimensions, Image, ActivityIndicator } from 'react-native';
import SelectContact from '../screen/selectContact';
import Uploadimg from '../components/uploadimg';

import * as SQLite from 'expo-sqlite';
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
		fontSize: 14,
		backgroundColor: '#e3f1fc',
		fontFamily: 'iransans',
		textAlign: 'center',
		color: 'black',
		marginTop: 7
	},
	placeholderColor: 'red',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 15,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 20
	}
};
const newPlaceholder = {
	label: 'انتخاب کنید',
	value: ''
};
// messagegrp = [
// 	{
// 		label: 'پیام های تربیتی',
// 		value: '20'
// 	},
// 	{
// 		label: 'اطلاعیه',
// 		value: '21'
// 	},
// 	{
// 		label: 'عمومی',
// 		value: '23'
// 	}
// ];
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
		this.state = {
			uploadDir: global.adress.replace(':8080', '') + '' + ':8181' + '/api/upload',
			formikDefault: {
				title: '',
				matn: '',
				group: '',
				selectedClass: [],
				img1: 'x',
				img1base64: '',

				img2: 'x',
				img2base64: '',
				img3: 'x',
				img3base64: '',
				img4: 'x',
				img4base64: '',
				file1: 'x',
				file1base64: '',
				file2: 'x',
				file2base64: ''
			},
			selectedParticipate: 'انتخاب گیرندگان',
			isSubmitting: false,
			retUser: [],
			//messagegrp: [],
			isModalpikerVisible: false,
			img1pg: '',
			img1pgVisible: false,
			img2pg: '',
			img2pgVisible: false,
			img3pg: '',
			img3pgVisible: false,
			img4pg: '',
			endaction: false,
			img4pgVisible: false,

			file1pg: '',
			file1pgVisible: false,

			file2pg: '',
			file2pgVisible: false,

			fileSize: 500000,
			fileSizeErr: '',
			isEditing: false
		};
	}
	loadAPI_grp = async (page, type) => {
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			return;
		}
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getMessageCat?id=' +
			page +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&mode=add';
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
					messagegrp: retJson,

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

	loadAPI_size = async (page, type) => {
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			return;
		}
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/getLimiteUpload?id=' + '1' + '&p=' + param + '&g=' + '1';
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState(
						{
							//loading: false
						}
					);
					return;
				}
				//alert(retJson.size);
				if (retJson.upload != '') {
					this.setState({
						uploadDir: retJson.upload
					});
				}
				this.setState({
					fileSize: retJson.size

					//loading: false
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

	componentDidMount() {
		const { navigation } = this.props;
		const replyID = navigation.getParam('replyID');
		const replyID_lastname = navigation.getParam('replyID_lastname');
		const replyID_title = navigation.getParam('replyID_title');

		this.loadAPI_grp(0, 'pull');
		this.loadAPI_size(0, 'pull');

		// if (global.messageEditID != '') {
		// 	this.setState({
		// 		isEditing: true,
		// 		formikDefault: {
		// 			selectedClass: [
		// 				{
		// 					FirstName: 'محمود ',
		// 					LastName: 'صلح جو ',
		// 					username: '^13',
		// 					coursename: 'آموزگار',
		// 					RowNumber: 4,
		// 					check: 'true'
		// 				},
		// 				{
		// 					FirstName: 'محمد ',
		// 					LastName: 'فتوحي ',
		// 					username: '^14',
		// 					coursename: 'آموزگار',
		// 					RowNumber: 5,
		// 					check: 'true'
		// 				}
		// 			],
		// 			img2: 'x',
		// 			img2base64: '',
		// 			img3: 'x',
		// 			img3base64: '',
		// 			img4: 'x',
		// 			img4base64: '',
		// 			file1: 'x',
		// 			file1base64: '',
		// 			file2: 'x',
		// 			file2base64: '',
		// 			title: 'Df',
		// 			group: '23',
		// 			matn: 'Dfdfdf',
		// 			img1:
		// 				'file:///Users/majidghasemi/Library/Developer/CoreSimulator/Devices/40A262B8-DE2E-449D-8148-811A548806E4/data/Containers/Data/Application/8053212C-37F9-4D42-A1E7-046D508A979E/Library/Caches/ExponentExperienceData/%2540anonymous%252Frn-starter-8b8388af-0e8e-4376-9f69-5520acec627c/ImagePicker/399E22B8-4796-4EA0-82B7-002CA4B63B01.jpg',
		// 			img1base64: 'Uploaded file: BodyPart_a94fd892-6ddb-49c2-9476-c6aa0991bded (215169 bytes)\n'
		// 		}
		// 	});
		// 	//**^^this.loadAPI();
		// }
		//console.log('repl:' + replyID);
		if (replyID != undefined) {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					selectedClass: [
						{
							FirstName: '',
							LastName: replyID_lastname,
							username: replyID,
							coursename: '',
							RowNumber: 4,
							check: 'true'
						}
					],
					title: 'پاسخ به:' + replyID_title
				}
			}));
		}
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
		let uurl = global.adress + '/pApi.asmx/getMessage?id=' + global.messageEditID + '&p=' + param;
		console.log(uurl);
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

				if (this.state.formikDefault.img1 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							img1: getHttpAdress() + 'media/' + this.state.formikDefault.img1
						}
					}));
				}

				if (this.state.formikDefault.img1 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							img1: getHttpAdress() + 'media/' + this.state.formikDefault.img2
						}
					}));
				}

				if (this.state.formikDefault.img3 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							img3: getHttpAdress() + 'media/' + this.state.formikDefault.img3
						}
					}));
				}

				if (this.state.formikDefault.img4 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							img4: getHttpAdress() + 'media/' + this.state.formikDefault.img4
						}
					}));
				}

				if (this.state.formikDefault.file1 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							file1: getHttpAdress() + 'media/' + this.state.formikDefault.file1
						}
					}));
				}

				if (this.state.formikDefault.file2 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							file2: getHttpAdress() + 'media/' + this.state.formikDefault.file2
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
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			return;
		}
		/* #endregion */
		this.setState({ isSubmitting: true, fin: true, loading: true });

		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/setMessage?p=' + param + '&json=' + jsonstr + '&dmn=' + global.adress;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						fin: false
					});
					return;
				}

				if (retJson.result == 'ok')
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							id: retJson.id
						},
						fin: true,
						serverMsg: retJson.msg,
						isSubmitting: false
					}));
			} else {
				return false;
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				fin: false
			});
			return;
		}
	};

	/* #endregion */
	_selectAndUpload = async (document) => {
		try {
			const picked = await DocumentPicker.getDocumentAsync({
				type: '*/*',
				copyToCacheDirectory: true
			});
			if (picked.type === 'cancel') {
				return;
			} else if (picked.type === 'success') {
				console.log('pp:' + picked.size);
				const { name } = picked;
				const { size } = picked;
				//alert(size / 1024 / 1024);
				if (size / 1024 / 1024 > this.state.fileSize) {
					console.log('filesize err:');

					this.setState({
						fileSizeErr: 'حجم فایل بیشتر از میزان مجاز است'
					});
					return;
				}
				console.log('fileUri');
				const fileUri = `${FileSystem.documentDirectory}${name}`;
				console.log('salam:' + fileUri);

				if (Platform.OS === 'ios') {
					console.log(picked.uri);
					console.log(fileUri);

					//	const pickerResult = await FileSystem.downloadAsync(picked.uri, fileUri);
					//	console.log(pickerResult);
					this.fileUpload1(picked.uri, document);
				} else {
					const pickerResult = {
						name: picked.name,
						uri: picked.uri
					};
					this.fileUpload1(picked.uri, document);
				}
			} else {
				return;
			}
		} catch (error) {
			this.setState({
				success: false,
				successModVisible: true,
				successLineText: `We can't support this file.!`
			});
		}
	};

	_selectAndUpload2 = async (document) => {
		try {
			const picked = await DocumentPicker.getDocumentAsync({
				type: '*/*',
				copyToCacheDirectory: true
			});
			if (picked.type === 'cancel') {
				return;
			} else if (picked.type === 'success') {
				console.log('pp:' + picked.size);
				const { name } = picked;
				const { size } = picked;
				if (size / 1024 / 1024 > this.state.fileSize) {
					console.log('filesize err:');

					this.setState({
						fileSizeErr: 'حجم فایل بیشتر از میزان مجاز است'
					});
					return;
				}
				console.log('fileUri');
				const fileUri = `${FileSystem.documentDirectory}${name}`;
				//console.log('salam:' + fileUri);

				if (Platform.OS === 'ios') {
					console.log(picked.uri);
					console.log(fileUri);

					//	const pickerResult = await FileSystem.downloadAsync(picked.uri, fileUri);
					//	console.log(pickerResult);
					this.fileUpload2(picked.uri, document);
				} else {
					const pickerResult = {
						name: picked.name,
						uri: picked.uri
					};
					this.fileUpload2(picked.uri, document);
				}
			} else {
				return;
			}
		} catch (error) {
			this.setState({
				success: false,
				successModVisible: true,
				successLineText: `We can't support this file.!`
			});
		}
	};

	fileUpload1(url) {
		console.log('hi');
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

	fileUpload2(url) {
		//console.log('hi');
		const xhr = new XMLHttpRequest();
		xhr.open('POST', this.state.uploadDir);
		xhr.onload = () => {
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					file2: url,
					file2base64: xhr.response
				},
				file2pgVisible: false
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
			file2pgVisible: true
		});

		// 7. track upload progress
		if (xhr.upload) {
			// track the upload progress
			xhr.upload.onprogress = ({ total, loaded }) => {
				const uploadProgress = loaded / total;
				console.log('sex');
				this.setState({
					file2pg: uploadProgress
				});
			};
		}
	}

	ImageUpload1(url) {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', this.state.uploadDir);
		xhr.onload = () => {
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					img1: url,
					img1base64: xhr.response
				},
				img1pgVisible: false
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
			img1pgVisible: true
		});

		// 7. track upload progress
		if (xhr.upload) {
			// track the upload progress
			xhr.upload.onprogress = ({ total, loaded }) => {
				const uploadProgress = loaded / total;
				//console.log('majid' + this.state.img1pg);
				this.setState({
					img1pg: uploadProgress
				});
			};
		}
	}
	ImageUpload4(url) {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', this.state.uploadDir);
		xhr.onload = () => {
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					img4: url,
					img4base64: xhr.response
				},
				img4pgVisible: false
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
			img4pgVisible: true
		});

		// 7. track upload progress
		if (xhr.upload) {
			// track the upload progress
			xhr.upload.onprogress = ({ total, loaded }) => {
				const uploadProgress = loaded / total;
				//console.log('majid' + this.state.img1pg);
				this.setState({
					img4pg: uploadProgress
				});
			};
		}
	}
	ImageUpload3(url) {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', this.state.uploadDir);
		xhr.onload = () => {
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					img3: url,
					img3base64: xhr.response
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
				//console.log('majid' + this.state.img1pg);
				this.setState({
					img3pg: uploadProgress
				});
			};
		}
	}
	ImageUpload2(url) {
		const xhr = new XMLHttpRequest();
		xhr.open('POST', this.state.uploadDir);
		xhr.onload = () => {
			console.log(xhr.response);

			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					img2: url,
					img2base64: xhr.response
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
				//console.log('majid' + this.state.img1pg);
				this.setState({
					img2pg: uploadProgress
				});
			};
		}
	}

	handleimgpress = () => {};

	handeleDelete = (ee) => {
		console.log(ee);
		if (ee == 1) {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					img1: 'x',
					img1base64: ''
				},
				img1pgVisible: false
			}));
		} else if (ee == 2) {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					img2: 'x',
					img2base64: ''
				},
				img2pgVisible: false
			}));
		} else if (ee == 3) {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					img3: 'x',
					img3base64: ''
				},
				img3pgVisible: false
			}));
		} else if (ee == 4) {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					img4: 'x',
					img4base64: ''
				},
				img4pgVisible: false
			}));
		} else if (ee == 5) {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					file1: 'x',
					file1base64: ''
				},
				file1pgVisible: false
			}));
		} else if (ee == 6) {
			this.setState((prevState) => ({
				formikDefault: {
					...prevState.formikDefault,
					file2: 'x',
					file2base64: ''
				},
				file2pgVisible: false
			}));
		}
	};

	render() {
		GLOBAL.messageAdd = this;
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;

		let openImage1PickerAsync = async (tt) => {
			//console.log(tt);
			let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
			if (permissionResult.granted === false) {
				alert('Permission to access camera roll is required!');
				return;
			}
			let pickerResult = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,

				allowsMultipleSelection: true
			});

			if (!pickerResult.cancelled) {
				//console.log(pickerResult);
				if (tt == 1) this.ImageUpload1(pickerResult.uri);
				if (tt == 2) this.ImageUpload2(pickerResult.uri);
				if (tt == 3) this.ImageUpload3(pickerResult.uri);
				if (tt == 4) this.ImageUpload4(pickerResult.uri);
			}
		};
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
		//console.log(this.state.messagegrp.length);
		if (!this.state.messagegrp)
			return (
				<Loading />
				// <View style={styles.container}>
				// 	<View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
				// 		<ActivityIndicator style={{ color: '#000' }} />
				// 	</View>
				// </View>
			);

		return (
			<View style={{ flex: 1, backgroundColor: '#f6fbff' }}>
				<ScrollView>
					<Formik
						style={{ backgroundColor: 'red' }}
						initialValues={this.state.formikDefault}
						enableReinitialize={true}
						validateOnBlur={false}
						validateOnChange={false}
						// 	onSubmit={async (values, { resetForm }) => {
						// 		//await onSubmit(values)
						//   console.log('sdf');
						//   resetForm({username:''})
						// 	  }}

						onSubmit={(values) => {
							//**let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');
							//**this.apiPost(JSON.stringify(objJsonB64));
							let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');
							this.apiPost(JSON.stringify(objJsonB64));

							//console.log(JSON.stringify(values));
							//}, 1000);
						}}
						validationSchema={yup.object().shape({
							title: yup.string().required('لطفا متن پیام  را وارد کنید'),
							selectedClass: yup.string().required('لطفا گیرندگان پیام  را انتخاب کنید')

							// matn: yup.string().required('لطفا کلمه عبور  را وارد کنید'),
							// schoolcode: yup.string().required('لطفا کد آموزشگاه را وارد کنید'),
							// adress: yup.string().required('لطفا آدرس اینترنتی را وارد کنید')
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
											textAlign: 'left',
											paddingRight: 15,
											paddingLeft: 15,

											marginTop: -15,
											fontSize: 14,
											color: defaultStyles.colors.medium
										}
									]}
								>
									عنوان پیام
								</Text>
								<Input
									autoCorrect={false}
									value={values.title}
									onChangeText={handleChange('title')}
									onEndEditing={(e) => {
										let ddd = e.nativeEvent.text;
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												title: ddd
											}
										}));
									}}
									leftIcon={<Icon name="pencil" size={24} color={defaultStyles.colors.medium} />}
									leftIconContainerStyle={defaultStyles.leftIconContainerStyle}
									labelStyle={[ defaultStyles.labelStyle, { fontFamily: 'iransans' } ]}
									inputContainerStyle={[
										defaultStyles.inputc,
										defaultStyles.shadow,
										{ marginTop: -15 }
									]}
									inputStyle={defaultStyles.inputStyle}
									label=""
									placeholder=""
									value={values.title}
									errorStyle={defaultStyles.err}
									errorMessage={errors.title}
									containerStyle={{ borderWidth: 0 }}
								/>

								<Text
									style={[
										defaultStyles.lbl16,
										,
										styles.capstyle,
										{
											textAlign: 'left',
											paddingRight: 15,
											paddingLeft: 15,
											marginTop: -15,
											fontSize: 14,
											color: defaultStyles.colors.medium
										}
									]}
								>
									دسته بندی پیام{' '}
								</Text>
								<View style={[ defaultStyles.shadow, defaultStyles.viewBtn ]}>
									<RNPickerSelect
										useNativeAndroidPickerStyle={false}
										style={pickerStyle}
										itemKey={values.group}
										value={this.state.formikDefault.group}
										//onChangeText={handleChange('sport')}
										placeholder={newPlaceholder}
										//	onValueChange={handleChange('speed')}
										onValueChange={(e) => {
											//  let val = e.nativeEvent.text;
											//console.log('hh:' + e);
											console.log('hh:' + e);
											this.setState((prevState) => ({
												formikDefault: {
													...prevState.formikDefault,
													group: e
												}
											}));

											console.log('ff:' + this.state.formikDefault.group);
										}}
										items={this.state.messagegrp}
									/>
								</View>
								<Text
									style={[
										defaultStyles.lbl16,
										,
										styles.capstyle,
										{
											textAlign: 'left',
											paddingRight: 15,
											paddingLeft: 15,
											marginTop: 5,
											fontSize: 14,
											color: defaultStyles.colors.medium
										}
									]}
								>
									متن پیام {' '}
								</Text>
								<Input
									autoCorrect={false}
									value={values.matn}
									onChangeText={handleChange('matn')}
									onEndEditing={(e) => {
										let ddd = e.nativeEvent.text;
										this.setState((prevState) => ({
											formikDefault: {
												...prevState.formikDefault,
												matn: ddd
											}
										}));
									}}
									multiline={true}
									numberOfLines={4}
									labelStyle={defaultStyles.labelStyle}
									inputContainerStyle={[
										defaultStyles.inputc,
										defaultStyles.shadow,
										,
										{ height: 190, borderRadius: 15 }
									]}
									inputStyle={[
										defaultStyles.inputStyle,
										{ padding: 10, textAlign: 'right', height: 190 }
									]}
									label=""
									placeholder=""
									value={values.matn}
									errorStyle={defaultStyles.err}
									errorMessage={errors.matn}
									containerStyle={{ borderWidth: 0, marginTop: -10 }}
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
								<ErrorMessage errorValue={errors.selectedClass} />
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
								<Text
									style={[
										defaultStyles.lbl16,
										{ textAlign: 'left', paddingLeft: 10, color: defaultStyles.colors.medium }
									]}
								>
									انتخاب عکس
								</Text>

								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-evenly'
									}}
								>
									<Uploadimg
										key={1}
										progressnum={this.state.img1pg}
										onDelete={() => this.handeleDelete(1)}
										onimgPress={() => openImage1PickerAsync(1)}
										imageSourse={this.state.formikDefault.img1}
										pgvisible={this.state.img1pgVisible}
									/>

									<Uploadimg
										key={2}
										progressnum={this.state.img2pg}
										onDelete={() => this.handeleDelete(2)}
										onimgPress={() => openImage1PickerAsync(2)}
										imageSourse={this.state.formikDefault.img2}
										pgvisible={this.state.img2pgVisible}
									/>
									<Uploadimg
										key={3}
										progressnum={this.state.img3pg}
										onDelete={() => this.handeleDelete(3)}
										onimgPress={() => openImage1PickerAsync(3)}
										imageSourse={this.state.formikDefault.img3}
										pgvisible={this.state.img3pgVisible}
									/>
									<Uploadimg
										key={4}
										progressnum={this.state.img4pg}
										onDelete={() => this.handeleDelete(4)}
										onimgPress={() => openImage1PickerAsync(4)}
										imageSourse={this.state.formikDefault.img4}
										pgvisible={this.state.img4pgVisible}
									/>
								</View>

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
									انتخاب فایل
								</Text>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										justifyContent: 'space-evenly'
									}}
								>
									<View
										style={{
											alignItems: 'center',
											borderColor: '#ccc',
											borderRadius: 15,
											borderWidth: 1,
											borderStyle: 'dashed'
										}}
									>
										<TouchableOpacity onPress={() => this._selectAndUpload()}>
											<Image
												//source={{ uri: this.state.formikDefault.soal1 }}
												resizeMode="contain"
												style={styles.imgplaceholder}
											/>
											<View style={styles.imgpp}>
												{this.state.file1pgVisible && (
													<AnimatedProgressWheel
														size={35}
														width={4}
														color={'blue'}
														progress={this.state.file1pg * 100}
														backgroundColor={'#ccc'}
													/>
												)}
												{!this.state.file1pgVisible &&
												this.state.formikDefault.file1 == 'x' && (
													<View>
														<Icon name="folder-open" size={24} color="#bbb" />
													</View>
												)}

												{!this.state.file1pgVisible &&
												this.state.formikDefault.file1 != 'x' && (
													<View>
														<Icon name="file" size={24} color="orange" />
													</View>
												)}
											</View>
										</TouchableOpacity>
										{this.state.formikDefault.file1 != 'x' && (
											<TouchableOpacity
												style={{ alignItems: 'center' }}
												onPress={() => this.handeleDelete(5)}
											>
												<Icon name="trash" size={24} color="#bbb" />
											</TouchableOpacity>
										)}
									</View>

									<View
										style={{
											alignItems: 'center',
											borderColor: '#ccc',
											borderRadius: 15,
											borderWidth: 1,
											borderStyle: 'dashed'
										}}
									>
										<TouchableOpacity onPress={() => this._selectAndUpload2()}>
											<Image
												//source={{ uri: this.state.formikDefault.soal1 }}
												resizeMode="contain"
												style={styles.imgplaceholder}
											/>
											<View style={styles.imgpp}>
												{this.state.file2pgVisible && (
													<AnimatedProgressWheel
														size={35}
														width={4}
														color={'blue'}
														progress={this.state.file2pg * 100}
														backgroundColor={'#ccc'}
													/>
												)}
												{!this.state.file2pgVisible &&
												this.state.formikDefault.file2 == 'x' && (
													<View>
														<Icon name="folder-open" size={24} color="#bbb" />
													</View>
												)}

												{!this.state.file2pgVisible &&
												this.state.formikDefault.file2 != 'x' && (
													<View>
														<Icon name="file" size={24} color="orange" />
													</View>
												)}
											</View>
										</TouchableOpacity>
										{this.state.formikDefault.file2 != 'x' && (
											<TouchableOpacity
												style={{ alignItems: 'center' }}
												onPress={() => this.handeleDelete(6)}
											>
												<Icon name="trash" size={24} color="#bbb" />
											</TouchableOpacity>
										)}
									</View>
								</View>
								{this.state.fileSizeErr != '' && (
									<View>
										<Text style={{ fontFamily: 'iransans', color: 'red', textAlign: 'center' }}>
											{this.state.fileSizeErr}
										</Text>
									</View>
								)}

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
								<Text style={[ defaultStyles.lbl16, { textAlign: 'center' } ]}>
									{this.state.serverMsg}
								</Text>
								<FormButton
									buttonColor="#1f9efd"
									borderColor="white"
									backgroundColor="#e3f1fc"
									buttonType="outline"
									onPress={handleSubmit}
									widthb={'100%'}
									heightb={55}
									borderRadiusb={45}
									style={{ margin: 6 }}
									containerStyle={[ defaultStyles.shadowx, { marginTop: 20 } ]}
									disabled={this.state.fin}
									loading={this.state.isSubmitting}
									title="ارسال پیام"
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

				<Modalm
					animationIn="fadeIn"
					animationOut="slideOutRight"
					transparent={true}
					style={{ borderRadius: 25 }}
					hideModalContentWhileAnimating={true}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					//	swipeDirection={[ 'left' ]}
					onBackdropPress={() =>
						this.setState({
							isModalpikerVisible: false
						})}
					onSwipeComplete={() =>
						this.setState({
							isModalpikerVisible: false
						})}
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
	imgplaceholder: {
		marginTop: 5,
		//borderStyle: 'dashed',
		borderColor: '#ccc',
		//borderWidth: 1,
		borderRadius: 15,
		height: 100,
		width: 80
	},
	formContainer: {
		flex: 1,
		marginTop: 1,
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 20,
		//height: '100%',

		backgroundColor: '#f6fbff'
	},
	input: {
		//borderColor:'red',

		marginTop: 0,
		textAlign: 'center',
		fontSize: 20
	}
});

console.disableYellowBox = true;
export default withNavigation(Appaa);
