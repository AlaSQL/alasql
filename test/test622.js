if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #972
*/

var test = 622;

describe('Test ' + test + ' Converting syntax tree to SQL with multple joins', function () {
	it('1. Same SQL when parsed', function () {
		var sql =
			'SELECT * FROM cities AS c INNER JOIN state AS s ON c.state_id = s.id INNER JOIN country AS c2 ON s.country_id = c2.id';
		assert.equal(sql, alasql.parse(sql).toString());
	});
});
