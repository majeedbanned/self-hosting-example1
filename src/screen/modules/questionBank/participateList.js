import React, { Component } from 'react';
import { StyleSheet, Linking, ActivityIndicator, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../../../config/styles';
import { SearchBar } from 'react-native-elements';

import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/EvilIcons';
import Mstyles from '../../../components/styles';
import FormButton from '../../../component/FormButton';
import ExamAdd from './../../examAdd';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
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

class participateList extends Component {
	constructor(props) {
		super(props);
		(this.page = 1),
			(this.state = {
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
	}

	async componentDidMount() {
		//**^^this.loadAPI(this.page, 'pull');

		this.setState({
			cat: [
				{
					id: 1,

					name: 'ثبت شده'
				},
				{
					id: 2,

					name: 'در حال آزمون'
				},
				{
					id: 3,

					name: 'غایبین'
				}
			]
		});
		this.setState({ selectedItem: 1, data: [], dataLoading: true });
		await this.loadAPI1(this.page, 'pull');
	}
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
		let uurl = global.adress + '/pApi.asmx/getExamList?currentPage=' + page + '&p=' + param;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false
					});
					return;
				}
				console.log(retJson);
				this.setState({
					data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],

					loading: false
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

	searchFilterFunction = (text) => {
		this.setState({ searchText: text });
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
		this.loadAPI1();
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

				<SearchBar
					containerStyle={{
						flex: 2,
						marginStart: 8,
						marginEnd: 8,

						borderBottomWidth: 0,
						backgroundColor: 'white',
						borderTopRightRadius: 24,
						borderTopLeftRadius: 24
					}}
					placeholder="جستجو"
					lightTheme
					round
					//clearIcon
					inputStyle={{ textAlign: 'center', fontFamily: 'iransans' }}
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
				<FlatList
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[ 0 ]}
					ListFooterComponent={this._renderFooter}
					onScroll={this.onScroll}
					initialNumToRender={10}
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
								!this.state.dataLoading && (
									<Text style={defaultStyles.lbl14}> کسی در این آزمون شرکت نکرده است</Text>
								)}
							</View>
						</View>
					}
					refreshControl={
						<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					}
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
					keyExtractor={(item) => {
						return item.id;
					}}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									const { navigate } = this.props.navigation;
									global.eformsID = item.id;
									navigate('eforms', { eformsID: item.id, mode: 'add' });
								}}
								activeOpacity={0.8}
								style={{
									height: 200,
									borderRadius: 13,
									margin: 15
								}}
							>
								<View style={styles.mainpanel}>
									<LinearGradient
										colors={[ '#36D1DC', '#5B86E5' ]}
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
																uri:
																	getHttpAdress() +
																	'child/' +
																	item.studentcode +
																	'.jpg'
															}}
														/>
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
													<View style={{ borderWidth: 0, justifyContent: 'center', flex: 2 }}>
														<Text style={styles.aztitle}>{item.name}</Text>
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

														<View
															style={{
																flexDirection: 'row',
																justifyContent: 'space-between'
															}}
														>
															<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
																{'  کد کاربر : ' + toFarsi(item.studentcode)}
															</Text>

															<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
																{'  نمره تشریحی: ' + toFarsi(item.nomre_tashrihi)}
															</Text>
														</View>

														<View style={{ flexDirection: 'row' }}>
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
																<Icon
																	name="pencil"
																	size={44}
																	color="white"
																	style={styles.image}
																/>
																{/* <AntDesign
																	style={styles.image}
																	name="profile"
																	size={34}
																	color="white"
																/> */}
																<Text
																	style={[
																		defaultStyles.lbl14,
																		{ fontSize: 14, color: 'white' }
																	]}
																>
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
																				onPress: () =>
																					console.log('Cancel Pressed'),
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
																<Icon
																	name="undo"
																	size={44}
																	color="white"
																	style={styles.image}
																/>
																<Text
																	style={[
																		defaultStyles.lbl14,
																		{ fontSize: 14, color: 'white' }
																	]}
																>
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
							</TouchableOpacity>
						);
					}}
				/>
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
		zIndex: 1,

		elevation: 2,
		shadowColor: '#ccc',
		shadowOffset: {
			width: 3,
			height: 3
		},
		shadowOpacity: 0.67,
		shadowRadius: 3.49
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
