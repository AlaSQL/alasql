if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 428;

describe('Test ' + test + ' UUID()', function() {
	before(function() {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function() {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Simple test GUID', function(done) {
		var res = alasql('=UUID()');
		assert(
			!!res.match(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
			)
		);
		done();
	});

	it('2. DEFAULT GUID', function(done) {
		alasql('CREATE TABLE one (a INT, b STRING DEFAULT UUID())');
		alasql('INSERT INTO one(a) VALUES (1)');
		var res = alasql('SELECT * FROM one');
		assert(
			!!res[0].b.match(
				/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
			)
		);
		done();
	});
});
