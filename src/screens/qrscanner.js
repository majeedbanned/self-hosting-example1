import React, { Component, State, useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import defaultStyles from '../config/styles';
import { REAL_WINDOW_HEIGHT } from 'react-native-extra-dimensions-android';

import Modalm from 'react-native-modal';
import Database from '../components/database';
import { HelloChandu, _getcount, getQuery, _query, _fetch, _connected } from '../components/DB';
import FormButton from '../component/FormButton';

import * as SQLite from 'expo-sqlite';
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;

//import { userInfo, toFarsi, getHttpAdress, decrypt, encrypt, toEng } from '../components/DB';

const db = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

import { height } from '../screen/settingUserDelete';
import { last } from 'rxjs/operator/last';

export default function App() {
	const [ hasPermission, setHasPermission ] = useState(null);
	const [ scanned, setScanned ] = useState(false);
	const [ newuser, setnewuser ] = useState(false);
	const [ adress, setadress ] = useState('http://192.168.1.15:8080/upload/95100040/child/5.jpg');
	const [ name, setname ] = useState('مجید قاسمی');
	const [ schoolname, setschoolname ] = useState('مدرسه علوی');
	const [ ttype, settype ] = useState('دانش آموز');

	useEffect(() => {
		(async () => {
			//	this.setState({ newuser: true });
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	navigationOptions = ({ navigation }) => {
		const { params } = navigation.state;
		return {
			//headerTitle: this.reportName,
			headerRight: () => null,
			headerBackTitle: 'بازگشت',
			navigationOptions: {
				headerBackTitle: 'Home'
			},
			headerTitleStyle: {
				fontFamily: 'iransansbold'
				//color: this.state.colorhead
			}
		};
	};

	const handleBarCodeScanned = async ({ type, data }) => {
		setScanned(true);
		//alert(`Bar code with type ${type} and data ${data} has been scanned!`);

		let username = data.split('`')[0];
		let password = data.split('`')[1];
		let schoolcode = data.split('`')[2];
		let adress = data.split('`')[3];
		let firstname = data.split('`')[4];
		let lastname = data.split('`')[5];
		let schoolname = data.split('`')[6];
		let ttype = data.split('`')[7];
		//alert(`Bar code with type ${type} and data ${data} has been scanned!`);

		let results = await Database.executeSql('select * from users where username=? and schoolcode=?', [
			username,
			schoolcode
		]);
		if (results.rows.length > 0) {
			//	this.dropDownAlertRef.alertWithType('warn', 'اخطار', 'این کاربر قبلا وارد شده است');
			alert('این کاربر قبلا وارد شده است');

			console.log(results.rows);
			return;
		}

		//	const db = SQLite.openDatabase('db');ss
		db.transaction((tx) => {
			tx.executeSql(
				'insert into users (username,password,schoolcode,adress,firstname,lastname,schoolname,ttype) values (?,?,?,?,?,?,?,?)',
				[ username, password, schoolcode, adress, firstname, lastname, schoolname, ttype ],
				(tx, rs) => {},
				(tx, err) => {
					console.log(err);
				}
			);
		});
		setname(firstname + ' ' + lastname);
		setschoolname(schoolname);

		if (ttype == 'student') settype(ttype == 'دانش آموز');
		else if (ttype == 'teacher') settype(ttype == 'معلم');
		else if (ttype == 'administrator') settype(ttype == 'مدیر');
		setadress(adress + '/' + 'upload/' + schoolcode + '/child/' + username + '.jpg');
		//alert('باموفقیت وارد شد');
		setnewuser(true);
		global.username = username;
		global.password = password;
		global.schoolcode = schoolcode;
		global.adress = adress;
		global.firstname = firstname;
		global.lastname = lastname;
		global.schoolname = schoolname;
		global.ttype = ttype;
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	const deviceWidth = Dimensions.get('window').width;
	const deviceHeight = Platform.OS === 'ios' ? Dimensions.get('window').height : REAL_WINDOW_HEIGHT;

	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'flex-end'
			}}
		>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>

			{scanned && (
				<Button style={{ fontFamily: 'iransans' }} title={'اسکن مجدد'} onPress={() => setScanned(false)} />
			)}

			<Modalm
				height={400}
				animationInTiming={0.1}
				animationOutTiming={0.1}
				backdropTransitionInTiming={0.1}
				backdropTransitionOutTiming={0.1}
				useNativeDriver={true}
				animationIn="fadeIn"
				animationOut="swing"
				transparent={true}
				style={{ borderRadius: 25 }}
				hideModalContentWhileAnimating={true}
				deviceWidth={deviceWidth}
				deviceHeight={deviceHeight}
				//	swipeDirection={[ 'left' ]}
				onBackdropPress={() => setnewuser(false)}
				onSwipeComplete={() => setnewuser(false)}
				deviceWidth={deviceWidth}
				deviceHeight={deviceHeight}
				isVisible={newuser}
				style={{ flex: 0 }}
			>
				<View
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
					<View
						style={{
							borderRadius: 25,

							marginTop: 200,
							backgroundColor: 'white',
							width: 350,
							alignItems: 'center',
							height: 355
						}}
					>
						<Image style={styles.imageavatar} source={{ uri: adress }} />

						<Text style={styles.textname}> {name}</Text>
						<Text style={styles.textsch}> {schoolname}</Text>
						<Text style={styles.textname}> {ttype}</Text>
						<Text style={styles.textnameg}> با موفقیت ثبت شد</Text>

						<FormButton
							buttonColor="#1f9efd"
							borderColor="white"
							backgroundColor="#e3f1fc"
							buttonType="outline"
							onPress={() => {
								setnewuser(false);
							}}
							widthb={'100%'}
							heightb={55}
							borderRadiusb={45}
							style={{ margin: 6 }}
							containerStyle={defaultStyles.shadowx}
							//disabled={!isValid }
							//loading={this.state.isSubmitting}
							title={'تایید'}
						/>
					</View>
				</View>
			</Modalm>
		</View>
	);
}

const styles = StyleSheet.create({
	textname: {
		marginTop: 15,
		fontSize: 15,

		fontFamily: 'iransans'
	},
	textnameg: {
		marginTop: 15,
		fontSize: 15,
		color: '#0abf58',
		fontFamily: 'iransans'
	},
	textsch: {
		marginTop: 15,
		fontSize: 15,
		paddingLeft: 15,
		paddingRight: 15,

		//borderWidth: 1,
		padding: 5,
		overflow: 'hidden',
		borderRadius: 15,
		color: 'white',
		backgroundColor: '#3799de',
		fontFamily: 'iransans'
	},
	imageavatar: {
		width: 90,
		marginTop: 15,
		alignSelf: 'center',
		height: 90,
		borderRadius: 45,
		borderWidth: 1,
		borderColor: '#ccc'
	}
});
