if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 203 REQUIRE ASYNC', function () {
	it('1. REQUIRE() ASYN', function (done) {
		var data = [1, 2, 3, 4];
		alasql(
			'REQUIRE "' + __dirname + '/test203myfn.js1","' + __dirname + '/test203myfn2.js1"',
			[],
			function () {
				var res = alasql('SELECT COLUMN myfn(_)+myfn2(_) FROM ?', [data]);
				//        console.log(res);
				assert.deepEqual(res, [2, 12, 36, 80]);
				done();
			}
		);
		//        console.log(alasql.fn);
	});
	it('2. REQUIRE SYNC', function (done) {
		var data = [1, 2, 3, 4];
		alasql.fn = {};
		//console.log(alasql.fn);
		alasql('REQUIRE "' + __dirname + '/test203myfn.js1","' + __dirname + '/test203myfn2.js1"');
		//        console.log(alasql.fn);
		var res = alasql('SELECT COLUMN myfn(_)+myfn2(_) FROM ?', [data]);
		//        var res = alasql('SELECT COLUMN myfn(_) FROM ?',[data]);
		//        console.log(res);
		assert.deepEqual(res, [2, 12, 36, 80]);
		done();
		//        console.log(alasql.fn);
	});
});
