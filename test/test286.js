if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

describe('Test 286 CREATE UNIQUE INDEX', function () {
	it('1. CREATE TABLE and FIRST INSERT', function (done) {
		alasql('CREATE DATABASE test286;USE test286');
		alasql('CREATE TABLE one (a int, b int)');
		alasql('CREATE TABLE two (b int, c int)');
		alasql('CREATE TABLE three (c int, d int)');
		alasql('CREATE TABLE four (e int, e int)');
		done();
	});
	it('2. Fill tables with data', function (done) {
		this.timeout(100000);

		var K = 10; // Number of runs
		var P = 20; // Number of records coefficient

		var L = 0; // Number of successful runs
		for (var k = 0; k < K; k++) {
			var M = [
				(Math.random() * P + 1) | 0,
				(Math.random() * P + 1) | 0,
				(Math.random() * P + 1) | 0,
				(Math.random() * P + 1) | 0,
				(Math.random() * P + 1) | 0,
			];
			var R = test(M);
			//console.log(M,R, (M[1]*M[2]>M[3]*M[4])==(R[0]>R[1]));

			// Hypothesis
			if (M[1] * M[2] > M[3] * M[4] == R[0] > R[1]) L++;
		}
		/// console.log(L/K); // Probablity
		done();
	});
	it('3. DROP DATABASE', function (done) {
		var res = alasql('DROP DATABASE test286');
		done();
	});
});

function test(M) {
	alasql('DELETE FROM one;');
	alasql('DELETE FROM two;');
	alasql('DELETE FROM three;');
	alasql('DELETE FROM four;');

	for (var i = 0; i < M[0]; i++) {
		for (var j = 0; j < M[1]; j++) {
			alasql('INSERT INTO one VALUES ?', [{a: i, b: j}]);
		}
		for (var j = 0; j < M[2]; j++) {
			alasql('INSERT INTO two VALUES ?', [{b: i, c: j}]);
		}
		for (var j = 0; j < M[3]; j++) {
			alasql('INSERT INTO three VALUES ?', [{c: i, d: j}]);
		}
		for (var j = 0; j < M[4]; j++) {
			alasql('INSERT INTO four VALUES ?', [{d: i, e: j}]);
		}
	}

	alasql.databases[alasql.useid].resetSqlCache();
	alasql.databases[alasql.useid].dbversion++;
	var tm1 = Date.now();
	var res1 = alasql(
		'SELECT * FROM one \
      INNER JOIN two ON one.b = two.b \
      INNER JOIN three ON two.c = three.c \
      INNER JOIN four ON three.d = four.d \
      '
	);
	var tm1 = Date.now() - tm1;

	alasql.databases[alasql.useid].resetSqlCache();
	alasql.databases[alasql.useid].dbversion++;

	var tm2 = Date.now();
	var res2 = alasql(
		'SELECT * \
      FROM four \
      INNER JOIN three ON three.d = four.d \
      INNER JOIN two ON two.c = three.c \
      INNER JOIN one ON one.b = two.b \
      '
	);
	var tm2 = Date.now() - tm2;
	if (res1.length != res2.length) {
		/// console.log(M,res1.length,res2.length);
		throw new Error('Different results');
	}
	return [tm1, tm2];
}
