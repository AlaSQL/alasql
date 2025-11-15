// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

var name = '';
describe('Test 365 Default database function', () => {
	test('1. CREATE DATABASE', done => {
		var db = new alasql.Database();
		name = db.databaseid;
		//    console.log(db);
		var res = db.exec('VALUE OF SELECT 2+3');
		expect(res).toEqual(5);
		done();
	});

	test('99. DROP DATABASE', done => {
		alasql('DROP DATABASE ' + name);
		done();
	});
});
