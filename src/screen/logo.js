import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { Text } from '@react-native-community/art';
//import LottieView from "lottie-react-native";

export default class lotte extends React.Component {
	componentDidMount() {
		// this.animation.play();
		// Or set a specific startFrame and endFrame with:
		// this.animation.play(30, 120);
	}

	resetAnimation = () => {
		//  this.animation.reset();
		// this.animation.play();
	};

	render() {
		return (
			<View style={styles.animationContainer}>
				{/* <LottieView
          ref={animation => {
            this.animation = animation;
          }}
          style={{
            flex:1,
            marginTop:0,
            backgroundColor: '#f6fbff',
          }}
          source={require('../screens/r1.json')}
                 /> */}
				<Text>hi</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	animationContainer: {
		backgroundColor: '#f6fbff',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1
	},
	buttonContainer: {
		paddingTop: 20
	}
});
