if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var md5 = require('blueimp-md5').md5;
} else {
	__dirname = '.';
}

describe('Test 297 INSERT,DELETE,UDPATE with subqueries', function () {
	it.skip('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test297;USE test297');
		alasql('CREATE TABLE one(a INT, b INT)');
		alasql('INSERT INTO one VALUES (1,10),(2,20),(3,30)');
		done();
	});

	it.skip('2. DELETE', function (done) {
		var res = alasql('DELETE FROM one WHERE a = (SELECT MAX(a) FROM one)');
		assert.deepEqual(res, 1);
		done();
	});

	it.skip('3. UPDATE', function (done) {
		var res = alasql('UPDATE one SET b = 100 WHERE a = (SELECT MAX(a) FROM one)');
		assert.deepEqual(res, 1);
		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [
			{a: 1, b: 10},
			{a: 2, b: 100},
		]);
		done();
	});

	it.skip('4. INSERT', function (done) {
		var res = alasql('INSERT INTO one VALUES (5,(SELECT MAX(b) FROM one)+1)');
		assert.deepEqual(res, 1);
		var res = alasql('SELECT * FROM one');
		//    console.log(res);
		assert.deepEqual(res, [
			{a: 1, b: 10},
			{a: 2, b: 100},
			{a: 5, b: 101},
		]);
		done();
	});

	it.skip('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test297');
		done();
	});
});
