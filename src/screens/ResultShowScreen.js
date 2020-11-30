import React, { Component, useState, useEffect } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import yelp from '../api/yelp';
import resultList from '../component/resultList';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress/Circle';

const ResultShowScreen = ({ navigation }) => {
	const [ state, setState ] = useState(null);
	const id = navigation.getParam('id');

	console.log(state);
	const getResult = async (id) => {
		const response = await yelp.get(`/${id}`);
		setState(response.data);
	};

	useEffect(() => {
		getResult(id);
	}, []);

    if(!state)
    return null;
	console.log(id);
	return (
		<View>
			<Text>{state.name}dd</Text>
			<FlatList
				data={state.photos}
				keyExtractor={(photo) => photo}
				renderItem={({ item }) => {
					 
                    
                  return( 
                    <Image 
                    source={{ uri: item }} 
                    indicator={Progress.Bar}
                    indicatorProps={{
                      size: 15,
                      
                      color: 'rgba(150, 150, 150, 1)',
                      unfilledColor: 'rgba(200, 200, 200, 0.2)'
                    }}
                    style={{
                      width: 320,
                      height: 240,
                    }}/>
                    
                   /* <Image source={{uri:item}} style={styles.image} />*/
                    
                    )
                        
                        
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	image: {
        height: 200,
        borderWidth:1,
        borderColor:'red',
        width:400
	}
});
export default ResultShowScreen;
