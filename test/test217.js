if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 217 Some T-SQL compatibility tests', function () {
	it('1. 20141002 to DATE()', function (done) {
		var res = alasql('SELECT VALUE YEAR(DATE("20141001"))');
		assert(res == 2014);
		done();
	});

	it('2. 20141002 to CONVERT()', function (done) {
		var res = alasql('SELECT VALUE CONVERT(STRING, "20141002",110)');
		//        console.log(res);
		assert(res == '10-02-2014');
		done();
	});

	it('3. TRUNCATE TABLE', function (done) {
		var res = alasql(
			'CREATE DATABASE test217;USE test217; \
            CREATE TABLE one(a INT);INSERT INTO one VALUES (1),(2),(3); \
            TRUNCATE TABLE one; SELECT VALUE COUNT(*) FROM one \
            '
		);
		//        console.log(res);
		assert(res.pop() === 0);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test217');
		done();
	});
});
