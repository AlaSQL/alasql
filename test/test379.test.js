// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import DOMStorage from 'dom-storage';

global.localStorage = new DOMStorage('./test379.json', {
	strict: false,
	ws: '',
});

describe('Test 379', () => {
	test('Recreate dropped table - localStorage engine', done => {
		alasql('SET AUTOCOMMIT ON');
		alasql('DROP LOCALSTORAGE DATABASE IF EXISTS ls379');
		alasql('CREATE LOCALSTORAGE DATABASE ls379');
		alasql('ATTACH LOCALSTORAGE DATABASE ls379');
		alasql('CREATE TABLE IF NOT EXISTS ls379.one (a int, b string)');
		alasql('DROP TABLE ls379.one');
		alasql('CREATE TABLE IF NOT EXISTS ls379.one (a int, b string)');
		var res = alasql('SELECT 1 FROM ls379.one');
		expect(res).toEqual([]);
		done();
	});
});
