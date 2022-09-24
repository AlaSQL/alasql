if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 330 PROLOG', function() {
	before(function() {
		alasql('CREATE DATABASE test330;');
		alasql('USE test330');
		alasql('REQUIRE PROLOG');
	});

	after(function() {
		alasql('DROP DATABASE test330');
	});

	it('1. FACTS', function(done) {
		var res = alasql(':-son(Alex,Larissa)');
		//Todo - assert something to check if PROLOG is also returning correctly
		done();
	});
});
