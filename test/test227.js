if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 227 Float numbers and COALESCE', function () {
	it('1. 1.234', function (done) {
		var res = alasql('SELECT ROW 1.23, 2.345, 4.56');
		//      console.log(res);
		assert.deepEqual(res, [1.23, 2.345, 4.56]);
		done();
	});

	it('2. 1.234e10', function (done) {
		var res = alasql('SELECT VALUE 1.234e10');
		//    	console.log(res);
		assert.deepEqual(res, 1.234e10);
		done();
	});

	it('3. COALESCE', function (done) {
		var cars = [
			{color: 'blue'},
			{model: 'Mazda', city: 'Paris'},
			{city: 'Rome'},
			{color: 'black', model: 'Citroen'},
		];
		var res = alasql('SELECT COLUMN COALESCE(model,color,city) FROM ?', [cars]);
		//      console.log(res);
		assert.deepEqual(res, ['blue', 'Mazda', 'Rome', 'Citroen']);
		done();
	});
});
