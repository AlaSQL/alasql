if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 185 - IN Expression', function() {
    it("1. IN Field", function(done) {
      var data = [{a:[1,2,3,4,1,2,2,3],b:1},{a:[10],b:10}];
      var res = alasql('SELECT * FROM ? WHERE 1 IN a',[data]);
      console.log(res);
      var res = alasql('SELECT * FROM ? WHERE b IN a',[data]);
      console.log(res);
      var res = alasql('SELECT * FROM ? WHERE b IN @(a)',[data]);
      console.log(res);
//      console.log(alasql.parse('SELECT * FROM ? WHERE 1 IN a').statements[0].where.expression.right);

//      assert.deepEqual(res,{"1":[1,1],"2":[2,2,2],"3":[3,3],"4":[4]});
      done();
    });

});
