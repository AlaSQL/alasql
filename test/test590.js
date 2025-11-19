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

	it('9. Case insensitivity - left(), LEFT(), Left()', function (done) {
		var res1 = alasql('SELECT VALUE left("Hello", 3)');
		assert.equal(res1, 'Hel');

		var res2 = alasql('SELECT VALUE LEFT("Hello", 3)');
		assert.equal(res2, 'Hel');

		var res3 = alasql('SELECT VALUE Left("Hello", 3)');
		assert.equal(res3, 'Hel');

		done();
	});

	it('10. Case insensitivity - right(), RIGHT(), Right()', function (done) {
		var res1 = alasql('SELECT VALUE right("World", 3)');
		assert.equal(res1, 'rld');

		var res2 = alasql('SELECT VALUE RIGHT("World", 3)');
		assert.equal(res2, 'rld');

		var res3 = alasql('SELECT VALUE Right("World", 3)');
		assert.equal(res3, 'rld');

		done();
	});

	it('11. Nested functions - LEFT(RIGHT(...))', function (done) {
		// Get the right 5 chars, then left 3 of those
		var res = alasql('SELECT VALUE LEFT(RIGHT("Hello World", 5), 3)');
		assert.equal(res, 'Wor');
		done();
	});

	it('12. Nested functions - RIGHT(LEFT(...))', function (done) {
		// Get the left 5 chars, then right 3 of those
		var res = alasql('SELECT VALUE RIGHT(LEFT("Hello World", 5), 3)');
		assert.equal(res, 'llo');
		done();
	});

	it('13. Complex nesting with multiple functions', function (done) {
		var res = alasql('SELECT VALUE LEFT(RIGHT(LEFT("Hello World", 9), 7), 4)');
		// LEFT("Hello World", 9) = "Hello Wor"
		// RIGHT("Hello Wor", 7) = "llo Wor"
		// LEFT("llo Wor", 4) = "llo "
		assert.equal(res, 'llo ');
		done();
	});

	it('14. LEFT/RIGHT with UPPER/LOWER functions', function (done) {
		var data = [{name: 'JavaScript'}];
		var res = alasql(
			'SELECT UPPER(LEFT(name, 4)) as upper_left, LOWER(RIGHT(name, 6)) as lower_right FROM ?',
			[data]
		);
		assert.equal(res[0].upper_left, 'JAVA');
		assert.equal(res[0].lower_right, 'script');
		done();
	});

	it('15. LEFT/RIGHT with CONCAT', function (done) {
		var res = alasql('SELECT VALUE CONCAT(LEFT("Hello", 3), RIGHT("World", 3))');
		assert.equal(res, 'Helrld');
		done();
	});

	it('16. LEFT/RIGHT with special characters', function (done) {
		var res1 = alasql('SELECT VALUE LEFT("Hello@World.com", 5)');
		assert.equal(res1, 'Hello');

		var res2 = alasql('SELECT VALUE RIGHT("user@domain.com", 10)');
		assert.equal(res2, 'domain.com');

		done();
	});

	it('17. User-defined function compatibility', function (done) {
		// Test that custom functions named 'left' or 'right' can coexist
		alasql.fn.myleft = function (s, n) {
			return 'custom:' + s.substr(0, n);
		};

		// Built-in LEFT should still work
		var res1 = alasql('SELECT VALUE LEFT("Hello", 3)');
		assert.equal(res1, 'Hel');

		// Custom function should work with different name
		var res2 = alasql('SELECT VALUE myleft("Hello", 3)');
		assert.equal(res2, 'custom:Hel');

		// Cleanup
		delete alasql.fn.myleft;
		done();
	});
});
