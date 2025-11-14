// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 2112 - load binary file', function () {
	const testNum = '2112'; // insert test file number

	test('A) Loads binary file (sync)', function () {
		alasql.utils.loadBinaryFile('./test/test' + testNum + '.dat', false, function (data) {
			assert.equal(data, 'ï¿½');
		});
	});

	test('B) Loads binary file (async)', function (done) {
		alasql.utils.loadBinaryFile('./test/test' + testNum + '.dat', true, function (data) {
			assert.equal(data, 'ï¿½');
			done();
		});
	});

	test('C) Loads HTTPS binary file (async)', function (done) {
		alasql.utils.loadBinaryFile(
			'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
			true,
			function (data) {
				assert.equal(data.slice(0, 3), 'ÿØÿ');
				done();
			}
		);
	});
});
