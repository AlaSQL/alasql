if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '897'; // Foreign key CASCADE implementation

describe('Test ' + test + ' - Foreign Key CASCADE behavior', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test);
		alasql('USE test' + test);
	});

	afterEach(function () {
		// Clean up all tables after each test
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		alasql('DROP TABLE IF EXISTS parent1');
		alasql('DROP TABLE IF EXISTS parent2');
		alasql('DROP TABLE IF EXISTS grandparent');
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('A) ON DELETE CASCADE - should delete child rows when parent is deleted', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE CASCADE)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Verify initial state
		var parentRows = alasql('SELECT * FROM parent ORDER BY id');
		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.deepEqual(parentRows, [
			{id: 1, name: 'Parent1'},
			{id: 2, name: 'Parent2'}
		]);
		assert.deepEqual(childRows, [
			{id: 10, parent_id: 1},
			{id: 11, parent_id: 1},
			{id: 20, parent_id: 2}
		]);

		// Delete parent row
		alasql('DELETE FROM parent WHERE id = 1');

		// Verify parent row is deleted
		parentRows = alasql('SELECT * FROM parent ORDER BY id');
		assert.deepEqual(parentRows, [{id: 2, name: 'Parent2'}]);

		// Verify child rows are also deleted (CASCADE)
		childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.deepEqual(childRows, [{id: 20, parent_id: 2}]);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('B) ON DELETE SET NULL - should set foreign key to NULL when parent is deleted', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE SET NULL)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Delete parent row
		alasql('DELETE FROM parent WHERE id = 1');

		// Verify child rows still exist but parent_id is NULL
		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.deepEqual(childRows, [
			{id: 10, parent_id: null},
			{id: 11, parent_id: null},
			{id: 20, parent_id: 2}
		]);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('C) ON DELETE RESTRICT - should prevent deletion when child rows exist', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE RESTRICT)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Try to delete parent row - should throw error
		assert.throws(
			function () {
				alasql('DELETE FROM parent WHERE id = 1');
			},
			/dependent rows/,
			'Should throw error when trying to delete parent with child rows'
		);

		// Verify nothing was deleted
		var parentRows = alasql('SELECT * FROM parent ORDER BY id');
		assert.equal(parentRows.length, 2);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('D) ON DELETE NO ACTION - should behave like RESTRICT', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE NO ACTION)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Try to delete parent row - should throw error
		assert.throws(
			function () {
				alasql('DELETE FROM parent WHERE id = 1');
			},
			/dependent rows/,
			'Should throw error when trying to delete parent with child rows'
		);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('E) ON UPDATE CASCADE - should update child foreign keys when parent key is updated', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON UPDATE CASCADE)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Update parent primary key
		alasql('UPDATE parent SET id = 100 WHERE id = 1');

		// Verify parent row is updated
		var parentRows = alasql('SELECT * FROM parent ORDER BY id');
		assert.deepEqual(parentRows, [
			{id: 2, name: 'Parent2'},
			{id: 100, name: 'Parent1'}
		]);

		// Verify child foreign keys are also updated (CASCADE)
		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.deepEqual(childRows, [
			{id: 10, parent_id: 100},
			{id: 11, parent_id: 100},
			{id: 20, parent_id: 2}
		]);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('F) ON UPDATE SET NULL - should set foreign key to NULL when parent key is updated', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON UPDATE SET NULL)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Update parent primary key
		alasql('UPDATE parent SET id = 100 WHERE id = 1');

		// Verify child foreign keys are set to NULL
		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.deepEqual(childRows, [
			{id: 10, parent_id: null},
			{id: 11, parent_id: null},
			{id: 20, parent_id: 2}
		]);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('G) ON UPDATE RESTRICT - should prevent update when child rows exist', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON UPDATE RESTRICT)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Try to update parent primary key - should throw error
		assert.throws(
			function () {
				alasql('UPDATE parent SET id = 100 WHERE id = 1');
			},
			/dependent rows/,
			'Should throw error when trying to update parent key with child rows'
		);

		// Verify nothing was updated
		var parentRows = alasql('SELECT * FROM parent ORDER BY id');
		assert.equal(parentRows[0].id, 1);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('H) Column-level foreign key with ON DELETE CASCADE', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT REFERENCES parent(id) ON DELETE CASCADE)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Delete parent row
		alasql('DELETE FROM parent WHERE id = 1');

		// Verify child rows are also deleted (CASCADE)
		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.deepEqual(childRows, [{id: 20, parent_id: 2}]);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('I) Multiple foreign keys with different CASCADE actions', function () {
		alasql('DROP TABLE IF EXISTS child_multi');
		alasql('DROP TABLE IF EXISTS parent_multi1');
		alasql('DROP TABLE IF EXISTS parent_multi2');
		
		alasql('CREATE TABLE parent_multi1 (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql('CREATE TABLE parent_multi2 (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child_multi (id INT PRIMARY KEY, parent1_id INT, parent2_id INT, ' +
				'FOREIGN KEY (parent1_id) REFERENCES parent_multi1(id) ON DELETE CASCADE, ' +
				'FOREIGN KEY (parent2_id) REFERENCES parent_multi2(id) ON DELETE SET NULL)'
		);

		alasql('INSERT INTO parent_multi1 VALUES (1, "P1"), (2, "P2")');
		alasql('INSERT INTO parent_multi2 VALUES (1, "P1"), (2, "P2")');
		alasql('INSERT INTO child_multi VALUES (10, 1, 1), (11, 1, 2), (20, 2, 1)');

		// Delete from parent1 - should CASCADE delete
		alasql('DELETE FROM parent_multi1 WHERE id = 1');

		var childRows = alasql('SELECT * FROM child_multi ORDER BY id');
		assert.deepEqual(childRows, [{id: 20, parent1_id: 2, parent2_id: 1}]);

		// Delete from parent2 - should SET NULL
		alasql('DELETE FROM parent_multi2 WHERE id = 1');

		childRows = alasql('SELECT * FROM child_multi ORDER BY id');
		assert.deepEqual(childRows, [{id: 20, parent1_id: 2, parent2_id: null}]);

		alasql('DROP TABLE IF EXISTS child_multi');
		alasql('DROP TABLE IF EXISTS parent_multi2');
		alasql('DROP TABLE IF EXISTS parent_multi1');
	});

	it('J) Update non-primary key columns should not trigger CASCADE', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON UPDATE CASCADE)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Update parent name (not primary key)
		alasql('UPDATE parent SET name = "Updated" WHERE id = 1');

		// Verify child foreign keys are NOT updated
		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.deepEqual(childRows, [
			{id: 10, parent_id: 1},
			{id: 11, parent_id: 1},
			{id: 20, parent_id: 2}
		]);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('K) DELETE without WHERE clause with CASCADE', function () {
		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
		
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE CASCADE)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Delete all parent rows
		alasql('DELETE FROM parent');

		// Verify all child rows are also deleted
		var childRows = alasql('SELECT * FROM child');
		assert.deepEqual(childRows, []);

		alasql('DROP TABLE IF EXISTS child');
		alasql('DROP TABLE IF EXISTS parent');
	});

	it('L) Recursive CASCADE - grandchild rows should be deleted', function () {
		alasql('DROP TABLE IF EXISTS child_recursive');
		alasql('DROP TABLE IF EXISTS parent_recursive');
		alasql('DROP TABLE IF EXISTS grandparent_recursive');
		
		alasql('CREATE TABLE grandparent_recursive (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE parent_recursive (id INT PRIMARY KEY, gp_id INT, FOREIGN KEY (gp_id) REFERENCES grandparent_recursive(id) ON DELETE CASCADE)'
		);
		alasql(
			'CREATE TABLE child_recursive (id INT PRIMARY KEY, p_id INT, FOREIGN KEY (p_id) REFERENCES parent_recursive(id) ON DELETE CASCADE)'
		);

		alasql('INSERT INTO grandparent_recursive VALUES (1), (2)');
		alasql('INSERT INTO parent_recursive VALUES (10, 1), (11, 1), (20, 2)');
		alasql('INSERT INTO child_recursive VALUES (100, 10), (101, 10), (110, 11), (200, 20)');

		// Delete grandparent - should cascade to parent and child
		alasql('DELETE FROM grandparent_recursive WHERE id = 1');

		// Verify parent rows are deleted
		var parentRows = alasql('SELECT * FROM parent_recursive ORDER BY id');
		assert.deepEqual(parentRows, [{id: 20, gp_id: 2}]);

		// Verify child rows are also deleted (recursive cascade)
		var childRows = alasql('SELECT * FROM child_recursive ORDER BY id');
		assert.deepEqual(childRows, [{id: 200, p_id: 20}]);

		alasql('DROP TABLE IF EXISTS child_recursive');
		alasql('DROP TABLE IF EXISTS parent_recursive');
		alasql('DROP TABLE IF EXISTS grandparent_recursive');
	});
});
