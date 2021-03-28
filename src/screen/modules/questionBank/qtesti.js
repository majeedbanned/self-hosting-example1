import React, { Component, useRef } from 'react';
import { Input, ButtonGroup } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';
import { actions, getContentCSS, RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import MultiSelect from 'react-native-multiple-select';
import RNPickerSelect from 'react-native-picker-select';
import RadioItem from '../../../components/radioItem';
import { userInfo, getHttpAdress } from '../../../components/DB';
var Buffer = require('buffer/').Buffer;
import Loading from '../../../components/loading';
import { withNavigation } from 'react-navigation';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Chip } from 'react-native-paper';
import GLOBAL from '../../global';
import Modalm from 'react-native-modal';
import defaultStyles from '../../../config/styles';
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
	TouchableWithoutFeedback,
	Switch
} from 'react-native';

import * as yup from 'yup';
import { compose } from 'recompose';
import { Dimensions, Image, ActivityIndicator } from 'react-native';
//import SelectContact from '../../selectContact';
import Uploadimg from '../../../components/uploadimg';

import * as SQLite from 'expo-sqlite';
import { handleTextInput, withPickerValues, Formik } from 'formik';

import NetInfo from '@react-native-community/netinfo';
import * as Network from 'expo-network';
import FormButton from '../../../component/FormButton';

import DropdownAlert from 'react-native-dropdownalert';
import { TextField, FilledTextField, OutlinedTextField } from 'react-native-material-textfield';
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

const { buildYup } = require('json-schema-to-yup');

const newPlaceholder = {
	label: 'انتخاب کنید',
	value: ''
};

class qtesti extends Component {
	/* #region constructor */
	constructor(props) {
		super(props);
		this.state = {
			courses: [],
			selectedItems: [ '92iijs7yta', '667atsas' ],
			items: [
				{
					id: '92iijs7yta',
					name: 'Ondo'
				},
				{
					id: 'a0s0a8ssbsd',
					name: 'Ogun'
				},
				{
					id: '16hbajsabsd',
					name: 'Calabar'
				},
				{
					id: 'nahs75a5sg',
					name: 'Lagos'
				},
				{
					id: '667atsas',
					name: 'Maiduguri'
				},
				{
					id: 'hsyasajs',
					name: 'Anambra'
				},
				{
					id: 'djsjudksjd',
					name: 'Benue'
				},
				{
					id: 'sdhyaysdj',
					name: 'Kaduna'
				},
				{
					id: 'suudydjsjd',
					name: 'Abuja'
				}
			],
			//formikDefault: {},
			formikDefault: {
				title: '',
				classlist: [ '1' ],
				teacherlist: [ '2' ],
				image1: '',
				image1multipart: '',
				image1pgvisible: false,
				image1pg: 0
			},
			selectedParticipate: 'انتخاب گیرندگان',
			isSubmitting: false,
			retUser: [],
			messagegrp: [],
			isModalpikerVisible: false
		};
	}
	onSelectedItemsChange = (selectedItems) => {
		this.setState({ selectedItems });
		console.log(selectedItems);
	};
	async componentDidMount() {
		const { navigation } = this.props;
		const eformsID = navigation.getParam('eformsID');
		const mode = navigation.getParam('mode');
		let res = await this.loadAPI();
		console.log('after api');
		this.setState({
			courses: [
				{ label: 'womanqqw', value: '1' },
				{ label: 'man', value: '2' },
				{ label: 'undifined', value: '3' }
			]
		});
		this.setState({
			formstruct: [
				{
					name: 'افزودن سئوال تستی',
					direction: 'rtl',
					fields: [
						{
							id: 'soal',
							placeholder: '',
							caption: 'متن سئوال:',
							type: 'textbox',
							multiline: true
						},
						{
							mobileurl: 'image',
							multipart: 'imagemultipart',
							progress: 'imagepg',
							progressvisible: 'imagepgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس متن سئوال  ',
							type: 'image'
						},
						{
							id: 'g1',
							placeholder: '',
							caption: 'گزینه ۱',
							type: 'textbox',
							multiline: true
						},
						{
							mobileurl: 'image1',
							multipart: 'image1multipart',
							progress: 'image1pg',
							progressvisible: 'image1pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس گزینه ۱',
							type: 'image'
						},
						{
							id: 'g2',
							placeholder: '',
							caption: 'گزینه ۲',
							type: 'textbox',
							multiline: true
						},
						{
							mobileurl: 'image2',
							multipart: 'image2multipart',
							progress: 'image2pg',
							progressvisible: 'image2pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس گزینه ۲',
							type: 'image'
						},
						{
							id: 'g3',
							placeholder: '',
							caption: 'گزینه ۳',
							type: 'textbox',
							multiline: true
						},
						{
							mobileurl: 'image3',
							multipart: 'image3multipart',
							progress: 'image3pg',
							progressvisible: 'image3pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس گزینه ۳',
							type: 'image'
						},
						{
							id: 'g4',
							placeholder: '',
							caption: 'گزینه ۴',
							type: 'textbox',
							multiline: true
						},
						{
							mobileurl: 'image4',
							multipart: 'image4multipart',
							progress: 'image4pg',
							progressvisible: 'image4pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس گزینه ۴',
							type: 'image'
						},

						{
							id: 'gsahih',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'گزینه صحیح',
							type: 'radio',

							options: [ '1', '2', '3', '4' ]
						},
						{
							id: 'coursecode',
							placeholder: 'فامیل را وارد کنید',
							caption: 'نام درس',
							type: 'combobox',
							keyboardType: 'numberic',
							options: [
								{ label: '1', value: '1' },
								{ label: '2', value: '2' },
								{ label: '3', value: '3' },
								{ label: '4', value: '4' },
								{ label: '5', value: '5' },
								{ label: '6', value: '6' },
								{ label: '7', value: '7' },
								{ label: '8', value: '8' },
								{ label: '9', value: '9' },
								{ label: '10', value: '10' },
								{ label: '11', value: '11' },
								{ label: '12', value: '12' },
								{ label: '13', value: '13' },
								{ label: '14', value: '14' },
								{ label: '15', value: '15' },
								{ label: '16', value: '16' },
								{ label: '17', value: '17' },
								{ label: '18', value: '18' },
								{ label: '19', value: '19' },
								{ label: '20', value: '20' },
								{ label: '21', value: '21' },
								{ label: '22', value: '22' },
								{ label: '23', value: '23' },
								{ label: '24', value: '24' }
							]
						},

						{
							id: 'classlist',
							placeholder: 'فامیل را وارد کنید',
							caption: 'نام درس',
							type: 'combobox1',
							keyboardType: 'numberic',
							options: [
								{ id: '1', name: 'ریاضی' },
								{ id: '2', name: 'فارسی' },
								{ id: '3', name: 'علوم' },
								{ id: '4', name: 'honar' },
								{ id: '5', name: 'jaban' }
							]
						},
						{
							id: 'teacherlist',
							placeholder: 'فامیل را وارد کنید',
							caption: 'نام درس',
							type: 'combobox1',
							keyboardType: 'numberic',
							options: [
								{ id: '1', name: 'ghasemi' },
								{ id: '2', name: 'shabani' },
								{ id: '3', name: 'ali dad' }
							]
						},

						{
							id: 'fasl',
							placeholder: 'فامیل را وارد کنید',
							caption: 'شماره فصل',
							type: 'combobox',
							keyboardType: 'numberic',
							options: this.state.courses
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
						soal: {
							description: 'Name of the person',
							type: 'string'
						},
						g1: {
							description: 'Name of the person',
							type: 'string'
						},
						g2: {
							description: 'Name of the person',
							type: 'string'
						},
						fasl: {
							description: 'Name of the person',
							type: 'string'
						},
						gsahih: {
							description: 'Name of the person',
							type: 'string'
						},
						coursecode: {
							description: 'Name of the person',
							type: 'string'
						}
					},
					required: [ 'soal', 'g1', 'g2', 'fasl', 'gsahih', 'coursecode' ]
				},
				{
					// for error messages...
					errMessages: {
						soal: {
							required: 'متن سئوال را وارد کنید'
						},
						g1: {
							required: 'گزینه اول را وارد کنید'
						},
						g2: {
							required: 'گزینه دوم را وارد کنید'
						},
						gsahih: {
							required: 'گزینه صحیح را وارد کنید'
						},
						fasl: {
							required: ' فصل را وارد کنید'
						},
						coursecode: {
							required: ' نام درس را وارد کنید'
						}
					}
				}
			]
		});
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
			this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			return;
		}
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		//global.examID = '26668';
		//global.adress = 'http://192.168.1.12:8080/';
		let uurl = global.adress + '/pApi.asmx/setMessage?p=' + param + '&json=' + jsonstr;
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

	handleimgpress = () => {};

	handeleUploadfile = async ([ item ]) => {
		try {
			let url = '';
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
				if (size > this.state.formikDefault[item.maxSize]) {
					console.log('filesize err:');

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
				console.log('fileUri');
				const fileUri = `${FileSystem.documentDirectory}${name}`;
				//console.log('salam:' + fileUri);

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
					this.fileUpload1(pickerResult, document);
				}

				//this.fileUpload1(pickerResult, document);
				console.log('start!');
				const xhr = new XMLHttpRequest();
				xhr.open('POST', 'http://api.farsmahd.ir/api/upload');
				xhr.onload = () => {
					console.log('end!');

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

				// this.setState({
				// 	file1pgVisible: true
				// });

				// 7. track upload progress
				if (xhr.upload) {
					// track the upload progress
					xhr.upload.onprogress = ({ total, loaded }) => {
						const uploadProgress = loaded / total;
						console.log(uploadProgress);
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
		} catch (error) {
			this.setState({
				success: false,
				successModVisible: true,
				successLineText: `We can't support this file.!`
			});
		}
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

	render() {
		const { selectedItems } = this.state;
		if (!this.state.formstruct) return <Loading />;
		//const { otherParam } = route.params;
		// if (this.props.formstruct.length == undefined || !this.state.formikDefault)
		// 	return (
		// 		<View>
		// 			<Text>Loading</Text>
		// 		</View>
		// 	);

		const yupSchema = buildYup(this.state.formstruct[1], this.state.formstruct[2]);

		GLOBAL.dynamic = this;
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
		if (this.state.formikDefault.title == undefined) return <Loading />;
		//** */	const { bindSubmitForm } = this.props;

		return (
			<View style={{ backgroundColor: '#f6fbff' }}>
				{/* <RichEditor
					ref={(r) => (this.richtext = r)}
					initialContentHTML={
						'Hello <b>World</b> <p>this is a new paragraph</p> <p>this is another new paragraph</p>'
					}
					//editorInitializedCallback={() => this.onEditorInitialized()}
				/>
				<RichToolbar
					editor={that.richtext}
					actions={[
						actions.setBold,
						actions.setItalic,
						actions.insertBulletsList,
						actions.insertOrderedList,
						actions.insertImage,
						'customAction'
					]}
					// iconMap={{
					// 	customAction: customIcon
					// }}
					// customAction={this.handleCustomAction}
				/> */}

				<ScrollView>
					<Formik
						// innerRef={formRef}
						style={{ backgroundColor: 'red' }}
						initialValues={this.state.formikDefault}
						enableReinitialize={true}
						validateOnBlur={false}
						validateOnChange={false}
						onSubmit={(values) => {
							//**let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');
							//**this.apiPost(JSON.stringify(objJsonB64));
							alert(JSON.stringify(values));
							//console.log(JSON.stringify(values));
							//}, 1000);
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
							isValid,
							handleSubmit,
							resetForm,
							submitForm
						}) => {
							//**bindSubmitForm(submitForm);
							return (
								<View style={[ styles.formContainer ]}>
									<Text style={[ defaultStyles.lblformcaption ]}>
										{this.state.formstruct[0].name}
									</Text>
									{this.state.formstruct[0].fields.map((item) => {
										if (item.type == 'textbox')
											return (
												<Input
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
														item.multiline ? { height: 190, borderRadius: 15 } : {}
													]}
													inputStyle={[
														defaultStyles.inputStyle,
														item.multiline
															? { padding: 10, textAlign: 'right', height: 190 }
															: null
													]}
													label={item.caption}
													placeholder={item.placeholder}
													errorStyle={defaultStyles.err}
													errorMessage={errors[item.id]}
													containerStyle={{ borderWidth: 0 }}
												/>
											);
										else if (item.type == 'combobox1')
											return (
												<View style={{ flex: 1 }}>
													<MultiSelect
														//hideTags
														items={item.options}
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
															// if (e.length > 2) {
															// 	const elementsIndex = this.state.formstruct[0].fields.findIndex(
															// 		(element) => element.id == 'classlist'
															// 	);
															// 	let newArray = [ ...this.state.formstruct ];
															// 	console.log(newArray[0].fields);
															// 	newArray[0].fields[elementsIndex] = {
															// 		...newArray[0].fields[elementsIndex],
															// 		options: [ { id: '10', name: '1234' } ]
															// 	};
															// 	this.setState({
															// 		formstruct: newArray
															// 	});
															// 	console.log(newArray);
															// }
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
															borderWidth: 1
														}}
													/>
													<View>
														{this.multiselect ? (
															this.multiselect.getSelectedItemsExt()
														) : null}
													</View>
												</View>
											);
										else if (item.type == 'combobox')
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
																marginTop: -15,
																fontSize: 14,
																color: defaultStyles.colors.medium
															}
														]}
													>
														{item.caption}
													</Text>

													<View style={[ defaultStyles.shadow, defaultStyles.viewBtn ]}>
														<RNPickerSelect
															style={pickerStyle}
															itemKey={values[item.id]}
															value={this.state.formikDefault[item.id]}
															placeholder={newPlaceholder}
															onValueChange={(e) => {
																this.setState((prevState) => ({
																	formikDefault: {
																		...prevState.formikDefault,
																		[item.id]: e
																	}
																}));
															}}
															items={item.options}
														/>
													</View>
													<Text>{errors[item.id]}</Text>
												</View>
											);
										else if (item.type == 'radio')
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
																marginTop: -15,
																fontSize: 14,
																color: defaultStyles.colors.medium
															}
														]}
													>
														{item.caption}
													</Text>
													<ButtonGroup
														//vertical={true}
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
												<View>
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
													<Switch
														style={{
															marginStart: 15,
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
																	[item.id]: selectedIndex
																}
															}));
														}}
														value={values[item.id] == 1 ? true : false}
													/>
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
														key={1}
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
															//console.log(this.state.formikDefault[item.mobileurl]);
															let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
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
																//this.ImageUpload1(pickerResult.uri);
																let url = pickerResult.uri;
																console.log(url);
																const xhr = new XMLHttpRequest();
																xhr.open('POST', 'http://api.farsmahd.ir/api/upload');
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
																onPress={() => {
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
																	this.state.formikDefault[item.mobileurl] ==
																		undefined && (
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
																				size={24}
																				color="#bbb"
																			/>
																		</View>
																	)}
																	{/*  */}
																	{!this.state.formikDefault[item.progressvisible] &&
																	this.state.formikDefault[item.mobileurl] !=
																		undefined && (
																		<View>
																			<Icon
																				name="file"
																				size={24}
																				color="orange"
																			/>
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
										onPress={handleSubmit}
										// onPress={() => {
										// 	console.log(JSON.stringify(this.state.formikDefault));
										// }}
										widthb={'100%'}
										heightb={55}
										borderRadiusb={45}
										style={{ margin: 16 }}
										containerStyle={[ defaultStyles.shadowx, { marginTop: 20 } ]}
										//disabled={!isValid }
										loading={this.state.isSubmitting}
										title="ثبت "
									/>
								</View>
							);
						}}
					</Formik>
				</ScrollView>

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
		borderStyle: 'dashed',
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
		paddingTop: 20,
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

console.disableYellowBox = true;
export default withNavigation(qtesti);
