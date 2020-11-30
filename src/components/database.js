//let  SQLite = require('react-native-sqlite-storage');
//import * as SQLite from 'expo-sqlite';
//const DB = SQLite.openDatabase('db');
import * as SQLite from 'expo-sqlite';
const database_name = 'Reactoffline.db';
const database_version = '1.0';
const database_displayname = 'SQLite React Offline Database';
const database_size = 200000;
const DB = SQLite.openDatabase(database_name, database_version, database_displayname, database_size);

//const  DB = SQLite.openDatabase({name:'test.db',createFromLocation:'~sqlitedb.db'});

class Database {
	db;
	constructor(db) {
		this.db = db;
	}
	executeSql = (sql, params = []) =>
		new Promise((resolve, reject) => {
			this.db.transaction((trans) => {
				trans.executeSql(
					sql,
					params,
					(db, results) => {
						resolve(results);
					},
					(error) => {
						reject(error);
					}
				);
			});
		});
}
export default new Database(DB);
