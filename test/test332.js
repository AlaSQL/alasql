if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var md5 = require('blueimp-md5').md5;
} else {
	__dirname = '.';
}

describe('Test 331 SLT#2 - test', function() {
	before(function() {
		alasql('CREATE DATABASE test332;USE test332');
	});

	after(function() {
		alasql('DROP DATABASE test332');
		alasql.options.modifier = undefined;
	});

	it('2. Create table', function(done) {
		var res = alasql(function() {
			/*
    CREATE TABLE t1(a INTEGER, b INTEGER, c INTEGER, d INTEGER, e INTEGER);
    INSERT INTO t1(e,c,b,d,a) VALUES(NULL,102,NULL,101,104);
    INSERT INTO t1(a,c,d,e,b) VALUES(107,106,108,109,105);
    INSERT INTO t1(e,d,b,a,c) VALUES(110,114,112,NULL,113);
    INSERT INTO t1(d,c,e,a,b) VALUES(116,119,117,115,NULL);
    INSERT INTO t1(c,d,b,e,a) VALUES(123,122,124,NULL,121);
    INSERT INTO t1(a,d,b,e,c) VALUES(127,128,129,126,125);
    INSERT INTO t1(e,c,a,d,b) VALUES(132,134,131,133,130);
    INSERT INTO t1(a,d,b,e,c) VALUES(138,136,139,135,137);
    INSERT INTO t1(e,c,d,a,b) VALUES(144,141,140,142,143);
    INSERT INTO t1(b,a,e,d,c) VALUES(145,149,146,NULL,147);
    INSERT INTO t1(b,c,a,d,e) VALUES(151,150,153,NULL,NULL);
    INSERT INTO t1(c,e,a,d,b) VALUES(155,157,159,NULL,158);
    INSERT INTO t1(c,b,a,d,e) VALUES(161,160,163,164,162);
    INSERT INTO t1(b,d,a,e,c) VALUES(167,NULL,168,165,166);
    INSERT INTO t1(d,b,c,e,a) VALUES(171,170,172,173,174);
    INSERT INTO t1(e,c,a,d,b) VALUES(177,176,179,NULL,175);
    INSERT INTO t1(b,e,a,d,c) VALUES(181,180,182,183,184);
    INSERT INTO t1(c,a,b,e,d) VALUES(187,188,186,189,185);
    INSERT INTO t1(d,b,c,e,a) VALUES(190,194,193,192,191);
    INSERT INTO t1(a,e,b,d,c) VALUES(199,197,198,196,195);
    INSERT INTO t1(b,c,d,a,e) VALUES(NULL,202,203,201,204);
    INSERT INTO t1(c,e,a,b,d) VALUES(208,NULL,NULL,206,207);
    INSERT INTO t1(c,e,a,d,b) VALUES(214,210,213,212,211);
    INSERT INTO t1(b,c,a,d,e) VALUES(218,215,216,217,219);
    INSERT INTO t1(b,e,d,a,c) VALUES(223,221,222,220,224);
    INSERT INTO t1(d,e,b,a,c) VALUES(226,227,228,229,225);
    INSERT INTO t1(a,c,b,e,d) VALUES(234,231,232,230,233);
    INSERT INTO t1(e,b,a,c,d) VALUES(237,236,239,NULL,238);
    INSERT INTO t1(e,c,b,a,d) VALUES(NULL,244,240,243,NULL);
    INSERT INTO t1(e,d,c,b,a) VALUES(246,248,247,249,245);

    */
		});
		assert.deepEqual(res.length, 31);
		done();
	});

	it('2a. SELECT 126', function(done) {
		alasql.options.modifier = 'MATRIX';
		var res = alasql(function() {
			/*
      SELECT a,
             (SELECT count(*) FROM t1 AS x WHERE x.b<t1.b),
             a+b*2+c*3+d*4+e*5,
             d
        FROM t1
       WHERE a IS NULL

    */
		});
		//    console.log(res);
		assert.deepEqual(res, [[undefined, 1, undefined, 114], [undefined, 18, undefined, 207]]);
		done();
	});
	it('3. SELECT AVG', function(done) {
		alasql.options.modifier = 'MATRIX';
		var res = alasql(function() {
			/*
      SELECT avg(c) FROM t1
  */
		});
		/// console.log(res);
		//    assert.deepEqual(res.length,30);
		done();
	});

	it('3. SELECT 97', function(done) {
		alasql.options.modifier = 'MATRIX';
		var res = alasql(function() {
			/*
      SELECT CASE WHEN c>(SELECT avg(c) FROM t1) THEN a*2 ELSE b*10 END
      FROM t1
  */
		});
		//    console.log(res.length);
		assert.deepEqual(res.length, 30);
		done();
	});

	it('4. SELECT 97', function(done) {
		alasql.options.modifier = 'MATRIX';
		var res = alasql(function() {
			/*
      SELECT b-c,
             c
        FROM t1
       WHERE (e>a AND e<b)  */
		});
		/// console.log(res.sort());
		//    assert.deepEqual(res.length,30);
		done();
	});
});
