/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import IconA from 'react-native-vector-icons/AntDesign';

import NetInfo from '@react-native-community/netinfo';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import Loading from '../components/loading';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

export default class Example extends Component {
	constructor(props) {
		super(props);
		this.std = props.std1;
		this.coursecode = props.coursecode;
		this.groupcode = props.groupcode;

		this.onEventPress = this.onEventPress.bind(this);
		this.renderSelected = this.renderSelected.bind(this);
		this.renderDetail = this.renderDetail.bind(this);

		this.data = [
			{
				time: '09:00',
				title: 'Archery Training',
				description:
					'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ',
				lineColor: '#009688',
				//icon: require('../img/archery.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240340/c0f96b3a-0fe3-11e7-8964-fe66e4d9be7a.jpg'
			},
			{
				time: '10:45',
				title: 'Play Badminton',
				description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.',
				// icon: require('../img/badminton.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240405/0ba41234-0fe4-11e7-919b-c3f88ced349c.jpg'
			},
			{
				time: '12:00',
				title: 'Lunch'
				// icon: require('../img/lunch.png'),
			},
			{
				time: '14:00',
				title: 'Watch Soccer',
				description: 'Team sport played between two teams of eleven players with a spherical ball. ',
				lineColor: '#009688',
				//icon: require('../img/soccer.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240419/1f553dee-0fe4-11e7-8638-6025682232b1.jpg'
			},
			{
				time: '16:30',
				title: 'Go to Fitness center',
				description: 'Look out for the Best Gym & Fitness Centers around me :)',
				// icon: require('../img/dumbbell.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
			},
			{
				time: '16:30',
				title: 'Go to Fitness center',
				description: 'Look out for the Best Gym & Fitness Centers around me :)',
				// icon: require('../img/dumbbell.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
			},
			{
				time: '16:30',
				title: 'Go to Fitness center',
				description: 'Look out for the Best Gym & Fitness Centers around me :)',
				// icon: require('../img/dumbbell.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
			},
			{
				time: '16:30',
				title: 'Go to Fitness center',
				description: 'Look out for the Best Gym & Fitness Centers around me :)',
				// icon: require('../img/dumbbell.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
			},
			{
				time: '16:30',
				title: 'Go to Fitness center',
				description: 'Look out for the Best Gym & Fitness Centers around me :)',
				// icon: require('../img/dumbbell.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
			},
			{
				time: '16:30',
				title: 'Go to Fitness center',
				description: 'Look out for the Best Gym & Fitness Centers around me :)',
				// icon: require('../img/dumbbell.png'),
				imageUrl:
					'https://cloud.githubusercontent.com/assets/21040043/24240422/20d84f6c-0fe4-11e7-8f1d-9dbc594d0cfa.jpg'
			}
		];
		this.state = { data: [], selected: null };
	}
	async componentDidMount() {
		//this.loadAPI_grp(this.page, 'pull');
		this.loadDiary();
	}
	onEventPress(data) {
		this.setState({ selected: data });
	}

	loadDiary = async (value, type) => {
		//alert();
		// const { navigation } = this.props;
		// this.coursecode = navigation.getParam('coursecode');
		// this.classcode = navigation.getParam('classcode');

		if (global.adress == 'undefined') {
			//	GLOBAL.main.setState({ isModalVisible: true });
		}
		/* #region  check internet */
		let state = await NetInfo.fetch();
		if (!state.isConnected) {
			//this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
			//return;
		}
		/* #endregion */

		//	this.setState({ loadsheet: false });
		let param = userInfo();
		let uurl =
			global.adress +
			'/pApi.asmx/loadDiary?id=1' +
			'&p=' +
			param +
			'&std=' +
			this.std +
			'&coursecode=' +
			this.coursecode +
			'&groupcode=' +
			this.groupcode;

		console.log(uurl);
		try {
			const response = await fetch(uurl);
			if (response.ok) {
				let retJson = await response.json();
				if (Object.keys(retJson).length == 0) {
					this.setState({
						//	data: [],
						loading: false,
						dataLoading: false,
						isRefreshing: false
					});
					return;
				}
				//console.log('ret:' + retJson);

				//alert();
				// if (!retJson[0].days) {
				// 	this.setState({ loadsheet: true, maindata: this.state.maindata });
				// 	return;
				// }

				// this.setState({
				// 	data: []
				// });
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					data: retJson
					// dataLoading: false,
					// loadsheet: true,
					// isRefreshing: false,
					// loading: false
				});
				try {
					///	this.mindate = this.state.maindata[0].days[0].day;
					//this.maxdate = this.state.maindata[0].days[this.state.maindata[0].days.length - 1].day;
				} catch (e) {}
				// alert(this.state.maindata[0].days[0].day);
				// alert(this.state.maindata[0].days[].day);
			}
		} catch (e) {
			console.log('err');
			//	this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				dataLoading: false,
				isRefreshing: false
			});
			return;
		}
	};

	renderSelected() {
		if (true)
			return (
				<Text style={{ marginTop: 10, textAlign: 'center' }}>
					تاریخچه ارزشیابی
					{/* Selected event: {this.state.selected.title} at {this.state.selected.time} */}
				</Text>
			);
	}

	renderDetail(rowData, sectionID, rowID) {
		let title = <Text style={[ styles.title ]}>{rowData.title}</Text>;

		title = (
			<View style={styles.view4}>
				<Text style={[ styles.aztitle, { color: 'black', marginTop: 15 } ]}>{rowData.title}</Text>

				{rowData.ax == undefined &&
				rowData.scoreid == '9999' && (
					<Text numberOfLines={1} style={[ styles.aztitle, { paddingTop: 4, color: 'black' } ]}>
						{toFarsi(rowData.cap)}
					</Text>
				)}

				{rowData.scoreid != '0' &&
				rowData.scoreid != '9999' && (
					<Text style={[ styles.aztitle, { paddingTop: 4, color: 'black' } ]}>
						{toFarsi(rowData.arzv) + ' ' + toFarsi(rowData.arzvf)}
					</Text>
				)}

				{rowData.ax != undefined && (
					<View
						style={[
							{
								paddingTop: 4,
								color: 'black',
								flexDirection: 'row'
							}
						]}
					>
						<IconA name="picture" size={25} style={[ styles.actionButtonIcon, {} ]} />
					</View>
				)}

				{rowData.az != '0' && (
					<Text style={[ styles.aztitle, { paddingTop: 4, color: 'black' } ]}>
						{toFarsi(rowData.cap + ' از ' + rowData.az)}
					</Text>
				)}
			</View>
		);

		var desc = null;
		if (rowData.description && rowData.imageUrl)
			desc = (
				<View style={styles.descriptionContainer}>
					<Image source={{ uri: rowData.imageUrl }} style={styles.image} />
					<Text style={[ styles.textDescription ]}>{rowData.description}</Text>
				</View>
			);

		return (
			<View style={{ flex: 1 }}>
				{title}
				{desc}
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				{this.renderSelected()}
				<Timeline
					style={styles.list}
					data={this.state.data}
					circleSize={20}
					columnFormat="single-column-Left"
					circleColor="rgba(0,0,0,0)"
					lineColor="rgb(45,156,219)"
					timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
					timeStyle={{
						textAlign: 'center',
						backgroundColor: '#ff9797',
						color: 'white',
						padding: 5,
						borderRadius: 13
					}}
					descriptionStyle={{ color: 'gray' }}
					options={{
						style: { paddingTop: 5 }
					}}
					innerCircle={'icon'}
					onEventPress={this.onEventPress}
					renderDetail={this.renderDetail}
					separator={false}
					detailContainerStyle={{
						marginBottom: 20,
						paddingLeft: 5,
						paddingRight: 5,
						backgroundColor: '#BBDAFF',
						borderRadius: 10
					}}
					columnFormat="single-column-right"
					columnFormat="two-column"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		padding: 20,
		paddingTop: 5,
		backgroundColor: 'white'
	},
	list: {
		flex: 1,
		marginTop: 20
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	descriptionContainer: {
		flexDirection: 'row',
		paddingRight: 50
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	textDescription: {
		marginLeft: 10,
		color: 'gray'
	}
});
