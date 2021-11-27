import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import { userInfo, toFarsi,encrypt, getHttpAdress } from '../components/DB';
import Loading from '../components/loading';

const events_data = [
	// {
	// 	title: 'Math',
	// 	startTime: genTimeBlock('WED', 9),
	// 	endTime: genTimeBlock('WED', 10, 50),
	// 	location: 'Classroom 403',
	// 	extra_descriptions: [ 'Kim', 'Lee' ]
	// },
	// {
	// 	title: 'Physics',
	// 	startTime: genTimeBlock('MON', 11),
	// 	endTime: genTimeBlock('MON', 12, 50),
	// 	location: 'Lab 404',
	// 	extra_descriptions: [ 'Einstein' ]
	// },

	// {
	// 	title: 'ریاضی تکمیلی',
	// 	startTime: genTimeBlock('SAT', 9),
	// 	endTime: genTimeBlock('SAT', 10, 50),
	// 	location: 'علیرضا شاهسوندس',
	// 	extra_descriptions: [ '۱۲:۳۴ الی ۱۳:۵۰' ]
	// },
	// {
	// 	title: 'ریاضی تکمیلی',
	// 	startTime: genTimeBlock('SAT', 11),
	// 	endTime: genTimeBlock('SAT', 12, 50),
	// 	location: 'علیرضا شاهسوندس',
	// 	extra_descriptions: [ '۱۲:۳۴ الی ۱۳:۵۰' ]
	// },
	// {
	// 	title: 'ریاضی تکمیلی',
	// 	startTime: genTimeBlock('SAT', 13, 12),
	// 	endTime: genTimeBlock('SAT', 14, 30),
	// 	location: '۱۲:۳۴ الی ۱۳:۵۰'
	// 	//	extra_descriptions: [ '۱۲:۳۴ الی ۱۳:۵۰' ]
	// },
	// {
	// 	title: 'ریاضی تکمیلی',
	// 	startTime: genTimeBlock('SAT', 15),
	// 	endTime: genTimeBlock('SAT', 16, 10),
	// 	location: 'علیرضا شاهسوندس',
	// 	extra_descriptions: [ '۱۲:۳۴ الی ۱۳:۵۰' ]
	// },

	// {
	// 	title: 'ریاضی تکمیلی',
	// 	startTime: genTimeBlock('MON', 15),
	// 	endTime: genTimeBlock('MON', 16, 10),
	// 	location: 'علیرضا شاهسوندس',
	// 	extra_descriptions: [ '۱۲:۳۴ الی ۱۳:۵۰' ]
	// },
	// {
	// 	title: 'Mandarin',
	// 	startTime: genTimeBlock('SUN', 14, 30),
	// 	endTime: genTimeBlock('SUN', 17, 50),
	// 	location: 'Language Center',
	// 	extra_descriptions: [ 'Chen' ]
	// },

	// {
	// 	title: 'Mandarin',
	// 	startTime: genTimeBlock('TUE', 9),
	// 	endTime: genTimeBlock('TUE', 10, 50),
	// 	location: 'Language Center',
	// 	extra_descriptions: [ 'Chen' ]
	// },
	// {
	// 	title: 'Japanese',
	// 	startTime: genTimeBlock('FRI', 9),
	// 	endTime: genTimeBlock('FRI', 10, 50),
	// 	location: 'Language Center',
	// 	extra_descriptions: [ 'Nakamura' ]
	// },
	// {
	// 	title: 'Club Activity',
	// 	startTime: genTimeBlock('THU', 9),
	// 	endTime: genTimeBlock('THU', 10, 50),
	// 	location: 'Activity Center'
	// },
	// {
	// 	title: 'Club Activity',
	// 	startTime: genTimeBlock('FRI', 13, 30),
	// 	endTime: genTimeBlock('FRI', 14, 50),
	// 	location: 'Activity Center'
	// }

	{
		title: 'doshanbe',
		startTime: genTimeBlock('MON', 9),
		endTime: genTimeBlock('MON', 10, 50),
		location: 'Classroom 403',
		extra_descriptions: [ 'Kim', 'Lee' ]
	},
	{
		title: 'charshanbe',
		startTime: genTimeBlock('WED', 9, 5),
		endTime: genTimeBlock('WED', 10, 50),
		location: 'Classroom 403',
		extra_descriptions: [ 'Kim', 'Lee' ]
	},
	{
		title: 'shanbe',
		startTime: genTimeBlock('SAT', 11),
		endTime: genTimeBlock('SAT', 11, 50),
		location: 'Lab 404',
		extra_descriptions: [ 'Einstein' ]
	},
	{
		title: 'seshanbe',
		startTime: genTimeBlock('TUE', 17),
		endTime: genTimeBlock('TUE', 18, 50),
		location: 'Lab 404',
		extra_descriptions: [ 'Einstein' ]
	},
	{
		endTime: '2020-07-09T09:20',

		location: '۱۲:۳۰ الی ۱۴:۳۰',
		startTime: '2020-07-09T07:30',
		title: 'ریاضیات گسسته'
	},
	{
		title: 'yekshanbe',
		startTime: genTimeBlock('SUN', 11),
		endTime: genTimeBlock('SUN', 11, 50),
		location: 'Lab 404',
		extra_descriptions: [ 'Einstein' ]
	},
	{
		endTime: " genTimeBlock('SAT',10,33)",
		location: '08:50-10:33',
		startTime: " genTimeBlock('SAT',8,50)",
		title: 'ریاضی ۴۴'
	}
];

export default class App extends Component {
	constructor(props) {
		super(props);
		this.numOfDays = 6;
		this.pivotDate = genTimeBlock('SAT', 0, 0);
		this.state = {
			sss: 1
		};
	}
	async componentDidMount() {
		this.loadAPI(this.page, 'pull');
	}
	loadAPI = async (page, type) => {
		//alert();
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
			'/pApi.asmx/getVclassWeek?currentPage=' +
			page +
			'&p=' +
			param +
			'&mode=' +
			this.state.selectedItem;
		if (page == 1) this.setState({ data: [] });
		////////console.log(uurl);
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

				var old = JSON.stringify(retJson).replace('/"', ''); //convert to JSON string
				var newArray = JSON.parse(old); //convert back to array
				console.log(old);
				this.setState({
					events_data: newArray,

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

	scrollViewRef = (ref) => {
		this.timetableRef = ref;
	};

	onEventPress = (evt) => {
		//Alert.alert('onEventPress', JSON.stringify(evt));
	};

	render() {
		if (!this.state.events_data) return <Loading />;
		//	console.log(events_data);

		//alert(this.state.events_data);
		return (
			<SafeAreaView style={{ flex: 1 }}>
				<View style={styles.container}>
					{/* <TimeTableView
						scrollViewRef={this.scrollViewRef}
						events={events_data}
						pivotTime={9}
						pivotEndTime={20}
						pivotDate={this.pivotDate}
						numberOfDays={this.numOfDays}
						onEventPress={this.onEventPress}
						headerStyle={styles.headerStyle}
						formatDateHeader="dddd"
						locale="ko"
					/> */}
					<TimeTableView
						scrollViewRef={this.scrollViewRef}
						events={this.state.events_data}
						pivotTime={7}
						pivotDate={this.pivotDate}
						numberOfDays={this.numOfDays}
						style={{ fontSize: 25 }}
						onEventPress={this.onEventPress}
						headerStyle={styles.headerStyle}
						formatDateHeader="dddd"
						locale="fa"
					/>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	headerStyle: {
		backgroundColor: '#fb8184',
		height: 44
		//	fontSize: 19
	},
	container: {
		flex: 1,
		backgroundColor: '#Fff'
	}
});
