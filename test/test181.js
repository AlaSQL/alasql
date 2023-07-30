if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 181 - ARRAY aggregator', function () {
	it('1. ARRAY()', function (done) {
		var food = [
			{food: 'apple', type: 'fruit'},
			{food: 'potato', type: 'vegetable'},
			{food: 'banana', type: 'fruit'},
		];
		var res = alasql('SELECT ARRAY(food) AS foods FROM ? GROUP BY type', [food]);
		//      console.log(res);
		assert.deepEqual(res, [{foods: ['apple', 'banana']}, {foods: ['potato']}]);
		done();
	});
});
