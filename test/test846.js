if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 846', function () {
	it('Create table with args', function (done) {
		alasql`create database test846; use test846`;
		alasql`DROP TABLE IF EXISTS schools`;
		alasql`CREATE TABLE schools (schoolid INT, schoolname STRING)`;
		assert.equal(alasql.databases.test846.tables.schools.columns.length, 2);
		alasql`drop database test846`;
		done();
	});
});
