if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 194 - HAVING with aggregator', function () {
	//    console.log(alasql.parse('SELECT a FROM ? GROUP BY a % 2').toString());

	it('1. HAVING with aggregator', function (done) {
		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT a FROM ? GROUP BY a HAVING COUNT(*)>1 ORDER BY a', [data]);
		assert.deepEqual(res, [{a: 1}, {a: 2}]);
		//        console.log('Result:',res);
		done();
	});
	/*    
    it("2. GROUP BY formula", function(done) {
        var data = [{a:1},{a:1},{a:2},{a:3},{a:1},{a:2}];
        var res = alasql('SELECT a FROM ? GROUP BY CUBE(a,a%2)',[data]);
/// console.log(res);
        done();
    });
*/
});
