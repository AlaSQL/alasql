if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 213 CONVERT data types', function() {

    it("1. CONVERT Number", function(done) {
       alasql('SELECT CONVERT(INT,123.45)',[],function(res){
        console.log(res);
            assert(res === -100);
            done();
        });
    });

});

