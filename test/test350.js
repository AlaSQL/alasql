if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 350 SERIAL data type', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test350;USE test350');
		done();
	});

	it('2. CREATE TABLE', function(done) {
		var res = alasql('CREATE TABLE one (id SERIAL, name STRING)');
		assert.deepEqual(res, 1);
		done();
	});

	it('3. INSERT', function(done) {
		var res = alasql('INSERT INTO one (name) VALUES ("One"), ("Two"), ("Three")');
		assert.deepEqual(res, 3);
		done();
	});

	it('4. SELECT', function(done) {
		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [{id: 1, name: 'One'}, {id: 2, name: 'Two'}, {id: 3, name: 'Three'}]);
		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test350');
		done();
	});
});
