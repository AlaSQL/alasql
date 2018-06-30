if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (false) {
	describe('Test 131 CAST and CONVERT', function() {
		it('1. CAST', function(done) {
			alasql('source "' + __dirname + '/test131.sql"');
			done();
		});

		it('2. CAST dates', function(done) {
			alasql.options.datetimeformat = 'javascript';
			var res = alasql.value('select cast("1998-01-01" as date)');
			assert(typeof res, 'object');
			assert(res instanceof Date);
			assert(res.valueOf(), new Date('1998-01-01').valueOf());

			alasql.options.datetimeformat = 'sql';
			var res = alasql.value('select cast("1998-01-01" as date)');
			assert(res, '1998-01-01');
			done();
		});
	});
}
