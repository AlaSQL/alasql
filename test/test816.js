if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 816 - ast.toString() causes repeated aliases', function () {
	it('Should parse query to AST, then stringify back to the same query', function () {
		var query = 'SELECT genre, title AS t, LENGTH(title) AS length FROM tbl AS t1';
		var ast = alasql.parse(query);
		assert.strictEqual(ast.toString(), query);
	});
});
