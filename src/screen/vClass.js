import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';
import defaultStyles from '../config/styles';
import Loading from '../components/loading';

import ActionButton from 'react-native-action-button';
import Modalm from 'react-native-modal';

import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import Mstyles from '../components/styles';
import FormButton from '../component/FormButton';
import ExamAdd from '../screen/examAdd';

import { Ionicons } from '@expo/vector-icons';
import SelectUser from '../screen/selectUser';
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

class vclass extends Component {
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
				selectedItem: 2
			});

		this.props.navigation.addListener('willFocus', () => {
			//alert();
			this.loadAPI(1, 'pull');
			//this.loadAPI_grp(1, 'pull');
		});
	}

	async componentDidMount() {
		this.loadAPI(this.page, 'pull');

		this.setState({
			cat: [
				{
					id: 2,
					name: 'آزمونهای امروز'
				},
				{
					id: 1,
					name: 'همه آزمونها'
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
			'/pApi.asmx/getExamList?currentPage=' +
			page +
			'&p=' +
			param +
			'&type=' +
			this.state.selectedItem;
		console.log(uurl);
		if (page == 1) this.setState({ data: [] });
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

	startExamAPI = async (idexam, modex) => {
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

		this.setState({ loadingstartExam: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/startExam?currentPage=' +
			'1' +
			'&p=' +
			param +
			'&ex=' +
			idexam +
			'&mode=' +
			modex;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						loadingstartExam: false
					});
					return false;
				}
				//if(retJson[0].message);
				this.setState({
					//**data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],

					loadingstartExam: false
				});

				return retJson[0];
			} else {
				return null;
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loadingstartExam: false
			});
			return false;
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
			this.setState({
				barom_Visible: false,

				bottomModalAndTitle: false
			});
			navigate('examAdd');
		} else if (item.name == 'افزودن سئوال') {
			this.setState({
				barom_Visible: false
			});
			navigate('qbank', { examID: global.examID });
		} else if (item.name == ' شرکت کنندگان') {
			this.setState({
				barom_Visible: false
			});
			navigate('participateList', { examID: global.examID });
		} else if (item.name == 'تست آزمون') {
			this.setState({
				barom_Visible: false
			});

			navigate('Exam', { examID: global.examID, mode: 'test' });
		}

		//console.log(item);

		//Alert.alert('Message', 'Item clicked. ' + item.username);
	};
	async onRefresh() {
		this.loadAPI(1, 'pull');
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
		this.loadAPI(1, 'pull');
	}
	renderHeader = () => {
		//console.log(this.state.cat);
		return (
			<View style={{ backgroundColor: 'white' }}>
				<FlatList
					inverted={Platform.OS === 'ios' ? false : true}
					extraData={this.state.selectedItem}
					data={this.state.cat}
					keyExtractor={(item, index) => index.toString()}
					//keyExtractor={(item) => item.id.toString()}
					horizontal
					style={{ paddingBottom: 4, borderWidth: 0, marginTop: 4, marginRight: 4, marginLeft: 4 }}
					renderItem={({ item, index }) => {
						return (
							<TouchableOpacity
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
												backgroundColor: '#a976fb',
												fontFamily: 'iransans',
												borderWidth: 1,
												borderColor: '#a976fb',
												borderRadius: 15,
												flexDirection: 'row',
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
												borderColor: '#a976fb',
												borderRadius: 15,
												margin: 3,
												flexDirection: 'row',
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
													color: '#a976fb',

													fontFamily: 'iransans'
												}
											)
										}
									>
										{item.name}
									</Text>

									{this.state.selectedItem !== item.id ||
										(this.state.dataLoading && <ActivityIndicator color="white" />)}
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		);
	};
	render() {
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;

		let test = [
			{ name: ' شرکت کنندگان', code: 'white', icon: 'ios-list', bkcolor: '#e091ca' },
			//{ name: 'افزودن سئوال', code: 'white', icon: 'ios-add-circle-outline', bkcolor: '#fbb97c' },
			{ name: 'ویرایش', code: 'white', icon: 'ios-settings', bkcolor: '#f79383' },
			{ name: 'تست آزمون', code: 'white', icon: 'md-checkmark-circle-outline', bkcolor: '#34ace0' },
			//	{ name: ' غایبین', code: 'white', icon: 'md-people', bkcolor: '#34ace0' },
			{ name: 'حذف', code: 'white', icon: 'ios-trash', bkcolor: '#f79383' }
		];

		GLOBAL.vclass = this;
		if (this.state.isLoading && this.page === 1) {
			return (
				<Loading />
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
			<View style={Mstyles.container}>
				<FlatList
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[ 0 ]}
					ListFooterComponent={this._renderFooter}
					onScroll={this.onScroll}
					initialNumToRender={10}
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
					// 				<Text style={defaultStyles.lbl14}> آزمونی تعریف نشده است</Text>
					// 			)}
					// 		</View>
					// 	</View>
					// }

					// ListEmptyComponent={() => (
					// 	<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
					// 		{!this.state.dataLoading && <Text style={defaultStyles.lbl14}> آزمونی تعریف نشده است</Text>}
					// 	</View>
					// )}
					contentContainerStyle={{ flexGrow: 1 }}
					ListEmptyComponent={() => (
						<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
							{!this.state.dataLoading && <Text style={defaultStyles.lbl14}> آزمونی تعریف نشده است</Text>}
						</View>
					)}
					onEndReachedThreshold={0.4}
					onEndReached={this._handleLoadMore.bind(this)}
					refreshControl={
						<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					}
					style={Mstyles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					keyExtractor={(item, index) => index.toString()}
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
										colors={[ '#6e80fe', '#a976fb', '#f36af9' ]}
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
													<View style={{ justifyContent: 'center', flex: 1 }}>
														<Image
															style={styles.image}
															source={{
																uri: getHttpAdress() + 'child/' + item.useer + '.jpg'
															}}
														/>
													</View>
													<View style={{ justifyContent: 'center', flex: 2 }}>
														<Text style={styles.aztitle}>{item.name}</Text>
														{item.FirstName ? (
															<Text style={styles.aztitlet}>
																{item.FirstName + ' ' + item.LastName}
															</Text>
														) : null}
													</View>
												</View>
												<View style={{ borderWidth: 0, marginStart: 0, flex: 1 }}>
													<View style={styles.textpart}>
														<View style={styles.textpart}>
															<Text style={styles.rtlText}>
																{toFarsi(item.shoro_namayesh)}
															</Text>
														</View>
														<View style={styles.textpart}>
															<Text style={styles.rtlText}>
																{toFarsi(`ساعت:` + item.t_shoro_namayesh)}
															</Text>
														</View>
													</View>
													<View style={styles.textpart}>
														<View style={styles.textpart}>
															<Text style={styles.rtlText}>
																{toFarsi(item.cc + `‍‍‍‍‍سئوال`)}
															</Text>
														</View>
														<View style={styles.textpart}>
															<Text style={styles.rtlText}>
																{toFarsi(item.time_pasokh + `‍‍‍‍‍دقیقه`)}
															</Text>
														</View>
													</View>
													<View
														style={styles.textpart}
														style={{ flexDirection: 'column', flex: 1 }}
													>
														<View style={styles.textpart}>
															<Text style={styles.rtlText}>{item.tozihat}</Text>
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
										{item.namayesh_pasokh ? (
											<View style={styles.textpart} style={{ paddingTop: 20 }}>
												<FormButton
													buttonColor="#1f9efd"
													borderColor="white"
													fontSizeb={14}
													heightb={40}
													borderRadiusb={10}
													style={{ paddingTop: 0 }}
													backgroundColor="#e3f1fc"
													buttonType="outline"
													onPress={() => {
														const { navigate } = this.props.navigation;
														navigate('Exam', { examID: item.id, mode: 'pasokhname' });
													}}
													//disabled={!isValid }
													loading={this.state.isSubmitting}
													title="پاسخنــــامه"
												/>
											</View>
										) : null}
										{(item.show_nomre || global.ttype == 'administrator') && (
											<View style={styles.textpart} style={{ paddingTop: 20 }}>
												<FormButton
													buttonColor="#1f9efd"
													borderColor="white"
													fontSizeb={14}
													heightb={40}
													onPress={() => {
														const { navigate } = this.props.navigation;
														navigate('tahlil', { examID: item.id, mode: 'tahlil' });
													}}
													borderRadiusb={10}
													style={{}}
													backgroundColor="#e3f1fc"
													buttonType="outline"
													//onPress={handleSubmit}
													//disabled={!isValid }
													loading={this.state.isSubmitting}
													title=" نتیجه و تحلیل"
												/>
											</View>
										)}

										{(global.ttype == 'administrator' || global.ttype == 'teacher') && (
											<View style={styles.textpart} style={{ paddingTop: 20 }}>
												<FormButton
													onPress={() => {
														global.examEditID = item.id;
														//alert(global.examEditID);
														global.examID = item.id;

														global.examName == item.name;
														this.setState({
															barom_Visible: true
														});
													}}
													buttonColor="#1f9efd"
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
													title="عملیات آزمون"
												/>
											</View>
										)}

										{item.active == 'True' &&
										global.ttype == 'student' && (
											<View style={styles.textpart} style={{ paddingTop: 20 }}>
												<FormButton
													onPress={async () => {
														//global.examID = item.id;
														global.examName = item.name;
														const { navigate } = this.props.navigation;
														let res = await this.startExamAPI(item.id, 'start');
														if (res.result == '1')
															navigate('Exam', {
																examID: item.id,
																examName: item.name,
																mode: 'start'
															});
														else alert(res.message);
													}}
													buttonColor="#1f9efd"
													borderColor="white"
													fontSizeb={14}
													heightb={40}
													loading={this.state.loadingstartExam}
													borderRadiusb={10}
													style={{ marginTop: 0 }}
													backgroundColor="#e3f1fc"
													buttonType="outline"
													//onPress={handleSubmit}
													//disabled={!isValid }
													//	loading={this.state.isSubmitting}
													title="ورود به آزمون"
												/>
											</View>
										)}
									</View>
								</View>
							</View>
						);
					}}
				/>

				{(false && global.ttype == 'administrator') || global.ttype == 'teacher' ? (
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
							padding: 10,
							marginLeft: 20,
							marginRight: 20,
							backgroundColor: 'white'
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

									<Text style={styles.itemName}>{item.name}</Text>
								</View>
							)}
						/>
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
export default withNavigation(vclass);
