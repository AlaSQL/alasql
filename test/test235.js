if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

// Test is based on
// https://msdn.microsoft.com/en-us/library/ms190349.aspx
//
describe('Test 235 SELECT INSIDE IF', function() {

    it('1. Prepare database', function(done){
        alasql('CREATE DATABASE test235; USE test235;');
        done();
    });

    it("2. Throw error", function(done) {
        var data = [{a:1},{a:2}];
        alasql('IF EXISTS(SELECT * FROM ? WHERE a = 3) PRINT 1 ELSE PRINT 2',[data]);
    });

    it('99. DROP', function(done){
        alasql('DROP DATABASE test235');
        done();
    });

});

