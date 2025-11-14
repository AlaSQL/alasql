// @ts-ignore
import {describe, expect, test, beforeAll, afterAll, xdescribe} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
	Test for issue #379
*/

let baseUrl = 'github.com/AlaSQL/alasql/raw/refs/heads/develop';

var testId = 418;

describe('Test ' + testId + ' Load data from internet', function () {
	beforeAll(function (done) {
		alasql('CREATE DATABASE test' + testId + '; USE test' + testId);
		done();
	});

	afterAll(function (done) {
		alasql('DROP DATABASE test' + testId);
		done();
	});

	async function testRequest(expected, url, headers, done) {
		var type = url.split('.').pop().toUpperCase();
		await alasql
			.promise(
				'VALUE OF SELECT COUNT(*) FROM ' + type + '("' + url + '",{headers:' + headers + '})'
			)
			.then(res => {
				assert.equal(res, expected);
				done();
			})
			.catch(e => {
				console.error(e);
				throw e;
			});
	}

	describe('.xlsx from URL', function () {
		var url = baseUrl + '/test/test411.xlsx';

		test('Load http', function (done) {
			testRequest(4, 'http://' + url, 'true', done);
		});

		test('Load https', function (done) {
			testRequest(4, 'https://' + url, 'true', done);
		});
	});

	describe('.xls from URL', function () {
		var url = baseUrl + '/test/test168.xls';

		test('Load http', function (done) {
			testRequest(5, 'http://' + url, 'true', done);
		});

		test('Load https', function (done) {
			testRequest(5, 'https://' + url, 'true', done);
		});
	});

	describe('.json from URL', function () {
		var url = baseUrl + '/test/test157.json';

		test('Load http', function (done) {
			testRequest(3, 'http://' + url, 'false', done);
		});

		test('Load https', function (done) {
			testRequest(3, 'https://' + url, 'false', done);
		});
	});

	xdescribe('.tab from URL', function () {
		var url = baseUrl + '/test/test157.tab';

		test('Load http', function (done) {
			testRequest(5, 'http://' + url, 'false', done);
		});

		test('Load https', function (done) {
			testRequest(5, 'https://' + url, 'false', done);
		});
	});

	describe('.txt from URL', function () {
		var url = baseUrl + '/test/test157.txt';

		test('Load http', function (done) {
			testRequest(8, 'http://' + url, 'false', done);
		});

		test('Load https', function (done) {
			testRequest(8, 'https://' + url, 'false', done);
		});
	});

	describe('.csv from URL', function () {
		var url = baseUrl + '/test/test157a.csv';

		test('Load http', function (done) {
			testRequest(5, 'http://' + url, 'false', done);
		});

		test('Load https', function (done) {
			testRequest(5, 'https://' + url, 'false', done);
		});
	});
});
