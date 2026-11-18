if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2775'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - IF [NOT] EXISTS for indexes and triggers`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE s (a INT)');
		alasql.fn.onInsert2775 = function () {};
	});

	after(function () {
		delete alasql.fn.onInsert2775;
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) CREATE INDEX IF NOT EXISTS', function () {
		let res = [];
		res.push(alasql('CREATE INDEX IF NOT EXISTS i1 ON s (a)'));
		res.push(alasql('CREATE INDEX IF NOT EXISTS i1 ON s (a)'));
		res.push(alasql('CREATE UNIQUE INDEX IF NOT EXISTS i2 ON s (a)'));
		res.push(alasql('CREATE UNIQUE INDEX IF NOT EXISTS i2 ON s (a)'));
		assert.deepStrictEqual(res, [1, 0, 1, 0]);
	});

	it('B) DROP INDEX IF EXISTS', function () {
		let res = [];
		res.push(alasql('DROP INDEX IF EXISTS i1'));
		res.push(alasql('DROP INDEX IF EXISTS nothere'));
		assert.deepStrictEqual(res, [1, 0]);
	});

	it('C) CREATE TRIGGER IF NOT EXISTS keeps the first trigger', function () {
		let res = [];
		res.push(alasql('CREATE TRIGGER IF NOT EXISTS tr1 BEFORE INSERT ON s CALL onInsert2775()'));
		res.push(alasql('CREATE TRIGGER IF NOT EXISTS tr1 AFTER DELETE ON s CALL onInsert2775()'));
		res.push(alasql.databases['test' + testId].triggers.tr1.when);
		assert.deepStrictEqual(res, [1, 0, 'BEFORE']);
	});

	it('D) DROP TRIGGER IF EXISTS', function () {
		let res = [];
		res.push(alasql('DROP TRIGGER IF EXISTS tr1'));
		res.push(alasql('DROP TRIGGER IF EXISTS tr1'));
		assert.deepStrictEqual(res, [1, 0]);
		assert.throws(() => alasql('DROP TRIGGER tr1'), /Trigger not found/);
	});

	it('E) toString keeps the clause', function () {
		assert.deepStrictEqual(
			[
				'CREATE INDEX IF NOT EXISTS i3 ON s (a)',
				'DROP INDEX IF EXISTS i3',
				'DROP TRIGGER IF EXISTS tr2',
			].map(sql => alasql.parse(sql).statements[0].toString()),
			[
				'CREATE INDEX IF NOT EXISTS i3 ON s(a ASC)',
				'DROP INDEX IF EXISTS i3',
				'DROP TRIGGER IF EXISTS tr2',
			]
		);
	});
});
