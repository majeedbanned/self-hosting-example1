import React, { PureComponent } from 'react';
import { userInfo, toFarsi, encrypt, getHttpAdress } from '../components/DB';
import Modal from 'react-native-modalbox';
import Loading from '../components/loading';
import i18n from 'i18n-js';
import { Snackbar } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import Modalm from 'react-native-modal';
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, Button, Image, Dimensions } from 'react-native';
// import Fixgridcell from '../components/fixgridcell';
import { FormButton } from '../component/FormButton';
import Workbookdt from '../screen/workbook-detail';

import defaultStyles from '../config/styles';

import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons, AntDesign } from '@expo/vector-icons';
// import Modal, {
// 	ModalTitle,
// 	ModalContent,
// 	ModalFooter,
// 	ModalButton,
// 	SlideAnimation,
// 	ScaleAnimation
// } from 'react-native-modals';
import { FlatGrid } from 'react-native-super-grid';
import { getCameraRollPermissionsAsync } from 'expo-image-picker';
//const NUM_ROWS_STEP = 10;
const CELL_WIDTH = 90;
const CELL_HEIGHT = 90;
let majid = 0;
const black = '#000';
const white = '#fff';
const colorhead = '#06a9ba';
const colorlight = '#06a9ba';
const styles = StyleSheet.create({
	container: { backgroundColor: white, marginVertical: 0, marginBottom: 80 },
	header: { flexDirection: 'row', borderTopWidth: 0, borderColor: black },
	identity: { position: 'absolute', width: CELL_WIDTH },
	body: {
		marginLeft: 50
		//CELL_WIDTH
	},
	itemContainerv: {
		justifyContent: 'flex-end',
		borderRadius: 20,
		paddingTop: 5,
		height: 90,
		width: 85
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
	imageavatar: {
		width: 35,
		height: 35,
		borderRadius: 45,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	cell: {
		width: CELL_WIDTH,
		height: CELL_HEIGHT,

		borderWidth: 0,
		borderBottomWidth: 0,
		//	borderRadius: 10,
		backgroundColor: 'white',
		borderColor: '#ccc'
	},
	gridView: {
		marginTop: 2,
		flex: 1
	},
	cellidentity: {
		width: CELL_WIDTH,
		height: CELL_HEIGHT,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderColor: black
	},
	column: { flexDirection: 'column' },
	cap: {
		//flex: 1,
		textAlign: 'center',
		fontFamily: 'iransans',
		borderRadius: 3,
		margin: 2,
		borderWidth: 0
	},
	cap3: {
		//flex: 1,
		borderWidth: 0,
		borderColor: 'green',
		padding: 2,
		fontSize: 11,
		textAlign: 'center',
		fontFamily: 'iransans',
		borderRadius: 4,
		marginTop: 5
	},
	cap2: {
		//flex: 1,
		textAlign: 'right',
		fontFamily: 'iransans',
		borderRadius: 3,
		marginTop: 0,
		marginRight: 6,
		flex: 1,
		margin: 2,
		borderWidth: 0
	},
	cap1: {
		//flex: 1,
		textAlign: 'left',
		fontFamily: 'iransans',
		borderRadius: 3,
		marginTop: 0,
		marginLeft: 6,
		flex: 1,
		margin: 2,
		borderWidth: 0
	},
	az: {
		flex: 0.4,
		backgroundColor: 'white',
		textAlign: 'center',
		borderColor: '#ccc',
		borderRadius: 3,
		margin: 2,
		borderWidth: 0
	}
});

class PureChild extends React.PureComponent {
	render() {
		const col = this.props.col1;
		const row = this.props.row1;
		const value = this.props.value1;
		const hozor = this.props.hozor;
		const courseCode = this.props.identity;

		if (!value) return null;
		return (
			<View key={col + '-' + row} style={[ styles.cell ]}>
				{/* {value.map((item) => ( */}
				<View
					onPress={() => {
						this.setState(
							{
								//GLOBAL.workbook.isModalpiker_message_Visible: true
							}
						);
						//alert(value.day + ' ' + courseCode);
					}}
					activeOpacity={0.7}
					style={{
						zIndex: 11111,
						borderColor: '#ccc',
						margin: 2,
						backgroundColor: '#e3f1fc',
						borderRadius: 5,
						justifyContent: 'center',
						flex: 1,
						borderWidth: 0,
						alignItems: 'center'
					}}
				>
					{/* <Image
						style={styles.imageavatar}
						source={{ uri: getHttpAdress() + 'child/' + value.teachercode + '.jpg' }}
					/> */}
					{/* <Text style={styles.cap}>{toFarsi(value.teachercode)}</Text> */}
					<View style={{ flexDirection: 'row' }}>
						{value.rclass != '0' &&
						value.grade != '' && (
							<Text numberOfLines={1} style={[ styles.cap1, { fontSize: 12 } ]}>
								{global.lang == 'fa' ? toFarsi(value.rclass) : value.rclass}
							</Text>
						)}
						{value.rkol != '0' &&
						value.grade != '' && (
							<Text numberOfLines={1} style={[ styles.cap2, { fontSize: 12 } ]}>
								{global.lang == 'fa' ? toFarsi(value.rkol) : value.rkol}
							</Text>
						)}
					</View>
					<Text numberOfLines={1} style={[ styles.cap, { color: 'green', fontFamily: 'iransans' } ]}>
						{global.lang == 'fa' ? toFarsi(value.grade) : value.grade}
					</Text>
					{value.progress != null &&
					value.grade != '' && (
						<Text
							numberOfLines={1}
							style={[
								styles.cap3,
								{
									//backgroundColor: 'red',
									color: value.progress.includes('-') ? 'red' : 'green',
									borderRadius: 5,
									paddingTop: -1,
									paddingBottom: -6
								}
								// item.progress != ''
								// 	? { fontSize: 11, backgroundColor: 'lightgreen' }
								// 	: { backgroundColor: 'green' }
							]}
						>
							{(global.lang == 'fa' ? toFarsi(value.progress) : value.progress) +
								(value.progress.includes('-') ? '↓' : value.progress == '' ? '' : '↑')}
						</Text>
					)}
				</View>
				{/* ))} */}
			</View>
			// </View>
		);
	}
}

class ImpureChild extends React.Component {
	render() {
		return (
			<View>
				<Text>{this.props.value}</Text>
			</View>
		);
	}
}

class Sheet extends React.PureComponent {
	constructor(props: {}) {
		super(props);

		this.headerScrollView = null;
		this.scrollPosition = new Animated.Value(0);
		this.scrollEvent = Animated.event([ { nativeEvent: { contentOffset: { x: this.scrollPosition } } } ], {
			useNativeDriver: false
		});

		this.state = {
			isModalpiker_message_Visible: false,
			cellpop: false,
			colpop: false,
			rowpop: false,

			valuetmp: 0,
			NUM_ROWS_STEP: 10,
			count: 0,
			NUM_COLS: 0,
			maindata1: [
				{
					//studentcode: 2295566177,
					idd: '2295566177',
					name: 'ریاضی',
					coursecode: '35628',
					days: [
						{
							day: 'مهر',
							grade: '18.75',
							rclass: '3',
							rkol: '13',
							progress: '+20'
						},
						{
							hozor: '',
							zang: 2,
							day: 'آبان',
							course: 'آزمایشکاه فیزیک',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'آذر',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'دی',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'دی',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						}
					]
				},
				{
					//studentcode: 2295566177,
					//idd: '2295566177',
					name: 'علوم',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: 'زنگ اول',
							course: 'علوم',
							teachername: 'جعفر پناهی ',
							teachercode: '44'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '39'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						}
					]
				},
				{
					//studentcode: 2295566177,
					//idd: '2295566177',
					name: 'حسابان',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: 'زنگ اول',
							course: 'علوم',
							teachername: 'جعفر پناهی ',
							teachercode: '44'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						}
					]
				},
				{
					//studentcode: 2295566177,
					//idd: '2295566177',
					name: 'یک شنبه',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: 'زنگ اول',
							course: 'علوم',
							teachername: 'جعفر پناهی ',
							teachercode: '44'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						}
					]
				},
				{
					//studentcode: 2295566177,
					//idd: '2295566177',
					name: 'یک شنبه',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: 'زنگ اول',
							course: 'علوم',
							teachername: 'جعفر پناهی ',
							teachercode: '44'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						}
					]
				},
				{
					//studentcode: 2295566177,
					//idd: '2295566177',
					name: 'یک شنبه',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: 'زنگ اول',
							course: 'علوم',
							teachername: 'جعفر پناهی ',
							teachercode: '44'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						}
					]
				},
				{
					//studentcode: 2295566177,
					//idd: '2295566177',
					name: 'یک شنبه',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: 'زنگ اول',
							course: 'علوم',
							teachername: 'جعفر پناهی ',
							teachercode: '44'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '43'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '229'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'riazi',
							teachername: 'مجید قاسمی',
							teachercode: '39'
						}
					]
				}
			],

			loading: false
		};
	}

	handleScroll = (e) => {
		if (this.headerScrollView) {
			let scrollX = e.nativeEvent.contentOffset.x;
			this.headerScrollView.scrollTo({ x: scrollX, animated: false });
		}
	};

	scrollLoad = () => this.setState({ loading: false, count: this.state.count + this.state.NUM_ROWS_STEP });

	handleScrollEndReached = () => {
		if (!this.state.loading) {
			this.setState({ loading: true }, () => setTimeout(this.scrollLoad, 500));
		}
	};
	formatCellforizen() {
		return (
			<View
				style={[
					styles.cell,
					{
						borderRadius: 6,
						backgroundColor: 'orange',
						marginLeft: 2,
						marginRight: 2,
						width: 46,
						height: 86,
						//marginBottom: -4,
						marginTop: 2
					}
				]}
			/>
		);
	}
	formatCell(col, row, value) {
		// return <Text>dfdfd</Text>;
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				key={col + '-' + row}
				// onPress={() => {
				// 	// global.fix_col = col;
				// 	// global.fix_row = row;
				// 	// this.refs.modal2.open();
				// 	// this.setState({
				// 	// 	cellpop: true
				// 	// });
				// }}

				onPress={() => {
					//alert('de');
					this.setState({ isModalpiker_message_Visible: false });
				}}
			>
				{/* //<Text>s</Text> */}
				<PureChild
					identity={this.state.maindata[col].coursecode}
					col1={col}
					value1={value}
					hozor={value.hozor}
				/>
			</TouchableOpacity>
		);
	}

	formatCellIdentitiy(col, row, value, name, lname) {
		//console.log(col + '-' + value);
		return (
			<View key={col + '-' + value} style={[ styles.cellidentity, { width: 60, borderWidth: 0 } ]}>
				{/* <TouchableOpacity
					onPress={() => {
						alert(value);
					}}
					style={styles.cellidentity}
				> */}
				<View
					key={col + '-' + value}
					style={{
						backgroundColor: '#06a9ba',
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						width: 46,
						borderRadius: 5,
						borderBottomWidth: 0,
						margin: 2
					}}
				>
					{/* <Text>{value}</Text> */}
					<Text
						style={[
							styles.cap,
							{
								color: 'white',
								borderWidth: 0,
								width: 80,
								textAlign: 'center',
								transform: [ { rotate: '270deg' } ]
							}
						]}
					>
						{toFarsi(name)}
					</Text>
					{/* <Text>{lname}</Text> */}
				</View>
				{/* </TouchableOpacity> */}
			</View>
		);
	}

	formatCellHeader(key, value) {
		return (
			<View key={key} style={styles.cell}>
				<TouchableOpacity
					activeOpacity={0.5}
					style={styles.cell}
					onPress={() => {
						//var someProperty = { ...this.state.maindata[0] };
						//someProperty.days[0].disc = [ { cap: 'sex' } ];
						//this.setState({ someProperty });
						//*** */ global.head_key = key;
						//*** */ this.refs.modal1.open();
						//	alert(value.zang);
						//this.setState({ colpop: true });
					}}
				>
					<View
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: '#f76d6d',
							flex: 1,
							borderRadius: 5,
							margin: 2
							//	transform: [ { scaleX: -1 } ]
						}}
					>
						<AntDesign name="clockcircleo" size={20} color="white" />
						<Text style={[ styles.cap, { color: 'white' } ]}>{toFarsi(value.day)}</Text>
						{/* <Text>{value.zang}</Text> */}
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	formatColumn = (section) => {
		let { item } = section;
		let cells = [];

		for (let i = 0; i < this.state.count; i++) {
			//alert(item.key);
			//	alert(this.state.maindata[i].days[parseInt(item.key)].disc.length);
			cells.push(
				this.formatCell(
					i,
					item.key,
					this.state.maindata[i].days[parseInt(item.key)] //.disc
				)
			);
		}

		return <View style={styles.column}>{cells}</View>;
	};

	formatHeader() {
		let cols = [];
		for (let i = 0; i < this.state.NUM_COLS; i++) {
			cols.push(
				this.formatCellHeader(
					i,
					this.state.maindata[0].days[i] == null ? '' : this.state.maindata[0].days[i]
					//`frozen-row-${i}` +
				)
			);
		}

		return (
			<View style={styles.header}>
				{this.formatCellforizen('frozen-row')}

				<ScrollView
					ref={(ref) => (this.headerScrollView = ref)}
					horizontal={true}
					//	style={{ transform: [ { scaleX: -1 } ] }}
					// onContentSizeChange={this.scrollListToStart.bind(this)}
					scrollEnabled={true}
					scrollEventThrottle={17}
					//	contentContainerStyle={styles.contentContainerStyle}
				>
					{cols}
				</ScrollView>
			</View>
		);
	}

	formatIdentityColumn() {
		let cells = [];
		for (let i = 0; i < this.state.count; i++) {
			cells.push(
				this.formatCellIdentitiy(
					i,
					'fix',
					this.state.maindata[i] == null ? 'nol' : this.state.maindata[i].studentcode,
					this.state.maindata[i] == null ? 'nol' : this.state.maindata[i].name,
					this.state.maindata[i] == null ? 'nol' : this.state.maindata[i].lname
				)
			);
		}

		return <View style={styles.identity}>{cells}</View>;
	}

	formatBody() {
		let data = [];
		for (let i = 0; i < this.state.NUM_COLS; i++) {
			data.push({ key: `${i}` });
		}
		//return
		//scrollToEnd = () => this.carousel.scrollToEnd({ animated: false });
		return (
			<View>
				{this.formatIdentityColumn()}
				<FlatList
					style={styles.body}
					horizontal={true}
					data={data}
					renderItem={this.formatColumn}
					//renderItem={() => <Text>dree</Text>}
					//stickyHeaderIndices={[ 0 ]}
					onScroll={this.scrollEvent}
					scrollEventThrottle={16}
					extraData={this.state}
				/>
			</View>
		);
	}

	formatRowForSheet = (section) => {
		let { item } = section;

		return item.render;
	};
	loadAPI = async (eformsID) => {
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
		let uurl = global.adress + '/pApi.asmx/getworkbook?g=&Id=' + '0' + '&p=' + param;
		console.log(uurl);
		try {
			uurl = encrypt(uurl);
			////console.log(uurl);
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
					maindata: retJson,

					isEditing: false
				}));

				this.setState({
					count: this.state.maindata.length,
					NUM_COLS: this.state.maindata[0].days.length
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

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerTitle: i18n.t('grades'),
			headerRight: () => null,
			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransans',
				color: colorhead
			}
		};
	};

	componentDidMount() {
		if (global.lang == 'en') {
			this.setState({
				maindata: [
					{
						name: ' Humanities',
						coursecode: '1111',
						days: [
							{
								day: 'Jun',
								grade: '13.05',
								rclass: '12',
								rkol: '12',
								progress: ''
							},
							{
								day: 'Feb',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'Mar',
								grade: '9.5',
								rclass: '11',
								rkol: '16',
								progress: ''
							},
							{
								day: 'Apr',
								grade: '10',
								rclass: '1',
								rkol: '1',
								progress: '2.5%'
							},
							{
								day: 'May',
								grade: '19.5',
								rclass: '11',
								rkol: '11',
								progress: '47.5%'
							},
							{
								day: 'Jun',
								grade: '19.25',
								rclass: '11',
								rkol: '11',
								progress: '-1.25%'
							},
							{
								day: 'Jul',
								grade: '7',
								rclass: '14',
								rkol: '30',
								progress: '-61.25%'
							},
							{
								day: 'Aug',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'Sep',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'Oct',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							}
						]
					},
					{
						name: 'Journalism',
						coursecode: '10011',
						days: [
							{
								day: 'معدل',
								grade: '13.8',
								rclass: '5',
								rkol: '13',
								progress: ''
							},
							{
								day: 'مهر',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'آبان',
								grade: '9.75',
								rclass: '7',
								rkol: '7',
								progress: ''
							},
							{
								day: 'آذر',
								grade: '10',
								rclass: '1',
								rkol: '1',
								progress: '1.25%'
							},
							{
								day: 'دی',
								grade: '19.5',
								rclass: '3',
								rkol: '6',
								progress: '47.5%'
							},
							{
								day: 'بهمن',
								grade: '20',
								rclass: '1',
								rkol: '1',
								progress: '2.5%'
							},
							{
								day: 'اسفند',
								grade: '9.75',
								rclass: '11',
								rkol: '11',
								progress: '-51.25%'
							},
							{
								day: 'فروردین',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'اردیبهشت',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'خرداد',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							}
						]
					},
					{
						name: 'Literary analysis ',
						coursecode: '10031',
						days: [
							{
								day: 'معدل',
								grade: '12.53',
								rclass: '13',
								rkol: '18',
								progress: ''
							},
							{
								day: 'مهر',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'آبان',
								grade: '8',
								rclass: '17',
								rkol: '28',
								progress: ''
							},
							{
								day: 'آذر',
								grade: '8.16',
								rclass: '12',
								rkol: '19',
								progress: '0.8%'
							},
							{
								day: 'دی',
								grade: '18.25',
								rclass: '13',
								rkol: '17',
								progress: '50.45%'
							},
							{
								day: 'بهمن',
								grade: '18.75',
								rclass: '9',
								rkol: '12',
								progress: '2.5%'
							},
							{
								day: 'اسفند',
								grade: '9.5',
								rclass: '6',
								rkol: '9',
								progress: '-46.25%'
							},
							{
								day: 'فروردین',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'اردیبهشت',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'خرداد',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							}
						]
					},
					{
						name: ' Poetry',
						coursecode: '10041',
						days: [
							{
								day: 'معدل',
								grade: '19.75',
								rclass: '10',
								rkol: '10',
								progress: ''
							},
							{
								day: 'مهر',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'آبان',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'آذر',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'دی',
								grade: '20',
								rclass: '1',
								rkol: '1',
								progress: ''
							},
							{
								day: 'بهمن',
								grade: '19.5',
								rclass: '10',
								rkol: '15',
								progress: '-2.5%'
							},
							{
								day: 'اسفند',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'فروردین',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'اردیبهشت',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'خرداد',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							}
						]
					},
					{
						name: 'Popular literature',
						coursecode: '10051',
						days: [
							{
								day: 'معدل',
								grade: '13.2',
								rclass: '7',
								rkol: '13',
								progress: ''
							},
							{
								day: 'مهر',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'آبان',
								grade: '8',
								rclass: '14',
								rkol: '26',
								progress: ''
							},
							{
								day: 'آذر',
								grade: '9.5',
								rclass: '6',
								rkol: '10',
								progress: '7.5%'
							},
							{
								day: 'دی',
								grade: '19.5',
								rclass: '7',
								rkol: '14',
								progress: '50.0%'
							},
							{
								day: 'بهمن',
								grade: '19.5',
								rclass: '7',
								rkol: '11',
								progress: ''
							},
							{
								day: 'اسفند',
								grade: '9.5',
								rclass: '6',
								rkol: '10',
								progress: '-50.0%'
							},
							{
								day: 'فروردین',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'اردیبهشت',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'خرداد',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							}
						]
					},
					{
						name: 'Rhetoric ',
						coursecode: '10071',
						days: [
							{
								day: 'معدل',
								grade: '16.33',
								rclass: '6',
								rkol: '15',
								progress: ''
							},
							{
								day: 'مهر',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'آبان',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'آذر',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'دی',
								grade: '20',
								rclass: '1',
								rkol: '1',
								progress: ''
							},
							{
								day: 'بهمن',
								grade: '19',
								rclass: '6',
								rkol: '15',
								progress: '-5.%'
							},
							{
								day: 'اسفند',
								grade: '10',
								rclass: '1',
								rkol: '1',
								progress: '-45.%'
							},
							{
								day: 'فروردین',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'اردیبهشت',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'خرداد',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							}
						]
					},
					{
						name: 'Technical writing',
						coursecode: '10081',
						days: [
							{
								day: 'معدل',
								grade: '13.83',
								rclass: '3',
								rkol: '3',
								progress: ''
							},
							{
								day: 'مهر',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'آبان',
								grade: '10',
								rclass: '1',
								rkol: '1',
								progress: ''
							},
							{
								day: 'آذر',
								grade: '8.75',
								rclass: '8',
								rkol: '27',
								progress: '-6.25%'
							},
							{
								day: 'دی',
								grade: '20',
								rclass: '1',
								rkol: '1',
								progress: '56.25%'
							},
							{
								day: 'بهمن',
								grade: '18.75',
								rclass: '5',
								rkol: '19',
								progress: '-6.25%'
							},
							{
								day: 'اسفند',
								grade: '5.5',
								rclass: '11',
								rkol: '38',
								progress: '-66.25%'
							},
							{
								day: 'فروردین',
								grade: '20',
								rclass: '1',
								rkol: '1',
								progress: '72.5%'
							},
							{
								day: 'اردیبهشت',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							},
							{
								day: 'خرداد',
								grade: '',
								rclass: '',
								rkol: '',
								progress: ''
							}
						]
					}
				]
			});

			this.setState((prevState) => ({
				//maindata: retJson,

				isEditing: false
			}));
			setTimeout(async () => {
				this.setState({
					count: this.state.maindata.length,
					NUM_COLS: this.state.maindata[0].days.length
				});
			}, 200);
		}

		if (global.lang == 'fa') this.loadAPI();
		this.listener = this.scrollPosition.addListener((position) => {
			this.headerScrollView.scrollTo({ x: position.value, animated: false });
		});

		setInterval(() => {
			//	this.setState({ valuetmp: Math.random() });
		}, 1000);
	}

	setAPI = async () => {};

	clickEventListener = (item) => {
		//const { navigate } = this.props.navigation;

		if (item.name == 'حاضر') {
			this.setAPI();
			var someProperty = { ...this.state.maindata[global.fix_col] };
			someProperty.days[global.fix_row].hozor = 1;
			this.setState({ someProperty, cellpop: false });
		} else if (item.name == 'غایب') {
			this.setAPI();
			var someProperty = { ...this.state.maindata[global.fix_col] };
			someProperty.days[global.fix_row].hozor = 2;
			this.setState({ someProperty, cellpop: false });
		} else if (item.name == 'تاخیر') {
			this.setAPI();
			var someProperty = { ...this.state.maindata[global.fix_col] };
			someProperty.days[global.fix_row].hozor = 3;
			this.setState({ someProperty, cellpop: false });
		}
	};

	clickEventListenerHead = (item) => {
		//const { navigate } = this.props.navigation;

		if (item.name == 'همه حاضر') {
			this.setAPI();
			Object.keys(this.state.maindata).forEach((k) => {
				var someProperty = { ...this.state.maindata[k] };
				someProperty.days[global.head_key].hozor = 1;
				this.setState({ someProperty, colpop: false });
			});
		} else if (item.name == 'همه غایب') {
			this.setAPI();
			Object.keys(this.state.maindata).forEach((k) => {
				var someProperty = { ...this.state.maindata[k] };
				someProperty.days[global.head_key].hozor = 2;
				this.setState({ someProperty, colpop: false });
			});
		} else if (item.name == 'همه تاخیر') {
			this.setAPI();
			Object.keys(this.state.maindata).forEach((k) => {
				var someProperty = { ...this.state.maindata[k] };
				someProperty.days[global.head_key].hozor = 3;
				this.setState({ someProperty, colpop: false });
			});
		} else if (item.name == 'حذف حضور و غیاب') {
			this.setAPI();
			Object.keys(this.state.maindata).forEach((k) => {
				var someProperty = { ...this.state.maindata[k] };
				someProperty.days[global.head_key].hozor = 0;
				this.setState({ someProperty, colpop: false });
			});
		}
	};
	onClose() {
		console.log('Modal just closed');
	}

	onOpen() {
		console.log('Modal just opened');
	}

	onClosingState(state) {
		console.log('the open/close of the swipeToClose just changed');
	}
	render() {
		if (!this.state.maindata) return <Loading />;

		let body = this.formatBody();

		let data = [ { key: 'body', render: body } ];
		let test = [
			{ name: 'حاضر', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'غایب', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'تاخیر', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'ثبت وضعیت', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' }
		];

		let colmnu = [
			{ name: 'همه حاضر', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'همه غایب', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'همه تاخیر', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'حذف حضور و غیاب', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },

			{ name: 'ثبت فعالیت معلم', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: 'ثبت رویداد', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' }
		];
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;

		//console.log('ccc:' + this.formatRowForSheet);

		return (
			<View style={styles.container}>
				{/* <Button title="Basic modal" onPress={() => this.refs.modal1.open()} style={styles.btn} /> */}
				{this.formatHeader()}
				<FlatList
					data={data}
					renderItem={this.formatRowForSheet}
					//onEndReached={this.handleScrollEndReached}
					onEndReachedThreshold={0.005}
				/>
				{this.state.loading && <ActivityIndicator size="small" color="#000" />}

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
							isModalpiker_message_Visible: false
						})}
					onSwipeComplete={() =>
						this.setState({
							isModalpiker_message_Visible: false
						})}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					isVisible={this.state.isModalpiker_message_Visible}
				>
					<View style={{ flex: 1 }}>
						<TouchableOpacity
							onPress={() => {
								this.setState({
									isModalpiker_message_Visible: false
								});
							}}
							activeOpacity={0.8}
							style={{
								zIndex: 10,
								position: 'absolute',
								width: 40,
								height: 40,
								borderRadius: 40,
								marginLeft: 4,
								marginTop: -10,
								backgroundColor: 'red'
							}}
						>
							<Ionicons
								name="ios-close"
								size={52}
								color="#bbb"
								style={{
									marginRight: 10,
									marginTop: -5
								}}
							/>
						</TouchableOpacity>

						{/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
						<Workbookdt />
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

export default Sheet;
