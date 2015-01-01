if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 193 - GROUP BY formula', function() {
    it("1. GROUP BY column", function(done) {
        var data = [{a:1},{a:1},{a:2},{a:3},{a:1},{a:2}];
        var res = alasql('SELECT a FROM ? ORDER BY 1-a',[data]);
        assert.deepEqual(res,[ { a: 3 }, { a: 2 }, { a: 2 }, { a: 1 }, { a: 1 }, { a: 1 } ]);
    	done();
    });
});
