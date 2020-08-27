if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test152.json', {strict: false, ws: ''});
}

describe('Test 152 - INSERT/DELETE/UPDATE for localStorage with AUTOCOMMIT', function () {
	it('1. Create database', function (done) {
		alasql('SET AUTOCOMMIT ON');
		alasql('DROP localStorage DATABASE IF EXISTS ls152');
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls152');
		alasql('ATTACH localStorage DATABASE ls152');
		alasql('CREATE TABLE IF NOT EXISTS ls152.one (a int, b string)');
		alasql('INSERT INTO ls152.one VALUES (1,"Rome"),(2,"London"),(3,"Berlin"),(4,"Paris")');
		//		console.log(alasql.databases.ls152.tables.one.data);
		//		assert(!alasql.databases.ls152.tables.one.data);

		var res = alasql('SELECT * FROM ls152.one');
		assert.deepEqual(res, [
			{a: 1, b: 'Rome'},
			{a: 2, b: 'London'},
			{a: 3, b: 'Berlin'},
			{a: 4, b: 'Paris'},
		]);
		done();
	});

	it('2. Create second table (INSERT SELECT)', function (done) {
		alasql('CREATE TABLE IF NOT EXISTS ls152.two (a int, b string)');
		//		var res = alasql('SELECT * FROM ls152.one');
		//		console.log(res);
		//		console.table(alasql('SELECT * FROM ls152.one WHERE a IN (2,3)'));
		//debugger;
		alasql('INSERT INTO ls152.two SELECT * FROM ls152.one WHERE a IN (2,3)');
		var res = alasql('SELECT * FROM ls152.two');
		assert.deepEqual(res, [
			{a: 2, b: 'London'},
			{a: 3, b: 'Berlin'},
		]);
		done();
	});

	it('3. DELETE FROM', function (done) {
		alasql('DELETE FROM ls152.two WHERE a=3');
		var res = alasql('SELECT * FROM ls152.two');
		assert.deepEqual(res, [{a: 2, b: 'London'}]);
		done();
	});

	it('4. UPDATE', function (done) {
		alasql('UPDATE ls152.one SET b="Prague" WHERE a IN (2,3)');
		var res = alasql('SELECT * FROM ls152.one');
		assert.deepEqual(res, [
			{a: 1, b: 'Rome'},
			{a: 2, b: 'Prague'},
			{a: 3, b: 'Prague'},
			{a: 4, b: 'Paris'},
		]);
		done();
	});

	it('5. INSERT with AUTOINCREMENT', function (done) {
		alasql('CREATE TABLE IF NOT EXISTS ls152.three (a int AUTO_INCREMENT, b string)');
		alasql('INSERT INTO ls152.three (b) VALUES ("Rome"),("London"),("Berlin"),("Paris")');

		var res = alasql('SELECT * FROM ls152.three');
		assert.deepEqual(res, [
			{a: 1, b: 'Rome'},
			{a: 2, b: 'London'},
			{a: 3, b: 'Berlin'},
			{a: 4, b: 'Paris'},
		]);
		done();
	});

	it('99. Detach database', function (done) {
		alasql('DETACH DATABASE ls152');
		alasql('DROP localStorage DATABASE ls152');
		done();
	});
});
