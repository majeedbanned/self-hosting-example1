import React, { Component } from 'react';
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
	ScrollView
} from 'react-native';

// import { I18nManager} from 'react-native';
// I18nManager.allowRTL(false);
// I18nManager.forceRTL(false);
import { SearchBar } from 'react-native-elements';

import axios from 'axios';
export default class Craigslist extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			loadingMore: false,
			page: 1,
			isLoading: false,
			modalVisible: false,
			userSelected: [],
			data: []
		};
		this.arrayholder = [];
		let arch = '';
	}

	componentDidMount() {
		// this.getSurfaces();
		this.arch = '';
		this.loadAPI(1);
	}
	clickEventListener = (item) => {
		Alert.alert('Message', 'Item clicked. ' + item.name);
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
		this.setState({ isLoading: true });
		// if(this.state.value!='')
		// this.setState({page:1});
		console.log('http://192.168.1.12:8080/pApi.asmx/getSchList?pageitem=15&page=' + page + '&q=' + this.arch);
		fetch(global.adress + '/pApi.asmx/getSchList?pageitem=15&page=' + page + '&q=' + this.arch)
			.then((response) => response.json())
			.then((responseText) => {
				this.setState({
					data: page === 1 ? responseText : [ ...this.state.data, ...responseText ],
					//data: responseText
					isLoading: false
				});

				this.arrayholder = this.state.data;
			})
			.catch((err) => {
				console.log('Error fetching the feed: ', err);
			});
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
		console.log('this.state.value');
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
	_renderFooter = () => {
		if (!this.state.loadingMore) return null;

		return (
			<View
				style={{
					position: 'relative',
					width: '100%',
					height: '100%',
					paddingVertical: 20,
					borderTopWidth: 0,
					marginTop: 3,
					marginBottom: 0
					// borderColor: 'red'
				}}
			>
				<ActivityIndicator animating size="large" />
			</View>
		);
	};
	render() {
		if (!this.state.data) return null;

		return (
			<View style={styles.container}>
				<FlatList
					ListFooterComponent={this._renderFooter}
					onEndReached={this._handleLoadMore}
					onEndReachedThreshold={0.5}
					initialNumToRender={10}
					onRefresh={() => this.onRefresh()}
					refreshing={this.state.isLoading}
					style={styles.contentList}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					ListHeaderComponent={this.renderHeader}
					stickyHeaderIndices={[ 0 ]}
					keyExtractor={(item) => {
						return item.id;
					}}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								style={styles.card}
								onPress={() => {
									this.clickEventListener(item);
								}}
							>
								<Image style={styles.image} source={{ uri: item.image }} />
								<View style={styles.cardContent}>
									<Text style={styles.name}>{item.name}</Text>
									<Text style={styles.count}>{item.count}</Text>
									<TouchableOpacity
										style={styles.followButton}
										onPress={() => this.clickEventListener(item)}
									>
										<Text style={styles.followButtonText}> سلام</Text>
									</TouchableOpacity>

									<TouchableOpacity
										style={styles.followButton}
										onPress={() => this.clickEventListener(item)}
									>
										<Text style={styles.followButtonText}>Explore now</Text>
									</TouchableOpacity>
								</View>
							</TouchableOpacity>
						);
					}}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 5,
		backgroundColor: '#ebf0f7'
	},
	contentList: {
		flex: 1
	},
	cardContent: {
		marginLeft: 20,
		marginTop: 10
	},
	image: {
		width: 90,
		height: 90,
		borderRadius: 45,
		borderWidth: 2,
		borderColor: '#ebf0f7'
	},

	card: {
		shadowColor: '#00000021',
		shadowOffset: {
			width: 0,
			height: 6
		},
		shadowOpacity: 0.37,
		shadowRadius: 2.49,
		elevation: 3,

		marginLeft: 20,
		marginRight: 20,
		marginTop: 20,
		backgroundColor: 'white',
		padding: 10,
		flexDirection: 'row',
		borderRadius: 20
	},

	name: {
		fontSize: 13,
		flex: 1,
		alignSelf: 'center',
		color: '#3399ff',
		fontWeight: 'bold'
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
	}
});
