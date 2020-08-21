if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test381.json', {strict: false, ws: ''});
}

/*
 This sample beased on this article:

	http://stackoverflow.com/questions/30442969/group-by-in-angularjs

*/

describe('Test 382 - Error in UPDATE', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test382;USE test382');
		done();
	});

	it('1. Create table', function (done) {
		var sqldb = new alasql.Database('db');
		sqldb.exec(
			'CREATE TABLE Locations (' +
				'idLoc INT PRIMARY KEY AUTOINCREMENT NOT NULL,' +
				'id TEXT NOT NULL,' +
				'longitude TEXT NOT NULL,' +
				'latitude DATE NOT NULL' +
				')'
		);

		// CREATE OBJ
		var _createGpsEntry = function (data) {
			var Entry = function (id, longitude, latitude) {
				this.id = id;
				this.longitude = longitude;
				this.latitude = latitude;
				return this;
			};

			return new Entry(data.id, data.longitude, data.latitude);
		};

		var list = [
			{
				id: 'id1',
				longitude: 120,
				latitude: 40,
			},
			{
				id: 'id2',
				longitude: 121,
				latitude: 41,
			},
		];

		//This will not work
		list.forEach(function (item) {
			//	console.log(59,item);
			//	console.log(60,[_createGpsEntry(item)]);
			//  sqldb.exec("INSERT INTO Locations VALUES ?", [_createGpsEntry(item)]);
		});

		//If cloneDeep it will work
		//list.forEach(function (item) {
		//    sqldb.exec("INSERT INTO Locations VALUES ?", //[_.cloneDeep(_createGpsEntry(item))]);
		//})

		//This will bring an Error "Cannot set property 'id' of undefined"
		//console.log(sqldb.exec('UPDATE Locations SET longitude = ?,latitude = ? WHERE id = ?', [99, 88, "id1"]));

		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test382');
		done();
	});
});
