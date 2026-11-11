if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 2831 - PostgreSQL string functions', function () {
	function v(sql) {
		return alasql('SELECT VALUE ' + sql);
	}

	it('LPAD and RPAD', function () {
		assert.equal(v("LPAD('a', 3, 'x')"), 'xxa');
		assert.equal(v("LPAD('hi', 5, 'xy')"), 'xyxhi');
		assert.equal(v("LPAD('hello', 2)"), 'he');
		assert.equal(v("LPAD('a', 3)"), '  a');
		assert.equal(v("RPAD('hi', 5, 'xy')"), 'hixyx');
		assert.equal(v("RPAD('a', 3)"), 'a  ');
	});

	it('REVERSE, INITCAP, REPEAT, CHR and STRPOS', function () {
		assert.equal(v("REVERSE('abc')"), 'cba');
		assert.equal(v("INITCAP('hi THOMAS o''neil')"), "Hi Thomas O'Neil");
		assert.equal(v("REPEAT('ab', 3)"), 'ababab');
		assert.equal(v("REPEAT('ab', -1)"), '');
		assert.equal(v('CHR(65)'), 'A');
		assert.equal(v("STRPOS('high', 'ig')"), 2);
		assert.equal(v("STRPOS('high', 'x')"), 0);
	});

	it('BTRIM, TRANSLATE and SPLIT_PART', function () {
		assert.equal(v("BTRIM('xyxtrimyyx', 'xyz')"), 'trim');
		assert.equal(v("BTRIM('  a  ')"), 'a');
		assert.equal(v("TRANSLATE('12345', '143', 'ax')"), 'a2x5');
		assert.equal(v("SPLIT_PART('abc~@~def~@~ghi', '~@~', 2)"), 'def');
		assert.equal(v("SPLIT_PART('abc,def,ghi', ',', -1)"), 'ghi');
		assert.equal(v("SPLIT_PART('abc', ',', 5)"), '');
		assert.throws(() => v("SPLIT_PART('abc', ',', 0)"), /zero/);
	});

	it('STARTS_WITH, QUOTE_LITERAL and QUOTE_IDENT', function () {
		assert.equal(v("STARTS_WITH('alphabet', 'alph')"), true);
		assert.equal(v("STARTS_WITH('alphabet', 'b')"), false);
		assert.equal(v("QUOTE_LITERAL('O''Reilly')"), "'O''Reilly'");
		assert.equal(v("QUOTE_IDENT('foo')"), 'foo');
		assert.equal(v("QUOTE_IDENT('Foo bar')"), '"Foo bar"');
	});

	it('NULL gives NULL', function () {
		assert.equal(v("LPAD(NULL, 3, 'x')"), undefined);
		assert.equal(v('REVERSE(NULL)'), undefined);
		assert.equal(v("SPLIT_PART('a,b', NULL, 1)"), undefined);
	});
});
