if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2886 - size limit for the AST cache and the LIKE pattern cache', function () {
	var max;

	before(function () {
		max = alasql.MAXSQLCACHESIZE;
		alasql.MAXSQLCACHESIZE = 50;
		alasql('CREATE DATABASE test2886; USE test2886');
	});

	after(function () {
		alasql.MAXSQLCACHESIZE = max;
		alasql('USE alasql; DROP DATABASE test2886');
	});

	it('the AST cache stops growing at the limit', function () {
		var db = alasql.databases.test2886;
		for (var i = 0; i < 200; i++) {
			alasql("SET @v = 'x" + i + "'; SELECT 1");
		}
		assert.ok(Object.keys(db.astCache).length <= 51);
		assert.equal(alasql('SELECT VALUE @v'), 'x199');
	});

	it('LIKE still matches after the pattern cache is cleared', function () {
		for (var i = 0; i < 200; i++) {
			assert.equal(alasql.utils.like('a' + i + '%', 'a' + i + 'b'), true);
		}
		assert.equal(alasql('SELECT VALUE ? LIKE ?', ['abc', 'a%']), true);
		assert.equal(alasql('SELECT VALUE ? LIKE ?', ['abc', 'b%']), false);
	});
});
