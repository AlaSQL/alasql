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
			// Verify file was created and read back content
			assert(fs.existsSync(__dirname + '/test107-B-base.xlsx'));
			alasql(
				'SELECT * FROM XLSX("' + __dirname + '/test107-B-base.xlsx", {headers:true})',
				[],
				function (res) {
					assert.deepEqual(res, data);
					done();
				}
			);
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
					// Read back and verify content - check that original data is preserved at A1:C3
					alasql(
						'SELECT * FROM XLSX("' +
							__dirname +
							'/test107-B-updated.xlsx", {headers:true, sheetid:"Sheet 1", range:"A1:C4"})',
						[],
						function (original) {
							// Original data should still be there
							var expectedOriginal = [
								{a: 1, b: 2, c: 3},
								{a: 4, b: 5, c: 6},
								{a: 7, b: 8, c: 9},
							];
							assert.deepEqual(original, expectedOriginal);
							// Read the new data at E5:G6
							alasql(
								'SELECT * FROM XLSX("' +
									__dirname +
									'/test107-B-updated.xlsx", {headers:true, sheetid:"Sheet 1", range:"E5:G7"})',
								[],
								function (updated) {
									var expectedUpdated = [
										{x: 100, y: 200, z: 300},
										{x: 400, y: 500, z: 600},
									];
									assert.deepEqual(updated, expectedUpdated);
									done();
								}
							);
						}
					);
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
					// Read back the data at B3:D4 (no headers, so will be read as columns B, C, D)
					alasql(
						'SELECT * FROM XLSX("' +
							__dirname +
							'/test107-B-no-headers.xlsx", {headers:false, sheetid:"Sheet 1", range:"B3:D4"})',
						[],
						function (result) {
							var expectedResult = [
								{B: 10, C: 30, D: 45},
								{B: 11, C: 45, D: 20},
							];
							assert.deepEqual(result, expectedResult);
							done();
						}
					);
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
					// Read back and verify both original and new data exist
					alasql(
						'SELECT * FROM XLSX("' +
							__dirname +
							'/test107-B-self.xlsx", {headers:true, sheetid:"Sheet 1", range:"A1:B2"})',
						[],
						function (original) {
							// Original data should be at A1:B1
							var expectedOriginal = [{name: 'John', age: 25}];
							assert.deepEqual(original, expectedOriginal);
							// Read the new data at D10:E10
							alasql(
								'SELECT * FROM XLSX("' +
									__dirname +
									'/test107-B-self.xlsx", {headers:true, sheetid:"Sheet 1", range:"D10:E11"})',
								[],
								function (updated) {
									var expectedUpdated = [{value: 999, status: 'updated'}];
									assert.deepEqual(updated, expectedUpdated);
									done();
								}
							);
						}
					);
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
					// Verify the new sheet has the correct data
					alasql(
						'SELECT * FROM XLSX("' +
							__dirname +
							'/test107-B-newsheet.xlsx", {headers:true, sheetid:"NewSheet"})',
						[],
						function (result) {
							assert.deepEqual(result, newSheetData);
							// Also verify original sheet still exists
							alasql(
								'SELECT * FROM XLSX("' +
									__dirname +
									'/test107-B-newsheet.xlsx", {headers:true, sheetid:"Sheet 1"})',
								[],
								function (original) {
									assert.equal(original.length, 3);
									assert.equal(original[0].a, 1);
									done();
								}
							);
						}
					);
				}
			);
		});

		it('6. Test with various range positions (AA5)', function (done) {
			var testData = [{test: 'value'}];

			// Test range AA5 (multi-letter column)
			alasql(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-range-AA5.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-base.xlsx", sheetid:"Sheet 1", range:"AA5", headers:false}) FROM ?',
				[testData],
				function (res) {
					assert(res == 1);
					assert(fs.existsSync(__dirname + '/test107-B-range-AA5.xlsx'));
					// Read back the data at AA5 (column 27)
					alasql(
						'SELECT * FROM XLSX("' +
							__dirname +
							'/test107-B-range-AA5.xlsx", {headers:false, sheetid:"Sheet 1", range:"AA5:AA5"})',
						[],
						function (result) {
							var expectedResult = [{AA: 'value'}];
							assert.deepEqual(result, expectedResult);
							done();
						}
					);
				}
			);
		});

		it('7. Test async/promise flow for sourcefilename and range', async function () {
			// Create test data
			var testData = [
				{name: 'Alice', score: 95},
				{name: 'Bob', score: 87},
			];

			// Write initial file using promise
			await alasql.promise(
				'SELECT * INTO XLSX("' + __dirname + '/test107-B-async.xlsx", {headers:true}) FROM ?',
				[testData]
			);

			// Update file at specific range using promise
			var updateData = [{extra: 'data', value: 123}];
			await alasql.promise(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-async.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-async.xlsx", sheetid:"Sheet 1", range:"D5", headers:true}) FROM ?',
				[updateData]
			);

			// Read back and verify using promise
			var original = await alasql.promise(
				'SELECT * FROM XLSX("' +
					__dirname +
					'/test107-B-async.xlsx", {headers:true, sheetid:"Sheet 1", range:"A1:B3"})',
				[]
			);
			assert.deepEqual(original, testData);

			// Read the updated data
			var updated = await alasql.promise(
				'SELECT * FROM XLSX("' +
					__dirname +
					'/test107-B-async.xlsx", {headers:true, sheetid:"Sheet 1", range:"D5:E6"})',
				[]
			);
			assert.deepEqual(updated, updateData);
		});

		it('8. Test promise-based flow with new sheet creation', async function () {
			var sheet1Data = [{id: 1, value: 'first'}];
			var sheet2Data = [{id: 2, value: 'second'}];

			// Create initial file
			await alasql.promise(
				'SELECT * INTO XLSX("' + __dirname + '/test107-B-promise.xlsx", {headers:true}) FROM ?',
				[sheet1Data]
			);

			// Add new sheet using sourcefilename
			await alasql.promise(
				'SELECT * INTO XLSX("' +
					__dirname +
					'/test107-B-promise.xlsx", {sourcefilename:"' +
					__dirname +
					'/test107-B-promise.xlsx", sheetid:"Sheet2", range:"A1", headers:true}) FROM ?',
				[sheet2Data]
			);

			// Verify Sheet 1
			var result1 = await alasql.promise(
				'SELECT * FROM XLSX("' +
					__dirname +
					'/test107-B-promise.xlsx", {headers:true, sheetid:"Sheet 1"})',
				[]
			);
			assert.deepEqual(result1, sheet1Data);

			// Verify Sheet 2
			var result2 = await alasql.promise(
				'SELECT * FROM XLSX("' +
					__dirname +
					'/test107-B-promise.xlsx", {headers:true, sheetid:"Sheet2"})',
				[]
			);
			assert.deepEqual(result2, sheet2Data);
		});

		// Cleanup test files after all tests
		after(function () {
			var testFiles = [
				'test107-B-base.xlsx',
				'test107-B-updated.xlsx',
				'test107-B-no-headers.xlsx',
				'test107-B-self.xlsx',
				'test107-B-newsheet.xlsx',
				'test107-B-range-AA5.xlsx',
				'test107-B-async.xlsx',
				'test107-B-promise.xlsx',
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
