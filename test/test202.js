if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 202 GETTIME and CAST', function() {

    it("1. GETDATE()", function(done) {
        var res = alasql('SELECT NOW(),GETDATE()');
        console.log(res);
//        assert.deepEqual(res,[7,7]);
    	done();
    });
});
