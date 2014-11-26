if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 140 JavaScript Functions', function() {

	it("1. Simple JSON", function(done){
		alasql('CREATE DATABASE test140; use test140');

		var res = alasql('SELECT * FROM ?', [[{d: new Date(2014,0,1)},{d: new Date(2015,11,31)} ]]);
		console.log(res[0].d.getFullYear());


		var res = alasql('SELECT d->getFullYear() FROM ?', [[{d: new Date(2014,0,1)},{d: new Date(2015,11,31)} ]]);
		console.log(res[0], typeof res[0], res[0] instanceof Date);
		console.log(res[0].d.getFullYear());


		var res = alasql('SELECT d->getFullYear() FROM ?', [[{d: new Date(2014,0,1)},{d: new Date(2015,11,31)} ]]);
		console.log(res);
		assert.deepEqual(res, [{d:2014},{d:2015}]);


		done();
	});

	it("99. Drop database", function(done){
		alasql('DROP DATABASE test140');
		done();
	});
});
