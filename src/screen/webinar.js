import React, { Component } from 'react';
import { StyleSheet, Linking, Dimensions } from 'react-native';
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
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';

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
				data: [],
				datas: [],
				test: [],
				selectedItem: '1'
			});
	}

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
					id: '1',

					name: 'کلاس های مجازی امروز'
				},
				{
					id: '2',

					name: 'همه کلاس ها'
				},
				{
					id: '3',

					name: 'برنامه هفتگی مجازی'
				}
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
			this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			return;
		}
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getVclassList?currentPage=' +
			page +
			'&p=' +
			param +
			'&mode=' +
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
						isRefreshing: false
					});
					return;
				}
				//	console.log(retJson);
				this.setState({
					data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],

					loading: false,
					isRefreshing: false
				});
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
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

	onPressHandler(id) {
		this.setState({ selectedItem: id, data: [], dataLoading: true });

		this.loadAPI(1, '');
	}
	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white' }}>
				<FlatList
					inverted={Platform.OS === 'ios' ? false : true}
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
												borderRadius: 15,
												margin: 3,
												paddingTop: 8,
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
				<View>
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
													borderRadius: 15,
													margin: 3,
													paddingTop: 8,
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
				</View>
				{this.state.selectedItem === '3' && (
					//	alert();
					<Timetable />
				)}

				{this.state.selectedItem != '3' && (
					<FlatList
						//ListHeaderComponent={this.renderHeader}
						//	stickyHeaderIndices={[ 0 ]}
						ListFooterComponent={this._renderFooter}
						onScroll={this.onScroll}
						initialNumToRender={10}
						onEndReachedThreshold={0.4}
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
						keyExtractor={(item) => {
							return item.id;
						}}
						renderItem={({ item }) => {
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
															<Text style={styles.aztitle}>{item.name}</Text>
															{item.teachersName ? (
																<Text style={styles.aztitlet}>{item.teachersName}</Text>
															) : null}
														</View>
													</View>
													<View style={{ borderWidth: 0, marginStart: 0, flex: 1 }}>
														<View style={styles.textpart}>
															<View style={styles.textpart}>
																<Text style={styles.rtlText}>
																	{toFarsi(item.azdate)}
																</Text>
															</View>
															<View style={styles.textpart}>
																<Text style={styles.rtlText}>
																	{toFarsi(`ساعت:` + item.aztime)}
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
																	{toFarsi(item.duration + `‍‍‍‍‍دقیقه`)}
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
														title="آرشیو ضبط جلسات"
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

											{item.active == 'True' && (
												<View style={styles.textpart} style={{ paddingTop: 20 }}>
													<FormButton
														onPress={() => {
															//alert();
															//console.log(item.url);
															//return;
															console.log('http://192.168.1.15/' + item.url);
															if (item.scoid == null) {
																//const message = decodeURIComponent(item.url);

																Linking.openURL('http://192.168.1.15/' + item.url);
															} else if (item.scoid != null) {
																//adobe
																//alert();
																const message = encodeURIComponent(item.url);
																//	Linking.openURL(item.url);
																Linking.openURL('http://192.168.1.15/' + item.url);

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
														title="ورود به کلاس مجازی"
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
							<Icon name="md-create" style={styles.actionButtonIcon} />
						</ActionButton.Item>
						<ActionButton.Item buttonColor="#3498db" title="بانک سئوالات" onPress={() => {}}>
							<Icon name="md-notifications-off" style={styles.actionButtonIcon} />
						</ActionButton.Item>
						{/* <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
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
		fontSize: 18,
		color: 'white'
	},
	aztitlet: {
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'center',
		fontSize: 13,
		borderWidth: 1,
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
