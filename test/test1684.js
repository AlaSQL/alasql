if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 1684 - UNION ALL still not returning correct results bug', function () {
	it('1. should not insert empty objects in results when using UNION ALL Expression', function (done) {
		var data = [
			{city: 'Madrid', population: 3041579},
			{city: 'Rome', population: 2863223},
			{city: 'Paris', population: 2249975},
		];
		var sql =
			"SELECT city FROM :data WHERE city = 'Madrid' \
                UNION ALL SELECT city FROM :data WHERE city = 'Rome' \
                UNION ALL SELECT city FROM :data WHERE city = 'Paris' \
                ";
		var res = alasql(sql, {data});
		assert.deepEqual(res, [{city: 'Madrid'}, {city: 'Rome'}, {city: 'Paris'}]);

		var sql =
			"SELECT * FROM :data WHERE city = 'Madrid' \
                UNION ALL SELECT * FROM :data WHERE city = 'Rome' \
                UNION ALL SELECT * FROM :data WHERE city = 'Paris' \
                ";
		var res = alasql(sql, {data});
		assert.deepEqual(res, [
			{city: 'Madrid', population: 3041579},
			{city: 'Rome', population: 2863223},
			{city: 'Paris', population: 2249975},
		]);

		done();
	});
});
