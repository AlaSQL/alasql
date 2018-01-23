if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var md5 = require('blueimp-md5').md5;
} else {
	__dirname = '.';
}

describe('Test 331 SLT#1 - test', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test331;USE test331');

		done();
	});

	it('2. CREATE TABLES', function(done) {
		alasql(function() {
			/*
    CREATE TABLE t1(a INTEGER, b INTEGER, c INTEGER, d INTEGER, e INTEGER);
    INSERT INTO t1(e,c,b,d,a) VALUES(103,102,100,101,104);
    INSERT INTO t1(a,c,d,e,b) VALUES(107,106,108,109,105);
    INSERT INTO t1(e,d,b,a,c) VALUES(110,114,112,111,113);
    INSERT INTO t1(d,c,e,a,b) VALUES(116,119,117,115,118);
    INSERT INTO t1(c,d,b,e,a) VALUES(123,122,124,120,121);
    INSERT INTO t1(a,d,b,e,c) VALUES(127,128,129,126,125);
    INSERT INTO t1(e,c,a,d,b) VALUES(132,134,131,133,130);
    INSERT INTO t1(a,d,b,e,c) VALUES(138,136,139,135,137);
    INSERT INTO t1(e,c,d,a,b) VALUES(144,141,140,142,143);
    INSERT INTO t1(b,a,e,d,c) VALUES(145,149,146,148,147);
    INSERT INTO t1(b,c,a,d,e) VALUES(151,150,153,154,152);
    INSERT INTO t1(c,e,a,d,b) VALUES(155,157,159,156,158);
    INSERT INTO t1(c,b,a,d,e) VALUES(161,160,163,164,162);
    INSERT INTO t1(b,d,a,e,c) VALUES(167,169,168,165,166);
    INSERT INTO t1(d,b,c,e,a) VALUES(171,170,172,173,174);
    INSERT INTO t1(e,c,a,d,b) VALUES(177,176,179,178,175);
    INSERT INTO t1(b,e,a,d,c) VALUES(181,180,182,183,184);
    INSERT INTO t1(c,a,b,e,d) VALUES(187,188,186,189,185);
    INSERT INTO t1(d,b,c,e,a) VALUES(190,194,193,192,191);
    INSERT INTO t1(a,e,b,d,c) VALUES(199,197,198,196,195);
    INSERT INTO t1(b,c,d,a,e) VALUES(200,202,203,201,204);
    INSERT INTO t1(c,e,a,b,d) VALUES(208,209,205,206,207);
    INSERT INTO t1(c,e,a,d,b) VALUES(214,210,213,212,211);
    INSERT INTO t1(b,c,a,d,e) VALUES(218,215,216,217,219);
    INSERT INTO t1(b,e,d,a,c) VALUES(223,221,222,220,224);
    INSERT INTO t1(d,e,b,a,c) VALUES(226,227,228,229,225);
    INSERT INTO t1(a,c,b,e,d) VALUES(234,231,232,230,233);
    INSERT INTO t1(e,b,a,c,d) VALUES(237,236,239,235,238);
    INSERT INTO t1(e,c,b,a,d) VALUES(242,244,240,243,241);
    INSERT INTO t1(e,d,c,b,a) VALUES(246,248,247,249,245);

  */
		});
		done();
	});

	it('2. SELECT 673', function(done) {
		alasql.options.modifier = 'MATRIX';
		var res = alasql(function() {
			/*
    SELECT a,
           c-d,
           d
      FROM t1
     WHERE c>d
       AND a>b
       AND (a>b-2 AND a<b+2)
     ORDER BY 1,2,3
  */
		});
		//    console.log(res);
		assert.deepEqual(res, [[131, 1, 133], [182, 1, 183]]);
		done();
	});

	it('3. SELECT 1095', function(done) {
		/*
    alasql.options.modifier = 'MATRIX';
    var res = alasql.parse(' \
      SELECT a-b, \
             CASE WHEN a<b-3 THEN 111 WHEN a<=b THEN 222 \
              WHEN a<b+3 THEN 333 ELSE 444 END \
        FROM t1 \
       WHERE c BETWEEN b-2 AND d+2 \
         AND b>c \
         AND (a>b-2 AND a<b+2) \
       ORDER BY 1,2 \
  ');
/// console.log(res.statements[0].where.expression);
/// console.log('***');    
/// console.log(res.statements[0].where.expression.left);
*/
		var res = alasql(function() {
			/*
      SELECT a-b,
             CASE WHEN a<b-3 THEN 111 WHEN a<=b THEN 222
              WHEN a<b+3 THEN 333 ELSE 444 END
        FROM t1
       WHERE (c BETWEEN b-2 AND d+2)
         AND b>c
         AND (a>b-2 AND a<b+2)
       ORDER BY 1,2
  */
		});
		assert.deepEqual(res, [[-1, 222], [-1, 222], [1, 333]]);
		done();
	});

	it('3. SELECT 959', function(done) {
		var res = alasql.parse(
			' \
SELECT a+b*2, \
       d, \
       a, \
       b-c, \
       CASE a+1 WHEN b THEN 111 WHEN c THEN 222 \
        WHEN d THEN 333  WHEN e THEN 444 ELSE 555 END \
  FROM t1 \
 WHERE \
  EXISTS(SELECT 1 FROM t1 AS x WHERE x.b<t1.b) \
    AND \
   d NOT BETWEEN 110 AND 150 \
   AND e+d BETWEEN a+b-10 AND c+130 \
  ORDER BY 1,2,4,5,3 \
   '
		);
		//    console.log(res.statements[0].where.expression);

		alasql.options.modifier = 'MATRIX';
		var res = alasql(function() {
			/*

SELECT a+b*2,
       d,
       a,
       b-c,
       CASE a+1 WHEN b THEN 111 WHEN c THEN 222
        WHEN d THEN 333  WHEN e THEN 444 ELSE 555 END
  FROM t1
 WHERE EXISTS(SELECT 1 FROM t1 AS x WHERE x.b<t1.b)
   AND d NOT BETWEEN 110 AND 150
   AND e+d BETWEEN a+b-10 AND c+130
 ORDER BY 1,2,4,5,3
   */
		});

		assert.deepEqual(res, [[317, 108, 107, -1, 333]]);

		done();
	});

	it('4. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test331');
		alasql.options.modifier = undefined;
		done();
	});
});
