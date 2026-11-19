if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2865'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - SHOW CREATE VIEW, WARNINGS, ERRORS, STATUS and VARIABLES`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE t1 (a INT)');
		alasql('CREATE VIEW v1 AS SELECT a FROM t1');
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	// NOTE: Always assert.deepStrictEqual the final and complete output of the last call to alasql

	it('A) SHOW CREATE VIEW', function () {
		assert.deepStrictEqual(alasql('SHOW CREATE VIEW v1'), 'CREATE VIEW v1 AS SELECT a FROM t1');
	});

	it('B) SHOW CREATE VIEW of a table or a missing view throws', function () {
		assert.throws(() => alasql('SHOW CREATE VIEW t1'), /no such view/);
		assert.throws(() => alasql('SHOW CREATE VIEW nothere'), /no such view/);
	});

	it('C) SHOW WARNINGS, ERRORS, STATUS and VARIABLES are empty', function () {
		assert.deepStrictEqual(
			[
				'SHOW WARNINGS',
				'show errors',
				"SHOW STATUS LIKE 'x%'",
				'SHOW VARIABLES',
				"SHOW VARIABLES LIKE 'sql_mode'",
			].map(sql => alasql(sql)),
			[[], [], [], [], []]
		);
	});

	it('D) another word after SHOW is an error', function () {
		assert.throws(() => alasql('SHOW SOMETHING'), /Unknown SHOW statement/);
	});

	it('E) the words are still column names', function () {
		alasql('CREATE TABLE w (warnings INT, errors INT, status INT, variables INT)');
		alasql('INSERT INTO w VALUES (1, 2, 3, 4)');
		assert.deepStrictEqual(alasql('SELECT warnings, errors, status, variables FROM w'), [
			{warnings: 1, errors: 2, status: 3, variables: 4},
		]);
	});
});
