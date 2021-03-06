if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var path = require('path');
	var dirname = path.normalize(__dirname) + '/';
} else {
	var dirname = './';
}

describe('Test 242 Multi-columns Excel file', function () {
	it('1. Read multi-column file', function (done) {
		alasql('select * from xlsx("' + dirname + 'test242.xlsx",{headers:false})', [], function (
			data
		) {
			//      console.log(data[0]);
			assert(data[0].CV == 100);
			done();
		});
	});

	it('2. Read multi-column file', function (done) {
		alasql(
			'select * from xlsx("' + dirname + 'test242.xlsx", {headers:true,sheetid:"Sheet2"})',
			[],
			function (data) {
				//      console.log(data[3]);
				assert(data[3].five == 800);
				done();
			}
		);
	});
});
