if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 218 N string and PRINT "a"', function() {
    it("1. N'String' ", function(done) {
        var res = alasql("SELECT VALUE N'This is a string'");
//        console.log(res);
        assert(res=="This is a string");
        done();
    });
});

