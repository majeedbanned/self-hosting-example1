import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { Button, Dimensions, View } from 'react-native';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';
import Login from '../screen/Login';
import Messages from '../screen/messages';
import Menu from '../screen/menu';
import Page1 from '../screen/page1';
import Audio from '../screen/audio';
import Recorder from '../screen/recorder';

import Webinar from '../screen/webinar';
import Eventen from '../screen/eventen';

import Vclass from '../screen/vClass';
import GLOBAL from './global';
//import { NavigationEvents } from 'react-navigation';
//import Vclass from '../screen/vClass';
import * as SQLite from 'expo-sqlite';

import Modal from 'react-native-modal';
import SelectUser from '../screen/selectUser';
import Cal from '../screen/event';

import Database from '../components/database';
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

GenerateRandomNumber = () => {
	var RandomNumber = Math.floor(Math.random() * 100) + 1;

	this.setState({
		NumberHolder: RandomNumber
	});
};

let GenerateRandomNumber = () => {
	var RandomNumber = Math.floor(Math.random() * 100) + 1;

	this.setState({
		NumberHolder: RandomNumber
	});
};

const MusicRoute = () => {
	return <Login key={GenerateRandomNumber} />;
};

const MessageRoute = () => {
	return <Messages key="1" />;
};
const VclassRoute = () => <Vclass key="1" />;

const WebinarRoute = () => <Webinar key="1" />;
const HomeRoute = () => <Page1 key="1" />;
const EventRoute = (er) => {
	return <Cal />;
};

const EventenRoute = (er) => {
	return <Eventen />;
};

export default class MyComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isModalVisible: false,
			isAudioVisible: false,

			index: 0,
			//	routes: [],
			routes: [
				{ key: 'home', title: global.lang == 'fa' ? 'منو' : 'Menu', icon: 'home', color: '#1693A5' },

				{
					key: 'message',
					title: global.lang == 'fa' ? 'پیام ها' : 'Messages',
					icon: 'email-outline',
					iconcolor: 'green',
					color: '#48bdfe'
					//badge: '3'
				},
				{
					key: 'vclass',
					title: global.lang == 'fa' ? ' آزمون آنلاین' : 'Exams',
					icon: 'checkbox-marked-outline',
					iconcolor: 'red',
					color: '#a976fb'
				},

				{
					key: 'webinar',
					title: global.lang == 'fa' ? 'کلاس مجازی' : 'Classes',
					icon: 'television-play',
					color: '#ff8184'
				}
				// { key: 'event', title: global.lang == 'fa' ? 'رویداد' : 'Events', icon: 'calendar-range', color: '#3F51B5' }
				// { key: 'login', title: 'ورود', icon: 'qrcode-scan', color: '#019ac3' }
			]
		};

		this.props.navigation.addListener('willFocus', async () => {
			//this.loadAPI(1);
			//this.loadAPIBadge();
			// let results = await Database.executeSql('select * from users ', []);
			// if (results.rows.length == 0) {
			// 	GLOBAL.main.setState({ isModalVisible: true });
			// }
		});
	}

	componentDidMount() {
		if (global.lang == 'en')
			this.setState({
				routes: [
					{ key: 'home', title: global.lang == 'fa' ? 'منو' : 'Menu', icon: 'home', color: '#1693A5' },

					// {
					// 	key: 'message',
					// 	title: global.lang == 'fa' ? 'پیام ها' : 'Messages',
					// 	icon: 'email-outline',
					// 	iconcolor: 'green',
					// 	color: '#48bdfe'
					// 	//badge: '3'
					// },
					// {
					// 	key: 'vclass',
					// 	title: global.lang == 'fa' ? ' آزمون آنلاین' : 'Exams',
					// 	icon: 'checkbox-marked-outline',
					// 	iconcolor: 'red',
					// 	color: '#a976fb'
					// }

					// {
					// 	key: 'webinar',
					// 	title: global.lang == 'fa' ? 'کلاس مجازی' : 'Classes',
					// 	icon: 'television-play',
					// 	color: '#ff8184'
					// }
					{
						key: 'eventen',
						title: global.lang == 'fa' ? 'رویداد' : 'Events',
						icon: 'calendar-range',
						color: '#3F51B5'
					}
					// { key: 'login', title: 'ورود', icon: 'qrcode-scan', color: '#019ac3' }
				]
			});
	}

	_handleIndexChange = (index) => {
		this.props.navigation.setParams({
			title: 'gg'
		});
		this.setState({ index });

		if (index == 4) {
			try {
				GLOBAL.events.loadAPI();
			} catch (e) {}
		}
		console.log('d' + index);
		//this.setState({ isModalVisible: !this.state.isModalVisible });
	};

	_renderScene = BottomNavigation.SceneMap({
		home: HomeRoute
		//	albums: VclassRoute,
		//	recents: LoginRoute
	});
	renderScene = ({ route, jumpTo }) => {
		switch (route.key) {
			case 'eventen':
				return <EventenRoute jumpTo={jumpTo} />;

			case 'event':
				return <EventRoute jumpTo={jumpTo} />;
			case 'message':
				return <MessageRoute jumpTo={jumpTo} />;
			case 'home':
				return <HomeRoute jumpTo={jumpTo} />;

			case 'webinar':
				return <WebinarRoute jumpTo={jumpTo} />;
			case 'vclass':
				return <VclassRoute jumpTo={jumpTo} />;
		}
	};
	render() {
		GLOBAL.main = this;
		const { navigate } = this.props.navigation;
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;
		//alert();
		return (
			<View style={{ flex: 1 }}>
				<BottomNavigation
					shifting={true}
					barStyle={{ fontFamily: 'iransans' }}
					navigationState={this.state}
					onIndexChange={this._handleIndexChange}
					renderScene={this.renderScene}
					//style={{ borderWidth: 1 }}
				/>

				<Modal
					animationInTiming={0.1}
					animationOutTiming={0.1}
					backdropTransitionInTiming={0.1}
					backdropTransitionOutTiming={0.1}
					useNativeDriver={true}
					animationIn="fadeIn"
					animationOut="swing"
					animationIn="fadeIn"
					animationOut="slideOutRight"
					transparent={true}
					style={{ borderRadius: 25 }}
					hideModalContentWhileAnimating={true}
					deviceWidth={deviceWidth}
					deviceHeight={deviceHeight}
					onBackdropPress={() =>
						this.setState({
							isModalVisible: false
						})}
					onSwipeComplete={() =>
						this.setState({
							isModalVisible: false
						})}
					//swipeDirection={[ 'left' ]}
					isVisible={this.state.isModalVisible}
				>
					{/* <View style={{ flex: 1 }}> */}
					<View
						style={{
							flex: 1,

							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<View
							style={{
								borderRadius: 15,
								backgroundColor: '#f5faff',
								width: 350,
								height: 500
							}}
						>
							<SelectUser />
						</View>
					</View>
					{/* </View> */}
				</Modal>

				<Modal deviceWidth={deviceWidth} deviceHeight={deviceHeight} isVisible={this.state.isAudioVisible}>
					<View style={{ flex: 1 }}>
						{/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
						<Audio />
					</View>
				</Modal>

				<Modal deviceWidth={deviceWidth} deviceHeight={deviceHeight} isVisible={this.state.isRecorderVisible}>
					<View style={{ flex: 1 }}>
						{/* <Button title="Hide modal" onPress={this.toggleModal} /> */}
						<Recorder />
					</View>
				</Modal>

				{/* <NavigationEvents
      onWillFocus={payload => console.log('will focus', payload)}
      onDidFocus={payload => console.log('did focus', payload)}
      onWillBlur={payload => console.log('will blur', payload)}
      onDidBlur={payload => console.log('did blur', payload)}
    /> */}
			</View>
		);
	}
}
