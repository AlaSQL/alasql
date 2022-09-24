if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 216 ? IN ?', function () {
	it('1. Expression IN (,,)', function (done) {
		var res = alasql('SET @a = 10; \
            SELECT VALUE @a IN (10,20,30)');
		assert(res.pop() === true);
		var res = alasql('SET @a = 40;\
            SELECT VALUE @a IN (10,20,30)');
		assert(res.pop() === false);
		done();
	});

	it('2. ? IN ?', function (done) {
		var res = alasql('SELECT VALUE ? IN @(?)', [10, [10, 20, 30]]);
		assert(res === true);
		var res = alasql('SELECT VALUE ? IN @(?)', [40, [10, 20, 30]]);
		assert(res === false);
		done();
	});

	it('3. @a IN @b', function (done) {
		var res = alasql('SET @a = 10; SET @b = @[10,20,30]; \
            SELECT VALUE @a IN @(@b)');
		assert(res.pop() === true);
		var res = alasql('SET @a = 40;\
            SELECT VALUE @a IN @(@b)');
		assert(res.pop() === false);
		done();
	});

	it('4. @a IN @[]', function (done) {
		var res = alasql('SET @a = 10; \
            SELECT VALUE @a IN @(@[10,20,30])');
		assert(res.pop() === true);
		var res = alasql('SET @a = 40;\
            SELECT VALUE @a IN @(@[10,20,30])');
		assert(res.pop() === false);
		done();
	});
});
