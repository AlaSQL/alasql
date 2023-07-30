if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '846';

describe('Test ' + test + ' - non-numeric values for SUM, MIN and MAX', function () {
	it('MAX dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{
				a: null,
				b: 1,
				c: false,
				c2: false,
				d: 5,
				e: 'XYZ2',
				f: new Number(11),
			},
		];
		res = alasql(
			`SELECT 
				MAX(a) AS a, 
				max(b) as b, 
				mAx(c) as c, 
				mAx(c2) as c2, 
				MaX(d) as d,
				MAX(e) as e,		
				MAX(f) as f	
			FROM ?`,
			[data]
		);
		assert.deepEqual(res, [{a: null, b: 9, c: null, c2: 1, d: 5, e: null, f: 11}]);
		var data = [
			{
				a: null,
				b: 9,
				c: new Date('12.12.2022'),
				c2: 1,
				d: null,
				e: 'XYZ1',
				f: new Number(2),
			},
			{
				a: new Date('12.12.2022'),
				b: 1,
				c: new Date('01.01.2023'),
				c2: false,
				d: 5,
				e: 'XYZ2',
				f: new Number(11),
			},
		];
		res = alasql(
			`SELECT 
				MAX(a) AS a, 
				max(b) as b, 
				mAx(c) as c, 
				mAx(c2) as c2, 
				MaX(d) as d,
				MAX(e) as e,		
				MAX(f) as f	
			FROM ?`,
			[data]
		);
		assert.deepEqual(res, [
			{
				a: new Date('12.12.2022'),
				b: 9,
				c: new Date('01.01.2023'),
				c2: 1,
				d: 5,
				e: null,
				f: 11,
			},
		]);
	});

	it('MIN dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{
				a: null,
				b: 1,
				c: false,
				c2: false,
				d: 5,
				e: 'XYZ2',
				f: new Number(11),
			},
		];
		res = alasql(
			`SELECT 
				MIN(a) AS a, 
				min(b) as b, 
				mIn(c) as c, 
				mIn(c2) as c2, 
				MiN(d) as d,
				MIN(e) as e,	
				MIN(f) as f	
			FROM ?`,
			[data]
		);
		assert.deepEqual(res, [{a: null, b: 1, c: null, c2: 1, d: 5, e: null, f: 2}]);
		var data = [
			{
				a: null,
				b: 9,
				c: true,
				c2: new Date('12.12.2022'),
				d: null,
				e: 'XYZ1',
				f: new Number(2),
			},
			{
				a: new Date('12.12.2022'),
				b: 1,
				c: false,
				c2: new Date('11.12.2022'),
				d: 5,
				e: 'XYZ2',
				f: new Number(11),
			},
		];
		res = alasql(
			`SELECT 
			MIN(a) AS a, 
			min(b) as b, 
			mIn(c) as c, 
			mIn(c2) as c2, 
			MiN(d) as d,
			MIN(e) as e,	
			MIN(f) as f	
		FROM ?`,
			[data]
		);
		assert.deepEqual(res, [
			{
				a: new Date('12.12.2022'),
				b: 1,
				c: null,
				c2: new Date('11.12.2022'),
				d: 5,
				e: null,
				f: 2,
			},
		]);
	});

	it('SUM dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{
				a: null,
				b: 1,
				c: false,
				c2: false,
				d: 5,
				e: 'XYZ2',
				f: new Number(11),
			},
		];
		res = alasql(
			`SELECT 
				SUM(a) AS a, 
				sum(b) as b, 
				sUm(c) as c, 
				sUm(c2) as c2, 
				SuM(d) as d,
				SUM(e) as e,	
				SUM(f) as f	
			FROM ?`,
			[data]
		);
		assert.deepEqual(res, [{a: null, b: 10, c: null, c2: 1, d: 5, e: null, f: 13}]);

		var data = [[{a: null}]];
		res = alasql(`SELECT SUM(a) AS a FROM ?`, data);
		assert.deepEqual(res, [{a: null}]);

		var data = [[{a: 2}]];
		res = alasql(`SELECT SUM(a) AS a FROM ?`, data);
		assert.deepEqual(res, [{a: 2}]);
	});

	it('SUM zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select sum(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('MIN zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select min(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('MAX zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select max(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('AVG zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select avg(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('SUM zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select sum(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('MIN zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select min(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('MAX zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select max(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('AVG zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select avg(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});
	it('TOTAL dealing with non-numeric values', function () {
		var data = [
			{
				a: null,
				b: 9,
				c: true,
				c2: 1,
				d: null,
				e: 'XYZ1',
				f: new Number(2),
				g: '+44',
				h: 'XYZ1',
			},
			{
				a: null,
				b: 1,
				c: false,
				c2: false,
				d: 5,
				e: 'XYZ2',
				f: new Number(11),
				g: '-45',
				h: 1,
			},
		];
		res = alasql(
			`SELECT 
				TOTAL(a) AS a, 
				total(b) as b, 
				Total(c) as c, 
				toTal(c2) as c2, 
				totAl(d) as d,
				totaL(e) as e,	
				TOTAL(f) as f,
				TOTAL(g) as g,
				TOTAL(h) as h		
			FROM ?`,
			[data]
		);
		assert.deepEqual(res, [{a: 0, b: 10, c: 1, c2: 1, d: 5, e: 0, f: 13, g: -1, h: 1}]);
	});

	it('TOTAL of nothing is zero', function () {
		data = [{ProductId: 10, price: 50}];
		res = alasql(`SELECT TOTAL(price) AS p FROM ? WHERE ProductId = 5`, [data]);
		assert.deepEqual(res, [{p: 0}]);
	});

	it('TOTAL of two rows based on select', function () {
		data = [
			{ProductId: 100, price: 500},
			{ProductId: 100, price: 600},
			{ProductId: 123, price: 123},
		];
		res = alasql(`SELECT TOTAL(price) AS p FROM ? WHERE ProductId = 100`, [data]);
		assert.deepEqual(res, [{p: 1100}]);
	});

	it('TOTAL of single row', function () {
		var data = [[{a: 2}]];
		res = alasql(`SELECT TOTAL(a) AS a FROM ?`, data);
		assert.deepEqual(res, [{a: 2}]);
	});

	it('TOTAL of zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select TOTAL(v) as v from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});
});
