import React, { Component, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import { userInfo, toFarsi, encrypt, getHttpAdress } from '../components/DB';
import { Ionicons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/AntDesign';

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import GLOBAL from '../screen/global';
class ActionBarImage extends Component {
	state = {
		avatarSrc: global.avatar == null ? 'a' : global.avatar
	};

	//if

	render() {
		GLOBAL.ActionBarImage = this;
		// this.setState({avatarSrc:global.avatar})
		//  global.avatar= this.state.avatarSrc;

		if (this.state.avatarSrc == '') {
			//console.log('fucks=' + this.state.avatarSrc);
			return <View />;
		}

		//console.log('uri=' + this.state.avatarSrc);
		const { navigate } = this.props.navigation;
		return (
			<View style={{ flexDirection: 'row' }}>
				<TouchableOpacity
					activeOpacity={1}
					onPress={() => {
						navigate('Login', { mode: true });
					}}
				>
					<View style={{ flexDirection: 'row' }}>
						<Icon name="adduser" style={styles.actionButtonIcon} />
					</View>
				</TouchableOpacity>
				<TouchableOpacity
					style={{}}
					activeOpacity={1}
					onPress={() => {
						GLOBAL.main.setState({ isModalVisible: true });
					}}
				>
					<View
						style={{
							flexDirection: 'row',
							borderWidth: 0.6,
							marginRight: 15,
							width: 33,
							borderRadius: 10,
							borderColor: '#ccc'
						}}
					>
						{/* <Icon name="adduser" style={styles.actionButtonIcon} /> */}
						<Image
							style={styles.imageavatar}
							source={{ uri: this.state.avatarSrc }}
							source={{ uri: getHttpAdress() + 'child/' + global.username + '.jpg' }}
						/>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	actionButtonIcon: {
		marginRight: 10,
		fontSize: 32,
		//height: 22,
		//borderWidth: 1,
		color: 'gray'
	},
	imageavatar: {
		width: 33,
		height: 33,
		marginEnd: 10,
		borderRadius: 10,
		//	borderWidth: 1,
		borderColor: '#ccc'
	}
});

export default withNavigation(ActionBarImage);
