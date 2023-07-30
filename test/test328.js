if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 328 COMMA SELECTOR', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test328; USE test328');
		done();
	});

	it('2. SEARCH COMMA - select all pairs', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		//    var res = alasql('SEARCH / a where(_1<=2) as @a, / a where(_<>@a) as @b return @a,@b',[data]);
		var res = alasql('SEARCH /a as @a ^ /a AS @b WHERE(@a!=@b) RETURNS(@a,@b) FROM ?', [data]);
		// console.log(res);
		assert.deepEqual(res, [
			{'@a': 1, '@b': 2},
			{'@a': 1, '@b': 3},
			{'@a': 2, '@b': 1},
			{'@a': 2, '@b': 3},
			{'@a': 3, '@b': 1},
			{'@a': 3, '@b': 2},
		]);
		done();
	});

	it('2. SEARCH COMMA - select all pairs', function (done) {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		//    var res = alasql('SEARCH / a where(_1<=2) as @a, / a where(_<>@a) as @b return @a,@b',[data]);
		var res = alasql('SEARCH /a as @a ^ /a AS @b WHERE(@a!=@b) @[(@a),(@b)] FROM ?', [data]);
		//     console.log(res);
		assert.deepEqual(res, [
			[1, 2],
			[1, 3],
			[2, 1],
			[2, 3],
			[3, 1],
			[3, 2],
		]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test328');
		done();
	});
});
