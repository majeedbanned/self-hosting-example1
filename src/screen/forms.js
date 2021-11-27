import React, { Component } from 'react';
import { StyleSheet, Linking, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../config/styles';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Snackbar } from 'react-native-paper';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import Loading from '../components/loading';
// import DropdownAlert from 'react-native-dropdownalert';
import { withNavigation } from 'react-navigation';
// import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';
//import IconAnt from 'react-native-vector-icons/Ionicons';

import i18n from 'i18n-js';
import Mstyles from '../components/styles';
// import FormButton from '../component/FormButton';
// import ExamAdd from './examAdd';
// import { AntDesign, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// import SelectUser from './selectUser';
import NetInfo from '@react-native-community/netinfo';
// import Modal, {
// 	ModalTitle,
// 	ModalContent,
// 	ModalFooter,
// 	ModalButton,
// 	SlideAnimation,
// 	ScaleAnimation
// } from 'react-native-modals';
import { userInfo, toFarsi, encrypt, getHttpAdress } from '../components/DB';
import { FlatList, ScrollView, Image, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import GLOBAL from './global';
// import { LinearGradient } from 'expo-linear-gradient';
// import { NavigationEvents } from 'react-navigation';

const colorhead = '#5dd891';
const colorlight = '#7be8a9';
const iconname_ = 'form';

if (global.username == '') {
	i18n.locale = 'en';
} else {
	i18n.locale = 'fa';
}

//i18n.fallbacks = true;

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

class webinar extends Component {
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
				//data: [],
				datas: [],
				test: [],
				selectedItem: '0',
				dataLoading: false
			});

		this.props.navigation.addListener('willFocus', () => {
			this.loadAPI(1, 'pull');
			this.loadAPI_grp(1, 'pull');
		});
	}

	delAPI = async (index, eformsID) => {
		//console.log('sdsdsdsdsdsds');
		const { navigation } = this.props;
		const instanseID = navigation.getParam('instanseID');

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
			'/pApi.asmx/delFormMain?fId=' +
			eformsID +
			'&p=' +
			param +
			'&isAdminForms=' +
			this.isAdminForms +
			'&instanceid=' +
			eformsID;
		////////console.log(uurl);
		//	console.log('sdsdsdsdsdsds');

		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				//alert(retJson[0].selectedClass[0].username);
				if (Object.keys(retJson).length == 0) {
					this.setState(
						{
							//isEditing: false
						}
					);
					return;
				}
			}

			let newimagesAddFile = this.state.data;
			//alert(index);
			newimagesAddFile.splice(index, 1); //to remove a single item starting at index
			this.setState({ data: newimagesAddFile });
		} catch (e) {
			console.log(e.message);
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false
			});
			return;
		}
	};

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerTitle: i18n.t('frmListCaption'),
			headerRight: () => (
				<TouchableOpacity
					onPress={() => {
						Linking.openURL('http://farsamooz.ir/apphlp/1.mp4');
					}}
				>
					<Ionicons name="md-play-circle" size={36} color="#aaa" style={{ marginRight: 15, marginTop: 5 }} />
				</TouchableOpacity>
			),
			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransans',
				color: colorhead
			}
		};
	};
	async componentDidMount() {
		//this.loadAPI_grp(this.page, 'pull');
		//this.loadAPI(this.page, 'pull');
	}

	loadAPI_grp = async (page, type) => {
		if (global.lang == 'en') {
			//	alert();
			this.setState({
				data: [],
				dataLoading: false,

				isRefreshing: false,
				loading: false,
				cat: [
					// {
					// 	id: '0',
					// 	name: 'Show All'
					// }
				]
			});
			return;
		}

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
			'/pApi.asmx/getFormCat?id=' +
			page +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&mode=list';
		console.log(uurl);
		try {
			uurl = encrypt(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loading: false
					});
					return;
				}
				if (global.lang == 'en')
					this.setState({
						cat: [
							{
								id: '0',
								name: 'Show All'
							}
						],

						loading: false
					});
				else
					this.setState({
						cat: retJson,

						loading: false
					});
			}
		} catch (e) {
			console.log('err1');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false
			});
			return;
		}
	};

	loadAPI = async (page, type) => {
		if (global.lang == 'en') return;

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
			'/pApi.asmx/getFormsList?currentPage=' +
			page +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&stdid=&instanceid=';
		//
		try {
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
				this.setState({
					data: []
				});
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					data: retJson,
					dataLoading: false,

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
	clickEventListener = (item) => {
		const { navigate } = this.props.navigation;

		if (item.name == 'ویرایش') {
			this.setState({
				bottomModalAndTitle: false
			});
			navigate('examAdd');
		}
	};
	async onRefresh() {
		this.loadAPI(1, 'pull');
	}
	onPressHandler(id) {
		this.setState({ selectedItem: id, data: [], dataLoading: true });
		this.loadAPI(1, 'pull');
	}
	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white' }}>
				<FlatList
					//inverted={true}
					extraData={this.state.selectedItem}
					showsHorizontalScrollIndicator={false}
					data={this.state.cat}
					//keyExtractor={(item) => item.id.toString()}

					keyExtractor={(item) => item.id.toString()}
					horizontal
					contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
					style={{
						//
						//alignItems: 'flex-end',
						//	backgroundColor: 'red',
						borderWidth: 2,
						paddingBottom: 4,
						//alignItems: 'flex-end',
						borderWidth: 0,
						marginTop: 4,
						marginRight: 4,
						marginLeft: 4
					}}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								//style={{ alignSelf: 'center' }}
								activeOpacity={0.7}
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
												backgroundColor: colorhead,
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: colorhead,
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
												borderColor: colorhead,
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

													color: colorlight,

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
	render() {
		let test = [
			{ name: ' شرکت کنندگان', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			{ name: 'افزودن سئوال', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'ویرایش', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'تست آزمون', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			{ name: ' غایبین', code: 'white', icon: 'md-people', bkcolor: '#34ace0' },
			{ name: 'حذف', code: 'white', icon: 'ios-trash', bkcolor: '#f79383' }
		];

		//	GLOBAL.vclass = this;

		if (!this.state.data) {
			return (
				<SafeAreaView style={{ flex: 1 }}>
					<ScrollView
						contentContainerStyle={{ flex: 1 }}
						refreshControl={<RefreshControl onRefresh={this.onRefresh.bind(this)} />}
					>
						<Loading />
					</ScrollView>
				</SafeAreaView>
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
					contentContainerStyle={{ flexGrow: 1 }}
					ListEmptyComponent={
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
									<Text style={[ defaultStyles.lbl14, { color: colorhead } ]}>
										{' '}
										{global.lang == 'fa' ? 'لیست خالی است' : 'List is empty'}
									</Text>
								)}
							</View>
						</View>
					}
					//onEndReachedThreshold={0.4}
					//	onEndReached={this._handleLoadMore.bind(this)}
					refreshControl={
						<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					}
					style={Mstyles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					// keyExtractor={(item) => {
					// 	return item.id;
					// }}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								key={item.id}
								onPress={() => {
									const { navigate } = this.props.navigation;
									global.eformsID = item.id;
									navigate('eforms', { eformsID: item.id, mode: 'add' });
								}}
								activeOpacity={0.9}
								style={{
									height: 68,
									borderRadius: 13,
									margin: 15
								}}
							>
								<View style={[ styles.mainpanel, styles.gradient ]}>
									<View style={{ borderWidth: 0, flex: 1, flexDirection: 'row', marginStart: 0 }}>
										<View style={styles.view1}>
											<View style={styles.view2}>
												<View style={styles.view3}>
													<IconAnt
														name={iconname_}
														style={styles.image}
														size={34}
														color="white"
													/>
												</View>
												<View style={[ styles.view4, { marginTop: 15 } ]}>
													<Text
														numberOfLines={1}
														style={[ styles.aztitle, { color: 'black' } ]}
													>
														{item.caption}
													</Text>
													{item.enddate ? (
														<Text style={[ styles.aztitlet, { paddingTop: 2 } ]}>
															{' مهلت تا: ' + toFarsi(item.enddate)}
														</Text>
													) : null}

													<Text style={[ styles.aztitlet, { paddingBottom: 10 } ]}>
														{'تعداد شرکت کننده : ' + item.d + ' نفر'}
													</Text>
												</View>

												{/* <View style={{ flex: 1 }}> */}
												{(item.isadmin == 1 || item.isaccess == 1) && (
													<Menu>
														<MenuTrigger>
															<Ionicons
																name="ios-menu"
																size={32}
																color="#000"
																style={{ marginRight: 15, marginTop: 15 }}
															/>

															{/* <Text style={{ fontSize: 40, fontWeight: 'bold' }}>⋮</Text> */}
														</MenuTrigger>
														<MenuOptions customStyles={optionsStyles}>
															{item.isadmin == 1 && (
																<MenuOption
																	customStyles={this.optionStyles}
																	onSelect={() => {
																		const { navigate } = this.props.navigation;
																		//global.eformsID = item.id;
																		navigate('eforms', {
																			eformsID: 5,
																			instanseID: item.id,
																			stdID: 0,
																			mode: 'view',
																			isAdminForms: 'true'
																		});
																	}}
																	text="ویرایش فرم"
																/>
															)}
															{item.isadmin == 1 && (
																<MenuOption
																	customStyles={this.optionStyles}
																	onSelect={() => {
																		const { navigate } = this.props.navigation;
																		//global.eformsID = item.id;
																		navigate('eforms', {
																			eformsID: item.id,
																			instanseID: '',
																			stdID: 0,
																			mode: 'design',
																			isAdminForms: ''
																		});
																	}}
																	text="طراحی فرم"
																/>
															)}
															<MenuOption
																customStyles={this.optionStyles}
																onSelect={() => {
																	const { navigate } = this.props.navigation;
																	//global.eformsID = item.id;
																	navigate('studentlist', {
																		eformsID: item.id,
																		mode: 'list'
																	});
																}}
																text="لیست شرکت کنندگان"
															/>

															{item.isadmin == 1 && (
																<MenuOption
																	customStyles={this.optionStyles}
																	onSelect={() => {
																		Alert.alert(
																			' اخطار',
																			'آیا مایل به حذف این فرم هستید؟',
																			[
																				{
																					text: 'خیر',
																					//onPress: () => console.log('Cancel Pressed'),
																					style: 'cancel'
																				},
																				{
																					text: 'بله',
																					onPress: () => {
																						this.delAPI(
																							this.delAPI(index),
																							item.id
																						);
																					}
																				}
																			],
																			{ cancelable: false }
																		);
																	}}
																	text="حذف فرم"
																/>
															)}
														</MenuOptions>
													</Menu>
												)}
												{/* </View> */}

												{/* {global.ttype == 'administrator' ||
														(item.access.indexOf(global.username) > -1 && ( */}
												{false &&
												item.isadmin == 1 && (
													<TouchableOpacity
														onPress={() => {
															const { navigate } = this.props.navigation;
															//global.eformsID = item.id;
															navigate('studentlist', {
																eformsID: item.id,
																mode: 'list'
															});
														}}
														style={{
															alignItems: 'center',
															justifyContent: 'center',
															flex: 0.5
														}}
													>
														<IconAnt
															name="solution1"
															style={styles.image}
															size={28}
															color="#ccc"
														/>

														<Text
															style={[
																defaultStyles.lbl14,
																{ fontSize: 12.2, color: 'black' }
															]}
														>
															لیست
														</Text>
													</TouchableOpacity>
												)}
												{/* ))} */}
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
				/>

				{global.ttype == 'administrator' && (global.ttype == 'teacher' && false) ? (
					<ActionButton position="left" buttonColor={this.colorhead}>
						<ActionButton.Item
							buttonColor="#9b59b6"
							title="تعریف آزمون"
							onPress={() => {
								global.examEditID = '';
								const { navigate } = this.props.navigation;
								navigate('examAdd');
							}}
						>
							<IconAnt name="edit" style={styles.actionButtonIcon} />
							{/* <Iconan name="edit" style={styles.actionButtonIcon} /> */}
						</ActionButton.Item>
						<ActionButton.Item buttonColor="#3498db" title="بانک سئوالات" onPress={() => {}}>
							<Icon name="md-notifications-off" style={styles.actionButtonIcon} />
						</ActionButton.Item>
					</ActionButton>
				) : null}

				{/* <Modal.BottomModal
					visible={this.state.bottomModalAndTitle}
					onTouchOutside={() => this.setState({ bottomModalAndTitle: false })}
					height={0.4}
					width={1}
					onSwipeOut={() => this.setState({ bottomModalAndTitle: false })}
					modalTitle={<ModalTitle title="عملیات آزمون" hasTitleBar />}
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
							// staticDimension={300}
							// fixed
							spacing={10}
							renderItem={({ item }) => (
								<View style={[ styles.itemContainer, { backgroundColor: item.bkcolor } ]}>
									{item.badge > 0 && <Text style={styles.badge}> 2 </Text>}

									<TouchableOpacity
										onPress={() => {
											this.clickEventListener(item);
										}}
										style={{ flex: 1 }}
									>
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
									</TouchableOpacity>

									<Text style={styles.itemName}>{item.caption}</Text>
								</View>
							)}
						/>
					</ModalContent>
				</Modal.BottomModal> */}

				{(true && global.ttype == 'administrator') || global.ttype == 'teacher' ? (
					<ActionButton useNativeDriver position="left" buttonColor="#37a361">
						<ActionButton.Item
							buttonColor="#37a361"
							title="تعریف فرم "
							textStyle={{ fontFamily: 'iransans' }}
							onPress={() => {
								global.examEditID = '';

								const { navigate } = this.props.navigation;
								//27429
								navigate('eforms', {
									eformsID: 5,
									instanseID: '',
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true'
								});
							}}
						>
							<IconAnt name="edit" style={styles.actionButtonIcon} />
						</ActionButton.Item>

						{/* <ActionButton.Item
							buttonColor="#9b59b6"
							title="تعریف آزمون با فایل عکس"
							textStyle={{ fontFamily: 'iransans' }}
							onPress={() => {
								global.examEditID = '';

								const { navigate } = this.props.navigation;
								//27429
								navigate('eforms', {
									eformsID: 2,
									instanseID: '',
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true'
								});
							}}
						>
							<Icon name="md-create" style={styles.actionButtonIcon} />
						</ActionButton.Item> */}

						{/* <ActionButton.Item buttonColor="#3498db" title="بانک سئوالات" onPress={() => {}}>
							<Icon name="md-notifications-off" style={styles.actionButtonIcon} />
						</ActionButton.Item> */}
						{/* <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
            <Icon name="md-done-all" style={styles.actionButtonIcon} />
          </ActionButton.Item> */}
					</ActionButton>
				) : null}

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
	view4: {
		paddingStart: 10,
		borderWidth: 0,
		justifyContent: 'center',
		flex: 2
	},
	view3: {
		backgroundColor: colorlight,
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
		backgroundColor: '#ffffff',
		top: 0,
		zIndex: 1,
		elevation: 2,
		height: 85,
		flexDirection: 'column'
	},
	mainpanel: {
		zIndex: 1,
		elevation: 2,
		shadowColor: '#ddd',
		shadowOffset: {
			width: 1,
			height: 1
		},
		shadowOpacity: 0.67,
		shadowRadius: 2.49
	},
	aztitle: {
		width: '100%',
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'left',
		borderWidth: 0,
		fontSize: 12.2,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'flex-start',
		fontFamily: 'iransans',
		textAlign: 'left',
		//width: '100%',
		fontSize: 12.2,
		borderWidth: 1,
		padding: 1,
		borderColor: 'white',
		borderRadius: 5,
		color: '#878787'
	},
	actionButtonIcon: {
		fontSize: 12.2,
		height: 22,
		color: 'white'
	},
	image: {
		width: 50,
		paddingTop: 13,
		paddingLeft: 10,
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
		fontSize: 12.2
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
		fontSize: 12.2,
		color: '#fff',
		fontWeight: '600',
		paddingBottom: 12,
		fontFamily: 'iransans',
		textAlign: 'center'
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12.2,
		color: '#fff'
	}
});
export default withNavigation(webinar);
