if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1009 - Foreign key error message with table name', function () {
	const test = '1009';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Single column foreign key - error message should include table and key', function () {
		alasql(
			'CREATE TABLE tableA (id INT PRIMARY KEY);' +
				'CREATE TABLE tableB (id INT, a_id INT, FOREIGN KEY (a_id) REFERENCES tableA(id));' +
				'INSERT INTO tableA VALUES (1);' +
				'INSERT INTO tableA VALUES (2);' +
				'INSERT INTO tableB VALUES (1, 1);'
		);

		// This should fail with a proper error message showing the table name and key
		try {
			alasql('INSERT INTO tableB VALUES (2, 20)');
			assert.fail('Should have thrown an error for foreign key violation');
		} catch (err) {
			// The error message should include information about what key and table failed
			assert(err.message.includes('Foreign key'), 'Error should mention foreign key');
			assert(err.message.includes('20'), 'Error should include the key value');
			assert(err.message.includes('tableA'), 'Error should include the table name');
			// Check that it's not showing 'undefined' as the table name
			assert(!err.message.includes('undefined'), 'Error should not contain undefined');
		}
	});

	it('B) Inline foreign key - error message should include table and key', function () {
		alasql(
			'DROP TABLE IF EXISTS tableC;' +
				'DROP TABLE IF EXISTS tableD;' +
				'CREATE TABLE tableC (id INT PRIMARY KEY);' +
				'CREATE TABLE tableD (id INT, c_id INT FOREIGN KEY REFERENCES tableC(id));' +
				'INSERT INTO tableC VALUES (10);' +
				'INSERT INTO tableC VALUES (20);' +
				'INSERT INTO tableD VALUES (1, 10);'
		);

		// This should fail with a proper error message
		try {
			alasql('INSERT INTO tableD VALUES (2, 99)');
			assert.fail('Should have thrown an error for foreign key violation');
		} catch (err) {
			assert(err.message.includes('Foreign key'), 'Error should mention foreign key');
			assert(err.message.includes('99'), 'Error should include the key value');
			assert(err.message.includes('tableC'), 'Error should include the table name');
			assert(!err.message.includes('undefined'), 'Error should not contain undefined');
		}
	});

	it('C) Composite foreign key - error message should include table and keys', function () {
		alasql(
			'DROP TABLE IF EXISTS tableE;' +
				'DROP TABLE IF EXISTS tableF;' +
				'CREATE TABLE tableE (id1 INT, id2 INT, PRIMARY KEY (id1, id2));' +
				'CREATE TABLE tableF (id INT, e_id1 INT, e_id2 INT, FOREIGN KEY (e_id1, e_id2) REFERENCES tableE(id1, id2));' +
				'INSERT INTO tableE VALUES (1, 1);' +
				'INSERT INTO tableE VALUES (2, 2);' +
				'INSERT INTO tableF VALUES (1, 1, 1);'
		);

		// This should fail with a proper error message
		try {
			alasql('INSERT INTO tableF VALUES (2, 99, 99)');
			assert.fail('Should have thrown an error for foreign key violation');
		} catch (err) {
			assert(err.message.includes('Foreign key'), 'Error should mention foreign key');
			assert(err.message.includes('99'), 'Error should include the key value');
			assert(err.message.includes('tableE'), 'Error should include the table name');
			assert(!err.message.includes('undefined'), 'Error should not contain undefined');
		}
	});
});
