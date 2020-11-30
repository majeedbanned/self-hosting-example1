import React, { Component } from 'react';
import { StyleSheet, View, FlatList, TouchableOpacity, Text } from 'react-native';
import Accordian from './accordian';
import { Colors } from './colors';

export default class Daftar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedItem: 1,
			cat: [
				{
					id: 1,

					name: 'ارزشیابی ها'
				},
				{
					id: 2,

					name: 'غیبت ها'
				},
				{
					id: 3,

					name: 'تاخیر ها'
				}
			],
			menu: [
				{
					title: 'ریاضی دو',
					count: 2,
					data: [
						{
							key:
								'فرزندم در کلاس فعال بفرزندم در کلاس فعال بوفرزندم در کلاس فعال بوفر فعال بوفرزندم در کلاس فعا فعال بوفرزندم در کلاس فعازندم در کلاس فعال بوود',
							title: 'کار در کلاس',
							disc: 'افزودن یک نمره',
							date: '1399/04/01',
							time: 'زنگ اول',

							value: false
						},
						{ key: 'Mutton Biryani', value: false },
						{ key: 'Prawns Biryani', value: false }
					]
				},
				{
					title: 'علوم',
					count: 2,
					data: [
						{ key: 'Chicken Dominator', value: false },
						{ key: 'Peri Peri Chicken', value: false },
						{ key: 'Indie Tandoori Paneer', value: false },
						{ key: 'Veg Extraveganza', value: false }
					]
				},
				{
					title: 'زیست',
					count: 1,
					data: [
						{ key: 'Cocktail', value: false },
						{ key: 'Mocktail', value: false },
						{ key: 'Lemon Soda', value: false },
						{ key: 'Orange Soda', value: false }
					]
				},
				{
					title: 'Deserts',
					count: 3,
					data: [
						{ key: 'Choco Lava Cake', value: false },
						{ key: 'Gulabjamun', value: false },
						{ key: 'Kalajamun', value: false },
						{ key: 'Jalebi', value: false }
					]
				}
			]
		};
	}
	onPressHandler(id) {
		this.setState({ selectedItem: id });
	}
	render() {
		if (this.state.menu.length == 0) return null;

		return (
			<View style={styles.container}>
				<View style={{ backgroundColor: 'white' }}>
					<FlatList
						extraData={this.state.selectedItem}
						data={this.state.cat}
						keyExtractor={(item) => item.id.toString()}
						horizontal
						style={{ paddingBottom: 4, borderWidth: 0, marginTop: 4, marginRight: 4, marginLeft: 4 }}
						renderItem={({ item, index }) => {
							return (
								<TouchableOpacity
									onPress={() => {
										console.log(item.id);
										this.onPressHandler(item.id);
									}}
								>
									<View
										style={
											this.state.selectedItem === item.id ? (
												{
													backgroundColor: Colors.PRIMARY,
													fontFamily: 'iransans',
													borderWidth: 1,
													borderColor: Colors.PRIMARY,
													borderRadius: 15,
													margin: 3,
													paddingTop: 8,
													paddingRight: 8,
													paddingLeft: 8,
													paddingBottom: 3
												}
											) : (
												{
													backgroundColor: 'white',
													fontFamily: 'iransans',
													borderWidth: 1,
													borderColor: Colors.PRIMARY,
													borderRadius: 15,
													margin: 3,
													paddingTop: 8,
													paddingRight: 8,
													paddingLeft: 8,
													paddingBottom: 3
												}
											)
										}
									>
										<Text
											style={
												this.state.selectedItem === item.id ? (
													{
														color: 'white',
														fontFamily: 'iransans'
													}
												) : (
													{
														color: Colors.PRIMARY,

														fontFamily: 'iransans'
													}
												)
											}
										>
											{item.name}
										</Text>
									</View>
								</TouchableOpacity>
							);
						}}
					/>
				</View>
				{this.renderAccordians()}
			</View>
		);
	}

	renderAccordians = () => {
		const items = [];
		for (item of this.state.menu) {
			items.push(<Accordian title={item.title} data={item.data} count={item.count} />);
		}
		return items;
	};
}

const styles = StyleSheet.create({
	container: {
		padding: 0,
		flex: 1,
		paddingTop: 0,
		backgroundColor: 'white'
	}
});
