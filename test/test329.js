if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 329 PROLOG', function() {
	it.skip('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test329; USE test329');
		done();
	});

	it.skip('2. FACTS', function(done) {
		var res = alasql('CREATE GRAPH Alex > son > Michael');
		var res = alasql(':- son(Alex,Larissa)');
		console.log(res);
		done();
	});

	it.skip('3. RULES', function(done) {
		var res = alasql('son(@x,@y) :- parent(@y,@x)');
		console.log(res);
		done();
	});

	it.skip('4. QUERY', function(done) {
		var res = alasql('?- parent(@x,Alex)');
		var res = alasql('?- @x>parent>Alex)');
		console.log(res);
		done();
	});

	it.skip('5. Expression statement', function(done) {
		var res = alasql('= 100+1');
		console.log(res);
		done();
	});

	it.skip('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test329');
		done();
	});
});
