if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

var test = '846';

describe('Test ' + test + ' - non-numeric values for SUM, MIN and MAX', function () {
	it('MAX dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{a: null, b: 1, c: false, c2: false, d: 5, e: 'XYZ2', f: new Number(11)},
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
			{a: null, b: 9, c: new Date('12.12.2022'), c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
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
			{a: new Date('12.12.2022'), b: 9, c: new Date('01.01.2023'), c2: 1, d: 5, e: null, f: 11},
		]);
	});

	it('MIN dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{a: null, b: 1, c: false, c2: false, d: 5, e: 'XYZ2', f: new Number(11)},
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
			{a: null, b: 9, c: true, c2: new Date('12.12.2022'), d: null, e: 'XYZ1', f: new Number(2)},
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
			{a: new Date('12.12.2022'), b: 1, c: null, c2: new Date('11.12.2022'), d: 5, e: null, f: 2},
		]);
	});

	it('SUM dealing with non-numeric values', function () {
		var data = [
			{a: null, b: 9, c: true, c2: 1, d: null, e: 'XYZ1', f: new Number(2)},
			{a: null, b: 1, c: false, c2: false, d: 5, e: 'XYZ2', f: new Number(11)},
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
	});

	it('SUM zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select sum(v) from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('MIN zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select min(v) from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('MAX zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select max(v) from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});

	it('AVG zero is zero', function () {
		var data = [{v: 0}];
		res = alasql(`select avg(v) from ?`, [data]);
		assert.deepEqual(res, [{v: 0}]);
	});
});
