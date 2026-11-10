if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2912';

describe(`Test ${testId} - every IN list gets its own cached set`, function () {
	const data = [5, '5', 6, 7, '7', 'a,b', 'a', 'say "hi"', 'back\\slash'].map(a => ({a}));
	const count = sql => alasql(sql, [data]);

	it('A) numbers first, then the same values as strings', function () {
		assert.strictEqual(count('SELECT VALUE COUNT(*) FROM ? WHERE a IN (5, 6)'), 2);
		assert.strictEqual(count("SELECT VALUE COUNT(*) FROM ? WHERE a IN ('5', '6')"), 1);
	});

	it('B) strings first, then the same values as numbers', function () {
		assert.strictEqual(alasql("SELECT VALUE a FROM ? WHERE a IN ('7', '8')", [data]), '7');
		assert.strictEqual(alasql('SELECT VALUE a FROM ? WHERE a IN (7, 8)', [data]), 7);
	});

	it('C) NOT IN', function () {
		assert.strictEqual(count('SELECT VALUE COUNT(*) FROM ? WHERE a NOT IN (5, 6)'), 7);
		assert.strictEqual(count("SELECT VALUE COUNT(*) FROM ? WHERE a NOT IN ('5', '6')"), 8);
	});

	it('D) a value with a comma is not split into two', function () {
		assert.deepStrictEqual(alasql("SELECT VALUE a FROM ? WHERE a IN ('a', 'b')", [data]), 'a');
		assert.deepStrictEqual(alasql("SELECT VALUE a FROM ? WHERE a IN ('a,b')", [data]), 'a,b');
	});

	it('E) values with quotes and backslashes', function () {
		assert.strictEqual(count(`SELECT VALUE COUNT(*) FROM ? WHERE a IN ('say "hi"', 'a')`), 2);
		assert.strictEqual(count(`SELECT VALUE COUNT(*) FROM ? WHERE a IN ('back\\slash')`), 1);
		assert.strictEqual(
			count(`SELECT VALUE COUNT(*) FROM ? WHERE a NOT IN ('say "hi"', 'back\\slash')`),
			7
		);
	});
});
