if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 184 - SELECT INDEX', function() {
    it("1. SELECT INDEX", function(done) {
      var data = [1,2,3,4,1,2,2,3];
      var res = alasql('SELECT INDEX _,ARRAY(_) FROM ? GROUP BY _',[data]);
      assert.deepEqual(res,{"1":[1,1],"2":[2,2,2],"3":[3,3],"4":[4]});
//      console.log(res);

      var res = alasql('SELECT INDEX _,COUNT(*) FROM ? GROUP BY _',[data]);
      assert.deepEqual(res,{"1":2,"2":3,"3":2,"4":1});
//      console.log(res);
//      var res = alasql('SELECT TEXT COUNT(*),ARRAY(_) FROM ? GROUP BY _',[data]);
//      assert(res = '')
//      console.log(res);
      done();
    });

});
