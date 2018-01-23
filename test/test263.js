if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	describe('Test 263 MIN and MAX: aggregators and functions', function() {
		it('1. Test', function(done) {
			var data = [{a: 1, b: 3}, {a: 2, b: 1}, {a: 2, b: 3}, {a: 8, b: 1}];
			var res = alasql('SELECT MAX(MAX(a),MIN(a)), MIN(MAX(a),MIN(a)) FROM ?', [data]);
			assert.deepEqual(res, [{'MAX(MAX(a),MIN(a))': 8, 'MIN(MAX(a),MIN(a))': 1}]);
			done();
		});

		it('2. Test MIN MAX', function(done) {
			var a = [{a: 1, b: 5}, {a: 2, b: 0}, {a: 0, b: -5}, {a: 5, b: 5}];
			var res = alasql('SELECT MIN(`a`, `b`) AS c FROM ?', [a]);
			assert.deepEqual(res, [{c: 1}, {c: 0}, {c: -5}, {c: 5}]);
			//		console.log(res);
			var res = alasql('SELECT * FROM ? WHERE MIN(`a`, `b`) > 1', [a]);
			assert.deepEqual(res, [{a: 5, b: 5}]);
			//		console.log(res);
			done();
		});
		it('3. MIN in GROUP BY function', function(done) {
			var a = [{a: 1, b: 5}, {a: 2, b: 0}, {a: 0, b: -5}, {a: 5, b: 5}];
			var res = alasql('SELECT b FROM ? GROUP BY b HAVING MIN(MIN(a),5) > 1', [a]);
			assert.deepEqual(res, [{b: 0}]);
			//		console.log(res);
			done();
		});
	});
}
