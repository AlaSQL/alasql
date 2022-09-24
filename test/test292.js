if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 292 Nested searches', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test292;USE test292');
		done();
	});

	var data = [{a: {b: [{c: 1}, {c: 2}, {c: 3}]}}, {a: {b: [{c: 4}, {c: 5}, {c: 6}]}}];

	it.skip('2. Search inside select', function(done) {
		var res = alasql('SELECT (SEARCH b SUM(/c) FROM _) FROM ?', [data]);
		console.log(res);
		done();
	});

	it.skip('3. SELECT inside SEARCH', function(done) {
		var res = alasql('SEARCH a (SELECT SUM(c) FROM b) FROM ?');
		console.log(res);
		done();
	});

	it.skip('4. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test292');
		done();
	});
});
