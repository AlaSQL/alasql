if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 140 JavaScript Functions', function() {

	it("1. Simple Date functions", function(done){
		alasql('CREATE DATABASE test140; use test140');

		var res = alasql('SELECT * FROM ?', [[{d: new Date(2014,0,1)},{d: new Date(2015,11,31)} ]]);
		assert(res.length == 2);
		assert(res[0].d.getFullYear);

		var res = alasql('SELECT COLUMN d->getFullYear() FROM ?', [[{d: new Date(2014,0,1)},{d: new Date(2015,11,31)} ]]);
		assert.deepEqual(res,[2014,2015]);

		var res = alasql('SELECT d->getFullYear() AS d FROM ?', [[{d: new Date(2014,0,1)},{d: new Date(2015,11,31)} ]]);
		assert.deepEqual(res, [{d:2014},{d:2015}]);

		done();
	});

	it("2. Simple String functions", function(done){
		var res = alasql('SELECT COLUMN d->substr(e) FROM ?', [[{d: "abcd",e:1},{d: "ABCD",e:2} ]]);
		assert.deepEqual(res,["bcd","CD"]);

		var res = alasql('SELECT COLUMN d->substr(e,e) FROM ?', [[{d: "abcd",e:1},{d: "ABCD",e:2} ]]);
		assert.deepEqual(res,["b","CD"]);

		done();
	});

	it("3. NEW keyword", function(done){
		var res = alasql("new Date(2014,0,1)");
		console.log(res);

		alasql.fn.Date = Date;

		var res = alasql("new Date(2014,0,1)");
		console.log(res);
	});


	it("99. Drop database", function(done){
		alasql('DROP DATABASE test140');
		done();
	});
});
