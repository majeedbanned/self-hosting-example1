import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import defaultStyles from '../config/styles';

function AppTextInput({ icon, ...otherProps }) {
	return (
		<View style={styles.container}>
			{icon && (
				<MaterialCommunityIcons name={icon} size={20} color={defaultStyles.colors.medium} style={styles.icon} />
			)}
			<TextInput style={defaultStyles.text} {...otherProps} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: defaultStyles.colors.white,
		borderRadius: 25,

		flexDirection: 'row',
		width: '100%',
		padding: 15,
		marginVertical: 5,
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		shadowOpacity: 0.6,
		shadowRadius: 3
	},
	icon: {
		marginRight: 10
	}
});

export default AppTextInput;
