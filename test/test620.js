if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #965
*/

var test = 620;

describe('Test ' + test + ' ORDER BY direction when converting AST to string', function() {
	it('1. Should preserve the direction', function() {
		var sql = 'SELECT * FROM cities WHERE population < 3500000 ORDER BY population DESC';
		assert.equal(sql, alasql.parse(sql).toString());
	});
});
