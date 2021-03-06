if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 214 Multiple same aggregators', function () {
	it('1. Prepare database', function (done) {
		var res = alasql(
			'create database test214;use test214;\
            create table one (a int, b int);\
            insert into one values (1,10),(1,20),(1,30),(2,40),(2,50),(3,60);\
            select row count(a),count(b) from one;\
            select row sum(a),sum(b) from one;'
		);
		assert.deepEqual(res.pop(), [10, 210]);
		assert.deepEqual(res.pop(), [6, 6]);
		done();
	});

	it('2. Test same aggregators', function (done) {
		var res = alasql(
			'select row count(a),count(a) from one;\
            select row sum(a),sum(a) from one;'
		);
		//        console.log(res);
		assert.deepEqual(res.pop(), [10, 10]);
		assert.deepEqual(res.pop(), [6, 6]);
		done();
	});

	it('3. Test same aggregators', function (done) {
		var res = alasql('select row count(a)+1,count(a) from one');
		assert.deepEqual(res, [7, 6]);
		done();
	});

	it('4. Test same aggregators', function (done) {
		var res = alasql('select row count(a),count(a)+1 from one');
		assert.deepEqual(res, [6, 7]);
		done();
	});
});
