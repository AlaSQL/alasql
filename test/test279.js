if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var _ = require('lodash');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	// Test only for browsers

	describe('Test 279 IE9 tests', function () {
		it('1. Detect if it is IE9', function (done) {
			var data = [
				{city: 'London', population: 5000000},
				{city: 'Moscow', population: 12000000},
			];
			//    alasql('SELECT * INTO TSV("aaa.txt",{headers:true}) FROM ?',[data]);
			//    alasql('SELECT * INTO XLS("aaa.xls",{headers:true}) FROM ?',[data]);
			alasql('SELECT * INTO XLSXML("' + __dirname + '/restest279.xls",{headers:true}) FROM ?', [
				data,
			]);
			done();
		});
	});
}
