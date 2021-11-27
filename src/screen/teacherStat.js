import React, { PureComponent } from 'react';
import { userInfo, toFarsi,encrypt, getHttpAdress } from '../components/DB';
import Modal from 'react-native-modalbox';
import Modalm from 'react-native-modal';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, Button, Image, Dimensions } from 'react-native';
// import Fixgridcell from '../components/fixgridcell';
import { FormButton } from '../component/FormButton';
import Workbookdt from './workbook-detail';

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
const CELL_HEIGHT = 50;
let majid = 0;
const black = '#000';
const white = '#fff';

const styles = StyleSheet.create({
	container: { backgroundColor: white, marginVertical: 0, marginBottom: 140 },
	header: { flexDirection: 'row', borderTopWidth: 0, borderColor: black },
	identity: { position: 'absolute', width: CELL_WIDTH },
	body: {
		marginLeft: 90
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
		borderWidth: 1,
		borderColor: 'green',
		padding: 2,
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
					{/* <View style={{ flexDirection: 'row' }}>
						<Text numberOfLines={1} style={[ styles.cap1, { fontSize: 12 } ]}>
							{toFarsi(value.rclass)}
						</Text>
						<Text numberOfLines={1} style={[ styles.cap2, { fontSize: 12 } ]}>
							{toFarsi(value.rkol)}
						</Text>
					</View> */}
					<Text numberOfLines={1} style={[ styles.cap, { color: 'green', fontFamily: 'iransans' } ]}>
						{toFarsi(value.grade)}
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

class teacherStat extends React.PureComponent {
	constructor(props: {}) {
		super(props);

		this.headerScrollView = null;
		this.scrollPosition = new Animated.Value(0);
		this.scrollEvent = Animated.event([ { nativeEvent: { contentOffset: { x: this.scrollPosition } } } ], {
			useNativeDriver: false
		});

		this.state = {
			selectedItem: 1,
			isModalpiker_message_Visible: false,
			cellpop: false,
			colpop: false,
			rowpop: false,

			valuetmp: 0,
			NUM_ROWS_STEP: 10,
			count: 0,
			NUM_COLS: 0,
			maindata: [
				{
					//studentcode: 2295566177,
					idd: '2295566177',
					name: 'محمد حسن جعفری',
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
						width: 86,
						height: 46,
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
					this.setState({ isModalpiker_message_Visible: true });
				}}
			>
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
						width: 85,
						borderRadius: 5,
						borderBottomWidth: 0,
						margin: 2
					}}
				>
					{/* <Text>{value}</Text> */}
					<Text
						numberOfLines={2}
						style={[
							styles.cap,
							{
								fontSize: 11,
								color: 'white',
								borderWidth: 0,
								width: 80,
								textAlign: 'center'
								//transform: [ { rotate: '270deg' } ]
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
						{/* <AntDesign name="clockcircleo" size={20} color="white" /> */}
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
					stickyHeaderIndices={[ 0 ]}
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

	componentDidMount() {
		this.listener = this.scrollPosition.addListener((position) => {
			this.headerScrollView.scrollTo({ x: position.value, animated: false });
		});

		this.setState({
			count: this.state.maindata.length,
			NUM_COLS: this.state.maindata[0].days.length
		});
		setInterval(() => {
			//	this.setState({ valuetmp: Math.random() });
		}, 1000);

		this.setState({
			cat: [
				{
					id: 1,

					name: 'گزارش کلی'
				},
				{
					id: 2,

					name: 'گزارش میانگین'
				}
			]
		});
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
	onPressHandler(id) {
		this.setState({ selectedItem: id });
	}
	render() {
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
				<View style={{ backgroundColor: 'white' }}>
					<FlatList
						extraData={this.state.selectedItem}
						data={this.state.cat}
						keyExtractor={(item) => item.id.toString()}
						horizontal
						style={{ paddingBottom: 4, borderWidth: 0, marginTop: 4, marginRight: 4, marginLeft: 4 }}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									onPress={() => {
										console.log(item.id);
										this.onPressHandler(item.id);
									}}
								>
									<View
										style={
											this.state.selectedItem === item.id ? (
												{
													backgroundColor: '#a976fb',
													fontFamily: 'iransans',
													borderWidth: 1,
													borderColor: '#a976fb',
													borderRadius: 15,
													margin: 3,
													paddingTop: 8,
													paddingRight: 8,
													paddingLeft: 8,
													paddingBottom: 3
												}
											) : (
												{
													backgroundColor: 'white',
													fontFamily: 'iransans',
													borderWidth: 1,
													borderColor: '#a976fb',
													borderRadius: 15,
													margin: 3,
													paddingTop: 8,
													paddingRight: 8,
													paddingLeft: 8,
													paddingBottom: 3
												}
											)
										}
									>
										<Text
											style={
												this.state.selectedItem === item.id ? (
													{
														color: 'white',
														fontFamily: 'iransans'
													}
												) : (
													{
														color: '#a976fb',

														fontFamily: 'iransans'
													}
												)
											}
										>
											{item.name}
										</Text>
									</View>
								</TouchableOpacity>
							);
						}}
					/>
				</View>

				{/* <Button title="Basic modal" onPress={() => this.refs.modal1.open()} style={styles.btn} /> */}
				{this.formatHeader()}
				<FlatList
					data={data}
					renderItem={this.formatRowForSheet}
					//onEndReached={this.handleScrollEndReached}
					onEndReachedThreshold={0.005}
				/>
				{this.state.loading && <ActivityIndicator size="small" color="#000"/>}

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
			</View>
		);
	}
}

export default teacherStat;
