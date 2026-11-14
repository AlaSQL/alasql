if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

describe('Test 926 - INSERT checks the declared column type', function () {
	const test = '926';

	before(function () {
		alasql('create database test' + test);
		alasql('use test' + test);
	});

	after(function () {
		alasql('drop database test' + test);
	});

	it('A) INSERT INTO ... VALUES rejects a string for an INTEGER column', () => {
		alasql('CREATE TABLE BUG_TABLE(fieldA INTEGER)');

		assert.throws(() => {
			alasql('INSERT INTO BUG_TABLE ("how")');
		}, /Cannot insert value "how" into column "fieldA" of type INTEGER/);

		assert.deepStrictEqual(alasql('SELECT * FROM BUG_TABLE'), []);
	});

	it('B) INSERT INTO ... (columns) VALUES rejects the same value', () => {
		alasql('CREATE TABLE BUG_TABLE2(fieldA INTEGER)');

		assert.throws(() => {
			alasql('INSERT INTO BUG_TABLE2 (fieldA) VALUES ("how")');
		}, /Cannot insert value "how" into column "fieldA" of type INTEGER/);

		assert.deepStrictEqual(alasql('SELECT * FROM BUG_TABLE2'), []);
	});

	it('C) numeric values are converted to the declared numeric type', () => {
		alasql('CREATE TABLE typed(i INTEGER, b BIGINT, s SMALLINT, f FLOAT, d DECIMAL)');

		alasql("INSERT INTO typed VALUES ('42', '7', '3', '1.5', '2.25')");

		assert.deepStrictEqual(alasql('SELECT * FROM typed'), [{i: 42, b: 7, s: 3, f: 1.5, d: 2.25}]);
	});

	it('D) values passed as parameters are checked too', () => {
		alasql('CREATE TABLE parametrized(a INTEGER)');

		alasql('INSERT INTO parametrized VALUES (?)', [7]);
		assert.deepStrictEqual(alasql('SELECT * FROM parametrized'), [{a: 7}]);

		assert.throws(() => {
			alasql('INSERT INTO parametrized VALUES (?)', ['oops']);
		}, /Cannot insert value "oops" into column "a" of type INTEGER/);
	});

	it('E) INSERT INTO ... SELECT checks the values it reads', () => {
		alasql('CREATE TABLE source(a)');
		alasql('CREATE TABLE destination(a INTEGER)');

		alasql("INSERT INTO source VALUES ('42')");
		alasql('INSERT INTO destination SELECT a FROM source');
		assert.deepStrictEqual(alasql('SELECT * FROM destination'), [{a: 42}]);

		alasql('INSERT INTO source VALUES ("nope")');
		assert.throws(() => {
			alasql('INSERT INTO destination SELECT a FROM source WHERE a = "nope"');
		}, /Cannot insert value "nope" into column "a" of type INTEGER/);
	});

	it('F) NULL and omitted columns are still allowed', () => {
		alasql('CREATE TABLE nullable(a INTEGER, b INTEGER DEFAULT 5)');

		alasql('INSERT INTO nullable (a) VALUES (NULL)');
		alasql('INSERT INTO nullable (b) VALUES (1)');

		var rows = alasql('SELECT * FROM nullable');
		assert.equal(rows.length, 2);
		assert.equal(rows[0].a, undefined);
		assert.equal(rows[0].b, 5);
		assert.equal(rows[1].a, undefined);
		assert.equal(rows[1].b, 1);
	});

	it('G) columns without a declared type stay dynamic', () => {
		alasql('CREATE TABLE untyped(a)');

		alasql('INSERT INTO untyped VALUES ("how"), (5)');

		assert.deepStrictEqual(alasql('SELECT * FROM untyped'), [{a: 'how'}, {a: 5}]);
	});

	it('H) non-numeric column types keep their existing values', () => {
		alasql('CREATE TABLE other(a TEXT, b DATE)');

		alasql("INSERT INTO other VALUES (12345, '2014-06-02')");

		assert.deepStrictEqual(alasql('SELECT * FROM other'), [{a: 12345, b: '2014-06-02'}]);
	});

	it('I) booleans in a numeric column are stored as 1 and 0', () => {
		alasql('CREATE TABLE flags(a INTEGER)');

		alasql('INSERT INTO flags VALUES (true), (false)');

		assert.deepStrictEqual(alasql('SELECT * FROM flags'), [{a: 1}, {a: 0}]);
	});
});
