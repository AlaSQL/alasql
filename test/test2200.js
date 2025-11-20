if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var testId = '2200';

describe(
	'Test ' + testId + ' - SHOW COLUMNS and SHOW INDEX with qualified table names',
	function () {
		before(function () {
			alasql('CREATE DATABASE test2200a');
			alasql('CREATE DATABASE test2200b');
			alasql('USE test2200a');
			alasql('CREATE TABLE table1 (col1 INT, col2 VARCHAR(50))');
			alasql('CREATE INDEX idx_col1 ON table1(col1)');
			alasql('USE test2200b');
			alasql('CREATE TABLE table2 (col3 DECIMAL(10,2), col4 BOOLEAN)');
			alasql('CREATE INDEX idx_col3 ON table2(col3)');
		});

		it('1. SHOW COLUMNS with unqualified name (USE context)', function () {
			alasql('USE test2200a');
			var res = alasql('SHOW COLUMNS FROM table1');
			assert.equal(res.length, 2);
			assert.equal(res[0].columnid, 'col1');
			assert.equal(res[0].dbtypeid, 'INT');
			assert.equal(res[1].columnid, 'col2');
			assert.equal(res[1].dbtypeid, 'VARCHAR');
			assert.equal(res[1].dbsize, 50);
		});

		it('2. SHOW COLUMNS with qualified name (database.table)', function () {
			// This test should work regardless of current USE context
			alasql('USE test2200b');
			var res = alasql('SHOW COLUMNS FROM test2200a.table1');
			assert.equal(res.length, 2, 'Should return 2 columns');
			assert.equal(res[0].columnid, 'col1');
			assert.equal(res[0].dbtypeid, 'INT');
			assert.equal(res[1].columnid, 'col2');
			assert.equal(res[1].dbtypeid, 'VARCHAR');
			assert.equal(res[1].dbsize, 50);
		});

		it('3. SHOW INDEX with unqualified name (USE context)', function () {
			alasql('USE test2200a');
			var res = alasql('SHOW INDEX FROM table1');
			assert.equal(res.length, 1);
			assert.ok(res[0].hh, 'Should have index hash');
		});

		it('4. SHOW INDEX with qualified name (database.table)', function () {
			// This test should work regardless of current USE context
			alasql('USE test2200b');
			var res = alasql('SHOW INDEX FROM test2200a.table1');
			assert.equal(res.length, 1, 'Should return 1 index');
			assert.ok(res[0].hh, 'Should have index hash');
		});

		it('5. SHOW COLUMNS with qualified name in different database', function () {
			alasql('USE test2200a');
			var res = alasql('SHOW COLUMNS FROM test2200b.table2');
			assert.equal(res.length, 2, 'Should return 2 columns');
			assert.equal(res[0].columnid, 'col3');
			assert.equal(res[0].dbtypeid, 'DECIMAL');
			assert.equal(res[1].columnid, 'col4');
			assert.equal(res[1].dbtypeid, 'BOOLEAN');
		});

		it('6. SHOW INDEX with qualified name in different database', function () {
			alasql('USE test2200a');
			var res = alasql('SHOW INDEX FROM test2200b.table2');
			assert.equal(res.length, 1, 'Should return 1 index');
			assert.ok(res[0].hh, 'Should have index hash');
		});

		after(function () {
			alasql('DROP DATABASE test2200a');
			alasql('DROP DATABASE test2200b');
		});
	}
);
