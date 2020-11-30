import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
//import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//let items = [];
export default class Example extends Component {
	state = {
		isLoading: true,
		items: []
	};
	componentDidMount() {
		// this.getSurfaces();
		this.loadAPI();
	}
	_handleRefresh = () => {
		//this.loadAPI();
	};
	loadAPI = () => {
		this.setState({ isLoading: true });
		fetch('http://192.168.1.15:8080/papi.asmx/mobileMainScreen?test=d')
			.then((response) => response.json())
			.then((responseText) => {
				this.setState({ items: responseText });
				this.setState({
					isLoading: false
				});
				console.log(this.state.items);
			})
			.catch((err) => {
				console.log('Error fetching the feed: ', err);
			});
	};

	onRefresh() {
		this.loadAPI();

		//this.setState({isFetching: true,},() => {this.getApiData();});
	}

	render() {
		return (
			<React.Fragment>
				{this.state.isLoading && (
					<ActivityIndicator
						color={'red'}
						style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
					/>
				)}
				{!this.state.isLoading && (
					<FlatGrid
						// refreshControl={
						//   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						// }
						onRefresh={() => this.onRefresh()}
						refreshing={this.state.isLoading}
						itemDimension={100}
						items={this.state.items}
						style={styles.gridView}
						// staticDimension={300}
						// fixed
						// spacing={20}
						renderItem={({ item, index }) => (
							<View style={[ styles.itemContainer, { backgroundColor: item.code } ]}>
								{item.badge > 0 && <Text style={styles.badge}> {item.badge} </Text>}
								<Ionicons name={item.icon} size={57} color="white" />
								<Text style={styles.itemName}>{item.name}</Text>
								{/* <Text style={styles.itemCode}>{item.code}</Text> */}
							</View>
						)}
					/>
				)}
			</React.Fragment>
		);
	}
}

const styles = StyleSheet.create({
	gridView: {
		marginTop: 20,
		flex: 1
	},
	itemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		padding: 0,
		height: 120
	},
	itemName: {
		fontSize: 16,
		color: '#fff',
		fontWeight: '400'
	},
	itemCode: {
		fontWeight: '600',
		fontSize: 12,
		color: '#fff'
	},
	badge: {
		color: '#fff',
		position: 'absolute',
		zIndex: 10,
		top: 25,
		left: 30,
		padding: 1,
		overflow: 'hidden',
		backgroundColor: 'red',
		borderRadius: 4,
		borderWidth: 0,
		borderColor: '#000'
	}
});
