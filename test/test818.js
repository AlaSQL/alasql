if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('../dist/alasql');
}

describe('Test 818 IS condition check on premitives', function () {
	it('should return true on true == true', done => {
		assert.deepEqual(alasql('SELECT TRUE IS TRUE'), [{'TRUE IS TRUE': true}]);
		done();
	});
	it('should return true on false == false', done => {
		assert.deepEqual(alasql('SELECT FALSE IS FALSE'), [
			{
				'FALSE IS FALSE': true,
			},
		]);
		done();
	});

	it("shouldn't return true on true === false", done => {
		assert.deepEqual(alasql('SELECT FALSE IS TRUE'), [
			{
				'FALSE IS TRUE': false,
			},
		]);
		done();
	});

	it('should return true on 0 != true', done => {
		assert.deepEqual(alasql('SELECT 0 IS NOT TRUE'), [
			{
				'0 IS NOT(TRUE)': true,
			},
		]);
		done();
	});

	it('should return true on 1 == TRUE', done => {
		assert.deepEqual(alasql('SELECT 1 IS TRUE'), [
			{
				'1 IS TRUE': true,
			},
		]);
		done();
	});

	it('should return false true', done => {
		assert.deepEqual(alasql('SELECT TRUE IS NOT TRUE, TRUE IS NOT FALSE'), [
			{
				'TRUE IS NOT(TRUE)': false,
				'TRUE IS NOT(FALSE)': true,
			},
		]);
		done();
	});

	// except 0 every other number should be treated as TRUE
	it('should return true false false', done => {
		assert.deepEqual(alasql('SELECT 0 IS NOT TRUE, -1 IS NOT TRUE, 1 IS NOT TRUE'), [
			{
				'0 IS NOT(TRUE)': true,
				'-1 IS NOT(TRUE)': false,
				'1 IS NOT(TRUE)': false,
			},
		]);
		done();
	});
});
