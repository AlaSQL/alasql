if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var path = require('path');
	var dirname = path.normalize(__dirname) + '/';
} else {
	var dirname = './';
}

describe('Test 848 - Multi-sheet XLSX import', function () {
	it('1. Import all sheets using sheetid: "*"', function (done) {
		alasql(
			'select * from xlsx("' + dirname + 'test848.xlsx", {headers:true, sheetid:"*"})',
			[],
			function (data) {
				// Should return a flat array with _sheet property on each row
				assert(Array.isArray(data));
				assert(data.length > 0);
				// Check that _sheet property exists
				assert(data[0]._sheet);
				// Should have rows from both sheets
				var sheet1Rows = data.filter(function (row) {
					return row._sheet === 'Sheet1';
				});
				var sheet2Rows = data.filter(function (row) {
					return row._sheet === 'Sheet2';
				});
				assert(sheet1Rows.length === 3);
				assert(sheet2Rows.length === 4);
				done();
			}
		);
	});

	it('2. Import multiple specific sheets using sheetid array', function (done) {
		alasql(
			'select * from xlsx("' + dirname + 'test848.xlsx", {headers:true, sheetid:?})',
			[['Sheet1', 'Sheet2']],
			function (data) {
				// Should return a flat array with _sheet property
				assert(Array.isArray(data));
				assert(data.length === 7); // 3 + 4 rows
				assert(data[0]._sheet);
				done();
			}
		);
	});

	it('3. Import specific sheets by index using sheetid array', function (done) {
		alasql(
			'select * from xlsx("' + dirname + 'test848.xlsx", {headers:true, sheetid:?})',
			[[0, 1]],
			function (data) {
				// Should return a flat array with _sheet property
				assert(Array.isArray(data));
				assert(data.length === 7); // 3 + 4 rows
				assert(data[0]._sheet === 'Sheet1');
				done();
			}
		);
	});

	it('4. Original single sheet behavior should still work', function (done) {
		alasql(
			'select * from xlsx("' + dirname + 'test848.xlsx", {headers:true})',
			[],
			function (data) {
				// Should return an array (original behavior)
				assert(Array.isArray(data));
				assert(data.length === 3);
				// Should not have _sheet property
				assert(!data[0]._sheet);
				done();
			}
		);
	});

	it('5. Original single sheet with explicit sheetid should still work', function (done) {
		alasql(
			'select * from xlsx("' + dirname + 'test848.xlsx", {headers:true, sheetid:"Sheet2"})',
			[],
			function (data) {
				// Should return an array (original behavior)
				assert(Array.isArray(data));
				assert(data.length === 4);
				assert(data[3].five === 800);
				// Should not have _sheet property
				assert(!data[0]._sheet);
				done();
			}
		);
	});

	it('6. Query rows from specific sheet using WHERE clause', function (done) {
		alasql(
			'select * from xlsx("' +
				dirname +
				'test848.xlsx", {headers:true, sheetid:"*"}) WHERE _sheet = "Sheet2"',
			[],
			function (data) {
				// Should only return rows from Sheet2
				assert(Array.isArray(data));
				assert(data.length === 4);
				assert(
					data.every(function (row) {
						return row._sheet === 'Sheet2';
					})
				);
				done();
			}
		);
	});

	it('7. Count rows per sheet', function (done) {
		// First get the data, then query it
		alasql(
			'SELECT * FROM xlsx("' + dirname + 'test848.xlsx", {headers:true, sheetid:"*"})',
			[],
			function (allData) {
				// Now count using a separate query
				var counts = alasql('SELECT [_sheet], COUNT(*) FROM ? GROUP BY [_sheet]', [allData]);
				assert(Array.isArray(counts));
				assert(counts.length === 2);
				var sheet1 = counts.find(function (row) {
					return row._sheet === 'Sheet1';
				});
				var sheet2 = counts.find(function (row) {
					return row._sheet === 'Sheet2';
				});
				assert(sheet1['COUNT(*)'] === 3);
				assert(sheet2['COUNT(*)'] === 4);
				done();
			}
		);
	});
});
