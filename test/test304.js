if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 304 SEARCH over JSON', function () {
	it.skip('0. Create database ', function (done) {
		var res = alasql('CREATE DATABASE test304;USE test304');
		done();
	});

	it.skip('1. INSTANCEOF selector', function (done) {
		var People = (alasql.fn.People = function () {});
		var City = (alasql.fn.City = function () {});

		var p1 = new People();
		p1.name = 'John';
		var p2 = new People();
		p2.name = 'Mary';
		var c1 = new City();
		c1.name = 'Milano';
		var c2 = new City();
		c2.name = 'Odessa';

		var data = [p1, c1, p2, c2];

		var res = alasql('SEARCH / INSTANCEOF(City) name FROM ?', [data]);
		assert.deepEqual(res, ['Milano', 'Odessa']);
		done();
	});

	it.skip('2. CLASS() selector', function (done) {
		alasql('CREATE CLASS Person');
		alasql('CREATE CLASS City');
		alasql('INSERT INTO Person VALUES {name:"John"},{name:"Mary"}');
		alasql('INSERT INTO City VALUES {name:"Madrid"},{name:"Kyoto"}');
		var res = alasql('SEARCH / CLASS(City) name');
		assert.deepEqual(res, ['Madrid', 'Kyoto']);
		done();
	});

	it.skip('3. PLUS selector', function (done) {
		var data = {a: {a: {a: {a: {b: 10}}}}};
		var res = alasql('SEARCH a b FROM ?', [data]);
		assert.deepEqual(res, []);

		var res = alasql('SEARCH (a)+ b FROM ?', [data]);
		assert.deepEqual(res, [10]);

		var res = alasql('SEARCH (a a)+ b FROM ?', [data]);
		assert.deepEqual(res, [10]);

		var res = alasql('SEARCH (a a a)+ b FROM ?', [data]);
		assert.deepEqual(res, []);

		var res = alasql('SEARCH (/)+ b FROM ?', [data]);
		assert.deepEqual(res, [10]);

		var res = alasql('SEARCH /+b FROM ?', [data]);
		assert.deepEqual(res, [10]);

		done();
	});

	it.skip('4. STAR and QUESTION selector', function (done) {
		var data = {a: {a: {a: {a: {b: 10}}}}, b: 20};
		var res = alasql('SEARCH a* b FROM ?', [data]);
		assert.deepEqual(res, [20, 10]);

		var res = alasql('SEARCH a+ b FROM ?', [data]);
		assert.deepEqual(res, [10]);

		var res = alasql('SEARCH a? b FROM ?', [data]);
		assert.deepEqual(res, [20]);

		done();
	});

	it.skip('5. STAR and QUESTION selectors in GRAPHS', function (done) {
		alasql('SET @olga = (CREATE VERTEX "Olga")');
		alasql('SET @helen = (CREATE VERTEX "Helen")');
		alasql('SET @pablo = (CREATE VERTEX "Pablo")');
		alasql('SET @andrey = (CREATE VERTEX "Andrey")');
		alasql('SET @sofia = (CREATE VERTEX "Sofia")');
		alasql('CREATE EDGE FROM @olga TO @pablo');
		alasql('CREATE EDGE FROM @helen TO @andrey');
		alasql('CREATE EDGE FROM @pablo TO @sofia');
		alasql('CREATE EDGE FROM @andrey TO @sofia');

		var res = alasql('SEARCH / AS @p (>>)+ "Sofia" @(@p) name');
		assert.deepEqual(res, ['Olga', 'Helen', 'Pablo', 'Andrey']);
		var res = alasql('SEARCH / AS @p (>>)* "Sofia" @(@p) name');
		assert.deepEqual(res, ['Olga', 'Helen', 'Pablo', 'Andrey', 'Sofia']);

		var res = alasql('SEARCH / "Olga" >> name');
		assert.deepEqual(res, ['Pablo']);
		var res = alasql('SEARCH / "Olga" (>>)? name');
		assert.deepEqual(res, ['Olga', 'Pablo']);

		done();
	});

	it.skip('6. STAR and QUESTION selectors in GRAPHS', function (done) {
		var res = alasql('SEARCH / "Olga" (>>)+ name');
		assert.deepEqual(res, ['Pablo', 'Sofia']);
		var res = alasql('SEARCH / "Olga" (>>)* name');
		assert.deepEqual(res, ['Olga', 'Pablo', 'Sofia']);

		var res = alasql('SEARCH / IF(>> >> "Sofia") name');
		assert.deepEqual(res, ['Olga', 'Helen']);

		done();
	});

	it.skip('99. Create database ', function (done) {
		var res = alasql('DROP DATABASE test304');
		done();
	});
});
