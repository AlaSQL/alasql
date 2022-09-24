if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 344 Multisheet export', function() {
	if (typeof exports === 'object') {
		it('1. CREATE DATABASE', function(done) {
			alasql('CREATE DATABASE test344;USE test344');
			done();
		});

		it('2. SELECT FROM', function(done) {
			var data1 = [{a: 1, b: 10}, {a: 2, b: 20}];
			var res = alasql('SELECT FROM ?', [data1]);
			assert.deepEqual(res, [{a: 1, b: 10}, {a: 2, b: 20}]);
			done();
		});

		it('2. XLSX multisheet export', function(done) {
			var data1 = [{a: 1, b: 10}, {a: 2, b: 20}];
			var data2 = [{a: 100, b: 10}, {a: 200, b: 20}];
			var opts = [{sheetid: 'One', header: true}, {sheetid: 'Two', header: false}];
			alasql.into.XLSX(
				__dirname + '/restest344.xlsx',
				opts,
				[data1, data2],
				undefined,
				function() {
					done();
				}
			);
		});

		it('3. XLSX multisheet export', function(done) {
			var data1 = [{a: 1, b: 10}, {a: 2, b: 20}];
			var data2 = [{a: 100, b: 10}, {a: 200, b: 20}];
			var opts = [{sheetid: 'One', header: true}, {sheetid: 'Two', header: false}];
			var res = alasql(
				'SELECT INTO XLSX("' + __dirname + '/restest344b.xlsx",?) FROM ?',
				[opts, [data1, data2]],
				function() {
					done();
				}
			);
		});

		it('3b. XLSX multisheet export using SELECT *', function(done) {
			var data1 = [{a: 1, b: 10}, {a: 2, b: 20}];
			var data2 = [{a: 100, b: 10}, {a: 200, b: 20}];
			var opts = [{sheetid: 'One', header: true}, {sheetid: 'Two', header: false}];
			var res = alasql(
				'SELECT * INTO XLSX("' + __dirname + '/restest344c.xlsx",?) FROM ?',
				[opts, [data1, data2]],
				function() {
					done();
				}
			);
		});

		it('3c. XLSX multisheet export with custom columns', function(done) {
			var data1 = [{a: 1, b: 10}, {a: 2, b: 20}];
			var data2 = [{a: 100, b: 10}, {a: 200, b: 20}];
			var opts = [{sheetid: 'One', header: true}, {sheetid: 'Two', header: false}];
			var res = alasql(
				'SELECT a AS alpha, b as beta INTO XLSX("' +
					__dirname +
					'/restest344d.xlsx",?) FROM ?',
				[opts, [data1, data2]],
				function() {
					done();
				}
			);
		});

		/*
  it('3. XLSXML multisheet export',function(done){
    var res = alasql('=2*2');
    assert.deepEqual(res,1);
    done();
  });
*/

		it('99. DROP DATABASE', function(done) {
			alasql.options.modifier = undefined;
			alasql('DROP DATABASE test344');
			done();
		});
	}
});
