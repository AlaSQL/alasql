if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2974'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - INSTR with a NULL or a number argument`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) A NULL column value does not stop the query', function () {
		alasql('create table one (name string)');
		alasql('insert into one values ("anna"), (NULL), ("bob")');
		let res = alasql('select name, INSTR(name, "b") as p from one');
		assert.deepStrictEqual(res, [
			{name: 'anna', p: 0},
			{name: undefined, p: undefined},
			{name: 'bob', p: 1},
		]);
	});

	it('B) NULL as either argument gives NULL', function () {
		let res = [alasql('select value INSTR(NULL, "a")'), alasql('select value INSTR("abc", NULL)')];
		assert.deepStrictEqual(res, [undefined, undefined]);
	});

	it('C) A number is searched as its text', function () {
		let res = [alasql('select value INSTR(12345, "3")'), alasql('select value INSTR("abc", "c")')];
		assert.deepStrictEqual(res, [3, 3]);
	});
});
