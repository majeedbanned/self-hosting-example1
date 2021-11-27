import React, { Component } from 'react';
import { StyleSheet, Linking, ActivityIndicator, SafeAreaView, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../../config/styles';
import Loading from '../../components/loading';
import { Snackbar } from 'react-native-paper';
// import DropdownAlert from 'react-native-dropdownalert';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import { withNavigation } from 'react-navigation';
// import { FlatGrid } from 'react-native-super-grid';
import { SearchBar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

import Mstyles from '../../components/styles';
// import FormButton from '../../component/FormButton';
// import ExamAdd from '../examAdd';
// import { AntDesign, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//import SelectUser from './../../selectUser';
import NetInfo from '@react-native-community/netinfo';
// import Modal, {
// 	ModalTitle,
// 	ModalContent,
// 	ModalFooter,
// 	ModalButton,
// 	SlideAnimation,
// 	ScaleAnimation
// } from 'react-native-modals';
import { userInfo, toFarsi, encrypt, getHttpAdress } from '../../components/DB';
import { FlatList, ScrollView, Image, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import GLOBAL from '../global';
// import { LinearGradient } from 'expo-linear-gradient';
// import { NavigationEvents } from 'react-navigation';

const colorhead = '#9b59b6';
const colorlight = '#9b59b6';
const iconname_ = 'dotchart';
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

class menuList extends Component {
	constructor(props) {
		super(props);
		this.onEndReachedCalledDuringMomentum = true;
		(this.page = 1),
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
				//data: [],
				datas: [],
				test: [],
				selectedItem: '0',
				dataLoading: false
			});

		this.props.navigation.addListener('willFocus', () => {
			const { navigation } = this.props;

			this.menuId = navigation.getParam('reportID');
			this.repid = navigation.getParam('repid');
			this.extra = navigation.getParam('extra');

			this.loadAPI(1, 'pull');
			this.loadAPI_grp(1, 'pull');
		});
	}
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			// headerLeft: (
			// 	<Icon
			// 		name={'arrow-left'}
			// 		onPress={() => {
			// 			navigation.goBack();
			// 		}}
			// 	/>
			// ),
			headerTitle: '',
			headerRight: () => null,

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
			'/pApi.asmx/getmenuListCat?id=' +
			page +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&mode=list';
		////////console.log(uurl);
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

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getmenuList?id=' +
			page +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&menuid=' +
			this.menuId +
			'&q=' +
			this.state.searchText +
			'&extra=' +
			this.extra;

		if (page == 1) this.setState({ data: [] });

		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
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
				// this.setState({
				// 	data: []
				// });
				this.setState({
					data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					//	data: retJson,
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

	delAPI = async (iddel, index) => {
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
			'/pApi.asmx/delmenuList?p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&menuid=' +
			this.menuId +
			'&q=' +
			iddel;

		//if (page == 1) this.setState({ data: [] });

		////////console.log(uurl);
		try {
			uurl = encrypt(uurl);
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
				// this.setState({
				// 	data: []
				// });

				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					//	data: retJson,
					dataLoading: false,

					isRefreshing: false,
					loading: false
				});

				if (retJson.id == '0') {
					alert(retJson.msg);
					return;
				}
				let newimagesAddFile = this.state.data;
				//alert(index);
				newimagesAddFile.splice(index, 1); //to remove a single item starting at index
				this.setState({ data: newimagesAddFile });
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
		return <ActivityIndicator size="small" color="#000" />;
	};
	_handleLoadMore = () => {
		if (!this.onEndReachedCalledDuringMomentum) {
			if (!this.state.isLoading) {
				this.page = this.page + 1;
				this.loadAPI(this.page, 'more');
				this.onEndReachedCalledDuringMomentum = true;
			}
		}
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
													color: 'white',
													fontFamily: 'iransans'
												}
											) : (
												{
													color: colorlight,

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
					keyExtractor={(item) => item.id.toString()}
					initialNumToRender={10}
					onMomentumScrollBegin={() => {
						this.onEndReachedCalledDuringMomentum = false;
					}}
					ref={(ref) => {
						this.flatListRef = ref;
					}}
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
								{!this.state.dataLoading && <Text style={defaultStyles.lbl14}> لیست خالی است</Text>}
							</View>
						</View>
					}
					onEndReachedThreshold={0.5}
					onEndReached={this._handleLoadMore.bind(this)}
					refreshControl={
						<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					}
					style={Mstyles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					// keyExtractor={(item) => {
					// 	return item.id;
					// }}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								onPress={() => {
									const { navigate } = this.props.navigation;
									navigate.headerBackTitle = 'shah';
									global.eformsID = item.id;
									//	navigate('reportView', { reportID: item.id, reportName: item.title });
								}}
								activeOpacity={0.8}
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
												<View style={styles.view4}>
													<Text style={[ styles.aztitle, { color: 'black' } ]}>
														{item.title}
													</Text>
													{item.enddate ? (
														<Text style={[ styles.aztitlet, { paddingTop: 4 } ]}>
															{' مهلت تا: ' + toFarsi(item.enddate)}
														</Text>
													) : null}
												</View>

												{true && (
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
															{true && (
																<MenuOption
																	customStyles={this.optionStyles}
																	onSelect={() => {
																		const { navigate } = this.props.navigation;
																		//27429
																		navigate('eforms', {
																			eformsID: this.repid,
																			instanseID: item.id,
																			stdID: 0,
																			mode: 'view',
																			isAdminForms: 'true'
																		});
																	}}
																	text="ویرایش "
																/>
															)}

															{true && (
																<MenuOption
																	customStyles={this.optionStyles}
																	onSelect={() => {
																		Alert.alert(
																			' اخطار',
																			'آیا مایل به حذف این ردیف هستید؟',
																			[
																				{
																					text: 'خیر',
																					//onPress: () => console.log('Cancel Pressed'),
																					style: 'cancel'
																				},
																				{
																					text: 'بله',
																					onPress: () => {
																						this.delAPI(item.id, index);
																					}
																				}
																			],
																			{ cancelable: false }
																		);
																	}}
																	text="حذف "
																/>
															)}
														</MenuOptions>
													</Menu>
												)}

												{/* {global.ttype == 'administrator' ||
														(item.access.indexOf(global.username) > -1 && ( */}
												{/* <TouchableOpacity
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
														size={34}
														color="#ccc"
													/>

													
													<Text
														style={[
															defaultStyles.lbl14,
															{ fontSize: 14, color: 'black' }
														]}
													>
														لیست
													</Text>
												</TouchableOpacity> */}
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
					<ActionButton position="left" buttonColor="rgba(231,76,60,1)">
						<ActionButton.Item
							buttonColor="#9b59b6"
							title="تعریف آزمون"
							onPress={() => {
								global.examEditID = '';
								const { navigate } = this.props.navigation;
								navigate('examAdd');
							}}
						>
							<Icon name="edit" style={styles.actionButtonIcon} />
						</ActionButton.Item>
						<ActionButton.Item buttonColor="#3498db" title="بانک سئوالات" onPress={() => {}}>
							<Icon name="md-notifications-off" style={styles.actionButtonIcon} />
						</ActionButton.Item>
					</ActionButton>
				) : null}

				<ActionButton useNativeDriver position="left" buttonColor="rgba(231,76,60,1)">
					<ActionButton.Item
						buttonColor="#9b59b6"
						title=" افزودن  "
						textStyle={{ fontFamily: 'iransans' }}
						onPress={() => {
							global.examEditID = '';

							const { navigate } = this.props.navigation;
							console.log(this.repid + '-' + this.extra);
							navigate('eforms', {
								eformsID: this.repid,
								instanseID: '',
								stdID: 0,
								mode: 'view',
								isAdminForms: 'true',
								extra: this.extra
							});
						}}
					>
						{/* <Icon name="edit" style={styles.actionButtonIcon} /> */}

						<IconAnt name="edit" style={styles.actionButtonIcon} />
					</ActionButton.Item>
				</ActionButton>
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
		fontSize: 14,
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
		color: '#878787'
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
export default withNavigation(menuList);
