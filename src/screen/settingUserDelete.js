import React, { Component } from 'react';
import SwiperFlatList from 'react-native-swiper-flatlist';
import * as Font from 'expo-font';
import { withNavigation } from 'react-navigation';
import { I18nManager, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import { HelloChandu, _getcount, getQuery, _query, _fetch, _connected } from '../components/DB';

import { AppLoading } from 'expo';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts } from '@use-expo/font';
import { Ionicons, AntDesign, Entypo } from '@expo/vector-icons';
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
	TouchableWithoutFeedback,
	FlatList,
	Dimensions,
	Alert,
	ScrollView
} from 'react-native';
import Database from '../components/database';
import ActionBarImage from '../components/ActionBarImage';

import NetInfo from '@react-native-community/netinfo';
import DropdownAlert from 'react-native-dropdownalert';
import { SearchBar } from 'react-native-elements';
//import * as SQLite from 'expo-sqlite';
import GLOBAL from './global';
import axios from 'axios';

import * as SQLite from 'expo-sqlite';
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

//import { getAvailableLocationProviders } from 'react-native-device-info';
// I18nManager.allowRTL(true);
// I18nManager.forceRTL(true);
class settingUserDelete extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontLoaded: false,
			value: '',
			loadingMore: false,
			page: 1,
			isLoading: false,
			modalVisible: false,
			userSelected: [],
			data: [ { id: 1, username: 's' } ]
		};

		this.arrayholder = [];
		let arch = '';
	}
	static navigationOptions = {
		//To set the header image and title for the current Screen
		title: 'لیست کاربران',
		//Title
		// headerLeft: <ActionBarImage />,
		//Image in Navigation Bar

		headerStyle: {
			backgroundColor: 'red'
			//Background Color of Navigation Bar
		},

		headerTintColor: '#606070'
		//Text Color of Navigation Bar
	};

	async _loadAssets() {
		await Font.loadAsync({
			'Inter-Black': require('./../../assets/IRANSansMobile.ttf')
		});
		console.log('your fonts loaded!');
		this.setState({ fontLoaded: true });
	}
	async componentDidMount() {
		await this._loadAssets();

		// await Font.loadAsync({
		// 	iransans: require('./../../assets/IRANSansMobile.ttf')
		// });
		//this.getSurfaces();
		const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

		//const db = SQLite.openDatabase('db');
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM users', [], (tx, results) => {
				var temp = [];
				for (let i = 0; i < results.rows.length; ++i) {
					temp.push(results.rows.item(i));
				}
				console.log(temp.length);
				this.setState({
					data: temp
				});
			});
		});

		this.arch = '';
		this.loadAPI(1);
	}
	clickEventListener = (item) => {
		global.username = item.username;
		global.password = item.password;
		global.schoolcode = item.schoolcode;
		//** */	global.adress = 'http://' + item.adress + ':8080';
		global.adress = 'http://192.168.1.15:8080';

		global.firstname = item.firstname;
		global.lastname = item.lastname;
		(global.schoolname = item), schoolname;
		global.ttype = item.ttype;
		const { navigate } = this.props.navigation;
		GLOBAL.ActionBarImage.setState({
			avatarSrc: global.adress + '/upload/' + global.schoolcode + '/child/' + global.username + '.jpg'
		});
		GLOBAL.main.setState({ isModalVisible: false });

		//GLOBAL.message.page=1;//(this.page, 'pull');
		try {
			GLOBAL.page1.loadAPI(1);
		} catch (e) {}
		try {
			GLOBAL.message.loadAPI(1, 'pull');
		} catch (e) {}

		try {
			GLOBAL.vclass.loadAPI(1, 'pull');
		} catch (e) {}
		//global.avatar = global.adress + '/upload/' + global.schoolcode + '/child/' + global.username + '.jpg';

		//navigate('Main');
		//Alert.alert('Message', 'Item clicked. ' + item.username);
	};
	onRefresh() {
		this.setState({ page: 1 });
		this.loadAPI(1);
	}
	_handleLoadMore = () => {
		this.setState(
			(prevState, nextProps) => ({
				page: prevState.page + 1,
				loadingMore: true
			}),
			() => {
				this.loadAPI(this.state.page);
			}
		);
	};
	loadAPI = (page) => {
		// this.setState({ isLoading: true });
		// /* #region user exist  */
		// let results =  Database.executeSql('select * from users', []);
		// if (results.rows.length > 0) {
		// 	var len = results.rows.length;
		// 	for (let i = 0; i < len; i++) {
		// 		let row = results.rows.item(i);
		// 		//console.log(`Record: ${row.username}`);
		// 		//this.setState({record: row});
		// 		this.setState({ data: row });
		// 	}
		// 	//console.log(this.state.data);
		// 	//return;
		// }
		/* #endregion */
	};

	loadAPImore = () => {
		setTimeout(() => {
			this.setState({ loadingMore: false });
		}, 1000);
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
		this.loadAPI(1);
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
	deleteapi = async (username, schoolcode) => {
		const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

		//	const db = SQLite.openDatabase('db');
		db.transaction((tx) => {
			tx.executeSql(
				'delete from users  where username=? and schoolcode=?',
				[ username, schoolcode ],
				(tx, rs) => {},
				(tx, err) => {
					console.log(err);
				}
			);
		});

		this.loadfromdb();
	};

	loadfromdb = async () => {
		const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

		//const db = SQLite.openDatabase('db');
		db.transaction((tx) => {
			tx.executeSql('SELECT * FROM users', [], (tx, results) => {
				var temp = [];
				for (let i = 0; i < results.rows.length; ++i) {
					temp.push(results.rows.item(i));
				}
				console.log(temp.length);
				this.setState({
					data: temp
				});
			});
		});

		this.arch = '';
	};

	render() {
		GLOBAL.selectUser = this;
		console.log('rege');
		// let [fontsLoaded] = useFonts({
		//     'Inter-Black': require('./../../assets/IRANSansMobile.ttf'),
		//   });
		if (!this.state.fontLoaded) {
			return <AppLoading />;
		} else if (!this.state.data) return <AppLoading />;
		else
			// 	return (
			// 		<View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
			// 			<Text style={{ textAlign: 'center' }}>اطلاعاتی برای نمایش وجود ندارد</Text>
			// 			<DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
			// 		</View>
			// 	);
			return (
				<View style={styles.container}>
					{/* <Text
						style={{
							fontFamily: 'iransansbold',
							textAlign: 'left',
							paddingLeft: 10
						}}
					>
						انتخاب کاربر
					</Text> */}
					<ScrollView>
						<FlatList
							keyExtractor={(item, index) => String(index)}
							style={styles.contentList}
							columnWrapperStyle={styles.listContainer}
							data={this.state.data}
							// keyExtractor={(item) => {
							// 	return item.id;
							// }}
							renderItem={({ item, index }) => {
								// console.log(
								// 	'http://' +
								// 		item.adress +
								// 		':8080/upload/' +
								// 		item.schoolcode +
								// 		'/child/' +
								// 		item.username +
								// 		'.jpg'
								// );
								return (
									<TouchableWithoutFeedback
										activeOpactity={1.9}
										key={index}
										onPress={() => {
											//	this.clickEventListener(item);
										}}
									>
										<View style={styles.card}>
											<View
												style={{
													flexDirection: 'row',
													height: 50
												}}
											>
												<TouchableWithoutFeedback
													activeOpactity={1.9}
													key={index}
													onPress={() => {
														Alert.alert(
															'حذف کاربر',
															'آیا مایل به حدف کاربر هستید؟',
															[
																{
																	text: 'خیر',
																	onPress: () => console.log('Cancel Pressed'),
																	style: 'cancel'
																},
																{
																	text: 'بله',
																	onPress: () => {
																		this.deleteapi(item.username, item.schoolcode);
																	}
																}
															],
															{ cancelable: false }
														);
													}}
												>
													<Icon
														name="delete"
														style={{
															fontSize: 30,
															height: 32,
															marginEnd: 20,
															marginStart: 10,
															marginTop: 10
														}}
													/>
												</TouchableWithoutFeedback>
												<Image
													style={styles.imageavatar}
													source={{
														uri:
															item.adress +
															'/upload/' +
															item.schoolcode +
															'/child/' +
															item.username +
															'.jpg'
													}}
												/>
												<View style={{ flexDirection: 'column', alignSelf: 'center' }}>
													<Text
														style={{
															paddingTop: 10,
															fontFamily: 'iransans',
															alignSelf: 'center',
															padding: 5
														}}
													>
														{item.firstname + ' ' + item.lastname}
													</Text>
													<Text
														style={{
															alignSelf: 'flex-start',
															fontSize: 10,
															marginTop: -10,
															fontFamily: 'iransans',
															padding: 5
														}}
													>
														{item.schoolname + ' - '}
														{item.ttype == 'student' && 'دانش آموز'}
														{item.ttype == 'teacher' && 'معلم'}
														{item.ttype == 'administrator' && 'مدیر'}
													</Text>
												</View>
											</View>
											<View style={{ flex: 1 }} />
										</View>
									</TouchableWithoutFeedback>
								);
							}}
						/>
					</ScrollView>
				</View>
			);
	}
}
export const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 15,
		paddingBottom: 15,
		borderRadius: 25,
		//borderWidth: 1,
		//borderColor: 'red',
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
		height: 50,
		borderRadius: 10,
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
export default withNavigation(settingUserDelete);
