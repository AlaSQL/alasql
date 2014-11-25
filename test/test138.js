if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 138 NoSQL', function() {

	it("1. deepCopy", function(done){
		alasql('CREATE DATABASE test138; use test138');

		var res = alasql('SELECT COLUMN @a FROM @[{a:[1,2]}, {a:[3,4]}]');
		assert.deepEqual(res, [[1,2],[3,4]]);

		var ar = [{a:[1,2]}, {a:[3,4]}];
		var res = alasql('SELECT COLUMN a FROM ?',[ar]);
		assert.deepEqual(res, [[1,2],[3,4]]);
		ar[0].a = [5,6];
		assert.deepEqual(res, [5,6],[3.4]]);

		var ar = [{a:[1,2]}, {a:[3,4]}];
		var res = alasql('SELECT COLUMN @a FROM ?',[ar]);
		assert.deepEqual(res, [[1,2],[3,4]]);
		ar[0].a = [5,6];
		assert.deepEqual(res, [[1,2],[3,4]]);

		var ar = [{a:[[1,2],2]}, {a:[3,4]}];
		var res = alasql('SELECT VALUE a->0 FROM ? WHERE a->1 = 2',[ar]);
		assert.deepEqual(res, [1,2]);
		ar[0].a[0] = 7;
		assert.deepEqual(res, 7);

		var ar = [{a:[[1,2],2]}, {a:[3,4]}];
		var res = alasql('SELECT VALUE @a->0 FROM ? WHERE a->1 = 2',[ar]);
		assert.deepEqual(res, [1,2]);
		ar[0].a[0] = 7;
		assert.deepEqual(res, [1,2]);

		done();
	});

	it("2. Get JSON property operator", function(done){
		alasql('CREATE TABLE one');

		alasql('INSERT INTO one VALUES @{a:2}, ?',[{a:4}]);

		var res = alasql('SELECT COLUMN a FROM one');
		assert.deepEqual(res, [2,4]);


		done();
	});

	it("3. GROUP functions", function(done){
		alasql('CREATE TABLE two (a INT, b INT)');
		alasql('INSERT INTO two VALUES (1,1), (1,2), (1,3), (2,1), (2,2)');
		alasql('SELECT a, SUM(b) AS b1, COUNT(*) AS c1, GROUP(b1/c1) AS avg FROM two GROUP BY a');
		assert.deepEqual(res, [{a:1,b1:6,c1:3,avg:2}, {a:2,b1:3,c1:2,avg:1.5}]);

		var res = alasql('SELECT SUM(b) AS bb FROM two GROUP BY TOTAL');
		assert.deepEqual(res, [{bb:9}]);

		var res = alasql('SELECT a,SUM(b) AS bb FROM two GROUP BY TOTAL,a,TOTAL');
		assert.deepEqual(res, [{bb:9}, {a:1,bb:6}, {a:2,bb:3}, {bb:9}]);

		done();
	});

	it("4. Get JSON param values in sub-arrays", function(done){
		alasql('DROP DATABASE test138');
		done();
	});
});
