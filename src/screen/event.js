import React, { Component } from 'react';
import GLOBAL from './global';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LocaleConfig, Agenda } from 'react-native-calendars-persian';
import NetInfo from '@react-native-community/netinfo';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import { Snackbar } from 'react-native-paper';

import ActionButton from 'react-native-action-button';

const testIDs = require('../components/testIDs');
LocaleConfig.locales['fa'] = {
	monthNames: [
		'far',
		'ordi',
		'خرداد',
		'Avril',
		'Mai',
		'Juin',
		'Juillet',
		'Août',
		'Septembre',
		'Octobre',
		'Novembre',
		'Décembre'
	],
	monthNamesShort: [
		'far.',
		'ordi.',
		'خرداد',
		'Avril',
		'Mai',
		'Juin',
		'Juil.',
		'Août',
		'Sept.',
		'Oct.',
		'Nov.',
		'Déc.'
	],
	dayNames: [ 'یک شنبه', 'yekshanbe', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi' ],
	dayNamesShort: [ 'یک شنبه', 'دوشنبه', 'سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه', 'شنبه' ]
};

LocaleConfig.defaultLocale = 'fa';

class AgendaScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: {},
			roy: {
				'2020-08-09': [
					{ title: 'ee', name: 'آزمون ریاضی از فصل سوم گرفته مtیشود' },
					{ name: 'آزمون ریاضی از فصل سوم گرفته میشود' }
				],
				'2020-08-12': [ { name: 'کلاس مجازی هدایت تحصیلی-ورود آزاد', height: 80 } ],
				'2020-07-03': [ { name: 'کلاس مجازی هدایت تحصیلی-ورود آزاد', height: 80 } ],

				'2020-07-07': [ { name: 'آزمون میان ترم فیزیک' }, { name: 'شروع مسابقات قرآن' } ]
			}
		};

		this.props.navigation.addListener('willFocus', () => {
			//alert();
			this.loadAPI(1, 'pull');
			//this.loadAPI_grp(1, 'pull');
		});
	}
	async componentDidMount() {
		this.loadAPI(1, '');
	}

	APIDel = async (eid, index) => {
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
		let uurl = global.adress + '/pApi.asmx/delEvent?eid=' + eid + '&p=' + param; //+

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
				this.loadAPI();
				//this.setState({ issnack: true, msg: retJson.msg });

				//let newimagesAddFile = this.state.data;
				//alert(index);
				//newimagesAddFile.splice(index, 1); //to remove a single item starting at index
				//this.setState({ data: newimagesAddFile });

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

	loadAPI = async (page, type) => {
		//	alert('d');
		//	return;
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
		let uurl = global.adress + '/pApi.asmx/taghvim?id=' + '1' + '&p=' + param + '&g=' + this.state.selectedItem;
		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					//	alert()
					this.setState({
						roy: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);
				this.setState({
					roy: []
				});
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					roy: retJson,
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

	render() {
		GLOBAL.events = this;
		return (
			<React.Fragment>
				<Agenda
					jalali={true}
					firstDay={6}
					testID={testIDs.agenda.CONTAINER}
					// items={this.state.items}
					loadItemsForMonth={this.loadItems.bind(this)}
					items={this.state.roy}
					theme={{
						textDayFontFamily: 'iransans',
						textMonthFontFamily: 'iransans',
						textDayHeaderFontFamily: 'iransans',
						textDayFontSize: 14,
						textMonthFontSize: 10,
						textDayHeaderFontSize: 14
					}}
					renderEmptyData={() => {
						return null;
					}}
					onRefresh={() => this.loadAPI(1, '')}
					renderItem={this.renderItem.bind(this)}
					renderEmptyDate={this.renderEmptyDate.bind(this)}
					rowHasChanged={this.rowHasChanged.bind(this)}
					// markingType={'period'}
					// markedDates={{
					//    '2017-05-08': {textColor: '#43515c'},
					//    '2017-05-09': {textColor: '#43515c'},
					//    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
					//    '2017-05-21': {startingDay: true, color: 'blue'},
					//    '2017-05-22': {endingDay: true, color: 'gray'},
					//    '2017-05-24': {startingDay: true, color: 'gray'},
					//    '2017-05-25': {color: 'gray'},
					//    '2017-05-26': {endingDay: true, color: 'gray'}}}
					// monthFormat={'yyyy'}
					// theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
					//renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
					// hideExtraDays={false}
				/>
				{(true && global.ttype == 'administrator') || global.ttype == 'teacher' ? (
					<ActionButton
						offsetX={15}
						offsetY={15}
						useNativeDriver
						position="left"
						buttonColor="rgba(231,76,60,1)"
					>
						<ActionButton.Item
							buttonColor="#9b59b6"
							title="تعریف رویداد "
							textStyle={{ fontFamily: 'iransans' }}
							onPress={() => {
								global.examEditID = '';

								const { navigate } = this.props.navigation;
								//27429
								navigate('eforms', {
									eformsID: 16,
									instanseID: '',
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true'
								});
							}}
						>
							<Icon name="edit" style={styles.actionButtonIcon} />
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
			</React.Fragment>
		);
	}

	loadItems(day) {
		setTimeout(() => {
			for (let i = -15; i < 85; i++) {
				const time = day.timestamp + i * 24 * 60 * 60 * 1000;
				const strTime = this.timeToString(time);
				if (!this.state.items[strTime]) {
					this.state.items[strTime] = [];
					const numItems = Math.floor(Math.random() * 3 + 1);
					for (let j = 0; j < numItems; j++) {
						this.state.items[strTime].push({
							name: 'Item for ' + strTime + ' #' + j,
							height: Math.max(50, Math.floor(Math.random() * 150))
						});
					}
				}
			}
			const newItems = {};
			Object.keys(this.state.items).forEach((key) => {
				newItems[key] = this.state.items[key];
			});
			this.setState({
				items: newItems
			});
		}, 1000);
	}

	renderItem(item) {
		return (
			<TouchableOpacity
				key={item.id}
				activeOpacity={0.8}
				testID={testIDs.agenda.ITEM}
				style={[
					styles.item,
					{ height: item.height },
					item.usertype == 'modir' ? { backgroundColor: '#f5fcff', color: 'white' } : {}
				]}
				//onPress={() => Alert.alert(item.name)}
			>
				<View style={{ flexDirection: 'row' }}>
					<Text
						style={{
							//borderWidth: 1,
							fontSize: 11,
							fontWeight: 'bold',
							color: '#eb5e0b',
							fontFamily: 'iransans',
							textAlign: 'left'
						}}
					>
						{item.teachername}
					</Text>
					<Text
						style={{
							//borderWidth: 1,
							fontSize: 11,
							color: '#575757',
							fontFamily: 'iransans',
							textAlign: 'left'
						}}
					>
						{' [' + item.coursename + ']:'}
					</Text>
				</View>

				<Text style={{ fontFamily: 'iransans', textAlign: 'left' }}>{item.name}</Text>
				{item.teachercode == global.username && (
					<View style={{ flexDirection: 'row-reverse' }}>
						<TouchableOpacity
							onPress={() => {
								Alert.alert(
									' اخطار',
									'آیا مایل به حذف رویداد هستید؟',
									[
										{
											text: 'خیر',
											// onPress: () => {
											// 	this.setState({
											// 		barom_Visible: false
											// 	});
											// },
											style: 'cancel'
										},
										{
											text: 'بله',
											onPress: () => {
												this.APIDel(item.id);
											}
										}
									],
									{ cancelable: false }
								);
							}}
						>
							<Icon name="delete" color="green" size={18} style={[ styles.actionButtonIcon, {} ]} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								global.examEditID = '';

								const { navigate } = this.props.navigation;
								//27429
								navigate('eforms', {
									eformsID: 16,
									instanseID: item.id,
									stdID: 0,
									mode: 'view',
									isAdminForms: 'true'
								});
							}}
						>
							<Icon name="edit" size={18} style={[ styles.actionButtonIcon, { marginRight: 30 } ]} />
						</TouchableOpacity>
					</View>
				)}
			</TouchableOpacity>
		);
	}

	renderEmptyDate() {
		return (
			<View style={styles.emptyDate}>
				<Text>This is empty date!</Text>
			</View>
		);
	}

	rowHasChanged(r1, r2) {
		return r1.name !== r2.name;
	}

	timeToString(time) {
		const date = new Date(time);
		return date.toISOString().split('T')[0];
	}
}

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 17
	},
	emptyDate: {
		height: 15,
		flex: 1,
		paddingTop: 30
	},
	actionButtonIcon: {
		fontSize: 20,
		height: 22,
		color: 'gray'
	}
});

export default withNavigation(AgendaScreen);
