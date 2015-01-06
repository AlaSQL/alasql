if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 02', function() {
	it('Create table', function(done){
		alasql('create database test02; use test02;');
		alasql('DROP TABLE IF EXISTS schools');
	 	alasql('CREATE TABLE schools (schoolid INT, schoolname STRING)');
	 	assert.equal(alasql.databases.test02.tables.schools.columns.length,2);
	 	alasql('drop database test02');
	    done();
	});

});
