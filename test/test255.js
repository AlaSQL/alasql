if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 255 Export numbers to Excel as numbers', function () {
	if (typeof exports === 'object') {
		it('1. Create database', function (done) {
			//    var data = [{a:"1.2",b:"1,2"},{a:"2.2",b:"2,3"}];
			//    alasql('select a::number,b into xlsx("a.xlsx",{headers:true}) from ?',[data]);
			alasql(
				'select 12.345, 67.89, 1,10 into xlsx("' + __dirname + '/restest255.xlsx",{headers:true})'
			);

			done();
		});
	}
});
