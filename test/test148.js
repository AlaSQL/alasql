if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 148 - EXPLAIN SELECT', function () {
	it('1. Simple Select', function (done) {
		alasql('CREATE DATABASE test148; USE test148');
		alasql('CREATE TABLE one (a INT)');
		alasql('INSERT INTO one VALUES (1),(2),(3)');
		var res = alasql('EXPLAIN SELECT * FROM one WHERE a IN (SELECT * FROM one) ORDER BY a');
		//		console.table(res);
		done();
	});

	it('99. Detach database', function (done) {
		alasql('DROP DATABASE test148');
		done();
	});
});
