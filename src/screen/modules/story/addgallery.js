import React, { Component, useRef } from 'react';
import { userInfo, getHttpAdress } from '../../../components/DB';

import { Input, ButtonGroup } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import ProgressCircle from 'react-native-progress-circle';
import RNPickerSelect from 'react-native-picker-select';
import RadioItem from '../../../components/radioItem';
import Loading from '../../../components/loading';

var Buffer = require('buffer/').Buffer;
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

class addgallery extends Component {
	/* #region constructor */
	constructor(props) {
		super(props);
		this.state = {
			formikDefault: [],
			formstruct: [
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
						,
						{
							mobileurl: 'image7',
							multipart: 'image7multipart',
							progress: 'image7pg',
							progressvisible: 'image7pgvisible',
							placeholder: 'وضعیت ازدواج را وارد کنید',
							caption: 'عکس را انتخاب کنید',
							type: 'image'
						},
						{
							id: 'periority',
							placeholder: 'عدد یک تا ده وارد کنید',
							caption: 'اولویت نمایش',
							type: 'textbox',
							keyboardType: 'numberic'
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
			// formikDefault: {
			// 	title: '',

			// 	image1: '',
			// 	image1multipart: '',
			// 	image1pgvisible: false,
			// 	image1pg: 0
			// },
			selectedParticipate: 'انتخاب گیرندگان',
			isSubmitting: false,
			retUser: [],
			messagegrp: [],
			isModalpikerVisible: false
		};
	}

	componentDidMount() {
		const { navigation } = this.props;
		const storyID = navigation.getParam('storyID');
		const mode = navigation.getParam('mode');

		if (mode == 'edit') {
			this.loadAPI(storyID);
		}

		//alert(storyID);
		this.setState({
			//	formikDefault: this.props.formikDefault,
			fileSize: 5000000
		});
	}
	loadAPI = async (storyID) => {
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
		let uurl = global.adress + '/pApi.asmx/getStoryID?id=' + storyID + '&p=' + param;
		//console.log(uurl);
		//return;
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

				this.setState((prevState) => ({
					formikDefault: retJson,

					isEditing: false
				}));

				if (this.state.formikDefault.mainImage != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							image1: getHttpAdress() + 'media/' + this.state.formikDefault.mainImage
						}
					}));
				}

				if (this.state.formikDefault.image2 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							image2: getHttpAdress() + 'media/' + this.state.formikDefault.image2
						}
					}));
				}

				if (this.state.formikDefault.image3 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							image3: getHttpAdress() + 'media/' + this.state.formikDefault.image3
						}
					}));
				}

				if (this.state.formikDefault.image4 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							image4: getHttpAdress() + 'media/' + this.state.formikDefault.image4
						}
					}));
				}

				if (this.state.formikDefault.image5 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							image5: getHttpAdress() + 'media/' + this.state.formikDefault.image5
						}
					}));
				}

				if (this.state.formikDefault.image6 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							image6: getHttpAdress() + 'media/' + this.state.formikDefault.image6
						}
					}));
				}

				if (this.state.formikDefault.image7 != '');
				{
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							image7: getHttpAdress() + 'media/' + this.state.formikDefault.image7
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
			return;
		}
		/* #endregion */

		this.setState({ isSubmitting: true, endaction: true });
		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/setStory?p=' + param + '&json=' + jsonstr;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						isSubmitting: false,
						endaction: false
					});
					return;
				}

				if (retJson.result == 'ok')
					this.setState((prevState) => ({
						formikDefault: {
							...prevState.formikDefault,
							id: retJson.id
						},
						endaction: false,
						serverMsg: retJson.msg,
						isSubmitting: false
					}));
			}
		} catch (e) {
			console.log('err');
			this.setState({
				serverMsg: 'خطا',
				isSubmitting: false,
				endaction: false
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
				//console.log('pp:' + picked.size);
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
					//	console.log(picked.uri);
					//console.log(fileUri);
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
				//console.log('start!');
				//alert();
				const xhr = new XMLHttpRequest();
				//xhr.open('POST', 'http://api.farsmahd.ir/api/upload');
				xhr.open('POST', global.adress + 'dcfgh' + ':8180' + '/api/upload');

				xhr.onload = () => {
					//console.log('end!');

					//console.log(xhr.response);

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
					//console.log(e, 'upload failed');
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
				//console.log('start send!');

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
		} catch (error) {
			this.setState({
				success: false,
				successModVisible: true,
				successLineText: `We can't support this file.!`
			});
		}
	};

	handeleDeleteM = ([ item ]) => {
		//console.log(item);
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
		if (!this.state.formikDefault)
			return (
				<Loading />
				// <View style={styles.container}>
				// 	<View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
				// 		<ActivityIndicator style={{ color: '#000' }} />
				// 	</View>
				// </View>
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
						validateOnChange={false}
						onSubmit={(values) => {
							let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');
							this.apiPost(JSON.stringify(objJsonB64));

							//**let objJsonB64 = Buffer.from(JSON.stringify(values)).toString('base64');
							//**this.apiPost(JSON.stringify(objJsonB64));
							//alert(JSON.stringify(values));
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
																//console.log(url);
																const xhr = new XMLHttpRequest();
																//xhr.open('POST', 'http://api.farsmahd.ir/api/upload');
																//alert(global.adress + '' + ':8180' + '/api/upload');
																xhr.open(
																	'POST',
																	global.adress.replace(':8080', '') +
																		'' +
																		':8181' +
																		'/api/upload'
																);

																xhr.onload = () => {
																	//console.log(xhr.response);

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
																	//console.log(e, 'upload failed');
																};
																// 4. catch for request timeout
																xhr.ontimeout = (e) => {
																	//console.log(e, 'upload timeout');
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
																		// console.log(
																		// 		this.state.formikDefault[item.progress]
																		// 	);
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

															//	console.log(this.state.formikDefault.radio);
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
																	// console.log(
																	// 	this.state.formikDefault[item.mobileurl]
																	// );
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
									<Text style={[ defaultStyles.lbl16, { textAlign: 'center' } ]}>
										{this.state.serverMsg}
									</Text>

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
										disabled={this.state.endaction}
										serverMsg={!this.state.serverMsg}
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
export default withNavigation(addgallery);
