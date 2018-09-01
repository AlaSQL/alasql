if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	// Test only for browsers

	describe('Test 280 XLS.XML tests', function() {
		var data = [
			{city: 'London', population: 5000000},
			{city: 'Moscow', population: 12000000},
			{city: 'Mexico', population: 20000000},
			{city: 'New York', population: 20000000},
		];

		it('1. Save XLS', function(done) {
			alasql(
				'SELECT * INTO XLS("' + __dirname + '/restest280a.xls",{headers:true}) FROM ?',
				[data],
				function() {
					done();
				}
			);
		});

		it('2. Save XLSXML', function(done) {
			var opts = {
				headers: true,
				column: {style: {Font: {Bold: '1'}}},
				rows: {1: {style: {Font: {Color: '#FF0077'}}}},
				cells: {
					1: {
						1: {
							style: {Font: {Color: '#00FFFF'}},
						},
					},
				},
			};
			alasql(
				'SELECT * INTO XLSXML("' + __dirname + '/restest280b.xls",?) FROM ?',
				[opts, data],
				function() {
					done();
				}
			);
		});

		it('3. Save complex XLSXML', function(done) {
			var outfile = __dirname + '/restest280c.xls';
			var data2 = [
				{pet: 'dog', legs: 4},
				{pet: 'bird', legs: 2}
			];
			alasql('SELECT * INTO XLSXML(?,{headers:true, sheets:{Sheet1:{},Sheet2:{}}}) FROM ?', [outfile, [data, data2]], function() {
				alasql('SEARCH XML Worksheet %[ss:Name] FROM XML(?)', [outfile], function(res) {
					assert.deepEqual(res, ['Sheet1', 'Sheet2']);
					alasql('SEARCH XML / * Data$ FROM XML(?)', [outfile], function(res) {
						assert.equal(res.length, 12);
						done();
					});
				});
			});
		});

		it('4. Save XLSXML with headers array', function(done) {
			var outfile = __dirname + '/restest280d.xls';
			alasql('SELECT * INTO XLSXML(?,{headers: ?}) FROM ?', [outfile, ["City", "Population"], data], function() {
				alasql('SEARCH XML / * Data$ FROM XML(?)', [outfile], function(res) {
					assert.equal(res.length, 10);
					assert.deepEqual(res[0], 'City');
					assert.deepEqual(res[1], 'Population');
					done();
				});
			});
		});
	});
}
