if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2780'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - DEFAULT with a signed number`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	const defaultOf = function (name, type, def) {
		let res = [];
		res.push(alasql(`create table ${name} (id int, a ${type} default ${def})`));
		res.push(alasql(`insert into ${name} (id) values (1)`));
		res.push(alasql(`select * from ${name}`));
		return res;
	};

	it('A) DEFAULT 5', function () {
		assert.deepStrictEqual(defaultOf('one', 'int', '5'), [1, 1, [{id: 1, a: 5}]]);
	});

	it('B) DEFAULT (-5)', function () {
		assert.deepStrictEqual(defaultOf('two', 'int', '(-5)'), [1, 1, [{id: 1, a: -5}]]);
	});

	it('C) DEFAULT -5', function () {
		assert.deepStrictEqual(defaultOf('three', 'int', '-5'), [1, 1, [{id: 1, a: -5}]]);
	});

	it('D) DEFAULT +5', function () {
		assert.deepStrictEqual(defaultOf('four', 'int', '+5'), [1, 1, [{id: 1, a: 5}]]);
	});

	it('E) DEFAULT -9.99E10', function () {
		assert.deepStrictEqual(defaultOf('five', 'real', '-9.99E10'), [1, 1, [{id: 1, a: -9.99e10}]]);
	});

	it('F) A signed DEFAULT is stored as a number', function () {
		let res = defaultOf('six', 'real', '-9.99E10');
		assert.strictEqual(typeof res[2][0].a, 'number');
		assert.deepStrictEqual(res, [1, 1, [{id: 1, a: -99900000000}]]);
	});
});
