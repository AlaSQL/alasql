// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

var name = '';
describe('Test 365 Default database function', function () {
	test('1. CREATE DATABASE', function (done) {
		var db = new alasql.Database();
		name = db.databaseid;
		//    console.log(db);
		var res = db.exec('VALUE OF SELECT 2+3');
		assert.deepEqual(res, 5);
		done();
	});

	test('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE ' + name);
		done();
	});
});
