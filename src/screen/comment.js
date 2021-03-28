import React, { Component } from 'react';
import { StyleSheet, Linking, ActivityIndicator, SafeAreaView, Button, Dimensions, Modal, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import defaultStyles from '../config/styles';
import { SearchBar } from 'react-native-elements';

import SlidingUpPanel from 'rn-sliding-up-panel';
import ImageViewer from 'react-native-image-zoom-viewer';

import Iconaw from 'react-native-vector-icons/FontAwesome';

import HTML from 'react-native-render-html';
import Loading from '../components/loading';
import DropdownAlert from 'react-native-dropdownalert';
import { withNavigation } from 'react-navigation';
import { FlatGrid } from 'react-native-super-grid';
import Icon from 'react-native-vector-icons/Ionicons';
import IconAnt from 'react-native-vector-icons/AntDesign';

import Mstyles from '../components/styles';
import FormButton from '../component/FormButton';
import ExamAdd from './examAdd';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import SelectUser from './selectUser';
import NetInfo from '@react-native-community/netinfo';
// import Modal, {
// 	ModalTitle,
// 	ModalContent,
// 	ModalFooter,
// 	ModalButton,
// 	SlideAnimation,
// 	ScaleAnimation
// } from 'react-native-modals';
import { userInfo, toFarsi, getHttpAdress, encrypt } from '../components/DB';
import { FlatList, ScrollView, Image, View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import GLOBAL from './global';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationEvents } from 'react-navigation';

const colorhead = '#47a1c4';
const colorlight = '#7be8a9';
const iconname_ = 'form';
const { height } = Dimensions.get('window');
class comment extends Component {
	constructor(props) {
		super(props);
		(this.page = 1),
			(this.state = {
				sort: '',
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
				dataLoading: false,
				images: []
			});

		this.props.navigation.addListener('willFocus', () => {
			//this.loadAPI(1, 'pull');
			this.loadAPI_grp(1, 'pull');
		});
	}
	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;

		return {
			headerTitle: 'مشاهده پیام',
			headerRight: () => null,
			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransansbold',
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
			//alert(state.isConnected);
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			//return;
		}
		/* #endregion */

		const { navigation } = this.props;
		this.messageid = navigation.getParam('messageid');
		this.tab = navigation.getParam('tab');

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress + '/pApi.asmx/getMessageid?currentpage=' + this.messageid + '&p=' + param + '&g=' + this.tab;
		'' + '&mode=list';
		let hash = encrypt(uurl);
		uurl = uurl + '&hash=' + hash;

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
				//alert(retJson[0].onvan);
				this.setState({
					onvan: retJson[0].onvan,
					matn: retJson[0].matn,
					sendername: retJson[0].img,

					date_: retJson[0].date_,
					time_: retJson[0].time_,
					image1: retJson[0].image1,

					image2: retJson[0].image2,
					image3: retJson[0].image3,

					image4: retJson[0].image4,
					file1: retJson[0].file1,
					file2: retJson[0].file2,

					ico1: this.icon(retJson[0].file1),
					ico2: this.icon(retJson[0].file2),
					isdel: retJson[0].isdel,
					isedit: retJson[0].isedit,
					isadd: retJson[0].isadd
				});
				console.log(getHttpAdress() + 'media/' + this.state.image1);
				this.loadAPI(this.examID, 'pull');

				if (retJson[0].hasOwnProperty('isstar')) {
					if (retJson[0].isstar == null) {
						//	alert();
						this.setState({ stared: 0 });
						return;
					}

					if (retJson[0].isstar == 1) {
						//	alert(retJson[0].isstar);

						this.setState({ stared: 1 });
					} else if (retJson[0].isstar == 0) this.setState({ stared: 0 });
				} else this.setState({ stared: 3 });

				// if (this.state.cat.length != 0) {
				// 	this.setState({
				// 		selectedItem: this.state.cat[0].id
				// 	});

				// 	//alert(this.examID);

				// }
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
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			//return;
		}
		/* #endregion */
		const { navigation } = this.props;
		this.messageid = navigation.getParam('messageid');

		this.setState({ loading: true });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/getMessagecomment?currentpage=' +
			this.messageid +
			'&p=' +
			param +
			'&g=' +
			this.page +
			'&sort=' +
			this.state.sort +
			'&q=' +
			this.state.searchText;
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
				//console.log('ret:' + retJson);
				this.setState(
					{
						//data: []
					}
				);
				this.setState({
					data: this.page === 1 ? retJson : [ ...this.state.data, ...retJson ],

					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
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
		return <ActivityIndicator style={{ color: 'red' }} size="large" />;
	};
	_handleLoadMore = () => {
		if (!this.state.isLoading) {
			this.page = this.page + 1;
			this.loadAPI(this.page, 'more');
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
			this.setState({ issnackin: true });
			return;
		}

		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/delMessageCommentID?p=' + param + '&id=' + id;
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

	starapi = async (id, index) => {
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
		let uurl = global.adress + '/pApi.asmx/MessagestarID?p=' + param + '&id=' + this.messageid;
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
				//alert();
				//alert(retJson.result);
				if (retJson.result == '1') this.setState({ stared: 1 });
				else this.setState({ stared: 0 });

				// let newimagesAddFile = this.state.data;
				// //alert(index);
				// newimagesAddFile.splice(index, 1); //to remove a single item starting at index
				// this.setState({ data: newimagesAddFile });
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
					style={{ paddingBottom: 4, borderWidth: 0, marginTop: 4, marginRight: 4, marginLeft: 4 }}
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
										(this.state.dataLoading && <ActivityIndicator />)}
								</View>
							</TouchableOpacity>
						);
					}}
				/>
				<View style={{ flexDirection: 'row' }}>
					<TouchableOpacity
						onPress={() => {
							this.setState({ sort: '1' });
							this.loadAPI(1, '');
						}}
					>
						<Text
							style={{
								fontSize: 11,
								fontFamily: 'iransans',
								marginTop: 10,
								marginRight: 15,
								marginLeft: 15
							}}
						>
							به ترتیب الفبا
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => {
							this.setState({ sort: '2' });
							this.loadAPI(1, '');
						}}
					>
						<Text style={{ fontSize: 11, fontFamily: 'iransans', marginTop: 10, marginRight: 15 }}>
							جدیدترین
						</Text>
					</TouchableOpacity>

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

					{this.state.isadd == 1 && (
						<TouchableOpacity
							onPress={() => {
								const { navigate } = this.props.navigation;

								navigate('eforms', {
									eformsID: 34,
									instanseID: 0,
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true',
									extra: this.messageid
								});
							}}
							activeOpacity={0.6}
							style={{ marginTop: 0, marginEnd: 15 }}
						>
							<Iconaw name={'comment-o'} size={25} color="#ccc" />
						</TouchableOpacity>
					)}
				</View>
			</View>
		);
	};

	handleimgclick1 = (img1, img2) => {
		//console.log(getHttpAdress().replace(':8080', '') + 'azmoon/' + ax);
		this.setState({ images: [] });

		//if (img1 !='') {
		let image5 = [];

		if (img1 != '') {
			image5.push({ url: getHttpAdress() + 'media/' + img1, props: {} });
		}
		if (img2 != '') {
			image5.push({ url: getHttpAdress() + 'media/' + img2, props: {} });
		}
		this.setState((prevState) => ({
			images: image5
		}));
		setTimeout(async () => {
			this.setState({
				//show_pdf: true,
				isModalVisible: true
			});
		}, 200);
	};
	handleimgclick = (ax) => {
		//console.log(getHttpAdress().replace(':8080', '') + 'azmoon/' + ax);
		this.setState({ images: [] });
		{
			//alert(this.state.image3);

			let image5 = [];
			if (ax == 1) {
				if (this.state.image1 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image1, props: {} });
				}
				if (this.state.image2 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image2, props: {} });
				}
				if (this.state.image3 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image3, props: {} });
				}
				if (this.state.image4 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image4, props: {} });
				}
			}
			if (ax == 2) {
				if (this.state.image2 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image2, props: {} });
				}
				if (this.state.image1 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image1, props: {} });
				}
				if (this.state.image3 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image3, props: {} });
				}
				if (this.state.image4 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image4, props: {} });
				}
			}
			if (ax == 3) {
				if (this.state.image3 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image3, props: {} });
				}
				if (this.state.image2 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image2, props: {} });
				}
				if (this.state.image1 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image1, props: {} });
				}

				if (this.state.image4 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image4, props: {} });
				}
			}
			if (ax == 4) {
				if (this.state.image4 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image4, props: {} });
				}
				if (this.state.image2 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image2, props: {} });
				}
				if (this.state.image1 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image1, props: {} });
				}
				if (this.state.image3 != '') {
					image5.push({ url: getHttpAdress() + 'media/' + this.state.image3, props: {} });
				}
			}
			this.setState((prevState) => ({
				images: image5
			}));
		}
		// {
		// 	this.state.image2 != '' &&
		// 		this.setState((prevState) => ({
		// 			images: [ ...this.state.images, { url: getHttpAdress() + 'media/' + this.state.image2, props: {} } ]
		// 		}));
		// }
		// this.setState({
		// 	images: [ ...this.state.images, { url: getHttpAdress() + 'media/' + this.state.image1, props: {} } ]
		// });
		// this.setState({
		// 	images: [ ...this.state.images, { url: getHttpAdress() + 'media/' + this.state.image2, props: {} } ]
		// });

		setTimeout(async () => {
			this.setState({
				//show_pdf: true,
				isModalVisible: true
			});
		}, 200);
	};

	icon(ico) {
		try {
			let ext = ico.split('.')[1].toLowerCase();
			//alert(ext);
			if (ext == 'xls') return 'file-excel-o';
			else if (ext == 'pdf') return 'file-pdf-o';
			else if (ext == 'doc') return 'file-word-o';
			else if (ext == 'jpg') return 'file-picture-o';
			else if (ext == 'mp4') return 'file-video-o';
			else return 'file-o';
		} catch (e) {
			return 'file-o';
		}
	}
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

		if (!this.state.onvan) {
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
		//alert();
		return (
			<View style={Mstyles.container}>
				<View
					style={{
						flexDirection: 'column',
						alignItems: 'flex-start',
						backgroundColor: 'white',
						margin: 10,
						padding: 10
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						{this.state.stared != 3 && (
							<TouchableOpacity
								onPress={() => {
									this.starapi();
								}}
								activeOpacity={0.6}
								style={{ marginTop: 5, marginBottom: 10, marginRight: 15 }}
							>
								{this.state.stared == 1 ? (
									<Iconaw name={'star'} size={30} color="#FFD700" />
								) : (
									<Iconaw name={'star-o'} size={30} color="#ccc" />
								)}
							</TouchableOpacity>
						)}
						{this.state.isadd == 1 && (
							<TouchableOpacity
								onPress={() => {
									const { navigate } = this.props.navigation;

									navigate('eforms', {
										eformsID: 34,
										instanseID: 0,
										stdID: 0,
										mode: 'view',
										isAdminForms: 'true',
										extra: this.messageid
									});
								}}
								activeOpacity={0.6}
								style={{ marginTop: 5, marginBottom: 10 }}
							>
								<Iconaw name={'comment-o'} size={30} color="#ccc" />
							</TouchableOpacity>
						)}
					</View>
					<Text
						style={{
							textAlign: 'left',
							direction: 'rtl',
							fontFamily: 'iransans',
							borderWidth: 0.5,
							padding: 4,
							borderRadius: 15

							//justifyContent: 'flex-start'
						}}
					>
						{this.state.sendername}
					</Text>

					<Text
						style={{
							marginTop: 20,
							marginBottom: 10,

							textAlign: 'left',
							direction: 'rtl',
							fontFamily: 'iransans',
							fontSize: 18
						}}
					>
						{this.state.onvan}
					</Text>

					<HTML
						html={
							'<span style="text-align:left;direction:rtl;font-family:iransans;font-size:15;line-height:35px" >' +
							this.state.matn +
							'</span>'
						}
					/>

					{/* <Text style={{ textAlign: 'left', direction: 'rtl' }}>{this.state.matn}</Text> */}
					<Text
						style={{
							marginTop: 10,
							fontSize: 12,
							fontFamily: 'iransans',
							textAlign: 'left',
							direction: 'rtl'
						}}
					>
						{toFarsi(this.state.date_ + ' ' + this.state.time_)}
					</Text>
					{/* <Text style={{ textAlign: 'left', direction: 'rtl' }}>{this.state.time_}</Text> */}
				</View>

				<View
					style={{
						//	justifyContent: 'space-around',
						flexDirection: 'column',
						backgroundColor: 'white',
						margin: 3,
						padding: 10,
						height: 150
					}}
				>
					<Text style={{ fontFamily: 'iransans', textAlign: 'left' }}>عکس های الصاقی</Text>

					<View style={{ flex: 1, borderWidth: 0, width: '100%', flexDirection: 'row' }}>
						{/* <TouchableOpacity
							style={{
								flex: 1,
								borderWidth: 1,
								borderRadius: 15,
								width: '50%',
								paddingBottom: 5,
								paddingTop: 5,
								borderWidth: 0,
								alignSelf: 'center'
							}}
							onPress={() => alert()}
						> */}
						{this.state.image1 != '' && (
							<TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleimgclick(1)}>
								<Image
									style={[ styles.contain, {} ]}
									resizeMode="contain"
									source={{ uri: getHttpAdress() + 'media/' + this.state.image1 + '' }}
								/>
							</TouchableOpacity>
						)}
						{this.state.image2 != '' && (
							<TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleimgclick(2)}>
								<Image
									style={[ styles.contain, {} ]}
									resizeMode="contain"
									source={{ uri: getHttpAdress() + 'media/' + this.state.image2 + '' }}
								/>
							</TouchableOpacity>
						)}
						{this.state.image3 != '' && (
							<TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleimgclick(3)}>
								<Image
									style={[ styles.contain, {} ]}
									resizeMode="contain"
									source={{ uri: getHttpAdress() + 'media/' + this.state.image3 + '' }}
								/>
							</TouchableOpacity>
						)}
						{this.state.image4 != '' && (
							<TouchableOpacity style={{ flex: 1 }} onPress={() => this.handleimgclick(4)}>
								<Image
									style={[ styles.contain, {} ]}
									resizeMode="contain"
									source={{ uri: getHttpAdress() + 'media/' + this.state.image4 + '' }}
								/>
							</TouchableOpacity>
						)}
						{/* </Touc
						{/* </TouchableOpacity> */}
					</View>
				</View>

				<View
					style={{
						justifyContent: 'space-around',
						//flexDirection: 'row',
						flexDirection: 'column',
						backgroundColor: 'white',
						margin: 3,
						padding: 10,
						height: 100
					}}
				>
					<Text style={{ fontFamily: 'iransans', textAlign: 'left' }}> فایل الصاقی</Text>
					<View style={{ flex: 1, borderWidth: 0, width: '100%', flexDirection: 'row' }}>
						{this.state.file1 != '' && (
							<View style={{ flex: 1 }}>
								<TouchableOpacity
									style={{ flex: 1 }}
									onPress={() => {
										console.log(getHttpAdress() + 'media/' + this.state.file1);
										Linking.openURL(getHttpAdress() + 'media/' + this.state.file1);
									}}
								>
									<Iconaw name={this.state.ico1} size={45} color="#ccc" />
								</TouchableOpacity>
							</View>
						)}
						{this.state.file2 != '' && (
							<View style={{ flex: 1 }}>
								<TouchableOpacity
									style={{ flex: 1 }}
									onPress={() => {
										console.log(getHttpAdress() + 'media/' + this.state.file2);
										Linking.openURL(getHttpAdress() + 'media/' + this.state.file2);
									}}
								>
									<Iconaw name={this.state.ico2} size={45} color="#ccc" />
								</TouchableOpacity>
							</View>
						)}
					</View>
				</View>

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

				{/* <TouchableOpacity onPress={() => this._panel.show()}>
					<Text
						Style={{
							flex: 1,
							width: '100%',
							textAlign: 'center',
							fontFamily: 'iransans',
							fontSize: 14,
							borderWidth: 1,
							alignItems: 'center'
						}}
					>
						لیست پاسخ ها
					</Text>
				</TouchableOpacity> */}
				<SlidingUpPanel
					style={{}}
					draggableRange={{ top: height / 1.25, bottom: 120 }}
					ref={(c) => (this._panel = c)}
				>
					{/* <View style={[ styles.container1 ]}>allowDragging={false} */}
					{/* <Text>Here is the content inside panel</Text> */}
					{(dragHandler) => (
						<View style={[ styles.container1, { borderTopEndRadius: 15, borderTopStartRadius: 15 } ]}>
							<View
								style={[
									styles.dragHandler,
									{
										backgroundColor: 'white',
										borderTopEndRadius: 15,
										borderTopStartRadius: 15,
										backgroundColor: '#eee'
									}
								]}
								{...dragHandler}
							>
								<Text style={{ fontFamily: 'iransans' }}>لیست پاسخ ها</Text>
							</View>
							<FlatList
								ref={(ref) => {
									this.flatListRef = ref;
								}}
								ListHeaderComponent={this.renderHeader}
								stickyHeaderIndices={[ 0 ]}
								ListFooterComponent={this._renderFooter}
								onScroll={this.onScroll}
								initialNumToRender={10}
								contentContainerStyle={{ flexGrow: 1 }}
								ListEmptyComponent={
									<View
										style={{
											//flex: 1,
											//	marginTop: 30,
											alignItems: 'center',
											justifyContent: 'center'
										}}
									>
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
													لیست خالی است
												</Text>
											)}
										</View>
									</View>
								}
								onEndReachedThreshold={0.4}
								onEndReached={this._handleLoadMore.bind(this)}
								refreshControl={
									<RefreshControl
										refreshing={this.state.isRefreshing}
										onRefresh={this.onRefresh.bind(this)}
									/>
								}
								style={[ Mstyles.contentList, { borderWidth: 0, width: '100%' } ]}
								columnWrapperStyle={styles.listContainer}
								data={this.state.data}
								keyExtractor={(item) => item.id.toString()}
								// keyExtractor={(item) => {
								// 	return item.id;
								// }}
								renderItem={({ item, index }) => {
									return (
										// <TouchableOpacity
										// 	onPress={() => {
										// 		Linking.openURL(item.url);
										// 		//const { navigate } = this.props.navigation;
										// 		//global.eformsID = item.id;
										// 		//navigate('eforms', { eformsID: item.id, mode: 'add' });
										// 	}}
										// 	activeOpacity={0.8}
										// 	style={{
										// 		//height: 68,
										// 		borderRadius: 13,
										// 		margin: 10
										// 	}}
										// >
										<View style={[ styles.mainpanel, styles.gradient ]}>
											<View
												style={{
													borderWidth: 0,
													flex: 1,
													flexDirection: 'row',
													marginStart: 0
												}}
											>
												<View style={styles.view1}>
													<View style={styles.view2}>
														<View style={styles.view31}>
															<Image
																style={[ styles.imageavatar, { margin: 5 } ]}
																source={{
																	uri:
																		getHttpAdress() +
																		'child/' +
																		item.sender_id +
																		'.jpg'
																}}
															/>
														</View>
														<View style={[ styles.view4 ]}>
															<Text style={[ styles.aztitle, { color: colorhead } ]}>
																{item.sendername}
															</Text>
															<Text style={[ styles.aztitle, { color: 'black' } ]}>
																{item.matn}
															</Text>
															<View
																style={{
																	flexDirection: 'row-reverse',
																	justifyContent: 'space-around',
																	marginBottom: 10
																}}
															>
																<View
																	style={{
																		flexDirection: 'row-reverse',
																		justifyContent: 'space-between',
																		//borderWidth: 1,
																		flex: 1
																	}}
																>
																	{item.image1 != '' && (
																		<TouchableOpacity
																			activeOpacity={0.6}
																			onPress={() =>
																				this.handleimgclick1(
																					item.image1,
																					item.image2
																				)}
																		>
																			<Iconaw
																				name={'file-picture-o'}
																				size={30}
																				color="#ccc"
																			/>
																		</TouchableOpacity>
																	)}
																	{item.image2 != '' && (
																		<TouchableOpacity
																			activeOpacity={0.6}
																			onPress={() =>
																				this.handleimgclick1(
																					item.image2,
																					item.image1
																				)}
																		>
																			<Iconaw
																				name={'file-picture-o'}
																				size={30}
																				color="#ccc"
																			/>
																		</TouchableOpacity>
																	)}
																	{item.file1 != '' && (
																		<TouchableOpacity
																			activeOpacity={0.6}
																			onPress={() => {
																				Linking.openURL(
																					getHttpAdress() +
																						'media/' +
																						item.file1
																				);
																			}}
																		>
																			<Iconaw
																				name={this.state.ico1}
																				size={30}
																				color="#ccc"
																			/>
																		</TouchableOpacity>
																	)}
																</View>
																<View
																	style={{
																		flexDirection: 'row',
																		flex: 1
																		//borderWidth: 1
																	}}
																>
																	{item.sender_id == global.username &&
																	this.state.isdel == true && (
																		<TouchableOpacity
																			activeOpacity={0.6}
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
																				size={22}
																				color="#bbb"
																				style={{ marginLeft: 15, marginTop: 5 }}
																			/>
																		</TouchableOpacity>
																	)}
																	{item.sender_id == global.username &&
																	this.state.isedit == true && (
																		<TouchableOpacity
																			activeOpacity={0.6}
																			onPress={() => {
																				const {
																					navigate
																				} = this.props.navigation;

																				navigate('eforms', {
																					eformsID: 34,
																					instanseID: item.id,
																					stdID: 0,
																					mode: 'view',
																					isAdminForms: 'true',
																					extra: item.id
																				});
																			}}
																		>
																			<Ionicons
																				name="ios-create"
																				size={22}
																				color="#bbb"
																				style={{ marginLeft: 15, marginTop: 5 }}
																			/>
																		</TouchableOpacity>
																	)}
																	<Text
																		style={{
																			fontFamily: 'iransans',
																			fontSize: 12,
																			textAlign: 'center',
																			marginTop: 10,
																			color: '#808080'
																		}}
																	>
																		{toFarsi(item.date_ + ' ' + item.time_)}
																	</Text>
																</View>
															</View>
														</View>

														{/* {global.ttype == 'administrator' ||
														(item.access.indexOf(global.username) > -1 && ( */}
														{false &&
														global.ttype == 'administrator' && (
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
															</TouchableOpacity>
														)}
														{/* ))} */}
													</View>
												</View>
											</View>
										</View>
										// </TouchableOpacity>
									);
								}}
							/>
							<View style={{ height: 130, backgroundColor: 'red' }} />

							{/* <Button title="Hide" onPress={() => this._panel.hide()} /> */}
						</View>
					)}
				</SlidingUpPanel>

				<Modal visible={this.state.isModalVisible} transparent={true}>
					<ImageViewer
						onSwipeDown={() => {
							this.setState({ isModalVisible: false });
						}}
						enableSwipeDown={true}
						imageUrls={this.state.images}
					/>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	view4: {
		paddingStart: 10,
		paddingEnd: 10,

		backgroundColor: '#eee',
		borderRadius: 10,
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
		shadowColor: '#f6fbff',
		shadowOffset: {
			width: 3,
			height: 3
		},
		//shadowOpacity: 0.37,
		//shadowRadius: 2.49,
		//elevation: 1,
		borderRadius: 13,
		zIndex: 0,
		//elevate: 0,
		marginTop: -10,
		marginLeft: 15,
		marginRight: 15,
		height: 70,
		flexDirection: 'column',
		backgroundColor: '#f6fbff'
	},
	gradient: {
		borderRadius: 13,
		left: 0,
		right: 0,
		backgroundColor: '#ffffff',
		top: 0,
		zIndex: 1,
		elevation: 2,
		//height: 85,
		flexDirection: 'column'
	},
	mainpanel: {
		zIndex: 1,
		elevation: 2,
		shadowColor: '#ddd',
		borderRadius: 13,
		margin: 10
		// shadowOffset: {
		// 	width: 1,
		// 	height: 1
		// },
		// shadowOpacity: 0.67,
		// shadowRadius: 2.49
	},
	aztitle: {
		width: '100%',
		alignSelf: 'center',
		fontFamily: 'iransans',
		textAlign: 'left',
		borderWidth: 0,
		marginTop: 3,
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
	contain: {
		flex: 1,
		width: '100%',
		height: 150,
		borderWidth: 1,
		margin: 5,
		//width: 250,

		borderWidth: 0,

		shadowOffset: {
			width: 1,
			height: 2
		},
		width: '100%',
		shadowOpacity: 0.57,
		shadowRadius: 2.49
		//borderWidth: 1,
		//borderColor: 'red'
	},
	imageavatar: {
		width: 40,
		height: 40,
		borderRadius: 40,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	gridView: {
		marginTop: 2,
		flex: 1
	},

	container1: {
		flex: 1,
		zIndex: 1,
		marginRight: 3,
		//height: 500,
		borderWidth: 0,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',

		shadowOffset: {
			width: 1,
			height: 2
		},
		width: '100%',
		shadowOpacity: 0.57,
		shadowRadius: 2.49
	},
	dragHandler: {
		alignSelf: 'stretch',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ccc'
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
export default withNavigation(comment);
