if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2831 - DATE_TRUNC and DATE_PART', function () {
	var d = new Date(2001, 1, 16, 20, 38, 40, 500); // Friday 16 February 2001

	function v(sql) {
		return alasql('SELECT VALUE ' + sql, [d]);
	}

	it('DATE_TRUNC', function () {
		assert.deepEqual(v("DATE_TRUNC('hour', ?)"), new Date(2001, 1, 16, 20, 0, 0));
		assert.deepEqual(v("DATE_TRUNC('day', ?)"), new Date(2001, 1, 16));
		assert.deepEqual(v("DATE_TRUNC('week', ?)"), new Date(2001, 1, 12));
		assert.deepEqual(v("DATE_TRUNC('month', ?)"), new Date(2001, 1, 1));
		assert.deepEqual(v("DATE_TRUNC('quarter', ?)"), new Date(2001, 0, 1));
		assert.deepEqual(v("DATE_TRUNC('YEAR', ?)"), new Date(2001, 0, 1));
		assert.throws(() => v("DATE_TRUNC('fortnight', ?)"), /Unknown date part/);
	});

	it('DATE_PART', function () {
		assert.equal(v("DATE_PART('year', ?)"), 2001);
		assert.equal(v("DATE_PART('quarter', ?)"), 1);
		assert.equal(v("DATE_PART('month', ?)"), 2);
		assert.equal(v("DATE_PART('day', ?)"), 16);
		assert.equal(v("DATE_PART('hour', ?)"), 20);
		assert.equal(v("DATE_PART('minute', ?)"), 38);
		assert.equal(v("DATE_PART('second', ?)"), 40.5);
		assert.equal(v("DATE_PART('dow', ?)"), 5);
		assert.equal(v("DATE_PART('doy', ?)"), 47);
		assert.equal(v("DATE_PART('week', ?)"), 7);
		assert.equal(alasql("SELECT VALUE DATE_PART('week', ?)", [new Date(2005, 0, 1)]), 53);
	});

	it('NULL gives NULL', function () {
		assert.equal(alasql("SELECT VALUE DATE_TRUNC('day', NULL)"), undefined);
		assert.equal(alasql("SELECT VALUE DATE_PART('day', NULL)"), undefined);
	});
});
