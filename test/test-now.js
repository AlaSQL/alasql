if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Datetime Functions Parsing', function () {
	const queries = [
		'SELECT NOW()',
		'SELECT GETDATE()',
		'SELECT CURRENT_TIMESTAMP()',
		'SELECT CURRENT_TIMESTAMP',
		'SELECT CURRENT_DATE',
		'SELECT CURDATE()',
	];

	queries.forEach(sql => {
		it(`should parse: ${sql}`, function () {
			const res = alasql.parse(sql);
			assert.ok(res);
		});
	});
});
