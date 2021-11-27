import React, { PureComponent } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import GLOBAL from '../screen/global';
import { Snackbar } from 'react-native-paper';
import IconA from 'react-native-vector-icons/AntDesign';

import { userInfo, toFarsi, encrypt, getHttpAdress, tozang } from '../components/DB';
import Mstyles from '../components/styles';
import NetInfo from '@react-native-community/netinfo';
import Eform2 from '../screen/modules/forms/eforms2';
import Modal from 'react-native-modalbox';
import update from 'immutability-helper';
import {
	Animated,
	ActivityIndicator,
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	View,
	Platform,
	TouchableHighlight,
	Linking
} from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback, Button, Image, RefreshControl, Alert } from 'react-native';
// import Fixgridcell from '../components/fixgridcell';
import { FormButton } from '../component/FormButton';
import defaultStyles from '../config/styles';
import Loading from '../components/loading';
import Timeline from '../screens/timeline';

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
import { string } from 'prop-types';
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
		marginBottom: 0,
		flex: 1,
		zIndex: 1,
		//elevation: 2,
		height: 50,
		width: '100%',
		flexDirection: 'column'
	},
	aztitle: {
		width: '100%',
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'left',
		borderWidth: 0,

		//fontSize: 18,
		color: 'white'
	},
	mainpanel: {
		zIndex: 122,
		backgroundColor: '#eee'
		//	elevation: 2,
		//shadowColor: '#ccc',
		// shadowOffset: {
		// 	width: 3,
		// 	height: 3
		// },
		// shadowOpacity: 0.67,
		// shadowRadius: 3.49
	},
	view4: {
		paddingStart: 10,
		borderWidth: 0,
		justifyContent: 'center',
		flex: 2
	},
	view3: {
		//backgroundColor: 'red',
		borderTopStartRadius: 13,
		borderBottomStartRadius: 13,

		justifyContent: 'center',
		flex: 0.6
	},
	view2: {
		flexDirection: 'row',
		borderWidth: 0,
		marginStart: 0,
		flex: 1
	},
	view1: {
		flexDirection: 'column',
		borderWidth: 0,
		marginStart: 0,
		flex: 3
	},

	container: { backgroundColor: white, marginVertical: 0, marginBottom: 80 },
	header: { flexDirection: 'row', borderWidth: 0, borderColor: black },
	identity: { position: 'absolute', width: CELL_WIDTH },
	body: {
		marginLeft: 73,
		//CELL_WIDTH,
		alignSelf: 'flex-start'
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
		borderRadius: 15,
		paddingTop: 5,
		height: 65
	},
	itemName: {
		fontSize: 12,
		color: '#fff',
		//fontWeight: '600',
		paddingBottom: 5,
		padding: 5,
		fontFamily: 'iransans',
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
		//	margin: 0,
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
		//margin: 0.5,
		//paddingTop: 2,
		//paddingStart: 3,
		//paddingEnd: 3,
		//fontSize: 12,
		borderColor: '#ccc'
		//borderWidth: 1
	},
	arz: {
		fontFamily: 'iransans'
	},
	arzf: {
		fontFamily: 'iransans',
		paddingLeft: 3,
		paddingRight: 3,
		marginLeft: 5,
		paddingBottom: -2
		//color: 'white'
	},
	az: {
		//flex: 0.4,
		//backgroundColor: 'white',
		textAlign: 'center',
		borderColor: '#ccc',
		fontFamily: 'iransans'

		//borderRadius: 3,
		//margin: 2,
		//borderWidth: 0
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
		//alert(value);
		if (!value) return null;
		//console.log(col + '-' + row);
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
							(hozor == '' || hozor == undefined) && {
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
					{value ? (
						value.map((item, index) => (
							<View
								key={index}
								style={[
									{
										//overflow: 'visible',
										borderColor: '#ccc',
										margin: 2,
										backgroundColor: '#F3F3F3',
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
								{item.az != 0 && <Text style={styles.az}>{' از ' + toFarsi(item.az)}</Text>}
								{item.arzv && (
									<View style={{ flexDirection: 'row' }}>
										<Text style={styles.arz}>{toFarsi(item.arzv)}</Text>
										<Text
											style={[
												styles.arzf,
												{
													backgroundColor: item.arzvf
														? item.arzvf.includes('+')
															? '#9DF563'
															: item.arzvf.includes('-') ? '#F6A7A0' : '#73C6FF'
														: '',
													borderRadius: 5,
													overflow: 'hidden'
												}
											]}
										>
											{toFarsi(item.arzvf)}
										</Text>
									</View>
								)}
								{item.ax && <IconA name="picture" size={25} style={[ styles.actionButtonIcon, {} ]} />}
							</View>
						))
					) : (
						<View
							key={index}
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
								hozor == undefined && { backgroundColor: 'white' },
								hozor == '' && { backgroundColor: 'red' },
								hozor == 1 && { backgroundColor: defaultStyles.colors.lightgreen },
								hozor == 2 && { backgroundColor: defaultStyles.colors.lightred },
								hozor == 3 && { backgroundColor: defaultStyles.colors.lightyellow }
							]}
						>
							{/* <Text style={styles.cap}>{'dfg'}</Text> */}
							{/* {item.az != null && <Text style={styles.az}>{toFarsi(item.az)}</Text>} */}
						</View>
					)}
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
		(this.mindate = 0),
			(this.maxdate = 0),
			(this.state = {
				loadsheet: false,
				acForm: 0,
				insid: 0,
				datacell: [],
				showMenu: true,
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
			});

		this.props.navigation.addListener('willFocus', () => {
			//alert();
			const { navigation } = this.props;

			this.coursecode = navigation.getParam('coursecode');

			this.groupcode = navigation.getParam('classcode');
			this.loadAPI();
		});
	}

	handleScroll = (e) => {
		if (this.headerScrollView) {
			let scrollX = e.nativeEvent.contentOffset.x;
			this.headerScrollView.scrollTo({ x: scrollX, animated: false });
		}
	};

	closeModal2() {
		alert('cl');
	}

	scrollLoad = () => {
		this.setState({ loading: false, count: this.state.count + this.state.NUM_ROWS_STEP });
	};
	handleScrollEndReached = () => {
		if (!this.state.loading) {
			this.setState({ loading: true }, () => setTimeout(this.scrollLoad, 500));
		}
	};
	formatCellforizen() {
		//return null;
		return (
			<TouchableOpacity
				onPress={() => {
					this.refs.modalf.open();
				}}
			>
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
				>
					<Ionicons
						name="md-menu"
						size={30}
						color={'#fff'}
						style={{
							flex: 1,
							alignSelf: 'center',
							paddingTop: 25
						}}
					/>
				</View>
			</TouchableOpacity>
		);
	}
	formatCell(col, row, value, data1) {
		//console.log(value);
		//if (value == null) return null;
		//return <Fixgridcell />;

		return (
			<TouchableOpacity
				activeOpacity={0.5}
				key={col + '-' + row}
				onPress={() => {
					//alert();
					this.setState({
						acForm: 0,
						insid: 0
					});

					this.setState({
						extra:
							value.zang +
							'-' +
							value.day +
							'-' +
							data1.studentcode +
							'-' +
							this.coursecode +
							'-' +
							this.classcode
					});
					//	this.setState({ datacell: [] });
					this.loadcell();
					//alert(value.zang + '-' + value.day + '-' + data1.studentcode);
					global.fix_col = col;
					global.fix_row = row;
					this.refs.modal2.open();
				}}
			>
				<PureChild
					col1={col}
					row1={row}
					value1={value ? value.disc : null}
					hozor={value ? value.hozor : null}
				/>
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
						//this.loadDiary(value);
						this.std = value;
						this.setState({ std: value });
						//alert(this.std);
						this.refs.modaltime.open();
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
			<View key={key} style={[ styles.cell, { borderWidth: 0 } ]}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={[ styles.cell ]}
					onPress={() => {
						//alert(value.acid);
						//var someProperty = { ...this.state.maindata[0] };
						//someProperty.days[0].disc = [ { cap: 'sex' } ];
						//this.setState({ someProperty });
						this.setState({
							ishint: value.acid,
							extra: value.zang + '-' + value.day + '-' + this.coursecode + '-' + this.classcode
						});

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
						<Text style={{ color: 'white', fontFamily: 'iransans', fontSize: 12 }}>
							{tozang(value.zang)}
						</Text>

						<Text style={{ color: '#06a9ba', fontFamily: 'iransans', display: 'none' }}>{value.zang}</Text>

						{value.acid && (
							<IconA name="edit" size={20} style={[ styles.actionButtonIcon, { color: 'white' } ]} />
						)}
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
					this.state.maindata[i].days[parseInt(item.key)],
					this.state.maindata[i]
					//.disc
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
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					//scrollEnabled={false}
					ref={(ref) => (this.headerScrollView = ref)}
					horizontal={true}
					//sstyle={{ transform: [ { scaleX: -1 } ] }}
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

	loadAPI = async (page, type) => {
		//alert();
		const { navigation } = this.props;
		this.coursecode = navigation.getParam('coursecode');
		this.classcode = navigation.getParam('classcode');

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

		this.setState({ loadsheet: false });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/sheetlist?id=1' +
			'&p=' +
			param +
			'&coursecode=' +
			this.coursecode +
			'&classcode=' +
			this.classcode +
			'&min=' +
			this.mindate +
			'&max=' +
			this.maxdate +
			'&state=' +
			page;
		//
		try {
			console.log(uurl);
			uurl = encrypt(uurl);
			//////console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						data: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);

				//alert();
				if (!retJson[0].days) {
					this.setState({ loadsheet: true, maindata: this.state.maindata });
					return;
				}

				this.setState({
					data: []
				});
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					maindata: retJson,
					dataLoading: false,
					loadsheet: true,
					isRefreshing: false,
					loading: false
				});
				try {
					this.mindate = this.state.maindata[0].days[0].day;
					this.maxdate = this.state.maindata[0].days[this.state.maindata[0].days.length - 1].day;
				} catch (e) {}
				// alert(this.state.maindata[0].days[0].day);
				// alert(this.state.maindata[0].days[].day);
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

	loadcell = async (page, type) => {
		//alert();
		const { navigation } = this.props;
		this.coursecode = navigation.getParam('coursecode');
		this.classcode = navigation.getParam('classcode');

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
		let part = this.state.extra.split('-')[0];
		let day = this.state.extra.split('-')[1];
		let std = this.state.extra.split('-')[2];

		//this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/sheetlist_cellload?id=1' +
			'&p=' +
			param +
			'&coursecode=' +
			this.coursecode +
			'&groupcode=' +
			this.classcode +
			'&part=' +
			part +
			'&day=' +
			day +
			'&std=' +
			std +
			'&zang=' +
			part;
		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						datacell: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);
				this.setState({
					datacell: []
				});
				//alert();
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					datacell: retJson,
					dataLoading: false,

					acForm: 0,
					isRefreshing: false,
					loading: false
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
	static navigationOptions = ({ navigation, screenProps }) => ({
		headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
		headerTitle: navigation.state.params ? navigation.state.params.headerTitle : null
	});

	componentWillUnmount() {
		// fix Warning: Can't perform a React state update on an unmounted component
		this.setState = (state, callback) => {
			return;
		};
	}
	componentDidMount() {
		//alert();
		const { navigation } = this.props;

		this.coursecode = navigation.getParam('coursecode');

		this.groupcode = navigation.getParam('classcode');

		this.props.navigation.setParams({
			headerTitle: '',
			headerRight: true && (
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						onPress={() => {
							//const { navigate } = this.props.navigation;

							Linking.openURL('http://farsamooz.ir/apphlp/2.mp4');
						}}
					>
						<Icon name="md-play-circle" size={35} color="#aaa" style={{ marginRight: 15, marginTop: -6 }} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							const { navigate } = this.props.navigation;

							navigate('monthgrade', {
								reportID: 100,
								reportName: 'نمرات ماهیانه',
								coursecode: this.coursecode,
								groupcode: this.groupcode
							});
						}}
					>
						<FontAwesome name="edit" size={25} color="#aaa" style={{ marginRight: 25 }} />
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							this.setState({ loadsheet: false });
							this.loadAPI('back');
						}}
					>
						<FontAwesome name="arrow-right" size={25} color="#aaa" style={{ marginRight: 20 }} />
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.setState({ loadsheet: false });
							this.loadAPI('forword');
						}}
					>
						<FontAwesome name="arrow-left" size={25} color="#aaa" style={{ marginRight: 10 }} />
					</TouchableOpacity>
				</View>
			)
		});

		//	console.log('2980b9nentDidMount');
		this.listener = this.scrollPosition.addListener((position) => {
			this.headerScrollView.scrollTo({ x: position.value, animated: false });
		});

		//this.setState({ Classdata: [] });
		//if (false)
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

		if (false)
			this.setState({
				maindata: [
					{
						studentcode: 888888,
						name: 'dr',
						lname: 'dfg',
						days: [
							{
								hozor: 1,
								day: '1398/07/07',
								zang: 8,
								disc: [
									{ key: '146125', ttype: '6', scoreid: '9999', cap: 'دانش آموز خوبی بود', az: '0' }
								]
							},
							{
								hozor: 2,
								day: '1398/07/08',
								zang: 4,
								disc: [
									{ key: '146125', ttype: '6', scoreid: '9999', cap: 'دانش آموز خوبی بود', az: '0' }
								]
							}
						]
					},
					{
						studentcode: 111222333,
						name: 'jgj',
						lname: 'ghj',
						days: [
							{
								hozor: 2,
								day: '1398/07/07',
								zang: 8,
								disc: [
									{ key: '146125', ttype: '6', scoreid: '9999', cap: 'دانش آموز خوبی بود', az: '0' }
								]
							},
							{ day: '1398/07/08', zang: 4, disc: [] }
						]
					},
					{
						studentcode: 200565400,
						name: 'اميرحسين',
						lname: 'روانفرحقيقي',
						days: [
							{ day: '1398/07/07', zang: '8', disc: null },
							{ day: '1398/07/08', zang: '4', disc: null }
						]
					},
					{
						studentcode: '2283942055',
						name: 'پارسا',
						lname: 'مشيري',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283942594',
						name: 'آرتام',
						lname: 'نجاتي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283944082',
						name: 'مهدي',
						lname: 'خدامي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283945453',
						name: 'امير',
						lname: 'نجف زاده شوكي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283960371',
						name: 'سينا',
						lname: 'حق شناس',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283983290',
						name: 'ماهان',
						lname: ' آزادي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283989159',
						name: 'مهدي',
						lname: 'اسدي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283991382',
						name: 'حسين',
						lname: 'سلطاني',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283996163',
						name: 'مهدي',
						lname: 'دهقان شيباني',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2283997372',
						name: 'محسن',
						lname: 'نام آور',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284017312',
						name: 'محمدامين',
						lname: 'كريم زاده',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284026974',
						name: 'محمدعلي',
						lname: 'محبي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284033881',
						name: 'سيدعليرضا',
						lname: 'سجاديان',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284044271',
						name: 'اهورا',
						lname: 'زارع',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284057391',
						name: 'هاني',
						lname: 'چهرازي نصرآبادي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284085164',
						name: 'محمدطاها',
						lname: 'مرادي نيا',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284085741',
						name: 'محمدرضا',
						lname: 'كاظمي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284098142',
						name: 'كسري',
						lname: 'الوان پور',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284106196',
						name: 'سجاد',
						lname: 'دهقان',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284133355',
						name: 'آرين',
						lname: 'هوشمندي',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284147771',
						name: 'آرش',
						lname: 'اسكندري',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2284152503',
						name: 'رايان',
						lname: 'سخاوت',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '2460528035',
						name: 'اميرمهدي',
						lname: 'جهان صفت',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					},
					{
						studentcode: '3060724865',
						name: 'آرمين',
						lname: 'شاهمرادي پور',
						days: [ { day: '1398/07/07', zang: '8' }, { day: '1398/07/08', zang: '4' } ]
					}
				]
			});

		if (false)
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

		//this.loadAPI();
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

	setAPI = async (hozor, type) => {
		//alert();
		const { navigation } = this.props;
		this.coursecode = navigation.getParam('coursecode');
		this.classcode = navigation.getParam('classcode');

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

		//	this.setState({ loadsheet: false });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/setHozor?id=1' +
			'&p=' +
			param +
			'&extra=' +
			this.state.extra +
			'&mode=' +
			hozor;

		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						//	data: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);

				//alert();
				// if (!retJson[0].days) {
				// 	this.setState({ loadsheet: true, maindata: this.state.maindata });
				// 	return;
				// }

				// this.setState({
				// 	data: []
				// });
				// this.setState({
				// 	//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
				// 	maindata: retJson,
				// 	dataLoading: false,
				// 	loadsheet: true,
				// 	isRefreshing: false,
				// 	loading: false
				// });
				try {
					///	this.mindate = this.state.maindata[0].days[0].day;
					//this.maxdate = this.state.maindata[0].days[this.state.maindata[0].days.length - 1].day;
				} catch (e) {}
				// alert(this.state.maindata[0].days[0].day);
				// alert(this.state.maindata[0].days[].day);
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

	loadDiary = async (value, type) => {
		//alert();
		const { navigation } = this.props;
		this.coursecode = navigation.getParam('coursecode');
		this.classcode = navigation.getParam('classcode');

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

		//	this.setState({ loadsheet: false });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/loadDiary?id=1' +
			'&p=' +
			param +
			'&std=' +
			value +
			'&coursecode=' +
			this.coursecode +
			'&groupcode=' +
			this.groupcode;

		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						//	data: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);

				//alert();
				// if (!retJson[0].days) {
				// 	this.setState({ loadsheet: true, maindata: this.state.maindata });
				// 	return;
				// }

				// this.setState({
				// 	data: []
				// });
				// this.setState({
				// 	//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
				// 	maindata: retJson,
				// 	dataLoading: false,
				// 	loadsheet: true,
				// 	isRefreshing: false,
				// 	loading: false
				// });
				try {
					///	this.mindate = this.state.maindata[0].days[0].day;
					//this.maxdate = this.state.maindata[0].days[this.state.maindata[0].days.length - 1].day;
				} catch (e) {}
				// alert(this.state.maindata[0].days[0].day);
				// alert(this.state.maindata[0].days[].day);
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

	loadAPIDel = async (eid, index) => {
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

		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/delSheetRow?eid=' + eid + '&p=' + param; //+

		try {
			uurl = encrypt(uurl);
			////console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}

				//** */	this.setState({ issnack: true, msg: retJson.msg });
				//alert();
				let newimagesAddFile = this.state.datacell;
				//alert(index);
				newimagesAddFile.splice(index, 1); //to remove a single item starting at index
				this.setState({ datacell: newimagesAddFile });

				//console.log(retJson);
				// this.setState(
				// 	{
				// 		// data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
				// 		// loading: false,
				// 		// dataLoading: false,
				// 		// isRefreshing: false
				// 	}
				// );
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

	clickEventListener = (item) => {
		//const { navigate } = this.props.navigation;
		//	this.setState({ acForm: 1 });

		if (item.name == 'حاضر') {
			this.setAPI('1');
			var someProperty = { ...this.state.maindata[global.fix_col] };
			someProperty.days[global.fix_row].hozor = 1;
			this.setState({ someProperty, cellpop: false });
			this.refs.modal2.close();
		} else if (item.name == 'غایب') {
			this.setAPI('2');
			var someProperty = { ...this.state.maindata[global.fix_col] };
			someProperty.days[global.fix_row].hozor = 2;
			this.setState({ someProperty, cellpop: false });
			this.refs.modal2.close();
		} else if (item.name == 'تاخیر') {
			this.setAPI('3');
			var someProperty = { ...this.state.maindata[global.fix_col] };
			someProperty.days[global.fix_row].hozor = 3;
			this.setState({ someProperty, cellpop: false });
			this.refs.modal2.close();
		} else if (item.name == 'ثبت نمره') {
			this.setState({ acForm: 18, insid: 0 });

			this.setState({ acForm: 17, insid: 0 });
		} else if (item.name == 'توضیحات') {
			this.setState({ acForm: 18, insid: 0 });
		} else if (item.name == 'ثبت عکس') {
			this.setState({ acForm: 19, insid: 0 });
		} else if (item.name == 'ارزشیابی توصیفی') {
			this.setState({ acForm: 22, insid: 0 });
		} else if (item.name == 'لیست') {
			this.setState({ acForm: 0, insid: 0 });
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

			this.setState({ acForm: 1 });
			//alert();
			//return;
			//this.refs.modal_arz.open();
			// var index = this.state.maindata[0].days[0].disc.findIndex((p) => p.key == '666');

			// this.setState({
			// 	maindata: update(this.state.maindata, {
			// 		0: { days: { 0: { disc: { $splice: [ [ index, 1 ] ] } } } }
			// 	})
			// });

			// this.setState({
			// 	maindata: update(this.state.maindata, {
			// 		0: { days: { 0: { disc: { 1: { cap: { $set: 'mire' } } } } } }
			// 	})
			// });

			//add
			// this.setState({
			// 	maindata: update(this.state.maindata, {
			// 		[global.fix_col]: { days: { [global.fix_row]: { disc: { $push: [ { cap: '12', az: '16' } ] } } } }
			// 	})
			// });
			// //delete
			// this.setState({
			// 	maindata: update(this.state.maindata, {
			// 		[global.fix_col]: { days: { [global.fix_row]: { disc: { $splice: [ [ 0, 1 ] ] } } } }
			// 	})
			// });
		}
	};

	clickEventListenerHeadf = (item) => {
		//const { navigate } = this.props.navigation;

		if (item.name == 'تعریف عناوین ارزشیابی') {
			const { navigate } = this.props.navigation;
			navigate.headerBackTitle = 'shah';
			global.eformsID = item.id;

			navigate('menuList', {
				reportID: 6,
				reportName: 'dd',
				repid: 20
			});
		} else if (item.name == 'تعریف مقادیر ارزشیابی') {
			const { navigate } = this.props.navigation;
			navigate('menuList', {
				reportID: 7,
				reportName: 'dd',
				repid: 21
			});
		}
	};

	clickEventListenerHead = (item) => {
		//const { navigate } = this.props.navigation;

		if (item.name == 'همه حاضر') {
			this.setAPI('11');
			Object.keys(this.state.maindata).forEach((k) => {
				var someProperty = { ...this.state.maindata[k] };
				someProperty.days[global.head_key].hozor = 1;
				this.setState({ someProperty, colpop: false });
			});
		} else if (item.name == 'همه غایب') {
			this.setAPI('22');
			Object.keys(this.state.maindata).forEach((k) => {
				var someProperty = { ...this.state.maindata[k] };
				someProperty.days[global.head_key].hozor = 2;
				this.setState({ someProperty, colpop: false });
			});
		} else if (item.name == 'همه تاخیر') {
			this.setAPI('33');
			Object.keys(this.state.maindata).forEach((k) => {
				var someProperty = { ...this.state.maindata[k] };
				someProperty.days[global.head_key].hozor = 3;
				this.setState({ someProperty, colpop: false });
			});
		} else if (item.name == 'حذف حضور و غیاب') {
			Alert.alert(
				' اخطار',
				'آیا مایل به حذف حضور و غیاب  هستید؟',
				[
					{
						text: 'خیر',

						style: 'cancel'
					},
					{
						text: 'بله',
						onPress: () => {
							this.setAPI('00');

							Object.keys(this.state.maindata).forEach((k) => {
								var someProperty = { ...this.state.maindata[k] };
								someProperty.days[global.head_key].hozor = 0;
								this.setState({ someProperty, colpop: false });
							});
						}
					}
				],
				{ cancelable: false }
			);
		} else if (item.name == 'حذف همه نمرات') {
			Alert.alert(
				' اخطار',
				'آیا مایل به حذف همه نمرات ردیف  هستید؟',
				[
					{
						text: 'خیر',

						style: 'cancel'
					},
					{
						text: 'بله',
						onPress: () => {
							this.setAPI('-1');
							Object.keys(this.state.maindata).forEach((k) => {
								var someProperty = { ...this.state.maindata[k] };
								someProperty.days[global.head_key].disc = [];
								this.setState({ someProperty, colpop: false });
							});
						}
					}
				],
				{ cancelable: false }
			);
		} else if (item.name == 'ثبت فعالیت معلم') {
			const { navigate } = this.props.navigation;
			if (this.state.ishint)
				navigate('eforms', {
					eformsID: 24,
					instanseID: this.state.ishint,
					stdID: 0,
					mode: 'viemessagew',
					isAdminForms: 'true',
					extra: this.state.extra
				});
			else
				navigate('eforms', {
					eformsID: 24,
					instanseID: 0,
					stdID: 0,
					mode: 'view',
					isAdminForms: 'true',
					extra: this.state.extra
				});
			// navigate('menuList', {
			// 	reportID: 8,
			// 	reportName: 'dd',
			// 	repid: 24,
			// 	extra: this.state.extra
			// });
		} else if (item.name == 'ثبت نمره آزمون آنلاین') {
			const { navigate } = this.props.navigation;
			//if (this.state.ishint)
			navigate('eforms', {
				eformsID: 25,
				instanseID: 0,
				stdID: 0,
				mode: 'view',
				isAdminForms: 'true',
				extra: this.state.extra
			});
			//	else
			// navigate('eforms', {
			// 	eformsID: 24,
			// 	instanseID: 0,
			// 	stdID: 0,
			// 	mode: 'view',
			// 	isAdminForms: 'true',
			// 	extra: this.state.extra
			// });
			// navigate('menuList', {
			// 	reportID: 8,
			// 	reportName: 'dd',
			// 	repid: 24,
			// 	extra: this.state.extra
			// });
		}
	};
	onClose() {
		//	console.log('Modal just closed');
	}
	onClose1 = () => {
		//this.loadAPI();
	};

	onOpen() {
		//	console.log('Modal just opened');
	}

	onClosingState(state) {
		//	console.log('the open/close of the swipeToClose just changed');
	}

	onPressCourse(item) {
		//alert(item.name);
	}
	render() {
		GLOBAL.fixedtable = this;
		//	if (!this.state.maindata) return <Loading />;
		if (!this.state.loadsheet) return <Loading />;

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
			{ name: 'حاضر', code: 'black', icon: 'ios-list', bkcolor: '#96e091' },
			{ name: 'غایب', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#f79383' },
			{ name: 'تاخیر', code: 'white', icon: 'ios-settings', bkcolor: '#fbb97c' },
			{ name: 'لیست', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#3babd1' },

			{ name: 'ثبت نمره', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#3babd1' },
			{ name: 'ارزشیابی توصیفی', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#3babd1' },

			{ name: 'توضیحات', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#3babd1' },
			{ name: 'ثبت عکس', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#3babd1' }
		];

		let fmenu = [
			{ name: 'تعریف عناوین ارزشیابی', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'تعریف مقادیر ارزشیابی', code: 'white', icon: 'ios-list', bkcolor: '#fbb97c' }
		];

		let colmnu = [
			{ name: 'همه حاضر', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#96e091' },
			{ name: 'همه غایب', code: 'white', icon: 'close-circle-outline', bkcolor: '#f79383' },
			{ name: 'همه تاخیر', code: 'white', icon: 'alarm-outline', bkcolor: '#fbb97c' },
			{ name: 'حذف حضور و غیاب', code: 'white', icon: 'trash-outline', bkcolor: '#e091ca' },
			{ name: 'حذف همه نمرات', code: 'white', icon: 'trash-sharp', bkcolor: '#91a1e0' },

			{ name: 'ثبت فعالیت معلم', code: 'white', icon: 'clipboard-outline', bkcolor: '#34ace0' },
			{ name: 'ثبت نمره آزمون آنلاین', code: 'white', icon: 'checkbox-outline', bkcolor: '#91e0e0' }
		];

		return (
			<View style={styles.container}>
				{/* <Button title="Basic modal" onPress={() => this.refs.modal1.open()} style={styles.btn} /> */}
				<View style={{ borderWidth: 0, flexDirection: 'row' }}>{this.formatHeader()}</View>

				<FlatList
					data={data}
					renderItem={this.formatRowForSheet}
					//onEndReached={this.handleScrollEndReached}
					onEndReachedThreshold={0.005}
				/>
				{this.state.loading && <ActivityIndicator size="small" color="#000" />}

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
							height: 560,

							width: '100%'
						}
					]}
					entry={'top'}
					coverScreen={true}
					zIndex={8000}
					animationDuration={400}
					position={'center'}
					ref={'modal_arz'}
					//swipeToClose={this.state.swipeToClose}
					swipeToClose={false}
					onClosed={this.onClose}
					onOpened={this.onOpen}
					onClosingState={this.onClosingState}
				>
					<View style={{ borderWidth: 0, width: '90%' }}>
						<Eform2 eformId={this.state.acForm} instanseID={0} stdID={0} isAdminForms="true" />
					</View>
					{/* <View style={{ flex: 1, width: '100%', flexDirection: 'column', borderWidth: 0 }}>
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
					</View> */}
				</Modal>

				<Modal
					style={[
						{
							borderRadius: 25,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'stretch',
							height: '80%'
						}
					]}
					entry={'top'}
					animationDuration={400}
					position={'center'}
					ref={'modaltime'}
					//swipeToClose={this.state.swipeToClose}
					swipeToClose={false}
					onClosed={this.onClose}
					onOpened={this.onOpen}
					onClosingState={this.onClosingState}
				>
					<View style={{ flex: 1, width: '100%', borderWidth: 1 }}>
						<Timeline std1={this.state.std} groupcode={this.groupcode} coursecode={this.coursecode} />
					</View>
				</Modal>

				<Modal
					animationDuration={0}
					//	backdrop={false}
					//coverScreen={true}
					style={[
						{
							borderRadius: 25,
							justifyContent: 'center',
							alignItems: 'center',
							alignSelf: 'stretch',
							height: '80%'
						}
					]}
					entry={'top'}
					animationDuration={400}
					position={'center'}
					ref={'modal2'}
					//swipeToClose={this.state.swipeToClose}
					swipeToClose={false}
					onClosed={this.onClose}
					onOpened={this.onOpen}
					onClosingState={this.onClosingState}
				>
					<View style={{ flexDirection: 'column-reverse' }}>
						<View style={{ flex: 0.7, borderTopWidth: 0.5 }}>
							<FlatGrid
								itemDimension={45}
								items={test}
								style={styles.gridView}
								spacing={5}
								renderItem={({ item }) => (
									<TouchableOpacity
										onPress={() => {
											//this.refs.modal2.close();
											this.clickEventListener(item);
										}}
										style={{ flex: 1 }}
									>
										<View style={[ styles.itemContainer, { backgroundColor: item.bkcolor } ]}>
											{/* {item.badge > 0 && <Text style={styles.badge}> 2 </Text>} */}

											{/* <Ionicons
												name={item.icon}
												size={22}
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
											/> */}

											<Text style={[ styles.itemName, {} ]}>{item.name}</Text>
										</View>
									</TouchableOpacity>
								)}
							/>
						</View>
						<View style={{ flex: 4, borderWidth: 0 }}>
							{this.state.acForm == 0 && (
								<View style={{ borderWidth: 0, flex: 1 }}>
									{/* <Text>dsfsdfsd</Text> */}
									<FlatList
										keyExtractor={(item) => item.id.toString()}
										refreshControl={
											<RefreshControl
												refreshing={this.state.isRefreshing}
												//	onRefresh={this.onRefresh.bind(this)}
											/>
										}
										ListEmptyComponent={
											<View style={{ borderWidth: 0, height: 450 }}>
												<View
													style={{
														borderWidth: 0,

														justifyContent: 'center',
														flex: 1,
														flexDirection: 'column',
														alignItems: 'center'
													}}
												>
													{!this.state.dataLoading && (
														<Text style={defaultStyles.lbl14}> لیست خالی است</Text>
													)}
												</View>
											</View>
										}
										data={this.state.datacell}
										renderItem={({ item, index }) => {
											return (
												<TouchableOpacity
													onPress={() => {
														const { navigate } = this.props.navigation;
														//navigate.headerBackTitle = 'shah';
														//global.eformsID = item.id;

														this.setState({ insid: item.id });
														if (item.ax != undefined) this.setState({ acForm: 19 });
														else if (item.ax == undefined && item.scoreid == '9999')
															this.setState({ acForm: 18 });
														else if (item.scoreid != '0' && item.scoreid != '9999')
															this.setState({ acForm: 22 });
														else this.setState({ acForm: 17 });
														//	navigate('reportView', { reportID: item.id, reportName: item.title });
													}}
													activeOpacity={0.8}
													style={{
														height: 68,
														borderRadius: 13,
														//backgroundColor: '#F3F3F3',
														//borderWidth: 1,
														marginTop: 10,
														marginLeft: 15,
														marginRight: 15
													}}
												>
													<View
														style={[
															styles.mainpanel,
															styles.gradient,
															{ borderWidth: 0 }
														]}
													>
														<View
															style={{
																borderWidth: 0,
																flex: 1,
																flexDirection: 'row',
																marginStart: 0
															}}
														>
															<View style={styles.view1}>
																<View style={styles.view2}>
																	{/* <View style={styles.view3}> */}
																	{/* <IconAnt
																	name={iconname_}
																	style={styles.image}
																	size={34}
																	color="white"
																/> */}
																	{/* </View> */}
																	<View style={styles.view4}>
																		<Text
																			style={[
																				styles.aztitle,
																				{ color: 'black', marginTop: 15 }
																			]}
																		>
																			{item.arz}
																		</Text>

																		{item.ax == undefined &&
																		item.scoreid == '9999' && (
																			<Text
																				numberOfLines={1}
																				style={[
																					styles.aztitle,
																					{ paddingTop: 4, color: 'black' }
																				]}
																			>
																				{toFarsi(item.title)}
																			</Text>
																		)}

																		{item.scoreid != '0' &&
																		item.scoreid != '9999' && (
																			<Text
																				style={[
																					styles.aztitle,
																					{ paddingTop: 4, color: 'black' }
																				]}
																			>
																				{toFarsi(item.arzv) +
																					' ' +
																					toFarsi(item.arzvf)}
																			</Text>
																		)}

																		{item.ax != undefined && (
																			<View
																				style={[
																					{
																						paddingTop: 4,
																						color: 'black',
																						flexDirection: 'row'
																					}
																				]}
																			>
																				<IconA
																					name="picture"
																					size={25}
																					style={[
																						styles.actionButtonIcon,
																						{}
																					]}
																				/>
																			</View>
																		)}

																		{item.az != '0' && (
																			<Text
																				style={[
																					styles.aztitle,
																					{ paddingTop: 4, color: 'black' }
																				]}
																			>
																				{toFarsi(item.title + ' از ' + item.az)}
																			</Text>
																		)}
																	</View>

																	<View>
																		<TouchableOpacity
																			style={{
																				borderWidth: 0,
																				height: '100%',
																				width: 45
																			}}
																			onPress={() => {
																				Alert.alert(
																					' اخطار',
																					'آیا مایل به حذف ردیف  هستید؟',
																					[
																						{
																							text: 'خیر',

																							style: 'cancel'
																						},
																						{
																							text: 'بله',
																							onPress: () => {
																								this.loadAPIDel(
																									item.id,
																									index
																								);
																							}
																						}
																					],
																					{ cancelable: false }
																				);
																			}}
																		>
																			<IconA
																				name="delete"
																				size={25}
																				style={[
																					styles.actionButtonIcon,
																					{ paddingTop: 15, paddingEnd: 10 }
																				]}
																			/>
																		</TouchableOpacity>
																	</View>
																</View>
															</View>
														</View>
													</View>
												</TouchableOpacity>
											);
										}}
									/>
								</View>
							)}
							{this.state.acForm == 17 && (
								<Eform2
									Extra={this.state.extra}
									eformId={this.state.acForm}
									instanseID={this.state.insid}
									stdID={0}
									isAdminForms="true"
									goBack="false"
									referer="sheet"
								/>
							)}
							{this.state.acForm == 18 && (
								<Eform2
									Extra={this.state.extra}
									eformId={this.state.acForm}
									instanseID={this.state.insid}
									stdID={0}
									isAdminForms="true"
									goBack="false"
									referer="sheet"
								/>
							)}
							{this.state.acForm == 19 && (
								<Eform2
									Extra={this.state.extra}
									eformId={this.state.acForm}
									instanseID={this.state.insid}
									stdID={0}
									isAdminForms="true"
									goBack="false"
									referer="sheet"
								/>
							)}
							{this.state.acForm == 22 && (
								<Eform2
									Extra={this.state.extra}
									eformId={this.state.acForm}
									instanseID={this.state.insid}
									stdID={0}
									isAdminForms="true"
									goBack="false"
									referer="sheet"
								/>
							)}
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
							height: 225
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
											size={32}
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
					ref={'modalf'}
					swipeToClose={this.state.swipeToClose}
					onClosed={this.onClose}
					onOpened={this.onOpen}
					onClosingState={this.onClosingState}
				>
					<FlatGrid
						items={fmenu}
						style={styles.gridView}
						itemDimension={83}
						spacing={10}
						renderItem={({ item }) => (
							<View>
								<TouchableOpacity
									onPress={() => {
										//this.refs.modal1.close();
										this.clickEventListenerHeadf(item);
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
