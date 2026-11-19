if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2864'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - ANALYZE, OPTIMIZE, CHECK, REPAIR, FLUSH, LOCK and UNLOCK`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t1 (a INT)');
		alasql('CREATE TABLE t2 (a INT)');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) ANALYZE, OPTIMIZE, CHECK and REPAIR give one row per table', function () {
		const db = 'test' + testId;
		assert.deepStrictEqual(
			['ANALYZE TABLE t1', 'optimize table t1, t2', 'CHECK TABLE t1', 'REPAIR TABLE t2'].map(sql =>
				alasql(sql)
			),
			[
				[{Table: db + '.t1', Op: 'analyze', Msg_type: 'status', Msg_text: 'OK'}],
				[
					{Table: db + '.t1', Op: 'optimize', Msg_type: 'status', Msg_text: 'OK'},
					{Table: db + '.t2', Op: 'optimize', Msg_type: 'status', Msg_text: 'OK'},
				],
				[{Table: db + '.t1', Op: 'check', Msg_type: 'status', Msg_text: 'OK'}],
				[{Table: db + '.t2', Op: 'repair', Msg_type: 'status', Msg_text: 'OK'}],
			]
		);
	});

	it('B) FLUSH, LOCK and UNLOCK give nothing', function () {
		assert.deepStrictEqual(
			[
				'FLUSH TABLES',
				'FLUSH PRIVILEGES',
				'FLUSH STATUS',
				'LOCK TABLES t1 WRITE',
				'LOCK TABLES t1 READ LOCAL, t2 LOW_PRIORITY WRITE',
				'UNLOCK TABLES',
			].map(sql => alasql(sql)),
			[[], [], [], [], [], []]
		);
	});

	it('C) a missing table or an unknown word is an error', function () {
		assert.throws(() => alasql('ANALYZE TABLE nothere'), /does not exist/);
		assert.throws(() => alasql('FOO TABLE t1'));
	});

	it('D) the words are still column names', function () {
		alasql(
			'CREATE TABLE z (analyze INT, optimize INT, repair INT, flush INT, lock INT, unlock INT)'
		);
		alasql('INSERT INTO z VALUES (1, 2, 3, 4, 5, 6)');
		assert.deepStrictEqual(alasql('SELECT analyze, optimize, repair, flush, lock, unlock FROM z'), [
			{analyze: 1, optimize: 2, repair: 3, flush: 4, lock: 5, unlock: 6},
		]);
	});
});
