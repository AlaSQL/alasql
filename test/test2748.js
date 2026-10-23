if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2748'; // LIKE and GLOB take ^, $, \ and escaped letters literally

describe(`Test ${testId} - LIKE and GLOB take regular expression characters literally`, function () {
	var rows = ['a$b', 'abc', 'x', 'x^', '1^1', '1d', '15', 'a.c', 'a\\b', 'a+b', 'a\nb', 'ab$'].map(
		c => ({c})
	);
	var where = cond => alasql(`SELECT COLUMN c FROM ? WHERE c ${cond}`, [rows]);

	// Expected values are SQLite 3.43's answers for the same rows
	it('A) ^ and $ in LIKE', function () {
		assert.deepStrictEqual(where("LIKE 'a$%'"), ['a$b']);
		assert.deepStrictEqual(where("LIKE '%$'"), ['ab$']);
		assert.deepStrictEqual(where("LIKE 'x^'"), ['x^']);
		assert.deepStrictEqual(where("LIKE '%^%'"), ['x^', '1^1']);
	});

	it('B) A backslash in LIKE is an ordinary character', function () {
		assert.deepStrictEqual(alasql('SELECT COLUMN c FROM ? WHERE c LIKE ?', [rows, 'a\\b']), [
			'a\\b',
		]);
	});

	it('C) The character after ESCAPE is literal, also a letter or a digit', function () {
		assert.deepStrictEqual(where("LIKE '1!d' ESCAPE '!'"), ['1d']);
		assert.deepStrictEqual(where("LIKE '1!5' ESCAPE '!'"), ['15']);
		assert.deepStrictEqual(where("LIKE 'a!.c' ESCAPE '!'"), ['a.c']);
		assert.deepStrictEqual(where("LIKE 'ab!$' ESCAPE '!'"), ['ab$']);
	});

	it('D) An ESCAPE character at the end of the pattern matches nothing', function () {
		assert.deepStrictEqual(where("LIKE 'ab!' ESCAPE '!'"), []);
	});

	it('E) _ and % match a newline', function () {
		assert.deepStrictEqual(where("LIKE 'a_b'"), ['a$b', 'a\\b', 'a+b', 'a\nb']);
		assert.deepStrictEqual(where("LIKE 'a%b'"), ['a$b', 'a\\b', 'a+b', 'a\nb']);
	});

	it('F) ^, $ and newlines in GLOB', function () {
		assert.deepStrictEqual(where("GLOB 'a$*'"), ['a$b']);
		assert.deepStrictEqual(where("GLOB '*^*'"), ['x^', '1^1']);
		assert.deepStrictEqual(where("GLOB 'a?b'"), ['a$b', 'a\\b', 'a+b', 'a\nb']);
		assert.deepStrictEqual(where("GLOB 'a.c'"), ['a.c']);
	});

	it('G) Unchanged: wildcards, ESCAPE of a wildcard, case and character classes', function () {
		var data = [{c: 'Abc'}, {c: 'a%c'}, {c: 'a_c'}, {c: 'bbc'}];
		var w = cond => alasql(`SELECT COLUMN c FROM ? WHERE c ${cond}`, [data]);
		assert.deepStrictEqual(w("LIKE 'a%'"), ['Abc', 'a%c', 'a_c']);
		assert.deepStrictEqual(w("LIKE 'a!%c' ESCAPE '!'"), ['a%c']);
		assert.deepStrictEqual(w("LIKE 'a!_c' ESCAPE '!'"), ['a_c']);
		assert.deepStrictEqual(w("NOT LIKE 'a%'"), ['bbc']);
		assert.deepStrictEqual(w("LIKE '[ab]bc'"), ['Abc', 'bbc']);
		assert.deepStrictEqual(w("LIKE '[^a]bc'"), ['bbc']);
		assert.deepStrictEqual(w("GLOB 'ABC'"), ['Abc']); // GLOB ignores case in alasql (#2748, 5.0 question)
		assert.deepStrictEqual(w("GLOB '[ab]*'"), ['Abc', 'a%c', 'a_c', 'bbc']);
	});
});
