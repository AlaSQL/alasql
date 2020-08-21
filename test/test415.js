if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

/*
  Test for issue #379
*/

var test = 415;

describe('Test ' + test + ' Aggregators', function () {
	before(function () {
		alasql('CREATE DATABASE test' + test + ';USE test' + test);
	});

	after(function () {
		alasql('DROP DATABASE test' + test);
	});

	it('1. Test', function (done) {
		var data = [];
		for (var i = 1; i < 10000; i++) {
			data.push({a: i});
		}

		//    var res1 = alasql('SELECT MEDIAN(a) AS medparam FROM ?', [data]);
		//    console.log(res1);

		var res = alasql('SELECT MEDIAN(a) AS medparam FROM ?', [data]);
		assert.deepEqual(res, [{medparam: 5000}]);

		done();
	});

	it('2. Test', function () {
		var data = [{a: 1}, {a: 2}, {a: 3}];
		var res = alasql('SELECT MEDIAN(a), STDEV(a), SQRT(VAR(a)) FROM ?', [data]);
		assert.deepEqual(res, [{'MEDIAN(a)': 2, 'STDEV(a)': 1, 'SQRT(VAR(a))': 1}]);
	});

	it('3. Test', function (done) {
		var resultSet = [
			{_date: new Date('01.01.2016'), selectedChem: 1},
			{_date: new Date('01.01.2015'), selectedChem: 2},
			{_date: new Date('10.10.2015'), selectedChem: 3},
			{_date: new Date('01.10.2015'), selectedChem: 4},
		];
		var res = alasql(
			'SELECT count(1) AS ct, min(_date) AS minDate, max(_date) AS maxDate, MEDIAN(_date) AS medDate, min(selectedChem) AS minparam, max(selectedChem) AS maxparam, AVG(selectedChem) AS avgparam, MEDIAN(selectedChem) AS medparam, STDEV(selectedChem) AS sdevparam FROM ? WHERE selectedChem is not null AND selectedChem != -9999 ORDER BY _date',
			[resultSet]
		);
		//console.log(res);

		assert.deepEqual(res, [
			{
				ct: 4,
				minDate: new Date('01.01.2015'),
				maxDate: new Date('01.01.2016'),
				medDate: new Date('01.10.2015'),
				minparam: 1,
				maxparam: 4,
				avgparam: 2.5,
				medparam: 2.5,
				sdevparam: 1.2909944487358056,
			},
		]);
		done();
	});

	it('4. Test', function () {
		var resultSet = [
			{_date: new Date('01.01.2016'), selectedChem: 1},
			{_date: new Date('01.01.2015'), selectedChem: 2},
			{_date: new Date('10.10.2015'), selectedChem: 3},
			{_date: new Date('01.10.2015'), selectedChem: undefined},
		];
		var res = alasql(
			'SELECT count(1) AS ct, min(_date) AS minDate, max(_date) AS maxDate, MEDIAN(_date) AS medDate, min(selectedChem) AS minparam, max(selectedChem) AS maxparam, AVG(selectedChem) AS avgparam, MEDIAN(selectedChem) AS medparam, STDEV(selectedChem) AS sdevparam FROM ? WHERE selectedChem is not null AND selectedChem != -9999 ORDER BY _date',
			[resultSet]
		);
		assert.deepEqual(res, [
			{
				ct: 3,
				minDate: new Date('01.01.2015'),
				maxDate: new Date('01.01.2016'),
				medDate: new Date('10.10.2015'),
				minparam: 1,
				maxparam: 3,
				avgparam: 2,
				medparam: 2,
				sdevparam: 1,
			},
		]);
	});

	it('4. Quatiles', function () {
		var data = [{a: 2}, {a: 3}, {a: 4}, {a: 5}, {a: 6}, {a: 7}, {a: 8}, {a: 8}, {a: 10}, {a: 10}];
		var res = alasql('SELECT QUART(a), QUART2(a), QUART3(a) FROM ?', [data]);
		assert.deepEqual(res, [{'QUART(a)': 4, 'QUART2(a)': 7, 'QUART3(a)': 10}]);
	});

	it('5. GREATEST/LEAST', function () {
		var res = alasql(
			'SELECT LEAST(3, 12, 34, 8, 25) AS numL, GREATEST(3, 12, 34, 8, 25) AS numG, LEAST("w3", "mmco", "a") AS strL, GREATEST("w3", "mmco", "a") AS strG'
		);
		assert.deepEqual(res, [{numL: 3, numG: 34, strL: 'a', strG: 'w3'}]);

		var data = [
			{a: 1, b: 4},
			{a: 5, b: 3},
		];
		res = alasql('SELECT GREATEST(a, b) AS g, LEAST(a, b) AS l FROM ?', [data]);
		assert.deepEqual(res, [
			{g: 4, l: 1},
			{g: 5, l: 3},
		]);
	});
});
