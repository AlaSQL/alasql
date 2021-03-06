if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// Test for issue #566
var test = 430;

describe.skip('Test ' + test + ' UNIQUE keyword in localStorage', function () {
	before(function () {
		alasql(
			'CREATE localStorage DATABASE test' +
				test +
				'g1; ATTACH localStorage DATABASE test' +
				test +
				'g1 as test' +
				test +
				'g1'
		);
		alasql('CREATE DATABASE test' + test + 'g2');
	});

	after(function () {
		alasql('DETACH DATABASE test' + test + 'g1');
		alasql('DROP DATABASE test' + test + 'g2');
	});

	it.skip('1. Tests unique keys in localstorage', function (done) {
		alasql('USE test' + test + 'g1');
		alasql('CREATE TABLE Test (a STRING, UNIQUE(a))');
		alasql('INSERT INTO Test VALUES (?)', {a: 1});
		assert.throws(function () {
			alasql('INSERT INTO Test VALUES (?)', {a: 1});
		});
		done();
	});

	it('2. Tests unique keys outside of localstorage', function (done) {
		alasql('USE test' + test + 'g2');
		alasql('CREATE TABLE Test (a STRING, UNIQUE(a))');
		alasql('INSERT INTO Test VALUES (?)', {a: 1});
		assert.throws(function () {
			alasql('INSERT INTO Test VALUES (?)', {a: 1});
		});
		done();
	});
});
