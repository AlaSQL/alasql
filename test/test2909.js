if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2909'; // A "__proto__" key in data is copied as data, never as the prototype

describe(`Test ${testId} - a "__proto__" key in data is copied as data`, function () {
	var evil = () => JSON.parse('{"a":1,"__proto__":{"isAdmin":true}}');

	var assertPlain = function (o) {
		assert.strictEqual(Object.getPrototypeOf(o), Object.prototype);
		assert.strictEqual(o.isAdmin, undefined);
		assert.ok(Object.prototype.hasOwnProperty.call(o, '__proto__'));
		assert.deepStrictEqual(Object.getOwnPropertyDescriptor(o, '__proto__').value, {isAdmin: true});
	};

	before(function () {
		alasql(`CREATE DATABASE test${testId}; USE test${testId}`);
	});

	after(function () {
		alasql(`DROP DATABASE test${testId}`);
	});

	it('A) utils.extend', function () {
		var res = alasql.utils.extend({}, evil());
		assertPlain(res);
		assert.strictEqual(res.a, 1);
	});

	it('B) utils.cloneDeep, at the top and nested', function () {
		assertPlain(alasql.utils.cloneDeep(evil()));
		assertPlain(alasql.utils.cloneDeep({x: [evil()]}).x[0]);
	});

	it('C) utils.cloneDeep does not call a constructor the object holds itself', function () {
		var called = false;
		var obj = {a: 1};
		Object.defineProperty(obj, 'constructor', {
			value: function () {
				called = true;
			},
		});
		var res = alasql.utils.cloneDeep(obj);
		assert.strictEqual(called, false);
		assert.deepStrictEqual(res, {a: 1});
	});

	it('D) utils.cloneDeep keeps arrays, dates and class instances', function () {
		class Point {
			constructor() {
				this.x = 0;
			}
		}
		var p = new Point();
		p.x = 5;
		var res = alasql.utils.cloneDeep({
			list: [1, 2],
			when: new Date(0),
			p,
			empty: Object.create(null),
		});
		assert.ok(Array.isArray(res.list));
		assert.ok(res.when instanceof Date);
		assert.ok(res.p instanceof Point);
		assert.strictEqual(res.p.x, 5);
		assert.deepStrictEqual(Object.keys(res.empty), []);
	});

	it('E) SELECT * from parameter data, with and without a join', function () {
		assertPlain(alasql('SELECT * FROM ?', [[evil()]])[0]);
		assertPlain(alasql('SELECT * FROM ? x JOIN ? y ON x.a = y.a', [[evil()], [{a: 1, b: 2}]])[0]);
	});

	it('F) SELECT * with GROUP BY', function () {
		assertPlain(alasql('SELECT * FROM ? GROUP BY a', [[evil()]])[0]);
		assertPlain(alasql('SELECT *, COUNT(*) AS c FROM ? GROUP BY a', [[evil()]])[0]);
	});

	it('G) A JSON column read with CAST, then updated and selected', function () {
		alasql('CREATE TABLE one (id INT, p JSON)');
		alasql(`INSERT INTO one VALUES (1, CAST('{"__proto__":{"isAdmin":true}}' AS JSON))`);
		alasql('UPDATE one SET id = 2');
		var row = alasql('SELECT * FROM one')[0];
		assert.strictEqual(row.id, 2);
		assert.strictEqual(Object.getPrototypeOf(row.p), Object.prototype);
		assert.strictEqual(row.p.isAdmin, undefined);
	});

	it('H) OUTPUT INSERTED.*', function () {
		alasql('CREATE TABLE two');
		assertPlain(alasql('INSERT INTO two VALUES ? OUTPUT INSERTED.*', [evil()])[0]);
	});

	it('I) OUTPUT DELETED.*, with and without WHERE', function () {
		alasql('CREATE TABLE three');
		alasql('INSERT INTO three VALUES ?', [evil()]);
		alasql('INSERT INTO three VALUES ?', [evil()]);
		assertPlain(alasql('DELETE FROM three WHERE a = 1 OUTPUT DELETED.*')[0]);
		alasql('INSERT INTO three VALUES ?', [evil()]);
		assertPlain(alasql('DELETE FROM three OUTPUT DELETED.*')[0]);
	});

	it('J) UPDATE with OUTPUT INSERTED.*', function () {
		alasql('CREATE TABLE four');
		alasql('INSERT INTO four VALUES ?', [evil()]);
		assertPlain(alasql('UPDATE four SET a = 2 OUTPUT INSERTED.*')[0]);
	});

	it('K) INSERT OR REPLACE over an existing row', function () {
		alasql('CREATE TABLE five (a INT PRIMARY KEY)');
		alasql('INSERT INTO five VALUES (1)');
		alasql('INSERT OR REPLACE INTO five VALUES ?', [evil()]);
		assertPlain(alasql.databases['test' + testId].tables.five.data[0]);
	});
});
