import React, { Component, useRef } from 'react';

import {
	Picker,
	ActivityIndicator,
	TextInput,
	Text,
	Button,
	Alert,
	View,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Switch
} from 'react-native';
const loading = () => {
	return (
		<View style={styles.container}>
			<View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
				<ActivityIndicator style={{ color: '#000' }} />

				<Text
					style={{
						marginTop: 10,
						borderRadius: 10,
						padding: 7,
						fontFamily: 'iransans',
						textAlign: 'center'
					}}
				>
					لطفا منتظر بمانید...
				</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 0,
		paddingBottom: 0,
		borderRadius: 25
	}
});
export default loading;
