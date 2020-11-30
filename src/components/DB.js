import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db');
import NetInfo from '@react-native-community/netinfo';
import { parseString } from 'react-native-xml2js/lib/parser';

export function _query(query) {
	let items = [];
	return new Promise((resolve, reject) =>
		db.transaction((tx) => {
			tx.executeSql(
				query,
				[],
				(tx, results) => {
					// console.log(results.length)
					//this.items = results.rows;//.item(0).username;
					resolve(results.rows);
				},
				function(tx, error) {
					reject(error);
				}
			);
		})
	);
}

export function getHttpAdress(code) {
	return global.adress + '/upload/' + global.schoolcode + '/';
}
export function toFarsi(str) {
	try {
		const id = [ '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' ];
		if (str == null) str = '';

		return str.replace(/[0-9]/g, function(w) {
			return id[+w];
		});
	} catch (e) {
		return;
	}
}
export function userInfo() {
	return (
		global.username +
		'`' +
		global.password +
		'`' +
		global.schoolcode +
		'`' +
		global.ttype +
		'`' +
		'`' +
		'357611123qwe!@$' +
		'`' +
		'ip' +
		'`' +
		global.firstname +
		' ' +
		global.lastname
	);
}
export async function _connected() {
	NetInfo.fetch().then(async (state) => {
		try {
			let connected = state.isConnected;
			//ip = await Network.getIpAddressAsync();
			// macaAress = await Application.getIosIdForVendorAsync();
			//macaAress = await Network.getMacAddressAsync();
			return 'dfg';
		} catch (error) {
			return false;
		}
	});
}

export async function _fetch(api) {
	//try {

	// try {
	//   console.log('start!');

	//   const res = await axios.get(api);
	//   console.log('Success!');
	//  // console.log(r.status);
	//  // console.log(r.data);
	// } catch (e) {
	//   //console.error('Failure!');
	//   console.error(e.response.status);
	// }
	const response = await fetch(api);
	if (response.ok) {
		//console.log(response);
		return await response;
	} else return null;

	// console.log(response.json());
	// const responseJson = await response.json();
	//console.log(response);
	// if(response)
	// console.log(response);//;
	//       else
	//       return null;

	// } catch(error){
	//      console.log('error');
	//      return null;
	// }
}
