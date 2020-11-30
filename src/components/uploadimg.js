import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProgressCircle from 'react-native-progress-circle';
import AnimatedProgressWheel from 'react-native-progress-wheel';
import {
	Picker,
	TextInput,
	Text,
	Button,
	Alert,
	Image,
	View,
	StyleSheet,
	TouchableHighlight,
	TouchableNativeFeedback,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
const uploadimg = ({ onimgPress, imageSourse, pgvisible, onDelete, progressnum }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-evenly'
			}}
		>
			<View
				style={{
					alignItems: 'center',
					borderColor: '#ccc',
					borderRadius: 15,
					borderWidth: 1,
					borderStyle: 'dashed'
				}}
			>
				<TouchableOpacity style={{ alignItems: 'center' }} onPress={onimgPress}>
					<Image
						source={{ uri: imageSourse == '' ? 'x' : imageSourse }}
						resizeMode="contain"
						style={styles.imgplaceholder}
					/>
					<View style={styles.imgpp}>
						{pgvisible && (
							// <AnimatedProgressWheel
							// 	size={35}
							// 	width={4}
							// 	color={'blue'}
							// 	progress={progressnum * 100}
							// 	backgroundColor={'#ccc'}
							// />

							<ProgressCircle
								outerCircleStyle={{
									overflow: 'hidden',
									borderTopLeftRadius: 20,
									borderTopRightRadius: 20,
									borderBottomRightRadius: 20,
									borderBottomLeftRadius: 20
								}}
								percent={progressnum * 100}
								radius={20}
								borderWidth={4}
								color="#3399FF"
								shadowColor="#999"
								bgColor="#fff"
							>
								<Text style={{ fontSize: 12 }}>{Number((progressnum * 100).toFixed(0))}</Text>
							</ProgressCircle>
						)}
						{!pgvisible && (
							<View>
								<Icon name="plus" size={24} color="#bbb" />
							</View>
						)}
					</View>
				</TouchableOpacity>
				{imageSourse != 'x' && (
					<TouchableOpacity style={{ alignItems: 'center' }} onPress={onDelete}>
						<Icon name="trash" size={24} color="#bbb" />
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	imgpp: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		borderWidth: 0,
		left: 0,
		top: 0,
		height: '100%',
		width: '100%',
		position: 'absolute'
	},
	imgplaceholder: {
		marginTop: 5,
		//borderStyle: 'dashed',
		borderColor: '#ccc',
		//borderWidth: 1,
		borderRadius: 15,
		height: 100,
		width: 80
	}
});
export default uploadimg;
