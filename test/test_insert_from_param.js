if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test INSERT FROM parameter issue', function () {
	it('INSERT INTO table SELECT * FROM ? with data array', function (done) {
		// Create a new database like in the issue
		var inmemDB = new alasql.Database('test_insert_db');
		
		// Create table
		var query = "CREATE TABLE IF NOT EXISTS [BCPartners] (RecordNum INTEGER PRIMARY KEY AUTOINCREMENT, [TABLE_NAME] TEXT DEFAULT '', [BC] TEXT DEFAULT '')";
		inmemDB.exec(query);
		
		// Prepare test data
		var data = [
			{TABLE_NAME: 'Table1', BC: 'BC1'},
			{TABLE_NAME: 'Table2', BC: 'BC2'},
			{TABLE_NAME: 'Table3', BC: 'BC3'}
		];
		
		// Insert data
		inmemDB.exec("INSERT INTO [BCPartners] SELECT * FROM ?", [data]);
		
		// Verify data was inserted correctly
		var result = inmemDB.exec("SELECT * FROM [BCPartners]");
		
		console.log('Result:', JSON.stringify(result, null, 2));
		
		assert.equal(result.length, 3, 'Should have 3 records');
		assert.equal(result[0].TABLE_NAME, 'Table1', 'First record TABLE_NAME should be Table1');
		assert.equal(result[0].BC, 'BC1', 'First record BC should be BC1');
		assert.equal(result[1].TABLE_NAME, 'Table2', 'Second record TABLE_NAME should be Table2');
		assert.equal(result[1].BC, 'BC2', 'Second record BC should be BC2');
		assert.equal(result[2].TABLE_NAME, 'Table3', 'Third record TABLE_NAME should be Table3');
		assert.equal(result[2].BC, 'BC3', 'Third record BC should be BC3');
		
		// Clean up
		alasql('DROP DATABASE test_insert_db');
		done();
	});

	it('INSERT INTO table SELECT * FROM ? using default database', function (done) {
		// Test with default database (alasql)
		alasql('DROP TABLE IF EXISTS BCPartners');
		alasql('CREATE TABLE BCPartners (RecordNum INTEGER PRIMARY KEY AUTOINCREMENT, TABLE_NAME TEXT DEFAULT \'\', BC TEXT DEFAULT \'\')');
		
		// Prepare test data
		var data = [
			{TABLE_NAME: 'Table1', BC: 'BC1'},
			{TABLE_NAME: 'Table2', BC: 'BC2'}
		];
		
		// Insert data
		alasql('INSERT INTO BCPartners SELECT * FROM ?', [data]);
		
		// Verify data was inserted correctly
		var result = alasql('SELECT * FROM BCPartners');
		
		console.log('Default DB Result:', JSON.stringify(result, null, 2));
		
		assert.equal(result.length, 2, 'Should have 2 records');
		assert.equal(result[0].TABLE_NAME, 'Table1', 'First record TABLE_NAME should be Table1');
		assert.equal(result[0].BC, 'BC1', 'First record BC should be BC1');
		assert.equal(result[1].TABLE_NAME, 'Table2', 'Second record TABLE_NAME should be Table2');
		assert.equal(result[1].BC, 'BC2', 'Second record BC should be BC2');
		
		// Clean up
		alasql('DROP TABLE BCPartners');
		done();
	});
});
