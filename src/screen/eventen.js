import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, ScrollView, Alert } from 'react-native';

export default class Users extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [
				{
					id: 1,
					description: 'Street Team Meeting.',
					date: '2021-04-30 09:12:00',
					color: '#228B22',
					completed: 1
				},
				{
					id: 2,
					description: 'Intensive Course in Dysphagia Diagnosis and Management.',
					date: '2021-04-30 10:23:00',
					color: '#FF00FF',
					completed: 1
				},
				{
					id: 3,
					description: 'Join us in solving digital dilemmas that face young people today',
					date: '2021-04-25 11:45:00',
					color: '#4B0082',
					completed: 1
				},
				{
					id: 4,
					description: 'UC MBA Information Evening.',
					date: '2021-04-20 09:27:00',
					color: '#20B2AA',
					completed: 1
				},
				{
					id: 5,
					description: 'Leading During Times of Uncertainty with Glenn Renwick.',
					date: '2021-03-25 08:13:00',
					color: '#000080',
					completed: 1
				},
				{
					id: 6,
					description: 'Gentle Yoga/Meditation.',
					date: '2021-03-20 10:22:00',
					color: '#FF4500',
					completed: 1
				},
				{
					id: 7,
					description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
					date: '2021-03-20 13:33:00',
					color: '#FF0000',
					completed: 1
				},
				{
					id: 8,
					description: 'Maecenas nec odio et ante tincidunt tempus. Donec vitae .',
					date: '2021-03-19 11:56:00',
					color: '#EE82EE',
					completed: 1
				},
				{
					id: 9,
					description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
					date: '2021-03-19 15:00:00',
					color: '#6A5ACD',
					completed: 1
				},
				{
					id: 10,
					description: ' Aenean imperdiet. Etiam ultricies nisi vel augues aasde.',
					date: '2021-03-18 12:27:00',
					color: '#DDA0DD',
					completed: 1
				}
			]
		};
	}

	clickEventListener = (item) => {
		//Alert.alert('Item selected: ' + item.description);
	};

	__getCompletedIcon = (item) => {
		if (item.completed == 1) {
			return 'https://img.icons8.com/flat_round/64/000000/checkmark.png';
		} else {
			return 'https://img.icons8.com/flat_round/64/000000/delete-sign.png';
		}
	};

	__getDescriptionStyle = (item) => {
		if (item.completed == 1) {
			return { fontStyle: 'italic', color: '#808080' };
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.tasks}
					columnWrapperStyle={styles.listContainer}
					data={this.state.data}
					keyExtractor={(item) => {
						return item.id;
					}}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								activeOpacity={1}
								style={[ styles.card, { borderColor: item.color } ]}
								onPress={() => {
									this.clickEventListener(item);
								}}
							>
								<Image style={styles.image} source={{ uri: this.__getCompletedIcon(item) }} />
								<View style={styles.cardContent}>
									<Text style={[ styles.description, this.__getDescriptionStyle(item) ]}>
										{item.description}
									</Text>
									<Text style={styles.date}>{item.date}</Text>
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
		marginTop: 20,
		backgroundColor: '#eeeeee'
	},
	tasks: {
		flex: 1
	},
	cardContent: {
		marginLeft: 20,
		marginTop: 10
	},
	image: {
		width: 25,
		height: 25
	},

	card: {
		shadowColor: '#00000021',
		shadowOffset: {
			width: 0,
			height: 6
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,
		elevation: 12,

		marginVertical: 10,
		marginHorizontal: 20,
		backgroundColor: 'white',
		flexBasis: '46%',
		padding: 10,
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderLeftWidth: 6
	},

	description: {
		fontSize: 18,
		flex: 1,
		color: '#008080',
		fontWeight: 'bold'
	},
	date: {
		fontSize: 14,
		flex: 1,
		color: '#696969',
		marginTop: 5
	}
});
