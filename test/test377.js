if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('..');
};

describe('377. Quotes and ASCII', function() {
    it("1. ", function(done) {

        var res = alasql('SELECT ASCII("\")');
        console.log(res);

//        assert(success);
        done();
    });
});
