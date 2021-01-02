import React, { Component } from 'react';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../config/styles';
import Loading from '../components/loading';
//import FastImage from 'react-native-fast-image';
import { withNavigationFocus, NavigationEvents, getActiveChildNavigationOptions } from 'react-navigation';
//import SwiperFlatList from 'react-native-swiper-flatlist';
import * as Font from 'expo-font';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import Modalm from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import SelectContact from '../screen/selectContact';
import { I18nManager, Platform, Button, Linking, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import GLOBAL from './global';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	FlatList,
	Dimensions,
	Alert,
	ScrollView,
	RefreshControl
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import DropdownAlert from 'react-native-dropdownalert';
import { SearchBar } from 'react-native-elements';

import MessageAdd from '../screen/messageAdd';
import axios from 'axios';
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);
import Modal from 'react-native-modal';
import SelectUser from '../screen/selectUser';
//import { fromBinary } from 'uuid-js';
let hasScrolled = false;
class messages extends Component {
	constructor(props) {
		super(props);
		this.page = 1;
		this.state = {
			refreshing: false,
			isModalVisible: false,
			value: '',
			loading: false,
			isRefreshing: false, //for pull to refresh
			modalVisible: false,
			userSelected: [],
			data: [],
			stories: [],
			//cat: [],
			isModalpiker_message_Visible: false,
			selectedItem: '0'
		};
		this.arrayholder = [];
		let arch = '';
	}

	componentDidUpdate() {
		//console.log('update');
	}

	async componentDidMount() {
		await Font.loadAsync({
			iransans: require('./../../assets/IRANSansMobile.ttf')
		});
		this.arch = '';
		this.loadAPI(1, 'pull');
		this.loadAPI_grp(1, 'pull');
		// this.setState({
		// 	cat: [
		// 		{
		// 			id: 1,

		// 			name: 'آزمایشگاه'
		// 		},
		// 		{
		// 			id: 2,

		// 			name: 'آب بازی'
		// 		},
		// 		{
		// 			id: 3,

		// 			name: 'انتخابات دانش آموزی'
		// 		},
		// 		{
		// 			id: 4,

		// 			name: 'امتحانات'
		// 		},
		// 		{
		// 			id: 5,

		// 			name: 'کلاس آنلاین'
		// 		},
		// 		{
		// 			id: 6,

		// 			name: 'معلمین'
		// 		},
		// 		{
		// 			id: 7,

		// 			name: 'زمین بازی'
		// 		}
		// 	]
		// });
	}

	async onRefresh() {
		//alert();
		this.setState({ isRefreshing: true });

		this.loadAPI_grp(this.page, 'pull');
		this.loadAPI(1, 'pull');

		// let param = userInfo();
		// let uurl =
		// 	global.adress +
		// 	'/pApi.asmx/getMessageList?currentPage=' +
		// 	'1' +
		// 	'&p=' +
		// 	param +
		// 	'&g=' +
		// 	this.state.selectedItem;
		// console.log(uurl);
		// try {
		// 	const response = await fetch(uurl);
		// 	if (response.ok) {
		// 		let retJson = await response.json();
		// 		if (Object.keys(retJson).length == 0) {
		// 			this.setState({
		// 				isRefreshing: false
		// 			});
		// 			return;
		// 		}

		// 		let data = retJson;
		// 		this.setState({
		// 			data: data,
		// 			isRefreshing: false
		// 		});
		// 		this.page = 1;
		// 	}
		// } catch (e) {
		// 	this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
		// 	this.setState({
		// 		isRefreshing: false
		// 	});
		// 	return;
		// }
	}

	_handleLoadMore = () => {
		if (!this.state.isLoading) {
			this.page = this.page + 1;
			this.loadAPI(this.page, 'more');
		}
	};

	updateState = (id, value) => {
		//console.log(id_soal + ' ' + value);

		const elementsIndex = this.state.cat.findIndex((element) => element.value == id);
		let newArray = [ ...this.state.cat ];
		newArray[elementsIndex] = { ...newArray[elementsIndex], badge: value };
		this.setState({
			cat: newArray
		});
	};

	loadAPI = async (page, type) => {
		//	this.loadAPI_grp(this.page, 'pull');

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
		let uurl =
			global.adress +
			'/pApi.asmx/getMessageList?currentPage=' +
			page +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem;
		if (page == 1) this.setState({ data: [] });

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

				this.setState({
					data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],

					loading: false,
					dataLoading: false,
					isRefreshing: false
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
	deleteapi = async (id, index) => {
		//alert(id);

		if (global.adress == 'undefined') {
			GLOBAL.main.setState({ isModalVisible: true });
		}
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			alert('لطفا دسترسی به اینترنت را چک کنید');
			return;
		}

		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/delMessageID?p=' + param + '&id=' + id;
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
	loadAPI_grp = async (page, type) => {
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
		let uurl =
			global.adress +
			'/pApi.asmx/getMessageCat?id=' +
			page +
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
						loading: false
					});
					return;
				}
				this.setState({
					cat: retJson,

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
	onPressHandler(id) {
		this.updateState(id, '0');
		this.setState({ selectedItem: id, data: [], dataLoading: true });
		this.loadAPI(1);
	}
	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white' }}>
				<FlatList
					persistentScrollbar={false}
					showsHorizontalScrollIndicator={false}
					extraData={this.state.selectedItem}
					data={this.state.cat}
					keyExtractor={(item) => item.value.toString()}
					// keyExtractor={(item) => {
					// 	return item.id;
					// }}
					//key={item.id}
					horizontal
					style={{ paddingBottom: 4, borderWidth: 0, marginTop: 4, marginRight: 4, marginLeft: 4 }}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									//	console.log(item.id);
									this.onPressHandler(item.value);
								}}
							>
								<View
									style={
										this.state.selectedItem === item.value ? (
											{
												backgroundColor: '#48bdfe',
												fontFamily: 'iransans',
												borderWidth: 1,
												flexDirection: 'row',
												borderColor: '#48bdfe',
												borderRadius: 15,
												margin: 3,
												paddingTop: 8,
												paddingRight: 8,
												paddingLeft: 8
											}
										) : (
											{
												flexDirection: 'row',
												//backgroundColor: '#48bdfe',
												fontFamily: 'iransans',
												borderWidth: 1,

												borderColor: '#48bdfe',
												borderRadius: 15,
												margin: 3,
												paddingTop: 8,
												paddingRight: 8,
												paddingLeft: 8
											}
										)
									}
								>
									{item.badge != '0' && <Text style={styles.badge}>{toFarsi(item.badge)}</Text>}

									<Text
										style={
											this.state.selectedItem === item.value ? (
												{
													color: 'white',
													fontFamily: 'iransans'
												}
											) : (
												{
													color: '#48bdfe',
													fontFamily: 'iransans'
												}
											)
										}
									>
										{item.label}
									</Text>
									{this.state.selectedItem !== item.value ||
										(this.state.dataLoading && <ActivityIndicator />)}
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		);
	};

	_renderFooter = () => {
		if (!this.state.isLoading) return null;
		return <ActivityIndicator style={{ color: 'red' }} size="large" />;
	};
	handleselect = () => {
		// const { navigate } = this.props.navigation;
		// console.log('SelectContact');
		// navigate('SelectContact');
		this.setState({
			isModalpiker_message_Visible: true
		});
	};
	handleDownload = (data) => {
		if (data.split('.')[data.split('.').length - 1].toLowerCase() == 'jpg') {
			//const { navigate } = this.props.navigation;
			//navigate('Login');
		}
		if (data.split('.')[data.split('.').length - 1].toLowerCase() == 'pdf') {
			Linking.openURL(data);
			//getHttpAdress() + 'media/' +
		}
	};
	// toggleModal = () => {
	// 	this.setState({ isModalVisible: !this.state.isModalVisible });
	// 	this.onRefresh();
	// };

	render() {
		GLOBAL.message = this;
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;
		//if (!this.state.cat) return null;
		//if (this.state.isLoading && this.page === 1) {
		if (!this.state.cat) {
			return (
				//

				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView
						contentContainerStyle={{ flex: 1 }}
						refreshControl={<RefreshControl onRefresh={this.onRefresh.bind(this)} />}
					>
						{/* <Text>Pull down to see RefreshControl indicator</Text> */}
						<Loading />
					</ScrollView>
				</SafeAreaView>

				// <View
				// 	style={{
				// 		width: '100%',
				// 		height: '100%'
				// 	}}
				// >
				// 	<ActivityIndicator style={{ color: '#000' }} />
				// </View>
			);
		}

		return (
			<View style={styles.container}>
				{/* <Stories Items={this.state.stories} Navigation={this.props.navigation} /> */}
				<FlatList
					ListFooterComponent={this._renderFooter}
					removeClippedSubviews={false}
					//onScroll={this.onScroll}
					initialNumToRender={10}
					onEndReachedThreshold={0.4}
					onEndReached={this._handleLoadMore.bind(this)}
					refreshControl={
						<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					}
					contentContainerStyle={{ flexGrow: 1 }}
					ListEmptyComponent={() => (
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							{!this.state.dataLoading && <Text style={defaultStyles.lbl14}> پیامی وجود ندارد </Text>}
						</View>
					)}
					// ListEmptyComponent={
					// 	<View style={{ borderWidth: 0, height: 350 }}>
					// 		<View

					// 				justifyContent: 'center',
					// 				flex: 1,
					// 				flexDirection: 'column',
					// 				alignItems: 'center'
					// 			}}
					// 		>
					// 			{!this.state.dataLoading && <Text style={defaultStyles.lbl14}> لیست خالی است</Text>}
					// 		</View>
					// 	</View>
					// }
					style={styles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[ 0 ]}
					// keyExtractor={(item) => {
					// 	return item.RowNumber;
					// }}

					keyExtractor={(item) => item.RowNumber.toString()}
					//keyExtractor={(item) => item.toString()}
					renderItem={({ item, index }) => {
						return (
							<View style={styles.card}>
								<View style={{ flexDirection: 'row', height: 40, margin: 10 }}>
									<Image
										style={styles.imageavatar}
										source={{ uri: getHttpAdress() + 'child/' + item.sender_ID + '.jpg' }}
									/>

									<View style={{ flexDirection: 'column', alignSelf: 'center', flex: 2 }}>
										<Text
											style={{
												paddingTop: 15,
												fontFamily: 'iransans',
												textAlign: 'left',
												alignSelf: 'stretch',
												padding: 8
											}}
										>
											{item.senderName}
										</Text>
										<Text
											style={{
												alignSelf: 'flex-start',
												fontSize: 11,
												marginTop: -10,
												color: '#aaa',
												fontFamily: 'iransans',
												paddingStart: 8,
												paddingTop: 5
											}}
										>
											{toFarsi(item.date + ' - ' + item.time)}
										</Text>
									</View>

									{item.sender_ID == global.username &&
									global.ttype != 'student' && (
										<View style={{ flexDirection: 'row' }}>
											<TouchableOpacity
												onPress={() => {
													Alert.alert(
														'حذف پیام',
														'آیا مایل به حدف پیام هستید؟',
														[
															// {
															// 	text: 'Ask me later',
															// 	onPress: () => console.log('Ask me later pressed')
															// },
															{
																text: 'خیر',
																onPress: () => console.log('Cancel Pressed'),
																style: 'cancel'
															},
															{
																text: 'بله',
																onPress: () => {
																	this.deleteapi(item.id, index);
																}
															}
														],
														{ cancelable: false }
													);
												}}
											>
												<Ionicons
													name="ios-trash"
													size={22}
													color="#bbb"
													style={{ marginLeft: 10 }}
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
													navigate('messageAdd');
												}}
											>
												<Ionicons
													name="ios-create"
													size={22}
													color="#bbb"
													style={{ marginLeft: 10 }}
												/>
											</TouchableOpacity>
										</View>
									)}

									{/* <Menu>
										<MenuTrigger>
											<Ionicons name="md-more" size={29} style={styles.setting} />

											<Text style={{ fontSize: 40, fontWeight: 'bold' }}>⋮</Text>
										</MenuTrigger>
										<MenuOptions>
											<MenuOption onSelect={() => alert(`Save`)} text="Save" />
											<MenuOption onSelect={() => alert(`Delete`)}>
												<Text style={{ color: 'red' }}>Delete</Text>
											</MenuOption>
											<MenuOption
												onSelect={() => alert(`Not called`)}
												disabled={true}
												text="Disabled"
											/>
										</MenuOptions>
									</Menu> */}
								</View>
								<View style={{ flex: 1 }}>
									{item.imgs != '' && (
										<Swiper
											onIndexChanged={(index) => {
												//console.log(item.imgs.split('|')[index]);
											}}
											paginationStyle={{
												flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse'
											}}
											loop={false}
											style={styles.wrapper}
											showsButtons={false}
										>
											{item.imgs.split('|').map((data) => {
												//alert(data);
												if (data != '') {
													let ext = data.split('.')[data.split('.').length - 1].toLowerCase();
													if (ext == 'jpg')
														return (
															<View key={data} style={styles.slide1}>
																<Image
																	resizeMode="contain"
																	style={{
																		width: '100%',
																		height: '100%',
																		borderWidth: 0
																	}}
																	source={{ uri: data }}
																/>

																{/* <FastImage
																	style={{
																		width: '100%',
																		height: '100%',
																		borderWidth: 0
																	}}
																	source={{
																		uri: data,
																		headers: { Authorization: 'someAuthToken' },
																		priority: FastImage.priority.normal
																	}}
																	resizeMode={FastImage.resizeMode.contain}
																/> */}
															</View>
														);
													else if (ext == 'mp4') {
														return (
															<View key={data} style={styles.slide1}>
																<Video
																	source={{
																		uri:
																			'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
																	}}
																	rate={1.0}
																	volume={1.0}
																	isMuted={false}
																	resizeMode="contain"
																	isLooping
																	style={{
																		width: '100%',
																		height: '100%',
																		borderWidth: 0
																	}}
																/>
															</View>
														);
													} else
														return (
															<View key={data} style={styles.slide1}>
																<Text style={styles.text}>{data}</Text>
															</View>
														);
												}
											})}
										</Swiper>
									)}

									<View style={styles.cardContent}>
										<View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
											{false && (
												<TouchableOpacity
													onPress={() => {
														global.forwardID = item.id;
														this.setState({
															isModalpiker_message_Visible: true
														});
													}}
												>
													<Entypo name="forward" size={27} style={styles.forward} />
												</TouchableOpacity>
											)}

											<TouchableOpacity
												onPress={() => {
													//global.replyID = item.sender_ID;
													//global.replyID_lastname = item.senderName;
													//global.replyID_title = item.title;

													const { navigate } = this.props.navigation;
													navigate('messageAdd', {
														replyID: item.sender_ID,
														replyID_lastname: item.senderName,
														replyID_title: item.title
													});
												}}
											>
												<AntDesign name="message1" size={25} style={styles.message} />
											</TouchableOpacity>

											<Ionicons size={27} style={styles.space} />

											{/* <Ionicons name="md-attach" size={33} style={styles.attach} /> */}

											{item.files != '' && (
												<View style={{ flexDirection: 'row' }}>
													{item.files.split('|').map((data) => {
														let ext = data
															.split('.')
															[data.split('.').length - 1].toLowerCase();

														if (ext == 'jpg')
															return (
																<TouchableOpacity
																	onPress={() => {
																		this.handleDownload(data);
																	}}
																>
																	<Ionicons
																		name="ios-image"
																		size={32}
																		color="#bbb"
																		style={{ marginLeft: 10 }}
																	/>
																</TouchableOpacity>
															);
														else if (ext == 'pdf')
															//return null;
															<TouchableOpacity
																onPress={() => {
																	this.handleDownload(data);
																}}
															>
																<AntDesign
																	style={{ marginLeft: 10 }}
																	name="pdffile1"
																	size={30}
																	color="#bbb"
																/>
															</TouchableOpacity>;
														else if (ext == 'xls' || ext == 'xlsx')
															return (
																<TouchableOpacity
																	onPress={() => {
																		this.handleDownload(data);
																	}}
																>
																	<AntDesign
																		style={{ marginLeft: 10 }}
																		name="exclefile1"
																		size={30}
																		color="#bbb"
																	/>
																</TouchableOpacity>
															);
														else if (ext != '')
															return (
																<TouchableOpacity
																	onPress={() => {
																		this.handleDownload(data);
																	}}
																>
																	<Ionicons
																		name="md-attach"
																		size={35}
																		style={{ marginLeft: 10 }}
																		color="#bbb"
																	/>
																</TouchableOpacity>
															);
													})}
												</View>
											)}
										</View>
										<Text style={styles.name}>{item.title}</Text>
									</View>
								</View>
							</View>
						);
					}}
				/>

				{global.ttype == 'administrator' ? (
					<ActionButton position="left" buttonColor="#03a5fc">
						<ActionButton.Item
							buttonColor="#58bef5"
							textStyle={{ fontFamily: 'iransans' }}
							title="ارسال پیام"
							onPress={() => {
								const { navigate } = this.props.navigation;
								navigate('messageAdd', { mode: 'add' });
							}}
						>
							<Icon name="ios-mail" style={styles.actionButtonIcon} />
						</ActionButton.Item>
					</ActionButton>
				) : null}

				{global.ttype == 'student' || global.ttype == 'teacher' ? (
					<ActionButton position="left" buttonColor="rgba(231,76,60,1)">
						<ActionButton.Item
							buttonColor="#9b59b6"
							style={{ fontFamily: 'iransans' }}
							title="ارسال پیام"
							onPress={() => {
								global.messageEditID = '';
								const { navigate } = this.props.navigation;
								navigate('messageAdd');
							}}
						>
							<Icon name="md-create" style={styles.actionButtonIcon} />
						</ActionButton.Item>

						<Icon name="md-notifications-off" style={styles.actionButtonIcon} />
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
						{/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
						<SelectContact style={{}} />
					</View>
				</Modalm>
			</View>
		);
	}
}
export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	heart: {
		flex: 1,
		color: '#aaa',
		alignSelf: 'center',
		paddingTop: 0
	},
	badge: {
		color: '#fff',
		position: 'absolute',
		zIndex: 10,
		top: -4,
		width: 20,
		height: 20,
		left: -7,
		textAlign: 'center',
		padding: 1,
		overflow: 'hidden',
		backgroundColor: '#eb5757',
		borderRadius: 10,
		borderWidth: 0,
		borderColor: '#000',
		fontFamily: 'iransans'
	},
	setting: {
		flex: 1,
		color: '#aaa',
		alignSelf: 'center',
		paddingTop: 9,
		marginEnd: 10
	},

	attach: {
		flex: 1,
		marginEnd: 13,
		color: '#aaa',
		alignSelf: 'center',
		paddingTop: 0
	},
	space: {
		flex: 5,
		paddingEnd: 10,
		color: '#aaa',

		alignSelf: 'flex-end'
	},
	message: {
		flex: 1,
		marginStart: 13,
		color: '#aaa',
		alignSelf: 'center',
		paddingStart: 10
	},
	forward: {
		flex: 1,
		marginEnd: 13,
		color: '#aaa',
		paddingStart: 15
	},

	container: {
		flex: 1,
		borderWidth: 0,

		marginTop: 0,
		backgroundColor: global.backgroundColor
	},
	contentList: {
		flex: 1
	},
	cardContent: {
		marginRight: 20,
		marginTop: 10,
		alignItems: 'flex-start'
	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 45,
		borderWidth: 2,
		borderColor: '#ebf0f7'
	},
	imageavatar: {
		width: 40,
		height: 40,
		borderRadius: 45,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	imageavatar1: {
		width: 40,
		height: 40,
		alignSelf: 'center',
		borderRadius: 45,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	card: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'stretch',
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		shadowOpacity: 0.6,
		shadowRadius: 3,
		elevation: 1,
		marginTop: 5,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 10,
		backgroundColor: 'white',
		padding: 0,

		borderRadius: 20
	},

	name: {
		fontSize: 14,
		flex: 1,
		fontFamily: 'iransans',
		textAlign: 'left',
		alignSelf: 'stretch',
		paddingEnd: 10,
		paddingStart: 10,
		color: '#48bdfe'
	},
	count: {
		fontSize: 14,
		flex: 1,
		alignSelf: 'center',
		color: '#6666ff'
	},
	followButton: {
		marginTop: 10,
		height: 35,
		width: 100,
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 30,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: '#dcdcdc'
	},
	followButtonText: {
		color: 'red',
		fontSize: 12
	},
	wrapper: {
		borderRadius: 0,
		marginTop: 10,
		flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse',
		height: 394,
		paddingBottom: 40
	},
	slide1: {
		borderRadius: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
		marginBottom: 10
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'white'
	},
	slide2: {
		borderRadius: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#97CAE5',
		marginBottom: 10
	},
	slide3: {
		borderRadius: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#92BBD9',
		marginBottom: 10
	},
	text: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold'
	}
});
export default withNavigationFocus(messages);
