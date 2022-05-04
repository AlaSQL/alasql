if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '815'; // insert test file number

describe('Test ' + test + ' - ast.toString() causes repeated aliases', function () {
	it('TODO', function () {
		var query = 'SELECT genre, title AS t, LENGTH(title) AS length FROM tbl AS t1';
		var ast = alasql.parse(query);
		assert.strictEqual(ast.toString(), query)
	});
});