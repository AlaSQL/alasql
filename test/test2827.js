if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2827 - SIMILAR TO', function () {
	before(function () {
		alasql('CREATE DATABASE test2827; USE test2827');
		alasql('CREATE TABLE s (similar STRING, t STRING)');
		alasql('INSERT INTO s VALUES ("x", "abc"), ("y", NULL)');
	});

	after(function () {
		alasql('DROP DATABASE test2827');
	});

	it('A) the examples of the issue', function () {
		assert.deepEqual(alasql("SELECT 'abc' SIMILAR TO 'a%' AS x"), [{x: true}]);
		assert.deepEqual(alasql("SELECT 'abc' NOT SIMILAR TO '(a|z)bc' AS x"), [{x: false}]);
	});

	it('B) the whole text must match, case-sensitive', function () {
		var res = alasql(
			"SELECT 'abcdefg' SIMILAR TO '_bcd%' AS a, 'abcdefg' SIMILAR TO 'bcd%' AS b, 'abc' SIMILAR TO 'ABC' AS c"
		);
		assert.deepEqual(res, [{a: true, b: false, c: false}]);
	});

	it('C) regular expression parts, and . is a literal', function () {
		var res = alasql(
			"SELECT 'aaa' SIMILAR TO 'a+' AS a, 'ab' SIMILAR TO '[a-c]{2}' AS b, 'a.c' SIMILAR TO 'a.c' AS c, 'abc' SIMILAR TO 'a.c' AS d"
		);
		assert.deepEqual(res, [{a: true, b: true, c: true, d: false}]);
	});

	it('D) in WHERE, with NULL', function () {
		assert.deepEqual(alasql("SELECT t FROM s WHERE t SIMILAR TO '%b%'"), [{t: 'abc'}]);
		assert.deepEqual(alasql("SELECT t FROM s WHERE t NOT SIMILAR TO '%b%'"), []);
	});

	it('E) similar is still a name', function () {
		assert.deepEqual(alasql('SELECT similar FROM s'), [{similar: 'x'}, {similar: 'y'}]);
	});
});
