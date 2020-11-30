import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default class splash extends React.Component {
	state = {
		appIsReady: true
	};

	async componentDidMount() {
		// Prevent native splash screen from autohiding
		try {
			await SplashScreen.preventAutoHideAsync();
		} catch (e) {
			console.warn(e);
		}
		this.prepareResources();
	}

	/**
   * Method that serves to load resources and make API calls
   */
	prepareResources = async () => {
		await performAPICalls();
		await downloadAssets();

		this.setState({ appIsReady: true }, async () => {
			//console.log('hide');
			//await SplashScreen.hideAsync();
		});
	};

	render() {
		if (!this.state.appIsReady) {
			return null;
		}

		return (
			<View style={styles.container}>
				<Text style={styles.text}>SplashScreen Demo! 👋</Text>
			</View>
		);
	}
}

// Put any code you need to prepare your app in these functions
async function performAPICalls() {}
async function downloadAssets() {}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#aabbcc'
	},
	text: {
		color: 'white',
		fontWeight: 'bold'
	}
});
