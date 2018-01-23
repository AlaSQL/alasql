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

describe('Test 369 LIKE', function() {
	var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '^', '%'];
	/*
  alasql.utils.like = function (pattern,value,escape) {
    // Verify escape character
    if(!escape) escape = '';

    var i=0;
    var s = '';

    while(i<pattern.length) {
      var c = pattern[i], c1 = '';
      if(i<pattern.length-1) c1 = pattern[i+1];

      if(c === escape) {
        s += '\\'+c1;
        i++;
      } else if(c==='[' && c1 === '^') {
        s += '[^';
        i++;
      } else if(c==='[' || c===']' ) {
        s += c;
      } else if(c==='%') {
        s += '.*';
      } else if(c === '_') {
        s += '.';
      } else if('/.*+?|(){}'.indexOf(c)>-1) {
        s += '\\'+c;
      } else {
        s += c;
      }
      i++;
    }

    if(value == undefined) return false;
//console.log(s);
    return value.search(RegExp(s))>-1;
   }

*/
	var data = [
		{a: 'abcdef'},
		{a: 'xyzwt'},
		{a: 'abc123'},
		{a: '123def'},
		{a: 'ab34ef'},
		{a: 'ab56ef'},
	];

	it('1. Test %', function(done) {
		var res = alasql('SELECT * FROM ? WHERE a LIKE "abcdef"', [data]);
		assert.deepEqual(res, [{a: 'abcdef'}]);

		var res = alasql('SELECT * FROM ? WHERE a LIKE "abcdef1"', [data]);
		assert.deepEqual(res, []);

		var res = alasql('SELECT * FROM ? WHERE a LIKE "%abc%"', [data]);
		assert.deepEqual(res, [{a: 'abcdef'}, {a: 'abc123'}]);
		done();
	});

	it('2. Test alasql.utils.like function', function(done) {
		assert(alasql.utils.like('%abc%', 'abcd'));
		assert(!alasql.utils.like('%abc%', 'ab'));
		assert(alasql.utils.like('%[ab][bc]%', 'abcdef'));
		assert(!alasql.utils.like('%[aw][qq]%', 'abcdef'));
		assert(alasql.utils.like('%(%)', 'abc(def)'));
		assert(!alasql.utils.like('%(%)', 'abc(def'));

		assert(alasql.utils.like('!%%!)', '%123)', '!'));
		assert(alasql.utils.like('!%%', '%', '!'));
		assert(alasql.utils.like('!%![!%!]', '%[%]', '!'));

		assert(alasql.utils.like('a_ra_c%', 'abra cadabra', '!'));
		assert(alasql.utils.like('a!_ra_c%', 'a_ra cadabra', '!'));
		assert(!alasql.utils.like('a!_ra_c%', 'abra cadabra', '!'));

		done();
	});
});
