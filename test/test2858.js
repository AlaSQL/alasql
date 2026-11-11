if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2858 - MySQL regular expressions in REGEXP', function () {
	it('POSIX classes', function () {
		assert.equal(alasql("SELECT VALUE 'a1' REGEXP '[[:digit:]]'"), true);
		assert.equal(alasql("SELECT VALUE 'ab' REGEXP '[[:digit:]]'"), false);
		assert.equal(alasql("SELECT VALUE ' ' REGEXP '[[:blank:]]'"), true);
		assert.equal(alasql("SELECT VALUE 'ab' REGEXP '^[[:alpha:]]+$'"), true);
		assert.equal(alasql("SELECT VALUE 'a_' REGEXP '^[[:alnum:]_]+$'"), true);
		assert.equal(alasql("SELECT VALUE '12' REGEXP '[^[:digit:]]'"), false);
		assert.equal(alasql("SELECT VALUE '!' REGEXP '[[:punct:]]'"), true);
	});

	it('a leading (?i) ignores case', function () {
		assert.equal(alasql("SELECT VALUE REGEXP_LIKE('ABC', '(?i)abc')"), true);
		assert.equal(alasql("SELECT VALUE 'ABC' REGEXP '(?i)^abc$'"), true);
		assert.equal(alasql("SELECT VALUE 'ABC' REGEXP 'abc'"), false);
	});

	it('RLIKE is REGEXP', function () {
		assert.equal(alasql("SELECT VALUE 'ABC' RLIKE 'B'"), true);
		assert.equal(alasql("SELECT VALUE 'ABC' rlike 'x'"), false);
	});

	it('rlike stays usable as a name', function () {
		alasql('CREATE TABLE test2858 (rlike STRING)');
		alasql("INSERT INTO test2858 VALUES ('a')");
		assert.deepEqual(alasql('SELECT rlike FROM test2858'), [{rlike: 'a'}]);
		assert.deepEqual(alasql("SELECT * FROM test2858 WHERE rlike RLIKE 'a'"), [{rlike: 'a'}]);
		alasql('DROP TABLE test2858');
	});
});
