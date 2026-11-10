if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
}

let testId = '2568B'; // LIKE caches the pattern per escape character

describe(`Test ${testId} - LIKE caches the pattern per escape character`, function () {
	before(function () {
		alasql('create database test' + testId);
		alasql('use test' + testId);
		alasql('CREATE TABLE l (s STRING)');
		alasql("INSERT INTO l VALUES ('a%b'), ('a!b'), ('ab'), ('constructor')");
	});

	after(function () {
		alasql('drop database test' + testId);
	});

	it('A) The same pattern with and without ESCAPE gives different rows', function () {
		var sql = "SELECT s FROM l WHERE s LIKE '%!%%'";
		assert.deepStrictEqual(alasql(sql), [{s: 'a!b'}]);
		assert.deepStrictEqual(alasql(sql + " ESCAPE '!'"), [{s: 'a%b'}]);
		assert.deepStrictEqual(alasql(sql), [{s: 'a!b'}]);
	});

	it('B) The same pattern with two escape characters', function () {
		assert.deepStrictEqual(alasql("SELECT s FROM l WHERE s LIKE 'a!%b' ESCAPE '!'"), [{s: 'a%b'}]);
		assert.deepStrictEqual(alasql("SELECT s FROM l WHERE s LIKE 'a!%b' ESCAPE '#'"), [{s: 'a!b'}]);
	});

	it('C) A pattern that is also an Object property name', function () {
		assert.deepStrictEqual(alasql("SELECT s FROM l WHERE s LIKE 'constructor'"), [
			{s: 'constructor'},
		]);
		assert.deepStrictEqual(alasql("SELECT s FROM l WHERE s LIKE 'toString'"), []);
	});
});
