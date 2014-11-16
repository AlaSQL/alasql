if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 54 - SELECT Number', function() {
	it('SELECT number', function(done){
		alasql('create database test54');
		alasql('use test54');

		assert(10 == alasql.value('SELECT 10'));
		assert.deepEqual([10,20],alasql.row('SELECT 10,20'));
		assert(4 == alasql.value('SELECT 2+2'));
		assert("Peter" == alasql.value('SELECT "Peter"'));
		assert(10 == alasql.value('SELECT a FROM (SELECT 10 AS a) AS t'));
		assert(10 == alasql.value('SELECT a FROM (SELECT 10 as a)'));
		assert.deepEqual([10,20], alasql.array('SELECT a FROM (SELECT 10 as a UNION ALL SELECT 20 as a)'));
		done();
	});
});
