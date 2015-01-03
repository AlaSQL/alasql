if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 199 IF statement', function() {

    it("1. Simple Variant", function(done) {
        var res = alasql('IF TRUE CREATE TABLE one');
        console.log(alasql.tables);
    	done();
    });

});
