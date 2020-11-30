import React from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
const parseString = require('react-native-xml2js').parseString;

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			majid: [],
			numColumns: 3,
			data: [
				{ key: 'A' },
				{ key: 'B' },
				{ key: 'C' },
				{ key: 'D' },
				{ key: 'E' },
				{ key: 'F' },
				{ key: 'G' },
				{ key: 'H' },
				{ key: 'I' },
				{ key: 'J' }
			]
		};
	}

	getSurfaces() {
		fetch(global.adress + '/WebService.asmx/DataTableToJSONWithJSONNet?test=95100040')
			.then((response) => response.json())
			.then((responseText) => {
				this.setState({ majid: responseText });
				console.log(this.state.majid);
			})
			.catch((err) => {
				console.log('Error fetching the feed: ', err);
			});
		console.log('loading');
	}
	componentDidMount() {
		this.getSurfaces();
	}
	renderItem = ({ item, index }) => {
		if (item.empty === true) {
			return <View style={[ styles.item, styles.itemInvisible ]} />;
		}
		return (
			<View style={[ styles.item, { height: Dimensions.get('window').width / this.state.numColumns } ]}>
				<Text style={styles.itemText}>{item.mahd_name}</Text>
			</View>
		);
	};

	formatRow = (data, numColumns) => {
		const numberOfFullRows = Math.floor(data.length / numColumns);
		let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
		while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
			data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
			numberOfElementsLastRow++;
		}
		return data;
	};

	render() {
		if (this.state.majid.length < 0) return <Text>Loading...</Text>;
		return (
			<FlatList
				data={this.state.majid}
				style={styles.container}
				renderItem={this.renderItem}
				numColumns={this.state.numColumns}
			/>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 20
	},
	item: {
		backgroundColor: '#6495ED',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		margin: 1
	},
	itemInvisible: {
		backgroundColor: 'transparent'
	},
	itemText: {
		color: '#fff',
		fontSize: 14,
		fontWeight: 'bold'
	},
	badge: {
		color: '#fff',
		position: 'absolute',
		zIndex: 10,
		top: -9,
		right: -12,
		padding: -1,
		overflow: 'hidden',
		backgroundColor: 'red',
		borderRadius: 4,
		borderWidth: 0,
		borderColor: '#000'
	}
});
