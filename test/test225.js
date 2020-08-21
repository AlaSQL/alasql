if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports === 'object') {
	describe('Test 225 File Storage', function () {
		it('1. CREATE FILE DATABASE', function (done) {
			alasql('DROP FILE DATABASE IF EXISTS "' + __dirname + '/test225.json"', [], function (res) {
				//			console.log(res);
				alasql('CREATE FILE DATABASE "' + __dirname + '/test225.json"', [], function (res) {
					//				console.log('PASS1');
					assert(res == 1);
					alasql(
						'CREATE FILE DATABASE IF NOT EXISTS "' + __dirname + '/test225.json"',
						[],
						function (res) {
							//					console.log('PASS2');
							assert(res == 0);
							alasql('DROP FILE DATABASE IF EXISTS "' + __dirname + '/test225.json"', [], function (
								res
							) {
								//						console.log(res);
								assert(res == 1);
								done();
							});
						}
					);
				});
			});
		});
	});
}
