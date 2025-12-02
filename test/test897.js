if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

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
		
		assert(true);
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
		
		assert(true);
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
		
		assert(true);
	});
});
