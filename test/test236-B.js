if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 236-B MERGE - Additional scenarios', function () {
	beforeEach(function () {
		alasql('CREATE DATABASE IF NOT EXISTS test236b');
		alasql('USE test236b');
	});

	afterEach(function () {
		alasql('DROP DATABASE IF EXISTS test236b');
	});

	it('1. Basic MERGE with INSERT and UPDATE', function () {
		// Setup
		alasql('CREATE TABLE [Target1] (id INT, name STRING, val INT)');
		alasql('CREATE TABLE [Source1] (id INT, name STRING, val INT)');
		alasql('INSERT INTO [Target1] VALUES (1, "Alice", 100), (2, "Bob", 200)');
		alasql('INSERT INTO [Source1] VALUES (2, "Bob", 250), (3, "Charlie", 300)');

		// Execute MERGE
		var res = alasql(`
            MERGE INTO [Target1] AS t
            USING [Source1] AS s
            ON t.id = s.id
            WHEN MATCHED THEN 
                UPDATE SET t.val = s.val
            WHEN NOT MATCHED THEN 
                INSERT (id, name, val) VALUES (s.id, s.name, s.val)
        `);

		// Verify: 1 update + 1 insert = 2 affected
		assert.equal(res, 2);

		// Verify final state
		var result = alasql('SELECT * FROM [Target1] ORDER BY id');
		assert.deepEqual(result, [
			{id: 1, name: 'Alice', val: 100}, // Unchanged
			{id: 2, name: 'Bob', val: 250}, // Updated
			{id: 3, name: 'Charlie', val: 300}, // Inserted
		]);
	});

	it('2. MERGE with DELETE when matched', function () {
		// Setup
		alasql('CREATE TABLE [Target2] (id INT, status STRING)');
		alasql('CREATE TABLE [Source2] (id INT, action STRING)');
		alasql('INSERT INTO [Target2] VALUES (1, "active"), (2, "active"), (3, "active")');
		alasql('INSERT INTO [Source2] VALUES (2, "delete")');

		// Execute MERGE - delete matched rows
		var res = alasql(`
            MERGE INTO [Target2] AS t
            USING [Source2] AS s
            ON t.id = s.id
            WHEN MATCHED THEN DELETE
        `);

		assert.equal(res, 1);

		var result = alasql('SELECT * FROM [Target2] ORDER BY id');
		assert.deepEqual(result, [
			{id: 1, status: 'active'},
			{id: 3, status: 'active'},
		]);
	});

	it('3. MERGE with conditional INSERT (AND clause)', function () {
		// Setup
		alasql('CREATE TABLE [Target3] (id INT, name STRING)');
		alasql('CREATE TABLE [Source3] (id INT, name STRING, priority INT)');
		alasql('INSERT INTO [Target3] VALUES (1, "Alice")');
		alasql('INSERT INTO [Source3] VALUES (2, "Bob", 1), (3, "Charlie", 5), (4, "David", 10)');

		// Only insert if priority >= 5
		var res = alasql(`
            MERGE INTO [Target3] AS t
            USING [Source3] AS s
            ON t.id = s.id
            WHEN NOT MATCHED AND s.priority >= 5 THEN 
                INSERT (id, name) VALUES (s.id, s.name)
        `);

		// Only 2 inserts (Charlie and David have priority >= 5)
		assert.equal(res, 2);

		var result = alasql('SELECT * FROM [Target3] ORDER BY id');
		assert.deepEqual(result, [
			{id: 1, name: 'Alice'},
			{id: 3, name: 'Charlie'},
			{id: 4, name: 'David'},
		]);
	});

	it('4. MERGE with DELETE BY SOURCE', function () {
		// Setup
		alasql('CREATE TABLE [Target4] (id INT, name STRING)');
		alasql('CREATE TABLE [Source4] (id INT, name STRING)');
		alasql('INSERT INTO [Target4] VALUES (1, "Alice"), (2, "Bob"), (3, "Charlie")');
		alasql('INSERT INTO [Source4] VALUES (2, "Bob")');

		// Delete from target if not in source
		// Note: BY SOURCE with DELETE requires an AND condition in the grammar
		var res = alasql(`
            MERGE INTO [Target4] AS t
            USING [Source4] AS s
            ON t.id = s.id
            WHEN NOT MATCHED BY SOURCE AND t.id > 0 THEN DELETE
        `);

		// 2 deletes (Alice and Charlie not in source)
		assert.equal(res, 2);

		var result = alasql('SELECT * FROM [Target4] ORDER BY id');
		assert.deepEqual(result, [{id: 2, name: 'Bob'}]);
	});

	it('5. MERGE with multiple WHEN clauses', function () {
		// Setup
		alasql('CREATE TABLE [Inventory] (product_id INT, stock INT)');
		alasql('CREATE TABLE [Shipment] (product_id INT, quantity INT)');
		alasql('INSERT INTO [Inventory] VALUES (1, 100), (2, 50)');
		alasql('INSERT INTO [Shipment] VALUES (2, 25), (3, 75), (4, 0)');

		// Complex merge with multiple conditions
		var res = alasql(`
            MERGE INTO [Inventory] AS inv
            USING [Shipment] AS ship
            ON inv.product_id = ship.product_id
            WHEN MATCHED AND ship.quantity > 0 THEN
                UPDATE SET inv.stock = inv.stock + ship.quantity
            WHEN NOT MATCHED AND ship.quantity > 0 THEN
                INSERT (product_id, stock) VALUES (ship.product_id, ship.quantity)
        `);

		// 1 update (product 2) + 1 insert (product 3) = 2
		// Product 4 not affected (quantity = 0)
		assert.equal(res, 2);

		var result = alasql('SELECT * FROM [Inventory] ORDER BY product_id');
		assert.deepEqual(result, [
			{product_id: 1, stock: 100}, // Unchanged
			{product_id: 2, stock: 75}, // Updated (50 + 25)
			{product_id: 3, stock: 75}, // Inserted
		]);
	});

	it('6. MERGE with no matches', function () {
		// Setup - no overlapping IDs
		alasql('CREATE TABLE [Target6] (id INT, val INT)');
		alasql('CREATE TABLE [Source6] (id INT, val INT)');
		alasql('INSERT INTO [Target6] VALUES (1, 100), (2, 200)');
		alasql('INSERT INTO [Source6] VALUES (3, 300), (4, 400)');

		var res = alasql(`
            MERGE INTO [Target6] AS t
            USING [Source6] AS s
            ON t.id = s.id
            WHEN MATCHED THEN UPDATE SET t.val = s.val
            WHEN NOT MATCHED THEN INSERT (id, val) VALUES (s.id, s.val)
        `);

		// 2 inserts, no updates
		assert.equal(res, 2);

		var result = alasql('SELECT * FROM [Target6] ORDER BY id');
		assert.deepEqual(result, [
			{id: 1, val: 100},
			{id: 2, val: 200},
			{id: 3, val: 300},
			{id: 4, val: 400},
		]);
	});

	it('7. MERGE with all matches', function () {
		// Setup - all IDs match
		alasql('CREATE TABLE [Target7] (id INT, val INT)');
		alasql('CREATE TABLE [Source7] (id INT, val INT)');
		alasql('INSERT INTO [Target7] VALUES (1, 100), (2, 200), (3, 300)');
		alasql('INSERT INTO [Source7] VALUES (1, 111), (2, 222), (3, 333)');

		var res = alasql(`
            MERGE INTO [Target7] AS t
            USING [Source7] AS s
            ON t.id = s.id
            WHEN MATCHED THEN UPDATE SET t.val = s.val
            WHEN NOT MATCHED THEN INSERT (id, val) VALUES (s.id, s.val)
        `);

		// 3 updates, no inserts
		assert.equal(res, 3);

		var result = alasql('SELECT * FROM [Target7] ORDER BY id');
		assert.deepEqual(result, [
			{id: 1, val: 111},
			{id: 2, val: 222},
			{id: 3, val: 333},
		]);
	});

	it('8. MERGE with complex ON condition', function () {
		// Setup
		alasql('CREATE TABLE [Target8] (id INT, category STRING, val INT)');
		alasql('CREATE TABLE [Source8] (id INT, category STRING, val INT)');
		alasql('INSERT INTO [Target8] VALUES (1, "A", 100), (2, "B", 200)');
		alasql('INSERT INTO [Source8] VALUES (1, "A", 150), (1, "B", 175), (3, "C", 300)');

		// Match on both id AND category
		var res = alasql(`
            MERGE INTO [Target8] AS t
            USING [Source8] AS s
            ON t.id = s.id AND t.category = s.category
            WHEN MATCHED THEN UPDATE SET t.val = s.val
            WHEN NOT MATCHED THEN INSERT (id, category, val) VALUES (s.id, s.category, s.val)
        `);

		// 1 update (1, A) + 2 inserts (1, B) and (3, C) = 3
		assert.equal(res, 3);

		var result = alasql('SELECT * FROM [Target8] ORDER BY id, category');
		assert.deepEqual(result, [
			{id: 1, category: 'A', val: 150}, // Updated
			{id: 1, category: 'B', val: 175}, // Inserted
			{id: 2, category: 'B', val: 200}, // Unchanged
			{id: 3, category: 'C', val: 300}, // Inserted
		]);
	});
});
