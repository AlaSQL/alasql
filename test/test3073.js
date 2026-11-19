if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 3073 - toString() must keep brackets around a column name that is a keyword', function () {
	var prevAutocommit;

	before(function () {
		prevAutocommit = alasql.options.autocommit;
	});

	after(function () {
		alasql.options.autocommit = prevAutocommit;
	});

	beforeEach(function () {
		// An earlier test file may leave autocommit off (see test1082)
		alasql.options.autocommit = true;
		alasql('DROP TABLE IF EXISTS t');
		alasql('CREATE TABLE t (id INT, [value] JSON, [select] INT)');
		alasql('INSERT INTO t VALUES (1, @{a:5}, 3), (2, @{a:9}, 1)');
	});

	afterEach(function () {
		alasql('DROP TABLE IF EXISTS t');
	});

	// Parse, print with toString(), parse again and compare the results
	function roundtrip(sql, params) {
		var printed = alasql.parse(sql).toString();
		var expected = alasql(sql, params);
		var actual = alasql(printed, params);
		assert.deepStrictEqual(
			actual,
			expected,
			're-parsed SQL should give the same result: ' + printed
		);
		return printed;
	}

	it('1. keyword column in the select list with -> keeps its brackets', function (done) {
		var printed = roundtrip('SELECT id, [value]->a AS x FROM t');
		assert.ok(printed.indexOf('[value]') > -1, 'toString() should keep [value]: ' + printed);
		done();
	});

	it('2. keyword column [select] with -> over a parameter keeps its brackets', function (done) {
		var printed = roundtrip('SELECT [select]->a AS x FROM ?', [[{select: {a: 7}}]]);
		assert.ok(printed.indexOf('[select]') > -1, 'toString() should keep [select]: ' + printed);
		done();
	});

	it('3. keyword column in WHERE keeps its brackets', function (done) {
		var printed = roundtrip('SELECT id FROM t WHERE [select] = 3');
		assert.ok(printed.indexOf('[select]') > -1, 'toString() should keep [select]: ' + printed);
		done();
	});

	it('4. keyword column in ORDER BY keeps its brackets', function (done) {
		var printed = roundtrip('SELECT id FROM t ORDER BY [select]');
		assert.ok(printed.indexOf('[select]') > -1, 'toString() should keep [select]: ' + printed);
		done();
	});

	it('5. plain column names stay bare', function (done) {
		var printed = alasql.parse('SELECT id FROM t').toString();
		assert.strictEqual(printed, 'SELECT id FROM t');
		done();
	});

	it('6. qualified keyword column keeps its dot', function (done) {
		// t[value] does not read as a column, so the dot must stay
		var printed = roundtrip('SELECT t.[value]->a AS x FROM t');
		assert.ok(printed.indexOf('t.[value]') > -1, 'toString() should keep t.[value]: ' + printed);
		printed = roundtrip('SELECT a.id FROM t a JOIN t b ON a.[select] = b.[select]');
		assert.ok(printed.indexOf('a.[select]') > -1, 'toString() should keep a.[select]: ' + printed);
		done();
	});
});
