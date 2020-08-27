if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

//if(typeof exports != 'object') {

describe('Test 172 - XLSX to array', function () {
	it('1. Load XLSX file into array', function (done) {
		var data = [];
		alasql(
			'select column * from xlsx("' +
				__dirname +
				'/test168.xlsx", {headers:true, sheetid:"Sheet1", range:"A1:B6"}) order by City',
			[],
			function (res) {
				//			console.log(res);
				assert.deepEqual(res, ['Kyoto', 'Mexico', 'Minsk', 'Moscow', 'Tokyo']);
				done();
			}
		);
	});
});

//};
