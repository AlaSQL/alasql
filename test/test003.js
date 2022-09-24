if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var zt = require('../lib/zt/zt.js');
}

var NUMTESTS = 10000;

describe('Test 03 - ' + NUMTESTS + 'times', function () {
	var sql1 = 'CREATE TABLE IF NOT EXISTS schools (schoolid INT, schoolname STRING)';
	var sql2 = "INSERT INTO schools (schoolid, schoolname) VALUES (999,'Northern Pacific School')";
	var sql3 = "INSERT INTO schools VALUES (998,'Western Pacific School')";

	zt('Start', NUMTESTS, function () {});

	it('0. Create table', function (done) {
		alasql('create database test03; use test03');
		alasql('drop table if exists schools');
		var res = alasql(sql1);
		done();
	});

	it('1. Test insert with columns ', function (done) {
		zt('Test insert with columns', function () {
			alasql(sql2);
		});
		done();
	});

	it('2. Test insert without columns', function (done) {
		zt('Test insert without columns ', function () {
			alasql(sql3);
		});
		done();
	});

	it('3. Test insert without compilation #1', function (done) {
		this.timeout(5000);
		zt('Test insert without compilation #1', function () {
			alasql(sql3);
		});
		done();
	});

	it('4. Test insert without compilation and caching', function (done) {
		this.timeout(5000);
		zt('Test insert without compilation and caching', function () {
			alasql(sql3.replace('999', (Math.random() * 1000) | 0));
		});
		done();
	});

	it('5. Test compiled insert', function (done) {
		this.timeout(5000);
		var insert1 = alasql.compile(sql3);
		zt('Test compiled insert', function () {
			insert1();
		});
		done();
	});

	it('6. Test compiled insert with parameters', function (done) {
		var insert2 = alasql.compile('INSERT INTO schools VALUES (?,?)');
		zt('Test compiled insert with parameters', function () {
			insert2([1, 'Canterberry High School']);
		});
		done();
	});

	it('COUNT(*)', function (done) {
		var res = alasql('SELECT COUNT(*) FROM schools');
		//		console.log(res);
		assert.equal(6 * NUMTESTS, res[0]['COUNT(*)']);
		done();
	});

	it('Drop database', function (done) {
		alasql('drop database test03');
		done();
	});

	//    zt.log();
});
