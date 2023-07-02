if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// only run in browser
if (typeof exports != 'object') {
	describe('Test 1409 - post insert triggers should run on indexdb', function () {
		before(
			() => alasql.promise('DROP IndexedDB DATABASE IF EXISTS test_db;') // delete indexeddb
		);

		it('post insert trigger after adding some data', function (done) {
			var count = 0;
			alasql.fn.onInsert = function (r) {
				count++;
				console.log('this never happens!');
			};

			return alasql
				.promise(
					'CREATE INDEXEDDB DATABASE IF NOT EXISTS test_db;' +
						'ATTACH INDEXEDDB DATABASE test_db; ' +
						'USE test_db;'
				)
				.then(function () {
					return alasql.promise('DROP TABLE IF EXISTS asset7');
				})
				.then(function () {
					return alasql.promise(
						'CREATE TABLE asset7([id] varchar(36) NOT NULL,  [name] varchar(45) NOT NULL, PRIMARY KEY ([id]) );'
					);
				})
				.then(function () {
					var data = [
						{id: 'abc1', name: 'test1', amount: 7},
						{id: 'abc2', name: 'test2', amount: 8},
						{id: 'abc3', name: 'test3', amount: 9},
					];
					return alasql.promise('INSERT INTO asset7 SELECT * FROM ?', [data]);
				})
				.then(function () {
					return alasql.promise('CREATE TRIGGER mytrigger after INSERT ON asset7 onInsert');
				})
				.then(function () {
					var data2 = [{id: 'abc4', name: 'test17', amount: 17}];
					return alasql.promise(`INSERT INTO asset7 SELECT * FROM ?`, [data2]);
				})
				.then(function () {
					assert.equal(count, 1);
					done();
				});
		});
	});
}
