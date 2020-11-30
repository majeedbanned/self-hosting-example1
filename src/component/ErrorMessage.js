import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErrorMessage = ({ errorValue }) => (
	<View style={styles.container}>
		<Text style={styles.errorText}>{errorValue}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		borderWidth: 0,
		marginEnd: 10,
		marginTop: 0,
		alignItems: 'flex-end'
	},
	errorText: {
		fontFamily: 'iransans',
		fontSize: 12,
		color: 'red'
	}
});

export default ErrorMessage;
