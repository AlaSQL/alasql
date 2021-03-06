if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 427;

describe('Test ' + test + ' REPLACE test', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Simple Replace', function (done) {
		alasql('CREATE TABLE one (a STRING)');
		alasql('INSERT INTO one VALUES (".a."),("_._")');
		var res = alasql('COLUMN OF SELECT REPLACE(a,".","_") FROM one');
		//assert.deepEqual(res, [ '_a_', '___' ]);
		done();
	});
});
