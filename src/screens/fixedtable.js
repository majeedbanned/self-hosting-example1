import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import Mstyles from '../components/styles';
import Modal from 'react-native-modalbox';
import update from 'immutability-helper';
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, Button, Image } from 'react-native';
// import Fixgridcell from '../components/fixgridcell';
import { FormButton } from '../component/FormButton';
import defaultStyles from '../config/styles';
import Loading from '../components/loading';

import Icon from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
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
const pickerStyle = {
	inputIOS: {
		color: defaultStyles.colors.primary,
		fontSize: 15,
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
const newPlaceholder1 = {
	label: 'عنوان ارزشیابی',
	value: ''
};
const styles = StyleSheet.create({
	gradient: {
		borderRadius: 13,
		left: 0,
		right: 0,
		top: 0,
		marginBottom: 10,
		flex: 1,
		zIndex: 1,
		elevation: 2,
		height: 70,
		width: '100%',
		flexDirection: 'column'
	},
	aztitle: {
		width: '100%',
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'left',
		borderWidth: 0,

		fontSize: 18,
		color: 'white'
	},
	mainpanel: {
		zIndex: 122,
		elevation: 2,
		shadowColor: '#ccc',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.67,
		shadowRadius: 3.49
	},

	container: { backgroundColor: white, marginVertical: 0, marginBottom: 80 },
	header: { flexDirection: 'row', borderTopWidth: 0, borderColor: black },
	identity: { position: 'absolute', width: CELL_WIDTH },
	body: {
		marginLeft: 73
		//CELL_WIDTH
	},
	itemContainerv: {
		justifyContent: 'flex-end',
		borderRadius: 20,
		paddingTop: 5,
		height: 95,
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
		//borderWidth: 1,
		borderColor: '#ccc'
	},
	cell: {
		width: CELL_WIDTH,
		height: CELL_HEIGHT,
		margin: 0,
		borderWidth: 0,
		borderBottomWidth: 0,
		borderRadius: 5,
		backgroundColor: 'white',
		borderColor: '#ccc'
	},
	gridView: {
		marginTop: 2,
		flex: 1
	},
	cellidentity: {
		width: 73,
		height: CELL_HEIGHT,
		borderRightWidth: 0,
		borderBottomWidth: 0,
		borderColor: black
	},
	column: { flexDirection: 'column' },
	name: {
		fontSize: 12,
		fontFamily: 'iransans',
		color: 'white'
	},
	famil: {
		color: 'yellow',
		fontSize: 14,
		fontFamily: 'iransans'
		//color: 'white'
	},
	cap: {
		//flex: 1,
		textAlign: 'center',
		fontFamily: 'iransans',
		borderRadius: 3,
		margin: 0.5,
		paddingTop: 2,
		paddingStart: 3,
		paddingEnd: 3,
		fontSize: 12,
		borderColor: '#ccc',
		borderWidth: 1
	},
	az: {
		flex: 0.4,
		backgroundColor: 'white',
		textAlign: 'center',
		borderColor: '#ccc',
		borderRadius: 3,
		margin: 2,
		borderWidth: 0
	},
	cellnew: {
		margin: 29
	}
});

class PureChild extends React.PureComponent {
	render() {
		//console.log('rendering PureChild');
		const col = this.props.col1;
		const row = this.props.row1;
		const value = this.props.value1;
		const hozor = this.props.hozor;

		//const onprees = this.props.onprees;

		if (!value) return null;
		return (
			// <View style={{ borderWidth: 1 }}>
			<View
				key={col + '-' + row}
				style={[
					styles.cell
					// hozor == '' && { backgroundColor: 'white' },
					// hozor == 1 && { backgroundColor: defaultStyles.colors.lightgreen },
					// hozor == 2 && { backgroundColor: defaultStyles.colors.lightred },
					// hozor == 3 && { backgroundColor: defaultStyles.colors.lightyellow }
				]}
			>
				<View
					style={
						(styles.cellnew,
						[
							hozor == '' && {
								backgroundColor: 'white',
								margin: 2,
								borderRadius: 5,
								borderWidth: 1,
								borderColor: '#ccc',
								flex: 1,
								overflow: 'hidden',
								justifyContent: 'center'
							},
							hozor == 1 && {
								borderColor: '#cafad5',
								borderWidth: 1,
								backgroundColor: defaultStyles.colors.lightgreen,
								margin: 2,
								borderRadius: 5,
								flex: 1,
								overflow: 'hidden',
								justifyContent: 'center'
							},
							hozor == 2 && {
								backgroundColor: defaultStyles.colors.lightred,
								margin: 2,
								borderRadius: 5,
								flex: 1,
								borderWidth: 1,
								borderColor: '#f5c4d3',
								overflow: 'hidden',
								justifyContent: 'center'
							},
							hozor == 3 && {
								backgroundColor: defaultStyles.colors.lightyellow,
								margin: 2,
								borderRadius: 5,
								borderWidth: 1,
								borderColor: '#f7f1b0',
								flex: 1,
								overflow: 'hidden',
								justifyContent: 'center'
							}
						])
					}
				>
					{value.map((item) => (
						<View
							style={[
								{
									borderColor: '#ccc',
									margin: 2,
									backgroundColor: '#e3f1fc',
									borderRadius: 4,
									justifyContent: 'center',
									flexDirection: 'row',
									borderWidth: 0,
									alignItems: 'center'
								},
								hozor == '' && { backgroundColor: 'white' },
								hozor == 1 && { backgroundColor: defaultStyles.colors.lightgreen },
								hozor == 2 && { backgroundColor: defaultStyles.colors.lightred },
								hozor == 3 && { backgroundColor: defaultStyles.colors.lightyellow }
							]}
						>
							<Text style={styles.cap}>{toFarsi(item.cap)}</Text>
							{item.az != null && <Text style={styles.az}>{toFarsi(item.az)}</Text>}
						</View>
					))}
				</View>
			</View>
			// </View>
		);
		return (
			<View key={col + '-' + row} style={styles.cell}>
				{/* <TouchableOpacity
					onPress={() => {
						// var someProperty = { ...this.state.maindata[col] };
						// someProperty.days[row].disc = 'ddddd';
						// this.setState({ someProperty });
					}}
					style={styles.cell}
				> */}
				<View style={{ backgroundColor: 'yellow', flex: 1, borderRadius: 5, margin: 4 }}>
					{value.map((item) => (
						<View
							style={{
								borderColor: '#ccc',
								margin: 2,
								borderRadius: 4,
								justifyContent: 'center',
								flexDirection: 'row',
								borderWidth: 1,
								alignItems: 'center'
							}}
						>
							<Text style={styles.cap}>{item.cap}</Text>
							{item.az != null && <Text style={styles.az}>{item.az}</Text>}
						</View>
					))}
					{/* <Text>{value[0].cap}</Text> */}
				</View>
				{/* </TouchableOpacity> */}
			</View>
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
			cat: [
				{
					id: 1,

					name: 'لیست همه فرمها'
				},
				{
					id: 2,

					name: 'فرم های ثابت'
				},
				{
					id: 3,

					name: 'فرم های ثابت'
				}
			],
			cellpop: false,
			colpop: false,
			rowpop: false,

			valuetmp: 0,
			NUM_ROWS_STEP: 10,
			count: 0,
			NUM_COLS: 0,

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
						width: 68,
						height: 86,
						//marginBottom: -4,
						marginTop: 2
					}
				]}
			/>
		);
	}
	formatCell(col, row, value) {
		//console.log(value);
		//if (value == null) return null;
		//return <Fixgridcell />;

		return (
			<TouchableOpacity
				key={col + '-' + row}
				onPress={() => {
					global.fix_col = col;
					global.fix_row = row;
					this.refs.modal2.open();
					// this.setState({
					// 	cellpop: true
					// });
				}}
			>
				<PureChild col1={col} value1={value.disc} hozor={value.hozor} />
			</TouchableOpacity>
		);
		return (
			<TouchableOpacity
				onPress={() => {
					//var someProperty = { ...this.state.maindata[col] };
					//someProperty.days[row].disc = 'ddddd';
					this.setState({ NUM_ROWS_STEP: parseInt(this.state.NUM_ROWS_STEP) + 1 });
				}}
			>
				<Fixgridcell col1={this.state.NUM_ROWS_STEP} />
			</TouchableOpacity>
		);
	}

	formatCellIdentitiy(col, row, value, name, lname) {
		//console.log(col + '-' + value);
		return (
			<View key={col + '-' + value} style={styles.cellidentity}>
				<TouchableOpacity
					onPress={() => {
						alert(value);
					}}
					style={styles.cellidentity}
				>
					<View
						key={col + '-' + value}
						style={{
							backgroundColor: '#06a9ba',
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 5,
							//borderBottomWidth: 1,
							padding: 0,
							margin: 2
						}}
					>
						{/* <Text style={styles.stdcode}>{value}</Text> */}
						<Image
							style={styles.imageavatar}
							source={{ uri: getHttpAdress() + 'child/' + value + '.jpg' }}
						/>
						<Text numberOfLines={1} style={styles.name}>
							{toFarsi(name)}
						</Text>
						<Text numberOfLines={1} style={styles.famil}>
							{lname}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}

	formatCellHeader(key, value) {
		return (
			<View key={key} style={[ styles.cell ]}>
				<TouchableOpacity
					activeOpacity={0.6}
					style={[ styles.cell ]}
					onPress={() => {
						//var someProperty = { ...this.state.maindata[0] };
						//someProperty.days[0].disc = [ { cap: 'sex' } ];
						//this.setState({ someProperty });

						global.head_key = key;
						this.refs.modal1.open();
						//	alert(value.zang);
						//this.setState({ colpop: true });
					}}
				>
					<View
						style={{
							backgroundColor: '#06a9ba',
							flex: 1,
							borderRadius: 5,
							margin: 2,
							alignItems: 'center',
							justifyContent: 'center'
							//	transform: [ { scaleX: -1 } ]
						}}
					>
						<Text style={{ color: 'white', fontFamily: 'iransans' }}>{toFarsi(value.day)}</Text>
						<Text style={{ color: 'white', fontFamily: 'iransans' }}>{value.zang}</Text>
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
					//	`col-${i}-${item.key}` +
					// this.state.maindata[i] == null
					// 	? ''
					// 	: this.state.maindata[i].days[parseInt(item.key)] == null
					// 		? ''
					// 		: Object.values(this.state.maindata[i].days[parseInt(item.key)].disc[0].cap)
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

				{/* <View key="frozen-row" style={styles.cellfix}>
					<Text>frozen-row</Text>
				</View> */}
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
		console.log('componentDidMount');
		this.listener = this.scrollPosition.addListener((position) => {
			this.headerScrollView.scrollTo({ x: position.value, animated: false });
		});

		this.setState({
			Classdata: [
				{
					todayCourseList: [
						{ id: 1, name: 'ریاصس' },
						{ id: 2, name: 'عاوم' },
						{ id: 3, name: 'فارسی' },
						{ id: 4, name: 'farsi' },
						{ id: 5, name: 'farsi' },
						{ id: 6, name: 'farsi' },
						{ id: 7, name: 'farsi' },
						{ id: 8, name: 'farsi' },
						{ id: 9, name: 'farsi' }
					],
					ClassList: [ { name: 'zaban' }, { name: 'olom' } ],

					arz: [
						{ label: 'وضعیت انظباطی', value: '344' },
						{ label: ' کار در کلاس', value: '34534' },
						{ label: ' درک مطلب', value: '34' }
					],
					megh: [
						{ label: 'خیلی خوب', value: '65' },
						{ label: 'خوب', value: '456' },
						{ label: 'نیاز به تلاش', value: '57' }
					]
				}
			]
		});

		this.setState({
			maindata: [
				{
					studentcode: 39,
					idd: '44',
					name: 'مجید',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/02',

							disc: [ { key: '666', cap: '۱۹', az: '20' }, { cap: '1' } ]
						},
						{
							hozor: '',
							zang: 2,
							day: '1399/02/03',
							disc: [ { cap: '20', az: '20' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/02',

							disc: [ { cap: 'خیلی خوب' } ]
						},
						{
							hozor: 3,
							zang: 3,
							day: '1399/02/05',
							disc: [ { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: '',
							zang: 4,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: '',
							zang: 5,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: '',
							zang: 7,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						}
					]
				},
				{
					studentcode: 44,
					idd: '44',
					name: 'محمد حسن',
					lname: 'طارم جهرمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/02',
							disc: [ { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/03',
							disc: []
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/04',
							disc: [ { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/05',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						}
					]
				},
				{
					studentcode: 2295566178,
					idd: '2295566178',
					name: 'مجfید',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/02',
							disc: [ { cap: '18' }, { cap: '+19', az: '20' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/03',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/04',
							disc: [ { cap: 'sss1' }, { cap: 'sdfs' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/05',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						}
					]
				},
				{
					studentcode: 2295566178,
					idd: '2295566178',
					name: 'مجfید',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/02',
							disc: [ { cap: '18' }, { cap: '+19', az: '20' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/03',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/04',
							disc: [ { cap: 'sss1' }, { cap: 'sdfs' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/05',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						}
					]
				},
				{
					studentcode: 2295566178,
					idd: '2295566178',
					name: 'مجfید',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/02',
							disc: [ { cap: '18' }, { cap: '+19', az: '20' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/03',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/04',
							disc: [ { cap: 'sss1' }, { cap: 'sdfs' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/05',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						}
					]
				},
				{
					studentcode: 2295566178,
					idd: '2295566178',
					name: 'مجfید',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/02',
							disc: [ { cap: '18' }, { cap: '+19', az: '20' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/03',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/04',
							disc: [ { cap: 'sss1' }, { cap: 'sdfs' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/05',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						}
					]
				},
				{
					studentcode: 2295566178,
					idd: '2295566178',
					name: 'مجfید',
					lname: 'قاسمی',
					days: [
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/02',
							disc: [ { cap: '18' }, { cap: '+19', az: '20' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/03',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/04',
							disc: [ { cap: 'sss1' }, { cap: 'sdfs' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/05',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						},
						{
							hozor: 1,
							zang: 1,
							day: '1399/02/06',
							disc: [ { cap: 'sss1' }, { cap: 'ssse' }, { cap: 'sss3' }, { cap: 'sss4' } ]
						}
					]
				}
			]
		});

		setInterval(() => {
			this.setState(
				{
					//count: this.state.maindata.length,
					//NUM_COLS: this.state.maindata[0].days.length
				}
			);
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
		} else {
			//var someProperty = { ...this.state.maindata[global.fix_col] };
			// someProperty.days[global.fix_row].disc.push({ cap: 'hi' });
			// this.setState({ someProperty, cellpop: false });
			// this.setState({
			// 	maindata: [ ...someProperty.days[0].disc, { cap: 'hi' } ]
			// });
			// this.setState(
			// 	{
			// 		//maindata[1].days: []
			// 	}
			// );
			// let a = this.state.maindata.slice(); //creates the clone of the state
			// a[0].days[1].disc[0].cap = 'sex';
			// this.setState({ maindata: a });
			this.refs.modal_arz.open();
			var index = this.state.maindata[0].days[0].disc.findIndex((p) => p.key == '666');

			this.setState({
				maindata: update(this.state.maindata, {
					0: { days: { 0: { disc: { $splice: [ [ index, 1 ] ] } } } }
				})
			});

			this.setState({
				maindata: update(this.state.maindata, {
					0: { days: { 0: { disc: { 1: { cap: { $set: 'mire' } } } } } }
				})
			});

			this.setState({
				maindata: update(this.state.maindata, {
					[global.fix_col]: { days: { [global.fix_row]: { disc: { $push: [ { cap: '12', az: '16' } ] } } } }
				})
			});
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

	onPressCourse(item) {
		//alert(item.name);
	}
	render() {
		if (!this.state.maindata) return <Loading />;

		// if (this.state.Classdata[0].todayCourseList.length > 0) {

		// 	return (
		// 		<Modal
		// 			style={[
		// 				{
		// 					borderRadius: 25,
		// 					justifyContent: 'center',
		// 					alignItems: 'center',
		// 					alignSelf: 'stretch',
		// 					height: 510
		// 				}
		// 			]}
		// 			isOpen={true}
		// 			entry={'top'}
		// 			animationDuration={400}
		// 			position={'center'}
		// 			ref={'modal_emroz'}
		// 			swipeToClose={false}
		// 			//swipeToClose={this.state.swipeToClose}
		// 			onClosed={this.onClose}
		// 			onOpened={this.onOpen}
		// 			onClosingState={this.onClosingState}
		// 			initialNumToRender={10}
		// 			//style={Mstyles.contentList}
		// 			columnWrapperStyle={styles.listContainer}
		// 		>
		// 			<View style={{ width: '90%', marginBottom: 30 }}>
		// 				<Text
		// 					style={{
		// 						textAlign: 'left',
		// 						marginTop: 25,
		// 						fontFamily: 'iransans'
		// 					}}
		// 				>
		// 					کلاس های امروز
		// 				</Text>
		// 				<FlatList
		// 					data={this.state.Classdata[0].todayCourseList}
		// 					keyExtractor={(item) => item.id.toString()}

		// 					style={{
		// 						borderWidth: 1,
		// 						paddingBottom: 4,
		// 						marginRight: 15,
		// 						marginLeft: 14,
		// 						borderWidth: 0,
		// 						marginTop: 4,
		// 						marginRight: 4,
		// 						marginLeft: 4
		// 					}}
		// 					renderItem={({ item, index }) => {
		// 						return (
		// 							<View style={styles.mainpanel1}>
		// 								<TouchableOpacity onPress={() => this.onPressCourse(item)} activeOpacity={0.7}>
		// 									<LinearGradient
		// 										colors={[ '#36D1DC', '#5B86E5' ]}
		// 										start={{ x: 0, y: 1 }}
		// 										end={{ x: 1, y: 0 }}
		// 										style={styles.gradient}
		// 									>
		// 										<View
		// 											style={{
		// 												borderWidth: 0,
		// 												justifyContent: 'center',
		// 												flex: 1,
		// 												paddingLeft: 15
		// 											}}
		// 										>
		// 											<Text style={styles.aztitle}>{item.name}</Text>
		// 											{item.mohlat ? (
		// 												<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
		// 													{' مهلت تا: ' + toFarsi(item.mohlat)}
		// 												</Text>
		// 											) : null}
		// 										</View>
		// 									</LinearGradient>
		// 								</TouchableOpacity>
		// 							</View>
		// 						);
		// 					}}
		// 				/>
		// 			</View>
		// 		</Modal>
		// 	);
		// }
		this.setState({
			count: this.state.maindata.length,
			NUM_COLS: this.state.maindata[0].days.length
		});

		let body = this.formatBody();

		let data = [ { key: 'body', render: body } ];
		let test = [
			{ name: 'حاضر', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'غایب', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'تاخیر', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'ثبت ارزشیابی', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: 'ثبت نمره', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: 'ثبت عکس', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' }
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
				{this.formatHeader()}
				<FlatList
					data={data}
					renderItem={this.formatRowForSheet}
					//onEndReached={this.handleScrollEndReached}
					onEndReachedThreshold={0.005}
				/>
				{this.state.loading && <ActivityIndicator />}

				{/* <Modal
					visible={this.state.cellpop}
					onTouchOutside={() => this.setState({ cellpop: false })}
					height={0.2}
					width={1}
					onSwipeOut={() => this.setState({ cellpop: false })}
					//modalTitle={<ModalTitle title="" hasTitleBar />}
				>
					<ModalContent
						style={{
							flex: 1,
							backgroundColor: 'fff',
							borderWidth: 0
						}}
					>
						<FlatGrid
							itemDimension={80}
							items={test}
							style={styles.gridView}
							spacing={10}
							renderItem={({ item }) => (
								<TouchableOpacity
									onPress={() => {
										console.log('ff;');
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
					</ModalContent>
				</Modal>

				<Modal
					visible={this.state.colpop}
					onTouchOutside={() => this.setState({ colpop: false })}
					height={0.8}
					width={0.33}
					onSwipeOut={() => this.setState({ colpop: false })}
					//modalTitle={<ModalTitle title="" hasTitleBar />}
				>
					<ModalContent
						style={{
							padding: 4,
							flex: 1,
							// borderWidth: 1,
							// backgroundColor: 'red',
							borderWidth: 0
						}}
					>
						<Button
							title="hi"
							onPress={() => {
								this.setState({ colpop: false });
							}}
						/>
						<FlatGrid
							vertical
							items={colmnu}
							style={styles.gridView}
							spacing={10}
							renderItem={({ item }) => (
								<View>
									<TouchableOpacity
										onPress={() => {
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
					</ModalContent>
				</Modal> */}

				<Modal
					style={[
						{
							borderRadius: 25,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'stretch',
							height: 260
						}
					]}
					entry={'top'}
					animationDuration={400}
					position={'center'}
					ref={'modal_arz'}
					swipeToClose={this.state.swipeToClose}
					onClosed={this.onClose}
					onOpened={this.onOpen}
					onClosingState={this.onClosingState}
				>
					<View style={{ flex: 1, width: '100%', flexDirection: 'column', borderWidth: 0 }}>
						<View
							style={[ defaultStyles.shadow, defaultStyles.viewBtn, { borderWidth: 1, marginTop: 20 } ]}
						>
							<RNPickerSelect
								style={pickerStyle}
								//itemKey={values.speed}
								value={this.state.arz}
								//onChangeText={handleChange('sport')}
								placeholder={newPlaceholder1}
								//	onValueChange={handleChange('speed')}
								onValueChange={(e) => {
									this.setState({
										arz: e
									});
								}}
								items={this.state.Classdata[0].arz}
							/>
						</View>
						<View
							style={[ defaultStyles.shadow, defaultStyles.viewBtn, { borderWidth: 1, marginTop: 20 } ]}
						>
							<RNPickerSelect
								style={pickerStyle}
								//itemKey={values.speed}
								value={this.state.megh}
								//onChangeText={handleChange('sport')}
								placeholder={newPlaceholder1}
								//	onValueChange={handleChange('speed')}
								onValueChange={(e) => {
									this.setState({
										megh: e
									});
								}}
								items={this.state.Classdata[0].megh}
							/>
							<TouchableOpacity>
								<Text>ثبت</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
				<Modal
					style={[
						{
							borderRadius: 25,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'stretch',
							height: 210
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
