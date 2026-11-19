if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2800 - TRIM([LEADING | TRAILING | BOTH] [chars] FROM x)', function () {
	it('trims the side and the character asked for', function () {
		assert.deepEqual(alasql("SELECT TRIM(LEADING ' ' FROM '  xy  ') AS x"), [{x: 'xy  '}]);
		assert.deepEqual(alasql("SELECT TRIM(TRAILING FROM '  xy  ') AS x"), [{x: '  xy'}]);
		assert.deepEqual(alasql("SELECT TRIM(BOTH 'z' FROM 'zzxyz') AS x"), [{x: 'xy'}]);
		assert.deepEqual(alasql("SELECT TRIM('z' FROM 'zzxyz') AS x"), [{x: 'xy'}]);
		assert.deepEqual(alasql("SELECT trim(leading 'z' from 'zzxyz') AS x"), [{x: 'xyz'}]);
	});

	it('works on columns and keeps NULL', function () {
		alasql('CREATE TABLE test2800 (s STRING)');
		alasql("INSERT INTO test2800 VALUES ('  a '), (NULL)");
		assert.deepEqual(alasql("SELECT TRIM(LEADING ' ' FROM s) AS x FROM test2800"), [
			{x: 'a '},
			{x: undefined},
		]);
		assert.deepEqual(alasql('SELECT TRIM(BOTH NULL FROM s) AS x FROM test2800'), [
			{x: undefined},
			{x: undefined},
		]);
		alasql('DROP TABLE test2800');
	});

	it('plain TRIM still works, also with FROM in a string', function () {
		assert.deepEqual(alasql("SELECT TRIM('  xy  ') AS x"), [{x: 'xy'}]);
		assert.deepEqual(alasql("SELECT TRIM(' from ') AS x"), [{x: 'from'}]);
	});

	it('toString parses back to the same query', function () {
		var sql = alasql.parse("SELECT TRIM(LEADING 'z' FROM 'zzxyz') AS x").toString();
		assert.deepEqual(alasql(sql), [{x: 'xyz'}]);
	});
});
