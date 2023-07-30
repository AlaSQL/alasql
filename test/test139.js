if (typeof exports === 'object') {
	var assert = require('assert');
	var alasql = require('..');
} else {
	__dirname = '.';
}

describe('Test 139 JSON', function () {
	it('1. Simple JSON', function (done) {
		alasql('CREATE DATABASE test139; use test139');

		var res = alasql('SELECT VALUE 1');
		assert(res == 1);

		var res = alasql('SELECT VALUE @1');
		assert(res == 1);

		var res = alasql('SELECT VALUE "Test"');
		assert(res == 'Test');

		var res = alasql('SELECT VALUE @"Test"');
		assert(res == 'Test');

		var res = alasql('SELECT VALUE TRUE');
		assert(res);

		var res = alasql('SELECT VALUE FALSE');
		assert(!res);

		var res = alasql('SELECT VALUE @true');
		assert(res);

		var res = alasql('SELECT VALUE @false');
		assert(!res);

		var res = alasql('SELECT VALUE @{a:1}');
		assert.deepEqual(res, {a: 1});

		var res = alasql('SELECT VALUE @[1,2,3]');
		assert.deepEqual(res, [1, 2, 3]);

		var res = alasql('SELECT VALUE ARRAY[1,2,3]');
		assert.deepEqual(res, [1, 2, 3]);

		var res = alasql('SELECT VALUE @[1,2,3]');
		assert.deepEqual(res, [1, 2, 3]);

		var res = alasql('SELECT VALUE @[1,@[2,3]]');
		assert.deepEqual(res, [1, [2, 3]]);

		var res = alasql('SELECT VALUE @[1,@[2,(2+1),@[4,?],{a:123}]]', [70]);
		assert.deepEqual(res, [1, [2, 3, [4, 70], {a: 123}]]);

		done();
	});

	it('2. Property', function (done) {
		var res = alasql('SELECT VALUE @{a:1}->a');
		assert(res == 1);
		var res = alasql('SELECT VALUE @{a:{b:@[1,2,3]}}->a->b->2');
		assert(res == 3);

		alasql('CREATE TABLE one');
		assert(!!alasql.tables.one);

		var res = alasql('INSERT INTO one VALUES @{a:1}, @{a:2,b:2}');
		assert(res == 2);
		assert.deepEqual(alasql.tables.one.data, [{a: 1}, {a: 2, b: 2}]);
		var res = alasql('SELECT * FROM one');
		assert.deepEqual(res, [{a: 1}, {a: 2, b: 2}]);

		var res = alasql('SELECT a FROM one');
		assert.deepEqual(res, [{a: 1}, {a: 2}]);

		var res = alasql('SELECT b FROM one');
		assert.deepEqual(res, [{b: undefined}, {b: 2}]);

		var res = alasql('INSERT INTO one VALUES @{a:3,b:@[4,5]}');
		assert(res == 1);

		var res = alasql('SELECT COLUMN b AND b->0 FROM one');
		assert.deepEqual(res, [undefined, undefined, 4]);

		var res = alasql('SELECT b FROM one');
		assert.deepEqual(res, [{b: undefined}, {b: 2}, {b: [4, 5]}]);
		// Make Dirty
		alasql.tables.one.data[2].b = 99;

		var res1 = alasql('SELECT b FROM one');
		assert.deepEqual(res1, [{b: undefined}, {b: 2}, {b: 99}]);

		var res2 = alasql('SELECT cloneDeep(b) AS b FROM one');
		assert.deepEqual(res2, [{b: undefined}, {b: 2}, {b: 99}]);

		// Make Dirty
		alasql.tables.one.data[2].b = 777;
		assert(res1, [{b: undefined}, {b: 2}, {b: 777}]);
		assert(res2, [{b: undefined}, {b: 2}, {b: 99}]);

		//		console.log(res1);

		done();
	});

	it('3. Property of property', function (done) {
		alasql('CREATE TABLE two');
		alasql(
			'INSERT INTO two VALUES @{a:1,b:@[0,10,20]}, @{a:2,b:@[0,(-10),(-20)]},' +
				' @{a:4,b:@[100,200,300]}'
		);
		var res = alasql('SELECT COLUMN b->(a) FROM two');
		assert.deepEqual(res, [10, -20, undefined]);

		alasql('INSERT INTO two VALUES @{a:1}');
		var res = alasql('SELECT COLUMN b AND b->(a) FROM two');
		assert.deepEqual(res, [10, -20, undefined, undefined]);

		alasql('CREATE TABLE four');
		alasql('INSERT INTO four VALUES @{b:1}, @{b:2}');
		var res = alasql('SELECT COLUMN @{a:@[2014,(2014+1),(2014+b)]} FROM four');
		assert.deepEqual(res, [{a: [2014, 2015, 2015]}, {a: [2014, 2015, 2016]}]);

		alasql('CREATE TABLE five (a JSON)');
		alasql('INSERT INTO five VALUES (1), ("two"), (@{b:"three"}), (@["F","O","U","R"])');

		var res = alasql('SELECT * FROM five');
		assert.deepEqual(alasql.tables.five.data, [
			{a: 1},
			{a: 'two'},
			{a: {b: 'three'}},
			{a: ['F', 'O', 'U', 'R']},
		]);
		assert.deepEqual(res, [{a: 1}, {a: 'two'}, {a: {b: 'three'}}, {a: ['F', 'O', 'U', 'R']}]);

		var res = alasql('SELECT * FROM five WHERE a = "two"');
		assert.deepEqual(res, [{a: 'two'}]);

		var res = alasql('SELECT * FROM five WHERE a == @["F","O","U","R"]');
		assert.deepEqual(res, [{a: ['F', 'O', 'U', 'R']}]);

		//		alasql('INSERT INTO five VALUES (?)',[{a:[6,7]}]);
		alasql('INSERT INTO five VALUES (?)', [1]);

		var res = alasql('SELECT * FROM five');
		assert.deepEqual(res, [
			{a: 1},
			{a: 'two'},
			{a: {b: 'three'}},
			{a: ['F', 'O', 'U', 'R']},
			{a: 1},
		]);

		var res = alasql('SELECT * FROM five WHERE a = 1');
		assert.deepEqual(res, [{a: 1}, {a: 1}]);

		alasql('INSERT INTO five VALUES (?)', [[6, 7]]);
		var res = alasql('SELECT a FROM five WHERE a == @[6,7]');
		assert.deepEqual(res, [{a: [6, 7]}]);

		alasql('INSERT INTO five VALUES (?)', [{w: 123}]);
		var res = alasql('SELECT a FROM five WHERE a == @{w:123}');
		assert.deepEqual(res, [{a: {w: 123}}]);

		alasql('INSERT INTO five VALUES (@{w:?})', [59]);
		alasql('INSERT INTO five VALUES (@{w:?})', [234]);
		var res = alasql('SELECT a FROM five WHERE a == @{w:234}');
		assert.deepEqual(res, [{a: {w: 234}}]);

		var res = alasql('SELECT COLUMN a->w FROM five WHERE a->w > 100');
		assert.deepEqual(res, [123, 234]);

		var res = alasql('SELECT COLUMN a->w FROM five WHERE a == @{w:?}', [59]);
		assert.deepEqual(res, [59]);

		//		console.log(res);

		done();
	});

	it('99. Drop database', function (done) {
		alasql('DROP DATABASE test139');
		done();
	});
});
