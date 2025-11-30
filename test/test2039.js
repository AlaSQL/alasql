if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2039 - Sorting does not occur for field names in quotation marks', function () {
	const test = '2039';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Order by quoted column name should sort correctly', function () {
		var data = [{Поле: 3}, {Поле: 1}, {Поле: 2}];
		var res = alasql("select * from ? order by 'Поле'", [data]);
		assert.deepEqual(res, [{Поле: 1}, {Поле: 2}, {Поле: 3}]);
	});

	it('B) Order by double-quoted column name should sort correctly', function () {
		var data = [{Поле: 3}, {Поле: 1}, {Поле: 2}];
		var res = alasql('select * from ? order by "Поле"', [data]);
		assert.deepEqual(res, [{Поле: 1}, {Поле: 2}, {Поле: 3}]);
	});

	it('C) Order by quoted ASCII column name should sort correctly', function () {
		var data = [{name: 'Charlie'}, {name: 'Alice'}, {name: 'Bob'}];
		var res = alasql("select * from ? order by 'name'", [data]);
		assert.deepEqual(res, [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}]);
	});

	it('D) Order by quoted column name with DESC should sort correctly', function () {
		var data = [{Поле: 1}, {Поле: 3}, {Поле: 2}];
		var res = alasql("select * from ? order by 'Поле' DESC", [data]);
		assert.deepEqual(res, [{Поле: 3}, {Поле: 2}, {Поле: 1}]);
	});

	it('E) Order by backtick-quoted column name should work (existing behavior)', function () {
		var data = [{Поле: 3}, {Поле: 1}, {Поле: 2}];
		var res = alasql('select * from ? order by `Поле`', [data]);
		assert.deepEqual(res, [{Поле: 1}, {Поле: 2}, {Поле: 3}]);
	});

	it('F) Order by bracket-quoted column name should work (existing behavior)', function () {
		var data = [{'Primary column': 3}, {'Primary column': 1}, {'Primary column': 2}];
		var res = alasql('select * from ? order by [Primary column]', [data]);
		assert.deepEqual(res, [{'Primary column': 1}, {'Primary column': 2}, {'Primary column': 3}]);
	});

	it('G) Order by quoted column name with spaces should sort correctly', function () {
		var data = [{'my field': 3}, {'my field': 1}, {'my field': 2}];
		var res = alasql("select * from ? order by 'my field'", [data]);
		assert.deepEqual(res, [{'my field': 1}, {'my field': 2}, {'my field': 3}]);
	});
});
