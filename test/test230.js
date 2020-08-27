if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

// See http://www.codeproject.com/Articles/300785/Calculating-simple-running-totals-in-SQL-Server
describe('Test 230 Fix GROUP BY expressions', function () {
	it('046-1 FROM array of arrays', function (done) {
		alasql('CREATE DATABASE test230; USE test230;');
		done();
	});

	it('217. TRUNCATE TABLE', function (done) {
		alasql(
			'CREATE TABLE one(a INT);\
            INSERT INTO one VALUES (1),(2),(3); \
            TRUNCATE TABLE one;'
		);
		var res = alasql('SELECT VALUE COUNT(*) FROM one');
		//        console.log(res);
		//        var res = alasql('SELECT VALUE COUNT(*) FROM one');
		assert(res == 0);
		done();
	});

	it('046-1 FROM array of arrays', function (done) {
		var data = [
			[2014, 1, 1],
			[2015, 2, 1],
			[2016, 3, 1],
			[2017, 4, 2],
			[2018, 5, 3],
			[2019, 6, 3],
		];

		var res = alasql(
			'SELECT MATRIX [2] AS 0, SUM([1]) AS 1 \
            FROM ? d \
            WHERE [0]>2016 \
            GROUP BY [2] ',
			[data]
		);
		assert.deepEqual(res, [
			[2, 4],
			[3, 11],
		]);

		done();
	});

	it('99. DROP', function (done) {
		alasql('DROP DATABASE test230');
		done();
	});
});
