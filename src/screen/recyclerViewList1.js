import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { RecyclerListView, DataProvider } from 'recyclerlistview';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';

import { DataCall } from '../utils/DataCall';
import { LayoutUtil } from '../utils/LayoutUtil';
import { ImageRenderer } from '../component/ImageRenderer';
import { ViewSelector } from '../component/ViewSelector';

export default class recyclerViewList1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataProvider: new DataProvider((r1, r2) => {
				return r1 !== r2;
			}),
			layoutProvider: LayoutUtil.getLayoutProvider(0),
			images: [],
			count: 2,
			viewType: 0
		};
		this.inProgressNetworkReq = false;
	}
	componentWillMount() {
		this.fetchMoreData();
	}

	loadAPI = async (storyID) => {
		// if (global.adress == 'undefined') {
		// 	GLOBAL.main.setState({ isModalVisible: true });
		// }
		/* #region  check internet */
		// let state = await NetInfo.fetch();
		// if (!state.isConnected) {
		// 	this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'لطفا دسترسی به اینترنت را چک کنید');
		// 	return;
		// }
		/* #endregion */

		this.setState({ loading: true });
		let param = userInfo();
		let uurl = global.adress + '/pApi.asmx/fetchStory?p=' + param + '&id=' + storyID + '&url=' + global.adress;
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
				return retJson;
				//console.log(retJson);
				this.setState({
					//data: page === 1 ? retJson : [ ...this.state.data, ...retJson ],
					data: retJson,

					loading: false,
					dataLoading: false,
					isRefreshing: false
				});
			}
		} catch (e) {
			console.log('err');
			//this.dropDownAlertRef.alertWithType('error', 'پیام', 'خطادر دستیابی به اطلاعات');
			this.setState({
				loading: false,
				dataLoading: false,
				isRefreshing: false
			});
			return;
		}
	};
	async fetchMoreData() {
		if (!this.inProgressNetworkReq) {
			const { navigation } = this.props;
			const storyID = navigation.getParam('storyID');
			//const mode = navigation.getParam('mode');

			//To prevent redundant fetch requests. Needed because cases of quick up/down scroll can trigger onEndReached
			//more than once
			this.inProgressNetworkReq = true;
			//const images = await DataCall.get(this.state.count, 20);
			//global.storyID
			let res = await this.loadAPI(storyID);
			//alert(res);
			const images = res;
			// const images = [
			// 	'https://images.dog.ceo/breeds/husky/20180901_150234.jpg',
			// 	'https://images.dog.ceo/breeds/husky/20180904_185604.jpg',
			// 	'https://images.dog.ceo/breeds/husky/20180924_193829.jpg',
			// 	'https://images.dog.ceo/breeds/husky/MsMilo_Husky1.jpg',
			// 	'https://images.dog.ceo/breeds/husky/n02110185_10047.jpg',
			// 	'https://images.dog.ceo/breeds/husky/n02110185_10116.jpg',
			// 	'https://images.dog.ceo/breeds/husky/n02110185_10171.jpg',
			// 	'https://images.dog.ceo/breeds/husky/n02110185_10175.jpg'
			// ];
			this.inProgressNetworkReq = false;
			this.setState({
				dataProvider: this.state.dataProvider.cloneWithRows(this.state.images.concat(images)),
				images: this.state.images.concat(images),
				count: this.state.count + 1
			});
		}
	}
	rowRenderer = (type, data) => {
		//We have only one view type so not checks are needed here
		return <ImageRenderer imageUrl={data} />;
	};
	viewChangeHandler = (viewType) => {
		//We will create a new layout provider which will trigger context preservation maintaining the first visible index
		this.setState({
			layoutProvider: LayoutUtil.getLayoutProvider(viewType),
			viewType: viewType
		});
	};
	handleListEnd = () => {
		this.fetchMoreData();
		//This is necessary to ensure that activity indicator inside footer gets rendered. This is required given the implementation I have done in this sample
		this.setState({});
	};
	renderFooter = () => {
		//Second view makes sure we don't unnecessarily change height of the list on this event. That might cause indicator to remain invisible
		//The empty view can be removed once you've fetched all the data
		return this.inProgressNetworkReq ? (
			<ActivityIndicator style={{ margin: 10 }} size="large" color={'black'} />
		) : (
			<View style={{ height: 60 }} />
		);
	};

	render() {
		//Only render RLV once you have the data
		return (
			<View style={styles.container}>
				<ViewSelector viewType={this.state.viewType} viewChange={this.viewChangeHandler} />
				{this.state.count > 0 ? (
					<RecyclerListView
						style={{ flex: 1 }}
						contentContainerStyle={{ margin: 3 }}
						//	onEndReached={this.handleListEnd}
						dataProvider={this.state.dataProvider}
						layoutProvider={this.state.layoutProvider}
						renderAheadOffset={0}
						rowRenderer={this.rowRenderer}
						renderFooter={this.renderFooter}
					/>
				) : null}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'space-between'
	}
});
