// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 427;

describe('Test ' + testId + ' REPLACE test', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test' + testId + ';USE test' + testId);
	});

	afterAll(function () {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Simple Replace', function (done) {
		alasql('CREATE TABLE one (a STRING)');
		alasql('INSERT INTO one VALUES (".a."),("_._")');
		var res = alasql('COLUMN OF SELECT REPLACE(a,".","_") FROM one');
		//assert.deepEqual(res, [ '_a_', '___' ]);
		done();
	});
});
