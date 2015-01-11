if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 221 Multi-line comments', function() {
    it("1. /* */", function(done) {
        var res = alasql.utils.uncomment(
        	'one /* two \n three */ four \n five -- six\nseven');
//        console.log(res);
        assert(res,'one  four \n five \nseven');
        done();
    });

    it("2. /* */", function(done) {
        var res = alasql('SELECT /* xxx */ VALUE /* blahblah \n tuturututu */ 1');
        // console.log(res);
        assert(res,1);
        done();
    });
});

