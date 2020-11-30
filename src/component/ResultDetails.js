import React, { Component } from 'react';
import { Text, Image, StyleSheet, View } from 'react-native';

const ResultDetails = ({ result }) => {
	return (
		<View style={styles.container}> 
            <Image style={styles.image} source={{uri:result.image_url}} />
			<Text style={styles.name}>{result.name}</Text>
			<Text>Rating:{result.rating}, {result.review_count} Reviews  </Text>

		</View>
	);
};
const styles = StyleSheet.create({
    container:{
        marginLeft:15

    },
    image:{
        height:120,
        width:200,
        borderRadius:4,
        marginBottom:4
    },
    name:{fontWeight:'bold'
   
}
});

export default ResultDetails;
