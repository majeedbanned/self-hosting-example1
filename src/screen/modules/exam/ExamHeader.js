import React, { Component } from 'react';
import { StyleSheet, TextInput, Alert, Dimensions } from 'react-native';
import { userInfo, toFarsi, getHttpAdress } from '../components/DB';
import CountDown from 'react-native-countdown-component';
export default function ExamHeader(props) {
	return (
		<View style={styles.header}>
			<View style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 2, height: 70 }}>
				<View>
					<Image
						style={[ styles.imageavatar, { margin: 5 } ]}
						source={{ uri: getHttpAdress() + 'child/' + global.username + '.jpg' }}
					/>
				</View>
				<View>
					<Text style={styles.blueText}>{'تعداد سئوالات:' + props.data.length}</Text>
					<Text style={styles.blueText}>{props.stdName}</Text>
				</View>
			</View>
			<View style={styles.counterPanel}>
				{props.speed != 'speed' && (
					<CountDown
						until={60 * parseInt(props.time_pasokh) + parseInt(props.time_pasokh_sec)}
						size={14}
						onChange={(ss) => {
							ss < 10 &&
								this.setState({
									counterColor: 'red'
								});
						}}
						onFinish={() => {
							this.state.Sindex < this.state.data.length - 1 &&
								this.setState({
									counterColor: '#1f9efd',
									Sindex: this.state.Sindex + 1
								});
						}}
						digitStyle={{
							backgroundColor: this.state.counterColor,
							marginTop: 0
						}}
						digitTxtStyle={{ color: 'white' }}
						timeToShow={[ 'S', 'M', 'H' ]}
						timeLabels={{ m: 'دقیقه', s: 'ثانیه', h: 'ساعت' }}
					/>
				)}

				{ttimenew == '' &&
				speed == 'speed' && (
					<CountDown
						id={id_soal.toString()}
						until={60 * parseInt(time_pasokh) + parseInt(time_pasokh_sec)}
						size={14}
						onChange={(ss) => {
							ss < 10 &&
								ss > 1 &&
								this.setState({
									counterColor: 'red'
								});

							console.log(ss);
						}}
						onFinish={() => {
							this.state.Sindex < this.state.data.length - 1 &&
								this.setState({
									counterColor: '#1f9efd',
									Sindex: this.state.Sindex + 1
								});
						}}
						digitStyle={{
							backgroundColor: this.state.counterColor,
							marginTop: 0
						}}
						digitTxtStyle={{ color: 'white' }}
						timeToShow={[ 'S', 'M', 'H' ]}
						timeLabels={{ m: 'دقیقه', s: 'ثانیه', h: 'ساعت' }}
					/>
				)}

				{ttimenew != '' &&
				speed == 'speed' && (
					<CountDown
						id={id_soal.toString()}
						until={60 * ttimenew}
						size={14}
						onChange={(ss) => {
							ss < 10 &&
								ss > 1 &&
								this.setState({
									counterColor: 'red'
								});
						}}
						onFinish={() => {
							this.state.Sindex < this.state.data.length - 1 &&
								this.setState({
									counterColor: '#1f9efd',
									Sindex: this.state.Sindex + 1
								});
						}}
						digitStyle={{ backgroundColor: this.state.counterColor, marginTop: 0 }}
						digitTxtStyle={{ color: 'white' }}
						timeToShow={[ 'S', 'M', 'H' ]}
						timeLabels={{ m: 'دقیقه', s: 'ثانیه', h: 'ساعت' }}
					/>
				)}
				<Text style={styles.counterText}>
					{speed == 'speed' ? 'زمان پاسخ به این سئوال' : 'زمان پاسخ به کل سئوالات'}
				</Text>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	header: {
		shadowColor: '#00000021',
		shadowOffset: {
			width: 2,
			height: 1
		},
		elevation: 2,
		shadowOpacity: 0.6,
		shadowRadius: 3,
		flexDirection: 'row',
		flex: 1.09,
		backgroundColor: 'white',
		height: 70
	},
	imageavatar: {
		width: 45,
		height: 58,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ccc'
	},
	blueText: {
		borderWidth: 1,
		borderColor: '#1f9efd',
		borderRadius: 5,
		paddingRight: 3,
		paddingLeft: 3,
		paddingTop: 4,
		paddingBottom: -3,
		color: '#1f9efd',
		backgroundColor: '#e3f1fc',
		textAlign: 'left',
		fontSize: 12,
		marginTop: 5,
		fontFamily: 'iransans'
	},
	counterPanel: {
		flexDirection: 'column-reverse',
		flex: 1,
		backgroundColor: 'white',
		height: 70
	}
});
