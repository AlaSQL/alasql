if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
};

describe('Test 04', function() {
	it('Callback', function(done){

		var sql1 = 'CREATE TABLE IF NOT EXISTS schools (schoolid INT, schoolname STRING)';
		var sql2 = "INSERT INTO schools (schooldid, schoolname) VALUES (1,'Northern Pacific School')";
		var sql3 = 'SELECT * FROM schools';

		alasql.exec('DROP TABLE IF EXISTS schools');
		var res = alasql.exec(sql1);
		var res = alasql.exec(sql2);
		var res = alasql.exec(sql3, [], function(data){ 
			assert.equal(1,data.length);
			done();
		});
	});
});
