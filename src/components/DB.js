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
	if (global.adress) return global.adress.replace('papi', '') + '/upload/' + global.schoolcode + '/';
}
export function getHttpAdressPure(code) {
	return global.adress.replace('papi', '') + '/upload/' + global.schoolcode + '/';
}

export async function isNet() {
	let state = await NetInfo.fetch();
	if (!state.isConnected) {
		return false;
	}

	return true;
}

export function encrypt(text) {
	key = 'abcdefghijklmnopabcdefgh';
	var CryptoJS = require('crypto-js');
	var key = CryptoJS.enc.Utf8.parse(key);
	var iv = CryptoJS.enc.Base64.parse('QUJDREVGR0g=');
	//QUJDREVGR0g=
	var encoded = CryptoJS.enc.Utf8.parse(text);
	var ciphertext = CryptoJS.TripleDES.encrypt(encoded, key, { mode: CryptoJS.mode.CBC, iv: iv });

	return ciphertext.toString();
}

export function decrypt(encryptedText) {
	key = '357611123qwe!@#A35761112';

	var CryptoJS = require('crypto-js');
	var key = CryptoJS.enc.Utf8.parse(key);
	var iv = CryptoJS.enc.Base64.parse('QUJDREVGR0g=');
	var bytes = CryptoJS.TripleDES.decrypt(encryptedText, key, { mode: CryptoJS.mode.CBC, iv: iv });
	var decryptedText = bytes.toString(CryptoJS.enc.Utf8);

	return decryptedText;
}

export function tozang(str) {
	if (str == '1') return 'ساعت اول';
	else if (str == '2') return 'ساعت دوم';
	else if (str == '4') return 'ساعت سوم';
	else if (str == '8') return 'ساعت چهارم';
	else if (str == '16') return 'ساعت پنجم';
	else if (str == '32') return 'ساعت ششم';
	else if (str == '64') return 'ساعت هفتم';
	else if (str == '128') return 'ساعت هشتم';
	else if (str == '256') return 'ساعت نهم';
}
export function toFarsi(str) {
	try {
		if (str == '' || str == null || str == undefined) return '';
		const id = [ '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹' ];
		if (str == null) str = '';
		str = str.toString();
		return str.replace(/[0-9]/g, function(w) {
			return id[+w];
		});
	} catch (e) {
		return;
	}
}

export function toEng(str) {
	try {
		if (str == '' || str == null || str == undefined) return '';
		const persianNumbers = [ /۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g ];
		const arabicNumbers = [ /٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g ];

		if (typeof str === 'string') {
			for (var i = 0; i < 10; i++) {
				str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
			}
		}
		return str;
	} catch (e) {
		return;
	}
}
export function userInfo(std = 0) {
	return (
		(std != 0 ? std : global.username) +
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
