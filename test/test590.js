if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 590 - LEFT() and RIGHT() SQL string functions', function () {
	it('1. LEFT() function with string literal', function (done) {
		var res = alasql('SELECT VALUE LEFT("Hello World", 5)');
		assert.equal(res, 'Hello');
		done();
	});

	it('2. RIGHT() function with string literal', function (done) {
		var res = alasql('SELECT VALUE RIGHT("Hello World", 5)');
		assert.equal(res, 'World');
		done();
	});

	it('3. LEFT() function with column', function (done) {
		var data = [{name: 'JavaScript'}];
		var res = alasql('SELECT VALUE LEFT(name, 4) FROM ?', [data]);
		assert.equal(res, 'Java');
		done();
	});

	it('4. RIGHT() function with column', function (done) {
		var data = [{name: 'JavaScript'}];
		var res = alasql('SELECT VALUE RIGHT(name, 6) FROM ?', [data]);
		assert.equal(res, 'Script');
		done();
	});

	it('5. LEFT() with edge cases', function (done) {
		// Empty string
		var res1 = alasql('SELECT VALUE LEFT("", 5)');
		assert.equal(res1, '');

		// Length greater than string length
		var res2 = alasql('SELECT VALUE LEFT("Hi", 10)');
		assert.equal(res2, 'Hi');

		// Zero length
		var res3 = alasql('SELECT VALUE LEFT("Hello", 0)');
		assert.equal(res3, '');

		done();
	});

	it('6. RIGHT() with edge cases', function (done) {
		// Empty string
		var res1 = alasql('SELECT VALUE RIGHT("", 5)');
		assert.equal(res1, '');

		// Length greater than string length
		var res2 = alasql('SELECT VALUE RIGHT("Hi", 10)');
		assert.equal(res2, 'Hi');

		// Zero length
		var res3 = alasql('SELECT VALUE RIGHT("Hello", 0)');
		assert.equal(res3, '');

		done();
	});

	it('7. LEFT() and RIGHT() in SELECT list', function (done) {
		var data = [{text: 'AlaSQL'}];
		var res = alasql('SELECT LEFT(text, 3) as left_part, RIGHT(text, 3) as right_part FROM ?', [
			data,
		]);
		assert.equal(res[0].left_part, 'Ala');
		assert.equal(res[0].right_part, 'SQL');
		done();
	});

	it('8. LEFT() and RIGHT() with WHERE clause', function (done) {
		var data = [
			{id: 1, name: 'Alpha'},
			{id: 2, name: 'Beta'},
			{id: 3, name: 'Gamma'},
		];
		var res = alasql('SELECT * FROM ? WHERE LEFT(name, 1) = "A"', [data]);
		assert.equal(res.length, 1);
		assert.equal(res[0].name, 'Alpha');
		done();
	});
});
