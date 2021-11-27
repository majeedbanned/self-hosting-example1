import React, { Component } from 'react';
import { StyleSheet, Linking, ActivityIndicator, SafeAreaView, Alert, Platform } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../../config/styles';
import Loading from '../../components/loading';
//import ActionButton from 'react-native-action-button';
import i18n from 'i18n-js';
import { SearchBar } from 'react-native-elements';
import { Snackbar } from 'react-native-paper';
import Iconw from 'react-native-vector-icons/FontAwesome';

// import DropdownAlert from 'react-native-dropdownalert';
import { withNavigation } from 'react-navigation';
// import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

import IconAnt from 'react-native-vector-icons/AntDesign';

import Mstyles from '../../components/styles';
// import FormButton from '../../component/FormButton';
//import ExamAdd from '../../examAdd';
// import { AntDesign, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//import SelectUser from '../../selectUser';
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
//import { networkInterfaces } from 'os';

const colorhead = '#f2ac14';
const colorlight = '#f2ac14';
const iconname_ = 'form';

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

class bankfile extends Component {
	constructor(props) {
		super(props);
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
			//	this.loadAPI(1, 'pull');
			this.loadAPI_grp(1, 'pull');
		});
	}
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerTitle: i18n.t('fileListCaption'),
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
		if (global.lang == 'en') {
			this.setState({
				cat: [
					{
						name: 'Writing',
						id: 23508,
						ClassCode: 1484792,
						classname: 'Class B',
						teachname: 'carla mardani',
						TeacherCode: 20
					},
					{
						name: 'Speaking',
						id: 23508,
						ClassCode: 1486742,
						classname: 'Class B',
						teachname: 'Mr Boss',
						TeacherCode: 20
					}
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
			'/pApi.asmx/stdCourseListfile?id=' +
			page +
			'&p=' +
			param +
			'&g=' +
			this.state.selectedItem +
			'&mode=list';
		//
		try {
			uurl = encrypt(uurl);
			console.log(uurl);
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						cat: [],
						loading: false
					});
					return;
				}
				this.setState({
					cat: retJson,

					loading: false
				});
			}
			if (this.state.cat.length != 0) {
				this.setState({
					selectedItem: this.state.cat[0].id + '-' + this.state.cat[0].ClassCode
				});
				this.loadAPI(1, 'pull');
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
		if (global.lang == 'en') {
			this.setState({
				data: [
					{
						visible: true,
						name: 'Writing New Tips',
						disc: '',
						id: 10,
						owner: 20,
						date_: 'Full pages',
						time_: 'Sims',
						size: 'Pdf',
						type: 'pdf',
						filename: 'http://ios.farsamooz.ir/2.pdf',
						Expr1: 'course',
						entity: 1484792,
						schoolcode: 95100040,
						RowNumber: 1
					},
					{
						visible: true,
						name: 'Task two questions',
						disc: '',
						id: 8,
						owner: 20,
						date_: 'Full pages',
						time_: 'Sims',
						size: 'Pdf',
						type: 'pdf',
						filename: 'http://ios.farsamooz.ir/1.pdf',
						Expr1: 'course',
						entity: 1484792,
						schoolcode: 95100040,
						RowNumber: 2
					},
					{
						visible: true,
						name: 'Best Discussion Titles in English',
						disc: '',
						id: 18,
						owner: 20,
						date_: 'Full pages',
						time_: 'Sims',
						size: 'Pdf',
						type: 'pdf',
						filename: 'http://ios.farsamooz.ir/3.pdf',
						Expr1: 'course',
						entity: 1484792,
						schoolcode: 95100040,
						RowNumber: 2
					},
					{
						visible: true,
						name: 'English Writing Practice',
						disc: '',
						id: 28,
						owner: 20,
						date_: 'Full pages',
						time_: 'Sims',
						size: 'Pdf',
						type: 'pdf',
						filename: 'http://ios.farsamooz.ir/4.pdf',
						Expr1: 'course',
						entity: 1484792,
						schoolcode: 95100040,
						RowNumber: 2
					}
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
			'/pApi.asmx/getfiles?id=' +
			this.page +
			'&p=' +
			param +
			'&g=' +
			global.adress +
			'&coursecode=' +
			this.state.selectedItem +
			'&q=' +
			this.state.searchText;
		console.log(uurl);
		try {
			uurl = encrypt(uurl);
			//////console.log(uurl);
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

				if (global.lang == 'fa')
					this.setState({
						data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
						//data: retJson,
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
		return <ActivityIndicator size="small" color="#000" />;
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
		this.page = 1;
		this.setState({ selectedItem: id, data: [], dataLoading: true });
		this.loadAPI(1, 'pull');
	}
	imageload(teacherCode) {
		return <Image style={styles.imageavatar} source={{ uri: getHttpAdress() + 'child/' + teacherCode + '.jpg' }} />;
		//return <Image style={styles.imageavatar} source={require('./../../../assets/images/logo.png')} />;
		var url = getHttpAdress() + 'child/' + teacherCode + '.jpg';
		//console.log(url);
		fetch(url)
			.then((res) => {
				if (res.status == 404) {
					console.log('not found');
					return <Image style={styles.imageavatar} source={require('./../../../assets/images/logo.png')} />;
				} else {
					//console.log('found');
					return <Text style={{ width: 14, height: 15 }}>salam</Text>;
					// return  <Image style={styles.imageavatar} source={{ uri: url }} />;
				}
			})
			.catch((err) => {
				console.log('erer');
				return <Image style={styles.imageavatar} source={require('./../../../assets/images/logo.png')} />;
			});

		//		return <Image style={styles.imageavatar} source={{ uri: getHttpAdress() + 'child/' + teacherCode + '.jpg' }} />;
	}

	delAPI = async (eid, index) => {
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
		let uurl = global.adress + '/pApi.asmx/delFile?fId=' + eid + '&p=' + param; //+

		////////console.log(uurl);

		try {
			uurl = encrypt(uurl);
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

				this.setState({ issnack: true, msg: retJson.msg });

				let newimagesAddFile = this.state.data;
				//alert(index);
				newimagesAddFile.splice(index, 1); //to remove a single item starting at index
				this.setState({ data: newimagesAddFile });

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

	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white' }}>
				<FlatList
					//	inverted={false}
					showsHorizontalScrollIndicator={false}
					extraData={this.state.selectedItem}
					data={this.state.cat}
					keyExtractor={(item) => item.id.toString() + '-' + item.ClassCode}
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
								key={item.id}
								activeOpacity={0.6}
								onPress={() => {
									//console.log(item.id);
									this.onPressHandler(item.id + '-' + item.ClassCode);
								}}
							>
								<View
									style={
										this.state.selectedItem === item.id + '-' + item.ClassCode.toString() ? (
											{
												flexDirection: 'row',
												backgroundColor: colorhead,
												fontFamily: 'iransans',
												borderWidth: 0,
												borderColor: colorhead,
												borderRadius: 30,
												margin: 3,
												paddingTop: 0,
												paddingRight: 8,
												paddingLeft: 0,
												paddingBottom: 0
											}
										) : (
											{
												flexDirection: 'row',
												backgroundColor: 'white',
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: colorhead,
												borderRadius: 30,
												margin: 3,
												paddingTop: 0,
												paddingRight: 8,
												paddingLeft: 0,
												paddingBottom: 0
											}
										)
									}
								>
									{this.imageload(item.TeacherCode)}

									<View>
										<Text
											style={
												this.state.selectedItem ===
												item.id + '-' + item.ClassCode.toString() ? (
													{
														color: 'white',
														fontSize: 12,
														paddingTop: 5,
														paddingStart: 5,
														textAlign: 'left',
														paddingEnd: 5,
														fontFamily: 'iransans'
													}
												) : (
													{
														paddingTop: 5,
														paddingStart: 5,
														textAlign: 'left',
														paddingEnd: 5,
														color: colorlight,
														fontSize: 12,
														fontFamily: 'iransans'
													}
												)
											}
										>
											{toFarsi(item.name)}
										</Text>
										<Text
											style={
												this.state.selectedItem ===
												item.id.toString() + '-' + item.ClassCode.toString() ? (
													{
														color: 'white',
														fontSize: 10,
														fontFamily: 'iransans',

														paddingStart: 5,
														textAlign: 'left',
														marginTop: -3,
														paddingEnd: 5
													}
												) : (
													{
														color: 'black',
														//color: colorlight,
														fontSize: 10,
														fontFamily: 'iransans',
														textAlign: 'left',
														paddingStart: 5,
														marginTop: -3,
														paddingEnd: 5
													}
												)
											}
										>
											{toFarsi(item.classname)}
										</Text>
									</View>
									{this.state.selectedItem !== item.id.toString() + '-' + item.ClassCode.toString() ||
										(this.state.dataLoading && <ActivityIndicator color={'white'} />)}
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
					placeholder={i18n.t('frmsrchCaption')}
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

		if (!this.state.cat) {
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
					ref={(ref) => {
						this.flatListRef = ref;
					}}
					keyExtractor={(item) => item.id.toString()}
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
										{global.lang == 'fa' ? 'لیست خالی است' : 'List is empty'}
									</Text>
								)}
							</View>
						</View>
					}
					onEndReachedThreshold={0.4}
					onEndReached={this._handleLoadMore.bind(this)}
					refreshControl={
						<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					}
					style={Mstyles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					keyExtractor={(item, index) => item.id.toString()}
					// keyExtractor={(item) => {
					// 	return item.id;
					// }}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
								key={item.id}
								onPress={() => {
									Linking.openURL(item.filename);
									// const { navigate } = this.props.navigation;
									// global.eformsID = item.id;
									// navigate('eforms', { eformsID: item.id, mode: 'add' });
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
												<View style={[ styles.view3, { width: 80 } ]}>
													{/* <IconAnt
														name={iconname_}
														style={styles.image}
														size={34}
														color="white"
													/> */}

													{item.type == 'pdf' && (
														<Iconw
															style={styles.image}
															name="file-pdf-o"
															size={34}
															color="white"
														/>
													)}
													{(item.type == 'jpg' ||
														item.type == 'jpeg' ||
														item.type == 'png') && (
														<Iconw
															style={styles.image}
															name="file-picture-o"
															size={34}
															color="white"
														/>
													)}
													{(item.type == 'xls' || item.type == 'xlsx') && (
														<Iconw
															style={styles.image}
															name="file-excel-o"
															size={34}
															color="white"
														/>
													)}
													{(item.type == 'doc' || item.type == 'docx') && (
														<Iconw
															style={styles.image}
															name="file-word-o"
															size={34}
															color="white"
														/>
													)}
												</View>
												<View style={[ styles.view4, {} ]}>
													<Text style={[ styles.aztitle, { color: 'black' } ]}>
														{item.name}
													</Text>

													{item.disc ? (
														<Text
															numberOfLines={1}
															style={[ styles.aztitlet, { paddingTop: -4 } ]}
														>
															{toFarsi(item.disc)}
														</Text>
													) : null}
													<View style={{ flexDirection: 'row' }}>
														<Text
															numberOfLines={1}
															style={[ styles.aztitlet, { paddingTop: 0, flex: 1 } ]}
														>
															{toFarsi(item.time_)}
														</Text>
														<Text
															numberOfLines={1}
															style={[ styles.aztitlet, { paddingTop: 0, flex: 1 } ]}
														>
															{toFarsi(item.date_)}
														</Text>
														<Text
															numberOfLines={1}
															style={[ styles.aztitlet, { paddingTop: 0, flex: 1 } ]}
														>
															{toFarsi(item.size)}
														</Text>
													</View>
												</View>
												{item.owner == global.username &&
												(global.ttype == 'administrator' || global.ttype == 'teacher') && (
													<View style={{ flex: 1 }}>
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
																<MenuOption
																	customStyles={this.optionStyles}
																	onSelect={() => {
																		const { navigate } = this.props.navigation;
																		//global.eformsID = item.id;
																		navigate('eforms', {
																			eformsID: 12,
																			instanseID: item.id,
																			stdID: 0,
																			mode: 'view',
																			isAdminForms: 'true'
																		});
																	}}
																	text="ویرایش فایل"
																/>

																{true && (
																	<MenuOption
																		customStyles={this.optionStyles}
																		onSelect={() => {
																			Alert.alert(
																				' اخطار',
																				'آیا مایل به حذف این فایل هستید؟',
																				[
																					{
																						text: 'خیر',
																						//onPress: () => console.log('Cancel Pressed'),
																						style: 'cancel'
																					},
																					{
																						text: 'بله',
																						onPress: () => {
																							this.delAPI(item.id, this);
																						}
																					}
																				],
																				{ cancelable: false }
																			);
																		}}
																		text="حذف فایل"
																	/>
																)}
															</MenuOptions>
														</Menu>
													</View>
												)}
												{/* {global.ttype == 'administrator' ||
														(item.access.indexOf(global.username) > -1 && ( */}
											</View>
										</View>
									</View>
								</View>
							</TouchableOpacity>
						);
					}}
				/>

				{(true && global.ttype == 'administrator') || global.ttype == 'teacher' ? (
					<ActionButton useNativeDriver position="left" buttonColor="#c48600">
						<ActionButton.Item
							buttonColor="#c48600"
							title=" افزودن فایل "
							textStyle={{ fontFamily: 'iransans' }}
							onPress={() => {
								global.examEditID = '';

								const { navigate } = this.props.navigation;
								//27429
								navigate('eforms', {
									eformsID: 12,
									instanseID: '',
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true'
								});
							}}
						>
							<IconAnt name="edit" style={styles.actionButtonIcon} />

							{/* <Icon name="edit" style={styles.actionButtonIcon} /> */}
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
				</Modal.BottomModal>
 */}
				{global.ttype == 'administrator' && (global.ttype == 'teacher' && true) ? (
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
	bluebadge: {
		fontSize: 15,
		overflow: 'hidden',
		//borderColor: 'green',
		//borderWidth: 1,
		backgroundColor: '#2e95d8',
		padding: 5,
		borderRadius: 7,
		color: 'white'
	},
	redbadge: {
		fontSize: 15,
		overflow: 'hidden',
		//borderColor: 'green',
		//borderWidth: 1,
		backgroundColor: '#e64d3f',
		padding: 5,
		borderRadius: 7,
		color: 'white'
	},
	greenbadge: {
		fontSize: 15,
		overflow: 'hidden',
		borderColor: 'green',
		//borderWidth: 1,
		backgroundColor: '#2acb6e',
		padding: 5,
		borderRadius: 7,
		color: 'white'
	},
	view4: {
		paddingStart: 10,
		borderWidth: 0,
		justifyContent: 'center',
		flex: 2
	},

	imageavatar: {
		width: 42,
		height: 42,
		borderRadius: 42,
		borderWidth: 1,
		borderColor: colorlight
	},
	view3: {
		backgroundColor: colorlight,
		borderTopStartRadius: 13,
		borderBottomStartRadius: 13,

		justifyContent: 'center'
		//flex: 0.6
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
		textAlign: 'center',
		borderWidth: 0,
		fontSize: 14,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'flex-start',
		fontFamily: 'iransans',
		textAlign: 'left',
		//width: '100%',
		fontSize: 14,
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
	},
	badge: {
		color: '#fff',
		position: 'absolute',
		zIndex: 10,
		top: -4,
		width: 20,
		height: 20,
		left: -6,
		textAlign: 'center',
		padding: 1,
		overflow: 'hidden',
		backgroundColor: '#eb5757',
		borderRadius: 10,
		borderWidth: 0,
		borderColor: '#000'
	}
});
export default withNavigation(bankfile);
