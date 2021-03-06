if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test162.json', {strict: false, ws: ''});
} else {
	__dirname = '.';
}

if (typeof exports === 'object' && false) {
	describe('Test 166 - database in database', function () {
		it('1. Pass-thru database', function (done) {
			var res = alasql('create database test166');
			assert(res == 1);

			res = alasql(
				'create table test166.one (a int,b int); insert into test166.one values (1,10),(2,20),(3,30),(4,40)'
			);
			assert.deepEqual(res, [1, 4]);

			res = alasql('select column b from test166(select * from one where a > 2)');
			assert.deepEqual(res, [30, 40]);

			// TODO - finish the test
			done();
		});

		it('2. Cached sql-statements', function (done) {
			var res = alasql('select a from cache(select * from test166.one where a > 2)');
			assert.deepEqual(res, [3, 4]);

			res = alasql('insert into test166.one values (5,50),(6,60)');
			assert(res == 2);

			res = alasql('select b from cache(select * from test166.one where a > 2)');
			assert.deepEqual(res, [30, 40]);

			// TODO - finish the test
			done();
		});

		// TODO - Understand the cache
		it('3. Cache tables', function (done) {
			var res = alasql('cache table test166a.one to test166.one');

			var res = alasql('select a from cache(select * from test166.one where a > 2)');
			assert.deepEqual(res, [3, 4]);

			res = alasql('insert into test166.one values (5,50),(6,60)');
			assert(res == 2);

			res = alasql('select b from cache(select * from test166.one where a > 2)');
			assert.deepEqual(res, [30, 40]);

			// TODO - finish the test
			done();
		});
	});
}
