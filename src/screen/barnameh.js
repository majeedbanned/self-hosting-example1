import React, { PureComponent } from 'react';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import Modal from 'react-native-modalbox';
import NetInfo from '@react-native-community/netinfo';

import Loading from '../components/loading';
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, Button, Image } from 'react-native';
// import Fixgridcell from '../components/fixgridcell';
import { FormButton } from '../component/FormButton';
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
const CELL_WIDTH = 100;
const CELL_HEIGHT = 90;
let majid = 0;
const black = '#000';
const white = '#fff';
const colorhead = '#06a9ba';
const colorlight = '#06a9ba';

const styles = StyleSheet.create({
	container: { backgroundColor: white, marginVertical: 0, marginBottom: 80, alignItems: 'flex-start' },
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
		//direction: 'ltr',
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
		//const hozor = this.props.hozor;

		if (!value) return null;
		return (
			<View key={col + '-' + row} style={[ styles.cell ]}>
				{/* {value.map((item) => ( */}
				<View
					style={{
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
					<Image
						style={styles.imageavatar}
						source={{ uri: getHttpAdress() + 'child/' + value.teachercode + '.jpg' }}
					/>
					{/* <Text style={styles.cap}>{toFarsi(value.teachercode)}</Text> */}
					<Text numberOfLines={1} style={[ styles.cap, { color: 'green' } ]}>
						{toFarsi(value.course)}
					</Text>
					<Text numberOfLines={1} style={[ styles.cap, { fontSize: 11 } ]}>
						{toFarsi(value.teachername)}
					</Text>
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
			cellpop: false,
			colpop: false,
			rowpop: false,

			valuetmp: 0,
			NUM_ROWS_STEP: 10,
			count: 0,
			NUM_COLS: 0,
			maindata1: [
				{
					name: 'شنبه',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: 'زنگ اول',
							course: 'ریاضی',
							teachername: 'مجید قاسمی',
							teachercode: '44'
						},
						{
							hozor: '',
							zang: 2,
							day: 'زنگ دوم',
							course: 'آزمایشکاه فیزیک',
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
		return (
			<TouchableOpacity
				activeOpacity={0.5}
				key={col + '-' + row}
				onPress={() => {
					// global.fix_col = col;
					// global.fix_row = row;
					// this.refs.modal2.open();
					// this.setState({
					// 	cellpop: true
					// });
				}}
			>
				<PureChild col1={col} value1={value} />
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
			<View key={key} style={[ styles.cell, { backgroundColor: 'green' } ]}>
				<TouchableOpacity
					activeOpacity={0.5}
					style={[ styles.cell, {} ]}
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
		//scrollToEnd = () => this.carousel.scrollToEnd({ animated: false });
		return (
			<View>
				{this.formatIdentityColumn()}
				<FlatList
					style={styles.body}
					horizontal={true}
					data={data}
					renderItem={this.formatColumn}
					// stickyHeaderIndices={[ 0 ]}
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
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			//return;
		}
		/* #endregion */

		//this.setState({ loading: true });
		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/getBarname?g=&Id=' + '0' + '&p=' + param;
		console.log(uurl);

		if (global.lang == 'en') {
			this.setState({
				maindata: [
					{
						name: 'Saturday',
						days: [
							{
								zang: '1',
								day: 'Part 1',
								course: 'Math 2',
								teachername: ' Josef Bill',
								teachercode: '3010'
							},
							{
								zang: '2',
								day: 'Part 2',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '4',
								day: 'Part 3',
								course: 'زبان خارجی 1',
								teachername: 'علي پور محمد',
								teachercode: '3010'
							},
							{
								zang: '8',
								day: 'Part 4',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '16',
								day: 'Part 5',
								course: 'زبان خارجي1',
								teachername: 'علي پور محمد',
								teachercode: '3010'
							},
							{
								zang: '32',
								day: 'Part 6',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '64',
								day: 'Part 7',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '128',
								day: 'Part 8',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '256',
								day: 'Part 9',
								course: '',
								teachername: '',
								teachercode: ''
							}
						]
					},
					{
						name: 'Sunday ',
						days: [
							{
								zang: '1',
								day: 'زنگ اول',
								course: 'زبان خارجي2',
								teachername: 'علي پور محمد',
								teachercode: '3010'
							},
							{
								zang: '2',
								day: 'زنگ دوم',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '4',
								day: 'زنگ سوم',
								course: 'زبان خارجي1',
								teachername: 'علي پور محمد',
								teachercode: '3010'
							},
							{
								zang: '8',
								day: 'زنگ چهارم',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '16',
								day: 'زنگ پنجم',
								course: 'زبان خارجي1',
								teachername: 'علي پور محمد',
								teachercode: '3010'
							},
							{
								zang: '32',
								day: 'زنگ ششم',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '64',
								day: 'زنگ هفتم',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '128',
								day: 'زنگ هشتم',
								course: '',
								teachername: '',
								teachercode: ''
							},
							{
								zang: '256',
								day: 'زنگ نهم',
								course: '',
								teachername: '',
								teachercode: ''
							}
						]
					}
				]
			});
			this.setState({
				count: this.state.maindata.length,
				NUM_COLS: this.state.maindata[0].days.length
			});
			return;
		}

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
			headerTitle: 'برنامه هفتگی',
			headerRight: () => null,
			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransansbold',
				color: colorhead
			}
		};
	};
	componentDidMount() {
		this.loadAPI();
		this.listener = this.scrollPosition.addListener((position) => {
			this.headerScrollView.scrollTo({ x: position.value, animated: false });
		});

		// this.setState({
		// 	count: this.state.maindata.length,
		// 	NUM_COLS: this.state.maindata[0].days.length
		// });
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

		return (
			<View style={styles.container}>
				{/* <Button title="Basic modal" onPress={() => this.refs.modal1.open()} style={styles.btn} /> */}
				<View>{this.formatHeader()}</View>
				<FlatList
					data={data}
					renderItem={this.formatRowForSheet}
					//onEndReached={this.handleScrollEndReached}
					onEndReachedThreshold={0.005}
				/>
				{this.state.loading && <ActivityIndicator />}

				<Modal
					style={[
						{
							borderRadius: 25,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'stretch',
							height: 115
						}
					]}
					entry={'top'}
					animationDuration={400}
					position={'center'}
					ref={'modal2'}
					swipeToClose={this.state.swipeToClose}
					onClosed={this.onClose}
					onOpened={this.onOpen}
					onClosingState={this.onClosingState}
				>
					<FlatGrid
						itemDimension={80}
						items={test}
						style={styles.gridView}
						spacing={10}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() => {
									this.refs.modal2.close();
									this.clickEventListener(item);
								}}
								style={{ flex: 1 }}
							>
								<View style={[ styles.itemContainer, { backgroundColor: item.bkcolor } ]}>
									{item.badge > 0 && <Text style={styles.badge}> 2 </Text>}

									<Ionicons
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
				</Modal>
				<Modal
					style={[
						{
							borderRadius: 25,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'stretch',
							height: 215
						}
					]}
					entry={'top'}
					animationDuration={400}
					position={'center'}
					ref={'modal1'}
					swipeToClose={this.state.swipeToClose}
					onClosed={this.onClose}
					onOpened={this.onOpen}
					onClosingState={this.onClosingState}
				>
					<FlatGrid
						items={colmnu}
						style={styles.gridView}
						itemDimension={83}
						spacing={10}
						renderItem={({ item }) => (
							<View>
								<TouchableOpacity
									onPress={() => {
										this.refs.modal1.close();
										this.clickEventListenerHead(item);
									}}
									style={{ flex: 1 }}
								>
									<View style={[ styles.itemContainerv, { backgroundColor: item.bkcolor } ]}>
										{item.badge > 0 && <Text style={styles.badge}> 2 </Text>}

										<Ionicons
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
							</View>
						)}
					/>
				</Modal>
			</View>
		);
	}
}

export default Sheet;
