if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 055-B - PostgreSQL Range Types', function () {
	const test = '055B';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Create integer ranges', function () {
		var r1 = alasql('SELECT int4range(10, 20) as r')[0].r;
		assert.deepEqual(r1, {lower: 10, upper: 20, lowerInc: true, upperInc: false});
	});

	it('B) Create numeric ranges', function () {
		var r1 = alasql('SELECT numrange(11.1, 22.2) as r')[0].r;
		assert.deepEqual(r1, {lower: 11.1, upper: 22.2, lowerInc: true, upperInc: false});
	});

	it('C) Create date ranges', function () {
		var d1 = new Date('2020-01-01');
		var d2 = new Date('2020-12-31');
		var r1 = alasql('SELECT daterange(?, ?) as r', [d1, d2])[0].r;
		assert(r1);
		// Range object should have the dates
		assert(r1.lower);
		assert(r1.upper);
		assert.equal(r1.lower.getFullYear(), 2020);
		assert.equal(r1.upper.getFullYear(), 2020);
	});

	it('D) Test range_overlaps - overlapping ranges', function () {
		var res = alasql('SELECT range_overlaps(int4range(10, 20), int4range(15, 25)) as r')[0].r;
		assert.equal(res, true);
	});

	it('E) Test range_overlaps - non-overlapping ranges', function () {
		var res = alasql('SELECT range_overlaps(int4range(10, 20), int4range(25, 30)) as r')[0].r;
		assert.equal(res, false);
	});

	it('F) Test range_contains - element in range', function () {
		var res = alasql('SELECT range_contains(int4range(10, 20), 15) as r')[0].r;
		assert.equal(res, true);
	});

	it('G) Test range_contains - element not in range', function () {
		var res = alasql('SELECT range_contains(int4range(10, 20), 25) as r')[0].r;
		assert.equal(res, false);
	});

	it('H) Test range_contains_range - subset', function () {
		var res = alasql('SELECT range_contains_range(int4range(10, 30), int4range(15, 25)) as r')[0].r;
		assert.equal(res, true);
	});

	it('I) Test range_contains_range - not subset', function () {
		var res = alasql('SELECT range_contains_range(int4range(10, 20), int4range(15, 25)) as r')[0].r;
		assert.equal(res, false);
	});

	it('J) Test range_union', function () {
		var r = alasql('SELECT range_union(int4range(10, 20), int4range(15, 25)) as r')[0].r;
		assert.deepEqual(r, {lower: 10, upper: 25, lowerInc: true, upperInc: false});
	});

	it('K) Test range_intersection', function () {
		var r = alasql('SELECT range_intersection(int4range(10, 20), int4range(15, 25)) as r')[0].r;
		assert.deepEqual(r, {lower: 15, upper: 20, lowerInc: true, upperInc: false});
	});

	it('L) Test range_intersection - no overlap returns null', function () {
		var r = alasql('SELECT range_intersection(int4range(10, 20), int4range(25, 30)) as r')[0].r;
		assert.equal(r, null);
	});

	it('M) Test range_difference', function () {
		var r = alasql('SELECT range_difference(int4range(10, 30), int4range(20, 40)) as r')[0].r;
		// Difference should give [10, 20)
		assert.deepEqual(r, {lower: 10, upper: 20, lowerInc: true, upperInc: false});
	});

	it('N) Use range in table and query', function () {
		// Note: AlaSQL treats 'range' as a generic column type that can store any JavaScript object
		// In this case, it stores Range instances created by range constructor functions
		alasql('CREATE TABLE events (id int, period range)');
		alasql('INSERT INTO events VALUES (1, int4range(10, 20))');
		alasql('INSERT INTO events VALUES (2, int4range(15, 25))');
		alasql('INSERT INTO events VALUES (3, int4range(30, 40))');

		// Find events overlapping with [12, 18]
		var res = alasql('SELECT * FROM events WHERE range_overlaps(period, int4range(12, 18))');
		assert.equal(res.length, 2);
		assert.equal(res[0].id, 1);
		assert.equal(res[1].id, 2);
	});

	it('O) Range with inclusive/exclusive bounds', function () {
		// Test default bounds (inclusive lower, exclusive upper)
		var r1 = alasql('SELECT int4range(10, 20) as r')[0].r;
		assert.equal(r1.lowerInc, true);
		assert.equal(r1.upperInc, false);
	});

	it('P) Range empty check', function () {
		var r1 = alasql('SELECT int4range(10, 10) as r')[0].r;
		assert.equal(r1.isEmpty(), true);

		var r2 = alasql('SELECT int4range(10, 20) as r')[0].r;
		assert.equal(r2.isEmpty(), false);
	});

	it('Q) Test isSubsetOf method', function () {
		var res = alasql('SELECT range_is_subset(int4range(15, 20), int4range(10, 30)) as r')[0].r;
		assert.equal(res, true);

		var res2 = alasql('SELECT range_is_subset(int4range(5, 20), int4range(10, 30)) as r')[0].r;
		assert.equal(res2, false);
	});

	it('R) Test isSupersetOf method', function () {
		var res = alasql('SELECT range_is_superset(int4range(10, 30), int4range(15, 20)) as r')[0].r;
		assert.equal(res, true);

		var res2 = alasql('SELECT range_is_superset(int4range(10, 25), int4range(15, 30)) as r')[0].r;
		assert.equal(res2, false);
	});

	it('S) Test isDisjointFrom method', function () {
		var res = alasql('SELECT range_is_disjoint(int4range(10, 20), int4range(25, 30)) as r')[0].r;
		assert.equal(res, true);

		var res2 = alasql('SELECT range_is_disjoint(int4range(10, 20), int4range(15, 25)) as r')[0].r;
		assert.equal(res2, false);
	});

	it('T) Test int8range (bigint range)', function () {
		var r = alasql('SELECT int8range(1000000, 2000000) as r')[0].r;
		assert.deepEqual(r, {lower: 1000000, upper: 2000000, lowerInc: true, upperInc: false});
	});

	it('U) Test tsrange (timestamp range)', function () {
		var t1 = new Date('2020-01-01T10:00:00');
		var t2 = new Date('2020-01-01T12:00:00');
		var r = alasql('SELECT tsrange(?, ?) as r', [t1, t2])[0].r;
		assert(r);
		assert(r.lower);
		assert(r.upper);
		assert.equal(r.lower.getHours(), 10);
		assert.equal(r.upper.getHours(), 12);
	});
});
