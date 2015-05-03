if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 254 UNION of two tables with different columns', function() {

  it('1. Create database', function(done){
    alasql('CREATE DATABASE test254;USE test254');
    alasql('CREATE TABLE t1(a int,b int);  \
            INSERT INTO t1 VALUES(1,2);  \
            INSERT INTO t1 VALUES(1,3);  \
            INSERT INTO t1 VALUES(1,4);  \
            CREATE TABLE t2(a int,b int);  \
            INSERT INTO t2 VALUES(1,2);  \
            INSERT INTO t2 VALUES(1,5);  \
      ');
    done();
  });

  it('2. UNION ALL CORRESPONDING',function(done) {
    var res = alasql('SELECT a, b FROM t1 UNION ALL CORRESPONDING SELECT b, a FROM t1');    
    assert.deepEqual(res,
      [ { a: 1, b: 2 },
        { a: 1, b: 3 },
        { a: 1, b: 4 },
        { b: 2, a: 1 },
        { b: 3, a: 1 },
        { b: 4, a: 1 } ]
    );
    done();
  });

  it('2. UNION ALL not CORRESPONDING',function(done) {
    var res = alasql('SELECT a, b FROM t1 UNION ALL SELECT b, a FROM t1');    
    assert.deepEqual(res,
      [ { a: 1, b: 2 },
        { a: 1, b: 3 },
        { a: 1, b: 4 },
        { a: 2, b: 1 },
        { a: 3, b: 1 },
        { a: 4, b: 1 } ]
    );
    done();
  });

/*
  it('2. UNION',function(done) {
  	var res = alasql('SELECT a, b FROM t1 UNION SELECT b, a FROM t1');    
  	console.log(res);
    done();
  });
*/

  it('99. Drop database',function(done){
    alasql('DROP DATABASE test254');
    done();
  });

});

