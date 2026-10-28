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

  it('2. UNION',function(done) {
  	var res = alasql('SELECT a, b FROM t1 UNION SELECT b, a FROM t1');    
  	console.log(res);
    done();
  });

  it('3. UNION CORRESPONDING',function(done) {
    var res = alasql('SELECT a, b FROM t1 UNION CORRESPONDING SELECT b, a FROM t1');    
    console.log(res);
    done();
  });

  it('99. Drop database',function(done){
    alasql('DROP DATABASE test254');
    done();
  });

});

