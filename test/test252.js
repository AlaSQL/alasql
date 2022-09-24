if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 252 CREATE TABLE without column types', function () {
	it('1. Overwrite', function (done) {
		alasql('CREATE DATABASE test252; USE test252;');
		alasql('CREATE TABLE sqlite_sequence(name,seq)');
		alasql('INSERT INTO sqlite_sequence VALUES (1,10)');
		alasql('INSERT INTO sqlite_sequence VALUES ("one","ten")');
		var res = alasql('SELECT * FROM sqlite_sequence');
		//    console.log(res);

		assert.deepEqual(res, [
			{name: 1, seq: 10},
			{name: 'one', seq: 'ten'},
		]);
		done();
	});
});
