if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

// NOTE: This test suite verifies that the parser correctly handles ON DELETE and ON UPDATE
// referential actions in FOREIGN KEY constraints. AlaSQL currently parses but does not
// enforce CASCADE behavior (i.e., deleting parent rows will not automatically delete
// child rows). These tests ensure syntax compatibility with SQL-99 standard.

describe('Test 897 - CASCADE not supported (sqlite)', function () {
	const test = '897';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('1: Should parse REFERENCES with ON DELETE CASCADE', function () {
		alasql('DROP TABLE IF EXISTS COMMODITY');
		alasql('DROP TABLE IF EXISTS TEMP_COMMODITY_UUIDS');

		// Create parent table
		alasql('CREATE TABLE COMMODITY (ID INTEGER PRIMARY KEY)');

		// Create table with ON DELETE CASCADE - this is the syntax from the issue
		alasql(
			'CREATE TABLE TEMP_COMMODITY_UUIDS (' +
				'  ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT ' +
				'    REFERENCES COMMODITY (ID) ON DELETE CASCADE,' +
				'  UUID TEXT NOT NULL,' +
				'  BACKEND_UUID TEXT' +
				')'
		);

		// Verify table was created successfully
		var tables = alasql('SHOW TABLES');
		assert(
			tables.some(function (t) {
				return t.tableid === 'TEMP_COMMODITY_UUIDS';
			})
		);

		// Verify we can insert data
		alasql('INSERT INTO COMMODITY VALUES (1)');
		alasql("INSERT INTO TEMP_COMMODITY_UUIDS VALUES (1, 'uuid-1', 'backend-1')");
		var result = alasql('SELECT * FROM TEMP_COMMODITY_UUIDS');
		assert.equal(result.length, 1);
		assert.equal(result[0].ID, 1);
	});

	it('2: Should parse REFERENCES with ON UPDATE CASCADE', function () {
		alasql('DROP TABLE IF EXISTS test_parent');
		alasql('DROP TABLE IF EXISTS test_child');

		alasql('CREATE TABLE test_parent (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent(id) ON UPDATE CASCADE' +
				')'
		);

		// Verify tables were created and can hold data
		alasql('INSERT INTO test_parent VALUES (1)');
		alasql('INSERT INTO test_child VALUES (10, 1)');
		var result = alasql('SELECT * FROM test_child');
		assert.equal(result.length, 1);
		assert.equal(result[0].parent_id, 1);
	});

	it('3: Should parse REFERENCES with both ON DELETE and ON UPDATE', function () {
		alasql('DROP TABLE IF EXISTS test_parent2');
		alasql('DROP TABLE IF EXISTS test_child2');

		alasql('CREATE TABLE test_parent2 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child2 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent2(id) ON DELETE CASCADE ON UPDATE CASCADE' +
				')'
		);

		assert(true);
	});

	it('4: Should parse REFERENCES with SET NULL', function () {
		alasql('DROP TABLE IF EXISTS test_parent3');
		alasql('DROP TABLE IF EXISTS test_child3');

		alasql('CREATE TABLE test_parent3 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child3 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent3(id) ON DELETE SET NULL' +
				')'
		);

		assert(true);
	});

	it('5: Should parse REFERENCES with SET DEFAULT', function () {
		alasql('DROP TABLE IF EXISTS test_parent4');
		alasql('DROP TABLE IF EXISTS test_child4');

		alasql('CREATE TABLE test_parent4 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child4 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent4(id) ON DELETE SET DEFAULT' +
				')'
		);

		assert(true);
	});

	it('6: Should parse REFERENCES with NO ACTION', function () {
		alasql('DROP TABLE IF EXISTS test_parent5');
		alasql('DROP TABLE IF EXISTS test_child5');

		alasql('CREATE TABLE test_parent5 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child5 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent5(id) ON DELETE NO ACTION' +
				')'
		);

		assert(true);
	});

	it('7: Should parse REFERENCES with RESTRICT', function () {
		alasql('DROP TABLE IF EXISTS test_parent6');
		alasql('DROP TABLE IF EXISTS test_child6');

		alasql('CREATE TABLE test_parent6 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child6 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent6(id) ON DELETE RESTRICT' +
				')'
		);

		assert(true);
	});

	it('8: Should parse FOREIGN KEY with ON DELETE CASCADE', function () {
		alasql('DROP TABLE IF EXISTS test_parent7');
		alasql('DROP TABLE IF EXISTS test_child7');

		alasql('CREATE TABLE test_parent7 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child7 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT,' +
				'  FOREIGN KEY (parent_id) REFERENCES test_parent7(id) ON DELETE CASCADE' +
				')'
		);

		// Verify table-level FOREIGN KEY syntax works with data
		alasql('INSERT INTO test_parent7 VALUES (1)');
		alasql('INSERT INTO test_child7 VALUES (10, 1)');
		var result = alasql('SELECT * FROM test_child7');
		assert.equal(result.length, 1);
		assert.equal(result[0].parent_id, 1);
	});

	it('9: Should parse REFERENCES with ON UPDATE NO ACTION', function () {
		alasql('DROP TABLE IF EXISTS test_parent8');
		alasql('DROP TABLE IF EXISTS test_child8');

		alasql('CREATE TABLE test_parent8 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child8 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent8(id) ON UPDATE NO ACTION' +
				')'
		);

		assert(true);
	});

	it('10: Should parse FOREIGN KEY with ON UPDATE CASCADE', function () {
		alasql('DROP TABLE IF EXISTS test_parent9');
		alasql('DROP TABLE IF EXISTS test_child9');

		alasql('CREATE TABLE test_parent9 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child9 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT,' +
				'  FOREIGN KEY (parent_id) REFERENCES test_parent9(id) ON UPDATE CASCADE' +
				')'
		);

		assert(true);
	});

	it('11: Should parse FOREIGN KEY with both ON DELETE and ON UPDATE', function () {
		alasql('DROP TABLE IF EXISTS test_parent10');
		alasql('DROP TABLE IF EXISTS test_child10');

		alasql('CREATE TABLE test_parent10 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child10 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT,' +
				'  FOREIGN KEY (parent_id) REFERENCES test_parent10(id) ON DELETE SET NULL ON UPDATE CASCADE' +
				')'
		);

		assert(true);
	});

	it('12: Should parse FOREIGN KEY with ON UPDATE before ON DELETE', function () {
		alasql('DROP TABLE IF EXISTS test_parent11');
		alasql('DROP TABLE IF EXISTS test_child11');

		alasql('CREATE TABLE test_parent11 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child11 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT,' +
				'  FOREIGN KEY (parent_id) REFERENCES test_parent11(id) ON UPDATE CASCADE ON DELETE RESTRICT' +
				')'
		);

		assert(true);
	});

	it('13: Should parse REFERENCES with ON UPDATE before ON DELETE', function () {
		alasql('DROP TABLE IF EXISTS test_parent12');
		alasql('DROP TABLE IF EXISTS test_child12');

		alasql('CREATE TABLE test_parent12 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child12 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent12(id) ON UPDATE SET DEFAULT ON DELETE CASCADE' +
				')'
		);

		assert(true);
	});

	it('14: Should parse FOREIGN KEY with CONSTRAINT and ON DELETE CASCADE', function () {
		alasql('DROP TABLE IF EXISTS test_parent13');
		alasql('DROP TABLE IF EXISTS test_child13');

		alasql('CREATE TABLE test_parent13 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child13 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT,' +
				'  CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES test_parent13(id) ON DELETE CASCADE' +
				')'
		);

		assert(true);
	});

	it('15: Should parse multiple FOREIGN KEYs with different actions', function () {
		alasql('DROP TABLE IF EXISTS test_parent14a');
		alasql('DROP TABLE IF EXISTS test_parent14b');
		alasql('DROP TABLE IF EXISTS test_child14');

		alasql('CREATE TABLE test_parent14a (id INT PRIMARY KEY)');
		alasql('CREATE TABLE test_parent14b (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child14 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_a_id INT,' +
				'  parent_b_id INT,' +
				'  FOREIGN KEY (parent_a_id) REFERENCES test_parent14a(id) ON DELETE CASCADE,' +
				'  FOREIGN KEY (parent_b_id) REFERENCES test_parent14b(id) ON DELETE SET NULL' +
				')'
		);

		assert(true);
	});

	it('16: Should parse REFERENCES without ON DELETE/UPDATE (backward compatibility)', function () {
		alasql('DROP TABLE IF EXISTS test_parent15');
		alasql('DROP TABLE IF EXISTS test_child15');

		alasql('CREATE TABLE test_parent15 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child15 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT REFERENCES test_parent15(id)' +
				')'
		);

		assert(true);
	});

	it('17: Should parse FOREIGN KEY without ON DELETE/UPDATE (backward compatibility)', function () {
		alasql('DROP TABLE IF EXISTS test_parent16');
		alasql('DROP TABLE IF EXISTS test_child16');

		alasql('CREATE TABLE test_parent16 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child16 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT,' +
				'  FOREIGN KEY (parent_id) REFERENCES test_parent16(id)' +
				')'
		);

		assert(true);
	});

	it('18: Should parse FOREIGN KEY with NO ACTION for both DELETE and UPDATE', function () {
		alasql('DROP TABLE IF EXISTS test_parent17');
		alasql('DROP TABLE IF EXISTS test_child17');

		alasql('CREATE TABLE test_parent17 (id INT PRIMARY KEY)');
		alasql(
			'CREATE TABLE test_child17 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id INT,' +
				'  FOREIGN KEY (parent_id) REFERENCES test_parent17(id) ON DELETE NO ACTION ON UPDATE NO ACTION' +
				')'
		);

		assert(true);
	});

	it('19: Should parse REFERENCES with all referential actions', function () {
		alasql('DROP TABLE IF EXISTS test_parent18');
		alasql('DROP TABLE IF EXISTS test_child18a');
		alasql('DROP TABLE IF EXISTS test_child18b');
		alasql('DROP TABLE IF EXISTS test_child18c');
		alasql('DROP TABLE IF EXISTS test_child18d');
		alasql('DROP TABLE IF EXISTS test_child18e');

		alasql('CREATE TABLE test_parent18 (id INT PRIMARY KEY)');

		// Test all five referential actions work
		alasql(
			'CREATE TABLE test_child18a (id INT PRIMARY KEY, parent_id INT REFERENCES test_parent18(id) ON DELETE CASCADE)'
		);
		alasql(
			'CREATE TABLE test_child18b (id INT PRIMARY KEY, parent_id INT REFERENCES test_parent18(id) ON DELETE SET NULL)'
		);
		alasql(
			'CREATE TABLE test_child18c (id INT PRIMARY KEY, parent_id INT REFERENCES test_parent18(id) ON DELETE SET DEFAULT)'
		);
		alasql(
			'CREATE TABLE test_child18d (id INT PRIMARY KEY, parent_id INT REFERENCES test_parent18(id) ON DELETE RESTRICT)'
		);
		alasql(
			'CREATE TABLE test_child18e (id INT PRIMARY KEY, parent_id INT REFERENCES test_parent18(id) ON DELETE NO ACTION)'
		);

		assert(true);
	});

	it('20: Should parse FOREIGN KEY with composite key and ON DELETE CASCADE', function () {
		alasql('DROP TABLE IF EXISTS test_parent19');
		alasql('DROP TABLE IF EXISTS test_child19');

		alasql('CREATE TABLE test_parent19 (id1 INT, id2 INT, PRIMARY KEY (id1, id2))');
		alasql(
			'CREATE TABLE test_child19 (' +
				'  id INT PRIMARY KEY,' +
				'  parent_id1 INT,' +
				'  parent_id2 INT,' +
				'  FOREIGN KEY (parent_id1, parent_id2) REFERENCES test_parent19(id1, id2) ON DELETE CASCADE' +
				')'
		);

		assert(true);
	});
});
