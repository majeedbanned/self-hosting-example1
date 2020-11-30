import React, { Component } from 'react';
import { StyleSheet, Linking, ActivityIndicator, Dimensions } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../../../config/styles';
import Modalm from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import Mstyles from '../../../components/styles';
import FormButton from '../../../component/FormButton';
//import ExamAdd from './examAdd';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//import SelectUser from '../../../selectUser';
import NetInfo from '@react-native-community/netinfo';
import Modal, {
	ModalTitle,
	ModalContent,
	ModalFooter,
	ModalButton,
	SlideAnimation,
	ScaleAnimation
} from 'react-native-modals';
import { userInfo, toFarsi, getHttpAdress } from '../../../components/DB';
import { FlatList, ScrollView, Image, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import GLOBAL from '../../global';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';
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
const newPlaceholder = {
	label: 'بــــــارم',
	value: ''
};

const newPlaceholder1 = {
	label: 'انتخاب کنید',
	value: ''
};
const noeazmoon = [
	{
		label: '.25',
		value: '.25'
	},
	{
		label: '.5',
		value: '.5'
	},
	{
		label: '.75',
		value: '.75'
	}
];

const nomre = [
	{
		label: '1',
		value: '1'
	},
	{
		label: '2',
		value: '2'
	},
	{
		label: '3',
		value: '3'
	},
	{
		label: '4',
		value: '4'
	},
	{
		label: '5',
		value: '5'
	},
	{
		label: '6',
		value: '6'
	},
	{
		label: '7',
		value: '7'
	},
	{
		label: '8',
		value: '8'
	},
	{
		label: '9',
		value: '9'
	},
	{
		label: '10',
		value: '10'
	},
	{
		label: '11',
		value: '11'
	},
	{
		label: '12',
		value: '12'
	},
	{
		label: '13',
		value: '13'
	},
	{
		label: '14',
		value: '14'
	},
	{
		label: '15',
		value: '15'
	},
	{
		label: '16',
		value: '16'
	},
	{
		label: '17',
		value: '17'
	},
	{
		label: '18',
		value: '18'
	},
	{
		label: '19',
		value: '19'
	},
	{
		label: '20',
		value: '20'
	}
];

const mohlat = [
	{
		label: '30 ثانیه',
		value: '0.30'
	},
	{
		label: '1 دقیقه',
		value: '1'
	},
	{
		label: '1.30',
		value: '1.30'
	},
	{
		label: '2',
		value: '2'
	},
	{
		label: '3',
		value: '3'
	},
	{
		label: '5',
		value: '5'
	},
	{
		label: '7',
		value: '7'
	},
	{
		label: '10',
		value: '10'
	},
	{
		label: '15',
		value: '15'
	},
	{
		label: '20',
		value: '20'
	}
];
class PureQ extends React.PureComponent {
	render() {
		const col = this.props.col1;
		const row = this.props.row1;
		const item = this.props.items;
		const hozor = this.props.hozor;
		const courseCode = this.props.identity;
		console.log(item.id);
		if (!item) return null;
		return (
			<View
				style={{
					backgroundColor: 'white',
					padding: 15,
					borderRadius: 15,
					margin: 10,
					borderWidth: 0,
					justifyContent: 'center',
					flex: 2
				}}
			>
				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.aztitle}>{item.soal}</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					{item.sahih == '1' ? (
						<Icon name="ios-checkbox" size={30} color="#ccc" />
					) : (
						<Icon name="ios-square-outline" size={30} color="#ccc" />
					)}
					<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g1}</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					{item.sahih == '2' ? (
						<Icon name="ios-checkbox" size={30} color="#ccc" />
					) : (
						<Icon name="ios-square-outline" size={30} color="#ccc" />
					)}
					<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g2}</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					{item.sahih == '3' ? (
						<Icon name="ios-checkbox" size={30} color="#ccc" />
					) : (
						<Icon name="ios-square-outline" size={30} color="#ccc" />
					)}
					<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g3}</Text>
				</View>

				<View style={{ flexDirection: 'row' }}>
					{item.sahih == '4' ? (
						<Icon name="ios-checkbox" size={30} color="#ccc" />
					) : (
						<Icon name="ios-square-outline" size={30} color="#ccc" />
					)}
					<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g4}</Text>
				</View>
				<View
					style={{
						width: '100%',
						justifyContent: 'space-evenly',
						flexDirection: 'row'
					}}
				>
					<TouchableOpacity
						onPress={() => {
							alert('hod');
							this.setState({
								barom_Visible: true
							});
						}}
					>
						{/* <Icon
							name="ios-add"
							size={40}
							style={{
								color: 'green'
							}}
						/> */}
					</TouchableOpacity>
					{item.barom != '' &&
					item.barom != undefined && (
						<View style={styles.roundedview}>
							<Text style={styles.roundedtext}>{toFarsi(`بارم: ` + item.barom)}</Text>
						</View>
					)}
					{item.pasokh != '' &&
					item.barom != undefined && (
						<View style={styles.roundedview}>
							<Text style={styles.roundedtext}> {toFarsi(`زمان پاسخ: ` + item.pasokh)}</Text>
						</View>
					)}
				</View>
			</View>
		);
	}
}

class qbank extends Component {
	constructor(props) {
		super(props);
		(this.page = 1),
			(this.state = {
				soalCount: 0,
				baromCount: 0,
				barom_sahih: '',
				barom_ashar: '',
				pasokhgoyi: '',
				barom_Visible: false,
				bottomModalAndTitle: false,
				refreshing: false,
				isModalVisible: false,
				value: '',
				loadingMore: false,
				page: 1,
				isLoading: false,
				modalVisible: false,
				userSelected: [],
				data: [],
				datas: [],
				test: [],
				selectedItem: 1,
				dataLoading: false
			});
	}
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerBackTitle: 'بازگشت',
			headerTitle: global.examName,
			//title: 'sss',
			headerRight: null,
			headerTitleStyle: {
				fontFamily: 'iransans'
			}
		};
	};
	async componentDidMount() {
		//console.log('after await');
		this.setState({
			cat: [
				{
					id: 1,

					name: 'سئوالات آزمون'
				},
				{
					id: 2,

					name: 'سئوالات شخصی'
				},
				{
					id: 3,

					name: 'سئوالات همکاران'
				},
				{
					id: 4,

					name: 'بانک سئوالات آنلاین'
				}
			]
		});
		this.setState({ selectedItem: 1, data: [], dataLoading: true });
		await this.loadAPI1(this.page, 'pull');
	}

	loadAPI_addq = async (page, type) => {
		return 200;
	};

	loadAPI = async (page, type) => {
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

		this.setState({ loading: true });
		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/getExamList?currentPage=' + '1' + '&p=' + param;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false
					});
					return false;
				}
				console.log(retJson);
				this.setState({
					//**data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],

					loading: false
				});

				return true;
			} else {
				return false;
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false
			});
			return false;
		}
	};
	_renderFooter = () => {
		if (!this.state.isLoading) return null;
		return <ActivityIndicator style={{ color: 'red' }} size="large" />;
	};
	_handleLoadMore = () => {
		if (!this.state.isLoading) {
			this.page = this.page + 1;
			this.loadAPI(this.page, 'more');
		}
	};
	clickEventListener = (item) => {
		const { navigate } = this.props.navigation;
		//navigate('test');
		if (item.name == 'ویرایش') {
			//global.examEditedID = 1;
			this.setState({
				bottomModalAndTitle: false
			});
			navigate('examAdd');
		}

		console.log(item);

		//Alert.alert('Message', 'Item clicked. ' + item.username);
	};
	async onRefresh() {
		this.setState({ isRefreshing: true });
		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/getExamList?currentPage=' + '1' + '&p=' + param;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						isRefreshing: false
					});
					return;
				}

				let data = retJson;
				this.setState({
					data: data,
					isRefreshing: false
				});
				this.page = 1;
			}
		} catch (e) {
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				isRefreshing: false
			});
			return;
		}
	}

	loadAPI1 = async (id) => {
		setTimeout(() => {
			if (id == 1) {
				this.setState({
					dataLoading: false,

					data: [
						{
							id: 26668,
							soal: 'ترجمه واژه های مشخص شده به ترتیب در کدام گزینه آمده است؟',
							g1: '1399/04/15',
							g2:
								'کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس اول و کلاس پنجم',

							g3: 'محمد حسین ',
							g4: 'سمیعی ',
							sahih: 1,
							barom: '1',
							id_add: '66',

							pasokh: '0.30'
						},
						{
							id: 26669,
							soal: 'ترجمه واژه های مشخص شده به ترتیب در کدام گزینه آمده است؟',
							g1: '1399/04/15',
							g2:
								'کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس اول و کلاس پنجم',

							g3: 'محمد حسین ',
							g4: 'سمیعی ',
							sahih: 1,
							barom: '2.4',
							id_add: '2',

							pasokh: '2'
						}
					]
				});
				var msgTotal = this.state.data.reduce(function(prev, cur) {
					return prev + parseFloat(cur.barom);
				}, 0);
				this.setState({
					soalCount: this.state.data.length,
					baromCount: msgTotal
				});
			} else {
				this.setState({
					dataLoading: false,

					data1: [
						{
							id: 26568,
							soal: 'ترجمه واژه های مشخص شده به ترتیب در کدام گزینه آمده است؟',
							g1: '1399/04/15',
							g2:
								'کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس اول و کلاس پنجم',

							g3: 'محمد حسین ',
							g4: 'سمیعی ',
							sahih: 1,
							barom: '',
							id_add: '',

							pasokh: ''
						},
						{
							id: 26369,
							soal: 'ترجمه واژه های مشخص شده به ترتیب در کدام گزینه آمده است؟',
							g1: '1399/04/15',
							g2:
								'کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس کلاس اول و کلاس اول و کلاس پنجم',

							g3: 'محمد حسین ',
							g4: 'سمیعی ',
							sahih: 1,
							barom: '',
							id_add: '',

							pasokh: ''
						}
					]
				});
			}
		}, 500);
	};
	getIndex(value, arr, prop) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][prop] === value) {
				return i;
			}
		}
		return -1; //to handle the case where the value doesn't exist
	}
	updateItem(id, itemAttributes) {
		var index = this.state.data.findIndex((x) => x.id === id);
		if (index === -1) {
		} else
			this.setState({
				data: [
					...this.state.data.slice(0, index),
					Object.assign({}, this.state.data[index], itemAttributes),
					...this.state.data.slice(index + 1)
				]
			});
	}
	onPressHandler(id) {
		this.setState({ selectedItem: id, data: [], dataLoading: true });
		this.loadAPI1(id);
	}
	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white' }}>
				<FlatList
					keyExtractor={(item) => {
						return item.id;
					}}
					extraData={this.state.selectedItem}
					data={this.state.cat}
					keyExtractor={(item) => item.id.toString()}
					horizontal
					style={{ paddingBottom: 4, borderWidth: 0, marginTop: 4, marginRight: 4, marginLeft: 4 }}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								activeOpacity={0.6}
								onPress={() => {
									console.log(item.id);
									this.onPressHandler(item.id);
								}}
							>
								<View
									style={
										this.state.selectedItem === item.id ? (
											{
												flexDirection: 'row',
												backgroundColor: '#36D1DC',
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: '#36D1DC',
												borderRadius: 15,
												margin: 3,
												paddingTop: 8,
												paddingRight: 8,
												paddingLeft: 8,
												paddingBottom: 3
											}
										) : (
											{
												flexDirection: 'row',
												backgroundColor: 'white',
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: '#36D1DC',
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
													color: '#36D1DC',

													fontFamily: 'iransans'
												}
											)
										}
									>
										{item.name}
									</Text>
									{this.state.selectedItem !== item.id ||
										(this.state.dataLoading && <ActivityIndicator />)}
								</View>
							</TouchableOpacity>
						);
					}}
				/>

				<View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
					<Text style={defaultStyles.lbl14}>تعداد سئوال: {this.state.soalCount}</Text>
					<Text style={defaultStyles.lbl14}>مجموع بارم:{this.state.baromCount}</Text>
					{/* <Text>salam</Text> */}
				</View>
			</View>
		);
	};
	render() {
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;

		let test = [
			{ name: ' شرکت کنندگان', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'افزودن سئوال', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'ویرایش', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'تست آزمون', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: ' غایبین', code: 'white', icon: 'md-people', bkcolor: '#34ace0' },
			{ name: 'حذف', code: 'white', icon: 'ios-trash', bkcolor: '#f79383' }
		];

		GLOBAL.vclass = this;
		if (this.state.loading && this.page === 1) {
			return (
				<View
					style={{
						width: '100%',
						height: '100%'
					}}
				>
					<ActivityIndicator style={{ color: '#000' }} />
				</View>
			);
		}

		return (
			<View style={Mstyles.container}>
				<FlatList
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[ 0 ]}
					ListFooterComponent={this._renderFooter}
					onScroll={this.onScroll}
					initialNumToRender={10}
					onEndReachedThreshold={0.4}
					onEndReached={this._handleLoadMore.bind(this)}
					// refreshControl={
					// 	<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					// }
					style={Mstyles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					keyExtractor={(item, index) => String(index)}
					ListEmptyComponent={
						<View style={{ borderWidth: 0, height: 350 }}>
							<View
								style={{
									borderWidth: 0,

									justifyContent: 'center',
									flex: 1,
									flexDirection: 'column',
									alignItems: 'center'
								}}
							>
								{this.state.selectedItem != 1 &&
								!this.state.dataLoading && <Text style={defaultStyles.lbl14}>سئوالی پیدا نشد</Text>}

								{this.state.selectedItem == 1 &&
								!this.state.dataLoading && (
									<Text style={defaultStyles.lbl14}>سئوالی به این آزمون اضافه نشده</Text>
								)}
							</View>
						</View>
					}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									let _sahih = '';
									let _ashar = '';
									let btncap = '';
									if (item.barom)
										if (item.barom.indexOf('.') > -1) {
											_sahih = item.barom.toString().split('.')[0];
											_ashar = '.' + item.barom.toString().split('.')[1];
										} else {
											_sahih = item.barom;
										}
									btncap = item.id_add == '' ? 'افزودن سئوال به آزمون' : 'ویرایش';
									let modal_mode = item.id_add == '' ? 'add' : 'edit';
									global.clickd_q = item.id;
									this.setState({
										barom_sahih: _sahih,
										barom_ashar: _ashar,
										butcaption: btncap,
										modal_mode: modal_mode,
										pasokhgoyi: item.pasokh,
										barom_Visible: true
									});
								}}
								activeOpacity={0.6}
							>
								<PureQ items={item} />
							</TouchableOpacity>
						);
					}}
				/>

				<ActionButton position="left" buttonColor="#03a5fc">
					<ActionButton.Item
						buttonColor="#58bef5"
						textStyle={{ fontFamily: 'iransans' }}
						title=" افزودن سئوال تستی"
						onPress={() => {
							const { navigate } = this.props.navigation;
							navigate('qtesti', { mode: 'add' });
						}}
					>
						<Icon name="ios-mail" style={styles.actionButtonIcon} />
					</ActionButton.Item>

					<ActionButton.Item
						buttonColor="#58bef5"
						textStyle={{ fontFamily: 'iransans' }}
						title=" افزودن سئوال تشریحی"
						onPress={() => {
							const { navigate } = this.props.navigation;
							navigate('qtash', { mode: 'add' });
						}}
					>
						<Icon name="ios-mail" style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>

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
							barom_Visible: false
						})}
					onSwipeComplete={() =>
						this.setState({
							barom_Visible: false
						})}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					isVisible={this.state.barom_Visible}
				>
					<View
						style={{
							borderRadius: 30,
							height: 300,
							marginLeft: 20,
							marginRight: 20,
							backgroundColor: 'white'
						}}
					>
						{/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
						<Text style={[ defaultStyles.lbl16, { textAlign: 'center', marginTop: 15 } ]}>
							{' '}
							بارم سئوال:
						</Text>
						<View style={{ flexDirection: 'row', borderWidth: 0 }}>
							<View style={[ defaultStyles.shadow, defaultStyles.viewBtn, { flex: 1 } ]}>
								<RNPickerSelect
									style={pickerStyle}
									//itemKey={values.speed}
									value={this.state.barom_ashar}
									//onChangeText={handleChange('sport')}
									placeholder={newPlaceholder}
									//	onValueChange={handleChange('speed')}
									onValueChange={(e) => {
										this.setState({
											barom_ashar: e
										});
									}}
									items={noeazmoon}
								/>
							</View>
							<View style={[ defaultStyles.shadow, defaultStyles.viewBtn, { flex: 1 } ]}>
								<RNPickerSelect
									style={pickerStyle}
									//itemKey={values.speed}
									value={this.state.barom_sahih}
									//onChangeText={handleChange('sport')}
									placeholder={newPlaceholder}
									//	onValueChange={handleChange('speed')}
									onValueChange={(e) => {
										this.setState({
											barom_sahih: e
										});
									}}
									items={nomre}
								/>
							</View>
						</View>
						<Text style={[ defaultStyles.lbl16, { textAlign: 'center', marginTop: 15 } ]}>
							مهلت پاسخگویی:
						</Text>
						<View style={{ flexDirection: 'row', borderWidth: 0 }}>
							<View style={[ defaultStyles.shadow, defaultStyles.viewBtn, { flex: 1 } ]}>
								<RNPickerSelect
									style={pickerStyle}
									//itemKey={values.speed}
									value={this.state.pasokhgoyi}
									//onChangeText={handleChange('sport')}
									placeholder={newPlaceholder1}
									//	onValueChange={handleChange('speed')}
									onValueChange={(e) => {
										this.setState({
											pasokhgoyi: e
										});
									}}
									items={mohlat}
								/>
							</View>
						</View>
						<View
							style={{
								justifyContent: 'space-evenly',
								flexDirection: 'row',
								alignItems: 'center',

								borderWidth: 0
							}}
						>
							<FormButton
								fontSizeb={14}
								heightb={50}
								borderRadiusb={10}
								widthb={145}
								buttonColor="white"
								borderColor="white"
								backgroundColor="green"
								buttonType="outline"
								onPress={async () => {
									if (this.state.barom_sahih == '' && this.state.barom_ashar == '') {
										alert('لطفا بارم سئوال را انتخاب کنید');
										return;
									}
									if (this.state.selectedItem == 1) {
										let res = await this.loadAPI(this.state.barom_sahih + this.state.barom_ashar);
										this.setState({
											saveloading: false
										});
										if (!res) {
											alert('خطا');
											return;
										} else {
											this.updateItem(global.clickd_q, {
												barom: this.state.barom_sahih + this.state.barom_ashar,
												pasokh: this.state.pasokhgoyi,
												id_add: '1'
											});
											this.setState({
												barom_Visible: false
											});
											setTimeout(() => {
												var msgTotal = this.state.data.reduce(function(prev, cur) {
													return prev + parseFloat(cur.barom);
												}, 0);

												this.setState({
													baromCount: msgTotal
												});
											}, 200);
										}
									} else {
										let res = await this.loadAPI_addq(
											this.state.barom_sahih + this.state.barom_ashar
										);
										if (res > 0) {
											this.setState({
												baromCount:
													this.state.baromCount +
													parseFloat(this.state.barom_sahih + this.state.barom_ashar),
												soalCount: this.state.soalCount + 1
											});

											let i = this.getIndex(global.clickd_q, this.state.data, 'id');
											if (i !== -1) {
												var array = [ ...this.state.data ]; // make a separate copy of the array

												array.splice(i, 1);
												this.setState({ data: array });
											}
											this.setState({
												saveloading: false
											});
											this.setState({
												barom_Visible: false
											});
										}
									}
								}}
								style={{ margin: 20 }}
								//disabled={!isValid }
								loading={this.state.saveloading}
								title={this.state.butcaption}
							/>

							{this.state.selectedItem == 1 && (
								<FormButton
									fontSizeb={14}
									heightb={50}
									borderRadiusb={10}
									widthb={145}
									buttonColor="white"
									borderColor="white"
									backgroundColor="red"
									buttonType="outline"
									onPress={async () => {
										let res = await this.loadAPI(global.clickd_q);
										this.setState({
											deleteloading: false
										});
										if (!res) {
										} else {
											//**this.updateItem(global.clickd_q, { barom: '', pasokh: '', id_add: '' });

											this.setState({
												barom_Visible: false
											});

											let i = this.getIndex(global.clickd_q, this.state.data, 'id');
											if (i !== -1) {
												var array = [ ...this.state.data ]; // make a separate copy of the array

												array.splice(i, 1);
												this.setState({ data: array });
											}

											setTimeout(() => {
												var msgTotal = this.state.data.reduce(function(prev, cur) {
													return prev + parseFloat(cur.barom);
												}, 0);

												this.setState({
													soalCount: this.state.data.length,
													baromCount: msgTotal
												});
											}, 200);
										}
									}}
									style={{ margin: 20 }}
									//disabled={!isValid }
									loading={this.state.deleteloading}
									title={'حذف از آزمون'}
								/>
							)}
						</View>
					</View>
				</Modalm>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	roundedview: {
		backgroundColor: defaultStyles.colors.lightblue,
		fontFamily: 'iransans',
		//borderWidth: 1,
		borderColor: '#36D1DC',
		borderRadius: 10,
		margin: 3,
		width: 125,
		paddingTop: 8,
		paddingRight: 8,
		paddingLeft: 8,
		paddingBottom: 3
	},
	roundedtext: {
		textAlign: 'center',
		//	backgroundColor: '#36D1DC',
		fontFamily: 'iransans'
	},

	buttompanel: {
		shadowColor: '#ccc',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.37,
		shadowRadius: 2.49,
		elevation: 1,
		borderRadius: 13,
		zIndex: 0,
		//elevate: 0,
		marginTop: -10,
		marginLeft: 15,
		marginRight: 15,
		height: 70,
		flexDirection: 'column',
		backgroundColor: 'white'
	},
	gradient: {
		borderRadius: 13,
		left: 0,
		right: 0,
		top: 0,
		zIndex: 1,
		elevation: 2,
		backgroundColor: 'white',
		//height: 100,
		flexDirection: 'column'
	},
	mainpanel: {
		borderRadius: 13,
		margin: 15,
		zIndex: 1
		// elevation: 2,
		// shadowColor: '#ccc',
		// shadowOffset: {
		// 	width: 3,
		// 	height: 3
		// },
		// shadowOpacity: 0.67,
		// shadowRadius: 3.49
	},
	aztitle: {
		width: '100%',
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'left',
		borderWidth: 0,
		fontSize: 16,
		color: 'black'
	},
	aztitlet: {
		alignSelf: 'flex-start',
		fontFamily: 'iransans',
		textAlign: 'left',
		//width: '100%',
		fontSize: 13,
		borderWidth: 0,

		padding: 10,
		borderColor: 'black',
		borderRadius: 5,
		color: 'black'
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	},
	image: {
		width: 50,
		paddingTop: 8,
		paddingRight: 6,
		height: 50,
		alignSelf: 'center',
		//borderRadius: 55,
		//borderWidth: 1,
		borderColor: '#ebf0f7'
		//backgroundColor: 'white'

		// position:'absolute'
	},
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 0,
		paddingBottom: 0,
		borderRadius: 25
	},
	textpart: {
		justifyContent: 'center',
		flexDirection: 'row',
		borderWidth: 0,
		marginStart: 0,
		flex: 1
	},
	rtlText: {
		alignSelf: 'center',
		fontFamily: 'iransans',
		color: 'white',
		fontSize: 15
	},
	image2: {
		width: 50,
		height: 60,
		borderRadius: 15,
		borderWidth: 1,
		borderColor: '#ebf0f7',
		marginTop: 10,

		marginStart: 20,
		position: 'absolute',
		shadowColor: 'red',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.37,
		shadowRadius: 3.49,
		elevation: 16
	},

	image3: {
		width: 40,
		height: 50,
		borderRadius: 15,
		marginTop: 20,
		borderWidth: 1,
		borderColor: '#ebf0f7',
		backgroundColor: 'green',
		marginStart: 40,
		position: 'absolute'
	},
	imageavatar: {
		width: 40,
		height: 50,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	gridView: {
		marginTop: 2,
		flex: 1
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
		fontFamily: 'iransans',
		textAlign: 'center'
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#fff'
	}
});
export default withNavigation(qbank);
