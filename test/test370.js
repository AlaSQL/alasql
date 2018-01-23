if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

/*
Inputs for emprovements:

lets get the new Regexp out of the function so we dont need to initiate it every time

Lets add ^ and $ to special list

Future:

We need to remove the '[', ']' from the specials so we can still support the [ ] syntax.

We must make sure that ^ is not escaped if its the first char in [ ]

We must make sure % and _ are not replaced within a [ ]

Expand the function with an ESCAPE parameter


*/

describe('Test 370 REGEXP_LIKE', function() {
	it('1. Test REGEXP_LIKE', function(done) {
		assert(alasql('= REGEXP_LIKE("abcdef","a.*")'));
		assert(!alasql('= REGEXP_LIKE("abcdef","^d")'));
		assert(alasql('= REGEXP_LIKE("abcdef","^a.*d")'));
		done();
	});

	it('2. Test REGEXP', function(done) {
		//console.log(alasql('= "abcdef" REGEXP "a.*"'));
		assert(alasql('= "abcdef" REGEXP "a.*"'));
		assert(alasql('= "abcdef" REGEXP "[aq]"'));
		assert(alasql('= "abcdef" REGEXP "[^qw]"'));
		assert(!alasql('= "abcdef" REGEXP "[qw]"'));
		done();
	});
});
