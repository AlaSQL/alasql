if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 341 Intellectual DOT operator', function () {
	// Enable JavaScript property access via dot notation for these tests
	before(function () {
		alasql.options.angularBrackets = true;
	});

	after(function () {
		alasql.options.angularBrackets = false;
	});

	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test341;USE test341');
		done();
	});

	it('2. Create tables', function (done) {
		var res = alasql(function () {
			/*

      CREATE TABLE cities (city STRING PRIMARY KEY, population INT);
      INSERT INTO cities VALUES 
        ("New York", 16200000),
        ("Krasnodar", 1200000),
        ("Prague", 2300000);

      CREATE TABLE persons (id INT PRIMARY KEY, name STRING, city STRING REFERENCES cities);
      INSERT INTO persons VALUES (1,"Andrey","Krasnodar"), (2,"Valery","Prague"), (3,"Michael","New York");
  */
		});
		assert.deepEqual(res, [1, 3, 1, 3]);
		done();
	});

	it('3. SQL Standard way', function (done) {
		var res = alasql('SELECT COLUMN persons.name FROM persons');
		assert.deepEqual(res, ['Andrey', 'Valery', 'Michael']);
		done();
	});

	it('4. JavaScript way', function (done) {
		// Test SET statement with JavaScript property access
		// SET returns the number of rows affected (1 for variable assignment)
		var res = alasql('SET @a = "who".length');
		assert.deepEqual(res, 1);

		// Verify the variable @a was set to the correct value (length of "who" = 3)
		assert.deepEqual(alasql.vars.a, 3);

		// Verify we can use the variable in subsequent queries
		var res2 = alasql('SELECT @a AS result');
		assert.deepEqual(res2, [{result: 3}]);
		done();
	});

	it('5. JavaScript way', function (done) {
		var res = alasql('SELECT COLUMN name.length FROM persons');
		assert.deepEqual(res, [6, 6, 7]);
		done();
	});

	it('6. JavaScript way with table.column.length', function (done) {
		var res = alasql('SELECT COLUMN persons.name.length FROM persons');
		assert.deepEqual(res, [6, 6, 7]);
		done();
	});

	it('7. Edge case: table and column with same name', function (done) {
		// Create a table named "item" with a column named "item"
		alasql('CREATE TABLE item (id INT, item STRING)');
		alasql('INSERT INTO item VALUES (1, "Alpha"), (2, "Beta")');

		// Test 1: table.column access (item.item should get the column value)
		var res1 = alasql('SELECT item.item FROM item');
		assert.deepEqual(res1, [{item: 'Alpha'}, {item: 'Beta'}]);

		// Test 2: table.column.property access (item.item.length should get the length)
		var res2 = alasql('SELECT COLUMN item.item.length FROM item');
		assert.deepEqual(res2, [5, 4]);

		// Test 3: When only one column exists with unique name, property access works
		alasql('CREATE TABLE products (title STRING)');
		alasql('INSERT INTO products VALUES ("Product"), ("Item")');
		var res3 = alasql('SELECT COLUMN title.length FROM products');
		assert.deepEqual(res3, [7, 4]);

		alasql('DROP TABLE item');
		alasql('DROP TABLE products');
		done();
	});

	it('5. FOREIGN KEY way', function (done) {
		var res = alasql('SELECT VALUE $0;  SET $0 = 200; SELECT VALUE $0', [100]);
		assert.deepEqual(res, [100, 1, 200]);
		done();
	});

	it.skip('6. Object reference', function (done) {
		/** @todo Create this test */
		//    var res = alasql('SELECT VALUE $0;  SET $0 = 200; SELECT VALUE $0',[100]);
		//    assert.deepEqual(res.sort(),[100,1,200]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql.options.modifier = undefined;
		alasql('DROP DATABASE test341');
		done();
	});
});
