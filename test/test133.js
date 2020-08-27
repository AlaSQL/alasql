if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 133 SELECT VALUE, ROW, COLUMN, MATRIX', function () {
	it('1. Prepare database', function (done) {
		alasql('CREATE DATABASE test133; USE test133');
		alasql('CREATE TABLE one (a INT, b STRING)');
		alasql('INSERT INTO one VALUES (1,"One"),(2,"Two"),(3,"Three")');
		done();
	});

	it('2. SELECT', function (done) {
		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [
			{a: 1, b: 'One'},
			{a: 2, b: 'Two'},
			{a: 3, b: 'Three'},
		]);

		var res = alasql('SELECT VALUE * FROM one');
		assert.deepEqual(res, 1);

		var res = alasql('SELECT ROW * FROM one');
		assert.deepEqual(res, [1, 'One']);

		var res = alasql('SELECT COLUMN * FROM one');
		assert.deepEqual(res, [1, 2, 3]);

		var res = alasql('SELECT MATRIX * FROM one');
		assert.deepEqual(res, [
			[1, 'One'],
			[2, 'Two'],
			[3, 'Three'],
		]);

		done();
	});

	it('99. UPDATE', function (done) {
		alasql('DROP DATABASE test133');
		done();
	});
});
