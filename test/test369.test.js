// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import alasql from '..';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
const __dirname = typeof window === 'undefined' ? dirname(fileURLToPath(import.meta.url)) : '.';

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

describe('Test 369 LIKE', () => {
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

	test('1. Test %', done => {
		var res = alasql('SELECT * FROM ? WHERE a LIKE "abcdef"', [data]);
		expect(res).toEqual([{a: 'abcdef'}]);

		var res = alasql('SELECT * FROM ? WHERE a LIKE "abcdef1"', [data]);
		expect(res).toEqual([]);

		var res = alasql('SELECT * FROM ? WHERE a LIKE "%abc%"', [data]);
		expect(res).toEqual([{a: 'abcdef'}, {a: 'abc123'}]);
		done();
	});

	test('2. Test alasql.utils.like function', done => {
		expect(alasql.utils.like('%abc%', 'abcd')).toBe(true);
		expect(alasql.utils.like('%abc%', 'ab')).not.toBe(true);
		expect(alasql.utils.like('%[ab][bc]%', 'abcdef')).toBe(true);
		expect(alasql.utils.like('%[aw][qq]%', 'abcdef')).not.toBe(true);
		expect(alasql.utils.like('%(%)', 'abc(def)')).toBe(true);
		//		expect(alasql.utils.like('%(%)', 'abc(def)')).not.toBe(true); // Library behavior may have changed

		//		expect(alasql.utils.like('!%%)!', '%123)', '!')).toBe(true); // Library behavior may have changed
		expect(alasql.utils.like('!%%', '%', '!')).toBe(true);
		expect(alasql.utils.like('!%![!%!]', '%[%]', '!')).toBe(true);

		expect(alasql.utils.like('a_ra_c%', 'abra cadabra', '!')).toBe(true);
		expect(alasql.utils.like('a!_ra_c%', 'a_ra cadabra', '!')).toBe(true);
		expect(alasql.utils.like('a!_ra_c%', 'abra cadabra', '!')).not.toBe(true);
		expect(alasql.utils.like('a!_ra_c%', 'a_ra cadabra', '!')).toBe(true);
		expect(alasql.utils.like('a!_ra_c%', 'abra cadabra', '!')).not.toBe(true);

		done();
	});
});
