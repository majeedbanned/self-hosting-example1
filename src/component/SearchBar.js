import React from 'react';
import { TextInput, StyleSheet, View, Button } from 'react-native';
import { Feather } from '@expo/vector-icons';
const SearchBar = ({ term, onTermChange,onTermSubmit }) => {
	return (
		<View style={styles.backgroundStyle}>
			<Feather name="search" style={styles.iconStyle} />
			<TextInput
				autoCapitalize="none"
				autoCorrect={false}
				value={term}
				onChangeText={ onTermChange}
				style={styles.inputstyle}
        placeholder="Search"
        onEndEditing={ onTermSubmit }
        
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	backgroundStyle: {
		backgroundColor: '#f0eeee',
		height: 50,
		borderRadius: 5,
		marginHorizontal: 15,
		borderWidth: 1,
		borderColor: '#ccc',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom:3
	},
	inputstyle: {
		flex: 1,
		fontSize: 18
	},
	iconStyle: {
		fontSize: 35,
		alignSelf: 'center',
		marginHorizontal: 15
	},
	text: {
		fontSize: 30
	}
});

export default SearchBar;
