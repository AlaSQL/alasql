// @ts-ignore
import {describe, expect, test, beforeAll, afterAll} from 'bun:test';
import assert from 'assert';
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

describe('Test 370 REGEXP_LIKE', function () {
	test('1. Test REGEXP_LIKE', function (done) {
		assert(alasql('= REGEXP_LIKE("abcdef","a.*")'));
		assert(!alasql('= REGEXP_LIKE("abcdef","^d")'));
		assert(alasql('= REGEXP_LIKE("abcdef","^a.*d")'));
		done();
	});

	test('2. Test REGEXP', function (done) {
		//console.log(alasql('= "abcdef" REGEXP "a.*"'));
		assert(alasql('= "abcdef" REGEXP "a.*"'));
		assert(alasql('= "abcdef" REGEXP "[aq]"'));
		assert(alasql('= "abcdef" REGEXP "[^qw]"'));
		assert(!alasql('= "abcdef" REGEXP "[qw]"'));
		done();
	});
});
