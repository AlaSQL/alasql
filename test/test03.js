if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
	var zt = require('../lib/zt/zt.js');
};

describe('Test 03 - 100,000 times', function() {

	
	var sql1 = 'CREATE TABLE IF NOT EXISTS schools (schoolid INT, schoolname STRING)';
	var sql2 = "INSERT INTO schools (schoolid, schoolname) VALUES (999,'Northern Pacific School')";
	var sql3 = "INSERT INTO schools VALUES (998,'Western Pacific School')";

	zt('Start',100000,function(){});

	it('0. Create table', function(done){
		alasql('drop table if exists schools');
		var res = alasql.exec(sql1);
		done();
	});

	it("1. Test insert with columns ", function(done) {
		zt('Test insert with columns', function() {
			alasql.exec(sql2);
		});
		done();
	});

	it("2. Test insert without columns", function(done) {
		zt('Test insert without columns ', function() {
			alasql.exec(sql3);
		});
		done();
	});

	it("3. Test insert without compilation #1", function(done) {
		zt('Test insert without compilation #1', function() {
			alasql.exec(sql3);
		});
		done();
	});

	it("4. Test insert without compilation and caching", function(done) {
		zt('Test insert without compilation and caching', function() {
			alasql.exec(sql3.replace('999', ((Math.random()*1000)|0)));
		});
		done();
	});

	it("5. Test compiled insert", function(done) {
		var insert1 = alasql.compile(sql3);
		zt('Test compiled insert', function() {
			insert1();
		});
		done();
	});

	it("6. Test compiled insert with parameters", function(done) {
		var insert2 = alasql.compile("INSERT INTO schools VALUES (?,?)");
		zt('Test compiled insert with parameters', function() {
			insert2([1,"Canterberry High School"]);
		});
		done();
	});

	it('COUNT(*)', function(done) {
		var res = alasql.exec('SELECT COUNT(*) FROM schools');
		assert.equal(600000, res[0]['COUNT(*)']);
		done();
	});

//    zt.log();
});
