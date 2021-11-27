import React, { Component } from 'react';
import { Input, ButtonGroup } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import TimePicker from 'react-native-24h-timepicker';
//import TimePicker from 'react-native-24h-timepicker';
import {
	Picker,
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
import Icon1 from 'react-native-vector-icons/FontAwesome';
import FormButton from '../component/FormButton';
import FormInput from '../component/FormInput';
import DismissKeyboardView from '../components/dismiskeyboard';
import CheckBox from 'react-native-check-box';
import AppTextInput from '../components/AppTextInput';

import i18n from 'i18n-js';
import { TextField, FilledTextField, OutlinedTextField } from 'react-native-material-textfield';
import { ScrollView } from 'react-native-gesture-handler';
import { handleTextInput, withPickerValues, Formik } from 'formik';
import * as yup from 'yup';
import DropdownAlert from 'react-native-dropdownalert';
import PersianCalendarPicker from 'react-native-persian-calendar-picker';
import { LocaleConfig, Calendar } from 'react-native-calendars-persian';
import { Colors } from 'react-native-paper';
import { toFarsi } from '../components/DB';
import PersianDatePicker from 'rn-persian-date-picker';
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

class examAdd extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formikDefault: {
				name: 'g',
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
				G_random: ''
			},
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
			ddd: ''
		};

		this.onDateChange = this.onDateChange.bind(this);
	}

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

	render() {
		//const { navigate } = this.props.navigation;

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
							// this.loadAPI(
							// 	values['username'],
							// 	values['password'],
							// 	values['schoolcode'],
							// 	values['adress'],
							// 	JSON.stringify(values)
							// );
							Alert.alert(JSON.stringify(values));
							//resetForm();

							//Alert.alert(JSON.stringify(values));
							//}, 1000);
						}}
						validationSchema={yup.object().shape(
							{
								// name: yup.string().required('لطفا نام آزمون را وارد کنید'),
								// shoro_namayesh: yup.string().required('لطفا تاریخ شروع آزمون را وارد کنید'),
								// payan_namayesh: yup.string().required('لطفا تاریخ پایان آزمون را وارد کنید'),
								// t_shoro_namayesh: yup.string().required('لطفا زمان شروع را وارد کنید'),
								// t_payan_namayesh: yup.string().required('لطفا زمان پایان را وارد کنید'),
								// speed: yup.string().required('لطفا نوع آزمون را وارد کنید'),
								// time_pasokh: yup.number().required('لطفا زمان پاسخگویی را وارد کنید'),
								// time_pasokh_sec: yup.number().required('لطفا زمان پاسخگویی(ثانیه) را وارد کنید')
							}
						)}
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
									value={values.name}
									onChangeText={handleChange('name')}
									leftIcon={<Icon name="user" size={24} color={colors.medium} />}
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
									value={values.tozihat}
									onChangeText={handleChange('tozihat')}
									leftIcon={<Icon name="user" size={24} color={colors.medium} />}
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
									onFocus={() => {
										this.picker.showPicker();
										//this.setState({ bottomModalAndTitle: true });
										//Keyboard.dismiss();
									}}
								>
									<View style={[ defaultStyles.shadow, defaultStyles.viewBtn ]}>
										<Text style={[ defaultStyles.lbl16, { margin: 10 } ]}>شرکت کنندگان</Text>
									</View>
								</TouchableOpacity>

								<Input
									onFocus={() => {
										Keyboard.dismiss();
										this.setState({
											modalcap: 'تاریخ شروع آزمون:',
											bottomModalAndTitle: true,
											dateSelected: this.state.dateSelected_shoro_namayesh
										});

										//console.log('ddddd:' + this.state.dateSelected_shoro_namayesh);
									}}
									keyboardType="numeric"
									//value={this.state.shoro_namayesh}
									onChangeText={handleChange('shoro_namayesh')}
									leftIcon={<Icon name="user" size={24} color="black" />}
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
									leftIcon={<Icon name="user" size={24} color="black" />}
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
									leftIcon={<Icon name="user" size={24} color="black" />}
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
								{/* <View> */}
								<Text style={[ defaultStyles.lbl16, , styles.capstyle ]}>نوع آزمون</Text>
								<View style={[ defaultStyles.shadow, defaultStyles.viewBtn ]}>
									<RNPickerSelect
										style={pickerStyle}
										value={values.speed}
										//onChangeText={handleChange('sport')}
										placeholder={newPlaceholder}
										onValueChange={handleChange('speed')}
										items={noeazmoon}
									/>
								</View>
								<ErrorMessage style={{ borderWidth: 1 }} errorValue={errors.speed} />
								{/* </View> */}
								<Input
									keyboardType="numeric"
									value={this.state.time_pasokh}
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
								<Input
									keyboardType="numeric"
									value={this.state.time_pasokh_sec}
									onChangeText={handleChange('time_pasokh_sec')}
									value={values.time_pasokh_sec}
									errorMessage={errors.time_pasokh_sec}
									keyboardType="numeric"
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
									selectedIndex={values.direction}
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
									selectedIndex={values.tartib_namayesh}
									buttonStyle={[ defaultStyles.shadow, { borderRadius: 45 } ]}
									textStyle={{ fontFamily: 'iransans' }}
									buttons={[ 'درهم', 'اول تشریحی', 'اول تستی' ]}
									innerBorderStyle={{ borderWidth: 4, color: 'white' }}
									containerStyle={{ height: 50, borderRadius: 45 }}
								/>
								<Input
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
									value={values.show_nomre}
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
									value={values.namayesh_pasokh}
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
									value={values.G_random}
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
									loading={this.state.isSubmitting}
									title="ثبت"
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
										} //this.state.dateSelected
									});
								} else if (this.state.modalcap == 'تاریخ پایان آزمون:') {
									this.setState({
										dateSelected: {
											[day.dateString]: { selected: true, selectedColor: '#466A8F' }
										},
										dateSelected_payan_namayesh: {
											[day.dateString]: { selected: true, selectedColor: '#466A8F' }
										}
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

				<Modal deviceWidth={deviceWidth} deviceHeight={deviceHeight} isVisible={this.state.isModalVisible}>
					<View style={{ flex: 1 }}>
						<Text>Hello!</Text>
						<Button title="Hide modal" onPress={this.toggleModal} />
						<SelectUser />
					</View>
				</Modal>

				<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
			</View>
		);
	}
}

export default examAdd;
const styles = StyleSheet.create({
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
