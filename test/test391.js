if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on this article:

*/

describe('Test 391 MIN() and MAX() undefined value (issue #474)', function() {
	it('1. CREATE DATABASE', function(done) {
		alasql('CREATE DATABASE test391;USE test391');
		done();
	});

	it('2. Prepare test data', function(done) {
		var data = [{a: 1}, {a: -1}, {a: 3}, {a: -3}, {a: 5}, {a: -7.8}];
		var res = alasql('ROW OF SELECT MIN(a), MAX(a) FROM ?', [data]);
		assert.deepEqual(res, [-7.8, 5]);

		var res = alasql(
			'ROW OF SELECT MIN(a), MAX(a) FROM @[{a:1}, {a:(-1)}, {a:3}, {a:(-3)}, {a:5}, {a:(-7.8)}]'
		);
		assert.deepEqual(res, [-7.8, 5]);

		done();
	});

	it('99. DROP DATABASE', function(done) {
		alasql('DROP DATABASE test391');
		done();
	});
});
