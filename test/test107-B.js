if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var fs = require('fs');
} else {
	__dirname = '.';
}

describe('Test 107-B - Update existing Excel spreadsheet with sourcefilename and range', function () {
	if (typeof exports === 'object') {
		it('1. Create initial XLSX file with data', function (done) {
			var data = [
				{a: 1, b: 2, c: 3},
				{a: 4, b: 5, c: 6},
				{a: 7, b: 8, c: 9},
			];
			alasql('SELECT * INTO XLSX("' + __dirname + '/test107-B-base.xlsx", {headers:true}) FROM ?', [
				data,
			]);
			// Verify file was created
			assert(fs.existsSync(__dirname + '/test107-B-base.xlsx'));
			done();
		});

		it('2. Update existing file at specific range with sourcefilename', function (done) {
			var updateData = [
				{x: 100, y: 200, z: 300},
				{x: 400, y: 500, z: 600},
			];

			alasql(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-updated.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-base.xlsx", sheetid:"Sheet 1", range:"E5", headers:true}) FROM ?',
				[updateData],
				function (res) {
					assert(res == 1);
					// Verify updated file was created
					assert(fs.existsSync(__dirname + '/test107-B-updated.xlsx'));
					done();
				}
			);
		});

		it('3. Update existing file without headers at range B3', function (done) {
			var updateData = [
				{hour: 10, minute: 30, second: 45},
				{hour: 11, minute: 45, second: 20},
			];

			alasql(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-no-headers.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-base.xlsx", sheetid:"Sheet 1", range:"B3", headers:false}) FROM ?',
				[updateData],
				function (res) {
					assert(res == 1);
					assert(fs.existsSync(__dirname + '/test107-B-no-headers.xlsx'));
					done();
				}
			);
		});

		it('4. Overwrite same file with sourcefilename pointing to itself', function (done) {
			// First create a file
			var initialData = [{name: 'John', age: 25}];
			alasql('SELECT * INTO XLSX("' + __dirname + '/test107-B-self.xlsx", {headers:true}) FROM ?', [
				initialData,
			]);

			// Then update it in place
			var newData = [{value: 999, status: 'updated'}];
			alasql(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-self.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-self.xlsx", sheetid:"Sheet 1", range:"D10", headers:true}) FROM ?',
				[newData],
				function (res) {
					assert(res == 1);
					assert(fs.existsSync(__dirname + '/test107-B-self.xlsx'));
					done();
				}
			);
		});

		it('5. Add data to new sheet in existing file', function (done) {
			var newSheetData = [
				{col1: 'A', col2: 'B'},
				{col1: 'C', col2: 'D'},
			];

			alasql(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-newsheet.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-base.xlsx", sheetid:"NewSheet", range:"A1", headers:true}) FROM ?',
				[newSheetData],
				function (res) {
					assert(res == 1);
					assert(fs.existsSync(__dirname + '/test107-B-newsheet.xlsx'));
					done();
				}
			);
		});

		it('6. Test with various range positions (A1, Z10, AA5)', function (done) {
			var testData = [{test: 'value'}];

			// Test range A1
			alasql(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-range-A1.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-base.xlsx", sheetid:"Sheet 1", range:"A1", headers:false}) FROM ?',
				[testData]
			);

			// Test range Z10
			alasql(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-range-Z10.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-base.xlsx", sheetid:"Sheet 1", range:"Z10", headers:false}) FROM ?',
				[testData]
			);

			// Test range AA5
			alasql(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-range-AA5.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-base.xlsx", sheetid:"Sheet 1", range:"AA5", headers:false}) FROM ?',
				[testData],
				function (res) {
					assert(res == 1);
					assert(fs.existsSync(__dirname + '/test107-B-range-A1.xlsx'));
					assert(fs.existsSync(__dirname + '/test107-B-range-Z10.xlsx'));
					assert(fs.existsSync(__dirname + '/test107-B-range-AA5.xlsx'));
					done();
				}
			);
		});

		// Cleanup test files after all tests
		after(function () {
			var testFiles = [
				'test107-B-base.xlsx',
				'test107-B-updated.xlsx',
				'test107-B-no-headers.xlsx',
				'test107-B-self.xlsx',
				'test107-B-newsheet.xlsx',
				'test107-B-range-A1.xlsx',
				'test107-B-range-Z10.xlsx',
				'test107-B-range-AA5.xlsx',
			];

			testFiles.forEach(function (file) {
				var filePath = __dirname + '/' + file;
				if (fs.existsSync(filePath)) {
					fs.unlinkSync(filePath);
				}
			});
		});
	}
});
