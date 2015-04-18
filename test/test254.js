if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
} else {
	__dirname = '.';
};


describe('Test 254 UNION of two tables with different columns', function() {

  it('1. Test',function(done) {

  	var res = alasql('CREATE TABLE t1(a int,b int);  \
    INSERT INTO t1 VALUES(1,2);  \
    SELECT a, b FROM t1 UNION SELECT b, a FROM t1');

  	console.log(res);

    done();
  });

});

