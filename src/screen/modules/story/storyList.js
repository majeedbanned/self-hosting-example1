import React, { Component } from 'react';
import Addgallery from '../../../screen/modules/story/addgallery';

import { StyleSheet, Linking, ActivityIndicator, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../../../config/styles';

import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/FontAwesome';
import Mstyles from '../../../components/styles';
import FormButton from '../../../component/FormButton';
//import ExamAdd from './../../../examAdd';
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

class webinar extends Component {
	constructor(props) {
		super(props);
		(this.page = 1),
			(this.state = {
				mode: 'list',
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

		this.props.navigation.addListener('willFocus', () => {
			//this.setState({ ts: Date.now() })

			this, this.loadAPI();
		});
	}

	async componentDidMount() {
		//**^^this.loadAPI(this.page, 'pull');

		this.setState({
			cat: [
				{
					id: 1,

					name: 'لیست گالری ها'
				},
				{
					id: 2,

					name: 'گالری جدید'
				}
			]
		});

		//	this.loadAPI();
	}

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
		let uurl = global.adress + '/pApi.asmx/delStoryID?p=' + param + '&id=' + id;
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
		let uurl = global.adress + '/pApi.asmx/getStory?p=' + param;
		//console.log(uurl);
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
					data: retJson,

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

		//console.log(item);

		//Alert.alert('Message', 'Item clicked. ' + item.username);
	};
	async onRefresh() {
		this.loadAPI();
		// this.setState({ isRefreshing: true });
		// let param = userInfo();
		// let uurl = global.adress + '/pApi.asmx/getExamList?currentPage=' + '1' + '&p=' + param;
		// //og(uurl);
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
	loadAPI1 = async (page, type) => {
		setTimeout(() => {
			this.setState({
				dataLoading: false,
				data: [
					{
						id: 26668,
						name: 'ورود اطلاعات اولیه',
						mohlat: '1399/04/15',
						mohlat: 'کلاس اول و کلاس پنجم',

						FirstName: 'محمد حسین ',
						LastName: 'سمیعی '
					},
					{
						id: 26669,
						name: 'فرم اطلاعات شغلی والدین',
						mohlat: '1399/04/15',
						tozihat: 'کلاس اول و کلاس پنجم',

						FirstName: 'محمد حسین ',
						LastName: 'سمیعی '
					},
					{
						id: 26670,
						name: 'ورود اطلاعات اولیه',
						mohlat: '1399/04/15',
						tozihat: 'کلاس اول و کلاس پنجم',

						FirstName: 'محمد حسین ',
						LastName: 'سمیعی '
					}
				]
			});
		}, 500);
	};
	onPressHandler(id) {
		//this.setState({ selectedItem: id, data: [], dataLoading: true });
		//this.loadAPI1();
		id == 1
			? this.setState({ mode: 'list', data: [], selectedItem: 1, dataLoading: true })
			: this.setState({ mode: 'add', selectedItem: 2 });
		if (id == 1) {
			this.loadAPI();
		}
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
									//	console.log(item.id);
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
			</View>
		);
	};

	// shouldComponentUpdate() {
	// 	return false;
	// }

	refreshback() {
		alert();
	}
	render() {
		//alert(this.state.data.length);

		if (false) {
			//alert('dfd');
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
										//console.log(item.id);
										global.storyEditId = item.id;

										const { navigate } = this.props.navigation;
										//global.eformsID = item.id;
										if (item.id == 2) navigate('addgallery', { mode: 'add' });
										else this.onPressHandler(item.id);
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
				</View>

				{this.state.data && (
					<FlatList
						removeClippedSubviews={true}
						//ListHeaderComponent={this.renderHeader}
						//	stickyHeaderIndices={[ 0 ]}
						ListFooterComponent={this._renderFooter}
						onScroll={this.onScroll}
						keyExtractor={(item) => item.id}
						initialNumToRender={10}
						//onEndReachedThreshold={0.4}
						//onEndReached={this._handleLoadMore.bind(this)}
						refreshControl={
							<RefreshControl
								refreshing={this.state.isRefreshing}
								onRefresh={this.onRefresh.bind(this)}
							/>
						}
						style={Mstyles.contentList}
						columnWrapperStyle={styles.listContainer}
						data={this.state.data}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									onPress={() => {
										//	const { navigate } = this.props.navigation;
										//global.eformsID = item.id;
										//navigate('eforms', { eformsID: item.id, mode: 'add' });
										//this.setState({ mode: 'add', selectedItem: 2 });

										const { navigate } = this.props.navigation;
										//global.eformsID = item.id;
										navigate('addgallery', {
											storyID: item.id,
											mode: 'edit',
											onGoBack: () => {
												alert('hi');
											}
										});
									}}
									activeOpacity={0.8}
									style={{
										height: 83,
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
														<View style={{ justifyContent: 'center', flex: 0.5 }}>
															<Image
																style={styles.imageavatar}
																source={{
																	uri: getHttpAdress() + 'media/' + item.mainImage
																}}
															/>
														</View>
														<View
															style={{
																borderWidth: 0,
																justifyContent: 'center',
																flex: 2
															}}
														>
															<Text style={styles.aztitle}>{item.title}</Text>
														</View>

														{/* {global.ttype == 'administrator' ||
														(item.access.indexOf(global.username) > -1 && ( */}
														<TouchableOpacity
															onPress={() => {
																Alert.alert(
																	'حذف گالری',
																	'آیا مایل به حدف گالری هستید؟',
																	[
																		// {
																		// 	text: 'Ask me later',
																		// 	onPress: () => console.log('Ask me later pressed')
																		// },
																		{
																			text: 'خیر',
																			onPress: () =>
																				console.log('Cancel Pressed'),
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
															style={{
																alignItems: 'center',
																justifyContent: 'center',
																flex: 0.5
															}}
														>
															<Icon
																size={44}
																name="trash-o"
																style={styles.actionButtonIcon}
															/>

															<Text
																style={[
																	defaultStyles.lbl14,
																	{ fontSize: 14, color: 'white' }
																]}
															>
																حذف
															</Text>
														</TouchableOpacity>
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
				)}
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
		height: 100,
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
		marginStart: 15,
		fontSize: 18,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'flex-start',
		fontFamily: 'iransans',
		textAlign: 'left',
		//width: '100%',
		fontSize: 13,
		borderWidth: 1,
		padding: 1,
		borderColor: 'white',
		borderRadius: 5,
		color: 'white'
	},
	actionButtonIcon: {
		fontSize: 25,
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
		width: 50,
		height: 50,
		marginStart: 15,

		borderRadius: 50,
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
