if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 315a Brackets for SEARCH', function () {
	var data = {a: 10, b: 100, c: {d: 5, e: 6}};

	it('1. Simple Brackets', function (done) {
		var res = alasql('SEARCH a FROM ?', [data]);
		assert(res[0] == 10);
		done();
	});

	it('2. Simple Brackets', function (done) {
		var res = alasql('SEARCH (a) FROM ?', [data]);
		assert(res[0] == 10);
		done();
	});

	it('3. Simple Brackets', function (done) {
		var res = alasql('SEARCH WITH(c d) FROM ?', [data]);
		assert(res[0] == 5);

		done();
	});

	it('4. Simple Brackets', function (done) {
		var res = alasql('SEARCH c WITH(d) FROM ?', [data]);
		assert(res[0] == 5);

		done();
	});

	it('5. Simple Brackets', function (done) {
		var res = alasql('SEARCH WITH(c) d FROM ?', [data]);
		//    console.log(43,res);
		assert(res[0] == 5);

		done();
	});

	it('6. Simple Brackets', function (done) {
		var res = alasql('SEARCH with(c) with(d) FROM ?', [data]);
		//    console.log(51,res);
		assert(res[0] == 5);
		done();
	});
});
describe('Test 315b Brackets for SEARCH', function () {
	var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];

	it('1. Simple Brackets', function (done) {
		var res = alasql('SEARCH / / a FROM ?', [data]);
		assert(res == 2);
		done();
	});

	it('2. Simple Brackets', function (done) {
		var res = alasql('SEARCH / a FROM ?', [data]);
		assert.deepEqual(res, [1]);
		done();
	});

	it('3. Simple Brackets', function (done) {
		var res = alasql('SEARCH / + a FROM ?', [data]);
		//    console.log(res);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	it('4. Simple Brackets', function (done) {
		var res = alasql('SEARCH (/)+ a FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	it('5. Simple Brackets', function (done) {
		var res = alasql('SEARCH ((/)+ (a)) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	it('6. Simple Brackets', function (done) {
		var res = alasql('SEARCH (/)? a FROM ?', [data]);
		assert.deepEqual(res, [1]);
		//    console.log(res);
		done();
	});
});

describe('Test 315c Brackets for SEARCH', function () {
	var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];

	it('1. Simple Brackets', function (done) {
		var res = alasql('SEARCH /+ a FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);

		done();
	});
	it('2. Simple Brackets', function (done) {
		var data = [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}];
		var res = alasql('SEARCH / + a FROM ?', [data]);
		//    console.log(res);
		done();
	});
	it('3. Simple Brackets', function (done) {
		var res = alasql('SEARCH / + FROM ?', [data]);
		assert.deepEqual(res, [{a: 1}, {b: {a: 2}, c: 2}, {c: 3}, 1, {a: 2}, 2, 3, 2]);
		done();
	});

	it('4. Simple Brackets', function (done) {
		var res = alasql('SEARCH ((/+) a) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [2, 1]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY() FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(ASC) FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});

	it('5. Simple Brackets', function (done) {
		var res = alasql('SEARCH ALL((/+) a) ORDER BY() FROM ?', [data]);
		assert.deepEqual(res, [1, 2]);
		done();
	});
	it('6. Simple Brackets', function (done) {
		var res = alasql('SEARCH ALL((/+) a) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [2, 1]);
		done();
	});
	it('7. Simple Brackets', function (done) {
		var res = alasql('SEARCH ALL(/+a) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [2, 1]);
		done();
	});
	it('8. Simple Brackets', function (done) {
		var res = alasql('SEARCH ALL(/ *a) ORDER BY(DESC) FROM ?', [data]);
		assert.deepEqual(res, [2, 1]);
		done();
	});
});
