import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default class intro extends React.Component {
	componentDidMount() {
		if (global.lang == 'fa') this.animation.play();
		// Or set a specific startFrame and endFrame with:
		//this.animation.play(0, 250);
	}

	resetAnimation = () => {
		//this.animation.reset();
		//this.animation.play();
	};

	render() {
		return (
			<View style={styles.animationContainer}>
				<LottieView
					//onAnimationFinish={() => alert()}
					ref={(animation) => {
						this.animation = animation;
					}}
					loop={false}
					autoPlay={false}
					style={{
						width: 370,
						height: 370,
						marginTop: 0,
						//borderRadius: 13,
						backgroundColor: 'white'
					}}
					source={require('../screen/intro.json')}
					// OR find more Lottie files @ https://lottiefiles.com/featured
					// Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	animationContainer: {
		backgroundColor: '#ffffff',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	buttonContainer: {
		paddingTop: 20
	}
});
