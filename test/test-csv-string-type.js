if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
}

describe('Test CSV string type preservation and column type conversion', function () {
	const test = 'csvstringtype';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) CSV parser always keeps values as strings', function () {
		// CSV parser now always returns strings
		var csvData = '"117.20";"500"\n"88.33";"600"';

		var res = alasql('SELECT * FROM CSV(?, {separator:";", headers:false})', [csvData]);

		// CSV parser keeps everything as strings
		assert.deepEqual(res, [
			{0: '117.20', 1: '500'},
			{0: '88.33', 1: '600'},
		]);
	});

	it('B) INSERT into table with column types converts appropriately', function () {
		// Create table with specific column types
		alasql('CREATE TABLE test_types (id STRING, amount INT)');

		var csvData = '"id";"amount"\n"117.20";"500"\n"88.33";"600"';

		alasql('SELECT * INTO test_types FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_types');

		// STRING column preserves string, INT column converts to number
		assert.deepEqual(res, [
			{id: '117.20', amount: 500},
			{id: '88.33', amount: 600},
		]);

		alasql('DROP TABLE test_types');
	});

	it('C) INSERT into table without column definitions - auto-converts with csvStringToNumber=true', function () {
		alasql.options.csvStringToNumber = true;

		alasql('CREATE TABLE test_nodef');

		var csvData = '"id";"amount"\n"117.20";"500"';

		alasql('SELECT * INTO test_nodef FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_nodef');

		// Without column definitions, auto-convert numbers when csvStringToNumber=true
		assert.deepEqual(res, [{id: 117.2, amount: 500}]);

		alasql('DROP TABLE test_nodef');
	});

	it('D) INSERT into table without column definitions - preserves strings with csvStringToNumber=false', function () {
		alasql.options.csvStringToNumber = false;

		alasql('CREATE TABLE test_nodef2');

		var csvData = '"id";"amount"\n"117.20";"500"';

		alasql('SELECT * INTO test_nodef2 FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_nodef2');

		// Without column definitions and csvStringToNumber=false, keep as strings
		assert.deepEqual(res, [{id: '117.20', amount: '500'}]);

		alasql('DROP TABLE test_nodef2');

		// Restore default
		alasql.options.csvStringToNumber = true;
	});

	it('E) Different column types are converted correctly', function () {
		alasql('CREATE TABLE test_multi (id STRING, qty INT, price FLOAT, name STRING)');

		var csvData = '"id";"qty";"price";"name"\n"117.20";"10";"99.99";"item"';

		alasql('SELECT * INTO test_multi FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_multi');

		assert.deepEqual(res, [
			{id: '117.20', qty: 10, price: 99.99, name: 'item'},
		]);

		// Verify types
		assert.strictEqual(typeof res[0].id, 'string');
		assert.strictEqual(typeof res[0].qty, 'number');
		assert.strictEqual(typeof res[0].price, 'number');
		assert.strictEqual(typeof res[0].name, 'string');

		alasql('DROP TABLE test_multi');
	});

	it('F) TSV also respects the same rules', function () {
		alasql.options.csvStringToNumber = true;

		alasql('CREATE TABLE test_tsv (id STRING, amount INT)');

		var tsvData = 'id\tamount\n117.20\t500';

		alasql('SELECT * INTO test_tsv FROM TSV(?)', [tsvData]);
		var res = alasql('SELECT * FROM test_tsv');

		assert.deepEqual(res, [{id: '117.20', amount: 500}]);

		alasql('DROP TABLE test_tsv');
	});

	it('G) Direct SELECT from CSV without table (backward compatibility)', function () {
		alasql.options.csvStringToNumber = true;

		var csvData = '"id";"name"\n"117.20";"test"';

		// Direct SELECT from CSV without INSERT - no column definitions available
		// CSV returns strings, but since there's no table to convert them, they stay as strings
		var res = alasql('SELECT * FROM CSV(?, {separator:";"})', [csvData]);

		// CSV parser always returns strings now
		assert.deepEqual(res, [{id: '117.20', name: 'test'}]);
	});
});
