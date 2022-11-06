if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test from jsFiddle', function () {
	it('Simple select test (http://jsfiddle.net/agershun/38hj2uwy/3/)', function (done) {
		var db = new alasql.Database();

		db.exec('CREATE TABLE person (name STRING, sex STRING, income INT)');

		db.tables.person.data = [
			{name: 'bill', sex: 'M', income: 50000},
			{name: 'sara', sex: 'F', income: 100000},
		];

        assert.deepEqual(
			[{"SUM(income)": 150000}],
			db.exec("SELECT SUM(income) FROM person")
		);
		assert.deepEqual(
			[{"SUM(name)": 0}],
			db.exec("SELECT SUM(name) FROM person")
		);
        assert.deepEqual(
			[{"MAX(name)": 0}],
			db.exec("SELECT MAX(name) FROM person")
		);
        assert.deepEqual(
			[{"MIN(name)": 0}],
			db.exec("SELECT MIN(name) FROM person")
		);
		done();
	});
});
