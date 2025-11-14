// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 322 UNION TEST', function () {
	test.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test322; USE test322');
		done();
	});

	test.skip('2. UNION ALL', function (done) {
		alasql.options.modifier = undefined;

		var data = [{a: 1}, {a: 2}, {a: 2}, {b: 2}];
		var res = alasql(
			'SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION ALL CORRESPONDING SELECT b FROM $0 WHERE NOT b IS NULL',
			[data]
		);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 2}, {b: 2}]);

		var res = alasql(
			'SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION ALL SELECT b FROM $0 WHERE NOT b IS NULL',
			[data]
		);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 2}, {a: 2}]);

		var res = alasql(
			'SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION SELECT b FROM $0 WHERE NOT b IS NULL ORDER BY a',
			[data]
		);
		assert.deepEqual(res, [{a: 1}, {a: 2}]); // To be checked
		// or 1,2,2

		//    console.log(res);

		done();
	});

	test.skip('3. SEARCH UNION', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 2}, {b: 2}];

		var res = alasql('SEARCH UNION(/a,/b) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	test.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test322');
		done();
	});
});
