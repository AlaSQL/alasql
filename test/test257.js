if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports != 'undefined') {
	describe('Test 257 INTO XLS()', function () {
		it('1. INTO XLS()', function (done) {
			this.timeout(9000);

			var data = [
				{a: 1, b: 10},
				{a: 2, b: 20},
			];
			// Show headers
			var opts = {
				headers: true,
			};

			var res = alasql('SELECT * INTO XLS("' + __dirname + '/restest257a.xls",?) FROM ?', [
				opts,
				data,
			]);
			assert(res == 1);

			// Change sheet
			var opts = {
				sheetid: 'Sheet2',
				headers: true,
			};

			var res = alasql('SELECT * INTO XLS("' + __dirname + '/restest257a.xls",?) FROM ?', [
				opts,
				data,
			]);
			assert(res == 1);

			// List of sheets
			var opts = {
				sheets: [
					{
						sheetid: 'Sheet2',
						headers: true,
					},
				],
			};

			var res = alasql('SELECT * INTO XLS("' + __dirname + '/restest257a.xls",?) FROM ?', [
				opts,
				data,
			]);
			assert(res == 1);

			// Background color
			var opts = {
				style: 'background:#00ff00',
			};

			var res = alasql('SELECT * INTO XLS("' + __dirname + '/restest257a.xls",?) FROM ?', [
				opts,
				data,
			]);
			assert(res == 1);

			// Background color
			var opts = {
				headers: true,
				sheetid: 'My Birds',
				style: 'background:#00ff00',
				columns: [
					{
						columnid: 'a',
						title: 'Albatroses',
						style: 'background:red;font-size:20px',
						cell: {style: 'background:blue'},
					},
					{
						columnid: 'b',
						title: 'Bird',
						cell: {
							style: function (value, sheet, row, column, rowidx, columnidx) {
								return 'background' + (value == 10 ? 'brown' : 'white');
							},
						},
					},
					{
						columnid: 'b',
						cell: {
							value: function (value) {
								return value * value;
							},
						},
					},
				],
			};

			var res = alasql('SELECT * INTO XLS("' + __dirname + '/restest257a.xls",?) FROM ?', [
				opts,
				data,
			]);
			assert(res == 1);
			done();
		});

		it('2. jsFiddle example', function (done) {
			var items = [
				{
					name: 'John Smith',
					email: 'j.smith@example.com',
					dob: '1985-10-10',
				},
				{
					name: 'Jane Smith',
					email: 'jane.smith@example.com',
					dob: '1988-12-22',
				},
				{
					name: 'Jan Smith',
					email: 'jan.smith@example.com',
					dob: '2010-01-02',
				},
				{
					name: 'Jake Smith',
					email: 'jake.smith@exmaple.com',
					dob: '2009-03-21',
				},
				{
					name: 'Josh Smith',
					email: 'josh@example.com',
					dob: '2011-12-12',
				},
				{
					name: 'Josh Smith',
					email: 'josh@example.com',
					dob: '2011-12-12',
				},
				{
					name: 'Josh Smith',
					email: 'josh@example.com',
					dob: '2011-12-12',
				},
				{
					name: 'Josh Smith',
					email: 'josh@example.com',
					dob: '2011-12-12',
				},
				{
					name: 'Josh Smith',
					email: 'josh@example.com',
					dob: '2011-12-12',
				},
				{
					name: 'Josh Smith',
					email: 'josh@example.com',
					dob: '2011-12-12',
				},
				{
					name: 'Jessie Smith',
					email: 'jess@example.com',
					dob: '2004-10-12',
				},
			];

			var opts = {
				sheetid: 'My Big Table Sheet',
				headers: true,
				caption: {
					title: 'My Big Table',
					style: 'font-size: 50px; color:blue;', // Sorry, styles do not works
				},
				style: 'background:#00FF00',
				column: {
					style: 'font-size:30px',
				},
				columns: [
					{columnid: 'email'},
					{columnid: 'dob', title: 'Birthday', width: 300},
					{columnid: 'name'},
					{
						columnid: 'name',
						title: 'Number of letters in name',
						width: '300px',
						cell: {
							value: function (value) {
								return value.length;
							},
						},
					},
				],
				row: {
					style: function (sheet, row, rowidx) {
						return 'background:' + (rowidx % 2 ? 'red' : 'yellow');
					},
				},
				rows: {
					4: {cell: {style: 'background:blue'}},
				},
				cells: {
					2: {
						2: {
							style: 'font-size:45px;background:pink',
							value: function (value) {
								return value.substr(1, 3);
							},
						},
					},
				},
			};

			var res = alasql('SELECT * INTO XLS("' + __dirname + '/restest257b.xls",?) FROM ?', [
				opts,
				items,
			]);
			assert(res == 1);
			done();
		});

		if (false) {
			it('3. Areas example', function (done) {
				var data = [
					{imemid: 123, itemname: 'Samsung TV', price: 123.0, qty: 2},
					{imemid: 567, itemname: 'LG TV', price: 233.0, qty: 4},
					{imemid: 897, itemname: 'Sony TV', price: 323.0, qty: 5},
				];

				var templ = {
					areas: [
						{x: 0, y: 0, colspan: 3, cells: 'Invoice'},
						{x: 2, y: 5, h: 10, headers: true, data: true, totals: 'top'},
					],
				};
				assert(false);
				done();
			});
		}
	});
}
