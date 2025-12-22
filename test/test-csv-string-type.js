if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
}

describe('Test CSV string type preservation', function () {
	const test = 'csvstringtype';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Default behavior - converts strings to numbers', function () {
		// Ensure default option is true (backward compatibility)
		assert.strictEqual(alasql.options.csvStringToNumber, true);

		// Create CSV content with numeric strings
		var csvData = '"117.20";"some name"\n"88.33";"other name"';

		var res = alasql('SELECT * FROM CSV(?, {separator:";", headers:false})', [csvData]);

		// With csvStringToNumber = true, values should be converted to numbers
		assert.deepEqual(res, [
			{0: 117.2, 1: 'some name'},
			{0: 88.33, 1: 'other name'},
		]);
	});

	it('B) Disable conversion - preserves string types', function () {
		// Disable automatic conversion
		alasql.options.csvStringToNumber = false;

		// Create CSV content with numeric strings
		var csvData = '"117.20";"some name"\n"88.33";"other name"';

		var res = alasql('SELECT * FROM CSV(?, {separator:";", headers:false})', [csvData]);

		// With csvStringToNumber = false, values should remain as strings
		assert.deepEqual(res, [
			{0: '117.20', 1: 'some name'},
			{0: '88.33', 1: 'other name'},
		]);

		// Restore default
		alasql.options.csvStringToNumber = true;
	});

	it('C) With headers - default behavior converts to numbers', function () {
		alasql.options.csvStringToNumber = true;

		var csvData = '"id";"name"\n"117.20";"some name"\n"88.33";"other name"';

		var res = alasql('SELECT * FROM CSV(?, {separator:";"})', [csvData]);

		assert.deepEqual(res, [
			{id: 117.2, name: 'some name'},
			{id: 88.33, name: 'other name'},
		]);
	});

	it('D) With headers - disabled conversion preserves strings', function () {
		alasql.options.csvStringToNumber = false;

		var csvData = '"id";"name"\n"117.20";"some name"\n"88.33";"other name"';

		var res = alasql('SELECT * FROM CSV(?, {separator:";"})', [csvData]);

		assert.deepEqual(res, [
			{id: '117.20', name: 'some name'},
			{id: '88.33', name: 'other name'},
		]);

		// Restore default
		alasql.options.csvStringToNumber = true;
	});

	it('E) CREATE TABLE with string column - disabled conversion', function () {
		alasql.options.csvStringToNumber = false;

		alasql('CREATE TABLE test_csv (id string, name string)');

		var csvData = '"id";"name"\n"117.20";"some name"\n"88.33";"other name"';

		alasql('SELECT * INTO test_csv FROM CSV(?, {separator:";"})', [csvData]);
		var res = alasql('SELECT * FROM test_csv');

		// Should preserve string types
		assert.deepEqual(res, [
			{id: '117.20', name: 'some name'},
			{id: '88.33', name: 'other name'},
		]);

		// Cleanup
		alasql('DROP TABLE test_csv');

		// Restore default
		alasql.options.csvStringToNumber = true;
	});

	it('F) raw option still works (backward compatibility)', function () {
		// Even with csvStringToNumber = true, raw option should override
		alasql.options.csvStringToNumber = true;

		var csvData = '"117.20";"some name"\n"88.33";"other name"';

		var res = alasql('SELECT * FROM CSV(?, {separator:";", headers:false, raw:true})', [
			csvData,
		]);

		// With raw = true, values should remain as strings regardless of csvStringToNumber
		assert.deepEqual(res, [
			{0: '117.20', 1: 'some name'},
			{0: '88.33', 1: 'other name'},
		]);
	});

	it('G) Tab-separated values (TSV) also respects the option', function () {
		alasql.options.csvStringToNumber = false;

		var tsvData = '117.20\tsome name\n88.33\tother name';

		var res = alasql('SELECT * FROM TSV(?, {headers:false})', [tsvData]);

		// Should preserve string types
		assert.deepEqual(res, [{0: '117.20', 1: 'some name'}, {0: '88.33', 1: 'other name'}]);

		// Restore default
		alasql.options.csvStringToNumber = true;
	});
});
