// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 256 INTO() in result and into params array', function () {
	test('1. INTO param', function (done) {
		var data = [{a: 1}, {a: 2}];
		var resdata = [{a: 0}];
		var res = alasql('SELECT * INTO ? FROM ?', [resdata, data]);
		assert(res == 2);
		assert.deepEqual(resdata, [{a: 0}, {a: 1}, {a: 2}]);
		done();
	});

	test('2. INTO TXT() result', function (done) {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT * INTO TXT() FROM ?', [data]);
		assert(res == '1\n2');
		done();
	});

	test('3. INTO JSON() result', function (done) {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT * INTO JSON() FROM ?', [data]);
		assert(res == '[{"a":1},{"a":2}]');
		done();
	});

	test('4. INTO SQL() result', function (done) {
		var data = [
			{a: 1, b: 2},
			{a: 2, b: 2},
		];
		var res = alasql('SELECT * INTO SQL({tableid:"one"}) FROM ?', [data]);
		assert(res == 'INSERT INTO one(a,b) VALUES (1,2);\nINSERT INTO one(a,b) VALUES (2,2);\n');
		done();
	});

	test('4. INTO CSV() result', function (done) {
		var data = [
			{a: 1, b: 2},
			{a: 2, b: 2},
		];
		var res = alasql('SELECT * INTO CSV({headers:true, utf8Bom:false}) FROM ?', [data]);
		assert.equal(res, '"a";"b"\r\n1;2\r\n2;2\r\n');
		done();
	});

	test('5. INTO XLSX() result', function (done) {
		var data = [
			{a: 1, b: 2},
			{a: 2, b: 2},
		];
		var res = alasql('SELECT * INTO XLSX({headers:true}) FROM ?', [data]);
		/// console.log(res);
		//    assert(res == 'a,b\n1,2\n2,2\n')
		done();
	});
});
