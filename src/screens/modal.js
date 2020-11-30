import React, { Component } from 'react';
import { Button, Text, Dimensions, View } from 'react-native';
import Modal from 'react-native-modal';
import Swipper from '../screens/swipper';
import SelectUser from '../screen/selectUser';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

export default class ModalTester extends Component {
	state = {
		isModalVisible: false
	};

	toggleModal = () => {
		this.setState({ isModalVisible: !this.state.isModalVisible });
	};

	render() {
		const deviceWidth = Dimensions.get('window').width;
		const deviceHeight =
			Platform.OS === 'ios'
				? Dimensions.get('window').height
				: require('react-native-extra-dimensions-android').get('REAL_WINDOW_HEIGHT');

		//const [isModalVisible, setModalVisible] = useState(true);

		return (
			<View style={{ flex: 1 }}>
				<Button title="Show modal" onPress={this.toggleModal} />
				<Modal deviceWidth={deviceWidth} deviceHeight={deviceHeight} isVisible={this.state.isModalVisible}>
					<View style={{ flex: 1 }}>
						<Text>Hello!</Text>
						<Button title="Hide modal" onPress={this.toggleModal} />
						<SelectUser />
					</View>
				</Modal>
			</View>
		);
	}
}
