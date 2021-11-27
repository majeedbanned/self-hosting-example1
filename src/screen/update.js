import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, Text, RefreshControl, Alert, Linking, StyleSheet } from 'react-native';
import ActionBarImage from '../components/ActionBarImage';
import { userInfo, toFarsi,encrypt, getHttpAdress } from '../components/DB';
import { Snackbar } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

// const database_name = 'Reactoffline.db';
// const database_version = '1.0';
// const database_displayname = 'SQLite React Offline Database';
// const database_size = 200000;
// const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

class update extends Component {
	constructor(props) {
		super(props);

		this.state = {
			refreshing: false
		};
	}

	static navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;
		return {
			//headerTitle: this.reportName,
			headerRight: () => null,
			headerLeft: () => null,

			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransans'
				//color: this.state.colorhead
			}
		};
	};

	async componentDidMount() {}

	onwonrefresh = () => {
		setTimeout(async () => {
			this.loadAPI(1);
			this.loadAPIBadge();
		}, 1000);
	};

	render() {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
			>
				<TouchableOpacity
					onPress={() => {
						const { navigation } = this.props;
						const lnk = navigation.getParam('lnk');
						Linking.openURL(lnk);

						//link
					}}
				>
					<Text style={{ fontFamily: 'iransans', color: '#1da6f5' }}>
						لطفا اپلیکیشن خود را بروز آوری نمایید
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {
		borderRadius: 0,
		//flex: 1,
		//borderWidth: 1,
		marginTop: 0,
		flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse',
		height: 130,
		paddingBottom: 0
	}
});
export default withNavigation(update);
