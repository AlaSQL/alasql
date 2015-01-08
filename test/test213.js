if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 213 CONVERT data types', function() {

    it("1. INT", function(done) {
        alasql('SELECT VALUE CONVERT(INT,123.45)',[],function(res){
            assert(res === 123);
            done();
        });
    });

    it("2. NUMBER", function(done) {
        alasql('SELECT VALUE CONVERT(NUMBER,"123.45")',[],function(res){
            assert(res === 123.45);
            done();
        });
    });

    it("3. STRING", function(done) {
        alasql('SELECT VALUE CONVERT(STRING,123.45)',[],function(res){
            assert(res === "123.45");
            done();
        });
    });

    it("4. BOOLEAN", function(done) {
        alasql('SELECT VALUE CONVERT(BOOLEAN,0)',[],function(res){
            assert(res === false);
            done();
        });
    });

    it("5. VARCHAR", function(done) {
        var res = alasql('SELECT VALUE CONVERT(VARCHAR(5),"abcdefghijklmnopqrstuvwxyz")');
        assert(res === "abcde");
        var res = alasql('SELECT VALUE CONVERT(VARCHAR(5),"abc")');
        assert(res === "abc");
        done();
    });

    it("6. CHAR", function(done) {
        alasql('SELECT VALUE CONVERT(CHAR(5),"abc")',[],function(res){
            assert(res === "abc  ");
            done();
        });
    });
});

