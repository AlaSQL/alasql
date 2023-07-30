if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// only run in browser
if (typeof exports != 'object') {
	describe('Test 1556 - indexeddb should return rowKey-value when no keyPath(columns) is present', () => {
		const sql = alasql.promise;
		before(() => {
			// delete indexeddb
			return sql('DROP IndexedDB DATABASE IF EXISTS alaindexed;');
		});

		it('should respond rowkey-value as the response', async () => {
			await sql(
				'CREATE INDEXEDDB DATABASE IF NOT EXISTS alaindexed;' +
					'ATTACH INDEXEDDB DATABASE alaindexed;' +
					'USE alaindexed'
			);
			await sql(['CREATE TABLE IF NOT EXISTS mytable1']);

			await sql(["INSERT INTO mytable1 VALUES ( 'random_value' )"]);

			// adding data to db using api/idbObject
			const request = indexedDB.open('alaindexed');
			request.onsuccess = () => {
				var tx = request.result.transaction(['mytable1'], 'readwrite');
				var tb = tx.objectStore('mytable1');
				tb.add('random_value2', 'shell_id_key');
			};

			request.onerror = () => {
				reject(new Error('IndexedDB insert error'));
			};

			const data = await sql('SELECT * from [mytable1]');
			console.log('FInal data res ', data);
			assert.deepEqual(data, [{1: ['random_value']}, {shell_id_key: 'random_value2'}]);
		});
	});
}
