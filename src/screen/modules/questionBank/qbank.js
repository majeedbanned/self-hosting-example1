import React, { Component } from 'react';
import { StyleSheet, Linking, ActivityIndicator, Dimensions, TextInput, Modal, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../../../config/styles';
import HTML from 'react-native-render-html';
import { RadioButton } from 'react-native-paper';
import { Snackbar } from 'react-native-paper';
import RadioItem from '../../../components/radioItem';
//import { Button } from 'react-native-elements';
import Lightbox from 'react-native-lightbox';
import { Button } from 'react-native-paper';
import Modalm from 'react-native-modal';
import { FontAwesome } from '@expo/vector-icons';

import { Banner } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconaw from 'react-native-vector-icons/FontAwesome';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import Mstyles from '../../../components/styles';
import FormButton from '../../../component/FormButton';
//import ExamAdd from './examAdd';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//import SelectUser from '../../../selectUser';
import ImageViewer from 'react-native-image-zoom-viewer';
import NetInfo from '@react-native-community/netinfo';
import {
	ModalTitle,
	ModalContent,
	ModalFooter,
	ModalButton,
	SlideAnimation,
	ScaleAnimation
} from 'react-native-modals';
import { userInfo, toFarsi, encrypt, getHttpAdress, getHttpAdressPure } from '../../../components/DB';
import { FlatList, ScrollView, Image, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import GLOBAL from '../../global';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';
const pickerStyle = {
	inputIOS: {
		color: defaultStyles.colors.primary,
		fontSize: 15,
		fontFamily: 'iransans',
		//paddingTop: 18,

		//paddingHorizontal: 10,
		marginTop: 4,
		textAlign: 'center'
	},
	inputAndroid: {
		// fontSize: 14,
		// fontFamily: 'iransans',
		// textAlign: 'center',
		// color: 'red'

		paddingTop: 15,
		textAlign: 'center',
		// color: 'black'
		fontFamily: 'iransans',
		fontSize: 16,
		paddingHorizontal: 5,
		paddingVertical: 3,
		//borderWidth: 0.5,
		//width: 400,
		//borderColor: 'purple',
		borderRadius: 8,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
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
const newPlaceholderDef = {
	label: '1',
	value: '1'
};

const newPlaceholder1 = {
	label: 'انتخاب کنید',
	value: ''
};
const nPfasl = {
	label: 'انتخاب فصل',
	value: ''
};
const nPdars = {
	label: 'انتخاب درس',
	value: ''
};
const noeazmoon = [
	{
		label: '.25',
		value: '.25'
	},
	{
		label: '.50',
		value: '.50'
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
		value: '0.5'
	},
	{
		label: '1 دقیقه',
		value: '1'
	},
	{
		label: '1.30',
		value: '1.5'
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

const ffasl = [
	{
		label: 'فصل ۱',
		value: '1'
	},
	{
		label: 'فصل ۲',
		value: '2'
	},
	{
		label: 'فصل ۳',
		value: '3'
	},
	{
		label: 'فصل ۴',
		value: '4'
	},
	{
		label: 'فصل ۵',
		value: '5'
	},
	{
		label: 'فصل ۶',
		value: '6'
	},
	{
		label: 'فصل ۷',
		value: '7'
	},
	{
		label: 'فصل ۸',
		value: '8'
	},
	{
		label: 'فصل ۹',
		value: '9'
	},
	{
		label: 'فصل ۱۰',
		value: '10'
	},
	{
		label: 'فصل ۱۱',
		value: '11'
	},
	{
		label: 'فصل ۱۲',
		value: '12'
	},
	{
		label: 'فصل ۱۳',
		value: '13'
	},
	{
		label: 'فصل ۱۴',
		value: '14'
	},
	{
		label: 'فصل ۱۵',
		value: '15'
	},
	{
		label: 'فصل ۱۶',
		value: '16'
	}
];
class PureQ extends React.PureComponent {
	render() {
		const col = this.props.col1;
		const row = this.props.row1;
		const item = this.props.items;
		const hozor = this.props.hozor;
		const courseCode = this.props.identity;
		//console.log(item.id);
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
					<HTML
						html={
							'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:14;line-height:35px" >' +
							item.soal +
							'</span>'
						}
					/>
					{/* <Text style={styles.aztitle}>{item.soal}</Text> */}
				</View>

				{item.noe_soal == '1' && (
					<View>
						<View style={{ flexDirection: 'row' }}>
							{item.gsahih == '1' ? (
								<Icon name="ios-checkbox" size={30} color="#ccc" />
							) : (
								<Icon name="ios-square-outline" size={30} color="#ccc" />
							)}

							<HTML
								html={
									'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:14;line-height:35px" >' +
									item.g1 +
									'</span>'
								}
							/>
							{/* <Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g1}</Text> */}
						</View>

						<View style={{ flexDirection: 'row' }}>
							{item.gsahih == '2' ? (
								<Icon name="ios-checkbox" size={30} color="#ccc" />
							) : (
								<Icon name="ios-square-outline" size={30} color="#ccc" />
							)}
							<HTML
								html={
									'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:14;line-height:35px" >' +
									item.g2 +
									'</span>'
								}
							/>
							{/* <Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g2}</Text> */}
						</View>

						<View style={{ flexDirection: 'row' }}>
							{item.gsahih == '3' ? (
								<Icon name="ios-checkbox" size={30} color="#ccc" />
							) : (
								<Icon name="ios-square-outline" size={30} color="#ccc" />
							)}
							<HTML
								html={
									'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:14;line-height:35px" >' +
									item.g3 +
									'</span>'
								}
							/>
							{/* <Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g3}</Text> */}
						</View>

						<View style={{ flexDirection: 'row' }}>
							{item.gsahih == '4' ? (
								<Icon name="ios-checkbox" size={30} color="#ccc" />
							) : (
								<Icon name="ios-square-outline" size={30} color="#ccc" />
							)}

							<HTML
								html={
									'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:14;line-height:35px" >' +
									item.g4 +
									'</span>'
								}
							/>
							{/* <Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g4}</Text> */}
						</View>
					</View>
				)}

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
			(this.examID = 0),
			(this.state = {
				ddars: [
					{
						label: 'ریاضی',
						value: 25426
					}
				],
				addload: false,
				selectedDars: '',
				selectedFasl: '',
				delload: false,
				idedit: 0,
				searchText: '',
				selected_pages: 1,
				selected_pages_online: '1',
				searchvisi: false,
				//searchvisi: true,
				onlineCount: 1,
				soalCount: 0,
				dataLoading_page: false,
				srchloading: false,
				onlinePagingLoading: false,
				baromCount: 0,
				barom_sahih: '',
				barom_ashar: '',
				defaultfasl: '',
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
				selected_pages: 1,

				dataLoading: false
			});

		this.props.navigation.addListener('willFocus', async () => {
			const { navigation } = this.props;
			//YellowBox.ignoreWarnings([ 'Animated: `useNativeDriver`' ]);
			this.examID = navigation.getParam('examID');
			this.start = navigation.getParam('mode1');
			//alert(this.start);
			if (this.start == 'start') {
				this.setState({ selectedItem: 2, data: [], dataLoading: true, selected_pages: 1 });

				this.setState({
					cat: [
						// {
						// 	id: 1,

						// 	name: 'سئوالات آزمون'
						// },
						{
							id: 2,

							name: 'بانک سئوالات شخصی'
						},

						{
							id: 4,

							name: 'بانک سئوالات آنلاین'
						}
					]
				});
			} else {
				this.setState({ selectedItem: 1, data: [], dataLoading: true, selected_pages: 1 });
				this.setState({
					cat: [
						{
							id: 1,

							name: 'سئوالات آزمون'
						},
						{
							id: 2,

							name: 'بانک سئوالات شخصی'
						},
						// {
						// 	id: 3,

						// 	name: 'بانک سئوالات همکاران'
						// },
						{
							id: 4,

							name: 'بانک سئوالات آنلاین'
						}
					]
				});
			}
			await this.loadAPI(1);
			await this.loadAPICourseList(1);
		});
	}
	static navigationOptions66 = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerBackTitle: 'بازگشت',
			headerTitle: global.examName,
			//title: 'sss',
			headerRight: () => null,
			headerTitleStyle: {
				fontFamily: 'iransans'
			}
		};
	};

	static navigationOptions = ({ navigation, screenProps }) => ({
		headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
		headerTitle: navigation.state.params ? navigation.state.params.headerTitle : null
	});

	async componentDidMount() {
		//console.log('after await');

		const { navigation } = this.props;
		//YellowBox.ignoreWarnings([ 'Animated: `useNativeDriver`' ]);
		this.examID = navigation.getParam('examID');
		//alert(this.examID);
		// this.examMode = navigation.getParam('mode');
		// this.activeStd = navigation.getParam('std');
		// this.activeName = navigation.getParam('name');

		this.props.navigation.setParams({
			headerTitle: '',
			headerRight: (
				<TouchableOpacity
					onPress={() => {
						this.setState({ searchvisi: !this.state.searchvisi });
					}}
				>
					<FontAwesome name="search" size={25} color="#000" style={{ marginRight: 10 }} />
				</TouchableOpacity>
			)
		});
		// this.setState({
		// 	_pages: [
		// 		{ id: 1, name: 1 },
		// 		{ id: 2, name: 2 },
		// 		{ id: 3, name: 3 },
		// 		{ id: 4, name: 4 },
		// 		{ id: 5, name: 5 },
		// 		{ id: 6, name: 6 },
		// 		{ id: 7, name: 7 },
		// 		{ id: 8, name: 8 },
		// 		{ id: 9, name: 9 },
		// 		{ id: 10, name: 10 },
		// 		{ id: 11, name: 11 },
		// 		{ id: 12, name: 12 },
		// 		{ id: 13, name: 13 }
		// 	]
		// });
		// this.setState({
		// 	cat: [
		// 		{
		// 			id: 1,

		// 			name: 'سئوالات آزمون'
		// 		},
		// 		{
		// 			id: 2,

		// 			name: 'بانک سئوالات شخصی'
		// 		},
		// 		// {
		// 		// 	id: 3,

		// 		// 	name: 'بانک سئوالات همکاران'
		// 		// },
		// 		{
		// 			id: 4,

		// 			name: 'بانک سئوالات آنلاین'
		// 		}
		// 	]
		// });

		// this.setState({ selectedItem: 1, data: [], dataLoading: true, selected_pages: 1 });
		// await this.loadAPI(1);
		// await this.loadAPICourseList(1);
	}

	loadAPI_addq = async (sahih, time, mode, idedit) => {
		//alert(sahih + ' ' + time + ' ' + mode + idedit);
		if (global.adress == 'undefined') {
			GLOBAL.main.setState({ isModalVisible: true });
		}
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			this.setState({ issnackin: true });
			return;
		}

		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/setExamAddq?currentPage=' +
			this.state.selected_pages +
			'&p=' +
			param +
			'&sahih=' +
			sahih +
			'&time=' +
			time +
			'&mode=' +
			mode +
			'&idedit=' +
			idedit +
			'&examid=' +
			this.examID +
			'&tab=' +
			this.state.selectedItem +
			'&teachercode=' +
			global.username;
		////////console.log(uurl);

		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({});
					alert('err');
				}
				//alert(retJson.barom);
				if (true) {
					this.setState({
						baromCount: retJson.barom,
						soalCount: retJson.ccc
					});
				}

				return 1;
			} else {
				return 1;
			}
		} catch (e) {
			//	console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({});
			return false;
		}

		return 1;
	};

	loadAPI = async (page, type) => {
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

		//this.setState({ dataLoading: true });
		let param = userInfo();
		if (this.state.selectedItem == 4) {
			if (this.state.selectedDars == '') this.setState({ selectedDars: this.state.defaultCourseCode });
		}

		let uurl =
			global.adress +
			'/pApi.asmx/getExamBank?currentPage=' +
			this.state.selected_pages +
			'&p=' +
			param +
			'&examid=' +
			this.examID +
			'&q=' +
			this.state.searchText +
			'&mode=' +
			this.state.selectedItem +
			'&dars=' +
			this.state.selectedDars +
			'&fasl=' +
			this.state.selectedFasl +
			'&start=' +
			this.start;
		//
		try {
			uurl = encrypt(uurl);
			//console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				//	console.log('complete');
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						dataLoading: false,
						srchloading: false,
						dataLoading_page: false,
						onlinePagingLoading: false
					});
					return false;
				}

				//alert(retJson[0].pages);
				this.setState({ _pages: [] });
				for (let i = 1; i <= retJson[0].pages; i++) {
					//alert();
					this.setState((prevState) => ({
						_pages: [ ...this.state._pages, { id: i, name: i } ]
					}));
					//this.setState(_pages:[ ...this.state._pages, { id: i, name: i } ]);
				}
				//console.log(this.state._pages);
				if (this.state.selectedItem == 1) {
					this.setState({
						baromCount: retJson[0].sumbarom,
						soalCount: retJson[0].sumsoal
					});
				}
				this.setState({
					data: retJson,
					//**data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],

					loading: false,
					dataLoading: false,
					srchloading: false,
					dataLoading_page: false,
					onlinePagingLoading: false
				});

				if (this.state.selectedItem == 4) {
					this.setState({ onlineCount: Math.trunc(retJson[0].rows / 16) });
				}
				this.flatListRef.scrollToOffset({ animated: true, offset: 0 });

				return true;
			} else {
				return false;
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				dataLoading: false,
				srchloading: false,
				dataLoading_page: false,
				onlinePagingLoading: false
			});
			return false;
		}
	};

	loadAPICourseList = async (page, type) => {
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

		//this.setState({ dataLoading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getExamBankCourseList?currentPage=' +
			this.state.selected_pages +
			'&p=' +
			param +
			'&examid=' +
			this.examID +
			'&q=' +
			this.state.searchText +
			'&mode=' +
			this.state.selectedItem +
			'&dars=&fasl=';
		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState(
						{
							// loading: false,
							// dataLoading: false,
							// srchloading: false,
							// dataLoading_page: false
						}
					);
					return false;
				}

				//alert(retJson[0].pages);
				//**this.setState({ ddars: [] });

				//this.setState(_pages:[ ...this.state._pages, { id: i, name: i } ]);

				//console.log(this.state._pages);
				// if (this.state.selectedItem == 1) {
				// 	this.setState({
				// 		baromCount: retJson[0].sumbarom,
				// 		soalCount: retJson[0].sumsoal
				// 	});
				// }
				//alert(retJson[0].value);
				this.setState({ defaultCourseCode: retJson[0].value });
				this.setState({
					ddars: retJson
					//**data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					// loading: false,
					// dataLoading: false,
					// srchloading: false,
					// dataLoading_page: false
				});

				return true;
			} else {
				return false;
			}
		} catch (e) {
			//	console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState(
				{
					// loading: false,
					// dataLoading: false,
					// srchloading: false,
					// dataLoading_page: false
				}
			);
			return false;
		}
	};

	_renderFooter = () => {
		if (!this.state.isLoading) return null;
		return <ActivityIndicator style={{ color: 'red' }} size="small" color="#000" />;
	};
	_handleLoadMore = () => {
		if (!this.state.isLoading) {
			this.page = this.page + 1;
			this.loadAPI(this.page, 'more');
		}
	};

	searchFilterFunction = (text) => {
		//alert();
		this.setState({ searchText: text });
		if (text == '' || text == undefined) {
			this.page = 1;
			this.setState({ data: [], _pages: [ { id: 1, name: 1 } ], srchloading: true, selected_pages: 1 });
			//alert();
			setTimeout(() => {
				this.loadAPI(1, '');
			}, 1000);
			//this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
		}
		if (text.length < 2) return;
		this.page = 1;
		this.setState({ data: [], _pages: [ { id: 1, name: 1 } ], srchloading: true, selected_pages: 1 });

		setTimeout(() => {
			this.loadAPI(1, '');
		}, 1000);

		this.flatListRef.scrollToOffset({ animated: true, offset: 0 });

		return;

		const newData = this.arrayholder.filter((item) => {
			const itemData = `${item.name}`;

			//const textData = text.toUpperCase();

			return itemData.indexOf(text) > -1;
		});
		this.setState({
			data: newData
		});
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

		//console.log(item);

		//Alert.alert('Message', 'Item clicked. ' + item.username);
	};

	async onRefresh() {
		this.setState({ isRefreshing: true });
		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/getExamList?currentPage=' + '1' + '&p=' + param;
		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
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
		//alert(id);
		this.setState({
			srchdars: id != 4 ? '' : this.state.defaultCourseCode,
			srchfasl: id != 4 ? '' : this.state.defaultfasl,

			searchvisi: id == 4 ? true : false,
			selected_pages: 1,
			selectedDars: id != 4 ? '' : this.state.defaultCourseCode,
			selectedFasl: id != 4 ? '' : this.state.defaultfasl,
			_pages: [ { id: 1, name: 1 } ],
			selectedItem: id,
			data: [],
			dataLoading: true
		});

		// if(id==4)
		// this.setState({defaultCourseCode:})

		this.loadAPI(id);
	}

	onPressHandlerpages(id) {
		this.setState({ selected_pages: id, data: [], dataLoading_page: true });
		this.loadAPI(id);
	}
	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white', borderBottomWidth: 0.5, borderBottomColor: '#ccc' }}>
				<FlatList
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => {
						return item.id;
					}}
					extraData={this.state.selectedItem}
					data={this.state.cat}
					keyExtractor={(item) => item.id.toString()}
					horizontal
					contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
					style={{
						flexDirection: 'row-reverse',
						paddingBottom: 4,
						borderWidth: 0,
						marginTop: 4,
						marginRight: 4,
						marginLeft: 4
					}}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								activeOpacity={0.6}
								onPress={() => {
									//console.log(item.id);
									this.onPressHandler(item.id);
								}}
							>
								<View
									style={
										this.state.selectedItem === item.id ? (
											{
												flexDirection: 'row',
												backgroundColor: '#2980b9',
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: '#2980b9',
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
												borderColor: '#2980b9',
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
													fontSize: 12.2,
													color: 'white',
													fontFamily: 'iransans'
												}
											) : (
												{
													fontSize: 12.2,

													color: '#2980b9',

													fontFamily: 'iransans'
												}
											)
										}
									>
										{item.name}
									</Text>
									{this.state.selectedItem !== item.id ||
										(this.state.dataLoading && <ActivityIndicator size="small" color="#000" />)}
								</View>
							</TouchableOpacity>
						);
					}}
				/>
				<View style={{ flexDirection: 'row' }}>
					{this.state.selectedItem != 4 ? (
						<FlatList
							keyExtractor={(item) => {
								return item.id;
							}}
							extraData={this.state.selected_pages}
							data={this.state._pages}
							keyExtractor={(item) => item.id.toString()}
							horizontal
							style={{
								paddingBottom: 4,
								flex: 6,
								borderWidth: 0,
								marginTop: 4,
								marginRight: 4,
								marginLeft: 4
							}}
							renderItem={({ item, index }) => {
								return (
									<TouchableOpacity
										activeOpacity={0.6}
										onPress={() => {
											//console.log(item.id);
											this.onPressHandlerpages(item.id);
										}}
									>
										<View
											style={
												this.state.selected_pages === item.id ? (
													{
														flexDirection: 'row',
														backgroundColor: '#2980b9',
														fontFamily: 'iransans',
														borderWidth: 1,
														borderColor: '#2980b9',
														borderRadius: 20,
														margin: 3,
														paddingTop: 3,
														paddingRight: 8,
														paddingLeft: 8,
														paddingBottom: 0
													}
												) : (
													{
														flexDirection: 'row',
														backgroundColor: 'white',
														fontFamily: 'iransans',
														borderWidth: 1,
														borderColor: '#2980b9',
														borderRadius: 20,
														margin: 3,
														paddingTop: 3,
														paddingRight: 8,
														paddingLeft: 8,
														paddingBottom: 0
													}
												)
											}
										>
											<Text
												style={
													this.state.selected_pages === item.id ? (
														{
															color: 'white',
															fontFamily: 'iransans'
														}
													) : (
														{
															color: '#2980b9',

															fontFamily: 'iransans'
														}
													)
												}
											>
												{toFarsi(item.name)}
											</Text>
											{this.state.selected_pages !== item.id ||
												(this.state.dataLoading_page && (
													<ActivityIndicator size="small" color="#000" />
												))}
										</View>
									</TouchableOpacity>
								);
							}}
						/>
					) : (
						<View style={{ flexDirection: 'row', flex: 1, marginBottom: 3, marginTop: 5 }}>
							<TouchableOpacity
								onPress={() => {
									if (this.state.selected_pages > 1) {
										this.setState({
											onlinePagingLoading: true,
											selected_pages: this.state.selected_pages - 1
										});
										this.loadAPI();
									}
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										backgroundColor: '#2980b9',
										fontFamily: 'iransans',
										borderWidth: 1,
										borderColor: '#2980b9',
										borderRadius: 20,
										margin: 4,
										marginStart: 10,
										paddingTop: 3,

										paddingRight: 8,
										paddingLeft: 8,
										paddingBottom: 4
									}}
								>
									<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12.2 }}>
										{'>'}
									</Text>
								</View>
							</TouchableOpacity>
							<TextInput
								style={{
									fontFamily: 'iransans',
									height: 30,
									paddingTop: 5,
									textAlign: 'center',
									width: 40,
									borderColor: '#2980b9',
									borderRadius: 10,
									borderWidth: 1
								}}
								onBlur={() => {
									this.setState({
										onlinePagingLoading: true
									});
									this.loadAPI(1);
								}}
								onChangeText={(text) => this.setState({ selected_pages: text })}
								value={toFarsi(this.state.selected_pages.toString())}
							/>
							<TouchableOpacity
								onPress={() => {
									if (this.state.selected_pages > 0) {
										this.setState({
											onlinePagingLoading: true,
											selected_pages: this.state.selected_pages + 1
										});
										this.loadAPI();
									}
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										backgroundColor: '#2980b9',
										fontFamily: 'iransans',
										borderWidth: 1,
										borderColor: '#2980b9',
										borderRadius: 20,
										margin: 4,
										paddingTop: 3,
										paddingRight: 8,
										paddingLeft: 8,
										paddingBottom: 4
									}}
								>
									<Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12.2 }}>
										{'<'}
									</Text>
								</View>
							</TouchableOpacity>
							{!this.state.onlinePagingLoading ? (
								<Text
									style={{ fontFamily: 'iransans', marginTop: 7, marginStart: 5, color: '#2980b9' }}
								>
									{toFarsi(this.state.onlineCount) + ' صفحه '}
								</Text>
							) : (
								<ActivityIndicator />
							)}
						</View>
					)}

					<View
						style={{
							flex: 0.5,
							//alignSelf: 'left',
							flexDirection: 'row',
							marginTop: 10,
							marginRight: 10,
							justifyContent: 'space-evenly'
						}}
					>
						<Text style={defaultStyles.lbl14}> سئوال: {toFarsi(this.state.soalCount)}</Text>
						<Text style={defaultStyles.lbl14}> بارم:{toFarsi(this.state.baromCount)}</Text>
						{/* <Text>salam</Text> */}
					</View>
				</View>
				{this.state.searchvisi && (
					<View
						style={{
							padding: 0,
							height: 35,

							flexDirection: 'row',
							flex: 1
							//backgroundColor: 'red'
						}}
						containerStyle={{ padding: 0 }}
						visible={this.state.searchvisi}
						// actions={[
						// 	{
						// 		//label: 'Fix it',
						// 		onPress: () => {
						// 			this.setState({ searchvisi: false });
						// 		}
						// 	}

						// ]}
						// icon={({ size }) => (
						// 	<Image
						// 		source={{
						// 			uri: 'https://avatars3.githubusercontent.com/u/17571969?s=400&v=4'
						// 		}}
						// 		style={{
						// 			width: size,
						// 			height: size
						// 		}}
						// 	/>
						// )}
					>
						{/* <View style={{ flex: 5, backgroundColor: 'yellow' }}> */}
						<View style={{ flex: 2 }}>
							<SearchBar
								inputContainerStyle={{ backgroundColor: '#eee', width: 250 }}
								containerStyle={{
									marginStart: 0,
									marginEnd: 8,
									// width: 200,
									marginStart: 10,
									padding: 0,
									//height: 25,
									borderBottomWidth: 0,
									backgroundColor: 'white',
									borderTopRightRadius: 24,
									borderTopLeftRadius: 24
								}}
								placeholder="جستجو"
								inputContainerStyle={{ height: 15, backgroundColor: '#eee' }}
								lightTheme
								showLoading={this.state.srchloading}
								round
								inputStyle={{
									textAlign: 'center',
									margin: 0,
									fontSize: 12.2,
									fontFamily: 'iransans'
								}}
								//showLoading={this.state.loading}
								onChangeText={(text) => this.searchFilterFunction(text)}
								autoCorrect={false}
								value={this.state.searchText}
							/>
						</View>
						<View
							style={{
								borderWidth: 1,
								borderRadius: 15,
								marginBottom: 4,
								borderColor: '#ccc',
								flex: 1,
								marginLeft: 10
							}}
						>
							<RNPickerSelect
								useNativeAndroidPickerStyle={false}
								style={pickerStyle}
								//itemKey={values.speed}
								value={this.state.srchfasl}
								//onChangeText={handleChange('sport')}
								placeholder={nPfasl}
								//	onValueChange={handleChange('speed')}
								onValueChange={(e) => {
									this.setState({
										srchfasl: e
									});
								}}
								items={ffasl}
								onDonePress={(e) => {
									this.setState({
										onlinePagingLoading: true,
										selectedFasl: this.state.srchfasl,
										data: [],
										selected_pages: 1,

										_pages: [ { id: 1, name: 1 } ]

										//defaultCourseCode: this.state.srchdars
									});
									if (this.state.selectedItem == 4)
										this.setState({
											defaultfasl: this.state.srchfasl

											//defaultCourseCode: this.state.srchdars
										});

									this.loadAPI(1);
								}}
							/>
						</View>
						<View
							style={{
								borderWidth: 1,
								borderRadius: 15,
								marginBottom: 4,
								borderColor: '#ccc',
								flex: 1,
								marginLeft: 10
							}}
						>
							<RNPickerSelect
								useNativeAndroidPickerStyle={false}
								style={pickerStyle}
								//itemKey={values.speed}
								value={this.state.srchdars}
								//onChangeText={handleChange('sport')}
								placeholder={nPdars}
								//	onValueChange={handleChange('speed')}
								onValueChange={(e) => {
									//alert();
									this.setState({
										srchdars: e
									});
								}}
								onDonePress={(e) => {
									this.setState({
										onlinePagingLoading: true,
										selectedDars: this.state.srchdars,

										selected_pages: 1,

										_pages: [ { id: 1, name: 1 } ],

										data: []

										//defaultCourseCode: this.state.srchdars
									});
									if (this.state.selectedItem == 4)
										this.setState({
											defaultCourseCode: this.state.srchdars
										});

									this.loadAPI(1);
								}}
								items={this.state.ddars}
							/>
						</View>
						{/* </View> */}
					</View>
				)}
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
					<ActivityIndicator size="small" color="#000" />
				</View>
			);
		}

		return (
			<View style={Mstyles.container}>
				<FlatList
					ref={(ref) => {
						this.flatListRef = ref;
					}}
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[ 0 ]}
					ListFooterComponent={this._renderFooter}
					onScroll={this.onScroll}
					initialNumToRender={10}
					onEndReachedThreshold={0.4}
					//onEndReached={this._handleLoadMore.bind(this)}
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
								!this.state.dataLoading && (
									<Text style={([ defaultStyles.lbl14 ], { color: '#2980b9' })}>سئوالی پیدا نشد</Text>
								)}

								{this.state.selectedItem == 1 &&
								!this.state.dataLoading && <Text style={defaultStyles.lbl14}>لیست خالی است</Text>}
							</View>
						</View>
					}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								// onPress={() => {
								// 	let _sahih = '';
								// 	let _ashar = '';
								// 	let btncap = '';
								// 	if (item.barom)
								// 		if (item.barom.indexOf('.') > -1) {
								// 			_sahih = item.barom.toString().split('.')[0];
								// 			_ashar = '.' + item.barom.toString().split('.')[1];
								// 		} else {
								// 			_sahih = item.barom;
								// 		}
								// 	btncap = item.id_add == '' ? 'افزودن سئوال به آزمون' : 'ویرایش';
								// 	let modal_mode = item.id_add == '' ? 'add' : 'edit';
								// 	global.clickd_q = item.id;
								// 	this.setState({
								// 		barom_sahih: _sahih,
								// 		barom_ashar: _ashar,
								// 		butcaption: btncap,
								// 		modal_mode: modal_mode,
								// 		pasokhgoyi: item.pasokh,
								// 		barom_Visible: true
								// 	});
								// }}
								activeOpacity={1}
							>
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
									<View style={{ flexDirection: 'column' }}>
										<HTML
											html={
												'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:15;line-height:35px" >' +
												item.soal +
												'</span>'
											}
										/>

										{item.ax != '' &&
										item.ax != undefined && (
											<TouchableOpacity
												onPress={() => {
													console.log(getHttpAdress() + 'azmoon/' + item.ax);
													this.setState((prevState) => ({
														images: [
															{
																url: getHttpAdress() + 'azmoon/' + item.ax,
																props: {}
															}
														],
														isModalVisible: true
													}));
												}}
											>
												{/* <View style={{ borderRadius: 10, overflow: 'hidden' }}> */}

												<Iconaw
													name="image"
													size={50}
													style={{ marginBottom: 15, alignSelf: 'center', color: '#ccc' }}
												/>
												{/* <Image
														style={{
															flex: 1,
															overflow: 'hidden',
															//borderRadius: 20,
															//width: '100%',
															height: 120
														}}
														resizeMode="contain"
														source={{ uri: getHttpAdress() + 'azmoon/' + item.ax + '' }}
													/> */}
												{/* </View> */}
											</TouchableOpacity>
										)}
									</View>

									{item.noe_soal == '1' && (
										<View>
											{(item.g1 != '' || (item.ax1 != '' && item.g1 != undefined)) && (
												<View style={{ flexDirection: 'column' }}>
													<View style={{ flexDirection: 'row' }}>
														<Text>{toFarsi(' - 1')}</Text>
														{item.gsahih == '1' ? (
															<Icon name="ios-checkbox" size={30} color="#ccc" />
														) : (
															<Icon name="ios-square-outline" size={30} color="#ccc" />
														)}

														<HTML
															html={
																'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:15;line-height:35px" >' +
																item.g1 +
																'</span>'
															}
														/>
													</View>

													{item.ax1 != '' &&
													item.ax1 != undefined && (
														<TouchableOpacity
															onPress={() => {
																this.setState((prevState) => ({
																	images: [
																		{
																			url: getHttpAdress() + 'azmoon/' + item.ax1,
																			props: {}
																		}
																	],
																	isModalVisible: true
																}));
															}}
														>
															{/* <Image
															seNativeDriver="true"
															style={{
																flex: 1,

																width: '100%',
																height: 120
															}}
															resizeMode="contain"
															source={{
																uri: getHttpAdress() + 'azmoon/' + item.ax1 + ''
															}}
														/> */}
															<Iconaw
																name="image"
																size={50}
																style={{
																	marginBottom: 15,
																	alignSelf: 'center',
																	color: '#ccc'
																}}
															/>
														</TouchableOpacity>
													)}
												</View>
											)}

											{(item.g2 != '' || (item.ax2 != '' && item.g2 != undefined)) && (
												<View style={{ flexDirection: 'column' }}>
													<View style={{ flexDirection: 'row' }}>
														<Text>{toFarsi(' - 2')}</Text>
														{item.gsahih == '2' ? (
															<Icon name="ios-checkbox" size={30} color="#ccc" />
														) : (
															<Icon name="ios-square-outline" size={30} color="#ccc" />
														)}
														<HTML
															html={
																'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:15;line-height:35px" >' +
																item.g2 +
																'</span>'
															}
														/>
													</View>

													{item.ax2 != '' &&
													item.ax2 != undefined && (
														<TouchableOpacity
															onPress={() => {
																this.setState((prevState) => ({
																	images: [
																		{
																			url: getHttpAdress() + 'azmoon/' + item.ax2,
																			props: {}
																		}
																	],
																	isModalVisible: true
																}));
															}}
														>
															{/* <Image
															seNativeDriver="true"
															style={{
																flex: 1,

																width: '100%',
																height: 120
															}}
															resizeMode="contain"
															source={{
																uri: getHttpAdress() + 'azmoon/' + item.ax2 + ''
															}}
														/> */}
															<Iconaw
																name="image"
																size={50}
																style={{
																	marginBottom: 15,
																	alignSelf: 'center',
																	color: '#ccc'
																}}
															/>
														</TouchableOpacity>
													)}

													{/* <Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g2}</Text> */}
												</View>
											)}

											{(item.g3 != '' || (item.ax3 != '' && item.g3 != undefined)) && (
												<View style={{ flexDirection: 'column' }}>
													<View style={{ flexDirection: 'row' }}>
														<Text>{toFarsi(' - 3')}</Text>
														{item.gsahih == '3' ? (
															<Icon name="ios-checkbox" size={30} color="#ccc" />
														) : (
															<Icon name="ios-square-outline" size={30} color="#ccc" />
														)}
														<HTML
															html={
																'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:15;line-height:35px" >' +
																item.g3 +
																'</span>'
															}
														/>
													</View>
													{item.ax3 != '' &&
													item.ax3 != undefined && (
														<TouchableOpacity
															onPress={() => {
																this.setState((prevState) => ({
																	images: [
																		{
																			url: getHttpAdress() + 'azmoon/' + item.ax3,
																			props: {}
																		}
																	],
																	isModalVisible: true
																}));
															}}
														>
															{/* <Image
															seNativeDriver="true"
															style={{
																flex: 1,

																width: '100%',
																height: 120
															}}
															resizeMode="contain"
															source={{
																uri: getHttpAdress() + 'azmoon/' + item.ax3 + ''
															}}
														/> */}
															<Iconaw
																name="image"
																size={50}
																style={{
																	marginBottom: 15,
																	alignSelf: 'center',
																	color: '#ccc'
																}}
															/>
														</TouchableOpacity>
													)}

													{/* <Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g3}</Text> */}
												</View>
											)}

											{(item.g4 != '' || (item.ax4 != '' && item.g4 != undefined)) && (
												<View style={{ flexDirection: 'column' }}>
													<View style={{ flexDirection: 'row' }}>
														<Text>{toFarsi(' - 4')}</Text>
														{item.gsahih == '4' ? (
															<Icon name="ios-checkbox" size={30} color="#ccc" />
														) : (
															<Icon name="ios-square-outline" size={30} color="#ccc" />
														)}

														<HTML
															style={{ marginLeft: 5 }}
															html={
																'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:15;line-height:35px" >' +
																item.g4 +
																'</span>'
															}
														/>
													</View>

													{item.ax4 != '' &&
													item.ax4 != undefined && (
														<TouchableOpacity
															onPress={() => {
																this.setState((prevState) => ({
																	images: [
																		{
																			url: getHttpAdress() + 'azmoon/' + item.ax4,
																			props: {}
																		}
																	],
																	isModalVisible: true
																}));
															}}
														>
															{/* <Image
															seNativeDriver="true"
															style={{
																flex: 1,

																width: '100%',
																height: 120
															}}
															resizeMode="contain"
															source={{
																uri: getHttpAdress() + 'azmoon/' + item.ax4 + ''
															}}
														/> */}
															<Iconaw
																name="image"
																size={50}
																style={{
																	marginBottom: 15,
																	alignSelf: 'center',
																	color: '#ccc'
																}}
															/>
														</TouchableOpacity>
													)}

													{/* <Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>{item.g4}</Text> */}
												</View>
											)}
										</View>
									)}

									<View
										style={{
											width: '100%',
											justifyContent: 'space-evenly',
											flexDirection: 'row'
										}}
									>
										{(this.state.selectedItem == 1 || this.state.selectedItem == 2) && (
											<Button
												loading={false}
												labelStyle={{ color: '#2980b9', fontFamily: 'iransans' }}
												icon="pen"
												mode="outlined"
												onPress={() => {
													const { navigate } = this.props.navigation;

													navigate('eforms', {
														eformsID: item.noe_soal == '1' ? 3 : 4,
														instanseID: item.id,
														stdID: 0,
														mode: 'view',
														isAdminForms: 'true'
													});
												}}
											>
												ویرایش
											</Button>
										)}
										{(this.state.selectedItem == 1 || this.state.selectedItem == 2) && (
											<Button
												loading={this.state.delload}
												labelStyle={{ color: '#2980b9', fontFamily: 'iransans' }}
												icon="delete"
												mode="outlined"
												onPress={async () => {
													this.setState({
														delload: true
													});
													//	if (false)

													let msg1 =
														this.state.selectedItem == '1'
															? 'آیا مایل به حذف سؤال از آزمون هستید؟'
															: 'آیا مایل به حذف سؤال از بانک سوالات خود هستید؟';

													let msg = Alert.alert(
														'حذف سؤال ',
														msg1,
														[
															// {
															// 	text: 'Ask me later',
															// 	onPress: () => console.log('Ask me later pressed')
															// },
															{
																text: 'خیر',
																onPress: () => {
																	console.log('Cancel Pressed');
																	this.setState({
																		delload: false
																	});
																	return;
																},
																style: 'cancel'
															},
															{
																text: 'بله',
																onPress: async () => {
																	//this.deleteapi(item.id, index);

																	let res = await this.loadAPI_addq(
																		this.state.barom_sahih + this.state.barom_ashar,
																		this.state.pasokhgoyi,
																		'del',
																		item.idedit
																	);

																	this.setState({
																		delload: false
																	});
																	if (!res) {
																	} else {
																		this.setState({
																			barom_Visible: false
																		});

																		let i = this.getIndex(
																			item.id,
																			this.state.data,
																			'id'
																		);
																		if (i !== -1) {
																			var array = [ ...this.state.data ]; // make a separate copy of the array

																			array.splice(i, 1);
																			this.setState({ data: array });
																		}

																		setTimeout(() => {}, 200);
																	}
																}
															}
														],
														{ cancelable: false }
													);
												}}
											>
												حذف
											</Button>
										)}
										{this.start != 'start' && (
											<Button
												loading={false}
												labelStyle={{ color: '#2980b9', fontFamily: 'iransans' }}
												mode="outlined"
												//	defaultStyles={{ borderColor: 'red' }}
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
													//alert(_ashar)
													btncap = item.id_add == '' ? 'افزودن سئوال به آزمون' : 'ویرایش';
													let modal_mode = item.id_add == '' ? 'add' : 'edit';
													global.clickd_q = item.id;
													this.setState({
														unicid: item.unicid,
														idedit: item.idedit,
														barom_sahih: _sahih,
														barom_ashar: _ashar,
														butcaption: btncap,
														modal_mode: modal_mode,
														pasokhgoyi: item.pasokh,
														barom_Visible: true
													});

													if (this.state.selectedItem != 1)
														this.setState({ barom_sahih: '1' });
												}}
											>
												{this.state.selectedItem != 1 ? (
													'افزودن به آزمون'
												) : (
													toFarsi(`بارم: ` + item.barom)
												)}
												{item.pasokh != '' &&
													this.state.selectedItem == 1 &&
													toFarsi(`زمان: ` + (item.pasokh == null ? '' : item.pasokh))}
											</Button>
										)}

										{/* <TouchableOpacity
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
												//alert(_ashar)
												btncap = item.id_add == '' ? 'افزودن سئوال به آزمون' : 'ویرایش';
												let modal_mode = item.id_add == '' ? 'add' : 'edit';
												global.clickd_q = item.id;
												this.setState({
													idedit: item.idedit,
													barom_sahih: _sahih,
													barom_ashar: _ashar,
													butcaption: btncap,
													modal_mode: modal_mode,
													pasokhgoyi: item.pasokh,
													barom_Visible: true
												});
											}}
										>
											<View style={styles.roundedview}>
												<Text style={styles.roundedtext}>
													{this.state.selectedItem != 1 ? (
														'افزودن'
													) : (
														toFarsi(`بارم: ` + item.barom)
													)}
													{item.pasokh != '' &&
														this.state.selectedItem == 1 &&
														toFarsi(`زمان پاسخ: ` + item.pasokh)}
												</Text>
											</View>
										</TouchableOpacity> */}
									</View>
								</View>
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

							navigate('eforms', {
								eformsID: 3,
								instanseID: '',
								stdID: 0,
								mode: 'view',
								isAdminForms: 'true'
							});
							//navigate('qtesti', { mode: 'add' });
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
							navigate('eforms', {
								eformsID: 4,
								instanseID: '',
								stdID: 0,
								mode: 'view',
								isAdminForms: 'true'
							});
							//navigate('qtash', { mode: 'add' });
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
							<Button
								onPress={async () => {
									if (this.state.barom_sahih == '' && this.state.barom_ashar == '') {
										alert('لطفا بارم سئوال را انتخاب کنید');
										return;
									}
									if (this.state.selectedItem == 1) {
										this.setState({
											addload: true
										});
										//return;

										let res = await this.loadAPI_addq(
											this.state.barom_sahih + this.state.barom_ashar,
											this.state.pasokhgoyi,
											'edit',
											this.state.idedit
										);

										//alert();
										this.setState({
											addload: false
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
												// var msgTotal = this.state.data.reduce(function(prev, cur) {
												// 	return prev + parseFloat(cur.barom);
												// }, 0);
												// this.setState({
												// 	baromCount: msgTotal
												// });
											}, 0);
										}
									} else {
										this.setState({
											addload: true
										});
										let res = await this.loadAPI_addq(
											this.state.barom_sahih + this.state.barom_ashar,
											this.state.pasokhgoyi,
											'add',
											this.state.selectedItem == 4 ? this.state.unicid : global.clickd_q
										);
										this.setState({
											addload: false
										});
										if (res > 0) {
											// this.setState({
											// 	baromCount:
											// 		this.state.baromCount +
											// 		parseFloat(this.state.barom_sahih + this.state.barom_ashar),
											// 	soalCount: this.state.soalCount + 1
											// });

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
								loading={this.state.addload}
								style={{ marginTop: 15 }}
								labelStyle={{ fontFamily: 'iransans' }}
								//icon={this.state.selectedItem == 1 ? 'plus' : 'edit'}
								mode="outlined"
							>
								{this.state.selectedItem == 1 ? 'ویرایش' : 'افزودن'}
							</Button>

							{/* <FormButton
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
										let res = await this.loadAPI_addq(
											this.state.barom_sahih + this.state.barom_ashar,
											this.state.pasokhgoyi,
											'edit',
											this.state.idedit
										);
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
											}, 0);
										}
									} else {
										let res = await this.loadAPI_addq(
											this.state.barom_sahih + this.state.barom_ashar,
											this.state.pasokhgoyi,
											'add',
											global.clickd_q
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
							/> */}

							{false && (
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
										let res = await this.loadAPI_addq(
											this.state.barom_sahih + this.state.barom_ashar,
											this.state.pasokhgoyi,
											'del',
											this.state.idedit
										);

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
												// var msgTotal = this.state.data.reduce(function(prev, cur) {
												// 	return prev + parseFloat(cur.barom);
												// }, 0);
												// this.setState({
												// 	soalCount: this.state.data.length,
												// 	baromCount: msgTotal
												// });
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

				<Modal visible={this.state.isModalVisible} transparent={true}>
					<ImageViewer
						loadingRender={() => {
							return <ActivityIndicator size="small" color="white" />;
						}}
						onSwipeDown={() => {
							this.setState({ isModalVisible: false });
						}}
						enableSwipeDown={true}
						imageUrls={this.state.images}
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

const styles = StyleSheet.create({
	roundedview: {
		backgroundColor: defaultStyles.colors.lightblue,
		fontFamily: 'iransans',
		//borderWidth: 1,
		borderColor: '#2980b9',
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
