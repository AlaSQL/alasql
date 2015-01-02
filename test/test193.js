if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

//if(typeof exports != 'object') {

describe('Test 193 - GROUP BY formula', function() {

//    console.log(alasql.parse('SELECT a FROM ? GROUP BY a % 2').toString());

    it("1. GROUP BY column", function(done) {
        var data = [{a:1},{a:1},{a:2},{a:3},{a:1},{a:2}];
        var res = alasql('SELECT a+1 as b FROM ? GROUP BY a',[data]);
        console.log('Result:',res);
    	done();
    });
/*    
    it("2. GROUP BY formula", function(done) {
        var data = [{a:1},{a:1},{a:2},{a:3},{a:1},{a:2}];
        var res = alasql('SELECT a FROM ? GROUP BY CUBE(a,a%2)',[data]);
        console.log(res);
        done();
    });
*/
});
