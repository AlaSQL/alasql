if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// only run in browser
if (typeof exports != 'object') {
	describe('Test 1641 - indexdb should be able to run multiple statement queries', function () {
		before(() => {
			// delete indexeddb
			return alasql.promise('DROP IndexedDB DATABASE IF EXISTS alatest;');
		});
		it('A) From single lines', function (done) {
			return alasql
				.promise(
					'CREATE INDEXEDDB DATABASE IF NOT EXISTS alatest;' +
						'ATTACH INDEXEDDB DATABASE alatest;' +
						'USE alatest'
				)
				.then(function (res) {
					return alasql.promise([
						'CREATE TABLE IF NOT EXISTS mytable1 ( myid STRING, myname STRING )',
						'CREATE TABLE IF NOT EXISTS mytable2 ( myid STRING, myname STRING )',
					]);
				})
				.then(function (res) {
					return alasql.promise([
						"INSERT INTO mytable1 (myid,myname) VALUES ( '1', 'Mr. One' )",
						"INSERT INTO mytable2 (myid,myname) VALUES ( '2', 'Mr. Two' )",
					]);
				})
				.then(function (res) {
					return alasql.promise(['SELECT * from mytable1', 'SELECT * from mytable2']);
				})
				.then(function ([data1, data2]) {
					assert.deepEqual(data1, [{myid: '1', myname: 'Mr. One'}]);
					assert.deepEqual(data2, [{myid: '2', myname: 'Mr. Two'}]);
					done();
				});
		});
	});
}
