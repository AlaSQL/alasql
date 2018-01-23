if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 364 QUESTION MAK IN STRINGS', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test364;USE test364');
		alasql('CREATE TABLE pet(name STRING)');
		alasql('INSERT INTO pet VALUES ("Cat"),("Dog")');
		done();
	});

	it('2. TEST', function(done) {
		var res = alasql('SELECT * FROM pet WHERE name LIKE "?%"');
		var res = alasql('SELECT * FROM pet WHERE name LIKE "%?%"');
		var res = alasql('SELECT * FROM pet WHERE name LIKE "%?"');
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test364');
		done();
	});
});
