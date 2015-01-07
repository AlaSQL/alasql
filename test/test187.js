if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 187 - Calculation of PI', function() {
    it("1. RANGE()", function(done) {
      var n = 10;
//      var res = alasql('SELECT COUNT(*) as cnt, VALUE AGGR(cnt/$[0]*4) as pi FROM (SELECT random() as x, random() as y FROM RANGE(1,$[0])) WHERE x*x+y*y<1',
//          [n]);
//      console.log(res);
      
//var res = alasql('SELECT COUNT(*) as cnt, AGGR(cnt/$[0]*4) as pi, random() as x, random() as y FROM RANGE(1,$[0]) WHERE x*x+y*y<1',
//          [n]);
      var res = alasql('SELECT * FROM (SELECT random() AS x, random() AS y FROM RANGE(1,10)) WHERE x*x+y*y<1',[n]);
//      console.log(res);    
//	assert(res.length == 10);
      done();
    });

});
