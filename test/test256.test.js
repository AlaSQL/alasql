// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 256 INTO() in result and into params array', () => {
	test('1. INTO param', done => {
		var data = [{a: 1}, {a: 2}];
		var resdata = [{a: 0}];
		var res = alasql('SELECT * INTO ? FROM ?', [resdata, data]);
		expect(res == 2).toBe(true);
		expect(resdata).toEqual([{a: 0}, {a: 1}, {a: 2}]);
		done();
	});

	test('2. INTO TXT() result', done => {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT * INTO TXT() FROM ?', [data]);
		expect(res == '1\n2').toBe(true);
		done();
	});

	test('3. INTO JSON() result', done => {
		var data = [{a: 1}, {a: 2}];
		var res = alasql('SELECT * INTO JSON() FROM ?', [data]);
		expect(res == '[{"a":1},{"a":2}]').toBe(true);
		done();
	});

	test('4. INTO SQL() result', done => {
		var data = [
			{a: 1, b: 2},
			{a: 2, b: 2},
		];
		var res = alasql('SELECT * INTO SQL({tableid:"one"}) FROM ?', [data]);
		expect(
			res == 'INSERT INTO one(a,b).toBe(true) VALUES (1,2);\nINSERT INTO one(a,b) VALUES (2,2);\n'
		);
		done();
	});

	test('4. INTO CSV() result', done => {
		var data = [
			{a: 1, b: 2},
			{a: 2, b: 2},
		];
		var res = alasql('SELECT * INTO CSV({headers:true, utf8Bom:false}) FROM ?', [data]);
		expect(res).toEqual('"a";"b"\r\n1;2\r\n2;2\r\n');
		done();
	});

	test('5. INTO XLSX() result', done => {
		var data = [
			{a: 1, b: 2},
			{a: 2, b: 2},
		];
		var res = alasql('SELECT * INTO XLSX({headers:true}) FROM ?', [data]);
		/// console.log(res);
		//    expect(res == 'a,b\n1,2\n2,2\n').toBe(true)
		done();
	});
});
