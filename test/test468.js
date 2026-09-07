if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 468 - JOIN ON xxx IS NOT NULL', function () {
	before(function () {
		alasql('CREATE DATABASE test468');
		alasql('USE test468');
		alasql('CREATE TABLE tab0 (id INT)');
		alasql('CREATE TABLE tab1 (id INT)');
		alasql('CREATE TABLE tab2 (id INT)');
		alasql('INSERT INTO tab0 VALUES (1)');
		alasql('INSERT INTO tab1 VALUES (1),(2)');
		alasql('INSERT INTO tab2 VALUES (1),(2)');
	});

	after(function () {
		alasql('DROP DATABASE test468');
	});

	it('A) accepts JOIN ON +(90) IS NOT NULL followed by comma syntax', function () {
		var res = alasql(
			'SELECT VALUE COUNT(*) FROM tab2 cor0 JOIN tab2 cor1 ON + ( 90 ) IS NOT NULL, tab0 AS cor2'
		);

		assert.strictEqual(res, 4);
	});

	it('B) accepts LEFT JOIN ON NOT NULL IS NOT NULL followed by comma syntax', function () {
		var res = alasql(
			'SELECT VALUE COUNT(*) FROM tab2 AS cor0 LEFT JOIN tab1 AS cor1 ON NOT NULL IS NOT NULL, tab1 AS cor2'
		);

		assert.strictEqual(res, 8);
	});
});
