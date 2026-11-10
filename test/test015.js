if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 15', function () {
	it('GROUPING SETS', function (done) {
		var db = alasql.Database();

		db.exec('CREATE TABLE test (a INT, b INT, c INT, d INT)');
		db.exec('INSERT INTO test VALUES (0,0,0, 100)');
		db.exec('INSERT INTO test VALUES (0,0,1, 200)');
		db.exec('INSERT INTO test VALUES (0,1,0, 300)');
		db.exec('INSERT INTO test VALUES (0,1,1, 400)');
		db.exec('INSERT INTO test VALUES (1,0,0, 500)');
		db.exec('INSERT INTO test VALUES (1,0,1, 600)');
		db.exec('INSERT INTO test VALUES (1,1,0, 700)');
		db.exec('INSERT INTO test VALUES (1,1,1, 800)');

		var res = db.exec(
			'SELECT a,b,c, SUM(d) AS d FROM test ' + ' GROUP BY GROUPING SETS(a,b),c ORDER BY a,b,c'
		);

		var tobe = [
			{a: 0, b: null, c: 0, d: 400},
			{a: null, b: 0, c: 0, d: 600},
			{a: 0, b: null, c: 1, d: 600},
			{a: null, b: 0, c: 1, d: 800},
		];

		var check = true;
		for (var i = 0; i < 4; i++) {
			for (var p in tobe[i]) {
				check = check && res[i][p] == tobe[i][p];
			}
		}
		assert.equal(true, check);
		done();
	});

	it('GROUPING SETS keep the groups of (a,c) and (b,c) apart (#644)', function () {
		var db = alasql.Database();
		db.exec('CREATE TABLE test (a INT, b INT, c INT, d INT)');
		db.exec(
			'INSERT INTO test VALUES (0,0,0,100),(0,0,1,200),(0,1,0,300),(0,1,1,400),(1,0,0,500),(1,0,1,600),(1,1,0,700),(1,1,1,800)'
		);

		var res = db.exec('SELECT a,b,c, SUM(d) AS d FROM test GROUP BY GROUPING SETS(a,b),c');

		// Compare without relying on row order
		var key = r => [r.a, r.b, r.c].join();
		var sorted = rows => rows.slice().sort((x, y) => (key(x) < key(y) ? -1 : 1));
		assert.deepStrictEqual(
			sorted(res),
			sorted([
				{a: 0, b: null, c: 0, d: 400},
				{a: 0, b: null, c: 1, d: 600},
				{a: 1, b: null, c: 0, d: 1200},
				{a: 1, b: null, c: 1, d: 1400},
				{a: null, b: 0, c: 0, d: 600},
				{a: null, b: 0, c: 1, d: 800},
				{a: null, b: 1, c: 0, d: 1000},
				{a: null, b: 1, c: 1, d: 1200},
			])
		);
	});
});
