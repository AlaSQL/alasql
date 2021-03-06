if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 322 UNION TEST', function () {
	it.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test322; USE test322');
		done();
	});

	it.skip('2. UNION ALL', function (done) {
		alasql.options.modifier = undefined;

		var data = [{a: 1}, {a: 2}, {a: 2}, {b: 2}];
		var res = alasql(
			'SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION ALL CORRESPONDING SELECT b FROM $0 WHERE NOT b IS NULL',
			[data]
		);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 2}, {b: 2}]);

		var res = alasql(
			'SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION ALL SELECT b FROM $0 WHERE NOT b IS NULL',
			[data]
		);
		assert.deepEqual(res, [{a: 1}, {a: 2}, {a: 2}, {a: 2}]);

		var res = alasql(
			'SELECT a FROM $0 WHERE NOT a IS NULL \
      UNION SELECT b FROM $0 WHERE NOT b IS NULL ORDER BY a',
			[data]
		);
		assert.deepEqual(res, [{a: 1}, {a: 2}]); // To be checked
		// or 1,2,2

		//    console.log(res);

		done();
	});

	it.skip('3. SEARCH UNION', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 2}, {b: 2}];

		var res = alasql('SEARCH UNION(/a,/b) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	it.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test322');
		done();
	});
});
