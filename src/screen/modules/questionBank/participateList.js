import React, { Component, PureComponent } from 'react';
import { StyleSheet, Linking, ActivityIndicator, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../../../config/styles';
import { SearchBar } from 'react-native-elements';
import { Avatar, Badge } from 'react-native-elements';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { Snackbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/EvilIcons';
import Mstyles from '../../../components/styles';
import FormButton from '../../../component/FormButton';
import ExamAdd from './../../examAdd';
// import { AntDesign, Entypo } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
import Icon1 from 'react-native-vector-icons/Ionicons';
import { Ionicons, AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';

import SelectUser from './../../selectUser';
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
import GLOBAL from './../../global';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';

const CustomProgressBar = ({ visible }) => (
	<Modal onRequestClose={() => null} visible={true}>
		<View style={{ flex: 1, backgroundColor: '#dcdcdc', alignItems: 'center', justifyContent: 'center' }}>
			<View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
				<Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
				<ActivityIndicator size="large" />
			</View>
		</View>
	</Modal>
);
const optionsStyles = {
	optionsContainer: {
		///backgroundColor: 'green',
		padding: 5,
		margin: 25,
		borderRadius: 10
	},
	optionsWrapper: {
		//backgroundColor: 'purple'
	},
	optionWrapper: {
		//backgroundColor: 'yellow',
		margin: 5,
		padding: 5
	},
	optionTouchable: {
		//underlayColor: 'gold',
		activeOpacity: 70
	},
	optionText: {
		color: 'brown',
		fontFamily: 'iransans',
		textAlign: 'left'
	}
};

const optionStyles = {
	optionTouchable: {
		underlayColor: 'red',
		activeOpacity: 40
	},
	optionWrapper: {
		backgroundColor: 'pink',
		margin: 5
	},
	optionText: {
		color: 'black'
	}
};
class PureChild extends React.PureComponent {
	render() {
		const item = this.props.Item;
		const selectedItem = this.props.selectedItem;

		// const row = this.props.row1;
		// const value = this.props.value1;
		// const hozor = this.props.hozor;
		// const courseCode = this.props.identity;
		//	alert(id);
		//if (!value) return null;
		return (
			<View
				// onPress={() => {
				// 	const { navigate } = this.props.navigation;
				// 	global.eformsID = item.id;
				// 	navigate('eforms', { eformsID: item.id, mode: 'add' });
				// }}
				// activeOpacity={0.8}
				key={item.RowNumber}
				style={{
					height: 200,
					borderRadius: 13,
					margin: 15
				}}
			>
				<View style={styles.mainpanel}>
					<LinearGradient
						colors={
							selectedItem == 1 ? (
								[ '#36D1DC', '#5B86E5' ]
							) : selectedItem == 2 ? (
								[ '#9dbffd', '#c4ecfb' ]
							) : (
								[ '#a6d3f2', '#6ca1cb' ]
							)
						}
						start={{ x: 0, y: 1 }}
						end={{ x: 1, y: 0 }}
						style={styles.gradient}
					>
						<View style={{ borderWidth: 0, flex: 1, flexDirection: 'row', marginStart: 0 }}>
							<View
								style={{
									flexDirection: 'column',
									borderWidth: 0,
									marginStart: 0,
									flex: 3
								}}
							>
								<View
									style={{
										flexDirection: 'row',
										borderWidth: 0,
										marginStart: 0,
										flex: 1
									}}
								>
									<View
										style={{
											alignItems: 'center',
											justifyContent: 'space-evenly',
											flex: 0.5
										}}
									>
										<Image
											style={styles.imageavatar}
											source={{
												uri: getHttpAdress() + 'child/' + item.member + '.jpg'
											}}
										/>

										{selectedItem == 1 && (
											<View>
												<Text
													style={{
														color: 'white',
														fontSize: 12,
														//marginTop: 12,
														fontFamily: 'iransans'
													}}
												>
													نمره کل:
												</Text>

												<View
													style={{
														marginTop: 5,
														paddingTop: 4,
														//paddingRight: 4,
														//paddingLeft: 4,
														height: 45,
														width: 45,
														borderWidth: 1,
														alignItems: 'center',
														justifyContent: 'center',
														borderRadius: 10,
														borderColor: '#ccc'
														//backgroundColor: 'white'
													}}
												>
													<Text
														style={{
															paddingTop: 7,
															height: '100%',
															//marginTop: 8,
															fontSize: 19,

															fontFamily: 'iransansbold',
															color: 'white'
														}}
													>
														{toFarsi(item.nomre_kol)}
													</Text>
												</View>
											</View>
										)}
									</View>
									<View style={{ borderWidth: 0, justifyContent: 'center', flex: 2 }}>
										<View style={{ flexDirection: 'row' }}>
											<View style={{ flex: 4 }}>
												<Text style={styles.aztitle}>
													{item.FirstName + ' ' + item.LastName}
												</Text>
												{/* <Text
													style={[
														styles.aztitle,
														{
															fontSize: 13
														}
													]}
												>
													{item.starttime == null ? (
														'وارد آزمون نشده'
													) : item.endtime == null ? (
														'در حال آزمون...'
													) : (
														'آزمون ذخیره شده'
													)}
												</Text> */}
											</View>
											<View style={{ flex: 1 }}>
												<Menu>
													<MenuTrigger>
														<Ionicons
															name="ios-menu"
															size={32}
															color="#fff"
															style={{ marginLeft: 10 }}
														/>

														{/* <Text style={{ fontSize: 40, fontWeight: 'bold' }}>⋮</Text> */}
													</MenuTrigger>
													<MenuOptions customStyles={optionsStyles}>
														{selectedItem == 1 && (
															<MenuOption
																customStyles={this.optionStyles}
																onSelect={() => {
																	const { navigate } = this.props.navigation;
																	//global.eformsID = item.id;
																	navigate('Exam', {
																		examID: global.examID,
																		std: item.StudentCode,
																		mode: 'tashih',
																		name: item.FirstName + ' ' + item.LastName
																	});
																}}
																text="مشاهده و تصحیح"
															/>
														)}
														{(selectedItem == 1 || selectedItem == 2) && (
															<MenuOption
																customStyles={this.optionStyles}
																onSelect={() => {
																	Alert.alert(
																		'حذف پیام',
																		'آیا مایل به حذف آزمون و امکان آزمون مجدد  هستید؟',
																		[
																			{
																				text: 'خیر',
																				onPress: () =>
																					console.log('Cancel Pressed'),
																				style: 'cancel'
																			},
																			{
																				text: 'بله',
																				onPress: this.props.ondel
																				// onPress: () => {
																				// 	this.props.ondel;
																				// 	// this.loadAPI(
																				// 	// 	item.StudentCode,
																				// 	// 	'',
																				// 	// 	index
																				// 	// );
																				// }
																			}
																		],
																		{ cancelable: false }
																	);
																}}
																text="امکان آزمون مجدد"
															/>
														)}
														{/* <MenuOption
															onSelect={() => alert(`Not called`)}
															disabled={true}
															text="Disabled"
														/> */}
													</MenuOptions>
												</Menu>
											</View>
										</View>
										{(selectedItem == 1 || selectedItem == 2) && (
											<View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between'
													}}
												>
													<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
														{' ساعت ورود:: ' + toFarsi(item.starttime)}
													</Text>

													<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
														{' گزینه صحیح: ' + toFarsi(item.tedad_gozine_sahih)}
													</Text>
												</View>
												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between'
													}}
												>
													<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
														{' ساعت پایان: ' + toFarsi(item.endtime)}
													</Text>

													<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
														{' گزینه غلط: ' + toFarsi(item.gozine_ghlat)}
													</Text>
												</View>

												<View
													style={{
														flexDirection: 'row',
														justifyContent: 'space-between'
													}}
												>
													<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
														{'  آی پی: ' + toFarsi(item.ipp)}
													</Text>

													<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
														{' گزینه خالی: ' + toFarsi(item.gozine_khali)}
													</Text>
												</View>
											</View>
										)}
										<View
											style={{
												flexDirection: 'row',
												justifyContent: 'space-between'
											}}
										>
											<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
												{'  کد کاربر : ' + toFarsi(item.StudentCode.toString())}
											</Text>

											{selectedItem == 1 && (
												<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
													{'  نمره تشریحی: ' + toFarsi(item.nomre_tashrihi)}
												</Text>
											)}
										</View>

										<View style={{ flexDirection: 'row', display: 'none' }}>
											<TouchableOpacity
												onPress={() => {
													const { navigate } = this.props.navigation;
													//global.eformsID = item.id;
													navigate('Exam', {
														examID: global.examID,
														studentcode: item.studentcode,
														mode: 'tashih'
													});
												}}
												style={{
													alignItems: 'center',
													justifyContent: 'center',
													flex: 0.5
												}}
											>
												<Icon name="pencil" size={44} color="white" style={styles.image} />
												{/* <AntDesign
													style={styles.image}
													name="profile"
													size={34}
													color="white"
												/> */}
												<Text style={[ defaultStyles.lbl14, { fontSize: 14, color: 'white' } ]}>
													مشاهده و تصحیح
												</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => {
													Alert.alert(
														'حذف پیام',
														'آیا مایل به حذف آزمون و امکان آزمون مجدد  هستید؟',
														[
															{
																text: 'خیر',
																onPress: () => console.log('Cancel Pressed'),
																style: 'cancel'
															},
															{
																text: 'بله',
																onPress: () => console.log('OK Pressed')
															}
														],
														{ cancelable: false }
													);
												}}
												style={{
													alignItems: 'center',
													justifyContent: 'center',
													flex: 0.5
												}}
											>
												<Icon name="undo" size={44} color="white" style={styles.image} />
												<Text style={[ defaultStyles.lbl14, { fontSize: 14, color: 'white' } ]}>
													امکان آزمون مجدد
												</Text>
											</TouchableOpacity>
										</View>
									</View>

									{/* {global.ttype == 'administrator' ||
										(item.access.indexOf(global.username) > -1 && ( */}

									{/* ))} */}
								</View>
							</View>
						</View>
					</LinearGradient>
				</View>
			</View>
		);
	}
}
class participateList extends Component {
	constructor(props) {
		super(props);
		(this.page = 1),
			(this.examID = 0),
			(this.state = {
				loading: false,
				isProgress: false,
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
				dataLoading: false,
				searchText: '',

				filteredData: []
			});
		this.arrayholder = [];

		this.props.navigation.addListener('willFocus', async () => {
			//alert();
			const { navigation } = this.props;

			this.examID = navigation.getParam('examID');
			//this.examMode = navigation.getParam('mode');
			this.setState({
				cat: [
					{
						id: 1,

						name: 'ذخیره کرده',
						badge: 0
					},
					{
						id: 2,

						name: 'در حال آزمون',
						badge: 0
					},
					{
						id: 3,

						name: 'وارد نشده',
						badge: 0
					}
				]
			});
			this.setState({ selectedItem: 1, data: [], dataLoading: true });
			await this.loadAPI(1, '');
			this.loadAPIBadge(1, '');
		});
	}

	static navigationOptions66 = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerTitle: ' ',
			headerRight: () => (
				<TouchableOpacity
					onPress={() => {
						Alert.alert(
							' خروجی اکسل',
							'آیا مایل به خروجی اکسل  هستید؟',
							[
								{
									text: 'خیر',
									onPress: () => console.log('Cancel Pressed'),
									style: 'cancel'
								},
								{
									text: 'بله',
									onPress: () => {
										this.loadAPI(1, '');
									}
								}
							],
							{ cancelable: false }
						);
					}}
				>
					<FontAwesome name="file-excel-o" size={25} color="#000" style={{ marginRight: 10 }} />
				</TouchableOpacity>
			),

			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransansbold'
			}
		};
	};
	static navigationOptions = ({ navigation, screenProps }) => ({
		headerRight: navigation.state.params ? navigation.state.params.headerRight : null,
		headerTitle: navigation.state.params ? navigation.state.params.headerTitle : null
	});

	async componentDidMount() {
		this.props.navigation.setParams({
			headerTitle: '',
			headerRight: (
				<TouchableOpacity
					onPress={() => {
						Alert.alert(
							' خروجی اکسل',
							'آیا مایل به خروجی اکسل  هستید؟',
							[
								{
									text: 'خیر',
									onPress: () => console.log('Cancel Pressed'),
									style: 'cancel'
								},
								{
									text: 'بله',
									onPress: () => {
										this.loadAPIXls(1, '');
									}
								}
							],
							{ cancelable: false }
						);
					}}
				>
					<FontAwesome name="file-excel-o" size={25} color="#000" style={{ marginRight: 10 }} />
				</TouchableOpacity>
			)
		});

		//**^^this.loadAPI(this.page, 'pull');

		const { navigation } = this.props;
		// this.examID = navigation.getParam('examID');
		// //this.examMode = navigation.getParam('mode');
		// this.setState({
		// 	cat: [
		// 		{
		// 			id: 1,

		// 			name: 'ذخیره کرده',
		// 			badge: 0
		// 		},
		// 		{
		// 			id: 2,

		// 			name: 'در حال آزمون',
		// 			badge: 0
		// 		},
		// 		{
		// 			id: 3,

		// 			name: 'وارد نشده',
		// 			badge: 0
		// 		}
		// 	]
		// });
		// this.setState({ selectedItem: 1, data: [], dataLoading: true });
		// await this.loadAPI(this.page, '');
		// this.loadAPIBadge(1, '');
	}
	loadAPIdel = async (stdid, type, index) => {
		const examid = this.props.examid;

		//	alert(type);
		if (type == undefined) type = '';
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
		let uurl =
			global.adress +
			'/pApi.asmx/getExamStdListReexam?currentPage=' +
			'1' +
			'&p=' +
			param +
			'&examid=' +
			this.examID +
			'&stdid=' +
			stdid;
		console.log('' + uurl);
		//	return;
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				//if (page == 1) this.setState({ data: [] });

				console.log(retJson);
				if (retJson.result == 'ok') {
					//	alert(retJson.msg);
					//this.props.unmountMe(stdid);
				}
				//console.log(retJson);
				//	alert(index);
				let newimagesAddFile = this.state.data;

				newimagesAddFile.splice(index, 1); //to remove a single item starting at index
				this.setState({ data: newimagesAddFile });

				this.setState(
					{
						// data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
						// dataLoading: false,
						// loading: false
					}
				);
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState(
				{
					// loading: false,
					// dataLoading: false
				}
			);
			return;
		}
	};

	loadAPIXls = async (page, type) => {
		//	alert(type);
		if (type == undefined) type = '';
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

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getExamStdListXls?currentPage=' +
			page +
			'&p=' +
			param +
			'&examid=' +
			this.examID +
			'&q=' +
			type +
			'&mode=' +
			this.state.selectedItem;
		console.log(uurl);
		fetch(uurl) //+ this.arch
			.then((response) => response.json())
			.then((responseText) => {
				//alert(responseText.length);
				this.setState({ loading: false });

				if (responseText.path) {
					Alert.alert(
						'خروجی اکسل',
						'آیا مایل به مشاهده هستید؟',
						[
							{
								text: 'خیر',
								//onPress: () => console.log('Cancel Pressed'),
								style: 'cancel'
							},
							{
								text: 'بله',
								onPress: () => {
									//alert(global.adress + '/upload/xls/' + responseText.path);
									Linking.openURL(global.adress + '/upload/xls/' + responseText.path);
								}
							}
						],
						{ cancelable: false }
					);
					// this.setState({
					// 	fakeContact: this.page === 1 ? responseText : [ ...this.state.fakeContact, ...responseText ],

					// 	loading: false
					// });
				} else {
					this.setState({
						fakeContact: [],
						loading: false
					});
				}
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log('1Error fetching the feed: ', err);
			});
	};

	loadAPI = async (page, type) => {
		//	alert(type);
		if (type == undefined) type = '';
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

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getExamStdList?currentPage=' +
			page +
			'&p=' +
			param +
			'&examid=' +
			this.examID +
			'&q=' +
			type +
			'&mode=' +
			this.state.selectedItem;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (page == 1) this.setState({ data: [] });
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						dataLoading: false
					});
					return;
				}
				//console.log(retJson);

				this.setState({
					data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					dataLoading: false,
					loading: false
				});
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				dataLoading: false
			});
			return;
		}
	};

	loadAPIBadge = async (page, type) => {
		//	alert(type);
		if (type == undefined) type = '';
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
		let uurl =
			global.adress +
			'/pApi.asmx/getExamStdListBadge?currentPage=' +
			page +
			'&p=' +
			param +
			'&examid=' +
			this.examID +
			'&q=' +
			type +
			'&mode=' +
			this.state.selectedItem;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();

				if (Object.keys(retJson).length == 0) {
					this.setState(
						{
							//loading: false,
							//dataLoading: false
						}
					);
					return;
				}
				//console.log(retJson);

				this.setState({
					cat: retJson
					///dataLoading: false,
					//loading: false
				});
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				dataLoading: false
			});
			return;
		}
	};

	_renderFooter = () => {
		if (!this.state.isLoading) return null;
		return <ActivityIndicator style={{ color: 'red' }} size="large" />;
	};
	_handleLoadMore = () => {
		if (!this.state.isLoading) {
			this.page = this.page + 1;
			this.loadAPI(this.page, this.state.searchText);
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
	loadAPI1 = async (page, type) => {
		setTimeout(() => {
			this.setState({
				dataLoading: false,
				data: [
					{
						studentcode: '44',
						name: 'محسن حمیدی',
						starttime: '22:30',
						endtime: '22:59',
						gozine_ghlat: '3',
						gozine_khali: '1',
						tedad_gozine_sahih: '23',
						nomre_tashrihi: '3',
						nomre_kol: '17.67',
						ipp: ' 12.23.34.54 '
					},
					{
						id: 43,
						name: 'ورود اطلاعات اولیه',
						mohlat: '1399/04/15',
						tozihat: 'کلاس اول و کلاس پنجم',

						FirstName: 'محمد حسین ',
						LastName: 'سمیعی ',
						nomre_kol: '17'
					},
					{
						id: 26670,
						nomre_kol: '7',
						name: 'ورود اطلاعات اولیه',
						mohlat: '1399/04/15',
						tozihat: 'کلاس اول و کلاس پنجم',

						FirstName: 'محمد حسین ',
						LastName: 'سمیعی '
					}
				]
			});
		}, 0);
		setTimeout(() => {
			this.arrayholder = this.state.data;
		}, 300);
	};
	searchFilterFunctionp = (searchText) => {
		this.setState({ searchText: searchText });

		let filteredData = this.state.data.filter(function(item) {
			return item.name.includes(searchText);
		});

		this.setState({ data: filteredData });
	};

	handeldel = async (index, stdcode) => {
		await this.loadAPIdel(stdcode, '', index);
		//alert(index);
	};
	searchFilterFunction = (text) => {
		//alert();
		this.setState({ searchText: text });
		if (text == '' || text == undefined) {
			this.page = 1;
			this.loadAPI(1, '');
			//this.flatListRef.scrollToOffset({ animated: true, offset: 0 });
		}
		if (text.length < 2) return;
		this.page = 1;
		this.loadAPI(1, text);
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

	onPressHandler(id) {
		this.setState({ selectedItem: id, data: [], dataLoading: true });
		this.loadAPI(1, '');
		this.loadAPIBadge(1, '');
	}
	handleChildUnmount(id) {
		//alert(id);
		//let idsx = id;
		//this.loadAPI(1, '');
		//this.setState({});
		//return;
		// this.setState({
		// 	data: this.state.data.filter(function(item) {
		// 		return item.StudentCode !== idsx;
		// 	})
		// });
	}

	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white' }}>
				<FlatList
					extraData={this.state.selectedItem}
					data={this.state.cat}
					keyExtractor={(item) => item.id.toString()}
					horizontal
					style={{
						flexDirection: 'column-reverse',
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
									{item.id == 1 &&
									item.badge != 0 && (
										<Badge
											textStyle={{ fontFamily: 'iransans' }}
											value={toFarsi(item.badge)}
											status="success"
										/>
									)}
									{item.id == 2 &&
									item.badge != 0 && (
										<Badge
											textStyle={{ fontFamily: 'iransans' }}
											value={toFarsi(item.badge)}
											status="warning"
										/>
									)}
									{item.id == 3 &&
									item.badge != 0 && (
										<Badge
											textStyle={{ fontFamily: 'iransans' }}
											value={toFarsi(item.badge)}
											status="error"
										/>
									)}

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

				<SearchBar
					inputContainerStyle={{ backgroundColor: '#eee' }}
					containerStyle={{
						flex: 2,
						marginStart: 8,
						marginEnd: 8,
						//height: 25,
						borderBottomWidth: 0,
						backgroundColor: 'white',
						borderTopRightRadius: 24,
						borderTopLeftRadius: 24
					}}
					placeholder="جستجو"
					inputContainerStyle={{ height: 15, backgroundColor: '#eee' }}
					lightTheme
					showLoading={this.state.loading}
					round
					inputStyle={{ textAlign: 'center', fontSize: 14, fontFamily: 'iransans' }}
					//showLoading={this.state.loading}
					onChangeText={(text) => this.searchFilterFunction(text)}
					autoCorrect={false}
					value={this.state.searchText}
				/>
			</View>
		);
	};
	render() {
		let test = [
			{ name: ' شرکت کنندگان', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'افزودن سئوال', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'ویرایش', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'تست آزمون', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: ' غایبین', code: 'white', icon: 'md-people', bkcolor: '#34ace0' },
			{ name: 'حذف', code: 'white', icon: 'ios-trash', bkcolor: '#f79383' }
		];

		GLOBAL.vclass = this;
		if (this.state.isLoading && this.page === 1) {
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
				{false && (
					<Modal onRequestClose={this.closeModal} visible={this.state.isProgress}>
						<View
							style={{
								flex: 1,
								backgroundColor: '#dcdcdc',
								alignItems: 'center',
								justifyContent: 'center'
							}}
						>
							<View style={{ borderRadius: 10, backgroundColor: 'white', padding: 25 }}>
								<Text style={{ fontSize: 20, fontWeight: '200' }}>Loading</Text>
								<ActivityIndicator size="large" />
							</View>
						</View>
					</Modal>
				)}
				<FlatList
					ref={(ref) => {
						this.flatListRef = ref;
					}}
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[ 0 ]}
					ListFooterComponent={this._renderFooter}
					onScroll={this.onScroll}
					initialNumToRender={10}
					keyExtractor={(item) => item.RowNumber.toString()}
					onEndReachedThreshold={0.4}
					onEndReached={this._handleLoadMore.bind(this)}
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
								!this.state.dataLoading && <Text style={defaultStyles.lbl14}> لیست خالی است</Text>}

								{this.state.selectedItem == 1 &&
								!this.state.dataLoading && <Text style={defaultStyles.lbl14}>لیست خالی است</Text>}
							</View>
						</View>
					}
					// refreshControl={
					// 	<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					// }
					style={Mstyles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					// data={
					// 	this.state.filteredData && this.state.filteredData.length > 0 ? (
					// 		this.state.filteredData
					// 	) : (
					// 		this.state.data
					// 	)
					// }
					// keyExtractor={(item) => {
					// 	return item.id;
					// }}
					renderItem={({ item, index }) => {
						return (
							<PureChild
								ondel={() => this.handeldel(index, item.StudentCode)}
								navigation={this.props.navigation}
								unmountMe={this.handleChildUnmount}
								examid={this.examID}
								Item={item}
								selectedItem={this.state.selectedItem}
							/>
						);
					}}
				/>

				{/* <Snackbar
					visible={this.state.snackVisible}
					onDismiss={() => this.setState({ visible: false })}
					action={{
						label: 'Undo',
						onPress: () => {
							// Do something
						}
					}}
				>
					Hey there! I'm a Snackbar.
				</Snackbar> */}

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
		paddingRight: 15,
		top: 0,
		zIndex: 1,
		elevation: 2,
		height: 210,
		flexDirection: 'column'
	},
	mainpanel: {
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
		fontSize: 18,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'flex-start',
		fontFamily: 'iransans',
		textAlign: 'left',
		//width: '100%',
		fontSize: 13,
		borderWidth: 0,
		padding: 1,
		borderColor: 'white',
		borderRadius: 5,
		color: 'white'
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
		width: 45,
		height: 45,
		paddingEnd: 10,
		borderRadius: 45,
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
export default withNavigation(participateList);
