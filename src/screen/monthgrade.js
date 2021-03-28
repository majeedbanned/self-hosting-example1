import React, { PureComponent } from 'react';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import Modal from 'react-native-modalbox';
import Eform2 from '../screen/modules/forms/eforms2';
import update from 'immutability-helper';

import Loading from '../components/loading';
import NetInfo from '@react-native-community/netinfo';
import * as FileSystem from 'expo-file-system';
import GLOBAL from '../screen/global';

import ActionButton from 'react-native-action-button';
import { Alert, Linking } from 'react-native';
import Modalm from 'react-native-modal';
import { Animated, ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, Button, Image, Dimensions } from 'react-native';
// import Fixgridcell from '../components/fixgridcell';
import { FormButton } from '../component/FormButton';
import Workbookdt from './workbook-detail';

import defaultStyles from '../config/styles';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import Icon from 'react-native-vector-icons/AntDesign';
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
//let CELL_WIDTH = 90;
//let CELL_HEIGHT = 60;
//let FIRST_CELL_WIDTH = 120;
//let FIRST_CELL_MARGIN = FIRST_CELL_WIDTH + 4;
//let colorhead = 'red';
//let MAIN_CELL_COLOR = '#e3f1fc';
//let FROZEN_COLOR = 'orange';
//let IDENTITY_COLOR = '#06a9ba';
//let HEADER_COLOR = '#f76d6d';

let majid = 0;
const black = '#000';
const white = '#fff';

const styles = StyleSheet.create({
	container: { backgroundColor: 'white', marginVertical: 0, marginBottom: 110 },
	header: { flexDirection: 'row', borderTopWidth: 0, borderColor: black },
	identity: { position: 'absolute' },
	// width: CELL_WIDTH
	body: {
		//marginLeft: FIRST_CELL_MARGIN
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
		//width: CELL_WIDTH,
		//height: CELL_HEIGHT,

		borderWidth: 0,
		borderBottomWidth: 0,
		//	borderRadius: 10,
		backgroundColor: 'white',
		borderColor: '#ccc'
	},
	actionButtonIcon: {
		fontSize: 24,
		height: 22,
		color: 'white'
	},
	gridView: {
		marginTop: 2,
		flex: 1
	},
	cellidentity: {
		width: 120,
		//height: 80,

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
		const cell_width = this.props.CELL_WIDTH;
		const cell_height = this.props.CELL_HEIGHT;
		const MAIN_CELL_COLOR = this.props.MAIN_CELL_COLOR;

		if (!value) return null;
		return (
			<View key={col + '-' + row} style={([ styles.cell ], { width: cell_width, height: cell_height })}>
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
						backgroundColor: MAIN_CELL_COLOR,
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

class monthgrade extends React.PureComponent {
	constructor(props: {}) {
		super(props);

		this.headerScrollView = null;
		this.scrollPosition = new Animated.Value(0);
		this.scrollEvent = Animated.event([ { nativeEvent: { contentOffset: { x: this.scrollPosition } } } ], {
			useNativeDriver: false
		});

		this.state = {
			HEADER_COLOR: '#f76d6d',
			IDENTITY_COLOR: '#06a9ba',
			FROZEN_COLOR: 'orange',
			MAIN_CELL_COLOR: '#e3f1fc',
			colorhead: 'red',
			FIRST_CELL_MARGIN: 124,
			FIRST_CELL_WIDTH: 120,
			CELL_WIDTH: 120,
			CELL_HEIGHT: 80,
			selectedItem: 1,
			isModalpiker_message_Visible: false,
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
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		//const { navigation } = this.props;
		this.reportName = navigation.getParam('reportName');

		return {
			headerTitle: this.reportName,
			headerRight: () => null,
			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransansbold'
				//color: this.state.colorhead
			}
		};
	};
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
						backgroundColor: this.state.FROZEN_COLOR,
						marginLeft: 2,
						marginRight: 2,
						width: this.state.FIRST_CELL_WIDTH,
						height: this.state.CELL_HEIGHT - 4,
						//marginBottom: -4,
						marginTop: 2
					}
				]}
			/>
		);
	}
	formatCell(col, row, value, data1) {
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
					//alert(data1.std);
					this.setState({
						extra: value.day + '-' + data1.std + '-' + this.coursecode + '-' + this.groupcode,
						acForm: 23,
						insid: 10
					});
					//	this.setState({ datacell: [] });
					//	this.loadcell();
					//alert(value.zang + '-' + value.day + '-' + data1.studentcode);
					global.fix_col = col;
					global.fix_row = row;
					this.refs.modal1.open();
					//alert('de');
					//this.setState({ isModalpiker_message_Visible: true });
				}}
			>
				<PureChild
					identity={this.state.maindata[col].coursecode}
					col1={col}
					value1={value}
					//hozor={value.hozor}
					CELL_WIDTH={this.state.CELL_WIDTH}
					CELL_HEIGHT={this.state.CELL_HEIGHT}
					MAIN_CELL_COLOR={this.state.MAIN_CELL_COLOR}
				/>
			</TouchableOpacity>
		);
	}

	formatCellIdentitiy(col, row, value, name, lname) {
		//console.log(col + '-' + value);
		return (
			<View
				key={col + '-' + value}
				style={[
					styles.cellidentity,
					{ width: this.state.FIRST_CELL_WIDTH, borderWidth: 0, height: this.state.CELL_HEIGHT }
				]}
			>
				{/* <TouchableOpacity
					onPress={() => {
						alert(value);
					}}
					style={styles.cellidentity}
				> */}
				<View
					key={col + '-' + value}
					style={{
						backgroundColor: this.state.IDENTITY_COLOR,
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						width: this.state.FIRST_CELL_WIDTH,
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
								fontSize: 12,
								color: 'white',
								borderWidth: 0,
								//	width: 80,
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
			<View key={key} style={[ styles.cell, { width: this.state.CELL_WIDTH, height: this.state.CELL_HEIGHT } ]}>
				<TouchableOpacity
					activeOpacity={0.5}
					style={[ styles.cell, { width: this.state.CELL_WIDTH, height: this.state.CELL_HEIGHT } ]}
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
							backgroundColor: this.state.HEADER_COLOR,
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
					this.state.maindata[i].days[parseInt(item.key)], //.disc
					this.state.maindata[i]
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

		return <View style={[ styles.identity, { width: this.state.CELL_WIDTH } ]}>{cells}</View>;
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
					style={([ styles.body ], { marginLeft: this.state.FIRST_CELL_MARGIN })}
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
		const { navigation } = this.props;
		this.examID = navigation.getParam('reportID');
		this.coursecode = navigation.getParam('coursecode');
		this.groupcode = navigation.getParam('groupcode');

		//const mode = navigation.getParam('mode');

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
		this.loadAPI_grp(1, 'pull');
		this.setState({
			cat1: [
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
	loadAPI_grp = async (page, type) => {
		if (global.adress == 'undefined') {
			GLOBAL.main.setState({ isModalVisible: true });
		}

		/* #region  check internet */
		let state = await NetInfo.fetch();

		if (!state.isConnected) {
			//alert(state.isConnected);
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			//return;
		}
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getReportDetailCat?id=' +
			this.examID +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&mode=list';
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						cat: [],
						maindata: []
					});
					this.loadAPI(this.examID, 'pull');
					return;
				}
				this.setState({
					cat: retJson,

					loading: false
				});
			}

			if (this.state.cat.length != 0) {
				this.setState({
					selectedItem: this.state.cat[0].id
				});

				//alert(this.examID);
				this.loadAPI(this.examID, 'pull');
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
	loadAPI = async (idaz, type) => {
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

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getReportResult?id=' +
			idaz +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&courcecode=' +
			this.coursecode +
			'&classcode=' +
			this.groupcode;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						//data: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);
				this.setState({
					maindata: []
				});
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					maindata: retJson,
					count: retJson.length,
					NUM_COLS: retJson[0].days.length,
					dataLoading: false,

					isRefreshing: false,
					loading: false
				});
				//alert();
				this.setState({
					count: this.state.maindata.length,
					NUM_COLS: this.state.maindata[0].days.length,
					haspdf: this.state.maindata[0].haspdf,
					hasxls: this.state.maindata[0].hasxls,

					HEADER_COLOR: this.state.maindata[0].HEADER_COLOR,
					IDENTITY_COLOR: this.state.maindata[0].IDENTITY_COLOR,
					FROZEN_COLOR: this.state.maindata[0].FROZEN_COLOR,
					MAIN_CELL_COLOR: this.state.maindata[0].MAIN_CELL_COLOR,
					colorhead: this.state.maindata[0].colorhead,

					FIRST_CELL_MARGIN: parseInt(this.state.maindata[0].FIRST_CELL_MARGIN),
					FIRST_CELL_WIDTH: parseInt(this.state.maindata[0].FIRST_CELL_WIDTH),

					CELL_HEIGHT: parseInt(this.state.maindata[0].CELL_HEIGHT),

					CELL_WIDTH: parseInt(this.state.maindata[0].CELL_WIDTH)
				});
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				dataLoading: false,
				isRefreshing: false
			});
			return;
		}
	};

	genAPI = async (idaz, type) => {
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

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/genapi?id=' +
			this.examID +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&ext=' +
			idaz;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						//data: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);
				if (retJson.result == 'ok') {
					Alert.alert(
						'دانلود',
						'آیا مایل به دانلود فایل خروجی هستید؟',
						[
							// {
							// 	text: 'Ask me later',
							// 	onPress: () => console.log('Ask me later pressed')
							// },
							{
								text: 'خیر',
								onPress: () => {
									this.setState({
										down_pdf: false
									});
								},
								style: 'cancel'
							},
							{
								text: 'بله',
								onPress: async () => {
									// const { uri: localUri } = await FileSystem.downloadAsync(
									// 	retJson.url,
									// 	FileSystem.documentDirectory + 'name.pdf'
									// );
									Linking.openURL(retJson.url);
									this.setState({
										down_pdf: false
									});
									//this.deleteapi(item.id, index);
								}
							}
						],
						{ cancelable: false }
					);
				}

				//alert(retJson.msg);
				this.setState(
					{
						//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					}
				);
				//alert();
				this.setState({});
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				dataLoading: false,
				isRefreshing: false
			});
			return;
		}
	};

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
		this.setState({ selectedItem: id, dataLoading: true });
		this.loadAPI(this.examID, 'pull');
	}
	render() {
		GLOBAL.monthgrade = this;
		//alert(this.state.colorhead);
		if (!this.state.maindata || !this.state.cat) return <Loading />;
		//alert(this.state.maindata[0].days.length);
		if (this.state.maindata.length == 0)
			return (
				<View>
					<Text />
				</View>
			);

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
		if (this.state)
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
														backgroundColor: this.state.colorhead,
														fontFamily: 'iransans',
														borderWidth: 1,
														borderColor: this.state.colorhead,
														flexDirection: 'row',
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
														flexDirection: 'row',
														borderColor: this.state.colorhead,
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
															color: this.state.colorhead,

															fontFamily: 'iransans'
														}
													)
												}
											>
												{item.name}
											</Text>

											{this.state.selectedItem !== item.id ||
												(this.state.dataLoading && <ActivityIndicator color="white" />)}
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
					{/* {this.state.loading && <ActivityIndicator />} */}

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
								down_pdf: false
							})}
						onSwipeComplete={() =>
							this.setState({
								down_pdf: false
							})}
						deviceWidth={deviceWidth}
						deviceHeight={deviceHeight}
						isVisible={this.state.down_pdf}
					>
						<View style={{ flex: 0, borderRadius: 25, backgroundColor: 'white', height: 200 }}>
							<TouchableOpacity
								onPress={() => {
									this.setState({
										down_pdf: false
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
							<View
								style={{
									flex: 1,
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'center'
								}}
							>
								<View
									style={{
										width: 300,
										height: 100
									}}
								>
									<Loading />
								</View>
							</View>
						</View>
					</Modalm>

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
						ref={'modal1'}
						swipeToClose={this.state.swipeToClose}
						onClosed={this.onClose}
						onOpened={this.onOpen}
						onClosingState={this.onClosingState}
					>
						{this.state.acForm == 23 && (
							<View style={{ borderWidth: 0, width: '90%' }}>
								<Eform2
									Extra={this.state.extra}
									eformId={this.state.acForm}
									instanseID={this.state.insid}
									stdID={0}
									isAdminForms="true"
									goBack="false"
									referer="mounth"
								/>
							</View>
						)}
					</Modal>

					{(this.state.haspdf == 'true' || this.state.hasxls == 'true') && (
						<ActionButton position="left" buttonColor="#0acc5b">
							{this.state.hasxls == 'true' && (
								<ActionButton.Item
									buttonColor="#069c5d"
									style={{ fontFamily: 'iransans' }}
									title="خروجی اکسل"
									onPress={() => {
										this.genAPI('pdf');
										this.setState({
											down_pdf: true
										});
									}}
								>
									<Icon name="table" style={styles.actionButtonIcon} />
								</ActionButton.Item>
							)}

							{this.state.haspdf == 'true' && (
								<ActionButton.Item
									buttonColor="#ff564a"
									style={{ fontFamily: 'iransans' }}
									title="خروجی pdf"
									onPress={() => {
										this.genAPI('xls');
										this.setState({
											down_pdf: true
										});
									}}
								>
									<Icon name="pdffile1" style={styles.actionButtonIcon} />
								</ActionButton.Item>
							)}

							<Icon name="printer" style={styles.actionButtonIcon} />
						</ActionButton>
					)}
				</View>
			);
	}
}

export default monthgrade;
