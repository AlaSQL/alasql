if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 200 IS NULL + IS NOT NULL', function() {

    it("1. Simple Variant", function(done) {
    	alasql('CREATE DATABASE test200; USE test200');
        var res = alasql('IF 1 IS NOT NULL CREATE TABLE one');
        assert(!!alasql.tables.one);
        alasql('DROP DATABASE test200');
    	done();
    });

});
