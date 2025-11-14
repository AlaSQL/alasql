// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

describe('Test 361 IN (SELECT)', function () {
	beforeAll(function () {
		alasql('CREATE DATABASE test361;USE test361');
	});

	afterAll(function () {
		alasql('DROP DATABASE test361');
	});

	test('1. Can be passed', function (done) {
		//    var res = alasql('select 1 where 1 in (select 1)');
		var res = alasql('recordset of select 1 in (select 1)');
		var res = alasql('=1 in (select 1)');
		var res = alasql('select 1 where 1 in (select 1)');
		//    console.log(res);
		//    var res = alasql('select 2 where true');
		//    console.log(1,res);
		done();
	});

	test.skip('2. Gives correct results', function (done) {
		var res = alasql('recordset of select 1 in (select 1)');
		assert.equal(res, 1234);

		var res = alasql('=1 in (select 1)');
		assert.equal(res, 1234);

		var res = alasql('select 1 where 1 in (select 1)');
		assert.equal(res, 1234);

		done();
	});
});
