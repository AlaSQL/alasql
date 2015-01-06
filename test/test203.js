if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 203 REQUIRE', function() {

    it("1. REQUIRE()", function(done) {
    	var data = [1,2,3,4];
        alasql('REQUIRE "./test203myfn.js"');
//        console.log(alasql.fn);
        var res = alasql('SELECT COLUMN myfn(_) FROM ?',[data]);
//        console.log(res);
        assert.deepEqual(res,[1,4,9,16]);
    	done();
    });
});
