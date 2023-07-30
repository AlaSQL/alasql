if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 137 get JSON property', function () {
	it('1. Get JSON object', function (done) {
		var res = alasql('SELECT VALUE @{a:1, b:2}');
		assert.deepEqual(res, {a: 1, b: 2});

		var res = alasql('SELECT VALUE @{a:1, b:2} = @{a:1, b:2}');
		assert(res == false);

		// TODO compare objects of known types!!! (without deepEqual!)
		// or warning at the time of compilation!

		var res = alasql('SELECT VALUE @{a:1, b:2} == @{a:1, b:2}');
		assert(res == true);

		var res = alasql('SELECT VALUE @{a:1, b:2} != @{a:1, b:2}');
		assert(res == true);

		// TODO compare objects of known types!!! (without deepEqual!)

		var res = alasql('SELECT VALUE @{a:1, b:2} !== @{a:1, b:2}');
		assert(res == false);

		var res = alasql('SELECT VALUE @{a:1, b:2} = @{a:2, b:2}');
		assert(res == false);

		var res = alasql('SELECT VALUE @{a:1, b:2} == @{a:2, b:2}');
		assert(res == false);

		var res = alasql('SELECT VALUE @{a:1, b:2} != @{a:2, b:2}');
		assert(res == true);

		var res = alasql('SELECT VALUE @{a:1, b:2} !== @{a:2, b:2}');
		assert(res == true);

		done();
	});

	it('2. Get JSON property operator', function (done) {
		var res = alasql('SELECT VALUE {a:1, b:2}->a');
		assert.deepEqual(res, 1);

		var res = alasql('SELECT VALUE {a:1, b:@[3,{c:3,d:4},5,6]}->b');
		assert.deepEqual(res, [3, {c: 3, d: 4}, 5, 6]);

		var res = alasql('SELECT VALUE {a:1, b:@[3,{c:3,d:4},5,6]}->b->3');
		assert(res == 6);

		var res = alasql('SELECT VALUE {a:1, b:@[3,{c:3,d:4},5,6]}->("b")->("3")');
		assert(res == 6);

		var res = alasql('SELECT VALUE {a:1, b:@[3,{c:3,d:4},5,6]}->("b")->3');
		assert(res == 6);

		var res = alasql('SELECT VALUE {a:1, b1:@[3,{c:3,d:4},5,6]}->("b"+1)->(2*2-1)');
		assert(res == 6);

		done();
	});

	it('3. Get JSON param values', function (done) {
		//		var res = alasql('SELECT VALUE @{a:?, b:?}->a',[1,2]);
		var res = alasql('SELECT VALUE {a:?, b:?}->a', [1, 2]);
		//		console.log(71);
		assert(res == 1);
		var res = alasql('SELECT VALUE {a:?, b:?}->a', [1, 2]);
		assert(res == 1);
		done();
	});

	it('4. Get JSON param values in sub-arrays', function (done) {
		var res = alasql('SELECT VALUE @{a:1, b1:@[3,{c:?,d:4},?,6]}', [100, 200]);
		assert.deepEqual(res, {a: 1, b1: [3, {c: 100, d: 4}, 200, 6]});

		var res = alasql('SELECT VALUE @{a:1, b1:@[3,{c:?,d:4},?,6]}->b1->1->c', [100, 200]);
		assert(res == 100);

		done();
	});
});
