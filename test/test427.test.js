// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';

/*
  Test for issue #379
*/

var testId = 427;

describe('Test ' + testId + ' REPLACE test', () => {
	beforeAll(() => {
		alasql('CREATE DATABASE test' + testId);
	});

	afterAll(() => {
		alasql('DROP DATABASE test' + testId);
	});

	test('1. Simple Replace', done => {
		alasql('CREATE TABLE test427.one (a STRING)');
		alasql('INSERT INTO test427.one VALUES (".a."),("_._")');
		var res = alasql('COLUMN OF SELECT REPLACE(a,".","_") FROM test427.one');
		//expect(res).toEqual([ '_a_', '___' ]);
		done();
	});
});
