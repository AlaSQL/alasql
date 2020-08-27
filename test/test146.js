if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 146 - Async Tests', function () {
	var myfnsync = function (n) {
		if (n > 3) return;
		return {a: n, b: n * 2};
	};

	var myfn = function (n, cb) {
		alasql.busy++;
		setTimeout(function () {
			alasql.busy--;
			if (n > 3) cb();
			else cb({a: n, b: n * 2});
		}, 10);
	};

	it('1. Nested SQL', function (done) {
		alasql('CREATE DATABASE test146', [], function () {
			assert(!!alasql.databases.test146);
			alasql('USE test146', [], function () {
				assert(alasql.useid == 'test146');
				alasql('SELECT * FROM ?', [myfnsync], function (res) {
					assert.deepEqual(res, [
						{a: 0, b: 0},
						{a: 1, b: 2},
						{a: 2, b: 4},
						{a: 3, b: 6},
					]);
					alasql('DROP DATABASE test146', [], function () {
						assert(!alasql.databases.test146);
						done();
					});
				});
			});
		});
	});

	it('99. Detach database', function (done) {
		// Do we really need this?
		done();
	});
});
