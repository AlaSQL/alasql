if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 300 SEARCH', function() {
	var catalog = {
		Europe: {
			fruits: [{fruit: 'Apple'}, {fruit: 'Peach'}],
		},
		Asia: {
			fruit: 'Pineapple',
		},
		Africa: {
			fruit: 'Banana',
		},
	};

	it('1. Search fruits', function(done) {
		var res = alasql('SEARCH Europe FROM ?', [catalog]);
		assert.deepEqual(res, [
			{
				fruits: [{fruit: 'Apple'}, {fruit: 'Peach'}],
			},
		]);
		done();
	});

	it('2. Search fruits 2', function(done) {
		var res = alasql('SEARCH /fruits/ FROM ?', [catalog]);
		assert.deepEqual(res, [{fruit: 'Apple'}, {fruit: 'Peach'}]);

		var res = alasql('SEARCH /fruits/fruit FROM ?', [catalog]);
		assert.deepEqual(res, ['Apple', 'Peach']);

		done();
	});

	it('3. Search fruits', function(done) {
		var res = alasql('SEARCH /fruits/WHERE(fruit="Apple") FROM ?', [catalog]);
		assert.deepEqual(res, [{fruit: 'Apple'}]);

		var res = alasql('SEARCH ///WHERE(fruit="Apple") FROM ?', [catalog]);
		assert.deepEqual(res, [{fruit: 'Apple'}]);
		done();
	});
	if (false) {
		it('4. Search fruits', function(done) {
			var res = alasql('SEARCH /// WHERE(fruit="Apple") FROM ?', [catalog]);
			assert.deepEqual(res, [{fruit: 'Apple'}]);
			done();
		});
	}
});
