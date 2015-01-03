if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 200 IS NULL', function() {

    it("1. Simple Variant", function(done) {
    	alasql('DROP TABLE IF EXISTS one');
        var res = alasql('IF 1 IS NOT NULL CREATE TABLE one');
        assert(!!alasql.tables.one);
    	done();
    });

});
