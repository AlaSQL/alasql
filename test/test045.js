// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

describe('Test 45', function () {
	describe('table AS alias', function () {
		test('CASE Expression WHEN THEN END', function (done) {
			alasql('create database test45');
			alasql('use test45');
			alasql('CREATE TABLE one (a INT)');
			alasql('INSERT INTO one VALUES (1),(2),(3),(4),(5)');

			assert.equal(5, alasql('SELECT a FROM one').length);
			assert.equal(5, alasql('SELECT one.a FROM one').length);
			assert.equal(5, alasql('SELECT t.a FROM one t').length);
			assert.equal(5, alasql('SELECT t.a FROM one AS t').length);
			alasql('drop database test45');
			done();
		});
	});
});
