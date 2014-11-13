if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 02', function() {
	it('Crete table with compile statement', function(done){
		alasql.exec('DROP TABLE IF EXISTS schools');
	 	var st = alasql.compile('CREATE TABLE schools (schoolid INT, schoolname STRING)');
	 	st();
//	 	console.log(alasql.currentDatabase.databaseid);
//	 	console.log(alasql.);
	 	assert.equal(alasql.currentDatabase.tables.schools.columns.length,2);
	    done();
	});

	it('ADD COLUMN', function(done){
		alasql('create database test02; use test02;');


		done();
	});


});
