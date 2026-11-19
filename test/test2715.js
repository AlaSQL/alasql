if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2715'; // Use the ID of the issue being fixed by this PR

describe(`Test ${testId} - key indexes after assigning table.data directly`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	function createTable(name, key) {
		alasql(`CREATE TABLE ${name} (id INT ${key}, v INT)`);
		alasql.tables[name].data = [
			{id: 1, v: 1},
			{id: 2, v: 2},
		];
	}

	it('A) INSERT rejects a primary key that is already in the assigned data', function () {
		createTable('pk_insert', 'PRIMARY KEY');
		assert.throws(() => alasql('INSERT INTO pk_insert VALUES (1, 99)'), /primary key/);
		assert.deepStrictEqual(alasql('SELECT * FROM pk_insert ORDER BY id'), [
			{id: 1, v: 1},
			{id: 2, v: 2},
		]);
	});

	it('B) INSERT rejects a unique key that is already in the assigned data', function () {
		createTable('uk_insert', 'UNIQUE');
		assert.throws(() => alasql('INSERT INTO uk_insert VALUES (1, 99)'), /unique/i);
		assert.strictEqual(alasql('SELECT VALUE COUNT(*) FROM uk_insert'), 2);
	});

	it('C) DELETE works on rows in the assigned data', function () {
		createTable('pk_delete', 'PRIMARY KEY');
		createTable('uk_delete', 'UNIQUE');
		assert.strictEqual(alasql('DELETE FROM pk_delete WHERE id = 1'), 1);
		assert.strictEqual(alasql('DELETE FROM uk_delete WHERE id = 1'), 1);
		assert.deepStrictEqual(alasql('SELECT * FROM pk_delete'), [{id: 2, v: 2}]);
		assert.deepStrictEqual(alasql('SELECT * FROM uk_delete'), [{id: 2, v: 2}]);
	});

	it('D) a key freed by DELETE can be inserted again', function () {
		createTable('pk_reinsert', 'PRIMARY KEY');
		alasql('DELETE FROM pk_reinsert WHERE id = 1');
		assert.strictEqual(alasql('INSERT INTO pk_reinsert VALUES (1, 99)'), 1);
		assert.deepStrictEqual(alasql('SELECT * FROM pk_reinsert ORDER BY id'), [
			{id: 1, v: 99},
			{id: 2, v: 2},
		]);
	});

	it('E) assigning data over earlier inserts forgets the old keys', function () {
		alasql('CREATE TABLE pk_reassign (id INT PRIMARY KEY, v INT)');
		alasql('INSERT INTO pk_reassign VALUES (1, 1)');
		alasql.tables.pk_reassign.data = [{id: 2, v: 2}];
		assert.strictEqual(alasql('INSERT INTO pk_reassign VALUES (1, 99)'), 1);
		assert.throws(() => alasql('INSERT INTO pk_reassign VALUES (2, 99)'), /primary key/);
	});

	it('F) UPDATE still works after assigning data', function () {
		createTable('pk_update', 'PRIMARY KEY');
		assert.strictEqual(alasql('UPDATE pk_update SET v = 5 WHERE id = 1'), 1);
		assert.deepStrictEqual(alasql('SELECT * FROM pk_update ORDER BY id'), [
			{id: 1, v: 5},
			{id: 2, v: 2},
		]);
	});

	it('G) TRUNCATE frees the keys of the removed rows', function () {
		alasql('CREATE TABLE pk_truncate (id INT PRIMARY KEY)');
		alasql('INSERT INTO pk_truncate VALUES (1)');
		alasql('TRUNCATE TABLE pk_truncate');
		assert.strictEqual(alasql('INSERT INTO pk_truncate VALUES (1)'), 1);
	});
});
