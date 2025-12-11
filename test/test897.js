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

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('A) ON DELETE CASCADE - should delete child rows when parent is deleted', function () {
		alasql('CREATE TABLE parent (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent_id INT, FOREIGN KEY (parent_id) REFERENCES parent(id) ON DELETE CASCADE)'
		);

		alasql('INSERT INTO parent VALUES (1, "Parent1"), (2, "Parent2")');
		alasql('INSERT INTO child VALUES (10, 1), (11, 1), (20, 2)');

		// Verify initial state
		var parentRows = alasql('SELECT * FROM parent ORDER BY id');
		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.equal(parentRows.length, 2);
		assert.equal(childRows.length, 3);

		// Delete parent row
		alasql('DELETE FROM parent WHERE id = 1');

		// Verify parent row is deleted
		parentRows = alasql('SELECT * FROM parent ORDER BY id');
		assert.equal(parentRows.length, 1);
		assert.equal(parentRows[0].id, 2);

		// Verify child rows are also deleted (CASCADE)
		childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.equal(childRows.length, 1);
		assert.equal(childRows[0].id, 20);
		assert.equal(childRows[0].parent_id, 2);

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('B) ON DELETE SET NULL - should set foreign key to NULL when parent is deleted', function () {
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
		assert.equal(childRows.length, 3);
		assert.equal(childRows[0].id, 10);
		assert.equal(childRows[0].parent_id, null);
		assert.equal(childRows[1].id, 11);
		assert.equal(childRows[1].parent_id, null);
		assert.equal(childRows[2].id, 20);
		assert.equal(childRows[2].parent_id, 2);

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('C) ON DELETE RESTRICT - should prevent deletion when child rows exist', function () {
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

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('D) ON DELETE NO ACTION - should behave like RESTRICT', function () {
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

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('E) ON UPDATE CASCADE - should update child foreign keys when parent key is updated', function () {
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
		assert.equal(parentRows.length, 2);
		assert.equal(parentRows[0].id, 2);
		assert.equal(parentRows[1].id, 100);

		// Verify child foreign keys are also updated (CASCADE)
		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.equal(childRows.length, 3);
		assert.equal(childRows[0].id, 10);
		assert.equal(childRows[0].parent_id, 100);
		assert.equal(childRows[1].id, 11);
		assert.equal(childRows[1].parent_id, 100);
		assert.equal(childRows[2].id, 20);
		assert.equal(childRows[2].parent_id, 2);

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('F) ON UPDATE SET NULL - should set foreign key to NULL when parent key is updated', function () {
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
		assert.equal(childRows.length, 3);
		assert.equal(childRows[0].id, 10);
		assert.equal(childRows[0].parent_id, null);
		assert.equal(childRows[1].id, 11);
		assert.equal(childRows[1].parent_id, null);
		assert.equal(childRows[2].id, 20);
		assert.equal(childRows[2].parent_id, 2);

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('G) ON UPDATE RESTRICT - should prevent update when child rows exist', function () {
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

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('H) Column-level foreign key with ON DELETE CASCADE', function () {
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
		assert.equal(childRows.length, 1);
		assert.equal(childRows[0].id, 20);

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('I) Multiple foreign keys with different CASCADE actions', function () {
		alasql('CREATE TABLE parent1 (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql('CREATE TABLE parent2 (id INT PRIMARY KEY, name VARCHAR(50))');
		alasql(
			'CREATE TABLE child (id INT PRIMARY KEY, parent1_id INT, parent2_id INT, ' +
				'FOREIGN KEY (parent1_id) REFERENCES parent1(id) ON DELETE CASCADE, ' +
				'FOREIGN KEY (parent2_id) REFERENCES parent2(id) ON DELETE SET NULL)'
		);

		alasql('INSERT INTO parent1 VALUES (1, "P1"), (2, "P2")');
		alasql('INSERT INTO parent2 VALUES (1, "P1"), (2, "P2")');
		alasql('INSERT INTO child VALUES (10, 1, 1), (11, 1, 2), (20, 2, 1)');

		// Delete from parent1 - should CASCADE delete
		alasql('DELETE FROM parent1 WHERE id = 1');

		var childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.equal(childRows.length, 1);
		assert.equal(childRows[0].id, 20);

		// Delete from parent2 - should SET NULL
		alasql('DELETE FROM parent2 WHERE id = 1');

		childRows = alasql('SELECT * FROM child ORDER BY id');
		assert.equal(childRows.length, 1);
		assert.equal(childRows[0].id, 20);
		assert.equal(childRows[0].parent2_id, null);

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent2');
		alasql('DROP TABLE parent1');
	});

	it('J) Update non-primary key columns should not trigger CASCADE', function () {
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
		assert.equal(childRows[0].parent_id, 1);
		assert.equal(childRows[1].parent_id, 1);

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});

	it('K) DELETE without WHERE clause with CASCADE', function () {
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
		assert.equal(childRows.length, 0);

		alasql('DROP TABLE child');
		alasql('DROP TABLE parent');
	});
});
