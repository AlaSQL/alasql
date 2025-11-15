// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

if (!process.env.ALASQL_TEST_SKIP_HTTP)
	describe.concurrent('Test 2112 - load binary file', () => {
		const testNum = '2112'; // insert test file number

		test('A) Loads binary file (sync)', () => {
			alasql.utils.loadBinaryFile('./test/test' + testNum + '.dat', false, function (data) {
				expect(data).toEqual('ï¿½');
			});
		});

		test('B) Loads binary file (async)', done => {
			alasql.utils.loadBinaryFile('./test/test' + testNum + '.dat', true, function (data) {
				expect(data).toEqual('ï¿½');
				done();
			});
		});

		test('C) Loads HTTPS binary file (async)', done => {
			alasql.utils.loadBinaryFile(
				'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg',
				true,
				function (data) {
					expect(data.slice(0, 3)).toEqual('ÿØÿ');
					done();
				}
			);
		});
	});
