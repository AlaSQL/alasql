if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 261 SqlLogic Parser Test #4', function () {
	it('1. Sqllogic', function (done) {
		alasql('CREATE DATABASE test261; USE test261');
		done();
	});

	it('2. CREATE TABLE', function (done) {
		var res = alasql('CREATE TABLE t1(a INTEGER, b INTEGER, c INTEGER, d INTEGER, e INTEGER)');
		assert(res == 1);
		done();
	});

	it('3. INSERT', function (done) {
		var res = alasql('INSERT INTO t1(e,d,c,b,a) VALUES(246,248,247,249,245)');
		assert(res == 1);
		done();
	});

	it('4. SELECT CASE', function (done) {
		var res = alasql(
			'SELECT CASE WHEN c>(SELECT avg(c) FROM t1) \
      THEN a*2 ELSE b*10 END FROM t1'
		);
		done();
	});

	it('5. SELECT', function (done) {
		var res = alasql(' SELECT a+b*2+c*3+d*4+e*5, (a+b+c+d+e)/5 FROM t1');
		//    console.log(res);
		done();
	});

	it('6. SELECT', function (done) {
		var res = alasql(function () {
			/*
      SELECT a+b*2+c*3+d*4+e*5,
             CASE WHEN a<b-3 THEN 111 WHEN a<=b THEN 222
              WHEN a<b+3 THEN 333 ELSE 444 END,
             abs(b-c),
             (a+b+c+d+e)/5,
             a+b*2+c*3
        FROM t1
       WHERE (e>c OR e<d)
         AND d>e
         AND EXISTS(SELECT 1 FROM t1 AS x WHERE x.b<t1.b)
  */
		});
		//    console.log(res);
		done();
	});

	it('7. SELECT', function (done) {
		var res = alasql(function () {
			/*
      SELECT CASE WHEN c>(SELECT avg(c) FROM t1) THEN a*2 ELSE b*10 END
        FROM t1
       WHERE e+d BETWEEN a+b-10 AND c+130
         AND c>d
  */
		});
		//    console.log(res);

		done();
	});

	it('99. Drop Database', function (done) {
		alasql('DROP DATABASE test261');
		done();
	});
});
