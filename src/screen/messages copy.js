import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation';
//import SwiperFlatList from 'react-native-swiper-flatlist';
import * as Font from 'expo-font';
import { I18nManager, Platform, Button } from 'react-native';
//import Swiper from 'react-native-swiper';
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

import axios from 'axios';
// I18nManager.allowRTL(true);
// I18nManager.forceRTL(true);
import Modal from 'react-native-modal';
import SelectUser from '../screen/selectUser';
import { fromBinary } from 'uuid-js';

import Swiper from '../components/swiper';
import InViewPort from '../components/inViewport';
import VideoPlayer from '../components/VideoPlayer';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

let hasScrolled = false;
class messages extends Component {
	constructor(props) {
		super(props);
		this.page = 1;
		this.state = {
			images: {},
			muted: false,
			paused: true,
			currentIndex: 0,

			refreshing: false,
			isModalVisible: false,
			value: '',
			//loadingMore: false,

			loading: false, // user list loading
			isRefreshing: false, //for pull to refresh
			//page: 1,
			//isLoading: false,
			modalVisible: false,
			userSelected: [],
			data: []
		};
		this.arrayholder = [];
		let arch = '';
	}
	onChangeImage = (index) => {
		console.log('currentIndex ', index);
		this.setState({ currentIndex: index });
	};
	componentDidUpdate() {
		console.log('update');
	}

	async componentDidMount() {
		//this.fetchUser(this.page) //Method for API call
		await Font.loadAsync({
			iransans: require('./../../assets/IRANSansMobile.ttf')
		});
		this.arch = '';
		this.loadAPI(this.page, 'pull');
	}
	// async componentDidMount() {

	// }
	clickEventListener = (item) => {
		//Alert.alert('Message', 'Item clicked. ' + item.name);
	};
	// onRefresh() {
	// 	this.setState({ page: 1 });
	// 	this.loadAPI(1,'pull');
	// }

	async onRefresh() {
		this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator

		let param = userInfo();

		let uurl = global.adress + '/pApi.asmx/getMessageList?currentPage=' + '1' + '&p=' + param;
		//console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						//: false,
						isRefreshing: false
						//::loadingMore: false
					});
					return;
				}
				////////// sccess
				let data = retJson;
				this.setState({
					//	data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					data: data,
					isRefreshing: false
					//::loadingMore: false
				});
				this.page = 1;
				//console.log(data);
			}
		} catch (e) {
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				//isSubmitting: false,
				isRefreshing: false
				//loadingMore: false
			});
			return;
		}
	}

	_handleLoadMore = () => {
		if (!this.state.isLoading) {
			this.page = this.page + 1; // increase page by 1
			//this.fetchUser(this.page); // method for API call
			this.loadAPI(this.page, 'more');
		}
	};

	handleLoadMore = () => {
		//	if(!this.state.hasScrolled){ return null; }
		if (!hasScrolled) {
			return null;
		}
		if (this.state.isLoading) return null;
		if (this.state.loadingMore) return null;

		this.setState(
			(prevState, nextProps) => ({
				page: prevState.page + 1
				//loadingMore: true
			}),
			() => {
				this.loadAPI(this.state.page, 'more');
			}
		);
	};
	onScroll = () => {
		//this.setState({hasScrolled: true})
		hasScrolled = true;
	};

	loadAPI = async (page, type) => {
		if (global.adress != 'undefined') {
		}

		/* #region  check internet */

		// let state = await NetInfo.fetch();
		// if (!state.isConnected) {
		// 	this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');

		// 	return;
		// }
		/* #endregion */

		//if(type=='pull')
		this.setState({ loading: true });
		//else if(type=='more')
		//this.setState({ loadingMore: true });

		hasScrolled = false;
		let param = userInfo();

		let uurl = global.adress + '/pApi.asmx/getMessageList?currentPage=' + page + '&p=' + param;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						//: false,
						loading: false
						//::loadingMore: false
					});
					console.log('zereshk');
					return;
				}
				////////// sccess
				//let listData = this.state.data;
				//let data = listData.concat(retJson) . //concate list with response
				//console.log(retJson);
				this.setState({
					data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					//data: data ,
					loading: false
					//::loadingMore: false
				});
				//console.log(data);
			}
		} catch (e) {
			console.log('err');
			this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				//isSubmitting: false,
				loading: false
				//loadingMore: false
			});
			return;
		}
	};

	renderHeader = () => {
		return (
			<SearchBar
				placeholder="Type Here..."
				lightTheme
				round
				onChangeText={(text) => this.searchFilterFunction(text)}
				autoCorrect={false}
				value={this.state.value}
			/>
		);
	};
	searchFilterFunction = (text) => {
		this.setState({
			value: text,
			page: 1
		});
		this.arch = text;
		//console.log('this.state.value');
		//**this.loadAPI(1);
		// console.log(this.arrayholder.length.toString()+ ' - '+this.state.data.length.toString());

		// const newData = this.arrayholder.filter(item => {
		//   const itemData = `${item.name}`

		//   const textData = text.toUpperCase();

		//   return itemData.indexOf(textData) > -1;
		// });
		// this.setState({
		//   data: newData,
		// });
	};
	_renderFooter = () => {
		//::if (!this.state.loadingMore) return null;
		if (!this.state.isLoading) return null;
		return (
			// <View
			// 	style={{
			// 		position: 'relative',
			// 		width: '100%',
			// 		height: '100%',
			// 		paddingVertical: 20,
			// 		borderTopWidth: 0,
			// 		marginTop: 3,
			// 		marginBottom: 0
			// 	}}
			// >
			<ActivityIndicator style={{ color: 'red' }} size="large" />
			// </View>
		);
	};

	toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
		this.onRefresh();
	};

	render() {
		// if (this.state.data.length == 0 )

		// 	return (
		// 		<ScrollView
		// 			contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
		// 			refreshControl={
		// 				<RefreshControl
		// 					refreshing={this.state.refreshing}
		// 					onRefresh={() => this.onRefresh()}
		// 					title=""
		// 				/>
		// 			}
		// 		>
		// 			<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white' }}>
		// 				<Text style={{ alignSelf: 'center', flex: 1, fontFamily: 'iransans', textAlign: 'center' }}>
		// 					اطلاعاتی برای نمایش وجود ندارد
		// 				</Text>
		// 				<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
		// 			</View>
		// 		</ScrollView>
		// 	);

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
			<View style={styles.container}>
				<FlatList
					ListFooterComponent={this._renderFooter}
					//onEndReached={this._handleLoadMore}

					onScroll={this.onScroll}
					initialNumToRender={10}
					onEndReachedThreshold={0.4}
					onEndReached={this._handleLoadMore.bind(this)}
					refreshControl={
						<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh.bind(this)} />
					}
					//onRefresh={() => this.onRefresh()}
					//refreshing={this.state.isLoading}
					style={styles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					//ListHeaderComponent={this.renderHeader}
					//stickyHeaderIndices={[ 0 ]}
					keyExtractor={(item) => {
						return item.id;
					}}
					renderItem={({ item }) => {
						let items = Array.apply(null, Array()).map((v, i) => {
							return {
								id: i,
								caption: i + 1,
								source: { uri: 'http://placehold.it/200x200?text=' + (i + 1) },
								dimension: '{ width: 150, height: 150 }'
							};
						});

						return (
							<View style={styles.DefaultView}>
								<Swiper showsPagination={true} onIndexChanged={this.onChangeImage} index={0}>
									{items.map((item, key) => {
										if (key == 1 || key == 5) {
											return (
												<VideoPlayer
													key={key}
													index={key}
													currentIndex={this.state.currentIndex}
												/>
											);
										} else {
											return (
												<Image
													resizeMode="contain"
													style={{ width: screenWidth, height: screenHeight }}
													source={item.source}
													key={key}
												/>
											);
										}
									})}
								</Swiper>
							</View>
						);

						return (
							<View style={styles.card}>
								<View style={{ flexDirection: 'row', height: 40 }}>
									<Image
										style={styles.imageavatar}
										source={{ uri: getHttpAdress() + 'child/' + item.sender_ID + '.jpg' }}
									/>
									<View style={{ flexDirection: 'column', alignSelf: 'center', flex: 2 }}>
										<Text
											style={{
												paddingTop: 15,
												fontFamily: 'iransans',
												//alignSelf: 'start',
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

										{/* <Menu>
											<MenuTrigger text="Select action" />
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

									<Menu>
										<MenuTrigger>
											{/* <TouchableOpacity>
											</TouchableOpacity> */}
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
									</Menu>
								</View>
								<View style={{ flex: 1 }}>
									{item.elsaghi != '' && (
										<Swiper
											onIndexChanged={(index) => {
												console.log(item.elsaghi.split('|')[index]);
											}}
											paginationStyle={{
												flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse'
											}}
											loop={false}
											style={styles.wrapper}
											showsButtons={false}
										>
											{item.elsaghi.split('|').map((data) => {
												let ext = data.split('.')[data.split('.').length - 1].toLowerCase();
												//console.log(getHttpAdress() + 'media/' + data );
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
																source={{ uri: getHttpAdress() + 'media/' + data }}
															/>
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
																//shouldPlay
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
														//if()
														<View key={data} style={styles.slide1}>
															<Text style={styles.text}>{data}</Text>
														</View>

														// <View>
														// 	<Text>{data.time}</Text>
														// </View>
													);
											})}
										</Swiper>
									)}

									<View style={styles.cardContent}>
										<View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
											<TouchableOpacity>
												<Entypo name="forward" size={27} style={styles.forward} />
											</TouchableOpacity>
											<TouchableOpacity>
												<AntDesign name="message1" size={27} style={styles.massage} />
											</TouchableOpacity>
											<Ionicons size={27} style={styles.space} />

											<Ionicons name="md-attach" size={33} style={styles.attach} />

											<TouchableOpacity>
												<Ionicons name="ios-heart-empty" size={35} style={styles.heart} />
											</TouchableOpacity>
										</View>
										<Text style={styles.name}>{item.title}</Text>
									</View>
								</View>
							</View>
						);
					}}
				/>
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
		marginEnd: 13,
		color: '#aaa',
		alignSelf: 'center'
	},
	forward: {
		flex: 1,
		paddingEnd: 10,
		color: '#aaa',
		paddingStart: 15
	},

	container: {
		flex: 1,
		marginTop: 5,
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

		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		backgroundColor: 'white',
		padding: 10,

		borderRadius: 20
	},

	name: {
		fontSize: 14,
		flex: 1,
		fontFamily: 'iransans',
		textAlign: 'left',
		alignSelf: 'stretch',

		paddingStart: 0,
		color: '#3399ff'
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
		borderRadius: 20,
		marginTop: 10,
		flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse',
		height: 320,
		paddingBottom: 40
	},
	slide1: {
		borderRadius: 20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#9DD6EB',
		marginBottom: 10
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
