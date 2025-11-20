if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test INSERT FROM parameter issue', function () {
	it('INSERT INTO table SELECT * FROM ? with data array', () => {
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

		console.log('Result:', JSON.stringify(result, null, 2));

		var expected = [
			{RecordNum: 1, TABLE_NAME: 'Table1', BC: 'BC1'},
			{RecordNum: 2, TABLE_NAME: 'Table2', BC: 'BC2'},
			{RecordNum: 3, TABLE_NAME: 'Table3', BC: 'BC3'},
		];
		assert.deepEqual(result, expected);

		// Clean up
		alasql('DROP DATABASE test_insert_db');
	});

	it('INSERT INTO table SELECT * FROM ? using default database', () => {
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

		console.log('Default DB Result:', JSON.stringify(result, null, 2));

		var expected = [
			{RecordNum: 1, TABLE_NAME: 'Table1', BC: 'BC1'},
			{RecordNum: 2, TABLE_NAME: 'Table2', BC: 'BC2'},
		];
		assert.deepEqual(result, expected);

		// Clean up
		alasql('DROP TABLE BCPartners');
	});
});
