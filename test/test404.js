if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
	//	var DOMStorage = require("dom-storage");
	//	global.localStorage = new DOMStorage("./test390.json", { strict: false, ws: '' });
}

/*
 This sample beased on SQLLOGICTEST
*/

describe('Test 404 OUTER JOIN', function () {
	it('1. CREATE DATABASE', function (done) {
		alasql('CREATE DATABASE test404;USE test404');
		done();
	});

	var data = {
		COLORS: [
			{id: 1, name: 'red'},
			{id: 2, name: 'blue'},
			{id: 3, name: 'orange'},
		],
		FRUITS: [
			{id: 1, name: 'apple'},
			{id: 2, name: 'grape'},
			{id: 3, name: 'orange'},
		],
		MASCOTS: [
			{id: 1, name: 'redsox'},
			{id: 2, name: 'whitesox'},
			{id: 3, name: 'orange'},
		],
	};

	it('2. Create tables and insert data', function (done) {
		alasql('create table colors (id int, name text)');
		alasql('create table fruits (id int, name text)');
		alasql('create table mascots (id int, name text)');
		alasql("insert into colors(id, name) values \
(1, 'red'), \
(2, 'blue'), \
(3, 'orange')");
		alasql(
			"insert into fruits(id, name) values \
(1, 'apple'), \
(2, 'grape'), \
(3, 'orange'), \
(4, 'peaches')"
		);
		alasql(
			"insert into mascots(id, name) values \
(1, 'redsox'), \
(2, 'whitesox'), \
(3, 'orange'), \
(4, 'peaches')"
		);
		done();
	});

	it('3. Test FULL OUTER JOIN with 2 tables', function (done) {
		var res = alasql(
			'select t0.name t0n ,t1.name t1n from colors t0 full outer join fruits t1 on t1.name = t0.name'
		);

		assert.deepEqual(res, [
			{t0n: 'red', t1n: undefined},
			{t0n: 'blue', t1n: undefined},
			{t0n: 'orange', t1n: 'orange'},
			{t0n: undefined, t1n: 'apple'},
			{t0n: undefined, t1n: 'grape'},
			{t0n: undefined, t1n: 'peaches'},
		]);
		done();
	});

	it('4. Test FULL OUTER JOIN with 3 tables using cte workaround', function (done) {
		var res = alasql(
			'with t1 as (select COALESCE(t0.name, t1.name) AS name, t0.name as t0n, t0.id as t0id, t1.name as t1n, t1.id as t1id FROM colors t0 full outer join fruits t1 on t1.name = t0.name) select t0n, t1n, t2.name as t2n from t1 full outer join mascots t2 on t2.name = t1.name'
		);

		assert.deepEqual(res, [
			{t0n: 'red', t1n: undefined, t2n: undefined},
			{t0n: 'blue', t1n: undefined, t2n: undefined},
			{t0n: 'orange', t1n: 'orange', t2n: 'orange'},
			{t0n: undefined, t1n: 'apple', t2n: undefined},
			{t0n: undefined, t1n: 'grape', t2n: undefined},
			{t0n: undefined, t1n: 'peaches', t2n: 'peaches'},
			{t0n: undefined, t1n: undefined, t2n: 'redsox'},
			{t0n: undefined, t1n: undefined, t2n: 'whitesox'},
		]);
		done();
	});

	it.skip('5. Test FULL OUTER JOIN with 3 tables without workaround', function (done) {
		var res = alasql(
			'select t0.name t0n ,t1.name t1n, t2.name t2n from colors t0 full outer join fruits t1 on t1.name = t0.name full outer join mascots t2 on t2.name = t0.name or t2.name = t1.name'
		);
		//console.log(res);
		assert.deepEqual(res, [
			{t0n: 'red', t1n: undefined, t2n: undefined},
			{t0n: 'blue', t1n: undefined, t2n: undefined},
			{t0n: 'orange', t1n: 'orange', t2n: 'orange'},
			{t0n: undefined, t1n: 'apple', t2n: undefined},
			{t0n: undefined, t1n: 'grape', t2n: undefined},
			{t0n: undefined, t1n: 'peaches', t2n: 'peaches'},
			{t0n: undefined, t1n: undefined, t2n: 'redsox'},
			{t0n: undefined, t1n: undefined, t2n: 'whitesox'},
		]);
		done();
	});

	it('99. DROP DATABASE', function (done) {
		alasql('DROP DATABASE test404');
		done();
	});
});
