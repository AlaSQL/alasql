if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 1384 - REGEXP with MySQL word boundaries', function () {
	const test = '1384';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) Test REGEXP with [[:<:]] and [[:>:]] word boundaries', function () {
		var sql =
			'CREATE TABLE cities (city string, population number);' +
			"INSERT INTO cities VALUES ('Rome,madrid',2863223),('Paris',2249975),('Berlin,rid',3517424), ('Madrid',3041579);" +
			"SELECT * FROM cities WHERE city REGEXP '[[:<:]]rid[[:>:]]';";

		var res = alasql(sql);
		// When multiple statements are executed, result is an array with each statement's result
		// [1, 4, [{matching_rows}]] where 1 = CREATE result, 4 = INSERT count, last = SELECT result
		var selectResult = res[2];
		assert.equal(selectResult.length, 1, 'Should match exactly one city');
		assert.equal(selectResult[0].city, 'Berlin,rid', 'Should match Berlin,rid');
		assert.equal(selectResult[0].population, 3517424, 'Should have correct population');
	});

	it('B) Test that REGEXP does not match partial words', function () {
		alasql('CREATE TABLE test_words (word string)');
		alasql(
			"INSERT INTO test_words VALUES ('rid'),('Madrid'),('riddle'),('pride'),('ридда'),('Berlin,rid')"
		);

		// Should only match 'rid' and 'Berlin,rid' where 'rid' appears as a complete word
		var res = alasql("SELECT * FROM test_words WHERE word REGEXP '[[:<:]]rid[[:>:]]'");
		assert.equal(res.length, 2, 'Should match exactly two words');

		var matched = res.map(r => r.word).sort();
		assert.deepEqual(matched, ['Berlin,rid', 'rid'], 'Should match only complete word rid');
	});

	it('C) Test REGEXP_LIKE with word boundaries', function () {
		assert.equal(
			alasql("= REGEXP_LIKE('Berlin,rid', '[[:<:]]rid[[:>:]]')"),
			true,
			'Should match rid in Berlin,rid'
		);
		assert.equal(
			alasql("= REGEXP_LIKE('Madrid', '[[:<:]]rid[[:>:]]')"),
			false,
			'Should not match rid in Madrid'
		);
		assert.equal(
			alasql("= REGEXP_LIKE('riddle', '[[:<:]]rid[[:>:]]')"),
			false,
			'Should not match rid in riddle'
		);
		assert.equal(
			alasql("= REGEXP_LIKE('rid', '[[:<:]]rid[[:>:]]')"),
			true,
			'Should match standalone rid'
		);
	});

	it('D) Test mixed word boundaries', function () {
		// Test start boundary only
		assert.equal(
			alasql("= REGEXP_LIKE('riddle', '[[:<:]]rid')"),
			true,
			'Should match rid at start of riddle'
		);
		assert.equal(
			alasql("= REGEXP_LIKE('Madrid', '[[:<:]]rid')"),
			false,
			'Should not match rid in Madrid (not at word start)'
		);

		// Test end boundary only
		assert.equal(
			alasql("= REGEXP_LIKE('Madrid', 'rid[[:>:]]')"),
			true,
			'Should match rid at end of Madrid'
		);
		assert.equal(
			alasql("= REGEXP_LIKE('riddle', 'rid[[:>:]]')"),
			false,
			'Should not match rid in riddle (not at word end)'
		);
	});

	it('E) Test backward compatibility - normal REGEXP still works', function () {
		// Ensure existing REGEXP functionality is not broken
		assert.equal(alasql("= REGEXP_LIKE('abcdef', 'a.*')"), true);
		assert.equal(alasql("= REGEXP_LIKE('abcdef', '[aq]')"), true);
		assert.equal(alasql("= REGEXP_LIKE('abcdef', '[^qw]')"), true);
		assert.equal(alasql("= REGEXP_LIKE('abcdef', '[qw]')"), false);
	});
});
