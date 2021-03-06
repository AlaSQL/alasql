if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports != 'object') {
	describe('Test 208 WebWorker', function () {
		it('1. WebWorker', function (done) {
			alasql.worker();
			alasql('SELECT VALUE 100', [], function (res) {
				assert(res == 100);
				alasql.worker(false);
				var res = alasql('SELECT VALUE 200');
				assert(res == 200);
				alasql.worker();
				//            console.log(alasql.webworker)
				alasql('SELECT VALUE 300', [], function (res) {
					assert(res == 300);
					alasql.worker(false);
					done();
				});
			});
		});
	});
}
