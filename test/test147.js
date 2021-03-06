if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports != 'object') {
	describe('Test 147 - WebSQL Database', function () {
		if (false) {
			it('1. Nested SQL', function (done) {
				var res = alasql(
					'CREATE WebSQL DATABASE wd147 ("1.0","My database",1024*1024) AS test147',
					[],
					function (res) {
						/// console.log('done', res);
						done();
						//			alasql('ATTACH WebSQL DATABASE wd147', [], function() {
						//				alasql('USE wd147',[],function() {
						//					done();
						//				});
						//			});
						// });
					}
				);
			});

			it('99. Detach database', function (done) {
				// Do we really need this?
				done();
			});
		}
	});
}
