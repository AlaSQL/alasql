// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
import alasql from '..';

var testId = 3;

describe.skip('Test 03 - ' + testId + 'times', function () {
	var sql1 = 'CREATE TABLE IF NOT EXISTS schools (schoolid INT, schoolname STRING)';
	var sql2 = "INSERT INTO schools (schoolid, schoolname) VALUES (999,'Northern Pacific School')";
	var sql3 = "INSERT INTO schools VALUES (998,'Western Pacific School')";

	// zt('Start', testId, function () {});

	test('0. Create table', function (done) {
		alasql('create database test03; use test03');
		alasql('drop table if exists schools');
		var res = alasql(sql1);
		assert.equal(res, 1, 'CREATE TABLE should return 1');
		done();
	});

	test('1. Test insert with columns ', function (done) {
		var res = alasql(sql2);
		assert.equal(res, 1, 'INSERT should affect 1 row');
		done();
	});

	test('2. Test insert without columns', function (done) {
		var res = alasql(sql3);
		assert.equal(res, 1, 'INSERT should affect 1 row');
		done();
	});

	test('3. Test insert without compilation #1', function (done) {
		var res = alasql(sql3);
		assert.equal(res, 1, 'INSERT should affect 1 row');
		done();
	});

	test('4. Test insert without compilation and caching', function (done) {
		var res = alasql(sql3.replace('999', (Math.random() * 1000) | 0));
		assert.equal(res, 1, 'INSERT should affect 1 row');
		done();
	});

	test('5. Test compiled insert', function (done) {
		var insert1 = alasql.compile(sql3);
		var res = insert1();
		assert.equal(res, 1, 'Compiled INSERT should affect 1 row');
		done();
	});

	test('6. Test compiled insert with parameters', function (done) {
		var insert2 = alasql.compile('INSERT INTO schools VALUES (?,?)');
		var res = insert2([1, 'Canterberry High School']);
		assert.equal(res, 1, 'Compiled INSERT with params should affect 1 row');
		done();
	});

	test('COUNT(*)', function (done) {
		var res = alasql('SELECT COUNT(*) FROM schools');
		//		console.log(res);
		assert.equal(6 * testId, res[0]['COUNT(*)']);
		done();
	});

	test('Drop database', function (done) {
		alasql('drop database test03');
		done();
	});

	//    zt.log();
});
