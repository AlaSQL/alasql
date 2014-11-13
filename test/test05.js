if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 05 - DELETE', function() {
	it('DELETE WHERE ', function(done){

		alasql.exec('DROP TABLE IF EXISTS schools');
		var sql1 = 'CREATE TABLE IF NOT EXISTS schools (schoolid INT, schoolname STRING)';
		var sql2 = "INSERT INTO schools (schoolid, schoolname) VALUES (1,'Northern Pacific School')"
		var sql3 = "INSERT INTO schools (schoolid, schoolname) VALUES (2,'Western Atlantic School')";
		var sql4 = "INSERT INTO schools (schoolid, schoolname) VALUES (3,'East Arctic School')";
		var sql5 = "INSERT INTO schools (schoolid, schoolname) VALUES (4,'South Indian School')";
		var sql6 = 'DELETE FROM schools WHERE schoolid = 1 OR schoolid = 3';
		var sql7 = 'SELECT * FROM schools ORDER BY schoolid DESC';

		alasql.exec(sql1);
		alasql.exec(sql2);
		alasql.exec(sql3);
		alasql.exec(sql4);
		alasql.exec(sql5);
		alasql.exec(sql6);
		var res = alasql.exec(sql7);
		assert.equal(4,res[0].schoolid);
		assert.equal(2,res[1].schoolid);		
		done();
	});
});
