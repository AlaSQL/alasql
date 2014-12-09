if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

if(typeof exports != 'object') {

describe('Test 153 - Async test1...', function() {

	it("1. Create database", function(done){
		alasql('CREATE DATABASE IF NOT EXISTS test153');
		alasql('CREATE TABLE test153.one (a int)');
		var getfn = function(i, cb) {
			if(i>3) return;
			var res = {a:i};
			//cb(res);
			return res;
		}
		var res = alasql('SELECT * FROM ?', [getfn]);
		assert(res.length == 4);

		var res = alasql('SELECT * FROM ?', [getfn], function(res) {
			assert(res.length == 4);
//			console.log(998,res);
			done();
		});
//		console.log(999,res);

	});


	it("99. Detach database", function(done){
		alasql('DROP DATABASE test153');
		done();
	});
});

}

