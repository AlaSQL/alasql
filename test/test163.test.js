// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import DOMStorage from 'dom-storage';

if (false) {
	describe('Test 163 - Streaming', function () {
		test('1. Create localStorage', function (done) {
			// TODO - finish the test
			done();
		});

		test('2. Select to stdout', function (done) {
			// TODO - finish the test
			alasql('select [0] into txt() from ?', [], function (res) {
				done();
			});
		});

		test('3. Select from stream', function (done) {
			// TODO - finish the test
			alasql('select [0] into stream txt() from stream txt() where [0] like "M%" ');
			done();
		});

		test('4. Select from database as a stream', function (done) {
			// TODO - finish the test
			alasql(
				'select [0] into stream txt() from stream mssql(select * from one) where [0] like "M%" '
			);
			done();
		});
	});
}
