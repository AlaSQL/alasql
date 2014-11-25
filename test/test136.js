if(typeof exports === 'object') {
	var assert = require("assert");
	var alasql = require('../alasql.js');
} else {
	__dirname = '.';
};

describe('Test 136 get JSON property', function() {

	it("1. Get element of object and Array", function(done){
		var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE b->[1] = 4');
		assert.deepEqual(res, [{a:1,b:[3,4]}]);

		var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE b == JSON([3,4])');
		assert.deepEqual(res, [{a:1,b:[3,4]}]);

		var res = alasql('SELECT * FROM JSON([{a:1,b:[3,4]},{e:1}]) WHERE e = 1');
		assert.deepEqual(res, [{e:1}]);

		done();
	});

});
