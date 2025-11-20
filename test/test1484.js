if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1484 - INSERT FROM parameter with defaults', function () {
	it('1. INSERT INTO table SELECT * FROM ? with data array', () => {
		// Create a new database like in the issue
		var inmemDB = new alasql.Database('test_insert_db');

		// Create table
		var query =
			"CREATE TABLE IF NOT EXISTS [BCPartners] (RecordNum INTEGER PRIMARY KEY AUTOINCREMENT, [TABLE_NAME] TEXT DEFAULT '', [BC] TEXT DEFAULT '')";
		inmemDB.exec(query);

		// Prepare test data
		var data = [
			{TABLE_NAME: 'Table1', BC: 'BC1'},
			{TABLE_NAME: 'Table2', BC: 'BC2'},
			{TABLE_NAME: 'Table3', BC: 'BC3'},
		];

		// Insert data
		inmemDB.exec('INSERT INTO [BCPartners] SELECT * FROM ?', [data]);

		// Verify data was inserted correctly
		var result = inmemDB.exec('SELECT * FROM [BCPartners]');

		var expected = [
			{RecordNum: 1, TABLE_NAME: 'Table1', BC: 'BC1'},
			{RecordNum: 2, TABLE_NAME: 'Table2', BC: 'BC2'},
			{RecordNum: 3, TABLE_NAME: 'Table3', BC: 'BC3'},
		];
		assert.deepEqual(result, expected);

		// Clean up
		alasql('DROP DATABASE test_insert_db');
	});

	it('2. INSERT INTO table SELECT * FROM ? using default database', () => {
		// Test with default database (alasql)
		alasql('DROP TABLE IF EXISTS BCPartners');
		alasql(
			"CREATE TABLE BCPartners (RecordNum INTEGER PRIMARY KEY AUTOINCREMENT, TABLE_NAME TEXT DEFAULT '', BC TEXT DEFAULT '')"
		);

		// Prepare test data
		var data = [
			{TABLE_NAME: 'Table1', BC: 'BC1'},
			{TABLE_NAME: 'Table2', BC: 'BC2'},
		];

		// Insert data
		alasql('INSERT INTO BCPartners SELECT * FROM ?', [data]);

		// Verify data was inserted correctly
		var result = alasql('SELECT * FROM BCPartners');

		var expected = [
			{RecordNum: 1, TABLE_NAME: 'Table1', BC: 'BC1'},
			{RecordNum: 2, TABLE_NAME: 'Table2', BC: 'BC2'},
		];
		assert.deepEqual(result, expected);

		// Clean up
		alasql('DROP TABLE BCPartners');
	});

	it('3. INSERT with partial columns - defaults should apply for missing columns', () => {
		alasql('DROP TABLE IF EXISTS TestDefaults');
		alasql(
			'CREATE TABLE TestDefaults (id INT, name TEXT DEFAULT "NoName", status TEXT DEFAULT "Active")'
		);

		// Insert data with only id and name
		var data = [
			{id: 1, name: 'Item1'},
			{id: 2, name: 'Item2'},
		];
		alasql('INSERT INTO TestDefaults SELECT * FROM ?', [data]);

		var result = alasql('SELECT * FROM TestDefaults');

		// status should have default value
		var expected = [
			{id: 1, name: 'Item1', status: 'Active'},
			{id: 2, name: 'Item2', status: 'Active'},
		];
		assert.deepEqual(result, expected);

		alasql('DROP TABLE TestDefaults');
	});

	it('4. INSERT with empty source columns should preserve empty values not defaults', () => {
		alasql('DROP TABLE IF EXISTS TestEmpty');
		alasql('CREATE TABLE TestEmpty (id INT, val TEXT DEFAULT "DefaultValue")');

		// Insert data with empty string (not undefined/missing)
		var data = [
			{id: 1, val: ''},
			{id: 2, val: ''},
		];
		alasql('INSERT INTO TestEmpty SELECT * FROM ?', [data]);

		var result = alasql('SELECT * FROM TestEmpty');

		// Empty strings should be preserved, not replaced with defaults
		var expected = [
			{id: 1, val: ''},
			{id: 2, val: ''},
		];
		assert.deepEqual(result, expected);

		alasql('DROP TABLE TestEmpty');
	});

	it('5. INSERT from subquery with defaults', () => {
		alasql('DROP TABLE IF EXISTS Source');
		alasql('DROP TABLE IF EXISTS TargetTable');
		alasql('CREATE TABLE Source (id INT, name TEXT)');
		alasql('CREATE TABLE TargetTable (id INT, name TEXT, timestamp TEXT DEFAULT "2025")');

		// Insert source data
		alasql('INSERT INTO Source VALUES (1, "A"), (2, "B")');

		// Insert from source to target - timestamp should get default
		alasql('INSERT INTO TargetTable SELECT * FROM Source');

		var result = alasql('SELECT * FROM TargetTable');

		var expected = [
			{id: 1, name: 'A', timestamp: '2025'},
			{id: 2, name: 'B', timestamp: '2025'},
		];
		assert.deepEqual(result, expected);

		alasql('DROP TABLE Source');
		alasql('DROP TABLE TargetTable');
	});

	it('6. INSERT with mixed present and missing columns', () => {
		alasql('DROP TABLE IF EXISTS MixedTest');
		alasql(
			'CREATE TABLE MixedTest (a INT, b TEXT DEFAULT "B_default", c TEXT DEFAULT "C_default", d TEXT DEFAULT "D_default")'
		);

		// Some records have different columns
		var data = [
			{a: 1, b: 'B1', c: 'C1'}, // missing d
			{a: 2, c: 'C2', d: 'D2'}, // missing b
			{a: 3, b: 'B3', d: 'D3'}, // missing c
		];
		alasql('INSERT INTO MixedTest SELECT * FROM ?', [data]);

		var result = alasql('SELECT * FROM MixedTest');

		var expected = [
			{a: 1, b: 'B1', c: 'C1', d: 'D_default'},
			{a: 2, b: 'B_default', c: 'C2', d: 'D2'},
			{a: 3, b: 'B3', c: 'C_default', d: 'D3'},
		];
		assert.deepEqual(result, expected);

		alasql('DROP TABLE MixedTest');
	});

	it('7. INSERT with undefined values should preserve undefined not apply defaults', () => {
		alasql('DROP TABLE IF EXISTS UndefinedTest');
		alasql('CREATE TABLE UndefinedTest (id INT, val TEXT DEFAULT "DefaultVal")');

		// Explicitly set val to undefined
		var data = [
			{id: 1, val: undefined},
			{id: 2, val: null},
		];
		alasql('INSERT INTO UndefinedTest SELECT * FROM ?', [data]);

		var result = alasql('SELECT * FROM UndefinedTest');

		// undefined and null should be preserved
		var expected = [
			{id: 1, val: undefined},
			{id: 2, val: null},
		];
		assert.deepEqual(result, expected);

		alasql('DROP TABLE UndefinedTest');
	});
});
