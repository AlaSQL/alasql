if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 927 - PRIMARY KEY constraint verification', function () {
	const test = '927';

	it('A) Test with in-memory database (not IndexedDB)', function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
		
		alasql('CREATE TABLE cities (city STRING PRIMARY KEY, population NUMBER)');
		
		// Round 1
		var res1 = alasql('INSERT INTO cities SELECT * FROM ?', [
			[
				{ city: 'Redmond', population: 57530 },
				{ city: 'Atlanta', population: 447841 },
			],
		]);
		assert.equal(res1, 2);
		
		var data1 = alasql('SELECT * FROM cities');
		assert.equal(data1.length, 2);
		
		// Round 2 - Try to insert duplicate
		var errorThrown = false;
		try {
			alasql('INSERT INTO cities SELECT * FROM ?', [
				[{ city: 'Redmond', population: 42 }],
			]);
		} catch (e) {
			errorThrown = true;
			assert(e.message.indexOf('primary key') > -1, 'Error message should mention primary key');
		}
		
		assert(errorThrown, 'Expected error for duplicate PRIMARY KEY');
		
		// Verify no duplicate was inserted
		var data2 = alasql('SELECT * FROM cities');
		assert.equal(data2.length, 2, 'Should still have 2 records');
		
		alasql('DROP DATABASE test' + test);
	});

	it('B) Test with regular INSERT VALUES', function () {
		alasql('CREATE DATABASE test' + test + 'b');
		alasql('USE test' + test + 'b');
		
		alasql('CREATE TABLE cities (city STRING PRIMARY KEY, population NUMBER)');
		
		// Insert first record
		var res1 = alasql("INSERT INTO cities VALUES ('Redmond', 57530), ('Atlanta', 447841)");
		assert.equal(res1, 2);
		
		// Try to insert duplicate
		var errorThrown = false;
		try {
			alasql("INSERT INTO cities VALUES ('Redmond', 42)");
		} catch (e) {
			errorThrown = true;
			assert(e.message.indexOf('primary key') > -1, 'Error message should mention primary key');
		}
		
		assert(errorThrown, 'Expected error for duplicate PRIMARY KEY');
		
		// Verify no duplicate was inserted
		var data = alasql('SELECT * FROM cities');
		assert.equal(data.length, 2, 'Should still have 2 records');
		
		alasql('DROP DATABASE test' + test + 'b');
	});
});
