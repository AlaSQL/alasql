if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('004 Callbacks', function () {
	it('Callback', function (done) {
		alasql('CREATE DATABASE test04;use test04');
		//		alasql.exec('DROP TABLE IF EXISTS schools');

		var sql1 = 'CREATE TABLE IF NOT EXISTS schools (schoolid INT, schoolname STRING)';
		var sql2 = "INSERT INTO schools (schoolid, schoolname) VALUES (1,'Northern Pacific School')";
		var sql3 = 'SELECT * FROM schools';

		var res = alasql(sql1);
		var res = alasql(sql2);
		//		var res = alasql(sql3);
		//		console.log(res);

		var res = alasql(sql3, [], function (data) {
			//			console.log(999,data);
			assert.equal(1, data.length);
			assert.deepEqual(data, [{schoolid: 1, schoolname: 'Northern Pacific School'}]);
			done();
		});
		//		console.log(888,res);
	});

	it('Works without params set', function (done) {
		alasql('VALUE OF SELECT 1', function (data) {
			assert.equal(1, data);
			done();
		});
	});
});
