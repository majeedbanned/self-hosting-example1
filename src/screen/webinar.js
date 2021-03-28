import React, { Component } from 'react';
import { StyleSheet, Linking, Dimensions, Alert } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Iconan from 'react-native-vector-icons/AntDesign';
import { Snackbar } from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import Timetable from './timetable';

import Mstyles from '../components/styles';
import Modalm from 'react-native-modal';
import defaultStyles from '../config/styles';
import FormButton from '../component/FormButton';
import ExamAdd from './examAdd';

import { Ionicons } from '@expo/vector-icons';
import SelectUser from './selectUser';
import NetInfo from '@react-native-community/netinfo';
import Modal, {
	ModalTitle,
	ModalContent,
	ModalFooter,
	ModalButton,
	SlideAnimation,
	ScaleAnimation
} from 'react-native-modals';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import {
	FlatList,
	ScrollView,
	Image,
	View,
	Text,
	ActivityIndicator,
	RefreshControl,
	TouchableOpacity
} from 'react-native';
import GLOBAL from './global';
import Loading from '../components/loading';

import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';

class webinar extends Component {
	constructor(props) {
		super(props);
		(this.page = 1),
			(this.onEndReachedCalledDuringMomentum = true),
			(this.state = {
				searchText: '',
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
				selectedItem: '-1'
			});
	}

	deleteapi = async (id, index) => {
		//alert(id);

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
		let uurl = global.adress + '/pApi.asmx/delVclassID?p=' + param + '&id=' + id;
		console.log(uurl);
		try {
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
				//console.log(retJson);
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					//data: retJson,

					loading: false,
					dataLoading: false,
					isRefreshing: false
				});
				let newimagesAddFile = this.state.data;
				//alert(index);
				newimagesAddFile.splice(index, 1); //to remove a single item starting at index
				this.setState({ data: newimagesAddFile });
				//this.loadAPI();
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

	async componentDidMount() {
		this.loadAPI(this.page, 'pull');

		this.setState({
			data1: [
				{
					mandevisi: 'True',
					mandeh: '۱۳ روز و ۱ ساعت و ۵۴ دقیقه دیگر ',
					active: 'False',
					id: 26668,
					name: ' ریاضی دو',
					azdate: '1399/04/15',

					aztime: '01:14',
					url: '',
					duration: 60,
					tozihat: 'کلاس اول و کلاس پنجم',
					mahd_id: 95100040,
					useer: '44',

					FirstName: 'محمد حسین ',
					LastName: 'سمیعی '
				},
				{
					mandevisi: 'True',
					mandeh: '۱۰ روز و ۱ ساعت و ۵۴ دقیقه دیگر ',
					active: 'False',
					id: 26668,
					name: ' فیزیک دو',
					azdate: '1399/04/15',

					aztime: '01:14',
					url: '',
					duration: 60,
					tozihat: 'کلاس اول و کلاس پنجم',
					mahd_id: 95100040,
					useer: '39',

					FirstName: ' حسین ',
					LastName: 'دلاور '
				}
			]
		});

		this.setState({
			cat: [
				{
					id: '-1',

					name: 'کلاس های  امروز'
				},
				{
					id: '1',

					name: 'شنبه'
				},
				{
					id: '2',

					name: 'یک شنبه'
				},
				{
					id: '3',

					name: 'دو شنبه'
				},
				{
					id: '4',

					name: 'سه شنبه'
				},
				{
					id: '5',

					name: 'چهار شنبه'
				},
				{
					id: '6',

					name: 'پنج شنبه'
				},
				{
					id: '0',

					name: 'جمعه'
				}

				// },
				// {
				// 	id: '10',

				// 	name: 'برنامه هفتگی مجازی'
				// }
			]
		});
	}
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

		this.setState({ loading: true, isLoading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getVclassList?currentPage=' +
			page +
			'&p=' +
			param +
			'&mode=' +
			this.state.selectedItem +
			'&q=' +
			this.state.searchText;
		if (page == 1) this.setState({ data: [] });
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false,
						isRefreshing: false,
						isLoading: false
					});
					return;
				}
				//	if(retJson.)
				this.setState({
					data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],

					loading: false,
					isRefreshing: false,
					isLoading: false
				});
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				isRefreshing: false,
				isLoading: false
			});
			return;
		}
	};
	_renderFooter = () => {
		if (!this.state.isLoading) return null;
		return <ActivityIndicator style={{ color: 'red' }} size="large" />;
	};
	_handleLoadMore = () => {
		if (!this.onEndReachedCalledDuringMomentum) {
			if (!this.state.isLoading) {
				this.page = this.page + 1;
				this.loadAPI(this.page, 'more');
			}
			this.onEndReachedCalledDuringMomentum = true;
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
		this.loadAPI(1, '');
		//alert();
		return;
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
	};

	onPressHandler(id) {
		this.page = 1;
		this.setState({ selectedItem: id, data: [], dataLoading: true });

		this.loadAPI(1, '');
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
								onPress={() => {
									console.log(item.id);
									this.onPressHandler(item.id);
								}}
							>
								<View
									style={
										this.state.selectedItem === item.id ? (
											{
												backgroundColor: '#ff8184',
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: '#ff8184',
												borderRadius: 10,
												margin: 3,

												paddingTop: 4,
												paddingRight: 8,
												paddingLeft: 8,
												paddingBottom: 3
											}
										) : (
											{
												backgroundColor: 'white',
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: '#ff8184',
												borderRadius: 10,
												margin: 3,

												paddingTop: 4,
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
													color: '#ff8184',

													fontFamily: 'iransans'
												}
											)
										}
									>
										{item.name}
									</Text>
									{this.state.selectedItem !== item.value ||
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
						height: 30,
						marginBottom: 5,
						padding: 0,
						borderBottomWidth: 0,
						backgroundColor: 'white',
						borderTopRightRadius: 24,
						borderTopLeftRadius: 24
					}}
					placeholder="جستجو"
					lightTheme
					showLoading={this.state.loading}
					//round
					inputContainerStyle={{ borderRadius: 10, height: 15, backgroundColor: '#eee' }}
					inputStyle={{ textAlign: 'center', fontSize: 13, fontFamily: 'iransans' }}
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

		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;
		//console.log('seeeeee');
		//alert(this.state.selectedItem);

		//if (this.state.isLoading && this.page === 1) {
		if (!this.state.data) {
			return (
				<View
					style={{
						width: '100%',
						height: '100%'
					}}
				>
					<Loading />
				</View>
			);
		}

		return (
			<View style={Mstyles.container}>
				<View>
					{/* <FlatList
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
													backgroundColor: '#ff8184',
													fontFamily: 'iransans',
													borderWidth: 1,
													borderColor: '#ff8184',
													borderRadius: 10,
													margin: 3,

													paddingTop: 4,
													paddingRight: 8,
													paddingLeft: 8,
													paddingBottom: 3
												}
											) : (
												{
													backgroundColor: 'white',
													fontFamily: 'iransans',
													borderWidth: 1,
													borderColor: '#ff8184',
													borderRadius: 10,
													margin: 3,

													paddingTop: 4,
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
														color: '#ff8184',

														fontFamily: 'iransans'
													}
												)
											}
										>
											{item.name}
										</Text>
										{this.state.selectedItem !== item.value ||
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
							height: 30,
							marginBottom: 5,
							padding: 0,
							borderBottomWidth: 0,
							backgroundColor: 'white',
							borderTopRightRadius: 24,
							borderTopLeftRadius: 24
						}}
						placeholder="جستجو"
						lightTheme
						showLoading={this.state.loading}
						//round
						inputContainerStyle={{ borderRadius: 10, height: 15, backgroundColor: '#eee' }}
						inputStyle={{ textAlign: 'center', fontSize: 13, fontFamily: 'iransans' }}
						//showLoading={this.state.loading}
						onChangeText={(text) => this.searchFilterFunction(text)}
						autoCorrect={false}
						value={this.state.searchText}
					/> */}
				</View>
				{/* {this.state.selectedItem === '3' && (
					//	alert();
					<Timetable />
				)} */}

				{true && (
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
						onMomentumScrollBegin={() => {
							this.onEndReachedCalledDuringMomentum = false;
						}}
						// ListEmptyComponent={
						// 	<View style={{ borderWidth: 0, height: 350 }}>
						// 		<View
						// 			style={{
						// 				borderWidth: 0,

						// 				justifyContent: 'center',
						// 				flex: 1,
						// 				flexDirection: 'column',
						// 				alignItems: 'center'
						// 			}}
						// 		>
						// 			{!this.state.dataLoading && (
						// 				<Text style={[ defaultStyles.lbl14, { color: '#ff8184' } ]}>
						// 					{' '}
						// 					لیست خالی است
						// 				</Text>
						// 			)}
						// 		</View>
						// 	</View>
						// }
						contentContainerStyle={{ flexGrow: 1 }}
						ListEmptyComponent={() => (
							<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
								{!this.state.dataLoading && (
									<Text style={[ defaultStyles.lbl14, { color: '#ff8184' } ]}> لیست خالی است</Text>
								)}
							</View>
						)}
						onEndReached={this._handleLoadMore.bind(this)}
						refreshControl={
							<RefreshControl
								refreshing={this.state.isRefreshing}
								onRefresh={this.onRefresh.bind(this)}
							/>
						}
						style={Mstyles.contentList}
						columnWrapperStyle={styles.listContainer}
						data={this.state.data}
						keyExtractor={(item, index) => index.toString()}
						// keyExtractor={(item) => {
						// 	return item.id;
						// }}
						renderItem={({ item, index }) => {
							return (
								<View
									style={{
										height: 260,
										borderRadius: 13,
										margin: 15
									}}
								>
									<View style={styles.mainpanel}>
										<LinearGradient
											colors={[ '#ff5f9a', '#ff8184', '#ffab68' ]}
											start={{ x: 0, y: 1 }}
											end={{ x: 1, y: 0 }}
											style={styles.gradient}
										>
											<View
												style={{
													borderWidth: 0,
													flex: 1,
													flexDirection: 'row',
													marginStart: 0
												}}
											>
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
														<View style={{ justifyContent: 'center', flex: 1 }}>
															<Image
																style={styles.image}
																source={{
																	uri:
																		getHttpAdress() +
																		'child/' +
																		item.teacherscode +
																		'.jpg'
																}}
															/>
														</View>
														<View style={{ justifyContent: 'center', flex: 2 }}>
															{global.ttype == 'administrator' && (
																<View
																	style={{
																		flexDirection: 'row-reverse',
																		borderWidth: 0,
																		marginTop: -15
																	}}
																>
																	<TouchableOpacity
																		onPress={() => {
																			Alert.alert(
																				'حذف کلاس مجازی',
																				'آیا مایل به حدف کلاس هستید؟',
																				[
																					// {
																					// 	text: 'Ask me later',
																					// 	onPress: () => console.log('Ask me later pressed')
																					// },
																					{
																						text: 'خیر',
																						onPress: () =>
																							console.log(
																								'Cancel Pressed'
																							),
																						style: 'cancel'
																					},
																					{
																						text: 'بله',
																						onPress: () => {
																							this.deleteapi(
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
																		<Ionicons
																			name="ios-trash"
																			size={25}
																			color="#fff"
																			style={{ marginLeft: 25, marginRight: 15 }}
																		/>
																	</TouchableOpacity>
																	<TouchableOpacity
																		onPress={() => {
																			global.messageEditID = item.id;
																			//alert(global.examEditID);
																			// this.setState({
																			// 	bottomModalAndTitle: true
																			// });
																			const { navigate } = this.props.navigation;
																			navigate('eforms', {
																				eformsID: 30,
																				instanseID: item.id,
																				stdID: 0,
																				mode: 'view',
																				isAdminForms: 'true'
																				//extra: this.state.extra
																			});

																			//
																			//navigate('messageAdd');
																		}}
																	>
																		<Ionicons
																			name="ios-create"
																			size={22}
																			color="#fff"
																			style={{ marginLeft: 20 }}
																		/>
																	</TouchableOpacity>
																</View>
															)}

															<Text style={styles.aztitle}>{item.name}</Text>
															{item.teachersName ? (
																<Text numberOfLines={1} style={styles.aztitlet}>
																	{item.teachersName}
																</Text>
															) : null}
														</View>
													</View>
													<View style={{ borderWidth: 0, marginStart: 0, flex: 1 }}>
														<View style={styles.textpart}>
															<View style={styles.textpart}>
																{this.state.selectedItem == '-1' && (
																	<Text style={styles.rtlText}>
																		{toFarsi(item.azdate)}
																	</Text>
																)}
															</View>
															<View style={styles.textpart}>
																<Text style={styles.rtlText}>
																	{toFarsi(
																		`ساعت: ` + item.aztime.replace('-', ' تا ')
																	)}
																</Text>
															</View>
														</View>
														<View style={styles.textpart}>
															<View style={styles.textpart}>
																{item.scoid && (
																	<Text style={styles.rtlText}>Adobe Connect</Text>
																)}
																{!item.scoid && (
																	<Text style={styles.rtlText}>BigBlueButton</Text>
																)}
															</View>
															<View style={styles.textpart}>
																<Text style={styles.rtlText}>
																	{toFarsi(item.duration + `‍‍‍‍‍ دقیقه `)}
																</Text>
															</View>
														</View>
														<View
															style={styles.textpart}
															style={{ flexDirection: 'column', flex: 1 }}
														>
															<View style={styles.textpart}>
																{/* {item.vclass && (
																<Text style={styles.rtlText}>Adobe Connect</Text>
															)} */}
															</View>
														</View>

														{item.mandevisi == 'True' ? (
															<View style={styles.textpart}>
																<Text
																	style={styles.rtlText}
																	style={{
																		//backgroundColor: 'orange',
																		color: '#000',
																		padding: 3,
																		fontFamily: 'iransans',
																		borderRadius: 10,
																		color: 'yellow',
																		borderColor: 'white',
																		borderWidth: 1,
																		marginTop: 3,
																		position: 'absolute'
																	}}
																>
																	{item.mandeh}
																</Text>
															</View>
														) : null}
													</View>
												</View>
											</View>
										</LinearGradient>
									</View>
									<View style={styles.buttompanel}>
										<View style={{ justifyContent: 'space-around', flexDirection: 'row', flex: 1 }}>
											{item.scoid != null ? (
												<View style={styles.textpart} style={{ paddingTop: 20 }}>
													<FormButton
														buttonColor="#ff8184"
														borderColor="white"
														fontSizeb={14}
														heightb={40}
														borderRadiusb={10}
														style={{ paddingTop: 0 }}
														backgroundColor="#e3f1fc"
														buttonType="outline"
														//onPress={handleSubmit}
														//disabled={!isValid }
														loading={this.state.isSubmitting}
														title="آرشیو"
														onPress={() => {
															const { navigate } = this.props.navigation;

															navigate('RecordList', {
																webinarID: item.id
															});
															// this.setState({
															// 	record_list: true
															// });
														}}
													/>
												</View>
											) : null}

											{(global.ttype == 'administrator' || global.ttype == 'teacher') && (
												<View style={styles.textpart} style={{ paddingTop: 20 }}>
													<FormButton
														onPress={() => {
															global.examEditID = item.id;
															//alert(global.examEditID);
															this.setState({
																bottomModalAndTitle: true
															});
														}}
														buttonColor="#ff8184"
														borderColor="white"
														fontSizeb={14}
														heightb={40}
														borderRadiusb={10}
														style={{ marginTop: 0 }}
														backgroundColor="#e3f1fc"
														buttonType="outline"
														//onPress={handleSubmit}
														//disabled={!isValid }
														loading={this.state.isSubmitting}
														title="گزارشات "
														onPress={() => {
															const { navigate } = this.props.navigation;

															navigate('webinarparticipateList', {
																webinarID: item.id
															});
															// this.setState({
															// 	record_list: true
															// });
														}}
													/>
												</View>
											)}
											{false && (
												<View style={styles.textpart} style={{ paddingTop: 20 }}>
													<FormButton
														onPress={() => {
															global.examEditID = item.id;
															//alert(global.examEditID);
															this.setState({
																bottomModalAndTitle: true
															});
														}}
														buttonColor="#ff8184"
														borderColor="white"
														fontSizeb={14}
														heightb={40}
														borderRadiusb={10}
														style={{ marginTop: 0 }}
														backgroundColor="#e3f1fc"
														buttonType="outline"
														//onPress={handleSubmit}
														//disabled={!isValid }
														loading={this.state.isSubmitting}
														title="ویرایش "
														onPress={() => {
															const { navigate } = this.props.navigation;
															navigate('eforms', {
																eformsID: 30,
																instanseID: item.id,
																stdID: 0,
																mode: 'view',
																isAdminForms: 'true'
																//extra: this.state.extra
															});
															// this.setState({
															// 	record_list: true
															// });
														}}
													/>
												</View>
											)}

											{false && (
												<View style={styles.textpart} style={{ paddingTop: 20 }}>
													<FormButton
														onPress={() => {
															global.examEditID = item.id;
															//alert(global.examEditID);
															this.setState({
																bottomModalAndTitle: true
															});
														}}
														buttonColor="#ff8184"
														borderColor="white"
														fontSizeb={14}
														heightb={40}
														borderRadiusb={10}
														style={{ marginTop: 0 }}
														backgroundColor="#e3f1fc"
														buttonType="outline"
														//onPress={handleSubmit}
														//disabled={!isValid }
														loading={this.state.isSubmitting}
														title="حذف"
														onPress={() => {
															const { navigate } = this.props.navigation;
															navigate('eforms', {
																eformsID: 30,
																instanseID: item.id,
																stdID: 0,
																mode: 'view',
																isAdminForms: 'true'
																//extra: this.state.extra
															});
															// this.setState({
															// 	record_list: true
															// });
														}}
													/>
												</View>
											)}

											{item.active == 'True' && (
												<View style={styles.textpart} style={{ paddingTop: 20 }}>
													<FormButton
														onPress={() => {
															//alert();
															//console.log(item.url);
															//return;
															console.log(global.adress.replace('papi', '') + item.url);
															if (item.scoid == null) {
																//const message = decodeURIComponent(item.url);

																Linking.openURL(
																	global.adress.replace('papi', '') + item.url
																);
															} else if (item.scoid != null) {
																//adobe
																//alert();
																const message = encodeURIComponent(item.url);
																//	Linking.openURL(item.url);
																Linking.openURL(
																	global.adress.replace('papi', '') + item.url
																);

																// if (global.ttype == 'student')
																// 	Linking.openURL(
																// 		item.adobeadress +
																// 			'/' +
																// 			item.vclass +
																// 			'/?guestName=' +
																// 			global.firstname.replace('ی', 'ي') +
																// 			' ' +
																// 			global.lastname.replace('ی', 'ي')
																// 	);
																// else if (
																// 	global.ttype == 'teacher' ||
																// 	global.ttype == 'administrator'
																// )
																// 	Linking.openURL(
																// 		item.adobeadress + '/' + item.vclass + '/'
																// 	);
															}
														}}
														buttonColor="#ff8184"
														borderColor="white"
														fontSizeb={14}
														heightb={40}
														borderRadiusb={10}
														style={{ marginTop: 0 }}
														backgroundColor="#e3f1fc"
														buttonType="outline"
														//onPress={handleSubmit}
														//disabled={!isValid }
														loading={this.state.isSubmitting}
														title="ورود به کلاس  "
													/>
												</View>
											)}
										</View>
									</View>
								</View>
							);
						}}
					/>
				)}

				{global.ttype == 'administrator' ? (
					<ActionButton position="left" buttonColor="rgba(231,76,60,1)">
						<ActionButton.Item
							buttonColor="#9b59b6"
							title="تعریف کلاس مجازی"
							onPress={() => {
								global.examEditID = '';
								const { navigate } = this.props.navigation;
								navigate('eforms', {
									eformsID: 30,
									instanseID: 0,
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true'
									//extra: this.state.extra
								});
							}}
						>
							<Iconan name="edit" style={styles.actionButtonIcon} />
						</ActionButton.Item>

						{/* <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPres‍s={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}
					</ActionButton>
				) : null}

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
							record_list: false
						})}
					onSwipeComplete={() =>
						this.setState({
							record_list: false
						})}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					isVisible={this.state.record_list}
				>
					<View style={{ flex: 1 }}>
						<Text>salam</Text>
						{/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
					</View>
				</Modalm>

				<Snackbar
					visible={this.state.issnack}
					onDismiss={() => this.setState({ issnack: false })}
					style={{ backgroundColor: '#ffcc00', fontFamily: 'iransans' }}
					wrapperStyle={{ fontFamily: 'iransans' }}
					action={{
						label: 'بستن',
						onPress: () => {
							this.setState({ issnack: false });
						}
					}}
				>
					{this.state.msg}
				</Snackbar>
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
		top: 0,
		zIndex: 1,
		elevation: 2,
		height: 200,
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
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'center',
		fontSize: 16,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'center',
		fontSize: 12,
		borderWidth: 0.3,
		padding: 1,
		marginRight: 10,
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
		width: 70,
		height: 70,
		alignSelf: 'center',
		borderRadius: 55,
		borderWidth: 1,
		borderColor: '#ebf0f7',
		backgroundColor: 'white'

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
export default withNavigation(webinar);
