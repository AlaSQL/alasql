if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 197 - Expression in expression', function () {
	//    console.log(alasql.parse('SELECT a FROM ? GROUP BY a % 2').toString());

	it('1. MAX', function (done) {
		// var ast = alasql.parse('SELECT (SELECT MAX(a) FROM ?) FROM RANGE(1,2)');
		// console.log(ast.toString());
		// console.log(ast);

		var data = [{a: 1}, {a: 1}, {a: 2}, {a: 3}, {a: 1}, {a: 2}];
		var res = alasql('SELECT (SELECT * FROM ?)+1 FROM RANGE(1,2)', [data]);
		//console.log(res);
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
