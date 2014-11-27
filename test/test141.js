if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 141 INSTREAM', function() {

	it("1. Simple Date functions", function(done){
		alasql('CREATE DATABASE test141; use test141');

		var srcfn = function(i) {
			return {i:i, i2:i*2};
		};

		srcfn.length = 3;

		var res = alasql('SELECT * FROM ?', [srcfn]);
		console.log(res);
		assert.deepEqual(res, [{i:0,i2:0},{i:1,i2:1},{i:2,i2:4}]);

		done();
	});

	it("2. Calculate PI", function(done){
		var rndfn = function(i) {
			return {x:Math.random(), y:Math.random};
		};

		rndfn.length = 100;

		alasql.stdlib.SQRT = function(s) {return 'Math.sqrt('+s+')'};

		var res = alasql('SELECT VALUE COUNT(*) FROM ? WHERE SQRT(x*x+y*y)<1', [rndfn]);
		var pi = res/rndfn.length;
		console.log(pi);
		assert( 3 < pi && pi < 4);

		done();
	});


	it("99. Drop database", function(done){
		alasql('DROP DATABASE test141');
		done();
	});
});
