if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 205 Local variables', function() {

    it("1. @var expression", function(done) {
        alasql.vars.one = 100;
        var res = alasql('SELECT @one');
        assert(res,100);
        done();
    });
    
    it("2. SET @var = expression", function(done) {
        alasql('SET @two = @one+200');
        var res = alasql('SELECT @two');
        assert(res,300);
        done();
    });
});
