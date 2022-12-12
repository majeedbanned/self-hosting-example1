import React, { Component, useRef } from 'react';
import i18n from 'i18n-js';
import {
	
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

const loading = (props) => {
	if (global.lang == 'en') {
		i18n.locale = 'en';
	} else {
		//alert(global.lang);
		i18n.locale = 'fa';
	}
	return (
		<View style={styles.container}>
			<View style={{ justifyContent: 'center', flex: 1, flexDirection: 'column', alignItems: 'center' }}>
				<ActivityIndicator size="large" color="#000" />
				<TouchableOpacity onPress={props.onclick}>
					<Text
						style={{
							marginTop: 10,
							borderRadius: 10,
							padding: 7,
							fontFamily: 'iransans',
							textAlign: 'center'
						}}
					>
						{i18n.t('loading')}
					</Text>
				</TouchableOpacity>
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
