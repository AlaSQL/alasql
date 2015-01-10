if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 220 WITH clause', function() {
    it("1. One WITH", function(done) {
        alasql('WITH one AS (SELECT * FROM ?), two AS (SELECT * FROM ?)\
            SELECT * FROM one,two',[[{a:1},{a:2}],[{b:10},{b:20}]]);
        done();
    });
});

