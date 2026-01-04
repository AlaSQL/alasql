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
		var csvData = '"117.20";"500"\n"88.33";"600"';
		var res = alasql('SELECT * FROM CSV(?, {separator:";", headers:false})', [csvData]);
		assert.deepEqual(res, [
			{0: '117.20', 1: '500'},
			{0: '88.33', 1: '600'},
		]);
	});

	it('B) STRING type - preserves string values', function () {
		alasql('CREATE TABLE test_string (id STRING, name STRING)');
		var csvData = '"id";"name"\n"117.20";"test"\n"88.33";"item"';
		alasql('SELECT * INTO test_string FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_string');
		assert.deepEqual(res, [
			{id: '117.20', name: 'test'},
			{id: '88.33', name: 'item'},
		]);
		alasql('DROP TABLE test_string');
	});

	it('C) STRING type - converts numbers to strings', function () {
		alasql('CREATE TABLE test_str_num (code STRING, qty STRING)');
		var csvData = '"code";"qty"\n"123";"456"';
		alasql('SELECT * INTO test_str_num FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_str_num');
		assert.deepEqual(res, [{code: '123', qty: '456'}]);
		alasql('DROP TABLE test_str_num');
	});

	it('D) INT type - converts strings to integers', function () {
		alasql('CREATE TABLE test_int (id INT, qty INT)');
		var csvData = '"id";"qty"\n"123";"456"';
		alasql('SELECT * INTO test_int FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_int');
		assert.deepEqual(res, [{id: 123, qty: 456}]);
		alasql('DROP TABLE test_int');
	});

	it('E) INT type - truncates decimal values', function () {
		alasql('CREATE TABLE test_int_dec (amount INT)');
		var csvData = '"amount"\n"99.99"\n"123.45"';
		alasql('SELECT * INTO test_int_dec FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_int_dec');
		assert.deepEqual(res, [{amount: 99}, {amount: 123}]);
		alasql('DROP TABLE test_int_dec');
	});

	it('F) FLOAT type - preserves decimal precision', function () {
		alasql('CREATE TABLE test_float (price FLOAT, cost FLOAT)');
		var csvData = '"price";"cost"\n"99.99";"123.45"';
		alasql('SELECT * INTO test_float FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_float');
		assert.deepEqual(res, [{price: 99.99, cost: 123.45}]);
		alasql('DROP TABLE test_float');
	});

	it('G) FLOAT type - converts string decimals to numbers', function () {
		alasql('CREATE TABLE test_float_str (amount FLOAT)');
		var csvData = '"amount"\n"117.20"\n"88.33"';
		alasql('SELECT * INTO test_float_str FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_float_str');
		assert.deepEqual(res, [{amount: 117.2}, {amount: 88.33}]);
		alasql('DROP TABLE test_float_str');
	});

	it('H) BOOLEAN type - converts string true/false', function () {
		alasql('CREATE TABLE test_bool (active BOOLEAN, enabled BOOLEAN)');
		var csvData = '"active";"enabled"\n"true";"false"\n"1";"0"';
		alasql('SELECT * INTO test_bool FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_bool');
		assert.deepEqual(res, [
			{active: true, enabled: false},
			{active: true, enabled: false},
		]);
		alasql('DROP TABLE test_bool');
	});

	it('I) BOOLEAN type - handles yes/no strings', function () {
		alasql('CREATE TABLE test_bool_yn (flag BOOLEAN)');
		var csvData = '"flag"\n"yes"\n"no"';
		alasql('SELECT * INTO test_bool_yn FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_bool_yn');
		assert.deepEqual(res, [{flag: true}, {flag: false}]);
		alasql('DROP TABLE test_bool_yn');
	});

	it('J) DATE type - converts string dates', function () {
		alasql('CREATE TABLE test_date (created DATE)');
		var csvData = '"created"\n"2023-01-15"';
		alasql('SELECT * INTO test_date FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_date');
		assert.deepEqual(res, [{created: new Date('2023-01-15')}]);
		alasql('DROP TABLE test_date');
	});

	it('K) Mixed types - all conversions work together', function () {
		alasql('CREATE TABLE test_mixed (id STRING, qty INT, price FLOAT, active BOOLEAN)');
		var csvData = '"id";"qty";"price";"active"\n"117.20";"10";"99.99";"true"';
		alasql('SELECT * INTO test_mixed FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_mixed');
		assert.deepEqual(res, [{id: '117.20', qty: 10, price: 99.99, active: true}]);
		alasql('DROP TABLE test_mixed');
	});

	it('L) No column definitions with csvStringToNumber=true - auto-converts', function () {
		alasql.options.csvStringToNumber = true;
		alasql('CREATE TABLE test_nodef');
		var csvData = '"id";"amount"\n"117.20";"500"';
		alasql('SELECT * INTO test_nodef FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_nodef');
		assert.deepEqual(res, [{id: 117.2, amount: 500}]);
		alasql('DROP TABLE test_nodef');
	});

	it('M) No column definitions with csvStringToNumber=false - preserves strings', function () {
		alasql.options.csvStringToNumber = false;
		alasql('CREATE TABLE test_nodef2');
		var csvData = '"id";"amount"\n"117.20";"500"';
		alasql('SELECT * INTO test_nodef2 FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_nodef2');
		assert.deepEqual(res, [{id: '117.20', amount: '500'}]);
		alasql('DROP TABLE test_nodef2');
		alasql.options.csvStringToNumber = true; // Restore default
	});

	it('N) VARCHAR and CHAR types work like STRING', function () {
		alasql('CREATE TABLE test_varchar (name VARCHAR, code CHAR)');
		var csvData = '"name";"code"\n"123.45";"ABC"';
		alasql('SELECT * INTO test_varchar FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_varchar');
		assert.deepEqual(res, [{name: '123.45', code: 'ABC'}]);
		alasql('DROP TABLE test_varchar');
	});

	it('O) NULL and undefined values are preserved', function () {
		alasql('CREATE TABLE test_nulls (id STRING, qty INT)');
		var csvData = '"id";"qty"\n"A001";""';
		alasql('SELECT * INTO test_nulls FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_nulls');
		// Empty string in CSV becomes empty string, parseInt returns NaN so original value is returned
		assert.deepEqual(res, [{id: 'A001', qty: ''}]);
		alasql('DROP TABLE test_nulls');
	});

	it('P) TSV also respects column types', function () {
		alasql('CREATE TABLE test_tsv (id STRING, amount INT)');
		var tsvData = 'id\tamount\n117.20\t500';
		alasql('SELECT * INTO test_tsv FROM TSV(?)', [tsvData]);
		var res = alasql('SELECT * FROM test_tsv');
		assert.deepEqual(res, [{id: '117.20', amount: 500}]);
		alasql('DROP TABLE test_tsv');
	});

	it('Q) Direct SELECT from CSV without INSERT returns strings', function () {
		var csvData = '"id";"name"\n"117.20";"test"';
		var res = alasql('SELECT * FROM CSV(?, {separator:";"})', [csvData]);
		assert.deepEqual(res, [{id: '117.20', name: 'test'}]);
	});

	it('R) Unquoted CSV data - preserves strings when column is STRING', function () {
		alasql('CREATE TABLE test_unquoted (id STRING, amount INT)');
		var csvData = 'id;amount\n117.20;500\n88.33;600';
		alasql('SELECT * INTO test_unquoted FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_unquoted');
		assert.deepEqual(res, [
			{id: '117.20', amount: 500},
			{id: '88.33', amount: 600},
		]);
		alasql('DROP TABLE test_unquoted');
	});

	it('S) Unquoted CSV data - converts to numbers when column is INT', function () {
		alasql('CREATE TABLE test_unquoted_int (qty INT, price INT)');
		var csvData = 'qty;price\n123;456\n789;012';
		alasql('SELECT * INTO test_unquoted_int FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_unquoted_int');
		assert.deepEqual(res, [
			{qty: 123, price: 456},
			{qty: 789, price: 12},
		]);
		alasql('DROP TABLE test_unquoted_int');
	});

	it('T) Unquoted CSV data without column definitions - auto-converts with csvStringToNumber=true', function () {
		alasql.options.csvStringToNumber = true;
		alasql('CREATE TABLE test_unquoted_nodef');
		var csvData = 'id;amount\n117.20;500';
		alasql('SELECT * INTO test_unquoted_nodef FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_unquoted_nodef');
		assert.deepEqual(res, [{id: 117.2, amount: 500}]);
		alasql('DROP TABLE test_unquoted_nodef');
	});

	it('U) Unquoted CSV data with invalid numbers returns original value', function () {
		alasql('CREATE TABLE test_invalid (id STRING, code INT, amount FLOAT)');
		var csvData = 'id;code;amount\nABC;xyz;notanumber';
		alasql('SELECT * INTO test_invalid FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_invalid');
		// Invalid conversions return original string value
		assert.deepEqual(res, [{id: 'ABC', code: 'xyz', amount: 'notanumber'}]);
		alasql('DROP TABLE test_invalid');
	});
});
