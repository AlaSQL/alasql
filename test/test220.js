if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 220 WITH clause', function () {
	it('1. One WITH', function (done) {
		var sql =
			'WITH one AS (SELECT * FROM ?), \
    		two AS (SELECT * FROM ?) \
            SELECT * FROM one,two;SELECT * FROM ?';
		//        console.log(alasql.parse(sql).toString());
		var res = alasql(
			'WITH one AS (SELECT * FROM ?), two AS (SELECT * FROM ?)\
            SELECT * FROM one,two',
			[
				[{a: 1}, {a: 2}],
				[{b: 10}, {b: 20}],
			]
		);
		//        console.log(res);
		assert.deepEqual(res, [
			{a: 1, b: 10},
			{a: 1, b: 20},
			{a: 2, b: 10},
			{a: 2, b: 20},
		]);
		done();
	});
});
