if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

if (typeof exports == 'object') {
	var DOMStorage = require('dom-storage');
	global.localStorage = new DOMStorage('./test151.json', {strict: false, ws: ''});
}

describe('Test 151 - localStorage Engine', function () {
	it('1. Create database', function (done) {
		alasql('SET AUTOCOMMIT OFF');
		alasql('DROP localStorage DATABASE IF EXISTS ls151');
		alasql('CREATE localStorage DATABASE IF NOT EXISTS ls151');
		alasql('ATTACH localStorage DATABASE ls151');
		alasql('CREATE TABLE IF NOT EXISTS ls151.one (a int, b string)');
		alasql('SELECT * INTO ls151.one FROM ?', [
			[
				{a: 1, b: 'Moscow'},
				{a: 2, b: 'Kyiv'},
				{a: 3, b: 'Minsk'},
			],
		]);
		var res = alasql('SELECT * FROM ls151.one');
		assert.deepEqual(res, [
			{a: 1, b: 'Moscow'},
			{a: 2, b: 'Kyiv'},
			{a: 3, b: 'Minsk'},
		]);
		done();
	});

	it('2.Insert values into localStorage database', function (done) {
		alasql('USE ls151');
		alasql('BEGIN TRANSACTION');
		var res = alasql('SELECT * FROM ls151.one');
		assert(res.length == 3);

		alasql('SELECT * INTO ls151.one FROM ?', [
			[
				{a: 4, b: 'London'},
				{a: 5, b: 'Madrid'},
				{a: 6, b: 'Tirana'},
			],
		]);
		var res = alasql('SELECT * FROM ls151.one');
		assert(res.length == 6);

		//		console.log(alasql.databases.ls151.tables.one);
		//		console.log(localStorage['ls151.one']);
		done();
	});

	it('3.Insert values into localStorage database', function (done) {
		alasql('ROLLBACK TRANSACTION');
		//		console.log(alasql.databases.ls151.tables.one);

		var res = alasql('SELECT * FROM one');
		//		console.log(res);

		//		assert(res.length == 3);

		done();
	});

	it('99. Detach database', function (done) {
		alasql('DETACH DATABASE ls151');
		alasql('DROP localStorage DATABASE ls151');
		done();
	});
});
