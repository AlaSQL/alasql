if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 198 - MS SQL compatibility', function() {

    it("1. Listing 1", function(done) {
        alasql('CREATE DATABASE dbo');
        alasql('SOURCE "test198-1.sql"');
    	done();
    });

});
