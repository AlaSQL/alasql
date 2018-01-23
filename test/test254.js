if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 254 UNION of two tables with different columns', function() {
	it('1. Create database', function(done) {
		alasql('CREATE DATABASE test254;USE test254');
		alasql(
			'CREATE TABLE t1(a int,b int);  \
            INSERT INTO t1 VALUES(1,1);  \
            INSERT INTO t1 VALUES(1,2);  \
            INSERT INTO t1 VALUES(1,3);  \
            CREATE TABLE t2(a int,b int);  \
            INSERT INTO t2 VALUES(1,2);  \
            INSERT INTO t2 VALUES(1,5);  \
      '
		);
		done();
	});

	it('2. UNION ALL CORRESPONDING', function(done) {
		var res = alasql('SELECT a, b FROM t1 UNION ALL CORRESPONDING SELECT b, a FROM t1');
		assert.deepEqual(res, [
			{a: 1, b: 1},
			{a: 1, b: 2},
			{a: 1, b: 3},
			{b: 1, a: 1},
			{b: 2, a: 1},
			{b: 3, a: 1},
		]);
		done();
	});

	it('3. UNION ALL not CORRESPONDING', function(done) {
		var res = alasql('SELECT a, b FROM t1 UNION ALL SELECT b, a FROM t1');
		assert.deepEqual(res, [
			{a: 1, b: 1},
			{a: 1, b: 2},
			{a: 1, b: 3},
			{a: 1, b: 1},
			{a: 2, b: 1},
			{a: 3, b: 1},
		]);
		done();
	});

	it('4. UNION CORRESPONDING', function(done) {
		var res = alasql('SELECT a, b FROM t1 UNION CORRESPONDING SELECT b, a FROM t1');
		assert.deepEqual(res, [{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}]);
		done();
	});

	it('5. UNION non CORRESPONDING', function(done) {
		var res = alasql('SELECT a, b FROM t1 UNION SELECT b, a FROM t1');
		assert.deepEqual(res, [
			{a: 1, b: 1},
			{a: 2, b: 1},
			{a: 3, b: 1},
			{a: 1, b: 2},
			{a: 1, b: 3},
		]);
		done();
	});

	it('6. INTERSECT CORRESPONDING', function(done) {
		var res = alasql('SELECT a, b FROM t1 INTERSECT CORRESPONDING SELECT b, a FROM t1');
		//    console.log(res);
		assert.deepEqual(res, [{a: 1, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}]);
		done();
	});

	it('7. INTERSECT non CORRESPONDING', function(done) {
		var res = alasql('SELECT a, b FROM t1 INTERSECT SELECT b, a FROM t1');
		//    console.log(res);
		assert.deepEqual(res, [{a: 1, b: 1}]);
		done();
	});

	it('8. EXCEPT CORRESPONDING', function(done) {
		var res = alasql('SELECT a, b FROM t1 EXCEPT CORRESPONDING SELECT b, a FROM t1');
		//    console.log(res);
		assert.deepEqual(res, []);
		done();
	});

	it('9. EXCEPT non CORRESPONDING', function(done) {
		var res = alasql('SELECT a, b FROM t1 EXCEPT SELECT b, a FROM t1');
		//    console.log(res);
		assert.deepEqual(res, [{a: 1, b: 2}, {a: 1, b: 3}]);
		done();
	});

	it('99. Drop database', function(done) {
		alasql('DROP DATABASE test254');
		done();
	});
});
