import React, { Component } from 'react';
import { Text, StyleSheet, View, Button, FlatList, TouchableOpacity } from 'react-native';
import ResultDetails from './ResultDetails';
import {withNavigation} from 'react-navigation';
const ResultList = ({ title, results, navigation }) => {

    if(!results.length)
    return <Text>Loading...</Text>;
	return (
		<View>
			<Text style={styles.header}>{title}</Text>
			<Text style={styles.count}>Count:{results.length}</Text>

			<FlatList
				showsHorizontalScrollIndicator={false}
				horizontal
				data={results}
				keyExtractor={(result) => result.id}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity onPress={() => navigation.navigate('ResultShow',{id:item.id})}>
							<ResultDetails result={item} />
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	count: {
		marginLeft: 15
	},
	header: {
		fontSize: 22,
		fontWeight: 'bold',
		marginLeft: 15,
		marginTop: 10
	}
});
export default withNavigation(ResultList) ;
