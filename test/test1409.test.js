// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

// only run in browser
if (typeof window !== 'undefined')
	describe('Test 1409 - post insert triggers should run on indexdb', () => {
		beforeAll(
			() => alasql.promise('DROP IndexedDB DATABASE IF EXISTS test_db;') // delete indexeddb
		);

		test('post insert trigger after adding some data', done => {
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
				.then(() => {
					return alasql.promise('DROP TABLE IF EXISTS asset7');
				})
				.then(() => {
					return alasql.promise(
						'CREATE TABLE asset7([id] varchar(36) NOT NULL,  [name] varchar(45) NOT NULL, PRIMARY KEY ([id]) );'
					);
				})
				.then(() => {
					var data = [
						{id: 'abc1', name: 'test1', amount: 7},
						{id: 'abc2', name: 'test2', amount: 8},
						{id: 'abc3', name: 'test3', amount: 9},
					];
					return alasql.promise('INSERT INTO asset7 SELECT * FROM ?', [data]);
				})
				.then(() => {
					return alasql.promise('CREATE TRIGGER mytrigger after INSERT ON asset7 onInsert');
				})
				.then(() => {
					var data2 = [{id: 'abc4', name: 'test17', amount: 17}];
					return alasql.promise(`INSERT INTO asset7 SELECT * FROM ?`, [data2]);
				})
				.then(() => {
					expect(count).toEqual(1);
					done();
				});
		});
	});
